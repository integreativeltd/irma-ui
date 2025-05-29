import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Power, Eye, Save } from 'lucide-react';
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from '../ui/drawer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const MENU_ITEMS = {
  view: { label: 'View Details', icon: Eye, className: 'text-gray-700' },
  edit: { label: 'Edit', icon: Edit, className: 'text-blue-600' },
  activate: { label: 'Activate', icon: Power, className: 'text-green-600' },
  deactivate: { label: 'Deactivate', icon: Power, className: 'text-red-600' },
};

export default function ActionMenu({ status, onAction, row }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [editedData, setEditedData] = useState({});
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (drawerOpen && activeAction === 'edit') {
      setEditedData(row);
    }
  }, [drawerOpen, activeAction, row]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveIndex(-1);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleKeyDown = (e) => {
    const items = Object.keys(MENU_ITEMS);
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
      }
    } else {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0) {
            const action = items[activeIndex];
            handleAction(action);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleAction = (action) => {
    setActiveAction(action);
    setDrawerOpen(true);
    setIsOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const handleInputChange = (key, value) => {
    setEditedData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onAction('edit', editedData);
    setDrawerOpen(false);
  };

  const renderDrawerContent = () => {
    if (!drawerOpen || !row) return null;

    const isEditing = activeAction === 'edit';

    return (
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerHeader onClose={() => setDrawerOpen(false)}>
          {isEditing ? 'Edit Details' : 'View Details'}
        </DrawerHeader>
        <DrawerContent>
          <div className="space-y-4">
            {Object.entries(row).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {isEditing ? (
                  <Input
                    type="text"
                    value={editedData[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <div className="text-gray-900">{value}</div>
                )}
              </div>
            ))}
          </div>
        </DrawerContent>
        <DrawerFooter>
          {isEditing ? (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setDrawerOpen(false)}>Close</Button>
          )}
        </DrawerFooter>
      </Drawer>
    );
  };

  // Filter menu items based on status
  const getAvailableActions = () => {
    const normalizedStatus = status.toLowerCase();
    const actions = ['view', 'edit'];
    
    if (normalizedStatus === 'active') {
      actions.push('deactivate');
    } else if (normalizedStatus === 'inactive') {
      actions.push('activate');
    }
    
    return actions;
  };

  const availableActions = getAvailableActions();

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Actions"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            {availableActions.map((action, index) => {
              const { label, icon: Icon, className } = MENU_ITEMS[action];
              return (
                <button
                  key={action}
                  onClick={() => handleAction(action)}
                  className={`flex w-full items-center px-4 py-2 text-sm ${className} ${
                    activeIndex === index ? 'bg-gray-100' : ''
                  } hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors cursor-pointer`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {renderDrawerContent()}
    </div>
  );
}