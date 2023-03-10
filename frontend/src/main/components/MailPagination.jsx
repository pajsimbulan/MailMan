import { Box } from '@mui/system';
import * as React from 'react';
import { IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MailPagination = ({ range, totalCount }) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = range; // number of rows to display per page

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePreviousClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (totalCount <= 0) {
    return null;
  }

  const startRow = (page - 1) * rowsPerPage + 1;
  const endRow = Math.min(page * rowsPerPage, totalCount);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
      <Typography sx={{my:'auto', color:'grey', fontSize:14}}>{`${startRow}-${endRow} of ${totalCount}`}</Typography>
      <IconButton onClick={handlePreviousClick} disabled={page === 1}>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton onClick={handleNextClick} disabled={page === totalPages}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default MailPagination;
