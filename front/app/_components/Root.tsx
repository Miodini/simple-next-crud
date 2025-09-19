'use client'
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import styled from "styled-components"
import { ThemeProvider, type DefaultTheme } from "styled-components"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import type { MessageKeys } from "@/lib/i18n"

import Header from "./Header"
import Logo from "./Logo"
import Main from "./Main"
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

/** Root layout */
export default function Root({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  function getHeaderProps(): { icon: IconDefinition, title: MessageKeys, subtitle: MessageKeys } {
    if (pathname === '/home') {
      return { icon: faHome, title: 'home.header.title', subtitle: 'home.header.content' }
    } else {
      return { icon: faUser, title: 'users.header.title', subtitle: 'users.header.content' }
    }
  }

  const { icon, title, subtitle } = getHeaderProps()

  return (
    <ClientIntlProvider>
      <ThemeProvider theme={theme}>
        <RootDiv>
          <GlobalStyle />
          <Logo />
          <Side />
          <Header
            icon={icon}
            title={title}
            subtitle={subtitle}
          />
          <Main>
            {children}
          </Main>
      </RootDiv>
      </ThemeProvider>
    </ClientIntlProvider>
  )
}