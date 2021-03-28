/** @jsxImportSource @emotion/react */

import Canvas from './Canvas';
import ColorSelector from './ColorSelector';

function App() {
  return (
    <div css={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ColorSelector />
      <Canvas />
    </div>
  );
}

export default App;
