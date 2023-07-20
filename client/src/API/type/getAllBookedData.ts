
interface PackageDetails {
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
    __v?: number
  }


  export interface GetAllBookingDetailsApiResponse {
    _id: string
    firstName: string
    lastName: string
    Email: string
    travelDate: string
    person: number
    packageId: string
    userId: string
    payment: string
    agentId: string
    __v: number
    packageIdObj: string
    packageDetails: PackageDetails
  }