import { Request} from  'express'

export interface CustomRequest extends Request{
    payload?:{
        id: string,
        role: string
    };
}