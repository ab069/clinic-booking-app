# 🏥 MediCare - Complete Installation Guide

## Step-by-Step Setup Instructions

### Prerequisites Check
- [ ] Node.js installed (v14+) - Check: `node --version`
- [ ] npm installed - Check: `npm --version`
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] VS Code or any code editor

## 1️⃣ Install MongoDB

### Option A: Local MongoDB (Recommended for Development)

**macOS (Homebrew):**
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongosh
# You should see: "test> "
# Type: exit
```

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Run as a Service"
4. MongoDB should auto-start

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Verify MongoDB:**
```bash
mongosh
# You should see the MongoDB shell prompt (test>)
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clinicDB
   ```

## 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install all dependencies
npm install

# Verify .env file exists with these values:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/clinicDB
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected: localhost
Server running on port 5000
✅ Database seeded successfully!
Demo Credentials:
Patient: patient@test.com / password123
Doctor: doctor@test.com / password123
Admin: admin@test.com / password123
```

**Keep this terminal open and running!**

## 3️⃣ Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# Start the development server
npm run dev
```

**Expected output:**
```
Local:   http://localhost:3000
```

## 4️⃣ Access the Application

1. **Open your browser** and go to: http://localhost:3000
2. You should see the **MediCare homepage**

### Test Login Credentials

Try logging in with these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Patient | patient@test.com | password123 |
| Doctor | doctor@test.com | password123 |
| Admin | admin@test.com | password123 |

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Homepage loads with featured doctors
- [ ] Can click "View All Doctors" on homepage
- [ ] Can see doctor list with filtering
- [ ] Can click on a doctor to see details
- [ ] Login page works with demo credentials
- [ ] Patient dashboard shows appointments
- [ ] Can navigate between pages
- [ ] Footer and navbar display correctly
- [ ] Mobile responsive (test with browser DevTools)

## 🐛 Troubleshooting

### Issue: "MongoDB connection refused"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Check if running
brew services list  # Look for "mongodb-community started"

# Or start manually
mongod
```

### Issue: "Port 5000 already in use"
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port 5000 (macOS/Linux)
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "Cannot GET /api/doctors"
**Solution:**
1. Ensure backend is running (`npm run dev` in backend terminal)
2. Ensure backend is on http://localhost:5000
3. Check browser console for CORS errors
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue: White blank page
**Solution:**
1. Check browser console (F12) for JavaScript errors
2. Ensure MongoDB is running
3. Ensure backend is running
4. Clear cache and refresh

### Issue: "Module not found" or package errors
**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install

# Clear npm cache
npm cache clean --force
npm install
```

## 📁 File Structure After Setup

```
Clinic Booking App/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   ├── .env
│   └── SETUP.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── SETUP.md
├── README.md (Main documentation)
└── INSTALLATION_GUIDE.md (This file)
```

## 🎯 Common Development Tasks

### View Database
```bash
# Use MongoDB shell
mongosh

# Show databases
show dbs

# Switch to clinic database
use clinicDB

# Show collections
show collections

# View users
db.users.find()

# View doctors
db.doctors.find()

# View appointments
db.appointments.find()
```

### Create Test Data Manually
```bash
mongosh

use clinicDB

# Insert a test user
db.users.insertOne({
  name: "Test Patient",
  email: "test@example.com",
  password: "hashedpassword",
  role: "patient",
  phone: "1234567890",
  age: 30,
  gender: "male"
})
```

### Reset Database
```bash
# In backend terminal, stop the server (Ctrl+C)
# Then run:
npm run seed

# This clears all data and recreates sample data
```

### Update Styling
Edit files in `frontend/src/` and save:
- Changes are hot-reloaded automatically
- Tailwind CSS changes apply instantly
- No need to restart server

### Test API Endpoints
```bash
# Use curl or Postman

# Get all doctors
curl http://localhost:5000/api/doctors

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@test.com","password":"password123"}'

# Get doctors with auth header (copy token from login response)
curl http://localhost:5000/api/doctors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔒 Security Notes

1. **Change JWT Secret Before Production**
   - Edit `backend/.env`
   - `JWT_SECRET=choose_a_long_random_string_here`

2. **Environment Variables**
   - Never commit `.env` to git
   - Already in `.gitignore`

3. **Passwords**
   - Demo passwords are for testing only
   - In production, use strong passwords
   - Always use HTTPS

## 📚 Next Steps After Setup

1. **Explore the Application**
   - Login as patient and book appointment
   - Login as doctor and confirm appointment
   - Login as admin to manage doctors

2. **Customize the Application**
   - Change clinic name (Navbar, Footer)
   - Update colors in `frontend/tailwind.config.js`
   - Add more specializations
   - Add more features

3. **Learn the Codebase**
   - Review [main README.md](./README.md) for architecture
   - Check backend [SETUP.md](./backend/SETUP.md) for backend details
   - Check frontend [SETUP.md](./frontend/SETUP.md) for frontend details

4. **Deploy the Application**
   - Backend: Render, Railway, or Heroku
   - Frontend: Vercel, Netlify, or AWS S3
   - Database: MongoDB Atlas

## 💡 Tips & Tricks

### Useful Extensions for VS Code
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)
- Prettier (Code formatter)

### Hot Reload
- **Frontend**: Changes save automatically (Vite HMR)
- **Backend**: Changes reload with nodemon

### Browser DevTools
- Open with F12
- Console tab shows errors
- Network tab shows API calls
- Application tab shows localStorage

### Debug Mode
Add `console.log()` statements in code to debug:
```javascript
// Frontend
console.log('User:', user);
console.log('Data:', response.data);

// Backend - see in terminal
console.log('Request body:', req.body);
```

## ✨ Project Features

### For Patients
- ✅ Register and login
- ✅ Browse doctors
- ✅ Filter by specialization
- ✅ Book appointments
- ✅ View my appointments
- ✅ Cancel appointments

### For Doctors
- ✅ Doctor dashboard
- ✅ View patient appointments
- ✅ Confirm/reject appointments
- ✅ Add notes to appointments

### For Admin
- ✅ Admin dashboard
- ✅ View statistics
- ✅ Manage doctors
- ✅ Manage appointments

### Technical Features
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Modern animations
- ✅ Toast notifications
- ✅ Error handling
- ✅ Protected routes

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 📞 Support

If you encounter issues:

1. **Check the error message** - Read it carefully
2. **Check console (F12)** - Look for JavaScript errors
3. **Check terminal** - Look for backend errors
4. **Restart services** - Sometimes helps
5. **Clear cache** - Ctrl+Shift+Delete in browser
6. **Reinstall dependencies** - `npm install`

## 🎉 You're All Set!

You now have a fully functional MERN clinic appointment booking system!

**Have fun building! 🚀**

---

For more information, see:
- [README.md](./README.md) - Main project documentation
- [backend/SETUP.md](./backend/SETUP.md) - Backend specific setup
- [frontend/SETUP.md](./frontend/SETUP.md) - Frontend specific setup
