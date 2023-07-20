import {Schema,model} from "mongoose"

const userAlertMessageSchema = new Schema({
    message: {
        type: String,
        require: [true,'please provide a message']
    },
    userId: {
        type: String,
        required: [true,'please provide userId']
    },
    agentId: {
        type: String,
        required: [true, 'please provide agentId']
    }

})

const UserAlertMsg = model('UserAlertMsg',userAlertMessageSchema,'userAlertMessage')
export default UserAlertMsg;