/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import NavBar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'

function home() {
	const navigate = useNavigate()

	const  { userInfo } = useSelector(( state:RootState ) => state.auth)

	useEffect(()=>{
		if (!userInfo){
			navigate('/login')
		}
	},[navigate, userInfo])
	
  return (
	<div className='flex flex-col h-screen'>
	<NavBar />

<div className='w-full h-screen flex justify-center'>
	<h1 className=' text-center font-extrabold mt-64 text-3xl'>HOME</h1>
</div>
	</div>
  )
}

export default home