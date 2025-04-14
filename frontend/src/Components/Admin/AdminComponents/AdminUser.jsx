import React, { useEffect, useState } from 'react';
import { adminaxiosInstance } from '../../../API/axiosInstance ';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await adminaxiosInstance.get('/admin/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            if (window.confirm('Please confirm again, this action is irreversible.')) {
                try {
                    await adminaxiosInstance.delete(`/admin/users/${userId}`);
                    setUsers(users.filter(user => user._id !== userId));
                } catch (err) {
                    setError('Failed to delete user');
                }
            }
        }
    };

    return (
        <div className="p-4 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="w-full space-y-4">
                {users.map(user => (
                    <div key={user._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold">Name: {user.name}</h3>
                                <p className="text-gray-600">email: {user.email}</p>
                                {user.role && <p className="text-sm text-blue-500">Role:  {user.role}</p>}
                            </div>
                            <div className="flex space-x-2">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUser;
