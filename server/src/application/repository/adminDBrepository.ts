import { ObjectId } from "mongoose";
import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
// import { AdminInterface } from "../../types/admin";

export const adminDbRepository = (repository: ReturnType<AdminRepossitoryMongoDB>)=>{
    const getAdminByEmail = async (email: string)=> await repository.getAdminByEmail(email)
    const getAllUsers = async ()=> {
        const AllUsers = await repository.getAllusers();
        return AllUsers;
    }

    const getAllAgents = async ()=>{
        const AllAgents = await repository.getAllAgents();
        return AllAgents
    }

    const blockUser= async (ojbId: string)=> await repository.blockUser(ojbId)
    const blockAgent = async (ojbId: string)=> await repository.blockAgent(ojbId)
    const getUnverifiedAgents = async ()=> await repository.getUnverifiedAgents()
    const verifyAgent = async (objId: string)=> await repository.verifyAgent(objId)
    const BasicDetailsUserAgentPackageBooking = async ()=> await repository.BasicDetailsUserAgentPackageBooking()

    return {
        getAdminByEmail,
        getAllUsers,
        getAllAgents,
        blockUser,
        blockAgent,
        getUnverifiedAgents,
        verifyAgent,
        BasicDetailsUserAgentPackageBooking
    }
}

export type AdminDbInterface = typeof adminDbRepository