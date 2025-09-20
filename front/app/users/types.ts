import type { Variant } from "react-bootstrap/esm/types"
import type { MessageKeys } from "@/lib/i18n"
import type { ZodString, ZodStringFormat, ZodEnum } from "zod"

export type InputPropTypes<T extends HTMLElement = HTMLInputElement> = Readonly<{
    value: string | number,
    onChange: React.ChangeEventHandler<T>,
    isValidated: boolean,
    zodSchema: ZodString | ZodStringFormat | ZodEnum
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