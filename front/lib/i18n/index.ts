import enMessages from './messages/en'
import ptMessages from './messages/pt'

export const messages = {
    en: enMessages,
    pt: ptMessages
} as const

export type SupportedLocales = keyof typeof messages
export type { MessageKeys } from './messages/en'