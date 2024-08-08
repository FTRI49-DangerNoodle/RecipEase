import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Pagination,
} from '@mui/material';

import recipes from '../assets/data/recipes'; //GalleryScreenTest is for this static array only

const GalleryScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dishesPerPage = 2;

  const lastDishindex = currentPage * dishesPerPage; //index of last dish to dispaly
  const firstDishindex = lastDishindex - dishesPerPage; //index of first dish to dsipaly
  const pageOfDishes = recipes.slice(firstDishindex, lastDishindex);

  const totalPages = Math.ceil(recipes.length / dishesPerPage); //total pages needed, rounded up

  const paginate = (event, value) => {
    //changes page number
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant='h4'>Dish Gallery</Typography>
      <List>
        {pageOfDishes.map((recipe) => (
          <ListItem key={recipe._id}>
            <ListItemText primary={recipe.picutre} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={paginate}
        color='primary' //blue
        showFirstButton
        showLastButton
      />
    </Container>
  );
};

export default GalleryScreen;
