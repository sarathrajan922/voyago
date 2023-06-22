import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: [true, "please add a email"]
    },
    password: {
        type: String,
        required: [true, "please add password"]
    }
})

const Admin = model('Admin', adminSchema, 'admin')
export default Admin