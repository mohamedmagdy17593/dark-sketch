import { useEffect } from 'react';
import { setTool } from './sketch';

function useKeyboardGlobalKeys() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'p': // pen
        case 'P':
        case 'b': // brush
        case 'B': {
          setTool('brush');
          break;
        }
        case 'e':
        case 'E': {
          setTool('eraser');
          break;
        }
        case 'h':
        case 'H': {
          setTool('hand');
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}

export default useKeyboardGlobalKeys;
