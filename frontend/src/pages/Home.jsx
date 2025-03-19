import React from "react";
import { Heart, Calendar, Users, Star, MapPin } from "lucide-react";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
            <div className="relative overflow-hidden py-16 px-6 bg-gradient-to-r from-blue-200 to-purple-200">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
                        Where Everyone Belongs
                    </h1>
                    <p className="text-xl text-purple-700 mb-8">
                        A warm, understanding community for children with autism and their families
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="btn btn-lg btn-primary rounded-full shadow-lg">
                            Join Our Community
                        </button>
                        <button className="btn btn-lg btn-outline btn-primary rounded-full">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-200 rounded-full opacity-70"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-70"></div>
                <div className="absolute top-20 right-40 w-12 h-12 bg-green-200 rounded-full opacity-70"></div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">Our Colorful Community</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-blue-50 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <Users size={32} className="text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-700">Friendly Meetups</h3>
                                <p className="text-blue-600">
                                    Regular gatherings where children can socialize in a supportive environment
                                </p>
                            </div>
                        </div>

                        <div className="card bg-purple-50 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                                    <Calendar size={32} className="text-purple-500" />
                                </div>
                                <h3 className="text-xl font-bold text-purple-700">Fun Activities</h3>
                                <p className="text-purple-600">
                                    Sensory-friendly events designed with every child's comfort in mind
                                </p>
                            </div>
                        </div>

                        <div className="card bg-green-50 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <Heart size={32} className="text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-green-700">Parent Support</h3>
                                <p className="text-green-600">
                                    Connect with other families who understand your journey
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 px-6 bg-gradient-to-r from-purple-100 to-blue-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">
                        Our Community Stories
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex mb-4">
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                </div>
                                <p className="italic mb-4">
                                    "Finding this community changed everything for our family. My son has made wonderful friends who understand his unique way of seeing the world."
                                </p>
                                <p className="font-bold text-purple-700">- Emma's Mom</p>
                            </div>
                        </div>

                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex mb-4">
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                </div>
                                <p className="italic mb-4">
                                    "I like coming to the meetups because nobody thinks I'm weird when I talk about my favorite things!"
                                </p>
                                <p className="font-bold text-purple-700">- Michael, 12</p>
                            </div>
                        </div>

                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex mb-4">
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                    <Star className="text-yellow-400" size={20} />
                                </div>
                                <p className="italic mb-4">
                                    "The inclusive environment this community has created helps children develop social skills in a supportive, pressure-free setting."
                                </p>
                                <p className="font-bold text-purple-700">- Dr. Thompson</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">Join Us Soon!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-yellow-50 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar size={20} className="text-yellow-600" />
                                    <span className="font-bold text-yellow-600">April 2</span>
                                </div>
                                <h3 className="text-xl font-bold text-yellow-700">Arts & Crafts Day</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={16} className="text-yellow-600" />
                                    <span className="text-yellow-600">Community Center</span>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-blue-50 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar size={20} className="text-blue-600" />
                                    <span className="font-bold text-blue-600">April 8</span>
                                </div>
                                <h3 className="text-xl font-bold text-blue-700">Parent Support Group</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={16} className="text-blue-600" />
                                    <span className="text-blue-600">Online Meeting</span>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-green-50 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar size={20} className="text-green-600" />
                                    <span className="font-bold text-green-600">April 15</span>
                                </div>
                                <h3 className="text-xl font-bold text-green-700">Sensory-Friendly Movie</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={16} className="text-green-600" />
                                    <span className="text-green-600">Sunshine Theater</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <button className="btn btn-lg btn-primary rounded-full">View All Events</button>
                    </div>
                </div>
            </div>

            {/* Join Us CTA */}
            <div className="py-16 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Be Part of Our Colorful Community
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Everyone has unique gifts to share. Join our supportive community where we celebrate neurodiversity and help each other grow.
                    </p>
                    <button className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8">
                        Join Us Today
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Home;