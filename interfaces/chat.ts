export interface IChatMessage {
    _id?: string
    senderId?: string
    message?: string
    response?: string
    agent: boolean

    createdAt?: Date
    updatedAt?: Date
}