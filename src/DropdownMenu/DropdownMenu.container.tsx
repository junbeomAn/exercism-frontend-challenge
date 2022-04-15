import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';

import DropdownMenuItem from '../DropdownMenuItem/DropdownMenuItem.container';
import { TotalCountContext } from '../contexts/totalCountContext';
import Axios from '../utils/request';

import { ReactComponent as ChevronDownSm } from '../assets/images/chevron-down-sm.svg';
import AllTrack from '../assets/images/all-track.svg';

import { ITrack, ITrackFilter } from '../common/entities';
import { IDropdownMenu, ITracksResponse } from './DropdownMenu.entity';

const DropdownMenu = ({
  track: currentTrack,
  trackCounts,
  setFilterStateValue,
}: IDropdownMenu) => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>('All');
  const { totalCount } = useContext(TotalCountContext);

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
    setIsOpen(!isOpen);
  };

  const handleItemClick = useCallback(
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

  const dropdownTracks = useMemo(
    () =>
      tracks.map(({ title, slug, icon_url }) => (
        <DropdownMenuItem
          handleItemClick={() => handleItemClick({ slug, icon_url })}
          title={title}
          slug={slug}
          icon_url={icon_url}
          checked={slug === checked}
          trackCount={trackCounts[slug]}
        />
      )),
    [tracks, handleItemClick, trackCounts, checked]
  );

  return (
    <div id='dropdown' className='relative'>
      <button onClick={handleOpen} className='flex items-center'>
        <img
          className='w-icon-big h-icon-big'
          src={currentTrack.icon_url || AllTrack}
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
              handleItemClick={() =>
                handleItemClick({ slug: 'All', icon_url: AllTrack })
              }
              title='All'
              slug='All'
              icon_url={AllTrack}
              checked={'All' === checked}
              trackCount={totalCount}
            />
            {dropdownTracks}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
