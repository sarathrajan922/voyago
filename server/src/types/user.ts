import { Types } from "mongoose"

export interface UserRegisterInterface {
    firstName: string,
    lastName: string,
    email: string,
    mobile?: number,
    password?: string,
    isActive?: boolean
}

export interface UserInterface {
    _id?: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
}


export interface TourConfirmationInterface {
    firstName : string,
    lastName : string,
    Email: string,
    travelDate: string,
    person: number,
    packageId: string,
    userId: string,
    payment: string
}