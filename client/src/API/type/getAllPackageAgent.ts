export interface Root {
    status: boolean
    message: string
    result: GetALLPackagesApiResponse[]
  }
  
  export interface GetALLPackagesApiResponse {
    _id: string
    agentId: string
    packageName: string
    description: string
    price: number
    category: string
    isDisabled: boolean
    duration: number
    __v: number
    images?: string
    locations?: string
    services?: string
  }
  