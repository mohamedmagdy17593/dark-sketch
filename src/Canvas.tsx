/** @jsxImportSource @emotion/react */
import { useEffect, useLayoutEffect } from 'react';
import { DARK } from './color';
import {
  appendToPoints,
  CANVAS_MULTIPLIER,
  clearPoints,
  dragPoints,
  initCanvas,
  initCtx,
  initPoints,
  resizeCanvas,
  setDragStartPoint,
  setFillStyle,
  useSketch,
} from './sketch';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './utils';

function Canvas() {
  let {
    color: sketchColor,
    tool,
    position: { top, left },
  } = useSketch();

  useLayoutEffect(() => {
    initCtx();
  }, []);

  useEffect(() => {
    resizeCanvas();
  }, []);

  useEffect(() => {
    if (tool === 'brush') {
      setFillStyle(sketchColor);
    } else if (tool === 'eraser') {
      setFillStyle(DARK);
    }
  }, [sketchColor, tool]);

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    switch (tool) {
      case 'brush':
      case 'eraser': {
        initPoints(e.pointerType, [
          (left + e.pageX) * CANVAS_MULTIPLIER,
          (top + e.pageY) * CANVAS_MULTIPLIER,
          e.pressure,
        ]);
        break;
      }
      case 'hand': {
        setDragStartPoint({ x: e.pageX, y: e.pageY });
      }
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    e.preventDefault();
    if (e.buttons === 1) {
      switch (tool) {
        case 'brush':
        case 'eraser': {
          appendToPoints([
            (left + e.pageX) * CANVAS_MULTIPLIER,
            (top + e.pageY) * CANVAS_MULTIPLIER,
            e.pressure,
          ]);
          break;
        }
        case 'hand': {
          dragPoints({ x: e.pageX, y: e.pageY });
        }
      }
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
      css={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, background: DARK }}
    ></canvas>
  );
}

export default Canvas;
