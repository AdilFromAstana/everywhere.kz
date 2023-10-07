'use client';

import EventList from '@/app/components/MainPage/EventList/EventList';
import Header from '@/app/components/Header/Header';
import Head from 'next/head';
import * as React from 'react';
import InlineCalendar from '@/app/components/MainPage/InlineCalendar/InlineCalendar';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const lg = 'lg:mx-0';

  return (
    // <main className={`mx-4 ${lg}`}>
    <main className='flex h-full flex-col justify-between'>
      <InlineCalendar />
      <EventList />
    </main>
  );
}
