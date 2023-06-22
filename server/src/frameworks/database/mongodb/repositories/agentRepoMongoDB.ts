import Agent from "../models/agentModel";
import { AgentRegisterInterface } from "../../../../types/agent";

export const agentRepositoryMongoDB = ()=>{

    const addAgent = async (agent:AgentRegisterInterface)=>{
        return await Agent.create(agent)
    }

    const getAgentByEmail = async (email: string)=>{
        return Agent.findOne({email})
    }


    return {
        addAgent,
        getAgentByEmail

    }
}

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;