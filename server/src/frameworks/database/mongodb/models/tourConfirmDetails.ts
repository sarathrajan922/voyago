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
    rooms: {
        type: Number,
        required: [true, 'please add no:of room required']
    },
    packageId: {
        type: String,
        required: [true, 'please add packageId']
    },
    userId: {
        type: String,
        required: [true, 'please add userId']
    }



})

const TourConfirm = model("TourConfirm", tourConfirmSchema, 'tourConfirmDetails')
export default TourConfirm