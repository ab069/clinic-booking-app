import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doctorAPI, appointmentAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    symptoms: '',
    notes: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await doctorAPI.getDoctorById(id);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        toast.error('Failed to load doctor details');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    // Backend will validate the user role
    setBookingLoading(true);

    try {
      await appointmentAPI.createAppointment({
        doctorId: id,
        ...booking,
      });

      toast.success('Appointment booked successfully!');
      setBooking({
        date: '',
        time: '',
        symptoms: '',
        notes: '',
      });

      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Doctor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctors')}
          className="flex items-center gap-2 text-primary hover:text-blue-700 mb-6 font-semibold"
        >
          <FaArrowLeft /> Back to Doctors
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex gap-6 mb-8">
                <img
                  src={doctor.image || 'https://via.placeholder.com/200'}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
                  <p className="text-xl text-primary font-semibold mb-3">{doctor.specialization}</p>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-gray-600">({doctor.totalRatings} ratings)</span>
                  </div>
                  <p className="text-gray-600">
                    <strong>Experience:</strong> {doctor.experience} years
                  </p>
                  <p className="text-gray-600">
                    <strong>Consultation Fee:</strong> PKR {doctor.fees}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8 pb-8 border-b">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Qualifications */}
              {doctor.qualifications?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
                  <div className="space-y-3">
                    {doctor.qualifications.map((qual, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-bold text-blue-900">{qual.degree}</p>
                        <p className="text-blue-800">{qual.institute}</p>
                        <p className="text-blue-700 text-sm">{qual.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Availability</h2>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {doctor.availableDays?.map((day) => (
                    <span
                      key={day}
                      className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      {day}
                    </span>
                  ))}
                </div>
                {doctor.availableTimeSlots?.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-700 mb-3">Time Slots:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {doctor.availableTimeSlots.map((slot, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm text-center"
                        >
                          {slot.startTime} - {slot.endTime}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Book Appointment</h2>

              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={booking.date}
                    onChange={handleBookingChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={booking.time}
                    onChange={handleBookingChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Symptoms</label>
                  <textarea
                    name="symptoms"
                    value={booking.symptoms}
                    onChange={handleBookingChange}
                    placeholder="Describe your symptoms..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={booking.notes}
                    onChange={handleBookingChange}
                    placeholder="Any additional information..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading || !isAuthenticated}
                  className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {bookingLoading ? 'Booking...' : 'Book Appointment'}
                </button>
              </form>

              {!isAuthenticated && (
                <p className="text-sm text-red-600 mt-4 text-center">
                  Please login to book an appointment
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
