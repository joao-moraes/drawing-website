import * as React from 'react';
//import { ToolWindow, ColorPicker, CanvasHue, CanvasColor } from './components'
import { ColorPicker } from './components.js';

const App = () => {
  const [color, setColor] = React.useState({
    'red': 255,
    'green': 0,
    'blue': 0
  })
  
  return (
    <div>
      <h1>Hello</h1>
      <ColorPicker color={color}/>
    </div>
  )
}

export default App;
