import React from 'react';
import { getEtherscanData } from '../utils/get-etherscan';

export function useEtherscanQuery(address, page = 1) {
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    async function getData() {
      let res = {};
      try {
        setError(null);
        setLoading(true);
        res = await getEtherscanData(address, page);
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (!address) {
      return;
    }
    getData();
  }, [address, page]);
  return { data, error, loading, setData };
}
