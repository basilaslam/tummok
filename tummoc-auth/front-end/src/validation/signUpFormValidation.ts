import * as Yup from 'yup';

const signUpFormValidation = Yup.object().shape({
  username: Yup.string()
    .required('Please enter your username'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Please confirm your password'),
});

export default signUpFormValidation;
