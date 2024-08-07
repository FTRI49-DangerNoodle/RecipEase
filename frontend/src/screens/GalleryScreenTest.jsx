import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
const recipesData = require('../assets/data/recipes');

const GalleryScreen = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipesData.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Simulate fetching data
      setLoading(false);
    }, 500);
  }, []);

  const totalPages = Math.ceil(recipesData.length / recipesPerPage);

  return (
    <Container maxWidth='sm' style={{ marginTop: '20px' }}>
      <Typography variant='h4' style={{ marginBottom: '20px' }} color='primary'>
        Dish Gallery
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {currentRecipes.map((recipe) => (
            <ListItem key={recipe._id} divider>
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={paginate}
        color='primary'
        showFirstButton
        showLastButton
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default GalleryScreen;
