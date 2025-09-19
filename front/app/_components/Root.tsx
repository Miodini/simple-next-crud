'use client'
import styled from "styled-components"

// Heights for mobile layout
const menuHeight = '100px'
const logoHeight = '75px'

export default styled.div`
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