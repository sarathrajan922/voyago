import express,{Request,Response} from "express";

const adminRouter = ()=>{
    const route = express.Router()

    route.get('/',(req:Request, res:Response)=>{
        res.send('hello this id from localhost:8000/admin(adminRouter)')
    })
return route

}

export default adminRouter