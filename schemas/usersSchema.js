import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const usersSchema = new Schema({
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
    budget: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
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
        default: "user"
    }
}, { timestamps: true });

export const Users = mongoose.model("Users", usersSchema);

export const usersValidation = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        budget: Joi.number().required(),
        age: Joi.number().required(),
        gender: Joi.string().required(),
        isActive: Joi.boolean(),
        role: Joi.string().valid("user").default("user")
    });
    return schema.validate(body);
};
