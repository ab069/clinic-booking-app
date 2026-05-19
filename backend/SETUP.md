# Backend Setup Guide - JSON Database Version

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Installation Steps

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 4. Seed the Database

```bash
npm run seed
```

### 5. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📂 Database Structure

All data is stored as JSON files in `/database` folder:
- **users.json** - User accounts
- **doctors.json** - Doctor profiles  
- **appointments.json** - Appointments

## 🧪 Test Credentials

| Role   | Email           | Password     |
|--------|-----------------|--------------|
| Patient| patient@test.com| password123  |
| Doctor | doctor@test.com | password123  |
| Admin  | admin@test.com  | password123  |

## ⚠️ Key Differences from MongoDB

1. ✅ **No external database needed**
2. ✅ **No MongoDB installation required**
3. ✅ **Data stored in JSON files locally**
4. ✅ **Simple and perfect for semester presentations**
5. ✅ **Easy to backup and restore**

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
3. **Use environment variables for sensitive data**
4. **Validate all user inputs**
5. **Use HTTPS in production**

## Next Steps

1. Start the backend: `npm run dev`
2. Start the frontend: `cd ../frontend && npm run dev`
3. Open http://localhost:3000
4. Login with demo credentials

For detailed API documentation, see the main README.md
