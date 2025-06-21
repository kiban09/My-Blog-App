import React from "react";
import MuiButton, { ButtonProps } from "@mui/material/Button";

const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton variant="contained" color="primary" {...props} />;
};

export default Button;
