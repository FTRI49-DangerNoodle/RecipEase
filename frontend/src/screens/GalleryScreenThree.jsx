import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Button,
} from '@mui/material';

const GalleryScreen = () => {
  const [dishes, setDishes] = useState([]);
  //   const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchdishes = async () => {
      try {
        const response = await fetch(
          `http://localhost3000.com/api/recipes/${currentPage}`
        );
        const data = await response.json();
        setDishes(data.dishes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchdishes();
  }, [currentPage]);

  const handleNavigation = (newPage) => {
    setCurrentPage(`/gallery/${newPage}`);
  };

  return (
    <Container>
      <Typography variant='h4'>Recipe Gallery</Typography>(
      <List>
        {dishes.map((recipe) => (
          <ListItem key={recipe._id}>
            <ListItemText primary={recipe.name} />
          </ListItem>
        ))}
      </List>
      )
      <Button
        onClick={() => handleNavigation(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      <Button onClick={() => handleNavigation(currentPage + 1)}>Next</Button>
    </Container>
  );
};

export default GalleryScreen;
