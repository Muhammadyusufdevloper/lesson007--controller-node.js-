import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const blogsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

export const Blogs = mongoose.model("Blogs", blogsSchema);

export const blogValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.string().required(),
    });
    return schema.validate(body);
}