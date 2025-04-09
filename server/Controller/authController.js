import User from "../Schema/UserSchema.js"
import { generateAuthToken } from "../utils/tokenUtils.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { name, email, password, role, address } = req.body;
    try {
        if (!name || !email || !password || !address) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            address
        });

        if (newUser) {
            await newUser.save();
            const token = generateAuthToken(newUser);
            console.log(token);
            res.status(201).json({ message: "User created successfully", newUser, token });


        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error in Registration', error: error.message })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateAuthToken(user);
        console.log(token);
        res.status(200).json({ user, token });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};