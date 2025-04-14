import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { adminaxiosInstance } from '../../../API/axiosInstance ';

const AdminNavbar = ({ adminData, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await adminaxiosInstance.post('/admin/logout');
            localStorage.removeItem('adminData');
            setIsAuthenticated(false);
            navigate('/admin/dashboard/login');
        } catch (err) {
            setError('Logout failed. Please try again.');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo and Hamburger */}
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <span className="ml-3 text-xl font-semibold">Admin Panel</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-4">
                    <button className="px-4 py-2 cursor-pointer bg-gray-400 text-white rounded hover:bg-blue-600 transition">
                        <span className='text-black font-bold'>Admin: </span>{adminData?.admin?.name || 'Admin'}
                    </button>
                    <button
                        onClick={() => navigate('/admin/dashboard/users')}
                        className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
                    >
                        View Users
                    </button>
                    <button
                        onClick={() => navigate('/admin/dashboard/orders')}
                        className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => navigate('/admin/dashboard/products')}
                        className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600 transition"
                    >
                        Products
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                <button
                    className="md:hidden mr-4 text-gray-700 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
                </button>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-4">
                        <div className="flex flex-col space-y-3">
                            <button className="w-full text-left px-4 py-2 cursor-pointer bg-gray-300 rounded">
                                <span className='text-black font-bold'>Admin: </span>{adminData?.admin?.name || 'Admin'}
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/admin/dashboard/users');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                View Users
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/admin/dashboard/orders');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/admin/dashboard/products');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Products
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
        </nav>
    );
};

export default AdminNavbar;
