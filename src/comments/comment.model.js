import { Schema, model} from "mongoose";

const commentSchema = Schema({
    content: {
        type: String,
        required: true
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: "Publications",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status:{
        type:Boolean,
        default:true
    }
    
}, {
    versionKey: false,
    timestamps: true
});

export default model("Comment", commentSchema);
