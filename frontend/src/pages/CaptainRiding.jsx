import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
          })
        } else {
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
          })
        }
      }, [finishRidePanel])

  return (
    <div className='h-screen relative'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className='h-10 w-10 flex items-center justify-center rounded-full bg-white'>
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='h-1/5 w-full flex items-center relative bg-yellow-400 pt-10 justify-between p-6'>
        <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={()=>{ setFinishRidePanel(true) }}><i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i></h5>
        <h4 className='text-xl font-semibold'>4 KM Away</h4>
        <button onClick={()=>{ setFinishRidePanel(true) }} className='w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full translate-y-full z-10 bg-white bottom-0 px-3 py-10 pt-12 '>
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding