import Admin from "../models/adminModel";
import { AdminInterface } from "../../../../types/admin";

export const adminRepossitoryMongoDB = ()=>{
    const getAdminByEmail = async (email: string)=>{
        return Admin.findOne({email})
    }

    return {
        getAdminByEmail
    }
}

export type AdminRepossitoryMongoDB = typeof adminRepossitoryMongoDB;