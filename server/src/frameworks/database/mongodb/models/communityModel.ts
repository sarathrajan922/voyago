import { Schema, model } from "mongoose";

const communitySchema = new Schema({
    communityName: {
        type: String,
        required: [true, "please specify a community name"]
    },
    admin:{
        type: String,
        required: [true, 'please add a userId']
    },
    members: {
        type: Array  
    }
})

const Community = model('Community',communitySchema,'community')
export default Community;