import express from "express";
import {
    adminLogin,
    adminLogout,
    getAllUsers,
    updateUser,
    deleteUser,
} from "../Controller/adminController.js";


const router = express.Router();

// Admin Authentication
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Admin Management
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

//Admin Product Managment


export default router;
