import { Route, Routes } from 'react-router-dom';

import {
  ExpensesPage,
  ForgotPasswordPage,
  RestorePasswordPage,
  SignInPage,
  SignUpPage,
  SuccessPage,
  VerificationCodePage,
} from '@/pages';

import { ROUTE_PATHS } from './routePaths';

export const appRouteDefinitions = [
  { path: ROUTE_PATHS.root, element: <ExpensesPage /> },
  { path: ROUTE_PATHS.signIn, element: <SignInPage /> },
  { path: ROUTE_PATHS.signUp, element: <SignUpPage /> },
  { path: ROUTE_PATHS.forgotPassword, element: <ForgotPasswordPage /> },
  { path: ROUTE_PATHS.verificationCode, element: <VerificationCodePage /> },
  { path: ROUTE_PATHS.restorePassword, element: <RestorePasswordPage /> },
  { path: ROUTE_PATHS.success, element: <SuccessPage /> },
] as const;

const AppRoutes = () => {
  return (
    <Routes>
      {appRouteDefinitions.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
