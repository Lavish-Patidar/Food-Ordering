import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../../API/axiosInstance ';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const img1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxFWCCL0XNa1BGclHsG0Nz_05n47aJi70dg&s';
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxFWCCL0XNa1BGclHsG0Nz_05n47aJi70dg&s";

    const [showPassword, setShowpassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [conform, setConform] = useState('');
    const [phone, setPhone] = useState('');

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
                address,
                phone
            });
            console.log('Sigup success', res.data);
            localStorage.setItem('token', res.data.token);
            setEmail('');
            setPassword('');
            setAddress('');
            setName('');
            setPhone('');
            navigate('/');
        } catch (error) {
            console.error('SignUp Failed', error.message);
        }
    }


    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">Hello There.</h2>
                    <h5 className="text-lg sm:text-xl mb-6 sm:mb-10">Sign Up to continue</h5>

                    <form onSubmit={handleSubmite}>
                        <div className="mb-4 sm:mb-5">
                            <label className="block text-lg sm:text-xl font-medium mb-1 sm:mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border-b-2 focus:outline-none text-base sm:text-lg"
                                placeholder="Enter your Name"
                                required
                            />
                        </div>

                        <div className="mb-4 sm:mb-5">
                            <label className="block text-lg sm:text-xl font-medium mb-1 sm:mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border-b-2 focus:outline-none text-base sm:text-lg"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-4 sm:mb-5 relative">
                            <label className="block text-lg sm:text-xl font-medium mb-1 sm:mb-2">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border-b-2 focus:outline-none text-base sm:text-lg pr-10"
                                placeholder="Enter your password"
                                required
                                minLength="6"
                            />
                            <button
                                type="button"
                                className="absolute right-2 bottom-2 text-gray-500 hover:text-gray-700"
                                onClick={handleTogle}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="mb-4 sm:mb-5">
                            <label className="block text-lg sm:text-xl font-medium mb-1 sm:mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={conform}
                                onChange={(e) => setConform(e.target.value)}
                                className="w-full p-2 border-b-2 focus:outline-none text-base sm:text-lg"
                                placeholder="Confirm the password"
                                required
                            />
                        </div>

                        <div className="mb-4 sm:mb-5">
                            <label className="block text-lg sm:text-xl font-medium mb-1 sm:mb-2">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-2 border-b-2 focus:outline-none text-base sm:text-lg"
                                placeholder="Enter your phone"
                                required
                            />
                        </div>

                        <div className="mb-4 sm:mb-5">
                            <label className="block text-lg sm:text-xl font-medium mb-1 sm:mb-2">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-2 border-b-2 focus:outline-none text-base sm:text-lg"
                                placeholder="Enter your address"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-lg mt-4"
                        >
                            Signup
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-blue-600 cursor-pointer hover:underline text-base sm:text-lg">
                            Already have an account?
                            <button
                                type="submit"
                                className="w-full bg-green-500 cursor-pointer text-white py-2 px-4  rounded-lg hover:bg-green-600 text-lg mt-4"
                            >
                                Loging
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Image (Hidden on mobile) */}
            <div className="hidden md:block md:w-1/2 h-full">
                <img
                    src={img1}
                    alt="Signup background"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

export default Signup