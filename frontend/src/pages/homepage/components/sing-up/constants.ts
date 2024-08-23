import { NewUserField } from '@types';

export const fields: NewUserField[] = [
  {
    label: 'Username',
    id: 'username',
    type: 'text',
    validate: (value: string) => {
      const usernameRegex = /^[a-zA-Z0-9._]{3,15}$/;
      return usernameRegex.test(value);
    },
    validationRequirements: [
      'It must be between 3 and 20 characters long.',
      'It can only contain letters, numbers, and underscores.'
    ]
  },
  {
    label: 'Password',
    id: 'password',
    type: 'password',
    validate: (value: string) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,\-])[A-Za-z\d@$!%*?&.,\-]{8,}$/;
      return passwordRegex.test(value);
    },
    validationRequirements: [
      'Must be at least 8 characters long.',
      'Must contain at least one uppercase letter, one lowercase letter, one number and one special character (e.g. @, #, $, etc.).'
    ]
  },
  {
    label: 'Email',
    id: 'email',
    type: 'email',
    validate: (value: string) => {
      const passwordRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return passwordRegex.test(value);
    },
    validationRequirements: ['Must be valid email.']
  },
  {
    label: 'Full Name',
    id: 'fullName',
    type: 'text',
    validate: (value: string) => {
      const nameRegex = /^[a-zA-Z\s]{2,40}$/;
      return nameRegex.test(value);
    },
    validationRequirements: [
      'Must be between 2 and 40 characters.',
      'It can only contain letters and spaces.'
    ]
  }
];
