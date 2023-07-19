import  {Schema,model} from "mongoose";

const userScheme = new Schema({
    firstName:{
        type: String,
        required:[true,"please add a first name"]
    },
    lastName: {
        type:String,
        // required: [true, "please add a last name"]
    },
    
     email:{
        type:String,
        required: [true, "please add a email"],
        unique:true  
    },
    mobile:{
        type:Number,
        
    },
    password:{
        type:String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
})

const User = model("User",userScheme,"users")
export default User