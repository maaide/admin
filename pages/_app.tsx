import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/layouts'
import { SWRConfig } from 'swr'
import { SessionProvider } from "next-auth/react"
import { LeftMenu } from '@/components/ui'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <SessionProvider session={session}>
        <ThemeProvider attribute='class'>
          <Navbar>
            <LeftMenu>
              <Component {...pageProps} />
            </LeftMenu>
          </Navbar>
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  )
}
