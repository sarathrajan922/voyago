import mongoose from "mongoose";
mongoose.set('strictQuery',true)
import configKeys from "../../../config";
// const mongodbUrl =  "mongodb+srv://sarathrajan:cnbvRjsjfyQA90Se@timeshub.l0vdmu5.mongodb.net/test?authSource=timesHub&authMechanism=SCRAM-SHA-1"

const connectDB = async () => {

    const dbObject = {
        dbName: configKeys.DB_NAME
    }
    
    try {
      await mongoose.connect(configKeys.MONGO_DB_URL, dbObject)
      console.log(`Database connected successfully`)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }
  
  export default connectDB