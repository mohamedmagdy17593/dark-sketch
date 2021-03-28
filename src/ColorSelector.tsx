/** @jsxImportSource @emotion/react */

import React from 'react';
import { BLUE, GREEN, ORANGE, PINK, RED, WHITE, YELLOW } from './color';
import { BrushIcon } from './Icon';
import { setColor, useSketch } from './sketch';

const colors = [WHITE, RED, PINK, BLUE, GREEN, YELLOW, ORANGE];

function ColorSelector() {
  let { color: sketchColor } = useSketch();

  return (
    <div
      css={{
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        display: 'flex',
        flexFlow: 'column',
        fontSize: 32,
        '> *': { padding: 2 },
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

export default ColorSelector;
