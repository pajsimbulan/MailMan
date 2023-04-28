import * as React from 'react';
import {
  IconButton, Box, Toolbar, InputAdornment,
  TextField, Menu, Typography, Avatar, useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { UserContext } from '../../App';
import MailDrawerNavigation from './MailDrawerNavigation';

function MailAppBar({ currentInbox, selectedInbox, setQuery }) {
  const { userInfo } = React.useContext(UserContext);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const isLessThan500 = useMediaQuery('(max-width:500px)');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchFieldFocused, setSearchFieldFocused] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const searchFieldRef = React.useRef(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    setQuery(searchText);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      PaperProps={{
        style: {
          borderRadius: 10,
          border: 'solid',
          borderWidth: 3,
          borderColor: '#e6f6ff',
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{
        mx: 2, mb: 2, mt: 1, display: 'flex', flexDirection: 'column',
      }}
      >
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}>
          <Typography
            sx={{ color: '#0067b8', '&:hover': { cursor: 'pointer', color: '#338feb' } }}
            onClick={() => {
              handleMenuClose();
              localStorage.removeItem('mailman_accesstoken');
              localStorage.removeItem('mailman_userinfo');
              navigate('/');
            }}
          >
            {' '}
            Sign Out
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
          <Avatar
            sx={{ width: 60, height: 60, '&:hover': { cursor: 'pointer' } }}
            alt={userInfo.name}
            src={userInfo.avatar ? `data:image/jpeg;base64,${userInfo.avatar}` : null}
            onClick={() => {
              handleMenuClose();
              navigate('/profile');
            }}
          />
          <Box sx={{ ml: 4 }}>
            <Typography sx={{ fontWeight: 'bold' }}>{`${userInfo.firstName} ${userInfo.lastName}`}</Typography>
            <Typography>{userInfo.email}</Typography>
            <Typography
              sx={{
                fontWeight: 'bold', fontSize: '15px', color: '#0067b8', my: 'auto', overflow: 'hidden', '&:hover': { cursor: 'pointer', color: '#338feb' },
              }}
              onClick={() => {
                handleMenuClose();
                navigate('/profile');
              }}
            >
              Manage Profile
            </Typography>
          </Box>
        </Box>
      </Box>
    </Menu>
  );

  return (
    <Box sx={{
      borderBottom: 'solid',
      borderColor: '#C6CED6',
      borderBottomLeftRadius: 40,
      borderWidth: 5,
      bgcolor: 'white',
    }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
          {isSmallScreen ? (
            <MailDrawerNavigation
              currentInbox={currentInbox}
              selectedInbox={selectedInbox}
            />
          )
            : null}
          <TextField
            size={isSmallScreen ? 'small' : 'medium'}
            inputProps={{
              style: (isLessThan500 ? { fontSize: 10 } : { fontSize: 14 }),
            }}
            sx={{
              my: 1.5,
              ml: 2,
              width: '80%',
              borderRadius: 3,
              bgcolor: '#EBF5FF',
              mr: 1,
              maxWidth: 700,
              fieldset: { borderWidth: 0, m: 0 },
              input: { color: '#002159' },
              '& .MuiOutlinedInput-root.Mui-focused': {
                '& > fieldset': {
                  borderRadius: 3, borderColor: '#338FEB', fontSize: '30px',
                },
              },
            }}
            InputProps={{
              endAdornment:
  <InputAdornment position="start">
    {' '}
    <IconButton
      aria-label="search emails"
      onClick={handleSearch}
      edge="end"
    >

      <SearchIcon sx={{ color: '#002159' }} />
    </IconButton>
    {' '}
  </InputAdornment>,
            }}
            ref={searchFieldRef}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onFocus={() => setSearchFieldFocused(true)}
            onBlur={() => setSearchFieldFocused(false)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && searchFieldFocused) {
                event.preventDefault();
                searchFieldRef.current.querySelector('input').blur();
                handleSearch();
              }
            }}
          />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'flex' }, gap: 2 }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              height: 50, width: 50, border: 'solid', borderWidth: 2, borderColor: '#EBF5FF', my: 'auto', '@media (max-width: 500px)': { height: 30, width: 30 },
            }}
          >
            <Avatar sx={{ '@media (max-width: 500px)': { height: 30, width: 30 } }} src={userInfo.avatar ? `data:image/jpeg;base64,${userInfo.avatar}` : null} />
          </IconButton>
        </Box>

      </Toolbar>
      {renderMenu}
    </Box>
  );
}

MailAppBar.propTypes = {
  currentInbox: PropTypes.string.isRequired,
  selectedInbox: PropTypes.func.isRequired,
};

export default MailAppBar;
