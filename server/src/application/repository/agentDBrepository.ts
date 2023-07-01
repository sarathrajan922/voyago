import Category from "../../frameworks/database/mongodb/models/categoryModel";
import { AgentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/agentRepoMongoDB";
import { AgentAddCategoryInterface, AgentRegisterInterface, AgentTourPackageInterface } from "../../types/agent";

export const  agentDbRepository = (repository: ReturnType<AgentRepositoryMongoDB>)=>{
    const addAgent = async (agent: AgentRegisterInterface)=> await repository.addAgent(agent)
    const getAgentByEmail = async (email: string)=> await repository.getAgentByEmail(email)
    const addCategory = async (category: AgentAddCategoryInterface)=> await repository.addCategory(category)
    const getCategory = async (objId: string)=> await repository.getCategory(objId)
    const deleteCategory = async (agentId: string, categoryName: string)=> await repository.deleteCategory(agentId,categoryName)
    const addPackage= async (tourPackage:AgentTourPackageInterface)=> await repository.addPackage(tourPackage)
    const getAllPackage = async(objId: string)=> await repository.getAllPackages(objId)
    const getPackage = async(objId: string)=> await repository.getPackage(objId)
    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage,
        getAllPackage,
        getPackage
    }
}

export type AgentDbInterface = typeof agentDbRepository