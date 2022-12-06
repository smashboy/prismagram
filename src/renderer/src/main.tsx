import React from 'react'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'
import App from './App'
import { theme } from './core/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
