import { mainReducer } from '@/store/slices/mainSlice';
import { useAppSelector } from '@/store/store';
import { UUID } from 'crypto';
import React, { useState } from 'react';

interface ISectorLegendItem {
  nameEn: string;
  nameKz: string;
  nameRu: string;
  serviceBalanceCount: null | number;
  serviceCount: number;
  serviceGroupColor: string;
  serviceGroupId: UUID;
  serviceMaxCost: number;
  serviceMinCost: number;
  services: [];
  sessionServiceGroupId: UUID;
}

const SectorLegend: React.FC = () => {
  const { sectorLegend } = useAppSelector(({ mainReducer }) => mainReducer);

  const defaultLegend = [
    {
      color: '#D9D9D9',
      key: 0,
      text: 'Выбрано',
    },
    {
      color: '#7D7D7D',
      key: 1,
      text: 'Занято',
    },
  ];

  return (
    <div className='grid grid-cols-3 gap-2 lg:mt-4 lg:grid-cols-6'>
      {defaultLegend.map((legend) => {
        return (
          <div
            key={legend.key}
            className='flex items-center justify-between rounded-full border px-3 py-1.5 shadow-2xl'
          >
            <div
              style={{ background: legend.color }}
              className={`h-4 w-4 rounded-full border`}
            ></div>
            <div>{legend.text}</div>
          </div>
        );
      })}

      {sectorLegend.map((legend: ISectorLegendItem) => {
        const doesServiceHasSameMaxAndMinCost =
          legend.serviceMaxCost === legend.serviceMinCost;

        const maxCost = legend.serviceMaxCost.toLocaleString('en-US');
        const minCost = legend.serviceMinCost.toLocaleString('en-US');
        return (
          <div
            className='flex items-center justify-between rounded-full border px-3 py-1.5 shadow-2xl'
            key={legend.sessionServiceGroupId}
          >
            <div
              style={{ background: legend.serviceGroupColor }}
              className={`h-4 w-4 rounded-full border`}
            ></div>
            <div>
              {doesServiceHasSameMaxAndMinCost
                ? `${minCost}₸`
                : `${minCost}₸ - ${maxCost}₸`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectorLegend;
