import React from 'react';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-blue-900 text-white py-8 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Autism Friends Circle</h3>
                        <p>Creating a supportive community for children with autism and their families.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-300">Home</a></li>
                            <li><a href="#" className="hover:text-blue-300">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-300">Events</a></li>
                            <li><a href="#" className="hover:text-blue-300">Resources</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-300">Facebook Group</a></li>
                            <li><a href="#" className="hover:text-blue-300">Instagram</a></li>
                            <li><a href="#" className="hover:text-blue-300">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                        <p className="mb-4">Stay updated with our latest events and resources</p>
                        <div className="join">
                            <input className="input join-item rounded-l-full bg-blue-800 text-white border-blue-700" placeholder="Email Address" />
                            <button className="btn join-item rounded-r-full bg-blue-500 hover:bg-blue-400 border-blue-500">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-blue-800 text-center text-blue-300">
                    <p>© 2025 Autism Friends Circle. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;