export interface IPost {
    _id?: string
    title: string
    content: [{ type: string, html: string, content: string, image: { public_id: string, url: string } }],
    state: boolean
    image: { public_id: string, url: string }
    titleSeo?: string
    descriptionSeo?: string
}