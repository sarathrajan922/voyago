export interface Root {
    status: boolean
    message: string
    result: PackageDataApiResponse
  }
  
  export interface PackageDataApiResponse {
    _id: string
    agentId: string
    packageName: string
    description: string
    price: number
    locations: string
    category: string
    isDisabled: boolean
    images: string
    duration: number
    services: string
    __v: number
  }
  