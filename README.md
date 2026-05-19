# MediCare - Clinic Appointment Booking System

A modern, full-stack clinic appointment booking platform built with MERN Stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access
- **Patient Features**:
  - Browse and search doctors by specialization
  - Book appointments with preferred doctors
  - View and manage personal appointments
  - Cancel appointments with reason

- **Doctor Features**:
  - View upcoming appointments
  - Confirm or reject appointment requests
  - Add notes and prescriptions
  - Manage availability schedule

- **Admin Features**:
  - Manage doctors (add, edit, delete)
  - Manage appointments and patients
  - View system analytics
  - Dashboard with statistics

- **UI/UX**:
  - Modern, responsive design with Tailwind CSS
  - Smooth animations with Framer Motion
  - Toast notifications for user feedback
  - Professional medical theme
  - Mobile-friendly interface

## 📋 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Recharts** - Charts

## 📦 Prerequisites

- Node.js (v14+)
- MongoDB (running locally or Atlas)
- npm or yarn

## 🔧 Installation & Setup

### 1. MongoDB Setup

Make sure MongoDB is running on your system:

```bash
# If using Homebrew on macOS
brew services start mongodb-community

# Check if MongoDB is running
mongosh  # MongoDB shell

# Or use MongoDB Atlas (cloud)
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (already created, update if needed)
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/clinicDB
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024

# Seed sample data (creates demo users and doctors)
npm run seed

# Start backend server
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
# Frontend runs on http://localhost:3000
```

## 👥 Demo Credentials

After seeding the database, use these credentials:

**Patient:**
- Email: `patient@test.com`
- Password: `password123`

**Doctor:**
- Email: `doctor@test.com`
- Password: `password123`

**Admin:**
- Email: `admin@test.com`
- Password: `password123`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── doctorController.js   # Doctor operations
│   └── appointmentController.js
├── models/
│   ├── User.js               # User schema
│   ├── Doctor.js             # Doctor schema
│   └── Appointment.js        # Appointment schema
├── routes/
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   └── appointmentRoutes.js
├── middleware/
│   ├── auth.js               # JWT & role-based auth
│   └── errorHandler.js       # Error handling
├── utils/
│   ├── asyncHandler.js       # Async error wrapper
│   └── generateToken.js      # JWT token generation
├── server.js                 # Main server file
├── seed.js                   # Database seeding
├── package.json
└── .env

frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── DoctorCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── DoctorsList.jsx
│   │   ├── DoctorDetail.jsx
│   │   ├── PatientDashboard.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── api.js            # Axios API calls
│   ├── context/
│   │   └── AuthContext.jsx   # Auth state management
│   ├── hooks/
│   │   └── useAuth.js        # Custom auth hook
│   ├── utils/
│   │   └── helpers.js        # Utility functions
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/specialization/:spec` - Get by specialization
- `POST /api/doctors` - Create doctor (admin only)
- `PUT /api/doctors/:id` - Update doctor (admin/doctor)
- `DELETE /api/doctors/:id` - Delete doctor (admin only)

### Appointments
- `POST /api/appointments` - Book appointment (patient)
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/patient/my-appointments` - Patient's appointments
- `GET /api/appointments/doctor/:doctorId` - Doctor's appointments
- `PUT /api/appointments/:id` - Update appointment (doctor/admin)
- `PATCH /api/appointments/:id/cancel` - Cancel appointment

## 🎨 Key Features Implementation

### Authentication & Authorization
- JWT-based token authentication
- Role-based access control (RBAC)
- Protected routes on frontend and backend
- Secure password hashing with bcryptjs

### Appointment Booking
- Date and time selection
- Doctor availability checking
- Conflict prevention (no double bookings)
- Status management (pending, confirmed, completed, cancelled)

### User Roles
1. **Patient**: Can book, view, and cancel appointments
2. **Doctor**: Can view, confirm, reject, and add notes to appointments
3. **Admin**: Full system access, can manage doctors and appointments

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Mobile navigation with hamburger menu
- Adaptive layouts for all screen sizes

## 🚀 Running the Application

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Then open your browser and go to `http://localhost:3000`

## 📝 Important Notes

1. **MongoDB Connection**: Ensure MongoDB is running before starting the backend
2. **JWT Secret**: Change the JWT_SECRET in .env for production
3. **CORS**: Backend accepts requests from localhost:3000 by default
4. **Demo Data**: Run `npm run seed` in backend to populate sample data

## 🔐 Security Considerations

- Passwords are hashed using bcryptjs (salt rounds: 10)
- JWT tokens expire in 7 days
- Protected routes require valid JWT tokens
- Role-based authorization on all sensitive endpoints
- Input validation on frontend and backend
- Error messages don't expose sensitive information

## 📊 Database Models

### User
- name, email, password (hashed)
- role (patient/doctor/admin)
- phone, gender, age
- profileImage, isActive
- timestamps

### Doctor
- userId (reference to User)
- specialization, experience, fees
- bio, qualifications
- availableDays, availableTimeSlots
- rating, totalRatings
- timestamps

### Appointment
- patientId, doctorId (references)
- appointmentDate, appointmentTime
- status (pending/confirmed/completed/cancelled)
- symptoms, notes, doctorNotes
- prescription, cancellationReason
- timestamps

## 🛠️ Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Use MongoDB Compass to inspect database
- Test API endpoints with Postman
- Check network tab for API calls

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 🤝 Support

For issues or questions:
1. Check the console for error messages
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check API endpoints in Postman

## 📄 License

This project is open source and available under the ISC License.

---

**Built with ❤️ for modern healthcare solutions**
