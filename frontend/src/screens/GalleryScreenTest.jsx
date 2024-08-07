import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Pagination,
} from '@mui/material';

import recipes from ('../assets/data/recipes'); // Ensure this path correctly points to your recipes data file

const GalleryScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4'>Dish Gallery</Typography>
      <List>
        {currentRecipes.map((recipe) => (
          <ListItem key={recipe._id} divider>
            <ListItemText primary={recipe.name} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={paginate}
        color='primary'
        showFirstButton
        showLastButton
      />
    </Container>
  );
};

export default GalleryScreen;
