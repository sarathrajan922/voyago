import { Types } from "mongoose";

export interface AgentRegisterInterface {
    firstName: string,
    lastName: string,
    email: string,
    mobile: number,
    password?: string,
    isActive: boolean,
    isVerified: boolean,
    idProof_img: any
}

export interface AgentInterface {
    _id?: Types.ObjectId,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
}