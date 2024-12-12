import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehicalPanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const LookingForDriverRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false)
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {

    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        ease: "power2.out"
        // display: 'block'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.5,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',

      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (lookingForDriverPanel) {
      gsap.to(LookingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(LookingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [lookingForDriverPanel])

  useGSAP(function () {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriverPanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />

      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://imgs.search.brave.com/l8sLLdkDsvVFWzgRdEe-fc0abwC84riS4P3ebsS9sZg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFwLWdwcy1u/YXZpZ2F0aW9uLWNp/dHktc3RyZWV0LW1h/cC13aXRoLXBpbnMt/cm91dGUtZGFzaGJv/YXJkLWFwcC1yb3V0/ZS1uYXZpZ2F0b3Jf/MTY1MTQzLTEwNzIu/anBnP3NpemU9NjI2/JmV4dD1qcGc" alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6'><i class="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line h-16 w-1 bg-gray-700 rounded-full top-[45%] left-10 absolute"></div>
            <input onClick={() => {
              setPanelOpen(true)
            }} value={pickup} onChange={(e) => {
              setPickup(e.target.value)
            }} className='bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input onClick={() => {
              setPanelOpen(true)
            }} value={destination} onChange={(e) => {
              setDestination(e.target.value)
            }} className='bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
        </div>

        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      <div ref={vehicalPanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div ref={LookingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12'>
        <WaitingForDriver waitingForDriverPanel={waitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home
