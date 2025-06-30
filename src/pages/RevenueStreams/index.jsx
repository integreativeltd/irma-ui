import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TableWrapper from '../../components/tables/TableWrapper';
import { Pencil, Power, Upload } from 'lucide-react';
import { revenueApi } from '../../features/revenue/api';
import { debounce } from 'lodash';
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from '../../components/ui/drawer';
import { Button } from '../../components/ui/button';

export default function RevenueStreams() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [streams, setStreams] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerAction, setDrawerAction] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const headers = ['IGR Code', 'Revenue Point', 'Rate', 'Amount', 'Allow Part Payment', 'Status'];

  const loadRevenueStreams = async (searchTerm = '') => {
    try {
      setLoading(true);
      const data = await revenueApi.searchRevenueStreams(user?.tenantId || 'default', searchTerm);
      setStreams(data);
    } catch (err) {
      setError('Failed to load revenue streams');
      console.error('Error loading revenue streams:', err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      loadRevenueStreams(searchTerm);
    }, 300),
    []
  );

  useEffect(() => {
    loadRevenueStreams();
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleRowAction = async (row, action) => {
    try {
      if (action.type === 'edit') {
        setSelectedRow(row);
        setDrawerAction('edit');
        setIsDrawerOpen(true);
        return;
      }
      
      switch (action.type) {
        case 'add':
          if (action.data) {
            await revenueApi.createRevenueStream(action.data, user?.tenantId || 'default');
            await loadRevenueStreams(search);
            setIsDrawerOpen(false);
          }
          break;
        case 'edit':
          if (row && action.data) {
            await revenueApi.updateRevenueStream(row._original.id, action.data, user?.tenantId || 'default');
            await loadRevenueStreams(search);
          }
          break;
        case 'activate':
          if (row) {
            await revenueApi.updateRevenueStream(
              row._original.id, 
              { ...row._original, status: 'Active' },
              user?.tenantId || 'default'
            );
            await loadRevenueStreams(search);
          }
          break;
        case 'deactivate':
          if (row) {
            await revenueApi.updateRevenueStream(
              row._original.id,
              { ...row._original, status: 'Inactive' },
              user?.tenantId || 'default'
            );
            await loadRevenueStreams(search);
          }
          break;
        case 'import':
          try {
            await revenueApi.importFromCSV('RevenueStream.csv', user?.tenantId || 'default');
            await loadRevenueStreams(search);
          } catch (err) {
            console.error('Error importing CSV:', err);
            setError('Failed to import revenue streams from CSV');
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Error handling action:', err);
      setError('An error occurred while performing the action');
    }
  };

  const getRevenueStreamMenuItems = useCallback((row) => {
    const items = {
      edit: {
        label: 'Edit Stream',
        icon: Pencil,
        className: 'text-gray-700',
        showDrawer: true
      }
    };

    if (row.status === 'Active') {
      items.deactivate = {
        label: 'Deactivate Stream',
        icon: Power,
        className: 'text-red-600'
      };
    } else {
      items.activate = {
        label: 'Activate Stream',
        icon: Power,
        className: 'text-green-600'
      };
    }
    return items;
  }, []);

  const renderDrawerContent = useCallback((row, actionType) => {
    if (actionType === 'add') {
      return (
        <div className="p-6">
          <form id="addRevenueForm" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            handleRowAction(null, { type: 'add', data });
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">IGR Code</label>
                <input
                  type="text"
                  name="igrCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12496b] focus:ring-[#12496b] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Revenue Point</label>
                <input
                  type="text"
                  name="revenuePoint"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12496b] focus:ring-[#12496b] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rate</label>
                <input
                  type="text"
                  name="rate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12496b] focus:ring-[#12496b] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12496b] focus:ring-[#12496b] sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allow Part Payment</label>
                <select
                  name="allowPartPayment"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#12496b] focus:ring-[#12496b] sm:text-sm"
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      );
    }
    
    // View/edit drawer content
    if (!row || !row._original) {
      return null;
    }

    return (
      <div className="p-6 space-y-4">
        {Object.entries(row._original).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <div className="text-gray-900">{value}</div>
          </div>
        ))}
      </div>
    );
  }, [handleRowAction]);

  const rows = streams.map(s => ({
    igrCode: s.igrCode || '-',
    revenuePoint: s.revenuePoint,
    rate: s.rate,
    amount: new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN'
    }).format(s.amount),
    allowPartPayment: s.allowPartPayment ? 'Yes' : 'No',
    status: s.status,
    _original: s
  }));

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
        <button 
          onClick={() => loadRevenueStreams(search)}
          className="ml-4 text-sm underline hover:text-red-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex space-x-4">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
            onClick={() => {
              setDrawerAction('add');
              setIsDrawerOpen(true);
            }}
          >
            Add Revenue Stream
          </button>
        </div>
      </div>

      <TableWrapper
        title="Revenue Streams"
        subtitle="Manage your revenue streams, rates, and payment options"
        headers={headers}
        rows={rows}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search revenue streams..."
        onRowClick={handleRowAction}
        loading={loading}
        menuItems={getRevenueStreamMenuItems}
      />

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title={drawerAction === 'add' ? 'Add Revenue Stream' : 'Revenue Stream Details'}
      >
        {drawerAction === 'add' ? (
          <>
            {renderDrawerContent(null, 'add')}
            <DrawerFooter>
              <Button
                variant="outline"
                onClick={() => setIsDrawerOpen(false)}
                className="mr-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="addRevenueForm"
              >
                Create
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <>
            {renderDrawerContent(selectedRow, drawerAction)}
            <DrawerFooter>
              <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
            </DrawerFooter>
          </>
        )}
      </Drawer>
    </div>
  );
}