import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        bg: string,
        shadow: string,
        asideWidth: number,
        headerHeight: number
    }
}