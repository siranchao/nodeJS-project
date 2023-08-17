import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Number,
        default: 1
    }

})

export default mongoose.model('Task', TaskSchema)