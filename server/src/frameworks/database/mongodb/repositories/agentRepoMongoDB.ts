import Agent from "../models/agentModel";
import {
  AgentRegisterInterface,
  AgentAddCategoryInterface,
  AgentTourPackageInterface,
} from "../../../../types/agent";
import Category from "../models/categoryModel";
import TourPackage from "../models/tourPackageModel";
import { Aggregate, Types } from "mongoose";
import TourConfirm from "../models/tourConfirmDetails";
import UserAlertMsg from "../models/userAlertMessageModel";
import User from "../models/userModel";

export const agentRepositoryMongoDB = () => {
  const addAgent = async (agent: AgentRegisterInterface) => {
    return await Agent.create(agent);
  };

  const getAgentByEmail = async (email: string) => {
    return Agent.findOne({ email });
  };

  const checkAgentBlock = async (email: string) => {
    return Agent.findOne({ email: email, isActive: true });
  };

  const checkCategoryExist = async (agentId: String, categoryName: String) => {
    return await Category.findOne({
      agentId: agentId,
      name: categoryName,
    });
  };

  const addCategory = async (category: AgentAddCategoryInterface) => {
    return Category.create(category);
  };

  const getCategory = async (objId: string) => {
    const id = new Types.ObjectId(objId);
    return Category.find({ agentId: id });
  };

  const deleteCategory = async (agentId: string, categoryName: string) => {
    const id = new Types.ObjectId(agentId);
    return Category.findOneAndDelete({ agentId: id, name: categoryName });
  };

  const addPackage = async (tourPackage: AgentTourPackageInterface) => {
    return await TourPackage.create(tourPackage);
  };

  const getAllPackages = async (objId: string) => {
    return await TourPackage.find({ agnetId: objId });
  };

  const getPackage = async (objId: string) => {
    const id = new Types.ObjectId(objId);
    return await TourPackage.findOne({ _id: id });
  };

  const disablePackage = async (packageId: string) => {
    const id = new Types.ObjectId(packageId);
    return await TourPackage.findOneAndUpdate(
      { _id: id },
      {
        $set: { isDisabled: true },
      }
    );
  };

  const updatePackage = async (
    editedPackage: AgentTourPackageInterface,
    packageId: string
  ) => {
    const id = new Types.ObjectId(packageId);
    try {
      const updatedPackage = await TourPackage.findByIdAndUpdate(id, {
        $set: {
          ...editedPackage,
        },
      });

      return updatedPackage;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deletePackage = async (packageId: string) => {
    const id = new Types.ObjectId(packageId);
    const deletePackage = await TourPackage.findByIdAndDelete(id);
    return deletePackage;
  };

  const getAllBookings = async (agentId: string) => {
    const data = await TourConfirm.aggregate([
      {
        $match: { agentId },
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
    return data;
  };

  const checkAgentVerified = async (agentId: string) => {
    const id = new Types.ObjectId(agentId);
    const result = await Agent.findOne({ _id: id, isVerified: true });
    return result ? true : false;
  };

  const getAgentProfile = async (agentId: string) => {
    const id = new Types.ObjectId(agentId);
    const result = await Agent.findOne({ _id: id });
    return result;
  };

  const agentProfileUpdate = async (
    agentId: string,
    editedDetails: AgentRegisterInterface
  ) => {
    const id = new Types.ObjectId(agentId);
    try {
      const updatedAgent = await Agent.findByIdAndUpdate(id, {
        $set: {
          ...editedDetails,
        },
      });
      return updatedAgent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const paymentAlert = async (obj: any) => {
    const result = await UserAlertMsg.create(obj);
    return result;
  };

  const getAllAgentBookingStat = async (agentId: string) => {
    const bookingCounts: number[] = Array.from({ length: 12 }, () => 0);
    const data = await TourConfirm.aggregate([
      {
        $match: {
          agentId: agentId,
          payment: "success",
        },
      },
      {
        $group: {
          _id: { $month: { date: { $toDate: "$travelDate" } } },
          count: { $sum: 1 },
        },
      },
    ]);

    data.forEach((data) => {
      const monthIndex = data._id - 1;
      bookingCounts[monthIndex] = data.count;
    });
    
    return bookingCounts;
  };

  const getRevenue = async (agentId:string) => {
    const data = await TourConfirm.aggregate([
      {
        $match: { agentId: agentId,
          payment: 'success' },
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
          as: "package",
        },
      },
      { $unwind: "$package" },
      {
        $set: {
          total: { $multiply: ["$package.price", "$person"] },
        },
      },
      {
        $set: {
          adminProfit: {
            $multiply: ["$total", 0.05],
          },
        },
      },
      {
        $set: {
          agentGet: { $subtract: ["$total", { $multiply: ["$total", 0.05] }] },
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          Email: 1,
          travelDate: 1,
          person: 1,
          packageId: 1,
          userId: 1,
          payment: 1,
          agentId: 1,
          total: 1,
          agentGet: 1,
          adminProfit: 1,
        },
      },
    ]);
    let agentRevenue = 0;
    for (const tourConfirm of data) {
      agentRevenue += tourConfirm.agentGet;
    }

    let adminRevenue = 0;
    for (const tourConfirm of data) {
      adminRevenue += tourConfirm.adminProfit;
    }

    return {
      data,
      agentRevenue,
      adminRevenue,
    };
  };

  const getUserCountAndBookingCount = async (agentId: string) => {
    const bookingCount = await TourConfirm.countDocuments({
      agentId: agentId,
      payment: 'success',
    });

    const userCount = await User.countDocuments()
    return {
      bookingCount,
      userCount
    }
  };

  return {
    addAgent,
    getAgentByEmail,
    addCategory,
    getCategory,
    deleteCategory,
    addPackage,
    getAllPackages,
    getPackage,
    checkCategoryExist,
    disablePackage,
    updatePackage,
    deletePackage,
    checkAgentBlock,
    getAllBookings,
    checkAgentVerified,
    getAgentProfile,
    agentProfileUpdate,
    paymentAlert,
    getAllAgentBookingStat,
    getRevenue,
    getUserCountAndBookingCount,
  };
};

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;
