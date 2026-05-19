import { asyncHandler } from '../utils/asyncHandler.js';
import { readData, addData, deleteById, updateById, findById } from '../utils/db.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, time, symptoms, notes } = req.body;
  const patientId = req.user.id;

  // Check if user is a patient
  const user = findById('users', patientId);
  if (!user || user.role !== 'patient') {
    return res.status(403).json({
      success: false,
      message: 'Only patients can book appointments',
    });
  }

  if (!doctorId || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: doctorId, date, and time',
    });
  }

  // Check if doctor exists
  const doctor = findById('doctors', doctorId);
  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found',
    });
  }

  // Check if appointment slot already booked
  const appointments = readData('appointments');
  const existingAppointment = appointments.find(
    (apt) =>
      apt.doctorId === parseInt(doctorId) &&
      apt.date === date &&
      apt.time === time &&
      (apt.status === 'pending' || apt.status === 'confirmed')
  );

  if (existingAppointment) {
    return res.status(400).json({
      success: false,
      message: 'This time slot is already booked',
    });
  }

  const newAppointment = addData('appointments', {
    patientId,
    patientName: user.name,
    doctorId: parseInt(doctorId),
    doctorName: doctor.name,
    date,
    time,
    status: 'pending',
    symptoms,
    notes,
    doctorNotes: '',
  });

  if (!newAppointment) {
    return res.status(500).json({
      success: false,
      message: 'Error booking appointment',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully',
    appointment: newAppointment,
  });
});

export const getAppointments = asyncHandler(async (req, res) => {
  const { doctorId, patientId, status } = req.query;

  let appointments = readData('appointments');

  if (doctorId) {
    appointments = appointments.filter((apt) => apt.doctorId === parseInt(doctorId));
  }
  if (patientId) {
    appointments = appointments.filter((apt) => apt.patientId === parseInt(patientId));
  }
  if (status) {
    appointments = appointments.filter((apt) => apt.status === status);
  }

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = findById('appointments', req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  res.status(200).json({
    success: true,
    appointment,
  });
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const { status, doctorNotes } = req.body;

  const updated = updateById('appointments', req.params.id, {
    status,
    doctorNotes,
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  const appointment = findById('appointments', req.params.id);

  res.status(200).json({
    success: true,
    message: 'Appointment updated successfully',
    appointment,
  });
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const { cancellationReason } = req.body;

  const updated = updateById('appointments', req.params.id, {
    status: 'cancelled',
    cancellationReason,
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  const appointment = findById('appointments', req.params.id);

  res.status(200).json({
    success: true,
    message: 'Appointment cancelled successfully',
    appointment,
  });
});

export const getPatientAppointments = asyncHandler(async (req, res) => {
  const patientId = req.user.id;

  const appointments = readData('appointments')
    .filter((apt) => apt.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const doctorId = parseInt(req.params.doctorId);

  const appointments = readData('appointments')
    .filter((apt) => apt.doctorId === doctorId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

export const getMyDoctorAppointments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Find doctor by userId
  const doctors = readData('doctors');
  const doctor = doctors.find((doc) => doc.userId === userId);

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor profile not found',
    });
  }

  const appointments = readData('appointments')
    .filter((apt) => apt.doctorId === doctor.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = findById('appointments', req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  const deleted = deleteById('appointments', req.params.id);

  if (!deleted) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting appointment',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Appointment deleted successfully',
  });
});
