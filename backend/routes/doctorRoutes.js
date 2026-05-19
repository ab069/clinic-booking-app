import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsBySpecialization,
} from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.get('/specialization/:specialization', getDoctorsBySpecialization);
router.post('/', protect, authorize('admin'), createDoctor);
router.put('/:id', protect, authorize('admin', 'doctor'), updateDoctor);
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

export default router;
