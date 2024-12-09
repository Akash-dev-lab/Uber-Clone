import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen bg-cover bg-center pt-8 justify-between flex flex-col w-full'>
        <img className='w-16 ml-8' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />
        <img className='h-screen' src="/Uber-bg-image.jpg" alt="" />
      <div className='bg-white pb-7 py-4 px-4'>
        <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
        <Link to={'/login'} className='w-full flex items-center justify-center bg-black text-white py-3 rounded mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Start
