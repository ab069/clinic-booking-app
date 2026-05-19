import bcryptjs from 'bcryptjs';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';
import { readData, findByEmail, addData, updateById, findById } from '../utils/db.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, gender, age, role } = req.body;

  // Validation
  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  // Check if user exists
  const userExists = findByEmail('users', email);
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'Email already registered',
    });
  }

  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // Create user
  const newUser = addData('users', {
    name,
    email,
    password: hashedPassword,
    role: role || 'patient',
    phone,
    gender,
    age,
    profileImage: 'https://via.placeholder.com/150',
  });

  if (!newUser) {
    return res.status(500).json({
      success: false,
      message: 'Error creating user',
    });
  }

  const token = generateToken(newUser.id, newUser.role);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Check for user
  const user = findByEmail('users', email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check password
  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const token = generateToken(user.id, user.role);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = findById('users', req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      gender: user.gender,
      age: user.age,
      profileImage: user.profileImage,
    },
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, gender, age, profileImage } = req.body;

  const updated = updateById('users', req.user.id, {
    name,
    phone,
    gender,
    age,
    profileImage,
  });

  if (!updated) {
    return res.status(500).json({
      success: false,
      message: 'Error updating profile',
    });
  }

  const user = findById('users', req.user.id);

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      gender: user.gender,
      age: user.age,
    },
  });
});
