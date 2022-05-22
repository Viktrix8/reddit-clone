import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import client from '../apollo-client'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { sessions, ...pageProps } }: any) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={sessions}>
        <div className="h-screen overflow-y-scroll bg-slate-200">
          <Header />
          <Component {...pageProps} />
          <Toaster position="bottom-right" containerStyle={{ zIndex: 1000 }} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
