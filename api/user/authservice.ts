import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

export const generateToken = (user: { id: string, roles: string[] }) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: { id: string, roles: string[] }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const login = async ({ email, password }: any) => {
  try {
    // Your login logic here
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Email or Password is wrong');
    }

    const accessToken = generateToken({ id: user.id, roles: user.roles });
    const refreshToken = generateRefreshToken({ id: user.id, roles: user.roles });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const createUser = async (userData: any, profileImagePath?: string) => {
  const { email, password, roles } = userData;
  
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address.");
  }

  if (!validator.isLength(password, { min: 8 })) {
    throw new Error("Password must be at least 8 characters long.");
  }

  if (roles && roles.includes('admin')) {
    const adminExists = await User.findOne({ roles: 'admin' });
    if (adminExists) {
      throw new Error("An admin already exists. Creating another admin is not allowed.");
    }
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email already exists.");
  }
//chemin profile
  if (profileImagePath) {
    userData.profileImage = profileImagePath;
  }

  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export const findUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password -refreshTokens');
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
};

export const getAllUsers = async (page: number, limit: number, search: string = '') => {
  const query = search ? { email: { $regex: search, $options: 'i' } } : {};
  const skip = (page - 1) * limit;
  const users = await User.find(query).select('-refreshTokens').skip(skip).limit(limit);
  const total = await User.countDocuments(query);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    limit,
    data: users,
  };
};
