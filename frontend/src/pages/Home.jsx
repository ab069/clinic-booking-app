import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStethoscope, FaHeartPulse, FaCalendarCheck, FaUsers } from 'react-icons/fa6';
import { doctorAPI } from '../services/api';
import DoctorCard from '../components/DoctorCard';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorAPI.getAllDoctors({ limit: 3 });
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-5xl font-bold mb-4">
              Your Health is Our Priority
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Book appointments with trusted doctors and get quality healthcare from home.
            </p>
            <Link
              to="/doctors"
              className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Book Now
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg shadow-xl p-12 text-white text-center flex items-center justify-center h-96">
              <div>
                <FaHeartPulse className="text-6xl mx-auto mb-4 opacity-80" />
                <p className="text-2xl font-semibold">Quality Healthcare</p>
                <p className="text-sm opacity-80 mt-2">Trusted by thousands of patients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Services
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: FaStethoscope, title: 'General Checkup', desc: 'Complete health assessment' },
              { icon: FaHeartPulse, title: 'Cardiology', desc: 'Heart and cardiovascular care' },
              { icon: FaCalendarCheck, title: 'Easy Booking', desc: 'Simple appointment scheduling' },
              { icon: FaUsers, title: 'Expert Doctors', desc: 'Experienced medical professionals' },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition"
                >
                  <Icon className="text-4xl text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Featured Doctors
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {doctors.map((doctor) => (
              <motion.div key={doctor._id} variants={itemVariants}>
                <DoctorCard
                  doctor={doctor}
                  onClick={() => navigate(`/doctors/${doctor.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link
              to="/doctors"
              className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Doctors' },
              { number: '50K+', label: 'Patients' },
              { number: '100K+', label: 'Appointments' },
              { number: '4.8★', label: 'Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            What Patients Say
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                name: 'Sarah Johnson',
                message: 'Great service! Easy to book and professional doctors.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                message: 'Very convenient. Saved me time and money.',
                rating: 5,
              },
              {
                name: 'Emma Williams',
                message: 'Highly recommend. Top-notch medical care.',
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 mb-4">"{testimonial.message}"</p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-yellow-400">{'★'.repeat(testimonial.rating)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
