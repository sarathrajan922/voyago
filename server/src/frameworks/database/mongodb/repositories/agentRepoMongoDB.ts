import Agent from "../models/agentModel";
import { AgentRegisterInterface ,AgentAddCategoryInterface, AgentTourPackageInterface} from "../../../../types/agent";
import Category from "../models/categoryModel";
import TourPackage from "../models/tourPackageModel";
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

    const addPackage = async (tourPackage:AgentTourPackageInterface)=>{
        return await TourPackage.create(tourPackage)
    }


    return {
        addAgent,
        getAgentByEmail,
        addCategory,
        getCategory,
        deleteCategory,
        addPackage

    }
}

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;