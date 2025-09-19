'use client'
import { Montserrat } from 'next/font/google'
import { ThemeProvider, type DefaultTheme } from "styled-components"
import { config as faConfig } from "@fortawesome/fontawesome-svg-core"
import '@fortawesome/fontawesome-svg-core/styles.css' // Needed to prevent fa icon huge on load bug
import 'bootstrap/dist/css/bootstrap.css'

import Root from "./_components/Root"
import Logo from "./_components/Logo"
import Side from "./_components/Side"
import GlobalStyle from "./_components/GlobalStyle"
import StyledComponentsRegistry from "@/lib/registry"

faConfig.autoAddCss = false
const montserrat = Montserrat({ subsets: ['latin']})
const theme: DefaultTheme = {
  bg: 'rgb(26, 47, 58)',
  shadow: '0px 0px 15px #0004',
  asideWidth: 225,
  headerHeight: 100
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <Root>
              <GlobalStyle />
              <Logo />
              <Side />
              {children}
            </Root>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
