import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const defaultValues = {
  address: '',
  page: '',
};
Form.propTypes = {
  onSubmit: PropTypes.func,
};
Form.defaultProps = {
  onSubmit: () => '',
};
function Form({ onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formValues);
    setIsSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <TextField
            id="address-input"
            name="address"
            label="Address"
            type="text"
            required
            value={formValues.address}
            onChange={handleInputChange}
            inputProps={{ 'data-testid': 'etherscan-address' }}
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
            inputProps={{ 'data-testid': 'etherscan-page' }}
          />
        </Grid>
        <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">
          Search
        </Button>
      </Grid>
    </form>
  );
}
export default Form;
