import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const ownerSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "owner"
    }
}, { timestamps: true });

export const Owner = mongoose.model("Owner", ownerSchema);

export const ownerValidation = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        gender: Joi.string().required(),
        isActive: Joi.boolean(),
        role: Joi.string().valid("owner").default("owner")
    });
    return schema.validate(body);
};
