import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
// import { AdminInterface } from "../../types/admin";

export const adminDbRepository = (repository: ReturnType<AdminRepossitoryMongoDB>)=>{
    const getAdminByEmail = async (email: string)=> await repository.getAdminByEmail(email)

    return {
        getAdminByEmail
    }
}

export type AdminDbInterface = typeof adminDbRepository