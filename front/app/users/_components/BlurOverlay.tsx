import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'
import { OPEN_PROFILE_DROPDOWN } from '@/app/_constants/events'

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 0.5rem;
  pointer-events: auto;
`

const LoginPrompt = styled.div`
  background: #FFF;
  text-align: center;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.shadow};
  max-width: 400px;
`

export default function BlurOverlay() {
  const handleLoginClick = () => {
    // Dispatch a custom event to trigger the profile dropdown
    const event = new CustomEvent(OPEN_PROFILE_DROPDOWN)

    window.dispatchEvent(event)
  }

  return (
    <Overlay>
      <LoginPrompt>
        <h2><FormattedMessage id="users.overlay.title" /></h2>
        <p><FormattedMessage id="users.overlay.message" /></p>
        <Button onClick={handleLoginClick}>
          <FormattedMessage id="users.overlay.button" />
        </Button>
      </LoginPrompt>
    </Overlay>
  )
}