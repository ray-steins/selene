import { AUTH_REQUIREMENTS } from './requirements';
import { ErrorGroup } from '@/types/FieldErrors';

export const AUTH_ERROR_MESSAGES = {
  username: {
    improperLength: {
      error: 'USERNAME_IMPROPER_LEGNTH',
      shorthand: `Contain at least ${AUTH_REQUIREMENTS.username.minLength}-${AUTH_REQUIREMENTS.username.maxLength} characters`,
    },
    invalidChar: {
      error: 'USERNAME_INVALID_CHAR',
      shorthand: `Only contain letters (Aa-Zz), numbers (1-9), periods (.), and underscores (_)`
    },
  },
  password: {
    improperLength: {
      error: 'PASSWORD_IMPROPER_LENGTH',
      shorthand: `Contain at least ${AUTH_REQUIREMENTS.password.minLength} characters`
    },
    missing: {
      error: 'PASSWORD_MISSING_NUMBER',
      shorthand: `Contain atleast 1 number`
    },
  },
  email: {
    invalid: {
      error: 'EMAIL_INVALID',
      message: 'Invalid email address'
    },
    taken: {
      error: 'EMAIL_IN_USE',
      message: 'Email already in use'
    },
  }
} as const satisfies ErrorGroup;