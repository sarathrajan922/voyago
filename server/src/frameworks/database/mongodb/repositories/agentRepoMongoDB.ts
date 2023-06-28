import Agent from "../models/agentModel";
import { AgentRegisterInterface ,AgentAddCategoryInterface} from "../../../../types/agent";
import Category from "../models/categoryModel";
import { Types } from "mongoose";

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

    const getCategory = async (objId: string)=>{
        const id = new Types.ObjectId(objId)
        return Category.find({ agentId: id})
        
    }

    const deleteCategory = async (agentId: string, categoryName: string)=>{
        const id = new Types.ObjectId(agentId)
        return Category.findOneAndDelete({ agentId: id, name: categoryName})
    }


    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory,
        deleteCategory

    }
}

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;