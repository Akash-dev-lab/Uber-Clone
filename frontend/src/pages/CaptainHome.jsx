import { useRef, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!captain?._id || !socket) return

    socket.emit('join', { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const locationData = {
            userId: captain._id,
            location: {
              lng: position.coords.longitude,
              ltd: position.coords.latitude,
            },
          };

          console.log(locationData)

          socket.emit('update-location-captain', locationData);
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000)

    updateLocation()

    return () => clearInterval(locationInterval)
  }, [captain?._id, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('new-ride', (data) => {
        console.log(data)
        setRide(data)
        setRidePopupPanel(true)
      });

      return () => {
        socket.off('new-ride');
      };
    }
  }, [socket]);

  async function confirmRide() {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, { rideId: ride._id })
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

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
          <Link to='/captains/logout' className='h-10 w-10 flex items-center justify-center rounded-full bg-white'>
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
          <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} confirmRide={confirmRide} />
        </div>

        <div ref={ConfirmRidePopupPanelRef} className='fixed w-full h-screen translate-y-full z-10 bg-white bottom-0 px-3 py-10 pt-12 '>
          <ConfirmRidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
      </div>
    </>
  )
}

export default CaptainHome