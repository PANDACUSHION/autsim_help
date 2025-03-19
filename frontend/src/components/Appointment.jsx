import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateAppointment = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!user) {
            setError('User not authenticated. Please log in.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/create/appointment', {
                title,
                date_time: dateTime,
                user_id: user.id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage('Appointment created successfully!');
            setTitle('');
            setDateTime('');
        } catch (err) {
            setError('Failed to create appointment. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Create Appointment</h2>
            {message && <p className="text-green-600 text-center mb-4">{message}</p>}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title:</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date & Time:</label>
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Create Appointment
                </button>
            </form>
        </div>
    );
};

export default CreateAppointment;
