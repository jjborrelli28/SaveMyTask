import { z } from 'zod';

const username = z
  .string()
  .min(1, { message: 'Username cannot be empty' })
  .min(3, { message: 'Username must be at least 3 characters long' })
  .max(20, { message: 'Username must be no more than 20 characters long' })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores'
  });

const getPasswordValidation = (passwordName = 'Password') => {
  return z
    .string()
    .min(8, { message: `${passwordName} must be at least 8 characters long` })
    .max(100, {
      message: `${passwordName} must be no more than 100 characters long`
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/,
      {
        message: `${passwordName} must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
      }
    );
};

const email = z
  .string()
  .min(1, { message: 'Email cannot be empty' })
  .email({ message: 'Invalid email address' });

const full_name = z
  .string()
  .min(1, { message: 'Full name cannot be empty' })
  .max(100, { message: 'Full name must be no more than 100 characters long' })
  .regex(/^(?!\s)(?!.*\s{2})([a-zA-Z]+\s?)+$/, {
    message: 'Full name can only contain letters and spaces'
  });

export const createUserSchema = z.object({
  username,
  password: getPasswordValidation(),
  email,
  full_name
});

export const loginSchema = z.object({
  username,
  password: getPasswordValidation()
});

export const updateUserSchema = z.object({
  username: username.optional(),
  password: getPasswordValidation().optional(),
  email: email.optional(),
  full_name: full_name.optional(),
  confirmationPassword: getPasswordValidation('Confirmation Password2')
});
