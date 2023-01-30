import React from 'react'
import ReactDom from 'react-dom'
import { NumenProvider, CssBaseline } from '@numen-ui/core'
import Home from './home'

const App = () => {
  return (
    <NumenProvider>
      <CssBaseline />
      <Home />
    </NumenProvider>
  )
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

export default App
