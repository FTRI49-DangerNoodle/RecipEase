import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu, MenuItem, Slide, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, logoutUser } from '../slices/authSlice.js';
import { useDispatch } from 'react-redux';

export default function SearchAppBar() {
  // state for boolean value to ensure fetch is done only when page is rendered
  const [cacheLoaded, setCacheLoaded] = useState(false);

  // state for component anchor for AppBar drop-down menu
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);

  // state for search term
  const [searchTerm, setSearchTerm] = useState('');

  // state to populate options for Autcomplete searchbox in AppBar
  const [options, setOptions] = useState([]);
  const optionArr = [];

  // state to populate cache for containing all recipes data from fetch
  const [recipeCache, setRecipeCache] = useState([]);
  const recipeCacheArr = [];

  // function to populate options array with recipes for Autocomplete in AppBar search
  const fetchRecipes = async () => {
    const fetchData = await fetch('api/recipes/names-ids', {
      mode: 'no-cors',
    });
    const fetchedRecipes = await fetchData.json();
    fetchedRecipes.map((arr, idx) => {
      recipeCacheArr.push(arr);
      optionArr.push(arr.name);
    });
    setOptions(optionArr);
    setRecipeCache(recipeCacheArr);
  };

  const checkCache = () => {
    if (cacheLoaded === false) {
      setCacheLoaded(true);
      fetchRecipes();
    }
  };

  useEffect(() => checkCache, []);

  // function to handle search logic after input submission
  const handleSubmit = (recipe) => {
    let redirect;
    for (let i = 0; i < recipeCache.length; i++) {
      if (recipeCache[i].name === recipe) {
        redirect = recipeCache[i]._id;
        navigate(`/recipe/${redirect}`);
        break;
      }
    }
  };

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
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    href="/"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                  </Link>
                  <Link
                    href="/past"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem onClick={handleClose}>Past Recipes</MenuItem>
                  </Link>
                  <Link
                    href="/favorite"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem onClick={handleClose}>Favorite Recipes</MenuItem>
                  </Link>
                  <Link
                    href="/api/recipes/all"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem onClick={handleClose}>All Recipes</MenuItem>
                  </Link>
                </Menu>
                <SearchIcon />
                <Autocomplete
                  freesolo="true"
                  inputValue={searchTerm}
                  onInputChange={(event, newInputValue) => {
                    setSearchTerm(newInputValue);
                  }}
                  onSelect={(ev) => {
                    {
                      handleSubmit(searchTerm);
                      ev.preventDefault();
                    }
                  }}
                  options={options}
                  disablePortal
                  id="recipe-search"
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Recipe Search" />
                  )}
                />
                <Button
                  href="/login"
                  color="inherit"
                  onClick={handleLoginLogoff}
                >
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
