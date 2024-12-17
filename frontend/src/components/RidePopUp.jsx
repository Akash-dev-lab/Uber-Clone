import PropTypes from 'prop-types';

const RidePopUp = (props) => {
    console.log(props)
    return (
        <div>
            <h5 onClick={() => { props.setRidePopupPanel(false) }} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className="h-12 rounded-full object-cover w-12" src="https://imgs.search.brave.com/sG8ipndkF3qwIWNN11-2rbePQLGbYINiPPhVdCr88Ck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM2/OTg4Mzk2L3Bob3Rv/L2NvbmZpZGVudC1t/YW4taW4tYmx1ZS1z/d2VhdGVyLXBvcnRy/YWl0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1XdzNkSzEx/S01SdXJ1Nm1xZGRW/UTI5dTBYWnh2cV9k/RmdoTjJUYTZPQ040/PQ" alt="" />
                    <h2>Mukul Singh</h2>
                </div>
                <h5 className="text-lg font-semibold">2.2KM</h5>
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
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-crosshair-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Third Wave Coffee</h3>
                            <p className='text-sm -mt-1 text-gray-600'>17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnatak</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-cash-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full mt-5 justify-between items-center">
                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }} className=' bg-red-600 text-white px-10 font-semibold p-3 rounded-lg'>Ignore</button>

                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)

                    }} className=' bg-green-600 text-white px-10 font-semibold p-3 rounded-lg'>Accept</button>


                </div>
            </div>
        </div>
    )
}

// ConfirmRidePopUp.propTypes = {
//     setRidePopupPanel: PropTypes.func.isRequired, // Validate `setRidePopupPanel` as a required function
//     setConfirmRidePopupPanel: PropTypes.func.isRequired
// };

export default RidePopUp
