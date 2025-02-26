import React from "react";

const SlotSelection = ({ slots, selectedSlot, setSelectedSlot }) => {
    return (
        <div>
            <h2>Available Slots:</h2>
            {slots.map((slot, index) => (
                <button key={index} onClick={() => setSelectedSlot(slot)} className={selectedSlot === slot ? "selected" : ""}>
                    {slot}
                </button>
            ))}
        </div>
    );
};

export default SlotSelection;
