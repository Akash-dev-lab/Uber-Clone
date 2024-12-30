import { useRef, useState, useContext, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'; // Corrected import
import { UserDataContext } from '../context/UserContext';

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
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  // console.log(user)

  useEffect(() => {
    if (socket) {
      socket.emit('join', { userType: "user", userId: user._id })

      socket.on('ride-confirmed', ride => {
        setWaitingForDriverPanel(true)
      });

      return () => {
        socket.off('ride-confirmed');
      };
    }
  }, [user, socket])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    if (e.target.value.trim() === '') return; // Ensure input is not empty
    try {
      console.log('Base URL:', import.meta.env.VITE_BASE_URL); // Log the base URL
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error.response || error.message)
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    if (e.target.value.trim() === '') return // Ensure input is not empty
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching destination suggestions:', error.response || error.message)
    }
  }


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

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setFare(response.data)
  }

  async function createRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
    } catch (error) {
      console.error('Error creating ride:', error.response || error.message)
    }
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://imgs.search.brave.com/FZq7YFqzVbkjhipVXmxfaZY-RmPwy3wsG0WV1UdM8bs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTcwMHgzOTQucG5n" alt="" />

      <div className='h-screen w-screen'>
        {/* image for temporary use */}<img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line h-16 w-1 bg-gray-700 rounded-full top-[45%] left-10 absolute"></div>
            <input onClick={() => {
              setPanelOpen(true)
              setActiveField('pickup')
            }} value={pickup} onChange={handlePickupChange} className='bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
            <input onClick={() => {
              setPanelOpen(true)
              setActiveField('destination')
            }} value={destination} onChange={handleDestinationChange} className='bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
          <button onClick={findTrip} className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>

        <div ref={panelRef} className='h-0 bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>

      <div ref={vehicalPanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-10 pt-12 translate-y-full'>
        <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <ConfirmedRide vehicleType={vehicleType} pickup={pickup} fare={fare} destination={destination} createRide={createRide} setConfirmRidePanel={setConfirmRidePanel} setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div ref={LookingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12 translate-y-full'>
        <LookingForDriver createRide={createRide} pickup={pickup} destination={destination} fare={fare}
          vehicleType={vehicleType} setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 pt-12'>
        <WaitingForDriver waitingForDriverPanel={waitingForDriverPanel} setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home
