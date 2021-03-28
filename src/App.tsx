/** @jsxImportSource @emotion/react */

import Canvas from './Canvas';
import Toolbar from './Toolbar';

function App() {
  return (
    <div css={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
