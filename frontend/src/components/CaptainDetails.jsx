const CaptainDetails = () => {
    return (
        <>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/sG8ipndkF3qwIWNN11-2rbePQLGbYINiPPhVdCr88Ck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM2/OTg4Mzk2L3Bob3Rv/L2NvbmZpZGVudC1t/YW4taW4tYmx1ZS1z/d2VhdGVyLXBvcnRy/YWl0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1XdzNkSzEx/S01SdXJ1Nm1xZGRW/UTI5dTBYWnh2cV9k/RmdoTjJUYTZPQ040/PQ" alt="" />
                    <h4 className='text-lg font-medium'>Mukul Singh</h4>
                </div>

                <div>
                    <h4 className='text-xl font-semibold'>₹295.20</h4>
                    <p className='text-sm font-medium text-gray-600'>Earned</p>
                </div>
            </div>

            <div className='flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-fill"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </>
    )
}

export default CaptainDetails
