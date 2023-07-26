import { HttpStatus } from "../../../types/httpStatus";
import {
  TourConfirmationInterface,
  UserRegisterInterface,
} from "../../../types/user";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { UserDbInterface, userDbRepository } from "../../repository/userDBrepository";
import { UserInterface } from "../../../types/user";
import { GoogleAuthServiceInterface } from "../../services/googleServiceInterface";
import { CommunityInterface } from "../../../types/community";
import { isJsxFragment } from "typescript";

export const userRegisterUseCase = async (
  user: UserRegisterInterface,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();

  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new AppError("existing email", HttpStatus.CONFLICT);
  }
  if (user.password) {
    user.password = await authService.hashPassword(user.password);
  }

  const userData = await userRepository.addUser(user);

  // const { _id: userId } = await userRepository.addUser(user);
  const payload = {
    id: userData?._id.toString(),
    role: "user",
  };
  const token = authService.generateToken(payload);
  return {
    token,
    userData,
  };
};

export const userLoginUserCase = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: UserInterface | null = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("this user doesn't exist", HttpStatus.NOT_FOUND);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user?.password ?? ""
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "sorry, your password was incorrect.Please double-check your password",
      HttpStatus.UNAUTHORIZED
    );
  }

  const isUserBlock: UserInterface | null = await userRepository.checkUserBlock(
    email
  );
  if (!isUserBlock) {
    throw new AppError("user is blocked by admin", HttpStatus.NOT_ACCEPTABLE);
  }
  let id = "";
  if (user) {
    id = user?._id?.toString() ?? "";
  }
  const payload = {
    id: id,
    role: "user",
  };

  const token = authService.generateToken(payload);
  return {
    token,
    user,
  };
};

export const userGetAllPackageUseCase = async (
  userRepository: ReturnType<UserDbInterface>
) => {
  const getAllPackage = await userRepository.getAllPackage();
  if (!getAllPackage) {
    throw new AppError("sorry, No pacakages available", HttpStatus.NOT_FOUND);
  }
  return getAllPackage;
};

export const userPackageBookingUseCase = async (
  bookingDetails: TourConfirmationInterface,
  userRepository: ReturnType<UserDbInterface>
) => {
  const result = await userRepository.packageBooking(bookingDetails);
  return result;
};

export const getPackageUseCase = async (
  packageId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  const result = await userRepository.getPackage(packageId);
  if (!result) {
    throw new AppError("Package Not Found", HttpStatus.NOT_FOUND);
  }
  return result;
};

export const signInWithGoogle = async (
  credential: string,
  googleAuthService: ReturnType<GoogleAuthServiceInterface>,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await googleAuthService.verify(credential);
  const isUserExist = await userRepository.getUserByEmail(user.email);
  if (isUserExist) {
    const payload = {
      id: isUserExist._id.toString(),
      role: "user",
    };

    const token = authService.generateToken(payload);
    return {
      token,
      user
    }
  } else {
    const userData = await userRepository.addUser(user);
    const payload = { id: userData._id.toString(), role: "user" };
    const token = authService.generateToken(payload);

    return {
      token,
      userData
    };
  }
};


export const getUserDetailsUseCase = async(
  userId: string,
  userRepository: ReturnType<UserDbInterface>
)=> {
  const userData = await userRepository.getUserDetails(userId)
  return userData
}


export const updateUserProfileUseCase = async(
  userId: string,
  editedUser: UserRegisterInterface,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
)=>{

  if (editedUser.password) {
    editedUser.password = await authService.hashPassword(editedUser.password);
  }

  const result = await userRepository.updateUserProfile(userId, editedUser)
  if(!result){
    throw new AppError('could not update user profile', HttpStatus.NOT_FOUND)
  }
  return result
}

export const  getUserBookedDetailsUseCase = async(
  userId: string,
  packageId: string,
  userRepository: ReturnType<UserDbInterface>
) =>{
  const result = await userRepository.getUserBookedDetails(userId,packageId)
  if(!result){
    throw new AppError('could not the details',HttpStatus.NOT_FOUND)
  }

  return result
}

export const getAllBookingsUseCase = async(
  userId: string,
  userRepository: ReturnType<UserDbInterface> 
)=>{
  const result = await userRepository.getAllBookings(userId)
  if(!result){
    throw new  AppError('this user have no booking',HttpStatus.NOT_FOUND)
  }
  return result
}

export const paymentStatusChangeUseCase = async(
  tourId: string,
  userDbRepository: ReturnType<UserDbInterface>
) => {
  const result = await userDbRepository.paymentStatusChange(tourId)
  if(!result){
    throw new AppError('payment Status not changed ',HttpStatus.NOT_MODIFIED)
  }
  return result
}

export const getAlertMsgUseCase = async(
  userId: string,
  userDbRepository: ReturnType<UserDbInterface>
)=> {
  const result = await userDbRepository.getAlertMsg(userId)
  if(!result){
    throw new Error('could not find alert messages')
  }
  return result
}

export const createCommunityUseCase = async(
  obj: CommunityInterface,
  userDbRepository: ReturnType<UserDbInterface> 
)=> {
  const result = await userDbRepository.createCommunity(obj)
  if(!result){
    throw new Error('could not create community')
  }
  return result
}

export const getAllCommunityUseCase = async(
  userDbRepository:ReturnType<UserDbInterface>
)=>{
  const result = await userDbRepository.getAllCommunity();
  if(!result){
    throw new AppError('NO Communities found!',HttpStatus.NOT_FOUND)
  }
  return result
}
