import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import {
  Logo,
  Dashboard,
  Track,
  Chat,
  Toys,
  SocialMedia,
  BadgeIndicator,
  AlarmBell,
  Badge,
  Avatar,
  VerticalNavMenu,
  ActiveNav,
} from './headerIcons';

const Header = () => {
  const location = useLocation();

  const isCurrentTab = (tab: string) => {
    return location.pathname === `/${tab}`;
  };

  const capitalize = (s: string) => `${s[0].toUpperCase()}${s.slice(1)}`;

  const getPageTabs = (
    tabs: string[],
    icons: React.FunctionComponent<React.SVGProps<SVGSVGElement>>[]
  ) => {
    return icons.map((IconElement, i) => (
      <li className='relative flex space-x-16px'>
        {WithActiveTab(
          <IconElement
            stroke={`${isCurrentTab(tabs[i]) ? '#fff' : '#5c5589'}`}
          />,
          isCurrentTab(tabs[i])
        )}
        <NavLink to={tabs[i]} className={`h-nav-tab leading-24px`}>
          {({ isActive }) => (
            <span
              className={`font-semibold text-md ${
                isActive ? `text-label-default` : `text-label-secondary`
              }`}
            >
              {capitalize(tabs[i])}
            </span>
          )}
        </NavLink>
      </li>
    ));
  };
  return (
    <>
      <div className='w-full h-header flex items-center  '>
        <Link to='/'>
          <Logo className='ml-32px' />
        </Link>
        <nav className='w-full flex items-center justify-between'>
          <ul className='flex items-center ml-[43.48px] space-x-32px'>
            {getPageTabs(
              ['dashboard', 'tracks', 'mentoring', 'contribute'],
              [Dashboard, Track, Chat, Toys]
            )}
          </ul>
          <ul className='flex mr-44px items-center'>
            <li>
              <SocialMedia className='cursor-pointer' />
            </li>
            <li className='ml-40px'>
              <BadgeIndicator className='cursor-pointer' />
            </li>
            <li
              className='relative ml-48px w-icon-big h-icon-md flex justify-center items-center rounded-outer shadow-alarm-bell'
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #FFF4E3',
              }}
            >
              <AlarmBell className='cursor-pointer' />
              <div className='absolute -top-8px -right-12px w-24px h-24px px-8px py-2px text-center text-sm font-semibold text-white leading-24px rounded-circle bg-alert'>
                2
              </div>
            </li>
            <li className='relative ml-48px'>
              <Badge className='cursor-pointer' />
              <div className='absolute -top-8px -right-7px w-21px h-21px px-8px py-2px leading-24px rounded-circle bg-alert border-3 border-white'></div>
            </li>
            <li className='ml-48px'>
              <Avatar className='cursor-pointer' />
            </li>
            <li className='ml-16px'>
              <VerticalNavMenu className='cursor-pointer' />
            </li>
          </ul>
        </nav>
      </div>
      <div className='w-full border border-dark-border-grey'></div>
    </>
  );
};

export default Header;

function WithActiveTab(Element: React.ReactElement, active: boolean) {
  return (
    <>
      {Element}
      {active && (
        <ActiveNav className='absolute -top-[19px] -left-[37px] -z-10' />
      )}
    </>
  );
}
