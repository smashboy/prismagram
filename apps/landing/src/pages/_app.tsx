import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { theme } from '@/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
