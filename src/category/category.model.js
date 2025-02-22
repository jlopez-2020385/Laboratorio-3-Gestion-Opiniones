import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50
    },
    status:{
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Category', categorySchema);
