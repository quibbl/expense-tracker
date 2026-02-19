export const ROUTE_PATHS = {
  root: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  verificationCode: '/verification-code',
  restorePassword: '/restore-password',
  success: '/success',
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
