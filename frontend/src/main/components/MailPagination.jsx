import * as React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';

function MailPagination({ range=10, totalCount=0 }) {
  const [page, setPage] = React.useState(1);
  const [refresh, setRefresh] = React.useState(false);
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
  React.useEffect(() => {
    setRefresh(!refresh);
  }, [range, totalCount]);

  const startRow = (page - 1) * rowsPerPage + 1;
  const endRow = Math.min(page * rowsPerPage, totalCount);

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
        {`${startRow}-${endRow} of ${totalCount}`}
      </Typography>
      <IconButton onClick={handlePreviousClick} disabled={page === 1}>
        <ChevronLeftIcon sx={arrowStyling} />
      </IconButton>
      <IconButton onClick={handleNextClick} disabled={page === totalPages}>
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
