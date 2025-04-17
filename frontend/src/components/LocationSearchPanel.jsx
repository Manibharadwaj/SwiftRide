import React from 'react';

const LocationSearchPanel = ({
  suggestions = [],
  setPanelOpen,
  setVehiclePanel,
  setPickup,
  setDestination,
  activeField
}) => {
  return (
    <div className='p-4'>
      {suggestions.length > 0 ? suggestions.map((location, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (activeField === 'pickup') setPickup(location);
            else if (activeField === 'destination') setDestination(location);
          }}
          className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'
        >
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium'>{location}</h4>
        </div>
      )) : (
        <p className='text-gray-500 text-sm text-center mt-4'>No suggestions found</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
