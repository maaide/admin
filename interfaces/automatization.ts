export interface IAutomatization {
    address: string
    name: string
    date?: Date
    automatization: IEmailAutomatization[]
}

export interface IEmailAutomatization {
    affair: string
    title: string
    paragraph: string
    buttonText: string
    url: string
    number?: number
    time?: string
    date?: Date
}