export const AUTH_REQUIREMENTS = {
  username: {
    minLength: 4,
    maxLength: 10,
    pattern: /^[a-zA-Z]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
  },
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }
} as const;