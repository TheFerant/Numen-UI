import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix'
import type { MetaFunction } from 'remix'
import { CssBaseline, NumenProvider } from '@numen-ui/core'

export const meta: MetaFunction = () => {
  return { title: 'numen with Remix' }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <NumenProvider>
          <CssBaseline />
          <Outlet />
        </NumenProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
