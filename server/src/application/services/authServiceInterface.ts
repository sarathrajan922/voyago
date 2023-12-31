import { AuthServiceReturn } from "../../frameworks/services/authService";
import { JwtPayload } from "jsonwebtoken";
import { PayloadInterface } from "../../types/common";

export const authServiceInterface = (service: AuthServiceReturn) => {
  const hashPassword = (password: string) => service.hashPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const verifyPassword = (token: string) => service.verifyToken(token);

  const generateToken = (payload: PayloadInterface) => service.generateToken(payload);

  return {
    hashPassword,
    comparePassword,
    verifyPassword,
    generateToken,
  };
};

export type AuthServiceInterface = typeof authServiceInterface;