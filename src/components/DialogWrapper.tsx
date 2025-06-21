import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

interface DialogWrapperProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Submit",
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWrapper;
