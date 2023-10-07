'use client';
import { isEmpty } from '@/common/functions';
import { Events } from '@/services/axios';
import { mainReducer } from '@/store/slices/mainSlice';
import { useAppSelector } from '@/store/store';
import { createPopper } from '@popperjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './SelectSector.scss';

interface ICurrentSector {
  nameRu: string;
  nameEn: string;
  nameKz: string;
  typeId: number;
  availableSeatsCount: number;
}

const SelectSector = () => {
  const { hall, selectedSession, sector } = useAppSelector(
    ({ mainReducer }) => mainReducer
  );

  const svgTest = useRef<HTMLDivElement | null>(null);
  const [currentSector, setCurrentSector] = useState<ICurrentSector | null>(
    null
  );
  const dispatch = useDispatch();

  const sectorClick = async (e: any) => {
    const sessionSectorId = e.target?.getAttribute('sessionSectorId');
    const sectorAlreadySelected = sessionSectorId === sector?.sectorId;
    if (sectorAlreadySelected) {
      // dispatch(mainReducer.actions.setPaymentStep(activeStepIndex + 1));
    } else {
      await Events()
        .get(
          `Sessions/places?sessionId=${selectedSession?.id}&sectorId=${sessionSectorId}`
        )
        .then(({ data }) => {
          dispatch(
            mainReducer.actions.setSector({
              sectorId: sessionSectorId,
              ...data,
            })
          );
          if (data.scheme === 'typeIdOne') {
            dispatch(mainReducer.actions.setServiceGroups(data.places[0]));
          } else if (data.scheme !== 'typeIdOne') {
            dispatch(mainReducer.actions.setServiceGroups([]));
          }
          dispatch(
            mainReducer.actions.setCustomServiceGroups(data.customServiceGroups)
          );
          dispatch(mainReducer.actions.setSectorLegend(data.sectorLegend));
          if (!sectorAlreadySelected) {
            dispatch(mainReducer.actions.setTickets([]));
            dispatch(mainReducer.actions.setTotalAmount(0));
          }
          // dispatch(mainReducer.actions.setPaymentStep(activeStepIndex + 1));
        });
    }
  };

  const showTooltipOnSector = (event: MouseEvent) => {
    const targetSeat = event.target as HTMLElement;
    if (targetSeat instanceof HTMLElement) {
      const tooltip = document.querySelector('#tooltip-sector');
      if (tooltip instanceof HTMLElement) {
        createPopper(targetSeat, tooltip, {
          placement: 'top',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        });

        tooltip.setAttribute('data-show', '');
        const sessionSectorId = targetSeat.getAttribute('sessionSectorId');
        const needSector = hall?.sectors?.find(
          (el: any) => el.id === sessionSectorId
        );
        setCurrentSector(needSector);
      }
    }
  };

  const hideTooltip = () => {
    const tooltip = document.querySelector('#tooltip-sector');
    if (tooltip) tooltip.removeAttribute('data-show');
  };

  const getScheme = (initialScheme: string) => {
    if (svgTest?.current?.hasChildNodes())
      svgTest?.current?.removeChild(svgTest.current?.children[0]);
    let newScheme;
    if (isEmpty(initialScheme)) {
      newScheme = `<table><tbody><tr><td><div class="space" classname="space"></div></td></tr></tbody></table>`;
    } else {
      newScheme = initialScheme;
    }
    const parsedScheme = new DOMParser().parseFromString(
      newScheme,
      'text/html'
    );
    const firstChild = parsedScheme.body.firstChild;
    const testScheme = firstChild
      ? (firstChild.cloneNode(true) as HTMLElement)
      : null;
    if (testScheme) {
      testScheme.querySelectorAll('path').forEach((element) => {
        hall?.sectors?.forEach((sector: any) => {
          let isSectorRegistred =
            sector.sectorId === element.getAttribute('sector-id');
          if (isSectorRegistred) {
            element.setAttribute('sessionSectorId', sector.id);
          }
        });
      });
      testScheme.querySelectorAll('path').forEach((element) => {
        const sessionSectorId = element.getAttribute('sessionSectorId');
        const needSector = hall?.sectors?.find(
          (el: any) => el.id === sessionSectorId
        );
        const isSectorNotEmpty = needSector?.availableSeatsCount > 0;
        element.setAttribute('fill', isSectorNotEmpty ? 'green' : 'gray');

        const clickHandler = async (e: MouseEvent) => {
          if (isSectorNotEmpty) {
            await sectorClick(e);
          }
        };

        if (!isMobile) {
          element.addEventListener('mouseover', showTooltipOnSector);
          element.addEventListener('mouseout', hideTooltip);
        }
        element.addEventListener('click', clickHandler);
        element.style.cursor = isSectorNotEmpty ? 'pointer' : 'not-allowed';
        svgTest?.current?.appendChild(testScheme);
      });
    }
  };

  useEffect(() => {
    if (hall) {
      if (hall.hallGraphicScheme) {
        getScheme(hall.hallGraphicScheme);
      }
    }
  }, [selectedSession, hall, svgTest, sector]);

  if (hall.hallGraphicScheme) {
    return (
      <div id='SelectSectorCompoment'>
        <div className='LocationInfo flex flex-col items-center'>
          <span>Место проведения: {hall?.locationTitleRu}</span>
          <span>Зал: {hall?.hallTitleRu}</span>
        </div>
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className='SvgTools'>
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
              </div>
              <TransformComponent
                wrapperClass='SvgWrapper'
                contentStyle={{ width: '100%' }}
              >
                <div
                  ref={svgTest}
                  style={{ width: '100%' }}
                  className='svg-container'
                  id='svg-container'
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
        <div id='tooltip-sector' className='tooltip-open'>
          <div id='tooltip_select'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {isEmpty(currentSector?.nameRu) ? null : (
                <span>{currentSector?.nameRu}</span>
              )}
              <span>
                sectorType :{' '}
                {currentSector?.typeId === 2 ? 'tribuneSeat' : 'standingPlace'}
              </span>
              <span>
                {currentSector?.typeId === 2
                  ? 'Доступных мест'
                  : 'balanceCount'}
                : {currentSector?.availableSeatsCount ?? 0}
              </span>
            </div>
          </div>
          <div id='arrow' data-popper-arrow></div>
        </div>
      </div>
    );
  }
};

export default SelectSector;
