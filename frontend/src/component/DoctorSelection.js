import React from "react";

const DoctorSelection = ({ doctors, selectedDoctor, setSelectedDoctor }) => {
    return (
        <div>
            <h2>Select a Doctor:</h2>
            <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor || ""}>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DoctorSelection;
