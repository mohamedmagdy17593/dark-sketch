import { proxy, useSnapshot } from 'valtio';
import { CANVAS_HEIGHT, CANVAS_WIDTH, getSvgPathFromStroke } from './utils';
import getStroke from 'perfect-freehand';
import { WHITE } from './color';

export const CANVAS_MULTIPLIER = 2;

export type Tools = 'brush' | 'eraser' | 'hand';

export const refs = {
  canvas: {} as HTMLCanvasElement,
  ctx: {} as CanvasRenderingContext2D,
  // for brush and eraser
  pointType: '',
  points: [] as number[][],
  // for hand
  startPoint: { top: 0, left: 0 },
  startXAndY: { x: 0, y: 0 },
};
export const sketchState = proxy({
  color: WHITE,
  tool: 'brush' as Tools,
  position: {
    top: (CANVAS_HEIGHT - window.innerHeight) / 2,
    left: (CANVAS_WIDTH - window.innerWidth) / 2,
  },
});

export function useSketch() {
  return useSnapshot(sketchState);
}

/**
 * Initialize App refs
 */
export function initCanvas(node: HTMLCanvasElement) {
  refs.canvas = node;
}

export function initCtx() {
  refs.ctx = refs.canvas.getContext('2d')!;
}

/**
 * Canvas Actions
 */
export function resizeCanvas() {
  refs.canvas.width = CANVAS_WIDTH * CANVAS_MULTIPLIER;
  refs.canvas.height = CANVAS_HEIGHT * CANVAS_MULTIPLIER;
}

export function setFillStyle(color: string) {
  refs.ctx.fillStyle = color;
}

export function initPoints(pointType: string, point: number[]) {
  refs.pointType = pointType;
  refs.points = [point];
  draw();
}

export function appendToPoints(point: number[]) {
  refs.points.push(point);
  draw();
}

export function clearPoints() {
  refs.points = [];
}

export function draw() {
  let svgPoints = getSvgPathFromStroke(
    getStroke(refs.points, {
      size:
        sketchState.tool === 'brush'
          ? 16
          : sketchState.tool === 'eraser'
          ? 60
          : 0,
      thinning: 0.75,
      smoothing: 0.5,
      streamline: 0.5,
      simulatePressure: refs.pointType !== 'pen',
    }),
  );
  let p = new Path2D(svgPoints);
  refs.ctx.fill(p);
}

export function setDragStartPoint({ x, y }: { x: number; y: number }) {
  refs.startPoint = { ...sketchState.position };
  refs.startXAndY = { x, y };
}

export function dragPoints({ x, y }: { x: number; y: number }) {
  let dx = x - refs.startXAndY.x;
  let dy = y - refs.startXAndY.y;
  sketchState.position.left = refs.startPoint.left - dx;
  sketchState.position.top = refs.startPoint.top - dy;
}

export function setAppWrapperPositionAndValidate(
  node: HTMLDivElement,
  { top, left }: { top: number; left: number },
) {
  // set values to dom
  node.scrollTop = top;
  node.scrollLeft = left;
  // validate top and left value from dom
  sketchState.position.top = node.scrollTop;
  sketchState.position.left = node.scrollLeft;
}

/**
 * Editor actions
 */
export function setColor(color: string) {
  sketchState.color = color;
}

export function setTool(tool: Tools) {
  sketchState.tool = tool;
}
