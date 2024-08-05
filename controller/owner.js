import { Owners, ownerValidation } from "../schemas/ownerSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function requiredCatch() {
    return {
        msg: "Server error",
        variant: "error",
        payload: null
    }
}

function informationReturn(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    }
}

class OwnersController {
    async signUp(req, res) {
        try {
            const { error } = ownerValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "error", null));
            }
            const existOwner = await Owners.exists({ username: req.body.username });

            if (existOwner) {
                return res.status(400).json(informationReturn("User already exists", "warning", null));
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const owner = await Owners.create(req.body);
            res.status(201).json(informationReturn("User created", "success", owner));
        } catch (error) {
            requiredCatch()
        }
    }

    async signIn(req, res) {
        try {
            const { username, password } = req.body;
            const user = await Owners.findOne({ username });
            if (!user) {
                return res.status(400).json(informationReturn("User | Password not found", "error", null));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    ...informationReturn("User signed in", "success", user),
                    token
                });
            } else {
                return res.status(400).json(informationReturn("User | Password not found", "error", null));
            }
        } catch (error) {
            requiredCatch()
        }
    }
}

export default new OwnersController();
