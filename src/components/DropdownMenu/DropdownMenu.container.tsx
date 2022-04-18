import React, { useState, useEffect, useMemo, useCallback } from 'react';

import DropdownMenuItem from 'components/DropdownMenuItem/DropdownMenuItem.container';

import Axios from 'utils/request';

import { ReactComponent as ChevronDownSm } from 'assets/images/chevron-down-sm.svg';
import AllTrack from 'assets/images/all-track.svg';

import { ITrack, ITrackFilter } from 'common/entities';
import { IDropdownMenu, ITracksResponse } from './DropdownMenu.entity';

const DropdownMenu = ({
  track: currentTrack,
  trackCounts,
  setFilterStateValue,
}: IDropdownMenu) => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>('All');

  const getTracks = async () => {
    try {
      const res = await Axios.get<ITracksResponse>(`/tracks`);
      setTracks(res.data.tracks);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  const handleOpen = (_: React.MouseEvent) => {
    setIsOpen((open) => !open);
  };

  const handleItemChange = useCallback(
    (t: ITrackFilter) => {
      const newTtrack: ITrackFilter = {
        slug: t.slug !== 'All' ? t.slug : '',
        icon_url: t.icon_url,
      };
      setFilterStateValue({ track: newTtrack });
      setChecked(t.slug);
      setIsOpen(false);
    },
    [setFilterStateValue]
  );

  const dropdownTracks = useMemo(
    () =>
      tracks.map(({ title, slug, icon_url }) => (
        <DropdownMenuItem
          key={slug}
          handleItemChange={() => handleItemChange({ slug, icon_url })}
          title={title}
          icon_url={icon_url}
          checked={slug === checked}
          trackCount={trackCounts[slug]}
        />
      )),
    [tracks, handleItemChange, trackCounts, checked]
  );

  useEffect(() => {
    // handling dropdown closing methods
    const escapeListener = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      setIsOpen(false);
    };
    const outerClickListener = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('#dropdown');
      if (el) {
        return;
      }
      setIsOpen(false);
    };

    window.addEventListener('keyup', escapeListener);
    window.addEventListener('click', outerClickListener);

    return () => {
      window.removeEventListener('keyup', escapeListener);
      window.removeEventListener('click', outerClickListener);
    };
  }, []);

  useEffect(() => {
    getTracks();
  }, []);

  const totalTrackCounts = useMemo(
    () => Object.values(trackCounts).reduce((sum, count) => sum + count, 0),
    [trackCounts]
  );

  return (
    <div id='dropdown' data-testid='dropdown' className='relative'>
      <button onClick={handleOpen} className='flex items-center'>
        <img
          className='w-icon-big h-icon-big'
          src={currentTrack?.icon_url || AllTrack}
          alt={'current-track'}
        />
        <ChevronDownSm className='ml-12px' />
      </button>
      {isOpen && (
        <div
          className={`absolute top-56px w-dropdown h-dropdown rounded-outer p-8px bg-white shadow-container z-10`}
        >
          <ul className='w-full h-full overflow-y-auto'>
            <DropdownMenuItem
              handleItemChange={() =>
                handleItemChange({ slug: 'All', icon_url: AllTrack })
              }
              title='All'
              icon_url={AllTrack}
              checked={'All' === checked}
              trackCount={totalTrackCounts}
            />
            {dropdownTracks}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
