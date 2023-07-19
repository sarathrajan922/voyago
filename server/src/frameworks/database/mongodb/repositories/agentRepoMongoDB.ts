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
 

    const packages = await TourPackage.find({ agentId: agentId });
    const packageIds = packages.map((pkg) => pkg._id);
    // console.log(packages)
 

    // console.log(packageIds)

    const bookedData = await TourConfirm.find({ packageId: { $in: packageIds } });
    // console.log(data)
    const tourPackageIds = bookedData.map((doc)=> doc.packageId)

    const packageData = await TourPackage.find({_id: { $in: tourPackageIds}})
 
    console.log(packageData)


    // aggregation

    const data = await TourConfirm.aggregate([
      {
        $match: { agentId }
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
          from: 'tourPackages',
          localField: 'packageIdObj',
          foreignField: "_id",
          as: 'packageDetails'
        }
      },
      {
        $unwind: '$packageDetails'
      },
      
    ])

    console.log('aggregated data')
    console.log(data)

    // return {
    //   bookedData,
    //   packageData
    // }
    return data
  };

  const checkAgentVerified = async(agentId: string)=>{
    const id = new Types.ObjectId(agentId)
    const result = await Agent.findOne({ _id:  id, isVerified: true });
   return result ? true :  false

  }


  const getAgentProfile = async(agentId: string)=> {
    const id = new Types.ObjectId(agentId)
    const result = await Agent.findOne({_id: id})
    return result
  }

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
    agentProfileUpdate
  };
};

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;
