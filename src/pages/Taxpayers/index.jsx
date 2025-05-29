import React, { useEffect, useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { getTaxpayers } from '../../features/taxpayers/api';
import TableWrapper from '../../components/tables/TableWrapper';
import taxpayers from './taxpayers';

export default function Taxpayers() {
  const tenant = useTenant();
  // const [taxpayers, setTaxpayers] = useState([]);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   async function loadData() {
  //     const data = await getTaxpayers(tenant, search);
  //     setTaxpayers(data);
  //   }
  //   loadData();
  // }, [tenant, search]);

  const headers = ['Taxpayer ID', 'Name', 'Email', 'Status'];

  const filteredTaxpayers = taxpayers.filter((t) =>
    `${t.name} ${t.taxpayerId}`.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filteredTaxpayers.map(t => [
    t.taxpayerId,
    t.name,
    t.email,
    t.status,
  ]);
  

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
          >
            Add Taxpayer
          </button>
        </div>
      </div>

    <TableWrapper
      title="Taxpayers"
      subtitle="A list of all taxpayers registered in your account."
      headers={headers}
      rows={taxpayers}
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Search taxpayers..."
    />

    </div>
  );
}