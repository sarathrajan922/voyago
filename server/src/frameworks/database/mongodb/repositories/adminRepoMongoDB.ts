import Admin from "../models/adminModel";
import { AdminInterface } from "../../../../types/admin";
import User from "../models/userModel";
import Agent from "../models/agentModel";
import { ObjectId, Types } from "mongoose";
import TourPackage from "../models/tourPackageModel";
import TourConfirm from "../models/tourConfirmDetails";

export const adminRepossitoryMongoDB = () => {
  const getAdminByEmail = async (email: string) => {
    return Admin.findOne({ email });
  };

  const getAllusers = async () => {
    const AllUsers = await User.find();
    return AllUsers;
  };

  const getAllAgents = async () => {
    const AllAgents = await Agent.find();
    return AllAgents;
  };

  const blockUser = async (objId: string) => {
    const id = new Types.ObjectId(objId);
    const user = await User.findById(id);
    const status = !user?.isActive;
    const result = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isActive: status } }
    );
    return result;
  };

  const blockAgent = async (objId: string) => {
    const id = new Types.ObjectId(objId);
    const agent = await Agent.findById(id);
    const status = !agent?.isActive;
    const result = await Agent.findOneAndUpdate(
      { _id: id },
      { $set: { isActive: status } }
    );
    return result;
  };

  const getUnverifiedAgents = async () => {
    const result = await Agent.find({ isVerified: false });
    return result;
  };

  const verifyAgent = async (objId: string) => {
    const id = new Types.ObjectId(objId);
    const result = await Agent.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: { isVerified: true },
      }
    );

    return result;
  };

  const BasicDetailsUserAgentPackageBooking = async () => {
    const UserCount = await User.countDocuments({});

    const AgentCount = await Agent.countDocuments({});
    const PackageCount = await TourPackage.countDocuments({});
    const BookingCount = await TourConfirm.find({ payment: "success" }).count();

    const resObj = {
      UserCount,
      AgentCount,
      PackageCount,
      BookingCount,
    };

    console.log(resObj);
    return resObj;
  };

  // const getAllAgents = async ()=>{
  //     const AllAgents = await repository.getAllAgents();
  //     return AllAgents
  // }

  const getAgentStatus = async () => {
    const result = await Agent.aggregate([
      {
        $group: {
          _id: null,
          activeCount: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          inactiveCount: {
            $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
          },
          verifiedCount: {
            $sum: { $cond: [{ $eq: ["$isVerified", true] }, 1, 0] },
          },
          notVerifiedCount: {
            $sum: { $cond: [{ $eq: ["$isVerified", false] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    return result[0];
  };

 
  const AllBookingStat = async ()=>{
    const bookingCounts: number[] = Array.from({ length: 12 }, () => 0);
  const data = await TourConfirm.aggregate([
    {
      $match: {
        payment: 'success' // Find documents with payment "success"
      }
    },
    {
      $group: {
        _id: { $month: { date: { $toDate: '$travelDate' } } }, // Extract the month from the travelDate field
        count: { $sum: 1 } // Count the bookings for each month
      }
    }
  ])
  
   data.forEach((data)=>{
    const monthIndex = data._id -1;
    bookingCounts[monthIndex]= data.count;
   })

  
    return bookingCounts
  }


  const getRevenue = async()=>{
    const data = await TourConfirm.aggregate([
      {
        $match:{  payment: 'success' },
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
      { $unwind: '$package' },
      {
        $set: {
          total: { $multiply: ['$package.price', '$person'] },
        },
      },
      {
        $set:{
          adminProfit:{
            $multiply: ['$total',0.05]
          }
        }
      },
      {
        $set: {
          agentGet: { $subtract: ['$total', { $multiply: ['$total', 0.05] }] },
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
          adminProfit: 1
        },
      },
    ])
    let agentRevenue = 0;
    for (const tourConfirm of data) {
    agentRevenue += tourConfirm.agentGet;
    }

    let adminRevenue = 0;
    for(const tourConfirm of data){
      adminRevenue += tourConfirm.adminProfit;
    }

    

   
    return {
      data,
      agentRevenue,
      adminRevenue
    };
  }

  return {
    getAdminByEmail,
    getAllusers,
    getAllAgents,
    blockUser,
    blockAgent,
    getUnverifiedAgents,
    verifyAgent,
    BasicDetailsUserAgentPackageBooking,
    getAgentStatus,
    AllBookingStat,
    getRevenue
  };
};

export type AdminRepossitoryMongoDB = typeof adminRepossitoryMongoDB;
