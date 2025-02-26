import React from "react";

const DateSelection = ({ date, setDate, fetchSlots }) => {
    return (
        <div>
            <h2>Select a Date:</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={fetchSlots}>Check Availability</button>
        </div>
    );
};

export default DateSelection;
