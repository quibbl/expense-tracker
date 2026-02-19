import AuthPagePlaceholder from '@/components/AuthPagePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

const RestorePasswordPage = () => {
  return (
    <AuthPagePlaceholder
      title="Restore Password"
      description="Set new password placeholder."
      links={[
        { to: ROUTE_PATHS.success, label: 'Save new password' },
        { to: ROUTE_PATHS.verificationCode, label: 'Back to code verification' },
      ]}
    />
  );
};

export default RestorePasswordPage;
