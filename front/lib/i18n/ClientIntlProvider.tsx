'use client'
import { IntlProvider } from "react-intl"
import { messages, type SupportedLocales } from "."

/** Import this component with next/dynamic and ssr: false */
export default function ClientIntlProvider({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const locale: SupportedLocales =
        navigator.language.split('-')[0] === 'pt' ? 'pt' : 'en'

    return (
        <IntlProvider locale={locale} defaultLocale="en" messages={messages[locale]}>
            {children}
        </IntlProvider>
    )
}