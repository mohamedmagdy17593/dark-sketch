import { useSnapshot, ref } from 'valtio';
import { proxyWithComputed } from 'valtio/utils';
import { applyCanvasHistoryState } from './sketch';

export interface CanvasHistoryState {
  imgData: ImageData;
}

export let historyManager = proxyWithComputed(
  {
    undoStack: [] as CanvasHistoryState[],
    redoStack: [] as CanvasHistoryState[],
    lastState: { imgData: {} as ImageData } as CanvasHistoryState,
  },
  {
    canUndo: (snap) => snap.undoStack.length > 0,
    canRedo: (snap) => snap.redoStack.length > 0,
  },
);
// @ts-ignore
window.historyManager = historyManager;

export function getCanvasHistoryState(imgData: ImageData) {
  return { imgData: ref(imgData) };
}

export function initHistoryManager(imgData: ImageData) {
  historyManager.lastState = getCanvasHistoryState(imgData);
}

export function useHistoryManager() {
  return useSnapshot(historyManager);
}

export function pushToHistory(imgData: ImageData) {
  let historyEditorState = getCanvasHistoryState(imgData);
  // add last state to undo stack
  historyManager.undoStack.push(historyManager.lastState);
  // clear redo stack if there is any state on it
  historyManager.redoStack.length = 0;
  // assign new editor State to lastState
  historyManager.lastState = historyEditorState;
}

export function undo() {
  if (!historyManager.canUndo) {
    return;
  }
  historyManager.redoStack.push(historyManager.lastState);
  historyManager.lastState = historyManager.undoStack.pop()!;
  applyCanvasHistoryState(historyManager.lastState);
}

export function redo() {
  if (!historyManager.canRedo) {
    return;
  }
  historyManager.undoStack.push(historyManager.lastState);
  historyManager.lastState = historyManager.redoStack.pop()!;
  applyCanvasHistoryState(historyManager.lastState);
}

// @ts-ignore
window.undo = undo;
// @ts-ignore
window.redo = redo;
