import { Admins, adminsValidation } from "../schemas/adminsSchema";
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

class AdminsController {
    async signUp(req, res) {
        try {
            const { error } = adminsValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "error", null));
            }
            const existAdmin = await Admins.exists({ username: req.body.username });

            if (existAdmin) {
                return res.status(400).json(informationReturn("User already exists", "warning", null));
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const admin = await Admins.create(req.body);
            res.status(201).json(informationReturn("User created", "success", admin));
        } catch (error) {
            requiredCatch()
        }
    }

    async signIn(req, res) {
        try {
            const { username, password } = req.body;
            const user = await Admins.findOne({ username });
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

export default new AdminsController();
