import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthService } from "../../frameworks/services/authService";
import { AgentDbInterface } from "../../application/repository/agentDBrepository";
import { AgentRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/agentRepoMongoDB";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  AgentGetAllBookingsUseCase,
  addTourPackageUseCase,
  agentAddCategoryUseCase,
  agentLoginUseCase,
  agentProfileUpdateUseCase,
  agentRegisterUseCase,
  checkAgentVerificationUseCase,
  deleteCategoryUseCase,
  deletePackageUseCase,
  disablepackageUseCase,
  getAgentBookingStatUseCase,
  getAgentCategoryUseCase,
  getAgentProfileUseCase,
  getAgentRevenueUseCase,
  getAllPackageUseCase,
  getPackageUseCase,
  getUserCountAndBookingCountUseCase,
  paymentAlertUseCase,
  updatePackageUseCase,
} from "../../application/useCase/auth/agentAuth";
import {
  AgentRegisterInterface,
  AgentInterface,
  AgentAddCategoryInterface,
} from "../../types/agent";
import { CustomRequest } from "../../types/expressRequest";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

const agentController = (
  authServiceInterface: AuthServiceInterface,
  authService: AuthService,
  agentDbRepositoryInterface: AgentDbInterface,
  agentDbRepositoryMongoDb: AgentRepositoryMongoDB
) => {
  const dbRepositoryAgent = agentDbRepositoryInterface(
    agentDbRepositoryMongoDb()
  );
  const authServices = authServiceInterface(authService());

  const agentRegister = asyncHandler(async (req: Request, res: Response) => {
    const agent: AgentRegisterInterface = req.body;
    if (req.file) {
      agent.idProof_img = req.file.path;
    }
    const {token, agentData} = await agentRegisterUseCase(
      agent,
      dbRepositoryAgent,
      authServices
    );
    res.json({
      status: true,
      message: "agent successfully registered",
      token,
      agentData
    });
  });

  const agentLogin = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, password }: { email: string; password: string } = req.body;
    const { token, agentData } = await agentLoginUseCase(
      email,
      password,
      dbRepositoryAgent,
      authServices
    );
    res.json({
      status: true,
      message: "agent login successful",
      token,
      agentData,
    });
  });

  const addCategory = asyncHandler(async (req: CustomRequest, res: Response) => {
    const agentId = req?.payload?.id ?? ''
    
    req.body.agentId = req?.payload?.id ?? ''
    const category: AgentAddCategoryInterface = req.body;
    console.log(category)
    const result = await agentAddCategoryUseCase(category, dbRepositoryAgent);

    res.json({
      status: true,
      message: "category added successfully",
      result,
    });
  });

  const getCategory = asyncHandler(async (req: CustomRequest, res: Response) => {
   
    const agentId = req?.payload?.id ?? ''
    const result = await getAgentCategoryUseCase(agentId, dbRepositoryAgent);
    res.json({
      status: true,
      message: "All categories of the requested agent",
      result,
    });
  });

  const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const data = req?.body;
    const agentId = data?.agentId;
    const categoryName = data?.categoryName;

    const result = await deleteCategoryUseCase(
      agentId,
      categoryName,
      dbRepositoryAgent
    );
    res.json({
      status: true,
      message: "Category deleted successfully",
      result,
    });
  });

  const addPackage = asyncHandler(async (req: CustomRequest, res: Response) => {
    const data = req?.body;
    const agentId = req?.payload?.id ?? ''
    data.agentId = agentId
    if (req.file) {
      data.images = req.file.path;
    }

    data.duraction = parseInt(req?.body?.duraction);
    data.price = parseInt(req?.body?.price);
    const result = await addTourPackageUseCase(data, dbRepositoryAgent);
    res.json({
      status: true,
      message: "tour package added successfully",
      result,
    });
  });

  const getAllPackages = asyncHandler(
    async (req: CustomRequest, res: Response) => {
     
      const agentId = req?.payload?.id ?? ''
      const result = await getAllPackageUseCase(agentId, dbRepositoryAgent);
      res.json({
        status: true,
        message: " All packages successfully fetched",
        result,
      });
    }
  );

  const getPackage = asyncHandler(async (req: CustomRequest, res: Response) => {
    const packageId = req?.params?.id;
    const result = await getPackageUseCase(packageId, dbRepositoryAgent);
    res.json({
      status: true,
      message: "Package fetch successful",
      result,
    });
  });

  const disablePackage = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const packageId = req?.params?.id;
      const result = await disablepackageUseCase(packageId, dbRepositoryAgent);
      res.json({
        status: true,
        message: "Package disable successfully",
        result,
      });
    }
  );

  const updatePackage = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const packageId = req?.params?.id;
      const data = req?.body;
      if (req.file) {
        data.images = req.file.path;
      }

      data.duraction = parseInt(req?.body?.duraction);
      data.price = parseInt(req?.body?.price);
      console.log(packageId);
      console.log(data);
      const result = await updatePackageUseCase(
        data,
        packageId,
        dbRepositoryAgent
      );
      res.json({
        status: true,
        message: "package updated successfully",
        result,
      });
    }
  );

  const deletePackage = asyncHandler(
    async (req: CustomRequest, res: Response) => {
      const packageId = req?.params?.id;
      const result = await deletePackageUseCase(packageId, dbRepositoryAgent);
      res.json({
        status: true,
        message: "package deleted  successfully",
        result,
      });
    }
  );

  const agentGetAllBooking = asyncHandler(async(req: CustomRequest, res:Response)=>{
    const agentId = req?.payload?.id ?? '';
    const result = await AgentGetAllBookingsUseCase(agentId,dbRepositoryAgent)
    res.json({
      status: true, 
      message: 'fetching agent booking details successful',
      result
    })
  
  })
  const checkAgentVerified = asyncHandler(async(req: CustomRequest,res:Response)=>{
    const agentId = req?.payload?.id ?? ''
    const result = await checkAgentVerificationUseCase(agentId,dbRepositoryAgent)
    res.json({
      status: true,
      message: 'successfully checked agent verified or not',
      result
    })
  })

  const getAgentProfile = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const agentId = req?.payload?.id ?? ''
    const result = await getAgentProfileUseCase(agentId,dbRepositoryAgent)
    res.json({
      status: true,
      message: 'successfully fetched agent profile',
      result
    })
  })

  const agentProfileUpdate = asyncHandler(async(req:CustomRequest,res: Response)=>{
    const agentId = req?.payload?.id ?? ''
    const updatedData: AgentRegisterInterface = req.body;
    updatedData.mobile = parseInt(req?.body?.mobile);   
    const result = await agentProfileUpdateUseCase(agentId,updatedData,dbRepositoryAgent, authServices)
    res.json({
      status: true,
      message:'successfully updated agent details',
      result
    })
  })
  const paymentAlertMessage = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const agentId = req?.payload?.id ?? ''
    const price = req?.body?.price.toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
      }
    )
    const message = `Your booked Package '` +req?.body?.packageName+`' amount of  `+ price+` is still pending`;
    console.log(message)
    const obj = {
      agentId,
      userId: req?.body?.userId,
      message
    }

    const result = await paymentAlertUseCase(obj,dbRepositoryAgent)
    res.json({
      status: true,
      message: 'successfully sent message to the  user',
      result
    })
  })

  const getAgentBookingStat= asyncHandler(async(req:CustomRequest,res:Response)=>{
    const agentId = req?.payload?.id ?? ''
    const result = await getAgentBookingStatUseCase(agentId,dbRepositoryAgent)
    res.json({
      status: true,
      message: 'successfully get all booking status',
      result
    })
  })

  const getRevenue = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const agentId = req.payload?.id ?? ''
    const result = await getAgentRevenueUseCase(agentId,dbRepositoryAgent)
    res.json({
        status:true,
        message: 'fetch agent revenue successfull',
        result
    })
})

const getUserCountAndBookingCount = asyncHandler(async(req:CustomRequest,res:Response)=>{
  const agentId = req.payload?.id ?? ''
  const result = await getUserCountAndBookingCountUseCase(agentId,dbRepositoryAgent);
  res.json({
    status:true,
    message:'fetch agent booking count and user count',
    result
  })
})


  return {
    agentRegister,
    agentLogin,
    addCategory,
    getCategory,
    deleteCategory,
    addPackage,
    getAllPackages,
    getPackage,
    disablePackage,
    updatePackage,
    deletePackage,
    agentGetAllBooking,
    checkAgentVerified,
    getAgentProfile,
    agentProfileUpdate,
    paymentAlertMessage,
    getAgentBookingStat,
    getRevenue,
    getUserCountAndBookingCount
  };
};

export default agentController;
