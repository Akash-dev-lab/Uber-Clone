import React from 'react'

const LookingForDriver = (props) => {
  
  return (
    <div>
      <h5 onClick={() => { props.setLookingForDriverPanel(false) }} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className=' ' src="https://mobile-content.uber.com/launch-experience/ride.png" alt="" />

        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className='ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kaikondrahalli, Bengaluru, Karnatak</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i class="ri-crosshair-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
              <p className='text-sm -mt-1 text-gray-600'>17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnatak</p>
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
    </div>
  )
}

export default LookingForDriver