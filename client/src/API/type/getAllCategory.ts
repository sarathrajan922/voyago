export interface Root {
    status: boolean
    message: string
    result: CategoryApiResponse[]
  }
  
  export interface CategoryApiResponse {
    _id: string
    name: string
    agentId: string
    __v: number
  }