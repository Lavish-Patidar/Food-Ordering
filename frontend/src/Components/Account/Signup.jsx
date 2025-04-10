import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/axiosInstance ';

const Signup = () => {
    const img1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxFWCCL0XNa1BGclHsG0Nz_05n47aJi70dg&s';
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxFWCCL0XNa1BGclHsG0Nz_05n47aJi70dg&s";

    const [showPassword, setShowpassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [conform, setConform] = useState('');

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
                console.log(password.length);

                return
            }
            if (password != conform) {
                console.log('Password not mach');
                return;
            }
            const res = await axiosInstance.post('/users/signup', {
                name,
                email,
                password,
                address
            });
            console.log('Sigup success', res.data);
            localStorage.setItem('token', res.data.token);
            setEmail('');
            setPassword('');
            setAddress('');
            setName('');
            navigate('/');
        } catch (error) {
            console.error('SignUp Failed', error.message);
        }
    }


    return (
        <div className="flex h-screen">


            {/* left Side - Form */}
            <div className="sm:w-full md:w-1/2 flex sm:items-start md:items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h2 className=" text-5xl font-bold mb-1">Hello There.</h2>
                    <h5 className="text-xl mb-10">SignUpto continue</h5>
                    <form onSubmit={handleSubmite}>
                        <div className="sm:mb-3 md:mb-5">
                            <label className="block text-xl font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 p-1  border-b-1   focus:outline-none text-lg"
                                placeholder="Enter your Name"
                            />
                        </div>
                        <div className="sm:mb-3 md:mb-5">
                            <label className="block text-xl font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 p-1  border-b-1   focus:outline-none text-lg"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="sm:mb-3 md:mb-5 relative">
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
                                />
                            </div>
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={handleTogle}
                            >
                                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                            </button>
                        </div>
                        <div className="sm:mb-3 md:mb-5 relative">
                            <div className="w-full">
                                <label className=" w-fullblock text-xl font-medium mb-1">
                                    Conform Password
                                </label>
                                <input
                                    type="password"
                                    value={conform}
                                    onChange={(e) => setConform(e.target.value)}
                                    className="w-full mt-1 p-1 border-b-1   focus:outline-none text-lg"
                                    placeholder="Conferm the  password"
                                />
                            </div>
                        </div>

                        <div className="sm:mb-3 md:mb-5">
                            <label className="block text-xl font-medium mb-1">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-1 p-1  border-b-1   focus:outline-none text-lg"
                                placeholder="Enter your address"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
                        >
                            Signup
                        </button>
                    </form >
                    <Link to={'/login'}><div className="flex gap-6 mt-5 font-medium border-t-1 py-3 cursor-pointer hover:underline">
                        Already have account
                    </div>
                        <button className="w-full bg-green-600 text-white py-2 cursor-pointer px-4 rounded hover:bg-green-700">
                            Login
                        </button></Link>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block md:w-1/2  h-full">
                <img
                    src={img1}
                    alt="Login background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default Signup