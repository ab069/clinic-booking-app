import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaTrash, FaCheck } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appointmentAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await appointmentAPI.getPatientAppointments();
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.cancelAppointment(appointmentId, {
          cancellationReason: 'Cancelled by patient',
        });
        setAppointments((prev) =>
          prev.map((apt) =>
            apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
          )
        );
        toast.success('Appointment cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel appointment');
      }
    }
  };

  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}!</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Appointments</p>
                <h3 className="text-3xl font-bold text-primary">
                  {appointments.length}
                </h3>
              </div>
              <FaCalendar className="text-4xl text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Upcoming</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {appointments.filter((a) => a.status === 'confirmed').length}
                </h3>
              </div>
              <FaCheck className="text-4xl text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <h3 className="text-3xl font-bold text-blue-600">
                  {appointments.filter((a) => a.status === 'completed').length}
                </h3>
              </div>
              <FaCheck className="text-4xl text-blue-600 opacity-20" />
            </div>
          </div>
        </motion.div>

        {/* Appointments List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Appointments</h2>
            <button
              onClick={() => navigate('/doctors')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Book New
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="text-gray-600 text-sm">Doctor</p>
                      <p className="font-bold text-lg">{appointment.doctorName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Date & Time</p>
                      <p className="font-bold">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      {appointment.status !== 'cancelled' &&
                        appointment.status !== 'completed' && (
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
                          >
                            <FaTrash className="text-sm" /> Cancel
                          </button>
                        )}
                    </div>
                  </div>

                  {appointment.symptoms && (
                    <div className="mt-4 pt-4 border-t text-gray-600">
                      <p className="text-sm">
                        <strong>Symptoms:</strong> {appointment.symptoms}
                      </p>
                    </div>
                  )}

                  {appointment.doctorNotes && (
                    <div className="mt-4 pt-4 border-t bg-blue-50 p-4 rounded">
                      <p className="text-sm font-semibold text-blue-900">
                        Doctor's Notes:
                      </p>
                      <p className="text-blue-800">{appointment.doctorNotes}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaCalendar className="text-5xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">No appointments yet</p>
              <button
                onClick={() => navigate('/doctors')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Book Your First Appointment
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;
