import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';

const DataTransferContext = createContext();

/**
 * @function DataTransferProvider
 * @description Provides a context for transferring data between pages.
 * @param {ReactNode} children - The children components.
 * @returns {ReactElement} The DataTransferProvider component.
 */
export const DataTransferProvider = ({ children }) => {
  const [redirectedInfos, setRedirectedInfos] = useState(null);
  const [data, setData] = useState(null);
  const route = useRouter();

  /**
   * @function transferData
   * @description Transfers data and handles page redirection.
   * @param {Object} params - The parameters for data transfer.
   * @param {string} params.redirect - The path to redirect to.
   * @param {any} params.data - The data to be transferred.
   * @returns {void}
   */
  const transferData = ({ redirect, data: newData }) => {
    const redirected_infos = {
      to: redirect,
      from: route.asPath,
    };
    setRedirectedInfos(redirected_infos);
    setData(newData);
    route.push(redirect);
  };

  /**
   * @function cleanData
   * @description Cleans the saved data.
   * @returns {void}
   */
  const cleanData = () => {
    setData(null);
  };

  return (
    <DataTransferContext.Provider
      value={{
        redirected_infos: redirectedInfos,
        data,
        transferData,
        cleanData,
      }}
    >
      {children}
    </DataTransferContext.Provider>
  );
};

/**
 * @function useDataTransferContext
 * @description Returns the context values for data transfer.
 * @returns {{data: Object, transferData: Function}} The context values.
 */
export const useDataTransferContext = () => {
  return useContext(DataTransferContext);
};
