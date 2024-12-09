import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    const captain ={
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if(response.status === 200) {
    const data = response.data
    setCaptain(data.captain)
    localStorage.setItem('token', data.token)
    navigate('/captain-home')
    }
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className='w-20 mb-7' src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem-700x394.png" alt="" />
      <form onSubmit={submitHandler} action="">
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input onChange={(e)=>{
          setEmail(e.target.value)
        }} value={email} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='Enter your email' />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" required placeholder='Enter your password' />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Login as Captain</button>
      </form>
      <p className='text-center'>Join a fleet?<Link to={'/captain-signup'} className='text-blue-600'>Register as a Captain</Link></p>
      </div>

      <div>
        <Link to={'/login'} className='bg-green-500 flex justify-center items-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin