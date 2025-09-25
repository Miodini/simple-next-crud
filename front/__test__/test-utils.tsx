// Overriding render to automatically include necessary providers
import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider, type DefaultTheme } from "styled-components"
import { IntlProvider } from 'react-intl'
import { messages } from '../lib/i18n/index'

const theme: DefaultTheme = {
  bg: 'rgb(26, 47, 58)',
  shadow: '0px 0px 15px #0004'
}

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale='en' messages={messages.en}>
        {children}
      </IntlProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}