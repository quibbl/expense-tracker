import AuthPagePlaceholder from '@/components/AuthPagePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

const SuccessPage = () => {
  return (
    <AuthPagePlaceholder
      title="Success"
      description="Password restored successfully placeholder."
      links={[
        { to: ROUTE_PATHS.signIn, label: 'Go to sign in' },
        { to: ROUTE_PATHS.root, label: 'Go to expenses' },
      ]}
    />
  );
};

export default SuccessPage;
