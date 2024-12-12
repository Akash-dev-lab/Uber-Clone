import React from 'react'

const LocationSearchPanel = (props) => {
    const locations = [
        "24B, Near Anand Hospital, Grand Trunk Road, Ghaziabad",
        "21B, Raja Ram Marg, Madangiri, Delhi",
        "16B, South Extension, Metro Gate Number 3",
        "20B, Home, Aligarh, Uttar Pradesh",
    ]

    return (

        locations.map(function (elem, idx) {
            return <div key={idx} onClick={()=>{
                props.setVehiclePanel(true)
                props.setPanelOpen(false)
            }} className='w-full px-5'>
                <div className='flex border-2 p-3 border-gray-50 active:bg-[#eee] rounded-xl gap-4 items-center my-4 justify-start'>
                    <h2 className='bg-[#eeeeee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-line"></i></h2>
                    <h4 className='font-medium'>{elem}</h4>
                </div> </div>
        })
    )
}

export default LocationSearchPanel
