import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault()
    setEmail('')
    setPassword('')
    setUserData({
      email: email,
      password: password,
    })
  }

  // Flag to detect the First Render
  useEffect(() => {
    if (!firstRender) {
      console.log(userData);
    } else {
      setFirstRender(false);
    }
  }, [userData]);

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className='w-16 mb-4' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
      <form onSubmit={submitHandler} action="">
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input onChange={(e)=>{
          setEmail(e.target.value)
        }} value={email} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" required placeholder='Enter your email' />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" required placeholder='Enter your password' />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Login</button>
      </form>
      <p className='text-center'>New here?<Link to={'/signup'} className='text-blue-600'>Create new Account</Link></p>
      </div>

      <div>
        <Link to={'/captain-login'} className='bg-yellow-500 flex justify-center items-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin