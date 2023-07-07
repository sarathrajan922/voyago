import Agent from "../models/agentModel";
import {
  AgentRegisterInterface,
  AgentAddCategoryInterface,
  AgentTourPackageInterface,
} from "../../../../types/agent";
import Category from "../models/categoryModel";
import TourPackage from "../models/tourPackageModel";
import { Types } from "mongoose";

export const agentRepositoryMongoDB = () => {
  const addAgent = async (agent: AgentRegisterInterface) => {
    return await Agent.create(agent);
  };

  const getAgentByEmail = async (email: string) => {
    return Agent.findOne({ email });
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

  const updatePackage = async (editedPackage: AgentTourPackageInterface, packageId: string) => {
    const id = new Types.ObjectId(packageId);
    try {
      const updatedPackage = await TourPackage.findByIdAndUpdate(
        id,
        {
          $set: {
            ...editedPackage,
          },
        },
       
      );
  
      return updatedPackage;
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
    updatePackage
    
  };
};

export type AgentRepositoryMongoDB = typeof agentRepositoryMongoDB;
