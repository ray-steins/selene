import { z } from 'zod';
import { prisma } from '../../prisma';
import { AUTH_REQUIREMENTS } from '../../errors/auth/requirements';
import { AUTH_ERROR_MESSAGES } from '../../errors/auth/errorMessages';

const passwordReq = AUTH_REQUIREMENTS.password;

const passwordErr = AUTH_ERROR_MESSAGES.password;
const emailErr = AUTH_ERROR_MESSAGES.email;

export const SignupSchema = z.object({
  email: z.email(({
    error: emailErr.invalid.error,
  })).trim(),
  password: z
  .string()
  .min(passwordReq.minLength, {
    error: passwordErr.improperLength.error
  })
  .max(passwordReq.maxLength, {
    error: passwordErr.improperLength.error
  })
  .regex(/[0-9]/, {
    error: passwordErr.missing.error
  })
  .trim(),
})