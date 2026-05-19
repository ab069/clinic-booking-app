# Frontend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components (routes)
├── services/       # API service calls
├── context/        # Context API for state
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Key Technologies

- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

## Environment Setup

The frontend is configured to proxy API calls to the backend:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

Proxy is configured in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

## Component Architecture

### Pages
- **Home** - Landing page with hero, services, doctors, testimonials
- **Login** - User login form
- **Register** - User registration form
- **DoctorsList** - Browse and filter doctors
- **DoctorDetail** - Doctor profile and booking form
- **PatientDashboard** - Patient's appointments
- **DoctorDashboard** - Doctor's appointments
- **AdminDashboard** - Admin panel
- **About** - About the clinic
- **Contact** - Contact form

### Components
- **Navbar** - Navigation bar with auth logic
- **Footer** - Footer with links and social
- **DoctorCard** - Reusable doctor card component
- **ProtectedRoute** - Route guard for authenticated users
- **LoadingSpinner** - Loading animation

### Services
- **api.js** - Centralized API client with Axios
  - authAPI - Authentication endpoints
  - doctorAPI - Doctor operations
  - appointmentAPI - Appointment operations

### Context
- **AuthContext** - Manages authentication state
  - user, token, isAuthenticated
  - login, register, logout
  - fetchUser on app load

### Hooks
- **useAuth** - Custom hook for auth context

### Styling
- **Tailwind CSS** - Utility classes
- **Custom CSS** - Global styles in index.css
- **Framer Motion** - Animations

## Authentication Flow

1. User registers/logs in
2. Token stored in localStorage
3. Token added to all API request headers
4. Token verified by backend
5. Routes check token for access
6. Logout clears token and resets auth state

## Routing

```
/                    - Home page
/login              - Login page
/register           - Register page
/doctors            - Doctors list
/doctors/:id        - Doctor detail & booking
/about              - About page
/contact            - Contact page
/patient/dashboard  - Patient dashboard (protected)
/doctor/dashboard   - Doctor dashboard (protected)
/admin/dashboard    - Admin dashboard (protected)
```

## API Integration

Example API call from component:

```javascript
import { doctorAPI } from '../services/api';

const MyComponent = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorAPI.getAllDoctors();
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    // JSX here
  );
};
```

## Styling with Tailwind

### Common Utility Classes
```html
<!-- Spacing -->
<div class="p-4 m-6 mb-8"></div>

<!-- Colors -->
<div class="bg-primary text-white"></div>
<div class="bg-gray-100 text-gray-600"></div>

<!-- Typography -->
<h1 class="text-4xl font-bold"></h1>
<p class="text-sm text-gray-600"></p>

<!-- Layout -->
<div class="flex items-center justify-between"></div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>

<!-- Responsive -->
<div class="hidden md:block"></div>
<div class="text-sm md:text-lg"></div>
```

## Custom Configuration

### Tailwind Config (`tailwind.config.js`)
```javascript
theme: {
  extend: {
    colors: {
      primary: '#0066cc',    // Blue
      secondary: '#00d4ff',  // Cyan
      dark: '#0f172a',       // Dark blue
    }
  }
}
```

## Common Issues

### API Not Working
1. Ensure backend is running on `http://localhost:5000`
2. Check browser console for CORS errors
3. Verify `vite.config.js` proxy settings

### Styling Not Applied
1. Clear browser cache (Ctrl+Shift+Delete)
2. Rebuild with `npm run build`
3. Check Tailwind config is correct

### Routing Issues
1. Ensure `<BrowserRouter>` wraps all routes
2. Check route paths match exactly
3. Verify components are imported correctly

### Authentication Not Working
1. Check localStorage for token
2. Verify JWT token is valid
3. Check Authorization header is being sent
4. Ensure backend accepts the token

## Development Tips

1. **React DevTools** - Install browser extension for debugging
2. **Component Props** - Use PropTypes or TypeScript
3. **State Management** - Keep state close to where it's used
4. **Performance** - Use React.memo for expensive components
5. **Accessibility** - Use semantic HTML and ARIA labels

## Building & Deployment

### Local Build Test
```bash
npm run build
npm run preview
```

### Production Build
```bash
npm run build
# Outputs to dist/ folder
```

## Troubleshooting

### Blank Page on Localhost
- Check browser console for errors
- Ensure `<div id="root"></div>` exists in index.html
- Verify main.jsx is correctly imported

### Slow Performance
- Use React DevTools to find slow renders
- Implement code splitting with lazy loading
- Optimize images with proper formats
- Remove unused dependencies

## Next Steps

1. Start frontend: `npm run dev`
2. Start backend: `cd ../backend && npm run dev`
3. Open http://localhost:3000
4. Test with demo credentials

For API documentation, see the main README.md
