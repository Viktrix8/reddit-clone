import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { sessions, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={sessions}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
