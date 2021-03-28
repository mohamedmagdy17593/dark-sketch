/** @jsxImportSource @emotion/react */

import { useLayoutEffect, useRef } from 'react';
import Canvas from './Canvas';
import { setAppWrapperPositionAndValidate, useSketch } from './sketch';
import Toolbar from './Toolbar';

function App() {
  let appDivRef = useRef<HTMLDivElement>(null);
  let {
    position: { left, top },
  } = useSketch();

  useLayoutEffect(() => {
    if (appDivRef.current) {
      setAppWrapperPositionAndValidate(appDivRef.current, { left, top });
    }
  }, [left, top]);

  return (
    <div
      ref={appDivRef}
      css={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
