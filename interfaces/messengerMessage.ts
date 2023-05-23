export interface IMessengerMessage {
    _id?: string
    messengerId?: string
    message?: string
    response?: string
    agent: boolean
    createdAt?: Date
    updatedAp?: Date
}