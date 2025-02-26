import { useEffect, useState } from "react";
import axios from "axios";

const useAppointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [patientName, setPatientName] = useState("");
    const [appointmentType, setAppointmentType] = useState("");
    const [notes, setNotes] = useState("");
    const [editingAppointment, setEditingAppointment] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/doctors")
            .then(response => setDoctors(response.data))
            .catch(error => console.error(error));

        fetchAppointments();
    }, []);

    const fetchSlots = () => {
        if (selectedDoctor && date) {
            axios.get(`http://localhost:5000/doctors/${selectedDoctor}/slots?date=${date}`)
                .then(response => setSlots(response.data))
                .catch(error => console.error(error));
        }
    };

    const fetchAppointments = () => {
        axios.get("http://localhost:5000/appointments")
            .then(response => setAppointments(response.data))
            .catch(error => console.error(error));
    };

    const resetForm = () => {
        setSelectedDoctor(null);
        setDate("");
        setSlots([]);
        setSelectedSlot(null);
        setPatientName("");
        setAppointmentType("");
        setNotes("");
        setEditingAppointment(null);
    };

    const bookAppointment = () => {
        const appointmentData = {
            doctorId: selectedDoctor,
            date: `${date}T${selectedSlot}:00.000Z`,
            duration: 30,
            appointmentType,
            patientName,
            notes
        };
    
        axios.post("http://localhost:5000/appointments", appointmentData)
            .then(() => {
                alert("Appointment booked successfully!");
                fetchAppointments();
                resetForm(); // Close the form after success
            })
            .catch(error => alert(error.response.data.message));
    };
    
    const updateAppointment = () => {
        if (!editingAppointment) return;
    
        const updatedData = {
            doctorId: selectedDoctor,
            date: `${date}T${selectedSlot}:00.000Z`,
            duration: 30,
            appointmentType,
            patientName,
            notes
        };
    
        axios.put(`http://localhost:5000/appointments/${editingAppointment._id}`, updatedData)
            .then(() => {
                alert("Appointment updated successfully!");
                fetchAppointments();
                resetForm(); // Close the form after success
            })
            .catch(error => alert(error.response.data.message));
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        setSelectedDoctor(appointment.doctorId);
        setDate(appointment.date.split("T")[0]);
        setSelectedSlot(appointment.date.split("T")[1].substring(0, 5));
        setPatientName(appointment.patientName);
        setAppointmentType(appointment.appointmentType);
        setNotes(appointment.notes);
    };

    const deleteAppointment = (appointmentId) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            axios.delete(`http://localhost:5000/appointments/${appointmentId}`)
                .then(() => {
                    alert("Appointment deleted successfully!");
                    fetchAppointments();
                })
                .catch(error => alert(error.response.data.message));
        }
    };

    return {
        doctors, selectedDoctor, setSelectedDoctor,
        date, setDate, fetchSlots, slots, selectedSlot, setSelectedSlot,
        patientName, setPatientName, appointmentType, setAppointmentType,
        notes, setNotes, bookAppointment, updateAppointment, editingAppointment,
        appointments, handleEdit, deleteAppointment
    };
};

export default useAppointments;
