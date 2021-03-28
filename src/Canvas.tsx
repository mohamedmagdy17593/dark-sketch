/** @jsxImportSource @emotion/react */
import { useEffect, useLayoutEffect } from 'react';
import { DARK } from './color';
import {
  appendToPoints,
  CANVAS_MULTIPLIER,
  clearPoints,
  initCanvas,
  initCtx,
  initPoints,
  resizeCanvas,
  setFillStyle,
  useSketch,
} from './sketch';

function Canvas() {
  let { color: sketchColor } = useSketch();

  useLayoutEffect(() => {
    initCtx();
  }, []);

  // on window resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    setFillStyle(sketchColor);
  }, [sketchColor]);

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    initPoints(e.pointerType, [
      e.pageX * CANVAS_MULTIPLIER,
      e.pageY * CANVAS_MULTIPLIER,
      e.pressure,
    ]);
  }

  function handlePointerMove(e: React.PointerEvent) {
    e.preventDefault();
    if (e.buttons === 1) {
      appendToPoints([
        e.pageX * CANVAS_MULTIPLIER,
        e.pageY * CANVAS_MULTIPLIER,
        e.pressure,
      ]);
    }
  }

  function handlePointerUp() {
    clearPoints();
  }

  return (
    <canvas
      ref={(node) => {
        initCanvas(node!);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      css={{ width: '100%', height: '100%', background: DARK }}
    ></canvas>
  );
}

export default Canvas;
