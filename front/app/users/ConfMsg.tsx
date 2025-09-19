import { FormattedMessage } from 'react-intl'
import Alert from 'react-bootstrap/Alert'
import type { Variant } from 'react-bootstrap/esm/types'
import type { MessageKeys } from '@/lib/i18n'

export default function ConfMsg (
    { show, variant, message, title }:
    Readonly<{
       show: boolean, variant: Variant, message: MessageKeys | '', title: MessageKeys | ''
    }>
) { 
    return (
        <div className='sticky-bottom'>
            <Alert className="mt-2 fade" show={show} variant={variant}>
                <Alert.Heading>
                    {title && <FormattedMessage id={title} />}
                </Alert.Heading>
                <p>
                    {message && <FormattedMessage id={message} />}
                </p>
            </Alert>
        </div>
    )
}