import { NumenProvider, CssBaseline } from '@numen-ui/core'

function MyApp({ Component, pageProps }) {
  return (
    <NumenProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </NumenProvider>
  )
}
export default MyApp
