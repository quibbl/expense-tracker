import type { FormEventHandler } from 'react';

import LoginForm from '@/components/LoginForm';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';

const SignInPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <LoginForm
        title="Welcome Back"
        iconName="signIn"
        submitLabel="Sign In"
        fields={[
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            autoComplete: 'email',
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            autoComplete: 'current-password',
          },
        ]}
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};

export default SignInPage;
