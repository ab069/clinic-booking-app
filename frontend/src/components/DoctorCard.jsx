import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const DoctorCard = ({ doctor, onClick }) => {
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      onClick={onClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
    >
      <img
        src={doctor.image || 'https://via.placeholder.com/300x200'}
        alt={doctor.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
        <p className="text-primary font-semibold mb-2">{doctor.specialization}</p>
        <p className="text-gray-600 text-sm mb-3">
          📚 {doctor.experience} years experience
        </p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.bio}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.round(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="text-sm text-gray-600">({doctor.totalRatings})</span>
          </div>
          <p className="text-lg font-bold text-primary">PKR {doctor.fees}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
