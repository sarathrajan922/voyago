import User from "../models/userModel";
import {
  TourConfirmationInterface,
  UserRegisterInterface,
} from "../../../../types/user";
import TourPackage from "../models/tourPackageModel";
import TourConfirm from "../models/tourConfirmDetails";
import { Types } from "mongoose";

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
    // const id = new Types.ObjectId(userId)
    try {
      const data = await TourConfirm.findOne({ userId, packageId }).populate({
        path: "packageId",
        select:
          "agentId packageName description price locations category images duration services",
        model: TourPackage,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }

    
  };

  const getPrice = async(packageId: string)=>{
   
    const id = new Types.ObjectId(packageId)
    const price = await TourPackage.findOne({_id: id},{price: 1})
    return price
    
  }

  const getAllBookings = async(userId: string)=>{
    // const data = await TourConfirm.find({userId: userId})
    // return data
    //populate
    const data = await TourConfirm.find({userId: userId}).populate({
      path: 'packageId',
      select: "_id agentId packageName description price images duration",
      model: TourPackage
    })
    return data
    // aagregtion
  //   const data = await TourConfirm.aggregate([
  //     {
  //       $match: { userId: userId }
  //     },
  //     {
  //       $addFields: {
  //         packageObjectId: {
  //           $toObjectId: '$packageId'
  //         }
  //       }
  //     },
  //     {
  //       $lookup: {
  //         from: `TourPackage`, // Replace with the actual name of the collection in the database
  //         localField: 'packageId',
  //         foreignField: '_id',
  //         as: 'package'
  //       }
  //     },
  //     {
  //       $unwind: '$package'
  //     },
  //     {
  //       $addFields: {
  //         packagePrice: '$package.price'
  //       }
  //     }
  //   ]).exec()
  //   console.log(data)
  // return data
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
    getAllBookings
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
