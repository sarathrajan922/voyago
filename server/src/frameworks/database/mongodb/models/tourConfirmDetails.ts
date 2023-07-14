import {Schema, model} from "mongoose"

const tourConfirmSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'please add a last name']
    },
    Email: {
        type: String,
        required: [true, 'please add a email']
    },
    travelDate: {
        type: String,
        required: [true, 'please valid  date']
    },
    person: {
        type: Number,
        required: [true, 'please add no:of person required']
    },
    packageId: {
        type: String,
        required: [true, 'please add packageId']
    },
    userId: {
        type: String,
        required: [true, 'please add userId']
    },
    payment: {
        type:String,
        default: 'pending'
    }



})

const TourConfirm = model("TourConfirm", tourConfirmSchema, 'tourConfirmDetails')
export default TourConfirm