import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  getMyDoctorAppointments,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, authorize('patient'), createAppointment);
router.get('/', getAppointments);
router.get('/patient/my-appointments', protect, authorize('patient'), getPatientAppointments);
router.get('/doctor/my-appointments', protect, authorize('doctor'), getMyDoctorAppointments);
router.get('/doctor/:doctorId', protect, authorize('doctor', 'admin'), getDoctorAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', protect, authorize('doctor', 'admin'), updateAppointment);
router.patch('/:id/cancel', protect, cancelAppointment);
router.delete('/:id', protect, authorize('admin'), deleteAppointment);

export default router;
