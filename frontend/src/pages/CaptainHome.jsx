import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopupPanelRef = useRef(null)

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (ConfirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ConfirmRidePopupPanel])


  return (
    <>
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/home' className='h-10 w-10 flex items-center justify-center rounded-full bg-white'>
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='h-2/5 flex flex-col justify-between p-6'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full translate-y-full z-10 bg-white bottom-0 px-3 py-10 pt-12 '>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      <div ref={ConfirmRidePopupPanelRef} className='fixed w-full h-screen translate-y-full z-10 bg-white bottom-0 px-3 py-10 pt-12 '>
        <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
    </div>
    </>
  )
}

export default CaptainHome