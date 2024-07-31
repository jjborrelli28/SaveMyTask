import { useEffect, useState } from 'react';

export const useFetch = (
  url: string | URL | globalThis.Request,
  req?: RequestInit
) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(url, req)
      .then(resp => resp.json())
      .then(res => {
        setResult(res);
      })
      .catch(error => {
        setResult(error);
      });
  }, [url]);

  return result;
};
