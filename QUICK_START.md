# 🚀 Quick Start - 5 Minute Setup

## Prerequisites
- Node.js installed
- MongoDB running (or Atlas)

## Start Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

✅ Backend runs on http://localhost:5000

## Start Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs on http://localhost:3000

## Login & Test

**Demo Credentials:**
- Email: `patient@test.com`
- Password: `password123`

Try:
1. Login as patient
2. Go to Doctors
3. View doctor details
4. Book an appointment
5. Check dashboard

Done! 🎉

## Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB error | `brew services start mongodb-community` |
| Port 5000 used | Change PORT in backend/.env |
| Port 3000 used | Change port in frontend/vite.config.js |
| White page | Clear cache (Ctrl+Shift+Delete) |
| API fails | Ensure backend is running |

## File Locations

- **Backend Start**: `backend/server.js`
- **Frontend Start**: `frontend/src/main.jsx`
- **Config**: `backend/.env`
- **Styles**: `frontend/src/index.css`
- **Docs**: `README.md`

## Available Commands

```bash
# Backend
npm run dev      # Dev server
npm start        # Production
npm run seed     # Seed database

# Frontend
npm run dev      # Dev server
npm run build    # Build for production
npm run preview  # Preview build
```

## Next Steps

1. Read [README.md](./README.md) for full documentation
2. See [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) for detailed setup
3. Check [backend/SETUP.md](./backend/SETUP.md) for backend details
4. Check [frontend/SETUP.md](./frontend/SETUP.md) for frontend details

Happy coding! 💻
