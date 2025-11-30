import { useEffect } from 'react';

export function useContentProtection() {
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+P, Ctrl+U
      if (
        (e.ctrlKey || e.metaKey) && 
        ['c', 'x', 's', 'p', 'u', 'a'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        return false;
      }
      
      // Prevent F12 (DevTools) - optional, but often requested with this kind of feature
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // Disable right-click
    document.addEventListener('contextmenu', preventDefault);
    
    // Disable copy/cut/paste
    document.addEventListener('copy', preventDefault);
    document.addEventListener('cut', preventDefault);
    document.addEventListener('paste', preventDefault);
    
    // Disable drag start (prevent dragging images out)
    document.addEventListener('dragstart', preventDefault);

    // Disable keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('paste', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
