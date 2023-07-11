import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { UserDbInterface } from "../../application/repository/userDBrepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  getUserDetailsUseCase,
  signInWithGoogle,
  updateUserProfileUseCase,
  userGetAllPackageUseCase,
  userLoginUserCase,
  userPackageBookingUseCase,
  userRegisterUseCase,
} from "../../application/useCase/auth/userAuth";
import { UserRegisterInterface, UserInterface } from "../../types/user";
import { getPackageUseCase } from "../../application/useCase/auth/userAuth";
import { CustomRequest } from "../../types/expressRequest";
import { googleAuthService } from "../../frameworks/services/googleAuthService";
import { GoogleAuthServiceInterface } from "../../application/services/googleServiceInterface";
import { GoogleAuthService } from "../../frameworks/services/googleAuthService";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authService: AuthService,
  googelAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthService: GoogleAuthService,
  userDbRepositoryInterface: UserDbInterface,
  userDbRepositoryMongoDb: UserRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepositoryInterface(userDbRepositoryMongoDb());
  const authServices = authServiceInterface(authService());
  const googleAuthServices = googelAuthServiceInterface(googleAuthService());

  const userRegister = asyncHandler(async (req: Request, res: Response) => {
    const user: UserRegisterInterface = req.body;
    const { token, userData } = await userRegisterUseCase(
      user,
      dbRepositoryUser,
      authServices
    );
    res.json({
      status: true,
      message: "user registered successfully",
      token,
      userData,
    });
  });

  const userLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    // const user: UserInterface = req.body;
    const { token, user } = await userLoginUserCase(
      email,
      password,
      dbRepositoryUser,
      authServices
    );
    res.json({
      status: true,
      message: "user login successful",
      user,
      token,
    });
  });

  const getAllPackage = asyncHandler(async (req: Request, res: Response) => {
    const result = await userGetAllPackageUseCase(dbRepositoryUser);
    res.json({
      status: true,
      message: "fetching all package success",
      result,
    });
  });

  const getPackage = asyncHandler(async (req: Request, res: Response) => {
    const packageId = req?.params?.id;

    const result = await getPackageUseCase(packageId, dbRepositoryUser);
    res.json({
      status: true,
      message: "fetching package success",
      result,
    });
  });

  const bookPackage = asyncHandler(async (req: Request, res: Response) => {
    const bookingDetails = req?.body;

    const result = await userPackageBookingUseCase(
      bookingDetails,
      dbRepositoryUser
    );
    res.json({
      status: true,
      message: "Tour Package booked successfully",
      result,
    });
  });

  const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const { credential }: { credential: string } = req.body;
    const { token, user, userData } = await signInWithGoogle(
      credential,
      googleAuthServices,
      dbRepositoryUser,
      authServices
    );
    res.status(200).json({
      status: "success",
      message: "Successfully logged in with google",
      token,
      user,
      userData,
    });
  });

  const getUserDetails = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.payload?.id ?? "";

      const userData = await getUserDetailsUseCase(userId, dbRepositoryUser);
      res.json({
        status: "success",
        message: "successfully fetched user details",
        userData,
      });
    }
  );



  const userUpdateProfile = asyncHandler(
    async(req: CustomRequest, res: Response) => {
      const userId = req.payload?.id ?? "";
      const updatedData: UserRegisterInterface = req.body
      updatedData.mobile = parseInt(req?.body?.mobile)

      const result = await updateUserProfileUseCase(
        userId,
        updatedData,
        dbRepositoryUser
      );

      res.json({
        status: true,
        message: 'user profile updated successfully',
        result
      })



    }
  )

  return {
    userRegister,
    userLogin,
    getAllPackage,
    getPackage,
    bookPackage,
    loginWithGoogle,
    getUserDetails,
    userUpdateProfile
  };
};

export default authController;
