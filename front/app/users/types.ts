import type { Variant } from "react-bootstrap/esm/types"
import type { MessageKeys } from "@/lib/i18n"

export type InputPropTypes = Readonly<{
    inputId: string, value: string | number, onChange: React.ChangeEventHandler<HTMLInputElement>
}>

export type User = {
    id: number,
    name: string,
    email: string,
    phone: string,
    gender: string
}

export type AlertSettings = {
    title: MessageKeys | '',
    message: MessageKeys | '',
    variant: Variant,
    visible: boolean
}