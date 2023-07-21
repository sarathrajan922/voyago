import User from "../models/userModel";
import {
  TourConfirmationInterface,
  UserRegisterInterface,
} from "../../../../types/user";
import TourPackage from "../models/tourPackageModel";
import TourConfirm from "../models/tourConfirmDetails";
import { Types } from "mongoose";
import UserAlertMsg from "../models/userAlertMessageModel";

export const userRepositoryMongoDB = () => {
  const addUser = async (user: UserRegisterInterface) => {
    return await User.create(user);
  };
  const getUserByEmail = async (email: string) => {
    return User.findOne({ email });
  };

  const checkUserBlock = async (email: string) => {
    return User.findOne({ email: email, isActive: true });
  };

  const getAllTourPackage = async () => {
    return TourPackage.find({});
  };

  const bookPackage = async (bookingDetails: TourConfirmationInterface) => {
    return await TourConfirm.create(bookingDetails);
  };

  const getPackage = async (packageId: string) => {
    const id = new Types.ObjectId(packageId);
    return await TourPackage.findOne({ _id: id });
  };

  const getUserDetails = async (userId: string) => {
    const id = new Types.ObjectId(userId);
    return await User.findOne({ _id: id });
  };

  const userProfileUpdate = async (
    userId: string,
    editedDetails: UserRegisterInterface
  ) => {
    const id = new Types.ObjectId(userId);
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: {
          ...editedDetails,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getUserBookedDetails = async (userId: string, packageId: string) => {
    try {
      const newData = await TourConfirm.aggregate([
        {
          $match: { userId, packageId },
        },
        {
          $addFields: {
            packageIdObj: {
              $toObjectId: "$packageId",
            },
          },
        },
        {
          $lookup: {
            from: "tourPackages",
            localField: "packageIdObj",
            foreignField: "_id",
            as: "packageDetails",
          },
        },
        {
          $unwind: "$packageDetails",
        },
      ]);

      return newData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getPrice = async (packageId: string) => {
    const id = new Types.ObjectId(packageId);
    const price = await TourPackage.findOne({ _id: id }, { price: 1 });
    return price;
  };

  const getAllBookings = async (userId: string) => {
  
      const data = await TourConfirm.aggregate([
        {
          $match: { userId: userId }
        },
        {
          $addFields: {
            packageIdObj: {
              $toObjectId: "$packageId",
            },
          },
        },
        {
          $lookup: {
            from: "tourPackages",
            localField: "packageIdObj",
            foreignField: "_id",
            as: "packageDetails",
          },
        },
        {
          $unwind: '$packageDetails'
        },
        {
          $addFields: {
            packagePrice: '$package.price'
          }
        }
      ]).exec()
    return data
  };

  const paymentStatusChange = async (tourId: string) => {
    const id = new Types.ObjectId(tourId);
    const result = await TourConfirm.findByIdAndUpdate(
      { _id: id },
      {
        $set: { payment: "success" },
      }
    );

    return result;
  };

  const getAlertMsg = async(userId: string)=>{
    const data = await UserAlertMsg.aggregate([
      {
        $match: {userId}
      },
      {
        $addFields: {
          agentIdObj: {
            $toObjectId: "$agentId",
          },
        },
      },
      {
        $lookup: {
          from : 'agents',
          localField: 'agentIdObj',
          foreignField: '_id',
          as: 'agentDetails'
        }
      },
      {
        $unwind: "$agentDetails"
      },
      {
        $project: {
          agentId: 1,
          message: 1,
          agentDetails: 1
        }
      }
    ])

    console.log(data)
    return data
  }

  return {
    addUser,
    getUserByEmail,
    getAllTourPackage,
    bookPackage,
    getPackage,
    checkUserBlock,
    getUserDetails,
    userProfileUpdate,
    getUserBookedDetails,
    getPrice,
    getAllBookings,
    paymentStatusChange,
    getAlertMsg

  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
