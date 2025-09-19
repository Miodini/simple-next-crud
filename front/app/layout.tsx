import { Montserrat } from 'next/font/google'
import { Metadata } from 'next'
import { config as faConfig } from "@fortawesome/fontawesome-svg-core"
import '@fortawesome/fontawesome-svg-core/styles.css' // Needed to prevent fa icon huge on load bug
import 'bootstrap/dist/css/bootstrap.css'

import Root from "./_components/Root"
import StyledComponentsRegistry from "@/lib/registry"

faConfig.autoAddCss = false
const montserrat = Montserrat({ subsets: ['latin']})
export const metadata: Metadata = {
  title: 'CRUD'
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
          <Root>
            {children}
          </Root>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
