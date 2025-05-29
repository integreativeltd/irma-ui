import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, FileText, XCircle, CheckCircle2 } from 'lucide-react';
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from '../ui/drawer';
import { Button } from '../ui/button';

const MENU_ITEMS = {
  confirm: { label: 'Confirm Payment', icon: CheckCircle2, className: 'text-green-600' },
  cancel: { label: 'Cancel Payment', icon: XCircle, className: 'text-red-600' },
  receipt: { label: 'View Receipt', icon: FileText, className: 'text-gray-700' },
};

export default function PaymentActionMenu({ status, onAction, row }) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

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
    if (action === 'receipt') {
      setActiveAction(action);
      setDrawerOpen(true);
    } else {
      onAction(action);
    }
    setIsOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const renderDrawerContent = () => {
    if (!drawerOpen) return null;

    return (
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerHeader onClose={() => setDrawerOpen(false)}>
          {activeAction === 'receipt' ? 'Payment Receipt' : 'Payment Details'}
        </DrawerHeader>
        <DrawerContent>
          <div className="space-y-4">
            {Object.entries(row).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <div className="text-gray-900">{value}</div>
              </div>
            ))}
          </div>
        </DrawerContent>
        <DrawerFooter>
          <Button onClick={() => setDrawerOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    );
  };

  // Filter menu items based on payment status
  const getAvailableActions = () => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'pending':
        return ['confirm', 'cancel'];
      case 'confirmed':
      case 'completed':
        return ['receipt'];
      case 'cancelled':
        return [];
      default:
        return Object.keys(MENU_ITEMS);
    }
  };

  const availableActions = getAvailableActions();

  if (availableActions.length === 0) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Payment actions"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      
      {isOpen && availableActions.length > 0 && (
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