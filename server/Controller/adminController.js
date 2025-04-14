import Admin from "../Schema/AdminSchema.js";
import User from "../Schema/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: admin.email, id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ admin: admin, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Admin Logout
export const adminLogout = (req, res) => {
    res.status(200).json({ message: "Admin logged out successfully" });
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0, __v: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, select: '-password -__v' }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user" });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};
