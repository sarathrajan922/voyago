import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import configKeys from '../../config';
import { JwtPayload } from 'jsonwebtoken'
import configKeys from '../../config'

export const authService=()=>{

    const hashPassword = async(password:string) =>{
        const salt = await bcrypt.genSalt(10);
        const  hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    }
 
    const comparePassword=(password:string,hashedPassword:string)=>{
       return bcrypt.compare(password,hashedPassword)
    }

    const generateToken=(payload:string)=>{
        const token = jwt.sign({payload}, configKeys.JWT_SECRET, {
            expiresIn: "5d",
        });
        return token
    }

    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET)
    }

    return {
        comparePassword,
        generateToken,
        verifyToken,
        hashPassword,
    }
}


export type AuthService = typeof authService 

export type AuthServiceReturn = ReturnType<AuthService>