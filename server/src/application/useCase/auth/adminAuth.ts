import { HttpStatus } from "../../../types/httpStatus";
import { AdminInterface } from "../../../types/admin";
import AppError from "../../../utils/appError";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { AdminDbInterface } from "../../repository/adminDBrepository";

export const adminLoginUseCase = async (
    email: string,
    password: string,
    adminRepository: ReturnType<AdminDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {

    const admin: AdminInterface | null = await adminRepository.getAdminByEmail(email)
    if(!admin){
        throw new AppError("There is no admin in this email", HttpStatus.UNAUTHORIZED)
    }
    const isPasswordCorrect = await authService.comparePassword(password,admin?.password ?? '')
    if(!isPasswordCorrect){
        throw new AppError('sorry , your password was incorrect.Please double-check your password', HttpStatus.UNAUTHORIZED)
    }

    const token = authService.generateToken(admin?._id?.toString() ?? '')
    return token
}