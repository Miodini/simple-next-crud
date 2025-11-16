// Overriding render to automatically include necessary providers
import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider, type DefaultTheme } from "styled-components"
import { IntlProvider } from 'react-intl'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { messages } from '../lib/i18n/index'
import { mockUser } from './mocks'

jest.mock('@/lib/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuthentication: () => ({ account: mockUser })
}))

const theme: DefaultTheme = {
  bg: 'rgb(26, 47, 58)',
  shadow: '0px 0px 15px #0004'
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <IntlProvider locale='en' messages={messages.en}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}