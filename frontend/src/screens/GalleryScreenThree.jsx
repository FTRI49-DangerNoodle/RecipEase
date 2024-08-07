import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  CircularProgress,
  Button,
} from '@mui/material';

const GalleryScreen = () => {
  const { pageNumber = 1 } = useParams(); // Automatically convert string to number where needed
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://example.com/api/recipes?page=${pageNumber}`
        );
        const data = await response.json();
        setRecipes(data.recipes); // Assuming the response contains an array of recipes
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [pageNumber]);

  const handleNavigation = (newPage) => {
    navigate(`/gallery/${newPage}`);
  };

  return (
    <Container>
      <Typography variant='h4'>Recipe Gallery</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe._id}>
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}
      <Button
        onClick={() => handleNavigation(Math.max(1, pageNumber - 1))}
        disabled={pageNumber <= 1}
      >
        Previous
      </Button>
      <Button onClick={() => handleNavigation(pageNumber + 1)}>Next</Button>
    </Container>
  );
};

export default GalleryScreen;
