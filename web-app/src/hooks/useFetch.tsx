import React from 'react';

import { API_URL } from '../constants';
import { FetchStatus } from '../types';

/**
 * Used to handle the fetch logic by automatically keeping track of the status,
 * any errors and storing the data.
 */
export function useFetch<T>() {
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);

  const fetchRequest = async ({
    body,
    endpoint,
    method = 'GET',
  }: {
    body?: string;
    endpoint?: string;
    method?: string;
  }) => {
    setStatus(FetchStatus.PENDING);
    setData(undefined);
    setError('');

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(response.statusText);

      const responseData = await response.json();

      setData(responseData);
      setStatus(FetchStatus.DONE);

      return responseData as T;
    } catch (error) {
      setError(error.message);
      setStatus(FetchStatus.ERROR);
    }
  };

  return { fetchRequest, data, error, status, setStatus };
}
