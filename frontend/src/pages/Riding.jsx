import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 right-2 top-2 flex items-center justify-center rounded-full bg-white'>
            <i class="ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://imgs.search.brave.com/l8sLLdkDsvVFWzgRdEe-fc0abwC84riS4P3ebsS9sZg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFwLWdwcy1u/YXZpZ2F0aW9uLWNp/dHktc3RyZWV0LW1h/cC13aXRoLXBpbnMt/cm91dGUtZGFzaGJv/YXJkLWFwcC1yb3V0/ZS1uYXZpZ2F0b3Jf/MTY1MTQzLTEwNzIu/anBnP3NpemU9NjI2/JmV4dD1qcGc" alt="" />
            </div>

            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='' src="https://mobile-content.uber.com/launch-experience/ride.png" alt="" />

                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Akash</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP 81BX 3709</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>

                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className='ri-map-pin-2-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Kaikondrahalli, Bengaluru, Karnatak</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-5 p-3'>
                            <i class="ri-cash-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>193.20</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full my-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding
