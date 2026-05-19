import { writeData } from './utils/db.js';
import bcryptjs from 'bcryptjs';

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with sample data...\n');

    // Create users
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('password123', salt);

    const users = [
      {
        id: 1,
        name: 'Patient User',
        email: 'patient@test.com',
        password: hashedPassword,
        role: 'patient',
        phone: '9876543210',
        gender: 'male',
        age: 30,
        profileImage: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Dr. Ahmad Hassan',
        email: 'doctor@test.com',
        password: hashedPassword,
        role: 'doctor',
        phone: '9876543211',
        gender: 'male',
        age: 35,
        profileImage: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@test.com',
        password: hashedPassword,
        role: 'admin',
        phone: '9876543212',
        gender: 'male',
        age: 45,
        profileImage: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
      },
    ];

    // Create doctors
    const doctors = [
      {
        id: 1,
        name: 'Dr. Ahmad Hassan',
        specialization: 'Cardiology',
        experience: '15 years',
        fees: 3500,
        bio: 'Experienced cardiologist with 15 years of practice. Graduated from Aga Khan University, Karachi. Dedicated to providing comprehensive heart care.',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        availableTime: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        rating: 4.8,
        totalRatings: 120,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Dr. Salman Ali Khan',
        specialization: 'General Checkup',
        experience: '12 years',
        fees: 2500,
        bio: 'General physician focused on preventive care and patient wellness. Trained at LUMS Medical College, Lahore with expertise in family medicine.',
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        availableTime: ['10:00', '11:00', '15:00', '16:00'],
        rating: 4.9,
        totalRatings: 95,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'Dr. Zulkifl Mirza',
        specialization: 'Dental Care',
        experience: '10 years',
        fees: 2800,
        bio: 'Dentist specializing in cosmetic and preventive dentistry with state-of-the-art equipment. Graduate of Dow University of Health Sciences, Karachi.',
        availableDays: ['Tuesday', 'Thursday', 'Saturday'],
        availableTime: ['09:30', '10:30', '13:30', '14:30'],
        rating: 4.7,
        totalRatings: 110,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: 'Dr. Muhammad Farooq',
        specialization: 'Neurology',
        experience: '18 years',
        fees: 4500,
        bio: 'Specialized neurologist with expertise in complex neurological conditions. Educated at Peshawar Medical College with international board certifications.',
        availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
        availableTime: ['11:00', '14:00', '15:00'],
        rating: 4.9,
        totalRatings: 85,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: 'Dr. Fatima Khawaja',
        specialization: 'Pediatrics',
        experience: '13 years',
        fees: 2800,
        bio: 'Pediatrician dedicated to children\'s health and development. Graduated from Rawalpindi Medical College with additional fellowship in pediatric care from UK.',
        availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
        availableTime: ['10:00', '11:00', '14:00', '15:00', '16:00'],
        rating: 4.8,
        totalRatings: 140,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
        createdAt: new Date().toISOString(),
      },
    ];

    // Create sample appointments
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = [
      {
        id: 1,
        patientId: 1,
        doctorId: 1,
        doctorName: 'Dr. Sarah Johnson',
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00',
        status: 'confirmed',
        symptoms: 'Regular checkup',
        notes: 'Patient needs annual health checkup',
        doctorNotes: 'All vitals normal',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        patientId: 1,
        doctorId: 2,
        doctorName: 'Dr. Michael Chen',
        date: new Date(tomorrow.getTime() + 86400000).toISOString().split('T')[0],
        time: '14:00',
        status: 'pending',
        symptoms: 'Chest discomfort',
        notes: 'Follow-up consultation needed',
        doctorNotes: '',
        createdAt: new Date().toISOString(),
      },
    ];

    // Write to files
    writeData('users', users);
    writeData('doctors', doctors);
    writeData('appointments', appointments);

    console.log('✅ Database seeded successfully!\n');
    console.log('📝 Demo Credentials:');
    console.log('   Patient: patient@test.com / password123');
    console.log('   Doctor: doctor@test.com / password123');
    console.log('   Admin: admin@test.com / password123\n');
    console.log('📂 Data stored in /backend/database folder (JSON files)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
