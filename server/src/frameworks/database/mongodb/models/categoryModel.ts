import { Schema, model} from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "please add a category name"]
    },
    agentId: {
        type: String,
        required: [true, "please add a agent id"]
    }
})

const Category = model('Category',categorySchema,'tourCategory')
export default Category