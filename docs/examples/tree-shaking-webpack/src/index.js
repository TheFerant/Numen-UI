import React from 'react'
import ReactDOM from 'react-dom'
import { NumenProvider, CssBaseline, Page, Button } from '@numen-ui/core'

const App = () => {
  return (
    <Page>
      <p>Hello, world.</p>
      <Button>Action</Button>
    </Page>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <NumenProvider>
      <CssBaseline />
      <App />
    </NumenProvider>
  </React.StrictMode>,
  document.getElementById('app'),
)
