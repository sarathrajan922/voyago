import  {Schema,model} from "mongoose";

const userScheme = new Schema({
    firstName:{
        type: String,
        required:[true,"please add a first name"]
    },
    lastName: {
        type:String,
        required: [true, "please add a last name"]
    },
    
     email:{
        type:String,
        required: [true, "please add a email"],
        unique:true  
    },
    mobile:{
        type:Number,
        required: [true,"please add a vaild mobile number"]
    },
    password:{
        type:String
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const User = model("User",userScheme,"users")
export default User