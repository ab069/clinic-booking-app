import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Register here
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-3">Demo Credentials:</p>
          <p className="text-xs text-blue-800 mb-1">
            <strong>Patient:</strong> patient@test.com / password123
          </p>
          <p className="text-xs text-blue-800 mb-1">
            <strong>Admin:</strong> admin@test.com / password123
          </p>
          <p className="text-xs text-blue-800 font-semibold mt-3 mb-1">Doctors (Password: 123456):</p>
          <p className="text-xs text-blue-800">Dr. Ayesha Fatima: ayesha@test.com</p>
          <p className="text-xs text-blue-800">Dr. Maryam Fatima: maryam@test.com</p>
          <p className="text-xs text-blue-800">Dr. Zulkifl Ahmad: zulkifl@test.com</p>
          <p className="text-xs text-blue-800">Dr. Muhammad Salman: salman@test.com</p>
          <p className="text-xs text-blue-800">Dr. Hassan Ahmed: hassan@test.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
