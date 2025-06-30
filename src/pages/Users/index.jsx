import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userApi } from '../../features/users/api';
import TableWrapper from '../../components/tables/TableWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Drawer } from '../../components/ui/drawer';
import { UserPlus, UserCog, UserCheck, UserX } from 'lucide-react';
import { AddUserForm } from './AddUserForm';

const ROLES = {
  ADMIN: 'Admin',
  SUPERVISOR: 'Supervisor',
  TAX_OFFICER: 'Tax Officer'
};

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const headers = [
    'Name',
    'Email',
    'Roles',
    'Status',
    'Last Login'
  ];

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userApi.getUsers(user?.tenantId || 'default');
      setUsers(data);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  }, [user?.tenantId]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreateUser = async (userData) => {
    try {
      await userApi.createUser(userData, user?.tenantId || 'default');
      await loadUsers();
      setShowAddUser(false);
    } catch (err) {
      throw new Error(err.message || 'Failed to create user');
    }
  };

  const handleRoleChange = async (userId, roles) => {
    try {
      await userApi.updateUserRoles(userId, roles, user?.tenantId || 'default');
      await loadUsers();
      setSelectedRoles(roles);
    } catch (err) {
      console.error('Error updating roles:', err);
      setError('Failed to update roles. ' + (err.message || ''));
    }
  };

  const handleToggleStatus = async (userId, isActive) => {
    try {
      await userApi.toggleUserStatus(userId, isActive, user?.tenantId || 'default');
      await loadUsers();
    } catch (err) {
      console.error('Error toggling user status:', err);
      setError('Failed to update user status. ' + (err.message || ''));
    }
  };

  const getUserMenuItems = useCallback((row) => {
    if (!row?._original?.id) return {};

    const items = {
      edit: {
        label: 'Edit User',
        icon: UserCog,
        className: 'text-gray-700',
        showDrawer: true
      }
    };

    if (row._original.isActive) {
      items.deactivate = {
        label: 'Deactivate User',
        icon: UserX,
        className: 'text-red-600'
      };
    } else {
      items.activate = {
        label: 'Activate User',
        icon: UserCheck,
        className: 'text-green-600'
      };
    }

    return items;
  }, []);

  const handleRowAction = async (row, action) => {
    const user = row._original;
    
    switch (action.type) {
      case 'edit':
        setSelectedUser(user);
        setSelectedRoles(user.roles);
        setIsDrawerOpen(true);
        break;
      case 'activate':
        await handleToggleStatus(user.id, true);
        break;
      case 'deactivate':
        await handleToggleStatus(user.id, false);
        break;
    }
  };

  const renderDrawerContent = () => {
    if (showAddUser) {
      return (
        <div className="p-6">
          <AddUserForm 
            onSubmit={handleCreateUser}
            onCancel={() => setShowAddUser(false)}
          />
        </div>
      );
    }

    if (!selectedUser) return null;

    return (
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Edit User Roles</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roles
            </label>
            <Select
              multiple
              value={selectedRoles}
              onValueChange={(roles) => handleRoleChange(selectedUser.id, roles)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select roles" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROLES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">User Details</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {selectedUser.name}</p>
              <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
              <p>
                <span className="font-medium">Status:</span>
                <span className={selectedUser.isActive ? 'text-green-600' : 'text-red-600'}>
                  {selectedUser.isActive ? ' Active' : ' Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const rows = users.map(u => ({
    name: u.name,
    email: u.email,
    roles: u.roles.map(r => ROLES[r]).join(', ') || 'No roles assigned',
    status: u.isActive ? 
      <span className="text-green-600">Active</span> : 
      <span className="text-red-600">Inactive</span>,
    lastLogin: u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never',
    _original: u
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
            onClick={() => {
              setShowAddUser(true);
              setIsDrawerOpen(true);
            }}
          >
            Add User
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 text-red-600 bg-red-50 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button 
            onClick={loadUsers}
            className="ml-4 text-sm underline hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      <TableWrapper
        title="Users"
        subtitle="Manage system users and their roles"
        headers={headers}
        rows={rows}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search users..."
        onRowClick={handleRowAction}
        loading={loading}
        menuItems={getUserMenuItems}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedUser(null);
          setSelectedRoles([]);
          setShowAddUser(false);
        }}
        title={showAddUser ? "Add New User" : "User Management"}
      >
        {renderDrawerContent()}
      </Drawer>
    </div>
  );
}