import styled from 'styled-components'
import Image from 'next/image'
import img from '../../public/assets/img/logo.jpg'

const StyledImage = styled(Image)`
  @media (min-width: 768px){
    /* Desktop */
    width: 100%;
    height: auto;
  }
`

export default function Logo () {
  return (
    <StyledImage
      src={img}
      alt="Logo"
    />
  )
}