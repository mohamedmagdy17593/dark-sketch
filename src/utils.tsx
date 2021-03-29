import { CANVAS_HEIGHT, CANVAS_MULTIPLIER, CANVAS_WIDTH } from './sketch';

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export function getSvgPathFromStroke(stroke: number[][]) {
  if (stroke.length === 0) return '';

  const d = [];

  let [p0, p1] = stroke;

  d.push('M', p0[0], p0[1], 'Q');

  for (let i = 1; i < stroke.length; i++) {
    d.push(p0[0], p0[1], (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2);
    p0 = p1;
    p1 = stroke[i];
  }

  d.push('Z');

  return d.join(' ');
}

export function getCanvasImageData(ctx: CanvasRenderingContext2D) {
  return ctx.getImageData(
    0,
    0,
    CANVAS_WIDTH * CANVAS_MULTIPLIER,
    CANVAS_HEIGHT * CANVAS_MULTIPLIER,
  );
}

export function isCmdOrCtrlPressed(e: KeyboardEvent) {
  return isMac() ? e.metaKey : e.ctrlKey;
}

export function isMac() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}
