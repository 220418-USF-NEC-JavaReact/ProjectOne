import { IPost } from "./IPost"

export interface IUser {
    userId: number, 
    firstName: string,
    lastName: string,
    email: string,
    posts?:IPost[]
}