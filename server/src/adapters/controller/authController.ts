import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { UserDbInterface } from "../../application/repository/userDBrepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/userRepoMongoDB";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  createCommunityUseCase,
  createConversationUseCase,
  generateOTPUseCase,
  getAlertMsgUseCase,
  getAllBookingsUseCase,
  getAllCommunityUseCase,
  getAllConversationUseCase,
  getAllJoinedAndNotJoinedCommunityUseCase,
  getAllUniqueCategoryUseCase,
  getUserBookedDetailsUseCase,
  getUserDetailsUseCase,
  joinCommunityUseCase,
  paymentStatusChangeUseCase,
  signInWithGoogle,
  updatePasswordWithEmailUseCase,
  updateUserProfileUseCase,
  userGetAllPackageUseCase,
  userLoginUserCase,
  userPackageBookingUseCase,
  userPasswordUpdateUseCase,
  userRegisterUseCase,
  verifiyOTPUseCase,
} from "../../application/useCase/auth/userAuth";
import { UserRegisterInterface, UserInterface } from "../../types/user";
import { getPackageUseCase } from "../../application/useCase/auth/userAuth";
import { CustomRequest } from "../../types/expressRequest";
import { googleAuthService } from "../../frameworks/services/googleAuthService";
import { GoogleAuthServiceInterface } from "../../application/services/googleServiceInterface";
import { GoogleAuthService } from "../../frameworks/services/googleAuthService";
import { SendEmailServiceInterface } from "../../application/services/sendMail";
import { SendEmailService } from "../../frameworks/services/sentMailService";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authService: AuthService,
  googelAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthService: GoogleAuthService,
  userDbRepositoryInterface: UserDbInterface,
  userDbRepositoryMongoDb: UserRepositoryMongoDB,
  emailServiceInterface: SendEmailServiceInterface,
  emailServiceImpl: SendEmailService

) => {
  const dbRepositoryUser = userDbRepositoryInterface(userDbRepositoryMongoDb());
  const authServices = authServiceInterface(authService());
  const googleAuthServices = googelAuthServiceInterface(googleAuthService());
  const emailService = emailServiceInterface(emailServiceImpl());
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

  const bookPackage = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.payload?.id ?? "";
      req.body.userId = userId;
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
    }
  );

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
    async (req: CustomRequest, res: Response) => {
      const userId = req.payload?.id ?? "";
      const updatedData: UserRegisterInterface = req.body;
      updatedData.mobile = parseInt(req?.body?.mobile);

      const result = await updateUserProfileUseCase(
        userId,
        updatedData,
        dbRepositoryUser,
        authServices
      );

      res.json({
        status: true,
        message: "user profile updated successfully",
        result,
      });
    }
  );

 const userUpdatePassword = asyncHandler(
  async(req:CustomRequest,res:Response)=>{
    const userId = req?.payload?.id ?? ''
    const editedPassword:any = req.body;
    const result = await userPasswordUpdateUseCase(userId,editedPassword,dbRepositoryUser,authServices);
    res.json({
      status: true,
      message: 'user password change successfuly',
      result
    })
  }
 )

 const updatePasswordWithEmail = asyncHandler(
  async(req:Request,res:Response)=>{
    const email = req.body?.email ?? ''
    const obj= {
      newPassword: req.body?.password ?? ''
    }
    

    const result = await updatePasswordWithEmailUseCase(email,obj,dbRepositoryUser,authServices)
    res.json({
      status: true,
      message: 'user password update successful',
      result
    })
  }
 )

  const getUserBookedDetails = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.payload?.id ?? "";
      const packageId = req.params.id;
      const result = await getUserBookedDetailsUseCase(
        userId,
        packageId,
        dbRepositoryUser
      );
      res.json({
        status: true,
        message: "user booked data fetched successfully",
        result,
      });
    }
  );
  const getAllBookings = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req.payload?.id ?? "";
      const result = await getAllBookingsUseCase(userId, dbRepositoryUser);
      res.json({
        status: true,
        message: "user booked details fetched successfully",
        result,
      });
    }
  );

  const paymentStatusChange = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const { tourId } = req.body;
      const result = await paymentStatusChangeUseCase(tourId, dbRepositoryUser);
      res.json({
        status: true,
        message: "user payment status changed successfully",
        result,
      });
    }
  );

  const getAlertMsg = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req?.payload?.id ?? "";
      const result = await getAlertMsgUseCase(userId, dbRepositoryUser);
      res.json({
        status: true,
        message: "Alert message fetched successfully",
        result,
      });
    }
  );

  const createCommnuity = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const userId = req?.payload?.id ?? "";

      const { communityName } = req.body;
      const obj = {
        communityName,
        admin: userId,
      };

      const result = await createCommunityUseCase(obj, dbRepositoryUser);
      res.json({
        status: true,
        message: "community create Success",
        result,
      });
    }
  );

  const getAllCommunity= asyncHandler(
    async(req:CustomRequest,res:Response)=>{
      const userId = req?.payload?.id ?? '';
      const result = await getAllCommunityUseCase(dbRepositoryUser);
      res.json({
        status: true,
        message: "fetch all communities success",
        result,
        userId 
      })
    }
  )

  const joinCommunity = asyncHandler(
    async(req:CustomRequest,res: Response)=>{
      const userId = req?.payload?.id ?? ''
      const { communityId } = req?.body
      const obj = {
        userId,
        communityId
      }
      const result = await joinCommunityUseCase(obj,dbRepositoryUser);
      res.json({
        status: true,
        message: 'user joined successfully',
        result
      })
    }
  )

  const getAllJoinedAndNotJoinedCommunity = asyncHandler(
    async(req:CustomRequest,res:Response)=>{
      const userId = req?.payload?.id ?? ''
      const result = await getAllJoinedAndNotJoinedCommunityUseCase(userId,dbRepositoryUser);
      res.json({
        status: true,
        message: 'fetch all user joined and not joined communities success',
        result,
        userId

      })
    }
  )

  const createConversation = asyncHandler(
    async(req: CustomRequest,res:Response)=>{
      const userId = req?.payload?.id ?? ''
      
      let conversationObj = req?.body
      conversationObj.senderId = userId
      const result = await createConversationUseCase(conversationObj,dbRepositoryUser);
      res.json({
        status: true,
        message: 'conversation created successfully',
        result,
      })
      
    }
  )

  const getAllConversation = asyncHandler(
    async(req:CustomRequest,res:Response)=>{
     
      const communityId = req?.params?.id
      const result = await getAllConversationUseCase(communityId,dbRepositoryUser)
      res.json({
        status: true,
        message:'fetch all conversation data successful',
        result
      })
    }
  )

  const getAllUniqueCategory = asyncHandler(async(req:Request,res:Response)=>{
    const result = await getAllUniqueCategoryUseCase(dbRepositoryUser)
    res.json({
      status: true,
      message:'fetch all unique category data successful',
      result
    })
  })

  const generateOTPtoEmail = asyncHandler(async(req:Request,res:Response)=>{
    const userEmail = req.body?.email ?? ''
    const result = await generateOTPUseCase(userEmail,dbRepositoryUser,emailService)
    res.json({
      status:true,
      message: 'OTP sent to your Email success!',
      result
    })
  });

  const verifyOTP = asyncHandler(async(req:Request,res:Response)=>{
    const userOTP = req.body?.otp ?? ''
    const result = await verifiyOTPUseCase(userOTP.toString(),emailService)
    res.json({
      status:true,
      message: 'OTP verification done!',
      result
    })
  })

  return {
    userRegister,
    userLogin,
    getAllPackage,
    getPackage,
    bookPackage,
    loginWithGoogle,
    getUserDetails,
    userUpdateProfile,
    userUpdatePassword,
    getUserBookedDetails,
    getAllBookings,
    paymentStatusChange,
    getAlertMsg,
    createCommnuity,
    getAllCommunity,
    joinCommunity,
    getAllJoinedAndNotJoinedCommunity,
    createConversation,
    getAllConversation,
    getAllUniqueCategory,
    generateOTPtoEmail,
    verifyOTP,
    updatePasswordWithEmail
  };
};

export default authController;
