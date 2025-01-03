import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    setfirstName('')
    setlastName('')
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    console.log(`${import.meta.env.VITE_BASE_URL}/users/register`)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    

    if(response.status === 201) {
      const data = response.data

      setUser(data.user)

      localStorage.setItem('token', data.token)
      navigate('/home')
    }
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className='w-16 mb-4' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
      <form onSubmit={submitHandler} action="">
      <h3 className='text-lg font-medium mb-2'>What's your name</h3>
      <div className='flex gap-4 mb-6'>
      <input value={firstName} onChange={(e)=>{
        setfirstName(e.target.value)
      }} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base  ' type="text" required placeholder='First name' />
      <input value={lastName} onChange={(e)=>{
        setlastName(e.target.value)
      }} className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base  ' type="text" required placeholder='Last name' />
      </div>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base  ' type="email" required placeholder='Enter your email' />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base  ' type="password" required placeholder='Enter your password' />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Create an Account</button>
      </form>
      <p className='text-center'>Already have an account?<Link to={'/login'} className='text-blue-600'>Login here</Link></p>
      </div>

      <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup
