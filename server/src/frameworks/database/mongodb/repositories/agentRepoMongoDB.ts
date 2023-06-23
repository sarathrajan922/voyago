import Agent from "../models/agentModel";
import { AgentRegisterInterface ,AgentAddCategoryInterface} from "../../../../types/agent";
import Category from "../models/categoryModel";

export const agentRepositoryMongoDB = ()=>{

    const addAgent = async (agent:AgentRegisterInterface)=>{
        return await Agent.create(agent)
    }

    const getAgentByEmail = async (email: string)=>{
        return Agent.findOne({email})
    }

    const addCategory = async (category:AgentAddCategoryInterface)=>{
        return Category.create(category)
    }


    return {
        addAgent,
        getAgentByEmail,
        addCategory

    }
}

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;