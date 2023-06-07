import * as Yup from 'yup';

const loginValidation = Yup.object().shape({
	email: Yup.string().email('please enter a valid email address').required('please enter your email'),
	password: Yup.string().required('please enter your password')
})


export default loginValidation