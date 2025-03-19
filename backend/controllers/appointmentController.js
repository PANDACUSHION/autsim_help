const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { title, date_time, user_id } = req.body;
    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                title,
                date_time: new Date(date_time),
                user_id: parseInt(user_id),
            },
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await prisma.appointment.findMany();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { title, date_time, status } = req.body;
    try {
        const updatedAppointment = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                title,
                date_time: new Date(date_time),
                status,
            },
        });
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.appointment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
