import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import LoginForm from '@/components/LoginForm';
import AuthLayout from '@/layouts/AuthLayout';
import { ROUTE_PATHS } from '@/routes/routePaths';

import { signUpSchema, SignUpFormValues } from '@/schemas/signUpSchema';


const SignUpPage = () => { 
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null); 

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },    
  } = useForm<SignUpFormValues>({   
    resolver: yupResolver(signUpSchema),  
    defaultValues: { 
      mobile: '', 
      email: '', 
      password: '', 
    },
  }); 

  const onSubmit = async () => { 
    setSubmitError(null); 

    try { 
      await new Promise((resolve) => { 
        window.setTimeout(resolve, 600); 
      }); 

      navigate(ROUTE_PATHS.signIn, { 
        state: { successMessage: 'Registration successful. Please sign in.' }, 
      });
    } catch { 
      setSubmitError('Registration failed. Please try again.'); 
    } 
  }; 

  return (
    <AuthLayout>
      <LoginForm
        title="Welcome To Us,"
        subtitle="Hello there, create New account"
        iconName="signUp"
        submitLabel={isSubmitting ? 'Creating account...' : 'Sign Up'}
        submitButtonProps={{
          disabled: isSubmitting,
        }}
        statusMessage={
          submitError
            ? { type: 'error', text: submitError }
            : undefined
        }
        fields={[
          {
            type: 'tel',
            placeholder: 'How we can call you?',
            autoComplete: 'tel',
            'aria-invalid': Boolean(errors.mobile),
            errorMessage: errors.mobile?.message,
            ...register('mobile'),
          },
          {
            type: 'email',
            placeholder: 'Provide your email',
            autoComplete: 'email',
            'aria-invalid': Boolean(errors.email),
            errorMessage: errors.email?.message,
            ...register('email'),
          },
          {
            type: 'password',
            placeholder: 'Create a strong password',
            errorMessage: errors.password?.message,
            autoComplete: 'new-password',
            'aria-invalid': Boolean(errors.password),
            ...register('password'),
          },
        ]}
        onSubmit={handleSubmit(onSubmit)}
      />
    </AuthLayout>
  );
};

export default SignUpPage;
