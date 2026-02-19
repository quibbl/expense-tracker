import AuthPagePlaceholder from '@/components/AuthPagePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

const SignUpPage = () => {
  return (
    <AuthPagePlaceholder
      title="Sign Up"
      description="Registration form placeholder."
      links={[
        { to: ROUTE_PATHS.signIn, label: 'Already have an account' },
        { to: ROUTE_PATHS.verificationCode, label: 'Go to verification code' },
      ]}
    />
  );
};

export default SignUpPage;
