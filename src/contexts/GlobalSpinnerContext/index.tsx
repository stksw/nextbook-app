import React, { createContext, useContext, useState } from 'react';

const GlobalSpinnerContext = createContext<boolean>(false);
// eslint-disable-next-line
const GlobalSpinnerActionsContext = createContext<React.Dispatch<React.SetStateAction<boolean>>>(
  () => {}
);

// グローバルスピナーの表示・非表示
export const useGlobalSpinnerContext = (): boolean => {
  return useContext(GlobalSpinnerContext);
};

// グローバルスピナーの表示・非表示のアクション
export const useGlobalSpinnerActionsContext = (): React.Dispatch<
  React.SetStateAction<boolean>
> => {
  return useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSpinnerActionsContext,
  );
};

type GlobalSpinnerContextProviderProps = {
  children?: React.ReactNode;
};

const GlobalSpinnerContextProvider = ({
  children,
}: GlobalSpinnerContextProviderProps) => {
  const [globalSpinner, setGlobalSpinner] = useState(false);

  return (
    <GlobalSpinnerContext.Provider value={globalSpinner}>
      <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
