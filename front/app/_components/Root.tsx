'use client'
import dynamic from "next/dynamic"
import styled from "styled-components"
import { ThemeProvider, type DefaultTheme } from "styled-components"

import Logo from "./Logo"
import Side from "./Side"
import GlobalStyle from "./GlobalStyle"

const ClientIntlProvider = dynamic(() => import('@/lib/i18n/ClientIntlProvider'), { ssr: false })
// Heights for mobile layout
const menuHeight = '100px'
const logoHeight = '75px'

const theme: DefaultTheme = {
  bg: 'rgb(26, 47, 58)',
  shadow: '0px 0px 15px #0004',
  asideWidth: 225,
  headerHeight: 100
}

const RootDiv = styled.div`
  /* Mobile */
  height: 100%;
  display: grid;
  grid-template-rows: ${logoHeight} ${menuHeight} ${props => props.theme.headerHeight}px 1fr;
  grid-template-areas: 
    "logo"
    "sidepanel"
    "header"
    "main";

  @media (min-width: 768px){
  /* Desktop */
    grid-template-columns: ${props => props.theme.asideWidth}px 1fr;
    grid-template-rows: ${props => props.theme.headerHeight}px 1fr;
    grid-template-areas: 
      "logo header"
      "sidepanel main"
  }
`

export default function Root({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClientIntlProvider>
      <ThemeProvider theme={theme}>
        <RootDiv>
          <GlobalStyle />
          <Logo />
          <Side />
          {children}
      </RootDiv>
      </ThemeProvider>
    </ClientIntlProvider>
  )
}