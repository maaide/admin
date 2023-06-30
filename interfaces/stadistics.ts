import { ISell } from "./Sells";
import { ICartProduct } from "./cart";

export interface IStadistics {
    viewContents: IViewContent[]
    addCarts: ICartProduct[]
    informations: IInformation[]
    sells: ISell[]
}

export interface IViewContent {
    name: string
    price: number
    category: string
}

export interface IInformation {
    cart: ICartProduct[]
}