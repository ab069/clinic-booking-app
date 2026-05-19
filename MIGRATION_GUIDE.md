# MongoDB to JSON Migration Guide

## 🔄 What Changed

This application has been migrated from MongoDB to a **JSON file-based database system** for easier setup and semester presentation purposes.

## 📋 Changes Summary

### Backend Controllers
All three controllers have been updated to use JSON file operations:

1. **authController.js**
   - Uses `bcryptjs` for password hashing
   - Uses `db.js` utilities: `findByEmail()`, `addData()`, `updateById()`, `findById()`
   - Functions: `register()`, `login()`, `getMe()`, `updateProfile()`

2. **doctorController.js**
   - Uses `readData()` for filtering and sorting
   - Supports sorting by rating, fees, and experience
   - Functions: `getAllDoctors()`, `getDoctorById()`, `createDoctor()`, `updateDoctor()`, `deleteDoctor()`, `getDoctorsBySpecialization()`

3. **appointmentController.js**
   - Implements conflict detection by filtering appointments array
   - Validates doctor existence before booking
   - Functions: `createAppointment()`, `getAppointments()`, `getAppointmentById()`, `updateAppointment()`, `cancelAppointment()`, `getPatientAppointments()`, `getDoctorAppointments()`, `deleteAppointment()`

### Database Utilities
New file: `backend/utils/db.js` with 8 helper functions:

```javascript
readData(filename)          // Read JSON file → parse → return array
writeData(filename, data)   // Write array to JSON file
getNextId(filename)         // Get next available ID
findById(filename, id)      // Find record by ID
findByEmail(filename, email)// Find user by email
deleteById(filename, id)    // Delete record by ID
updateById(filename, id, updates) // Update record with new fields
addData(filename, newItem)  // Add new record with auto ID
```

### Data Storage
Three JSON files in `backend/database/`:
- **users.json** - User accounts (id, name, email, password, role, phone, gender, age, profileImage, createdAt)
- **doctors.json** - Doctor profiles (id, name, specialization, experience, fees, bio, availableDays, availableTime, rating, totalRatings, image, createdAt)
- **appointments.json** - Appointments (id, patientId, doctorId, doctorName, date, time, status, symptoms, notes, doctorNotes, createdAt)

### Configuration Changes
- **.env** - Removed `MONGO_URI`, kept only `PORT`, `JWT_SECRET`, `NODE_ENV`
- **server.js** - Removed MongoDB import and `connectDB()` call
- **package.json** - Removed `mongoose` and `validator` dependencies

### Routes
No changes to API endpoints - all routes remain the same:
- `/api/auth/*` - Authentication
- `/api/doctors/*` - Doctor management
- `/api/appointments/*` - Appointment booking

### Frontend
No changes needed - frontend works seamlessly with updated backend

## 🚀 Setup Instructions

### For Development

```bash
cd backend
npm install
npm run seed
npm run dev
```

### For Production Testing

```bash
npm install
npm run seed
npm start
```

## ✅ Testing the Migration

### Verify Server
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "password123"
  }'
```

### Get Doctors
```bash
curl http://localhost:5000/api/doctors
```

## 📊 Before vs After

| Aspect | Before (MongoDB) | After (JSON) |
|--------|------------------|--------------|
| Database | Requires MongoDB setup | No setup needed |
| Installation | Complex (MongoDB + npm) | Simple (npm only) |
| Persistence | Requires running server | Files on disk |
| Backup | Complex (database dump) | Simple (copy JSON files) |
| Development | Requires external DB | Fully self-contained |
| Deployment | Requires DB service | Single app deployment |

## 🔒 Security Notes

1. **Local Development**: JSON files are stored locally - fine for development
2. **Production Note**: For production, consider migrating to a real database
3. **Password Security**: All passwords are hashed with bcryptjs
4. **JWT Tokens**: 7-day expiration time

## 📂 File Structure

```
backend/
├── controllers/
│   ├── authController.js (UPDATED)
│   ├── doctorController.js (UPDATED)
│   └── appointmentController.js (UPDATED)
├── database/
│   ├── users.json (NEW)
│   ├── doctors.json (NEW)
│   └── appointments.json (NEW)
├── middleware/
│   ├── auth.js (unchanged)
│   └── errorHandler.js (unchanged)
├── routes/
│   ├── authRoutes.js (unchanged)
│   ├── doctorRoutes.js (unchanged)
│   └── appointmentRoutes.js (UPDATED - added delete route)
├── utils/
│   ├── db.js (NEW - database utilities)
│   ├── asyncHandler.js (unchanged)
│   └── generateToken.js (unchanged)
├── .env (UPDATED - removed MONGO_URI)
├── server.js (UPDATED - removed MongoDB)
├── seed.js (UPDATED - JSON-based)
└── package.json (UPDATED - removed mongoose)
```

## 🐛 Troubleshooting

### Issue: "database folder not found"
**Solution**: Run `npm run seed` first

### Issue: "ENOENT: no such file or directory"
**Solution**: Check that `/database` folder exists with JSON files

### Issue: "Cannot read property 'id' of undefined"
**Solution**: Ensure JSON files have valid data - run `npm run seed` again

### Issue: Port 5000 already in use
**Solution**: Change `PORT` in `.env` file

## 🔄 Migration Checklist

- ✅ Removed MongoDB imports from all files
- ✅ Created `db.js` utility functions
- ✅ Updated all controllers to use `db.js`
- ✅ Created JSON data files
- ✅ Updated `server.js` to remove MongoDB connection
- ✅ Updated `.env` file
- ✅ Updated `package.json` dependencies
- ✅ Updated `seed.js` for JSON system
- ✅ Updated routes (fixed appointment route ordering)
- ✅ Updated documentation
- ✅ Verified API endpoints work

## 📝 Notes for Semester Presentation

This JSON-based system is perfect for:
- ✅ Quick setup - no database installation needed
- ✅ Easy demonstration - data visible in JSON files
- ✅ Portable - entire app runs without external dependencies
- ✅ Reliable - no network/connection issues
- ✅ Editable - can manually modify data for testing

## 🔗 Related Files

- [Backend Setup Guide](./SETUP.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Frontend Setup Guide](../frontend/SETUP.md)
- [Main README](../README.md)
