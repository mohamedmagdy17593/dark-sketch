import { useEffect } from 'react';
import { redo, undo } from './history';
import { setTool, sketchState, Tools } from './sketch';
import { isCmdOrCtrlPressed } from './utils';

function useKeyboardGlobalKeys() {
  useEffect(() => {
    let holdingSpace: Tools | null = null;

    const downHandler = (e: KeyboardEvent) => {
      // Hacky i think
      if (e.code === 'Space') {
        if (!holdingSpace) {
          holdingSpace = sketchState.tool;
          setTool('hand');
        }
        return;
      }

      if (holdingSpace) {
        return;
      }

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

    const upHandler = (e: KeyboardEvent) => {
      // and this is the continue of the Hacky
      if (e.code === 'Space') {
        if (holdingSpace) {
          setTool(holdingSpace);
          holdingSpace = null;
        }
        return;
      }
    };

    const blurHandler = () => {
      if (holdingSpace) {
        setTool(holdingSpace);
        holdingSpace = null;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    window.addEventListener('blur', blurHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener('blur', blurHandler);
    };
  }, []);
}

export default useKeyboardGlobalKeys;
