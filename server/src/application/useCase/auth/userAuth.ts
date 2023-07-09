import { HttpStatus } from "../../../types/httpStatus";
import { TourConfirmationInterface, UserRegisterInterface } from "../../../types/user";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { UserDbInterface } from "../../repository/userDBrepository";
import { UserInterface } from "../../../types/user";



export const userRegisterUseCase = async (
    user: UserRegisterInterface ,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
  ) => {
 
    user.email = user.email.toLowerCase();

    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
      throw new AppError("existing email", HttpStatus.CONFLICT);
    }
    if(user.password){
        user.password = await authService.hashPassword(user.password);
    }
   
    const userData = await userRepository.addUser(user);

    // const { _id: userId } = await userRepository.addUser(user);
    const payload ={
      id: userData?._id.toString(),
      role: 'user'
    }
    const token = authService.generateToken(payload);
    return {
      token,
      userData
    }
  };

  export const userLoginUserCase = async (
    email:string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
  )=>{
      const user:UserInterface | null = await userRepository.getUserByEmail(email)
      if(!user){
       throw new AppError("this user doesn't exist", HttpStatus.NOT_FOUND)
      }
     const isPasswordCorrect = await authService.comparePassword(password,user?.password ?? '')
      if(!isPasswordCorrect){
        throw new AppError('sorry, your password was incorrect.Please double-check your password', HttpStatus.UNAUTHORIZED)
      }

      const isUserBlock: UserInterface | null = await userRepository.checkUserBlock(email)
      if(!isUserBlock){
        throw new AppError('user is blocked by admin', HttpStatus.NOT_ACCEPTABLE)
      }
    let id = ''
     if(user){
      id= user?._id?.toString() ?? ''
     }
      const payload ={
        id: id,
        role: 'user'
      }



      const token = authService.generateToken(payload)
      return {
        token,
        user
      }
  }

  export const userGetAllPackageUseCase = async (
    userRepository: ReturnType<UserDbInterface>
  )=>{
    const getAllPackage= await userRepository.getAllPackage()
    if(!getAllPackage){
      throw new AppError('sorry, No pacakages available',HttpStatus.NOT_FOUND)
    }
    return getAllPackage
  }


  export const userPackageBookingUseCase = async(
    bookingDetails: TourConfirmationInterface ,
    userRepository: ReturnType<UserDbInterface>
  )=>{
    const result = await userRepository.packageBooking(bookingDetails)
    return result
  }

  export const getPackageUseCase = async(
    packageId: string,
    userRepository: ReturnType<UserDbInterface>
  )=>{
    const result = await userRepository.getPackage(packageId)
    if(!result){
      throw new AppError('Package Not Found', HttpStatus.NOT_FOUND)
    }
    return result
  }

  