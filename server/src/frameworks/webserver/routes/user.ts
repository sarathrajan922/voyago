import express,{ Request, Response} from 'express'


// const userRouter = ()=>{
//     const route = express.Router()

//     route.get('/', (req:Request,res:Response)=>{
//         res.send('hello this is from localhost:8000/user(userRouter)')
//     })

//     route.post('/signup', (req:Request,res:Response)=>{
//         console.log(req.body)
//         res.send({
            
//                 "status": "success",
//                 "message": "User signup successful",
//                 "data": {
//                     "userId": "123456789",
//                     "firstName": "john",
//                     "lastName": "doe",
//                     "email": "john.doe@example.com",
//                     "mobile": 8783756349,
//                     "password": "***********"
//                 }
            
//         })
//     })
//     return route
// }

// export default userRouter


