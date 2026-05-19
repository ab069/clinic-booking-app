import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialization: {
      type: String,
      required: [true, 'Please provide specialization'],
      enum: [
        'General Checkup',
        'Dental Care',
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'Dermatology',
      ],
    },
    experience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
      min: 0,
    },
    fees: {
      type: Number,
      required: [true, 'Please provide consultation fees'],
      min: 0,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    qualifications: [
      {
        degree: String,
        institute: String,
        year: Number,
      },
    ],
    availableDays: {
      type: [String],
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      default: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
    },
    availableTimeSlots: [
      {
        startTime: String,
        endTime: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
