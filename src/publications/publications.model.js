import { Schema, model} from "mongoose";

const publicationSchema = Schema({
    title:{
        type: String,
        require: true,
        maxLength:100
    },

    category:{
        type: String,
        require: true
    },

    content: {
        type: String,
        required:true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    comments:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },

    status:{
        type:Boolean,
        default:true
    }
    
}, {
    timestamps: true,
    versionKey:false,
});

export default model('Publications',publicationSchema)