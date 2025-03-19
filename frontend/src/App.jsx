import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Posts from "./components/Posts.jsx";
import Appointment from "./components/Appointment.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminAppointment from "./components/AdminApppointment.jsx"
import Resources from "./components/Resources.jsx";


const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user } = useAuth();
    const isAuthenticated = !!user || !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user && localStorage.getItem('token')) {
        try {
            const token = localStorage.getItem('token');
            const decodedUser = jwtDecode(token);
            return <Navigate to="/dashboard" replace />;
        } catch (error) {
            localStorage.removeItem('token');
            return <Navigate to="/login" replace />;
        }
    }
    if (requiredRole && user && user.role !== requiredRole) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        {/* Protected routes for registered users */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/form"
                            element={
                                <ProtectedRoute>
                                    <Posts />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/appointment"
                            element={
                                <ProtectedRoute>
                                    <Appointment />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute requiredRole="admin">
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/appointments"
                            element={
                                <ProtectedRoute requiredRole="admin">
                                    <AdminAppointment />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/resources"
                            element={
                                <ProtectedRoute requiredRole="admin">
                                    <Resources />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;