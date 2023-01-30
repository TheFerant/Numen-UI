import type { AppProps } from 'next/app'
import { NumenProvider, CssBaseline } from '@numen-ui/core'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NumenProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </NumenProvider>
  )
}
export default MyApp
