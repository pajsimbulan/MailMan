import * as React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';

function MailPagination({
  range = 10, totalCount = 0, currentPage, changePage,
}) {
  const totalPages = Math.ceil(totalCount / range);

  const handlePreviousClick = () => {
    changePage(currentPage - 1);
  };

  const handleNextClick = () => {
    changePage(currentPage + 1);
  };

  if (totalCount <= 0) {
    return null;
  }

  const startRow = (currentPage - 1) * range + 1;
  const endRow = Math.min(currentPage * range, totalCount);
  const arrowStyling = { '@media (max-width: 800px)': { height: 20, width: 20 } };

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', flexWrap: 'wrap', m: 1, '@media (max-width: 400px)': { m: 0.5 },
    }}
    >
      <Typography sx={{
        my: 'auto',
        color: 'grey',
        fontSize: 14,
        '@media (max-width: 800px)': { fontSize: 12 },
        '@media (max-width: 500px)': { fontSize: 10 },
      }}
      >
        {totalCount ? (`${startRow}-${endRow} of ${totalCount}`) : ('')}
      </Typography>
      <IconButton onClick={handlePreviousClick} disabled={currentPage === 1}>
        <ChevronLeftIcon sx={arrowStyling} />
      </IconButton>
      <IconButton onClick={handleNextClick} disabled={currentPage === totalPages}>
        <ChevronRightIcon sx={arrowStyling} />
      </IconButton>
    </Box>
  );
}

MailPagination.propTypes = {
  range: PropTypes.number,
  totalCount: PropTypes.number,
};

export default MailPagination;
