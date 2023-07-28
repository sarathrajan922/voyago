import User from "../models/userModel";
import {
  TourConfirmationInterface,
  UserRegisterInterface,
} from "../../../../types/user";
import TourPackage from "../models/tourPackageModel";
import TourConfirm from "../models/tourConfirmDetails";
import { Types } from "mongoose";
import UserAlertMsg from "../models/userAlertMessageModel";
import Community from "../models/communityModel";
import { CommunityInterface, JoinCommunityInterface } from "../../../../types/community";
import { ConversationInterface } from "../../../../types/conversation";
import Conversation from "../models/conversationModel";

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
        $match: { userId: userId },
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
      {
        $addFields: {
          packagePrice: "$package.price",
        },
      },
    ]).exec();
    return data;
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

  const getAlertMsg = async (userId: string) => {
    const data = await UserAlertMsg.aggregate([
      {
        $match: { userId },
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
          from: "agents",
          localField: "agentIdObj",
          foreignField: "_id",
          as: "agentDetails",
        },
      },
      {
        $unwind: "$agentDetails",
      },
      {
        $project: {
          agentId: 1,
          message: 1,
          agentDetails: 1,
        },
      },
    ]);

    console.log(data);
    return data;
  };

  const createCommunity = async (obj: CommunityInterface) => {
    const result = await Community.create(obj);
    return result;
  };

  const getAllCommunity = async () => {
    const result = await Community.find({});
    return result;
  };

  const joinCommunity = async (obj: JoinCommunityInterface) => {
    try {
      const communityId = new Types.ObjectId(obj.communityId);

      // First, find the community document using the provided communityId.
      const community = await Community.findOne({ _id: communityId });

      if (!community) {
        console.log("Community not found");
        return false;
      }

      // Check if the userId is already a member of the community.
      if (community.members.includes(obj.userId)) {
        console.log("User is already a member of the community");
        return false;
      }

      // Add the userId to the members array and save the updated document.
      community.members.push(obj.userId);
      await community.save();

      return true;
    } catch (error) {
      console.error("Error while joining community:", error);
      return false;
    }
  };

  const getAllJoinedAndNotJoinedCommunity = async(userId: string)=>{
    try {
      // Find all communities where the provided userId exists either in the admin or members array.
      const joinedCommunities = await Community.find({
          $or: [{ admin: userId }, { members: userId }],
      });

      // Find all communities where the provided userId does not exist in the admin or members array.
      const notJoinedCommunities = await Community.find({
          $nor: [{ admin: userId }, { members: userId }],
      });

      return {
          joinedCommunities,
          notJoinedCommunities,
      };
  } catch (error) {
      console.error('Error while fetching communities:', error);
      return null; // You can handle the error case as per your requirement.
  }
  }

   const createConversation = async(conversationObj:ConversationInterface)=>{
    const result = await Conversation.create(conversationObj)
    return result
   }

   const getAllConversation = async(communityId: string)=>{
    const result = await Conversation.find({communityId})
    return result
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
    getAlertMsg,
    createCommunity,
    getAllCommunity,
    joinCommunity,
    getAllJoinedAndNotJoinedCommunity,
    createConversation,
    getAllConversation
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
