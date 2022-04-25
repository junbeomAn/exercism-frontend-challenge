import { useState } from 'react';
import { AxiosRequestConfig, Method } from 'axios';
import Axios from 'utils/request';

// not used

const useAxios = <T extends {}>(
  url: string,
  method: Method = 'get',
  config?: AxiosRequestConfig
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<T>({} as T);

  const getData = async (params?: string) => {
    setIsLoading(true);
    try {
      const response = await Axios.request<T>({
        ...config,
        method,
        url: url + params,
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to load data. Please try it again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { getData, error, isLoading, data };
};

export default useAxios;
