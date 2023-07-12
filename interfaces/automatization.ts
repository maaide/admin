export interface IAutomatization {
    _id?: string
    address: string
    name: string
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