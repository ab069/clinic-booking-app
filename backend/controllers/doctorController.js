import { asyncHandler } from '../utils/asyncHandler.js';
import { readData, addData, deleteById, updateById, findById } from '../utils/db.js';

export const getAllDoctors = asyncHandler(async (req, res) => {
  const { specialization, sortBy } = req.query;

  let doctors = readData('doctors');

  // Filter by specialization
  if (specialization) {
    doctors = doctors.filter((doc) =>
      doc.specialization.toLowerCase() === specialization.toLowerCase()
    );
  }

  // Sort
  if (sortBy === 'rating') {
    doctors.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'fees') {
    doctors.sort((a, b) => a.fees - b.fees);
  } else if (sortBy === 'experience') {
    doctors.sort((a, b) => {
      const expA = parseInt(a.experience);
      const expB = parseInt(b.experience);
      return expB - expA;
    });
  }

  res.status(200).json({
    success: true,
    count: doctors.length,
    doctors,
  });
});

export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = findById('doctors', req.params.id);

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found',
    });
  }

  res.status(200).json({
    success: true,
    doctor,
  });
});

export const createDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    specialization,
    experience,
    fees,
    bio,
    availableDays,
    availableTime,
    image,
  } = req.body;

  if (!name || !specialization || !experience || !fees) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  const newDoctor = addData('doctors', {
    name,
    specialization,
    experience,
    fees,
    bio,
    availableDays: availableDays || [],
    availableTime: availableTime || [],
    image: image || 'https://via.placeholder.com/500',
    rating: 0,
    totalRatings: 0,
  });

  if (!newDoctor) {
    return res.status(500).json({
      success: false,
      message: 'Error creating doctor',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Doctor added successfully',
    doctor: newDoctor,
  });
});

export const updateDoctor = asyncHandler(async (req, res) => {
  const { name, specialization, experience, fees, bio, availableDays, availableTime, image } = req.body;

  const updated = updateById('doctors', req.params.id, {
    name,
    specialization,
    experience,
    fees,
    bio,
    availableDays,
    availableTime,
    image,
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found or error updating',
    });
  }

  const doctor = findById('doctors', req.params.id);

  res.status(200).json({
    success: true,
    message: 'Doctor updated successfully',
    doctor,
  });
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = findById('doctors', req.params.id);

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found',
    });
  }

  const deleted = deleteById('doctors', req.params.id);

  if (!deleted) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting doctor',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Doctor deleted successfully',
  });
});

export const getDoctorsBySpecialization = asyncHandler(async (req, res) => {
  const { specialization } = req.params;

  const doctors = readData('doctors').filter(
    (doc) => doc.specialization.toLowerCase() === specialization.toLowerCase()
  );

  res.status(200).json({
    success: true,
    count: doctors.length,
    doctors,
  });
});
