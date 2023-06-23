import Admin from "../models/adminModel";
import { AdminInterface } from "../../../../types/admin";
import User from "../models/userModel";
import Agent from "../models/agentModel";
import { ObjectId, Types } from "mongoose";

export const adminRepossitoryMongoDB = ()=>{
    const getAdminByEmail = async (email: string)=>{
        return Admin.findOne({email})
    }

    const getAllusers = async ()=>{
        const AllUsers = await User.find()
        return AllUsers
    }

    const getAllAgents = async ()=>{
        const AllAgents = await Agent.find()
        return AllAgents
    }

    const blockUser = async (objId: string)=>{
        const id = new Types.ObjectId(objId)
        const user = await User.findById(id);
        const status = (!user?.isActive)
        const result = await User.findOneAndUpdate(
            { "_id": id },
            { $set: { "isActive": status } }, 
        )
        return result
    }

    const blockAgent = async (objId: string)=>{
        const id = new Types.ObjectId(objId)
        const agent = await Agent.findById(id)
        const status = (!agent?.isActive)
        const result = await Agent.findOneAndUpdate(
            {"_id": id},
            {$set: {"isActive": status}}
        )
        return result;
    }




    return {
        getAdminByEmail,
        getAllusers,
        getAllAgents,
        blockUser,
        blockAgent
    }
}

export type AdminRepossitoryMongoDB = typeof adminRepossitoryMongoDB;