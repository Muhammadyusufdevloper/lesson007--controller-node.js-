import { Users, usersValidation } from "../schemas/usersSchema";

function requiredCatch() {
    return {
        msg: "Server error",
        variant: "error",
        payload: null
    };
}

function informationReturn(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    };
}

class UsersController {
    async get(req, res) {
        try {
            const users = await Users.find();
            if (!users.length) {
                return res.status(400).json(
                    informationReturn("No users found", "error", null)
                );
            }
            res.status(200).json(
                informationReturn("All users", "success", users)
            );
        } catch (error) {
            res.status(500).json(requiredCatch());
        }
    }

    async post(req, res) {
        try {
            const { error } = usersValidation(req.body);
            if (error) {
                return res.status(400).json(
                    informationReturn(error.details[0].message, "error", null)
                );
            }

            const newUser = new Users(req.body);
            await newUser.save();

            res.status(201).json(
                informationReturn("User created successfully", "success", newUser)
            );
        } catch (error) {
            res.status(500).json(requiredCatch());
        }
    }

    async put(req, res) {
        try {
            const { error } = usersValidation(req.body);
            if (error) {
                return res.status(400).json(
                    informationReturn(error.details[0].message, "error", null)
                );
            }

            const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json(
                    informationReturn("User not found", "error", null)
                );
            }

            res.status(200).json(
                informationReturn("User updated successfully", "success", updatedUser)
            );
        } catch (error) {
            res.status(500).json(requiredCatch());
        }
    }

    async delete(req, res) {
        try {
            const deletedUser = await Users.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json(
                    informationReturn("User not found", "error", null)
                );
            }

            res.status(200).json(
                informationReturn("User deleted successfully", "success", deletedUser)
            );
        } catch (error) {
            res.status(500).json(requiredCatch());
        }
    }
}

export default new UsersController();
