import * as React from 'react'
import MyInput from './my-input'
import { NumenProvider, CssBaseline, Page } from '@numen-ui/core'

export default function App() {
  return (
    <NumenProvider>
      <CssBaseline />
      <Page size="mini">
        <MyInput error="this is required" placeholder="my input" />
      </Page>
    </NumenProvider>
  )
}
