'use client';
import React from 'react';

const CityDropdown: React.FC = () => {
  const cityList = [
    { id: 0, name: 'Астана' },
    { id: 1, name: 'Алматы' },
    { id: 2, name: 'Шымкент' },
    { id: 3, name: 'Туркестан' },
  ];

  return (
    <div id='cityDropdownTooltip' className='cityDropdownItem lg:w-2/12'>
      {cityList.map((city: { id: number; name: string }) => {
        return (
          <div
            key={city.id}
            className='w-full self-start border-b p-3 text-lg transition duration-500 ease-in-out hover:bg-gray-200'
            onClick={() => alert(city.name)}
          >
            {city.name}
          </div>
        );
      })}
      <div id='arrow' data-popper-arrow></div>
    </div>
  );
};

export default CityDropdown;
