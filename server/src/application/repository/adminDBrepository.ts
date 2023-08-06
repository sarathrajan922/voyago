import { ObjectId } from "mongoose";
import { AdminRepossitoryMongoDB } from "../../frameworks/database/mongodb/repositories/adminRepoMongoDB";
// import { AdminInterface } from "../../types/admin";

export const adminDbRepository = (
  repository: ReturnType<AdminRepossitoryMongoDB>
) => {
  const getAdminByEmail = async (email: string) =>await repository.getAdminByEmail(email);
  const getAllUsers = async () => await repository.getAllusers();
  const getAllAgents = async () => await repository.getAllAgents();
  const blockUser = async (ojbId: string) => await repository.blockUser(ojbId);
  const blockAgent = async (ojbId: string) =>await repository.blockAgent(ojbId);
  const getUnverifiedAgents = async () =>await repository.getUnverifiedAgents();
  const verifyAgent = async (objId: string) =>await repository.verifyAgent(objId);
  const BasicDetailsUserAgentPackageBooking = async () =>await repository.BasicDetailsUserAgentPackageBooking();
  const getAgentStatus = async () => await repository.getAgentStatus();
  const getAllBookingStat = async()=> await repository.AllBookingStat();
  const getRevenue = async()=> await repository.getRevenue();

  return {
    getAdminByEmail,
    getAllUsers,
    getAllAgents,
    blockUser,
    blockAgent,
    getUnverifiedAgents,
    verifyAgent,
    BasicDetailsUserAgentPackageBooking,
    getAgentStatus,
    getAllBookingStat,
    getRevenue
  };
};

export type AdminDbInterface = typeof adminDbRepository;
