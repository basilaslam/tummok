/* eslint-disable react-hooks/rules-of-hooks */
import { Formik, Form, Field } from 'formik';
import { formStyle } from '../types/form'
import signUpFormValidation from '../validation/signUpFormValidation'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useRef } from 'react';

type RegisterDetailes ={
	username: string,
	email: string,
	password:string,
	passwordConfirmation?:string
}
const initialValues ={
	username: "",
	email: "",
	password:"",
	passwordConfirmation:""
}
type RefType = React.MutableRefObject<HTMLParagraphElement | null>;


function signUpForm({styles}:{styles: formStyle}) {
	const navigate = useNavigate()
	const error: RefType = useRef(null)

	const  { userInfo } = useSelector(( state:RootState ) => state.auth)

	useEffect(()=>{
		if (userInfo){
			navigate('/')
		}
	},[navigate, userInfo])

	const googleLogin = () =>{
		const googleLoginURI = 'https://vast-red-ox-slip.cyclic.app/api/auth/google'
		window.open(
		googleLoginURI,
		"_blank",
		"width=500, height=600"
		)
	}

	const handleSubmit = async (values:RegisterDetailes) =>{
		delete values.passwordConfirmation
			console.log(values);
			
		try{
		await axios.post('api/register',values)
	
			navigate('/login')
		}catch(err){
			console.log(err);
			error.current!.textContent = 'Login Failed'

		}

	}
  return (
	<div className={styles.form}>
	<h1 className={styles.title}>Register</h1>
	<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signUpFormValidation}>
	{({ errors, touched }) => (

		<Form>
			<div className="username_section">
				<label className={styles.label} htmlFor="username">Username: </label>
				<Field className={styles.field} type="text" id="username" name="username" />
				{errors.username && touched.username ? (
            <div className={styles.error}>{errors.username}</div>) : null}

			</div>
			<div className="email_section">
				<label className={styles.label} htmlFor="email">Email: </label>
				<Field className={styles.field} type="email" id="email" name="email" />
			{errors.email && touched.email ? (
           <div className={styles.error}>{errors.email}</div>) : null}
			</div>
			<div className="password_section">
				<label className={styles.label} htmlFor="password">Password: </label>
				<Field className={styles.field} type="password" id="password" name="password" />
				{errors.password && touched.password ? (
            <div  className={styles.error}>{errors.password}</div>) : null}
			</div>
			<div className="password_section">
				<label className={styles.label} htmlFor="confirm_password">Confirm Password: </label>
				<Field className={styles.field} type="password" id="confirm_password" name="passwordConfirmation" />
				{errors.passwordConfirmation && touched.passwordConfirmation ? (
           <div className={styles.error}>{errors.passwordConfirmation}</div>) : null}
			</div>
			<div className='flex justify-between'>
			<p ref={error} className={styles.error} />
					<p className='text-black font-semibold cursor-pointer float-right m-1' onClick={()=> navigate('/login')}>Already have an account</p>
			</div>

			<button className={styles.button+' mt-2'} type="submit">Submit</button>
			<div className="px-6 sm:px-0 max-w-sm flex justify-center mt-3">
    <button type="button" onClick={googleLogin} className="text-white w-2/4 mx-auto  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55  mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
</div>
		</Form>
	)}

       

	
	</Formik>
	</div>
  )
}

export default signUpForm

