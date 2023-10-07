import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  const linkList = [
    {
      title: 'Возврат билетов',
      link: '/refund',
    },
    {
      title: 'Политика конфиденциальности',
      link: '/refund',
    },
    {
      title: 'Kazticket.kz',
      link: '/aboutUs',
    },
    {
      title: 'Все права защищены',
      link: '',
    },
  ];

  const lgFooterWrapper =
    '-mx-20 grid-cols-[25%_auto] gap-y-6 bg-[#1E3E85] px-16 py-8';

  return (
    <footer className={`${lgFooterWrapper} hidden lg:grid`}>
      {linkList.map((item: { title: string; link: string }) => {
        return (
          <Link
            href={item.link}
            key={item.title}
            className='w-fit text-lg text-white opacity-50'
          >
            {item.title}
          </Link>
        );
      })}
    </footer>
  );
};

export default Footer;
