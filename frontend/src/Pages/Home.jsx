import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold underline text-blue-500 mb-4">Home Page</h1>
            <Link 
                to="/cart" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                View Cart
            </Link>
        </div>
    )
}

export default Home;