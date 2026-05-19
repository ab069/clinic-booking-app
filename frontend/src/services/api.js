import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Doctor endpoints
export const doctorAPI = {
  getAllDoctors: (params) => api.get('/doctors', { params }),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
  getDoctorsBySpecialization: (spec) => api.get(`/doctors/specialization/${spec}`),
  createDoctor: (data) => api.post('/doctors', data),
  updateDoctor: (id, data) => api.put(`/doctors/${id}`, data),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
};

// Appointment endpoints
export const appointmentAPI = {
  createAppointment: (data) => api.post('/appointments', data),
  getAppointments: (params) => api.get('/appointments', { params }),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  getPatientAppointments: () => api.get('/appointments/patient/my-appointments'),
  getMyDoctorAppointments: () => api.get('/appointments/doctor/my-appointments'),
  getDoctorAppointments: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data),
  cancelAppointment: (id, data) => api.patch(`/appointments/${id}/cancel`, data),
};

export default api;
