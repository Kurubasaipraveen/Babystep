import React from "react";

const AppointmentForm = ({
    patientName,
    setPatientName,
    appointmentType,
    setAppointmentType,
    notes,
    setNotes,
    selectedSlot,
    bookAppointment,
    updateAppointment,
    editingAppointment
}) => {
    return (
        <div>
            <h2>{editingAppointment ? "Edit Appointment" : "Book Appointment"}</h2>
            <input type="text" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            <input type="text" placeholder="Appointment Type" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} />
            <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            {editingAppointment ? (
                <button onClick={updateAppointment}>Update Appointment</button>
            ) : (
                <button onClick={bookAppointment}>Confirm Booking</button>
            )}
        </div>
    );
};

export default AppointmentForm;
