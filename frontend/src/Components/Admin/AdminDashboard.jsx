import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminComponents/AdminNavbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminUser from './AdminComponents/AdminUser'
import AdminProducts from './AdminComponents/AdminProducts'
import AdminOrder from './AdminComponents/AdminOrder'
import AdminLogin from './AdminLogin'

const AdminDashboard = () => {
    const [adminData, setAdminData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Check authentication status on component mount
    useEffect(() => {
        const storedAdmin = localStorage.getItem('adminData')
        if (storedAdmin) {
            setAdminData(JSON.parse(storedAdmin))
            setIsAuthenticated(true)
        }
    }, [])

    const handleLoginSuccess = (adminResponse) => {
        setAdminData(adminResponse)
        localStorage.setItem('adminData', JSON.stringify(adminResponse))
        setIsAuthenticated(true)
    }

    if (!isAuthenticated) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />
    }

    return (
        <div className="flex flex-col min-h-screen">
            <AdminNavbar adminData={adminData} setIsAuthenticated={setIsAuthenticated} />
            <main className="flex-grow pt-20 px-4">
                <Routes>
                    <Route path="users" element={<AdminUser adminData={adminData} />} />
                    <Route path="products" element={<AdminProducts adminData={adminData} />} />
                    <Route path="orders" element={<AdminOrder adminData={adminData} />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard/users" replace />} />
                </Routes>
            </main>
        </div>
    )
}

export default AdminDashboard
