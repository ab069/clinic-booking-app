import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About MediCare</h1>
          <p className="text-xl text-gray-600">
            Your trusted platform for healthcare appointments
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
        >
          <div className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-primary to-secondary h-96 flex items-center justify-center">
            <div className="text-center text-white">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-semibold">Quality Healthcare at Your Fingertips</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At MediCare, we believe healthcare should be accessible to everyone, anytime, 
              anywhere. Our mission is to revolutionize the way patients book appointments 
              and connect with healthcare professionals.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We leverage cutting-edge technology to make the appointment booking process 
              simple, transparent, and efficient for both patients and doctors.
            </p>
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Patient-Centric Approach</li>
              <li>✓ Quality Healthcare</li>
              <li>✓ Trust & Transparency</li>
              <li>✓ Innovation & Excellence</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-primary text-white rounded-lg p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose MediCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-bold mb-2">500+ Doctors</h3>
              <p>Qualified and experienced healthcare professionals</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">50K+ Patients</h3>
              <p>Trusted by thousands of satisfied patients</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p>Always here to help with your healthcare needs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
