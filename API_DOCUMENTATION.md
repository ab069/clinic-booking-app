# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "user": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔐 Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "patient",
  "gender": "male",
  "age": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "1234567890"
  }
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "1234567890"
  }
}
```

### Get Current User
```
GET /auth/me
```
**Authentication:** Required ✅

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "1234567890",
    "gender": "male",
    "age": 30,
    "createdAt": "2024-05-15T10:30:00.000Z",
    "updatedAt": "2024-05-15T10:30:00.000Z"
  }
}
```

### Update Profile
```
PUT /auth/profile
```
**Authentication:** Required ✅

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "9876543210",
  "gender": "male",
  "age": 31,
  "profileImage": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## 👨‍⚕️ Doctor Endpoints

### Get All Doctors
```
GET /doctors?specialization=Cardiology&sortBy=rating
```

**Query Parameters:**
- `specialization` (optional) - Filter by specialization
- `sortBy` (optional) - Sort by: rating, experience, fees

**Response:**
```json
{
  "success": true,
  "count": 3,
  "doctors": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Dr. Sarah Johnson",
        "email": "doctor@test.com",
        "phone": "9876543211",
        "profileImage": "https://..."
      },
      "specialization": "Cardiology",
      "experience": 15,
      "fees": 800,
      "bio": "Experienced cardiologist...",
      "availableDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "availableTimeSlots": [
        {
          "startTime": "09:00",
          "endTime": "12:00"
        },
        {
          "startTime": "14:00",
          "endTime": "17:00"
        }
      ],
      "rating": 4.8,
      "totalRatings": 120,
      "isActive": true
    }
  ]
}
```

### Get Doctor by ID
```
GET /doctors/:id
```

**Response:** Same as single doctor from above

### Get Doctors by Specialization
```
GET /doctors/specialization/:specialization
```

**Example:**
```
GET /doctors/specialization/Cardiology
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "doctors": [ ... ]
}
```

### Create Doctor (Admin Only)
```
POST /doctors
```
**Authentication:** Required (Admin) ✅

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "specialization": "Cardiology",
  "experience": 15,
  "fees": 800,
  "bio": "Experienced cardiologist with 15 years of practice",
  "availableDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "availableTimeSlots": [
    {
      "startTime": "09:00",
      "endTime": "12:00"
    },
    {
      "startTime": "14:00",
      "endTime": "17:00"
    }
  ],
  "qualifications": [
    {
      "degree": "MBBS",
      "institute": "Medical University",
      "year": 2008
    },
    {
      "degree": "MD Cardiology",
      "institute": "State Medical College",
      "year": 2010
    }
  ]
}
```

### Update Doctor (Doctor/Admin)
```
PUT /doctors/:id
```
**Authentication:** Required ✅

**Request Body:** (Same as create, all fields optional)

### Delete Doctor (Admin Only)
```
DELETE /doctors/:id
```
**Authentication:** Required (Admin) ✅

---

## 📅 Appointment Endpoints

### Book Appointment (Patient Only)
```
POST /appointments
```
**Authentication:** Required (Patient) ✅

**Request Body:**
```json
{
  "doctorId": "507f1f77bcf86cd799439012",
  "appointmentDate": "2024-05-20",
  "appointmentTime": "10:00",
  "symptoms": "Chest pain and shortness of breath",
  "notes": "Had similar symptoms last month"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "507f1f77bcf86cd799439013",
    "patientId": "507f1f77bcf86cd799439010",
    "doctorId": "507f1f77bcf86cd799439012",
    "appointmentDate": "2024-05-20T00:00:00.000Z",
    "appointmentTime": "10:00",
    "status": "pending",
    "symptoms": "Chest pain and shortness of breath",
    "notes": "Had similar symptoms last month",
    "createdAt": "2024-05-15T10:30:00.000Z"
  }
}
```

### Get All Appointments
```
GET /appointments?status=pending&doctorId=507f1f77bcf86cd799439012
```

**Query Parameters:**
- `status` (optional) - Filter: pending, confirmed, completed, cancelled
- `doctorId` (optional) - Filter by doctor
- `patientId` (optional) - Filter by patient

**Response:**
```json
{
  "success": true,
  "count": 5,
  "appointments": [ ... ]
}
```

### Get Appointment by ID
```
GET /appointments/:id
```

### Get Patient's Appointments
```
GET /appointments/patient/my-appointments
```
**Authentication:** Required (Patient) ✅

**Response:**
```json
{
  "success": true,
  "count": 2,
  "appointments": [ ... ]
}
```

### Get Doctor's Appointments
```
GET /appointments/doctor/:doctorId
```
**Authentication:** Required (Doctor/Admin) ✅

### Update Appointment (Doctor/Admin)
```
PUT /appointments/:id
```
**Authentication:** Required ✅

**Request Body:**
```json
{
  "status": "confirmed",
  "doctorNotes": "Patient needs to reduce salt intake",
  "prescription": "Medicine X - 1 tablet daily after breakfast"
}
```

### Cancel Appointment
```
PATCH /appointments/:id/cancel
```
**Authentication:** Required ✅

**Request Body:**
```json
{
  "cancellationReason": "Unable to attend due to work emergency"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (login required) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## Common Errors

### Invalid Credentials
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Token Expired
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Please provide all required fields",
    "Email already registered"
  ]
}
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "password123"
  }'
```

### Get All Doctors
```bash
curl http://localhost:5000/api/doctors
```

### Get Doctors (with token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/doctors
```

### Book Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "doctorId": "507f1f77bcf86cd799439012",
    "appointmentDate": "2024-05-20",
    "appointmentTime": "10:00",
    "symptoms": "Regular checkup"
  }'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider adding:
- Request rate limiting
- IP-based throttling
- User-based quotas

---

## CORS Configuration

Frontend (`http://localhost:3000`) is allowed to make requests to the backend.

To allow other origins, update `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));
```

---

For more information, see the main [README.md](./README.md)
