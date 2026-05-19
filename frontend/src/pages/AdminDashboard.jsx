import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaUser, FaCalendar, FaChartBar } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appointmentAPI, doctorAPI } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalDoctors: 0,
    pendingAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [appointmentsRes, doctorsRes] = await Promise.all([
          appointmentAPI.getAppointments({}),
          doctorAPI.getAllDoctors({}),
        ]);

        setStats({
          totalAppointments: appointmentsRes.data.count,
          totalDoctors: doctorsRes.data.count,
          pendingAppointments: appointmentsRes.data.appointments.filter(
            (a) => a.status === 'pending'
          ).length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage clinic operations and appointments</p>
        </motion.div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <h3 className="text-3xl font-bold text-primary">
                    {stats.totalAppointments}
                  </h3>
                </div>
                <FaCalendar className="text-4xl text-primary opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Doctors</p>
                  <h3 className="text-3xl font-bold text-green-600">
                    {stats.totalDoctors}
                  </h3>
                </div>
                <FaUser className="text-4xl text-green-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Approvals</p>
                  <h3 className="text-3xl font-bold text-yellow-600">
                    {stats.pendingAppointments}
                  </h3>
                </div>
                <FaChartBar className="text-4xl text-yellow-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Patients</p>
                  <h3 className="text-3xl font-bold text-blue-600">50K+</h3>
                </div>
                <FaUsers className="text-4xl text-blue-600 opacity-20" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Management Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Doctor Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Doctor Management</h2>
            <div className="space-y-3">
              <p className="text-gray-600">Add, edit, or remove doctors from the system</p>
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Manage Doctors
              </button>
            </div>
          </div>

          {/* Appointment Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Appointment Management</h2>
            <div className="space-y-3">
              <p className="text-gray-600">Review and manage all appointments</p>
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Manage Appointments
              </button>
            </div>
          </div>

          {/* Patient Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Patient Management</h2>
            <div className="space-y-3">
              <p className="text-gray-600">View and manage patient records</p>
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                View Patients
              </button>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Analytics & Reports</h2>
            <div className="space-y-3">
              <p className="text-gray-600">View system analytics and reports</p>
              <button className="w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                View Reports
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
