import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import SearchForm from '../components/SearchForm/search-form';
import { getEtherscanData } from '../utils/get-etherscan';

const columns = [
  { id: 'txHash', label: 'Txn Hash', minWidth: 170 },
  { id: 'method', label: 'Method', minWidth: 100 },
  {
    id: 'block',
    label: 'Block',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'age',
    label: 'age',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'from',
    label: 'from',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'to',
    label: 'to',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'value',
    label: 'value',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'txFee',
    label: 'txFee',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

// eslint-disable-next-line react/prop-types
export function StickyHeadTable({ rows = [], page, onChangePage }) {
  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice().map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50]}
        component="div"
        rowsPerPage={50}
        count={rows.length || 0}
        page={page || 0}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}

function useEtherscanQuery(address, page = 1) {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    async function getData() {
      let res = [];
      try {
        setError(null);
        setLoading(true);
        res = await getEtherscanData(address, page);
        setData(res);
      } catch (err) {
        // console.log(err);
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Etherscan() {
  const [params, setParams] = React.useState({ page: 1 });
  const { data, loading } = useEtherscanQuery(params.address, params.page);
  return (
    <div>
      <Container maxWidth="lg">
        <SearchForm onSubmit={setParams} />
        <StickyHeadTable
          rows={data}
          onChangePage={(page) => setParams((args) => ({ ...args, page }))}
          page={params.page}
        />
        <Modal open={loading} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <CircularProgress />
          </Box>
        </Modal>
      </Container>
    </div>
  );
}

export default Etherscan;
