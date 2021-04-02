/** @jsxImportSource @emotion/react */

import React from 'react';
import {
  FaPaintBrush,
  FaHandPaper,
  FaUndoAlt,
  FaRedoAlt,
} from 'react-icons/fa';
import { RiEraserFill, RiSave2Fill } from 'react-icons/ri';
import { AiOutlineClear } from 'react-icons/ai';
import { BLUE, GRAY, GREEN, PINK, RED, WHITE, YELLOW, DARK } from './color';
import { redo, undo, useHistoryManager } from './history';
import {
  clearCanvas,
  saveCanvas,
  setColor,
  setTool,
  Tools as ToolsType,
  useSketch,
} from './sketch';

function Toolbar() {
  return (
    <div
      css={{
        position: 'fixed',
        top: '5%',
        display: 'flex',
        flexFlow: 'column',
        fontSize: 18,
        background: GRAY,
        padding: 8,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      }}
    >
      <Tools />
      <hr
        css={{
          width: '100%',
          border: 0,
          borderBottom: `1px solid ${GRAY}`,
          margin: '4px 0',
        }}
      />
      <ColorSelector />
    </div>
  );
}

function Tools() {
  let { tool } = useSketch();
  let { canUndo, canRedo } = useHistoryManager();

  function handleSelectTool(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    let tool = e.currentTarget.name;
    setTool(tool as ToolsType);
  }

  return (
    <div
      css={{
        color: WHITE,
        display: 'flex',
        flexFlow: 'column',
        '> *': {
          cursor: 'pointer',
        },
        '> *:not(:last-child)': {
          marginBottom: 4,
        },
      }}
    >
      <label css={{ color: tool === 'brush' ? DARK : undefined }}>
        <FaPaintBrush />
        <input
          css={{ display: 'none' }}
          name="brush"
          type="radio"
          onClick={handleSelectTool}
        />
      </label>

      <label css={{ color: tool === 'eraser' ? DARK : undefined }}>
        <RiEraserFill />
        <input
          css={{ display: 'none' }}
          name="eraser"
          type="radio"
          onClick={handleSelectTool}
        />
      </label>

      <label css={{ color: tool === 'hand' ? DARK : undefined }}>
        <FaHandPaper />
        <input
          css={{ display: 'none' }}
          name="hand"
          type="radio"
          onClick={handleSelectTool}
        />
      </label>

      <FaUndoAlt css={{ opacity: canUndo ? 1 : 0.5 }} onClick={() => undo()} />

      <FaRedoAlt css={{ opacity: canRedo ? 1 : 0.5 }} onClick={() => redo()} />

      <AiOutlineClear onClick={() => clearCanvas()} />

      <RiSave2Fill onClick={() => saveCanvas()} />
    </div>
  );
}

const colors = [WHITE, BLUE, GREEN, YELLOW, RED, PINK];

function ColorSelector() {
  let { color: sketchColor } = useSketch();

  return (
    <div
      css={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        '> *': {
          cursor: 'pointer',
        },
        '> *:not(:last-child)': {
          marginBottom: 4,
        },
      }}
    >
      {colors.map((color) => {
        let isSelected = color === sketchColor;
        return (
          <div
            key={color}
            css={{
              width: '1em',
              height: '1em',
              background: color,
              borderRadius: '100%',
              flexShrink: 0,
              border: `2px solid ${isSelected ? 'white' : 'transparent'}`,
            }}
            onClick={() => {
              setColor(color);
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default Toolbar;
