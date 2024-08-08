import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu, MenuItem, Slide, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, logoutUser } from '../slices/authSlice.js';
import { useDispatch } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  // state for component anchor for AppBar drop-down menu
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);

  // function to handle menu selection from AppBar drop-down menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function to close menu after selection from AppBar drop-down menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginLogoff = (event) => {
    if (userInfo) {
      dispatch(logoutUser(null));
    } else {
      navigate('/');
    }
  };

  // trigger for Slide tags in AppBar to make bar disappear when scrolling down
  const trigger = useScrollTrigger();

  // define theme values to automatically adjust colors when dark theme is detected on system
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196f3',
      },
    },
  });

  // ternary label for login button label
  const loginButton = userInfo ? 'Logout' : 'Login';

  // function to handle state as input is received from search bar on the AppBar
  // const handleState = (input) => {
  //   setSearchTerm(input);
  // };

  return (
    <div className="appbar-outer-container">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="sticky" enableColorOnDark>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  RecipEase
                </Typography>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <Link href="/" style={{ color: 'white', textDiscoloration: 'none' }}>
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                  </Link>
                  <Link href="/past" style={{ color: 'white', textDiscoloration: 'none' }}>
                    <MenuItem href="/past" onClick={handleClose}>
                      Past Recipes
                    </MenuItem>
                  </Link>
                  <Link href="/favorite" style={{ color: 'white', textDiscoloration: 'none' }}>
                    <MenuItem href="/favorite" onClick={handleClose}>
                      Favorite Recipes
                    </MenuItem>
                  </Link>
                  <Link href="/list" style={{ color: 'white', textDiscoloration: 'none' }}>
                    <MenuItem href="/list" onClick={handleClose}>
                      List
                    </MenuItem>
                  </Link>
                </Menu>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search Recipes..."
                    inputProps={{ 'aria-label': 'search' }}
                    // onChange={(e) => handleState(e)}
                  />
                </Search>
                <Button href="/login" color="inherit" onClick={handleLoginLogoff}>
                  {loginButton}
                </Button>
              </Toolbar>
            </AppBar>
          </Slide>
        </Box>
      </ThemeProvider>
    </div>
  );
}
