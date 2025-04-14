import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { axiosInstance } from '../../API/axiosInstance ';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const img1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxFWCCL0XNa1BGclHsG0Nz_05n47aJi70dg&s';
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxFWCCL0XNa1BGclHsG0Nz_05n47aJi70dg&s";

    const [showPassword, setShowpassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleTogle = (e) => {
        e.preventDefault();
        setShowpassword(!showPassword)
    }
    const navigate = useNavigate();
    const handleSubmite = async (e) => {
        e.preventDefault();
        try {
            if (password.length < 6) {
                console.log('password should have more then 6 latters');
                return
            }
            const res = await axiosInstance.post('/users/login', {
                email,
                password
            });
            console.log('login success', res.data);
            localStorage.setItem('token', res.data.token);
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (error) {
            console.error('Login Failed', error.message);
        }
    }


    return (
        <div className="flex h-screen">
            {/* Left Side - Image */}
            <div className="hidden md:block md:w-1/2 h-full">
                <img
                    src={img1}
                    alt="Login background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl   font-bold mb-1">Welcome Back</h2>
                    <h5 className="text-xl mb-10">Sign in to continue</h5>
                    <form onSubmit={handleSubmite}>
                        <div className="mb-5">
                            <label className="block text-xl font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 p-1  border-b-1   focus:outline-none text-lg"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-6 relative">
                            <div className="w-full">
                                <label className=" w-fullblock text-xl font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-1 p-1 border-b-1   focus:outline-none text-lg"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={handleTogle}
                            >
                                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                    <Link to={'/signup'}> <div className="flex gap-6 mt-5 font-medium border-t-1 py-3 cursor-pointer hover:underline">
                        Dont have an  account
                    </div>
                        <button className="w-full bg-green-600 text-white py-2 cursor-pointer px-4 rounded hover:bg-green-700">
                            Signup
                        </button></Link>
                </div>
            </div>
        </div >
    );
};

export default Login;
