import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Please provide appointment date'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Please provide appointment time'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    symptoms: {
      type: String,
      maxlength: 500,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    doctorNotes: {
      type: String,
      maxlength: 1000,
    },
    prescription: {
      type: String,
      maxlength: 2000,
    },
    cancellationReason: {
      type: String,
      maxlength: 500,
    },
    isReminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
