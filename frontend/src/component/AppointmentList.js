import React from "react";

const AppointmentList = ({ appointments, handleEdit, deleteAppointment }) => {
    return (
        <div>
            <h2>Upcoming Appointments</h2>
            <ul>
                {appointments.map((appt) => (
                    <li key={appt._id}>
                        <h4>Doctor: {appt.doctorName}</h4>
                        <span>{appt.patientName} - {new Date(appt.date).toLocaleString()} - {appt.appointmentType}</span>
                        <button onClick={() => handleEdit(appt)}>Edit</button>
                        <button onClick={() => deleteAppointment(appt._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
