export interface INotification {
    _id?: string
    title: string
    description: string
    url: string
    view?: boolean

    createdAt?: Date
    updatedAt?: Date
}