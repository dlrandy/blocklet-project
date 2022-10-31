import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const defaultValues = {
  name: '',
  page: 0,
};
Form.propTypes = {
  onSubmit: PropTypes.func,
};
Form.defaultProps = {
  onSubmit: () => '',
};
function Form({ onSubmit }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="address-input"
            name="address"
            label="Address"
            type="text"
            value={formValues.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="page-input"
            name="page"
            label="Page"
            type="number"
            value={formValues.page}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </Grid>
    </form>
  );
}
export default Form;
