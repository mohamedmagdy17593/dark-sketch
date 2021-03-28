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

export const CANVAS_WIDTH = 3000;
export const CANVAS_HEIGHT = 3000;
