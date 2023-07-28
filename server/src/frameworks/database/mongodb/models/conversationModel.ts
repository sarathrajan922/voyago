import { timeStamp } from "console";
import { Schema, model } from "mongoose";

const CoversationSchema = new Schema({
    communityId: {
        type:String,
        required: [true,'please specify a community Id']
    },
    message:{
        type:String,
        required:[true, 'please specify a message']
    },
    createdAt: {    
        type:Date,
        default: Date.now
    },
    senderId: {
        type: String,
        required: [true,'please specify a sender Id']
    }
})

const Conversation = model('Conversation',CoversationSchema, 'conversation')
export default Conversation;