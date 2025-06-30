import api from '../../services/api';
import { getStoredToken } from '../../utils/auth';

export const paymentApi = {
  createPayment: async (formData, tenantId, userId) => {
    try {
      console.debug('Creating payment with data:', {
        taxpayerId: formData.get('taxpayerId'),
        taxpayerName: formData.get('taxpayerName'),
        amount: formData.get('amount'),
        method: formData.get('method'),
        status: formData.get('status'),
        paymentDate: formData.get('paymentDate')
      });

      const response = await api.post('/api/payments', formData, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId,
          'X-User-ID': userId,
        }
      });
      
      if (!response.data?.paymentId) {
        throw new Error('Invalid payment response from server');
      }

      // Wait a short time for the payment to be indexed
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return response.data;
    } catch (error) {
      console.error('Payment creation error:', error.response || error);
      throw new Error(error.response?.data?.message || 'Failed to create payment');
    }
  },

  getPayments: async (tenantId, searchTerm = '', retryCount = 0) => {
    try {
      const response = await api.get('/api/payments', {
        params: { search: searchTerm },
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No payment data received');
      }

      return response.data;
    } catch (error) {
      console.error('Get payments error:', error.response || error);
      
      // If we get a 404 and haven't retried too many times, wait and retry
      if (error.response?.status === 404 && retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return paymentApi.getPayments(tenantId, searchTerm, retryCount + 1);
      }

      throw new Error(error.response?.data?.message || 'Failed to fetch payments');
    }
  },

  confirmPayment: async (paymentId, tenantId, retryCount = 0) => {
    try {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }

      console.debug('Confirming payment:', { paymentId, tenantId });

      const response = await api.post(
        `/api/payments/${paymentId}/confirm`,
        { status: 'Confirmed' },
        {
          headers: {
            'Authorization': `Bearer ${getStoredToken()}`,
            'X-Tenant-ID': tenantId,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.data) {
        throw new Error('No response received from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Payment confirmation error:', error.response || error);

      // If we get a 404 and haven't retried too many times, wait and retry
      if (error.response?.status === 404 && retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return paymentApi.confirmPayment(paymentId, tenantId, retryCount + 1);
      }

      const errorMessage = error.response?.data?.message;
      
      if (error.response?.status === 404) {
        throw new Error(errorMessage || 'Payment not found. Please refresh the page and try again.');
      }
      if (error.response?.status === 400) {
        throw new Error(errorMessage || 'Invalid payment status transition');
      }
      if (error.response?.status === 403) {
        throw new Error(errorMessage || 'Not authorized to confirm this payment');
      }
      
      throw new Error(errorMessage || 'Failed to confirm payment');
    }
  },

  cancelPayment: async (paymentId, tenantId) => {
    try {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }

      console.debug('Cancelling payment:', { paymentId, tenantId });

      const response = await api.post(
        `/api/payments/${paymentId}/cancel`,
        { status: 'Cancelled' },
        {
          headers: {
            'Authorization': `Bearer ${getStoredToken()}`,
            'X-Tenant-ID': tenantId,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.data) {
        throw new Error('No response received from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('Payment cancellation error:', error.response || error);
      const errorMessage = error.response?.data?.message;

      if (error.response?.status === 404) {
        throw new Error(errorMessage || 'Payment not found. Please refresh the page and try again.');
      }
      if (error.response?.status === 400) {
        throw new Error(errorMessage || 'Payment cannot be cancelled in its current state');
      }
      if (error.response?.status === 403) {
        throw new Error(errorMessage || 'Not authorized to cancel this payment');
      }

      throw new Error(errorMessage || 'Failed to cancel payment');
    }
  },

  getReceipt: async (paymentId, tenantId) => {
    try {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }

      console.debug('Getting receipt for payment:', { paymentId, tenantId });

      const response = await api.get(`/api/payments/${paymentId}/receipt`, {
        headers: {
          'Authorization': `Bearer ${getStoredToken()}`,
          'X-Tenant-ID': tenantId,
          'Accept': 'application/pdf,image/*'
        },
        responseType: 'blob'
      });

      if (!response.data || response.data.size === 0) {
        throw new Error('Receipt file is empty or invalid');
      }

      return response.data;
    } catch (error) {
      console.error('Get receipt error:', error.response || error);
      const errorMessage = error.response?.data?.message;

      if (error.response?.status === 404) {
        throw new Error(errorMessage || 'Receipt not found. The payment might not exist or have no receipt attached.');
      }
      if (error.response?.status === 403) {
        throw new Error(errorMessage || 'Not authorized to view this receipt');
      }

      throw new Error(errorMessage || error.message || 'Failed to fetch receipt');
    }
  }
};