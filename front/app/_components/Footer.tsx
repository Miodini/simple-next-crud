'use client'
import styled from "styled-components"
import Image from "next/image"
import buildInfo from '@/.buildinfo.json'

const FooterElement = styled.footer`
  width: 100%;
  padding: .25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadow};
`

const A = styled.a`
  margin: 0 auto;
`

const BuildDateSpan = styled.span`
  align-self: flex-end;
`

export default function Footer() {
  return (
    <FooterElement>
      <A href="https://github.com/Miodini/projetos-curso-web/tree/main/crud-react">
        <Image src="/assets/img/github-mark.svg" alt="GitHub Logo" width={25} height={25} />
      </A>
      <BuildDateSpan>
        {buildInfo.buildDate.split('-')[0]}
      </BuildDateSpan>
    </FooterElement>
  )
}