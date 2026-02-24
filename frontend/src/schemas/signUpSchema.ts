import * as yup from 'yup';

export const signUpSchema = yup
  .object({
    mobile: yup
      .string()
      .required('Phone number is required')
      .matches(/^\+?[0-9\s()-]{7,20}$/, 'Enter a valid phone number'),
    email: yup
      .string()
      .required('Email is required')
      .email('Enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
  })
  .required();

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;
