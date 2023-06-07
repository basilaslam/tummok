import SignUpForm from '../components/signUpForm'
import { formStyle } from '../types/form'


function Register({styles}:{styles: formStyle}) {
  return (
		<div className='h-screen flex items-center justify-center'>
    <SignUpForm styles={styles}/>
  </div>
  )
}

export default Register