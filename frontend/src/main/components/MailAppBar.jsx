import * as React from 'react';
import { styled, alpha, useTheme  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function EmailAppBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  console.log('app bar render');
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
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
      <MenuItem onClick={() => {
        handleMenuClose();
        navigate('/'); }}>
          Sign Out
      </MenuItem>

      <MenuItem onClick={() => {
        handleMenuClose();
        navigate('/profile'); }}>
          Profile
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{  borderBottom: 'solid', borderWidth:'1px', borderColor:'#C6CED6', borderBottomLeftRadius:40, borderWidth:5, bgcolor:'white'}}>
        <Toolbar >
          <Box sx={{flexGrow: 1}}>
            <TextField
            sx={{ my: 1.5, ml:5,width: '80ch', borderRadius:3, bgcolor:'#EBF5FF', fieldset:{borderWidth:0, m:0}, input: { color: '#002159'},  "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
          borderRadius:3, borderColor:'#338FEB'
      }
    }  }}
            InputProps={{
              startAdornment: <InputAdornment position="start"> <SearchIcon sx={{color:'#002159'}}/> </InputAdornment>,
            }}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'flex' }, gap:2}}>
          <IconButton
          size="large"
          aria-label="set light mode or dark mode"
          aria-haspopup="true"
          color="inherit"
          onClick={() => {setDarkMode(!darkMode); console.log(theme.palette.mode)}}
        >
          {darkMode?<LightModeOutlinedIcon sx={{color:'#002159'}}/> : <DarkModeOutlinedIcon sx={{color:'#002159'}}/>}
        </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{color:'#002159'}}/>
            </IconButton>
          </Box>
          
        </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
