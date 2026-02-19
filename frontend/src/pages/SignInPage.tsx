import AuthPagePlaceholder from '@/components/AuthPagePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

const SignInPage = () => {
  return (
    <AuthPagePlaceholder
      title="Sign In"
      description="Sign in form placeholder."
      links={[
        { to: ROUTE_PATHS.signUp, label: 'Create account' },
        { to: ROUTE_PATHS.forgotPassword, label: 'Forgot password' },
        { to: ROUTE_PATHS.root, label: 'Back to expenses' },
      ]}
    />
  );
};

export default SignInPage;
