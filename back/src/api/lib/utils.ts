export function validateEmail(email: string): boolean{
    if(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))
        return true
    else
        return false
}