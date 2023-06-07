import LoginForm from '../components/loginForm';
import { formStyle } from '../types/form';


const  Login = ({styles}:{styles: formStyle} ) => {
  
  return (
	<div className='h-screen flex items-center justify-center'>
    <LoginForm styles={styles}/>
  </div>
  )
}

export default Login