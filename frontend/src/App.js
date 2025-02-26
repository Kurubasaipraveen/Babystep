import React from "react";
import Appointments from "./component/Appointments";
import DoctorSelection from "./component/DoctorSelection";
import DateSelection from "./component/DateSelection";
import SlotSelection from "./component/SlotSelection";
import AppointmentForm from "./component/AppointmentForm";
import AppointmentList from "./component/AppointmentList";
import './App.css'
const App = () => {
    const {
        doctors, selectedDoctor, setSelectedDoctor, date, setDate, fetchSlots, slots, selectedSlot, setSelectedSlot,
        patientName, setPatientName, appointmentType, setAppointmentType, notes, setNotes,
        bookAppointment, updateAppointment, editingAppointment, appointments, handleEdit, deleteAppointment
    } = Appointments();

    return (
        <div>
            <h1>Appointment Booking</h1>
            <DoctorSelection doctors={doctors} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />
            {selectedDoctor && <DateSelection date={date} setDate={setDate} fetchSlots={fetchSlots} />}
            {slots.length > 0 && <SlotSelection slots={slots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />}
            {selectedSlot && <AppointmentForm {...{ patientName, setPatientName, appointmentType, setAppointmentType, notes, setNotes, bookAppointment, updateAppointment, editingAppointment }} />}
            <AppointmentList appointments={appointments} handleEdit={handleEdit} deleteAppointment={deleteAppointment} />
        </div>
    );
};

export default App;
