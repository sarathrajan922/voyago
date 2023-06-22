import { Types } from "mongoose";

export interface AdminInterface {
    _id?: Types.ObjectId,
    email?: string,
    password?: string
}