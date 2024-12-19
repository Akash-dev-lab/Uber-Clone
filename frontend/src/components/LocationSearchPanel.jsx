import PropTypes from 'prop-types';


const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description)
        } else if (activeField === 'destination') {
            setDestination(suggestion.description)
        }
         setVehiclePanel(true)
         setPanelOpen(false)
    }

    return (

        <div>
            {/* Display fetched suggestions */}
            {suggestions.map((elem, idx) => (
                <div
                    key={idx} // Use `place_id` as a unique key if available
                    onClick={() => handleSuggestionClick(elem)}
                    className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
                >
                    <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className="font-medium">{elem.description}</h4> {/* Extract and render description */}
                </div>
            ))}
        </div>
    )
}

LocationSearchPanel.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired, // Suggestion description
            place_id: PropTypes.string,              // Optional unique identifier
        })
    ).isRequired,
    setVehiclePanel: PropTypes.func.isRequired,
    setPanelOpen: PropTypes.func.isRequired,
    setPickup: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired,
    activeField: PropTypes.string.isRequired,
};


export default LocationSearchPanel
