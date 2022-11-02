import * as React from 'react';

import Container from '@mui/material/Container';

import Loading from '../components/Loading/loading';
import StickyHeadTable from '../components/Table/table';
import SearchForm from '../components/SearchForm/search-form';

import { useEtherscanQuery } from '../hooks/etherscan';

const columns = [
  { id: 'txHash', label: 'Txn Hash', maxWidth: 170 },
  { id: 'method', label: 'Method', maxWidth: 100 },
  {
    id: 'block',
    label: 'Block',
    maxWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'age',
    label: 'age',
    maxWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'from',
    label: 'from',
    maxWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'to',
    label: 'to',
    maxWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'value',
    label: 'value',
    maxWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'txFee',
    label: 'txFee',
    maxWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function Etherscan() {
  const [params, setParams] = React.useState({ page: 0, address: '' });
  const { data, loading } = useEtherscanQuery(params.address, params.page);
  return (
    <div>
      <Container maxWidth="lg">
        <SearchForm onSubmit={setParams} />
        <StickyHeadTable
          rows={data.data}
          columns={columns}
          count={data.pages}
          onChangePage={(page) => setParams((args) => ({ ...args, page }))}
          page={params.page}
        />
        <Loading open={loading} />
      </Container>
    </div>
  );
}

export default Etherscan;
