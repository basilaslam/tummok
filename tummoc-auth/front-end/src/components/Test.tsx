import { useDispatch } from "react-redux"
import {  logOut } from "../slices/auth.slice"

function Test(){
	const dispach = useDispatch()
	const handleclick = () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
	
	}
	function handleout() {
		dispach(logOut())

	}

	return(
		<>
		<button onClick={handleclick}>okok</button>
		<button onClick={handleout}>out</button>

		
		</>
	)
}

export default Test