export interface getAllAlertMessageApiResponse {
    _id: string
    message: string
    agentId: string
    agentDetails: AgentDetails
  }
  
   interface AgentDetails {
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
  