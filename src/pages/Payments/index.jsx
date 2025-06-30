import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FileText, XCircle, CheckCircle2 } from 'lucide-react';
import TableWrapper from '../../components/tables/TableWrapper';
import { paymentApi } from '../../features/payments/api';
import { Drawer } from '../../components/ui/drawer';

export default function Payments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const headers = [
    'Payment ID',
    'Taxpayer Name',
    'Amount',
    'Method',
    'Status',
    'Date'
  ];

  const loadPayments = useCallback(async (searchTerm = '') => {
    try {
      setLoading(true);
      setError('');
      const data = await paymentApi.getPayments(user?.tenantId || 'default', searchTerm);
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid payment data received');
      }
      setPayments(data);
    } catch (err) {
      console.error('Error loading payments:', err);
      setError('Failed to load payments. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  }, [user?.tenantId]);

  // Effect to load payments and handle navigation state
  useEffect(() => {
    const init = async () => {
      try {
        await loadPayments(search);
      } catch (err) {
        console.error('Failed to load initial payments:', err);
      }
    };
    init();

    // Clean up any selected receipt URLs
    return () => {
      if (selectedReceipt?.url) {
        URL.revokeObjectURL(selectedReceipt.url);
      }
    };
  }, [loadPayments, search]);

  // Effect to reload payments when returning from manual payment entry
  useEffect(() => {
    if (location.state?.refresh) {
      const refreshPayments = async () => {
        try {
          await loadPayments(search);
          // Clear the location state after refresh
          navigate(location.pathname, { replace: true });
        } catch (err) {
          console.error('Failed to refresh payments:', err);
        }
      };
      refreshPayments();
    }
  }, [location.state, loadPayments, search, navigate, location.pathname]);

  const handleRowAction = async (row, action) => {
    if (actionInProgress) return;
    if (!row?._original?.paymentId) {
      setError('Invalid payment selected');
      return;
    }
    
    const payment = row._original;
    setActionInProgress(true);
    setError(''); // Clear any previous errors
    
    try {
      switch (action.type) {
        case 'confirm':
          await paymentApi.confirmPayment(payment.paymentId, user?.tenantId || 'default');
          await loadPayments(search); // Refresh the list after confirmation
          break;
          
        case 'cancel':
          await paymentApi.cancelPayment(payment.paymentId, user?.tenantId || 'default');
          await loadPayments(search); // Refresh the list after cancellation
          break;
          
        case 'receipt':
          try {
            const receiptBlob = await paymentApi.getReceipt(payment.paymentId, user?.tenantId || 'default');
            if (!receiptBlob) {
              throw new Error('Receipt not found');
            }
            const receiptUrl = URL.createObjectURL(receiptBlob);
            setSelectedReceipt({ url: receiptUrl, type: receiptBlob.type });
            setIsDrawerOpen(true);
          } catch (err) {
            console.error('Error loading receipt:', err);
            setError(err.message || 'Failed to load receipt');
          }
          break;
          
        default:
          break;
      }
    } catch (err) {
      console.error('Error processing payment action:', err);
      setError(err.message || 'Failed to process payment action');
    } finally {
      setActionInProgress(false);
    }
  };

  const getPaymentMenuItems = useCallback((row) => {
    if (!row?._original?.paymentId) {
      return {};
    }
    
    const status = row.status?.toLowerCase();
    const items = {};

    switch (status) {
      case 'pending':
        items.confirm = {
          label: 'Confirm Payment',
          icon: CheckCircle2,
          className: 'text-green-600'
        };
        items.cancel = {
          label: 'Cancel Payment',
          icon: XCircle,
          className: 'text-red-600'
        };
        break;
      case 'confirmed':
      case 'completed':
        if (row._original.slip || row._original.receiptUrl || row._original.slipUrl) {
          items.receipt = {
            label: 'View Receipt',
            icon: FileText,
            className: 'text-gray-700'
          };
        }
        break;
    }
    
    return items;
  }, []);

  const renderDrawerContent = useCallback((row) => {
    if (selectedReceipt) {
      return (
        <div className="h-full w-full flex flex-col">
          <div className="flex-1 overflow-auto">
            {selectedReceipt.type.startsWith('image/') ? (
              <img src={selectedReceipt.url} alt="Payment Receipt" className="w-full h-auto" />
            ) : (
              <iframe src={selectedReceipt.url} className="w-full h-full" title="Payment Receipt" />
            )}
          </div>
        </div>
      );
    }

    if (!row?._original) {
      return null;
    }

    return (
      <div className="space-y-4">
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
  }, [selectedReceipt]);

  const rows = payments.map(p => ({
    paymentId: p.paymentId,
    taxpayerName: p.taxpayerName,
    amount: `₦${new Intl.NumberFormat('en-NG').format(p.amount)}`,
    method: p.method,
    status: p.status,
    date: p.paymentDate ? new Date(p.paymentDate).toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A',
    _original: p
  }));

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg flex items-center justify-between">
        <span>{error}</span>
        <button 
          onClick={() => loadPayments(search)}
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
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
            onClick={() => navigate('/manual-payment')}
            disabled={actionInProgress}
          >
            Record Payment
          </button>
        </div>
      </div>

      <TableWrapper
        title="Payments"
        subtitle="A list of all tax payments recorded in the system."
        headers={headers}
        rows={rows}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search payments..."
        onRowClick={handleRowAction}
        loading={loading}
        menuItems={getPaymentMenuItems}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          if (selectedReceipt?.url) {
            URL.revokeObjectURL(selectedReceipt.url);
            setSelectedReceipt(null);
          }
        }}
        title="Payment Receipt"
      >
        {renderDrawerContent(selectedReceipt)}
      </Drawer>
    </div>
  );
}
