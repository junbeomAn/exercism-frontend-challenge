import React, { useEffect, useRef } from 'react';

// not used

const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  return firstRender.current;
};

export default useFirstRender;
