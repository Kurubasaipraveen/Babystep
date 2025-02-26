Appointment Booking System
📌 Project Overview
The Appointment Booking System is a web-based application that allows patients to schedule appointments with doctors. Users can select doctors, choose available time slots, and manage their appointments efficiently.

 
🚀 Features
✅ View a list of available doctors
✅ Check available time slots for selected doctors
✅ Book appointments with details like patient name, appointment type, and notes
✅ Edit existing appointments
✅ Delete appointments if needed
✅ Fully responsive UI


🛠️ Tech Stack
Frontend: React.js (Hooks, Context API)
Backend: Node.js, Express.js
Database: MongoDB
API Calls: Axios for handling HTTP requests

🎯 How to Run the Project
1️⃣ Clone the Repository
git clone https://github.com/Kurubasaipraveen/Babystep
cd Babystep

Backend

cd backend
npm install


Frontend

cd frontend
npm install

🔗 API Endpoints
Method	Endpoint	Description
GET	/doctors	Fetch list of doctors
GET	/doctors/:id/slots?date=YY-MM-DD	Fetch available slots for a doctor on a given date
GET	/appointments	Get all booked appointments
POST	/appointments	Book a new appointment
PUT	/appointments/:id	Update an appointment
DELETE	/appointments/:id	Delete an appointment
