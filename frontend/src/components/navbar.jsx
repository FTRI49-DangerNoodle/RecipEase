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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
  // state for search term
  const [searchTerm, setSearchTerm] = useState('');
  // state to populate options for Autcomplete searchbox in AppBar
  const [options, setOptions] = useState([]);

  const [recipeCache, setRecipeCache] = useState([]);

  // function to populate options array with recipes for Autocomplete in AppBar search
  const fetchRecipes = async () => {
    const fetchData = await fetch(
      'http://www.localhost:3000/api/recipes/names-ids'
    );
    const fetchedRecipes = await fetchData.json();
    fetchedRecipes.map((arr, idx) => {
      setOptions([...options, arr.name]);
      setRecipeCache([...recipeCache, arr]);
    });
    console.log('opt', options);
    console.log('rc', recipeCache);
  };

  // useEffect to populate recipes on initial page render
  useEffect(() => {
    if (!options) fetchRecipes();
  }, []);

  // test search options array
  // const allOptions = [
  //   '66b3d41d81883b581167fc6c',
  //   '66b3d41d81883b581167fc6d',
  //   '66b3d41d81883b581167fc6e',
  //   '66b3d41d81883b581167fc6f',
  // ];

  // useNavigate function to route search request to paginated data for chosen recipe
  const navigate = useNavigate();
  // function to handle search logic after input submission
  const handleSubmit = async (recipe) => {
    navigate(`api/recipes/${recipe.id}`);
  };

  // update state in real-time based on search box input
  useEffect(() => {
    if (searchTerm) console.log(searchTerm);
  }, [searchTerm]);

  // function to handle menu selection from AppBar drop-down menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function to close menu after selection from AppBar drop-down menu
  const handleClose = () => {
    setAnchorEl(null);
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

  // state for search function
  // const [searchTerm, setSearchTerm] = useState(null);

  // state for login button on AppBar
  const [loggedIn, setLoggedIn] = useState(null);

  // ternary label for login button label
  const loginButton = loggedIn ? 'Logout' : 'Login';

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
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    href="/"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem oncClick={handleClose}>Home</MenuItem>
                  </Link>
                  <Link
                    href="/past"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem onSelect="/past" onClick={handleClose}>
                      Past Recipes
                    </MenuItem>
                  </Link>
                  <Link
                    href="/favorite"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem href="/favorite" onClick={handleClose}>
                      Favorite Recipes
                    </MenuItem>
                  </Link>
                  <Link
                    href="/list"
                    style={{ color: 'white', textDiscoloration: 'none' }}
                  >
                    <MenuItem href="/list" onClick={handleClose}>
                      List
                    </MenuItem>
                  </Link>
                </Menu>
                <SearchIcon />
                <Autocomplete
                  freesolo="true"
                  inputValue={searchTerm}
                  onInputChange={(event, newInputValue) => {
                    setSearchTerm(newInputValue);
                  }}
                  onSubmit={() => handleSubmit(searchTerm)}
                  options={options}
                  disablePortal
                  id="recipe-search"
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Recipe Search" />
                  )}
                />
                <Button href="/login" color="inherit">
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
