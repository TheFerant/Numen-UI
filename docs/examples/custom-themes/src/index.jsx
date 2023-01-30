import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { NumenProvider, CssBaseline, Page, Text } from '@numen-ui/core'
import { greenTheme, redTheme } from './theme'
import Home from './home'

const App = () => {
  const [theme, setTheme] = useState('light')
  return (
    <NumenProvider themes={[greenTheme, redTheme]} themeType={theme}>
      <CssBaseline />
      <Page size="mini" dotBackdrop>
        <Page.Header>
          <Text h2>Custom themes for numen UI</Text>
        </Page.Header>
        <Home onThemeChange={next => setTheme(next)} />
      </Page>
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
