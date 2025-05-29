// src/features/taxpayers/api.js
import axios from '../../services/api';

export async function getTaxpayers(tenantId, search) {
  const response = await axios.get(`/api/${tenantId}/taxpayers`, {
    params: { q: search }
  });
  return response.data;
}
