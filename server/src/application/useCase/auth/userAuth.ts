import { HttpStatus } from "../../../types/httpStatus";
import { UserRegisterInterface } from "../../../types/user";
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
    console.log(user)
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
      throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
    }
    if(user.password){
        user.password = await authService.hashPassword(user.password);
    }
   
    const { _id: userId } = await userRepository.addUser(user);
    const token = authService.generateToken(userId.toString());
    return token;
  };

  export const userLoginUserCase = async (
    email:string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
  )=>{
      const user:UserInterface | null = await userRepository.getUserByEmail(email)
      if(!user){
       throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED)
      }
     const isPasswordCorrect = await authService.comparePassword(password,user?.password ?? '')
      if(!isPasswordCorrect){
        throw new AppError('sorry, your password was incorrect.Please double-check your password', HttpStatus.UNAUTHORIZED)
      }
      const token = authService.generateToken(user?._id?.toString() ?? '')
      return token
      

  }