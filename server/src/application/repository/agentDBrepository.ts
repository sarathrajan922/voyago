import Category from "../../frameworks/database/mongodb/models/categoryModel";
import { AgentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/agentRepoMongoDB";
import { AgentAddCategoryInterface, AgentRegisterInterface } from "../../types/agent";

export const  agentDbRepository = (repository: ReturnType<AgentRepositoryMongoDB>)=>{
    const addAgent = async (agent: AgentRegisterInterface)=> await repository.addAgent(agent)
    const getAgentByEmail = async (email: string)=> await repository.getAgentByEmail(email)
    const addCategory = async (category: AgentAddCategoryInterface)=> await repository.addCategory(category)
    const getCategory = async (objId: string)=> await repository.getCategory(objId)
    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory
    }
}

export type AgentDbInterface = typeof agentDbRepository