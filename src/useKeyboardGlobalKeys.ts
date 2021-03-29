import { useEffect } from 'react';
import { redo, undo } from './history';
import { setTool } from './sketch';
import { isCmdOrCtrlPressed } from './utils';

function useKeyboardGlobalKeys() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      let isCmdZ = isCmdOrCtrlPressed(e) && (e.key === 'z' || e.key === 'Z');
      if (isCmdZ && e.shiftKey) {
        e.preventDefault();
        (e.target as any)?.blur?.();
        redo();
      } else if (isCmdZ) {
        e.preventDefault();
        (e.target as any)?.blur?.();
        undo();
      }

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
