import AuthPagePlaceholder from '@/components/AuthPagePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

const VerificationCodePage = () => {
  return (
    <AuthPagePlaceholder
      title="Verification Code"
      description="Code verification placeholder."
      links={[
        { to: ROUTE_PATHS.restorePassword, label: 'Code is valid' },
        { to: ROUTE_PATHS.forgotPassword, label: 'Resend code' },
      ]}
    />
  );
};

export default VerificationCodePage;
