export interface GetAllUserApiResponse {
    status: string
    userData: UserDataApiResponse[]
  }
  
  export interface UserDataApiResponse {
    _id: string
    firstName: string
    lastName: string
    email: string
    mobile: number
    password: string
    isActive: boolean
    __v: number
  }

  
  