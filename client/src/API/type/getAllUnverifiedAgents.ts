export interface GetAllUnverifiedAgentApiResponse {
    status: string
    result: UnverifiedAgentsApiResponse[]
  }
  
  export interface UnverifiedAgentsApiResponse {
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