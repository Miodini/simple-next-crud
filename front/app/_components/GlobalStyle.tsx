'use client'
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        @media (min-width: 768px) {
            /* Desktop */
            height: 100vh;
            overflow-y: hidden
        }
    }   
`