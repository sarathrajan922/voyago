import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
// import { AdminInterface } from "../../types/admin";

export const adminDbRepository = (repository: ReturnType<AdminRepossitoryMongoDB>)=>{
    const getAdminByEmail = async (email: string)=> await repository.getAdminByEmail(email)
    const getAllUsers = async ()=> {
        const AllUsers = await repository.getAllusers();
        return AllUsers;
    }

    return {
        getAdminByEmail,
        getAllUsers
    }
}

export type AdminDbInterface = typeof adminDbRepository