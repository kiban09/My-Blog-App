import React from 'react';
import MuiPagination from '@mui/material/Pagination';

interface PaginationProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, count, onChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onChange}
      color="primary"
      sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default Pagination;
