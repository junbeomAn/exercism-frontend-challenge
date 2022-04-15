import React, { createContext, useState } from 'react';

interface defaultValue {
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export const TotalCountContext = createContext<defaultValue>(
  {} as defaultValue
);

export const TotalCountContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <TotalCountContext.Provider
      value={{
        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </TotalCountContext.Provider>
  );
};
