import { Types } from "mongoose"

export interface UserRegisterInterface {
    firstName: string,
    lastName: string,
    email: string,
    mobile: number,
    password?: string,
    isActive: boolean
}

export interface UserInterface {
    _id?: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
}