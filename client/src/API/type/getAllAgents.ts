export interface GetAllAgentApiResponse {
    status: string
    agentData: AgentDataApiResponse[]
  }
  
  export interface AgentDataApiResponse {
    _id: string
    firstName: string
    lastName: string
    email: string
    mobile: number
    password: string
    isActive: boolean
    isVerified: boolean
    idProof_img: string
    __v: number
  }