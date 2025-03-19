import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userName, setUserName] = useState('Friend');
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Positive messages that provide encouragement and support
    const positiveMessages = [
        "You're doing great today!",
        "Remember to take breaks when you need them.",
        "It's okay to feel overwhelmed sometimes.",
        "You have unique strengths that make you amazing!",
        "Small steps lead to big accomplishments.",
        "It's okay to ask for help when you need it.",
        "Your feelings are important and valid.",
        "Every day is a new opportunity to learn something new.",
        "You belong here and you matter.",
        "Be proud of who you are!"
    ];

    // Activities that might be calming or engaging
    const activities = [
        {
            id: 1,
            title: "Deep Breathing",
            description: "Take 5 slow, deep breaths. Breathe in through your nose for 4 counts, hold for 2, then out through your mouth for 6 counts.",
            icon: "🫁",
            color: "bg-blue-100"
        },
        {
            id: 2,
            title: "5-4-3-2-1 Grounding",
            description: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
            icon: "👀",
            color: "bg-green-100"
        },
        {
            id: 3,
            title: "Positive Affirmation",
            description: "Say to yourself: 'I am capable. I am strong. I am learning. I am enough.'",
            icon: "💪",
            color: "bg-yellow-100"
        },
        {
            id: 4,
            title: "Stretch Break",
            description: "Stand up and stretch your arms up high, then down to your toes. Roll your shoulders and neck gently.",
            icon: "🧘",
            color: "bg-purple-100"
        }
    ];

    // Get random positive message
    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * positiveMessages.length);
        return positiveMessages[randomIndex];
    };

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    // Handle activity selection
    const handleActivitySelect = (activity) => {
        setSelectedActivity(activity);
    };

    // Close activity modal
    const closeActivityModal = () => {
        setSelectedActivity(null);
    };

    return (
        <div className="min-h-screen bg-blue-50 p-4">
            {/* Header */}
            <header className="mb-8 rounded-2xl bg-white p-6 shadow-md">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-600">
                            {getGreeting()}, {userName}!
                        </h1>
                        <p className="mt-2 text-xl text-gray-600">
                            Today is {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="btn btn-outline" onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Positive Message Card */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-6 shadow-md">
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <div className="mb-4 text-4xl">✨</div>
                        <h2 className="mb-4 text-2xl font-bold text-white">Bright Thought</h2>
                        <p className="text-xl text-white">{getRandomMessage()}</p>
                        <button
                            className="mt-6 rounded-full bg-white px-6 py-2 font-medium text-blue-600 shadow-md transition-transform hover:scale-105"
                            onClick={() => setCurrentTime(new Date())} // This will trigger a re-render with a new message
                        >
                            New Thought
                        </button>
                    </div>
                </div>

                {/* Weather and Time Card */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-2xl font-bold text-blue-600">Today's Schedule</h2>
                    <div className="flex flex-col gap-4">
                        <div className="rounded-lg bg-yellow-100 p-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🕒</span>
                                <div>
                                    <h3 className="font-bold text-gray-800">Current Time</h3>
                                    <p className="text-gray-600">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-green-100 p-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📅</span>
                                <div>
                                    <h3 className="font-bold text-gray-800">Today's Focus</h3>
                                    <p className="text-gray-600">Take things one step at a time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Section */}
            <section className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-blue-600">Helpful Activities</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {activities.map(activity => (
                        <div
                            key={activity.id}
                            className={`${activity.color} cursor-pointer rounded-xl p-4 shadow-md transition-transform hover:scale-105`}
                            onClick={() => handleActivitySelect(activity)}
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="mb-2 text-4xl">{activity.icon}</span>
                                <h3 className="mb-1 text-xl font-bold text-gray-800">{activity.title}</h3>
                                <p className="text-sm text-gray-600">Click to learn more</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Activity Modal */}
            {selectedActivity && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className={`${selectedActivity.color} w-full max-w-md rounded-xl p-6 shadow-xl`}>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedActivity.title}</h2>
                            <button
                                className="rounded-full bg-white p-2 text-gray-600 hover:bg-gray-100"
                                onClick={closeActivityModal}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mb-4 text-center text-6xl">{selectedActivity.icon}</div>
                        <p className="mb-6 text-lg text-gray-700">{selectedActivity.description}</p>
                        <div className="flex justify-center">
                            <button
                                className="btn btn-primary"
                                onClick={closeActivityModal}
                            >
                                I'll Try This
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;