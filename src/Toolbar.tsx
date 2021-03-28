/** @jsxImportSource @emotion/react */

import React from 'react';
import { FaPaintBrush, FaHandPaper } from 'react-icons/fa';
import { RiEraserFill } from 'react-icons/ri';
import {
  BLUE,
  GRAY,
  GREEN,
  ORANGE,
  PINK,
  RED,
  WHITE,
  YELLOW,
  DARK,
} from './color';
import { BrushIcon } from './Icon';
import { setColor, setTool, Tools as ToolsType, useSketch } from './sketch';

function Toolbar() {
  return (
    <div
      css={{
        position: 'absolute',
        top: '5%',
        // transform: 'translate(0, -50%)',
        display: 'flex',
        flexFlow: 'column',
        fontSize: 24,
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
          margin: '8px 0',
        }}
      />
      <ColorSelector />
    </div>
  );
}

function Tools() {
  let { tool } = useSketch();

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
        '> *': { padding: '2px' },
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
    </div>
  );
}

const colors = [WHITE, RED, PINK, BLUE, GREEN, YELLOW, ORANGE];

function ColorSelector() {
  let { color: sketchColor } = useSketch();

  return (
    <div
      css={{
        display: 'flex',
        flexFlow: 'column',
        '> *': { padding: '2px 4px' },
        '> *:not(:last-child)': {
          marginBottom: 4,
        },
      }}
    >
      {colors.map((color) => {
        let isSelected = color === sketchColor;
        return (
          <BrushIcon
            color={color}
            selected={isSelected}
            onClick={() => {
              setColor(color);
            }}
          />
        );
      })}
    </div>
  );
}

export default Toolbar;
