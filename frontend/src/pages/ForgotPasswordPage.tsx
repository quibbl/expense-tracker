import AuthPagePlaceholder from '@/components/AuthPagePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

const ForgotPasswordPage = () => {
  return (
    <AuthPagePlaceholder
      title="Forgot Password"
      description="Request password reset placeholder."
      links={[
        { to: ROUTE_PATHS.verificationCode, label: 'Submit and enter code' },
        { to: ROUTE_PATHS.signIn, label: 'Back to sign in' },
      ]}
    />
  );
};

export default ForgotPasswordPage;
