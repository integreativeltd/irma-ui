import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../../context/TenantContext';
import { useAuth } from '../../hooks/useAuth';
import { Pencil, CreditCard, Power } from 'lucide-react';
import TableWrapper from '../../components/tables/TableWrapper';
import { Drawer } from '../../components/ui/drawer';
import { TaxpayerForm } from '../../components/Forms/TaxpayerForm';
import { ManualPaymentForm } from '../../components/Forms/ManualPaymentForm';
import { ConfirmationModal } from '../../components/Modal/ConfirmationModal';
import { taxpayerApi } from '../../features/taxpayers/api';
import { debounce } from 'lodash';
import { StatusBadge } from '../../components/ui/status-badge';

export default function Taxpayers() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tenant = useTenant();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const headers = ['Tax ID', 'Name', 'Email', 'Phone', 'Type', 'Status'];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [taxpayers, setTaxpayers] = useState([]);
  const [deactivateModal, setDeactivateModal] = useState({ isOpen: false, taxpayer: null });
  const [activateModal, setActivateModal] = useState({ isOpen: false, taxpayer: null });

  const loadTaxpayers = async (searchTerm = '') => {
    try {
      setLoading(true);
      const data = await taxpayerApi.searchTaxpayers(user?.tenantId || 'default', searchTerm);
      setTaxpayers(data);
    } catch (err) {
      setError('Failed to load taxpayers');
      console.error('Error loading taxpayers:', err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      loadTaxpayers(searchTerm);
    }, 300),
    []
  );

  useEffect(() => {
    loadTaxpayers();
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleDeactivation = async () => {
    if (!deactivateModal.taxpayer) return;
    
    try {
      await taxpayerApi.updateTaxpayer(
        deactivateModal.taxpayer._original?.id || deactivateModal.taxpayer.id,
        { status: 'Inactive' },
        user?.tenantId || 'default'
      );
      await loadTaxpayers(search);
      setDeactivateModal({ isOpen: false, taxpayer: null });
    } catch (err) {
      console.error('Error deactivating taxpayer:', err);
    }
  };

  const handleActivation = async () => {
    if (!activateModal.taxpayer) return;
    
    try {
      await taxpayerApi.updateTaxpayer(
        activateModal.taxpayer._original?.id || activateModal.taxpayer.id,
        { status: 'Active' },
        user?.tenantId || 'default'
      );
      await loadTaxpayers(search);
      setActivateModal({ isOpen: false, taxpayer: null });
    } catch (err) {
      console.error('Error activating taxpayer:', err);
    }
  };

  const handleRowAction = async (row, action) => {
    const taxpayer = row._original;
    console.log('handleRowAction row:', row, 'action:', action);
    switch (action.type) {
      case 'edit':
        if (action.data) {
          try {
            await taxpayerApi.updateTaxpayer(
              taxpayer.id,
              action.data,
              user?.tenantId || 'default'
            );
            await loadTaxpayers(search);
          } catch (err) {
            console.error('Error updating taxpayer:', err);
          }
        }
        break;
      case 'payTax':
        if (action.data) {
          try {
            // Handle successful payment
            await loadTaxpayers(search);
          } catch (err) {
            console.error('Error processing payment:', err);
          }
        }
        break;
      case 'activate':
        setActivateModal({
          isOpen: true,
          taxpayer: taxpayer
        });
        break;
      case 'deactivate':
        setDeactivateModal({ 
          isOpen: true, 
          taxpayer: taxpayer
        });
        break;
      default:
        break;
    }
  };

  const getTaxpayerMenuItems = useCallback((row) => {
    const items = {
      edit: {
        label: 'Edit Taxpayer',
        icon: Pencil,
        className: 'text-gray-700',
        showDrawer: true
      },
      payTax: {
        label: 'Pay Tax',
        icon: CreditCard,
        className: 'text-blue-600',
        showDrawer: true
      }
    };

    // Conditionally add activate/deactivate based on status
    if (row?.status === 'ACTIVE') {
      items.deactivate = {
        label: 'Deactivate',
        icon: Power,
        className: 'text-red-600',
        showDrawer: false
      };
    } else {
      items.activate = {
        label: 'Activate',
        icon: Power,
        className: 'text-green-600',
        showDrawer: false
      };
    }

    return items;
  }, []);

  const renderDrawerContent = useCallback((row, actionType, onClose) => {
    switch (actionType) {
      case 'edit':
        return (
          <TaxpayerForm
            isEditing={true}
            initialData={row._original}
            onSuccess={(data) => {
              handleRowAction(row, { type: actionType, data });
              onClose();
            }}
            onCancel={onClose}
          />
        );
      case 'payTax':
        return (
          <ManualPaymentForm
            taxpayer={row._original}
            onSuccess={(data) => {
              handleRowAction(row, { type: actionType, data });
              onClose();
            }}
            onCancel={onClose}
          />
        );
      default:
        return null;
    }
  }, [handleRowAction]);

  const rows = taxpayers.map(t => ({
    taxId: t.taxId,
    name: t.name,
    email: t.email,
    phone: t.phone,
    type: t.type,
    status: t.status,  // Just pass the status string directly
    _original: t
  }));

  const handleAddTaxpayer = async (data, setFormError) => {
    try {
      await taxpayerApi.createTaxpayer(data, user?.tenantId || 'default', user?.id);
      await loadTaxpayers(search);
      setIsDrawerOpen(false);
    } catch (err) {
      console.error('Error creating taxpayer:', err);
      if (setFormError) {
        setFormError(err.message);
      }
    }
  };

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
        <button 
          onClick={() => loadTaxpayers(search)}
          className="ml-4 text-sm underline hover:text-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  console.log('deactivateModal:', deactivateModal);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Taxpayer
          </button>
        </div>
      </div>

      <TableWrapper
        title="Taxpayers"
        subtitle="A list of all taxpayers registered in your account."
        headers={headers}
        rows={rows}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search taxpayers..."
        onRowClick={handleRowAction}
        loading={loading}
        menuItems={getTaxpayerMenuItems}
        drawerContent={renderDrawerContent}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add New Taxpayer"
      >
        <TaxpayerForm
          onSuccess={handleAddTaxpayer}
          onCancel={() => setIsDrawerOpen(false)}
        />
      </Drawer>

      <ConfirmationModal
        isOpen={deactivateModal.isOpen}
        onClose={() => setDeactivateModal({ isOpen: false, taxpayer: null })}
        onConfirm={handleDeactivation}
        title="Deactivate Taxpayer"
        message={`Are you sure you want to deactivate ${deactivateModal.taxpayer?.name}? This taxpayer will no longer appear in the active taxpayers list.`}
      />

      <ConfirmationModal
        isOpen={activateModal.isOpen}
        onClose={() => setActivateModal({ isOpen: false, taxpayer: null })}
        onConfirm={handleActivation}
        title="Activate Taxpayer"
        message={`Are you sure you want to activate ${activateModal.taxpayer?.name}? This taxpayer will appear in the active taxpayers list.`}
      />
    </div>
  );
}