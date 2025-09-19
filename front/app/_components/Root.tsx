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
import Menu from "./Menu"
import Footer from "./Footer"
import GlobalStyle from "./GlobalStyle"

const ClientIntlProvider = dynamic(() => import('@/lib/i18n/ClientIntlProvider'), { ssr: false })

const theme: DefaultTheme = {
  bg: 'rgb(26, 47, 58)',
  shadow: '0px 0px 15px #0004'
}

const menuWidth = 225 // Desktop

const RootDiv = styled.div`
  /* Mobile */
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px){
    /* Desktop */
    flex-direction: row;
  }
`

const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    /* Desktop */
    max-height: 100%;
    overflow-y: scroll;
  }
`

const Aside = styled.aside`
  /* Mobile */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.bg};
  color: white;
  box-shadow: ${props => props.theme.shadow};
  
  @media (min-width: 768px) {
    /* Desktop */
    height: 100%;
    width: ${menuWidth}px;
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
        <GlobalStyle />
        <RootDiv>
          <Aside>
            <Logo />
            <Menu />
          </Aside>
          <ContentDiv>
            <div>
              <Header
                icon={icon}
                title={title}
                subtitle={subtitle}
              />
              <Main>
                {children}
              </Main>
            </div>
            <Footer />
          </ContentDiv>
      </RootDiv>
      </ThemeProvider>
    </ClientIntlProvider>
  )
}