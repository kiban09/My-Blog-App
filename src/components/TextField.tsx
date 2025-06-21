import React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <MuiTextField
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default TextField;
