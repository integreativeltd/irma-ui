import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Drawer = React.forwardRef(({ children, isOpen, onClose, className }, ref) => (
  <>
    {isOpen && (
      <>
        <div 
          className="fixed inset-0 bg-gray-600/25 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
        <div
          ref={ref}
          className={cn(
            "fixed right-0 top-0 h-full w-[800px] bg-white z-[61] shadow-xl transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full",
            className
          )}
        >
          {children}
        </div>
      </>
    )}
  </>
));

const DrawerHeader = ({ children, onClose }) => (
  <div className="flex items-center justify-between px-8 py-6 border-b">
    <div className="text-2xl font-semibold text-left">{children}</div>
    <button
      onClick={onClose}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <X className="h-6 w-6" />
    </button>
  </div>
);

const DrawerContent = ({ children, className }) => (
  <div className={cn("p-8 text-left", className)}>
    {children}
  </div>
);

const DrawerFooter = ({ children, className }) => (
  <div className={cn("px-8 py-6 border-t mt-auto text-left", className)}>
    {children}
  </div>
);

Drawer.displayName = "Drawer";

export { Drawer, DrawerHeader, DrawerContent, DrawerFooter };