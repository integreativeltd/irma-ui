import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { Drawer } from '../ui/drawer';

const ActionMenu = ({ 
  row, 
  onAction, 
  menuItems,
  drawerContent = null,
  drawerTitle = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    const items = Object.keys(menuItems);
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

  const handleAction = (actionKey) => {
    const action = menuItems[actionKey];
    
    if (action.showDrawer) {
      setActiveAction(actionKey);
      setIsDrawerOpen(true);
    } else {
      onAction(row, { type: actionKey });
    }
    setIsOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setActiveAction(null);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Row actions"
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
            {Object.entries(menuItems).map(([key, item], index) => {
              const { label, icon: Icon, className } = item;
              return (
                <button
                  key={key}
                  onClick={() => handleAction(key)}
                  className={`flex w-full items-center px-4 py-2 text-sm ${className} ${
                    activeIndex === index ? 'bg-gray-100' : ''
                  } hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors cursor-pointer`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  {Icon && <Icon className="mr-3 h-4 w-4" aria-hidden="true" />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isDrawerOpen && drawerContent && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleDrawerClose}
          title={drawerTitle || menuItems[activeAction]?.label}
        >
          <div className="p-6">
            {typeof drawerContent === 'function' 
              ? drawerContent(row, activeAction, handleDrawerClose)
              : drawerContent
            }
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default ActionMenu;