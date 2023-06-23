import Admin from "../models/adminModel";
import { AdminInterface } from "../../../../types/admin";
import User from "../models/userModel";
import Agent from "../models/agentModel";

export const adminRepossitoryMongoDB = ()=>{
    const getAdminByEmail = async (email: string)=>{
        return Admin.findOne({email})
    }

    const getAllusers = async ()=>{
        const AllUsers = await User.find()
        return AllUsers
    }

  




    return {
        getAdminByEmail,
        getAllusers
       
    }
}

export type AdminRepossitoryMongoDB = typeof adminRepossitoryMongoDB;