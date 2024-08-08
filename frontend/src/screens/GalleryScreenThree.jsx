import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Container, Button, Pagination, Stack } from '@mui/material';

const GalleryScreen = () => {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  //useSeachParams
  useEffect(() => {
    const fetchdishes = async (page) => {
      try {
        const response = await fetch(`/api/recipes/all?page=${page}`, {
          mode: 'no-cors',
        });
        const data = await response.json();
        setDishes(data.recipes);
        setCurrentPage(data.page);
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const page = searchParams.get('page');
    fetchdishes(page);
  }, [searchParams]);

  const handleNavigation = (event, newPage) => {
    setSearchParams({ page: newPage });
  };

  //   const toRecipe = (recipeID) => {
  //     navigate(`/all/${recipeID}`);
  //   };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '0',
      }}
    >
      <Typography variant="h4" sx={{ marginTop: '25px' }}>
        Welcome to RecipEase!
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          //   width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
          //   margin: 0,
        }}
      >
        {dishes.map((recipe) => {
          return (
            <ListItem
              key={recipe._id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                width: '18rem',
                margin: '2rem',
                marginBottom: 0,
              }}
              button
              onClick={() => navigate(`/recipe/${recipe._id}`)}
            >
              <img src={recipe.picture} alt={recipe.name} style={{ width: '17rem', border: '2px solid black' }} />
              <ListItemText primary={recipe.name} component="h5" />
            </ListItem>
          );
        })}
      </List>
      <Stack spacing={2}>
        <Pagination
          count={34}
          color="primary"
          onChange={handleNavigation}
          page={currentPage}
          showFirstButton
          showLastButton
          size="large"
        />
      </Stack>
    </Container>
  );
};

export default GalleryScreen;
