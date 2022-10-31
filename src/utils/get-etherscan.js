import axios from '../libs/api';

const getEtherscanData = async (address, page = 1) => {
  const { data } = await axios.get(`/api/txs?a=${address}&page=${page}`);

  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { getEtherscanData };
