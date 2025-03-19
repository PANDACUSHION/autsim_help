import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Heart, User, LogOut, Calendar, MessageCircle, Home, Settings } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getUserType = () => {
        if (!user) return "unregistered";
        return user.role === "admin" ? "admin" : "registered";
    };

    const userType = getUserType();

    return (
        <div className="navbar bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg p-4 rounded-b-3xl border-b-4 border-blue-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-circle bg-blue-500 text-white text-2xl lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        🍔
                    </label>
                    {isMenuOpen && (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border-2 border-blue-300">
                            {userType === "admin" ? (
                                <>
                                    <li><Link to="/admin/dashboard" className="flex items-center gap-2"><Home size={18} /> Admin Dashboard</Link></li>
                                    <li><Link to="/admin/appointments" className="flex items-center gap-2"><Settings size={18} /> Admin Appointment</Link></li>
                                    <li><button onClick={logout} className="text-red-500 flex items-center gap-2"><LogOut size={18} /> Logout</button></li>
                                </>
                            ) : userType === "registered" ? (
                                <>
                                    <li><Link to="/dashboard" className="flex items-center gap-2"><Home size={18} /> Dashboard</Link></li>
                                    <li><Link to={`/user/${user?.id}`} className="flex items-center gap-2"><User size={18} /> Profile</Link></li>
                                    <li><Link to="/form" className="flex items-center gap-2"><MessageCircle size={18} /> Forums</Link></li>
                                    <li><Link to="/appointment" className="flex items-center gap-2"><Calendar size={18} /> Appointments</Link></li>
                                    <li><button onClick={logout} className="text-red-500 flex items-center gap-2"><LogOut size={18} /> Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/login" className="text-blue-600">🔑 Login</Link></li>
                                    <li><Link to="/signup" className="btn btn-primary rounded-full shadow-md">📝 Sign Up</Link></li>
                                </>
                            )}
                        </ul>
                    )}
                </div>
                <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <Heart className="text-white" size={16} />
                    </div>
                    <span>Autism <span className="text-purple-600">Friends Circle</span></span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {userType === "admin" ? (
                        <>
                            <li><Link to="/admin/appointments" className="flex items-center gap-2"><Settings size={18} /> Admin Appointment</Link></li>
                            <li><Link to="/admin/dashboard" className="text-blue-600 hover:bg-blue-50 rounded-lg">📊 Admin Dashboard</Link></li>
                            <li><Link to="/admin/resources" className="text-blue-600 hover:bg-blue-50 rounded-lg">⚙️ Admin Resources</Link></li>
                        </>
                    ) : userType === "registered" ? (
                        <>
                            <li><Link to="/dashboard" className="text-blue-600 hover:bg-blue-50 rounded-lg">🏠 Dashboard</Link></li>
                            <li><Link to="/form" className="text-blue-600 hover:bg-blue-50 rounded-lg">💬 Forums</Link></li>
                            <li><Link to="/appointment" className="text-blue-600 hover:bg-blue-50 rounded-lg">📅 Appointments</Link></li>
                        </>
                    ) : null}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-circle bg-purple-500 text-white text-xl">
                            👋
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border-2 border-purple-300">
                            <li>
                                <button onClick={logout} className="text-red-500 flex items-center gap-2">
                                    <LogOut size={18} /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn btn-ghost text-blue-600 hover:bg-blue-50">🔑 Login</Link>
                        <Link to="/signup" className="btn btn-primary rounded-full shadow-md">📝 Sign Up</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
