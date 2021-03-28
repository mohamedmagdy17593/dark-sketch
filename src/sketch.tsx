import { proxy, useSnapshot } from 'valtio';
import { getSvgPathFromStroke } from './utils';
import getStroke from 'perfect-freehand';
import { WHITE } from './color';

export const CANVAS_MULTIPLIER = 2;

export type Tools = 'brush' | 'eraser' | 'hand';

export const refs = {
  canvas: {} as HTMLCanvasElement,
  ctx: {} as CanvasRenderingContext2D,
  points: [] as number[][],
  pointType: '',
};
export const sketchState = proxy({
  color: WHITE,
  tool: 'brush' as Tools,
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
  refs.canvas.width = window.innerWidth * CANVAS_MULTIPLIER;
  refs.canvas.height = window.innerHeight * CANVAS_MULTIPLIER;
  setFillStyle(sketchState.color);
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

/**
 * Editor actions
 */
export function setColor(color: string) {
  sketchState.color = color;
}

export function setTool(tool: Tools) {
  sketchState.tool = tool;
}
