import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/get/appointments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to fetch appointments.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/delete/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        } catch (err) {
            setError('Failed to delete appointment.');
            console.error(err);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/update/appointment/${id}/status`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setAppointments(
                appointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status } : appointment
                )
            );
        } catch (err) {
            setError('Failed to update status.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Admin Appointments</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Date & Time</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td className="border p-2">{appointment.title}</td>
                        <td className="border p-2">{new Date(appointment.date_time).toLocaleString()}</td>
                        <td className="border p-2">
                            <select
                                value={appointment.status}
                                onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                className="p-1 border rounded"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </td>
                        <td className="border p-2 text-center">
                            <button
                                onClick={() => handleDelete(appointment.id)}
                                className="bg-red-600 text-white p-1 rounded hover:bg-red-700">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAppointment;