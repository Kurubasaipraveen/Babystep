const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/babysteps";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Schemas
const doctorSchema = new mongoose.Schema({
  name: String,
  workingHours: {
    start: String,
    end: String,
  },
});

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  doctorName: String, // Add this field
  date: Date,
  duration: Number,
  appointmentType: String,
  patientName: String,
  notes: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

// Get all doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// Get available slots for a doctor
app.get("/doctors/:id/slots", async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) return res.status(400).json({ error: "Date is required" });

    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointments = await Appointment.find({
      doctorId: id,
      date: {
        $gte: moment(date, "YYYY-MM-DD").startOf("day").toDate(),
        $lt: moment(date, "YYYY-MM-DD").endOf("day").toDate(),
      },
    });

    let slots = [];
    let startTime = moment(`${date} ${doctor.workingHours.start}`, "YYYY-MM-DD HH:mm");
    let endTime = moment(`${date} ${doctor.workingHours.end}`, "YYYY-MM-DD HH:mm");

    while (startTime.isBefore(endTime)) {
      let slotAvailable = !appointments.some((appt) =>
        moment(appt.date).isSame(startTime, "minute")
      );

      if (slotAvailable) slots.push(startTime.format("HH:mm"));
      startTime.add(30, "minutes");
    }

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});

// Create an appointment
app.post("/appointments", async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

    if (!doctorId || !date || !duration || !patientName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const appointmentDate = new Date(date);

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const newAppointment = new Appointment({
      doctorId,
      date: appointmentDate,
      duration,
      appointmentType,
      patientName,
      notes
  });
  
  await newAppointment.save();
  

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", newAppointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// Get all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Edit an appointment
app.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, duration, appointmentType, notes } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: { date, duration, appointmentType, notes } },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment updated successfully", updatedAppointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Delete an appointment
app.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
