import Category from "../../frameworks/database/mongodb/models/categoryModel";
import { AgentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/agentRepoMongoDB";
import { AgentAddCategoryInterface, AgentRegisterInterface, AgentTourPackageInterface } from "../../types/agent";

export const  agentDbRepository = (repository: ReturnType<AgentRepositoryMongoDB>)=>{
    const addAgent = async (agent: AgentRegisterInterface)=> await repository.addAgent(agent)
    const getAgentByEmail = async (email: string)=> await repository.getAgentByEmail(email)
    const checkAgentBlock = async (email: string)=> await repository.checkAgentBlock(email)
    const addCategory = async (category: AgentAddCategoryInterface)=> await repository.addCategory(category)
    const checkCategoryExist = async (agentId:String,categoryName: String)=> await repository.checkCategoryExist(agentId,categoryName)
    const getCategory = async (objId: string)=> await repository.getCategory(objId)
    const deleteCategory = async (agentId: string, categoryName: string)=> await repository.deleteCategory(agentId,categoryName)
    const addPackage= async (tourPackage:AgentTourPackageInterface)=> await repository.addPackage(tourPackage)
    const getAllPackage = async(objId: string)=> await repository.getAllPackages(objId)
    const getPackage = async(objId: string)=> await repository.getPackage(objId)
    const disablePackage = async(packageId: string) => await repository.disablePackage(packageId)
    const updatePackage = async(tourPackage: AgentAddCategoryInterface, packageId:string)=> await repository.updatePackage(tourPackage,packageId)
    const deletePackage = async(packageId: string)=> await repository.deletePackage(packageId)
    const getAllBookings = async(agentId: string)=> await repository.getAllBookings(agentId)
    const checkAgentVerified = async(agentId: string)=> await repository.checkAgentVerified(agentId)
    const getAgentProfile = async(agentId: string)=> await repository.getAgentProfile(agentId)
    const agentProfileUpdate = async(agentId: string, editedData: AgentRegisterInterface)=> await repository.agentProfileUpdate(agentId,editedData)
    const paymentAlert = async(obj:any)=> await repository.paymentAlert(obj)
    const getAgentBookingStat = async(agentId:string)=> await repository.getAllAgentBookingStat(agentId)
    const getRevenue = async(agentId:string)=> await repository.getRevenue(agentId);
    const getUserCountAndBookingCount = async(agentId:string)=> await repository.getUserCountAndBookingCount(agentId);
    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage,
        getAllPackage,
        getPackage,
        checkCategoryExist,
        disablePackage,
        updatePackage,
        deletePackage,
        checkAgentBlock,
        getAllBookings,
        checkAgentVerified,
        getAgentProfile,
        agentProfileUpdate,
        paymentAlert,
        getAgentBookingStat,
        getRevenue,
        getUserCountAndBookingCount
    }
}

export type AgentDbInterface = typeof agentDbRepository