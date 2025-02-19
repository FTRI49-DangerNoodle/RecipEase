import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAddFavoriteMutation } from '../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { selectFavs, selectUser } from '../slices/authSlice.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Item = ({ item }) => {
  const [addFavorite, { isAddFavLoading }] = useAddFavoriteMutation();

  const toggleFavorite = async () => {
    try {
      const res = await addFavorite({
        recipeId: item._id,
      }).unwrap();
    } catch (error) {
      // if (error.originalStatus === 200 || error.data === 'Favorites updated successfully') {
      //   console.log('success');
      // }
      console.log(error);
    }
  };

  return (
    <div
      className="item"
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '8px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h2>{item.name}</h2>
        <Link to={`/recipe/${item._id}`}>
          <img
            src={item.picture}
            alt={item.name}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Link>
        <p>{item.catagory + ', ' + item.cuisine}</p>
      </div>
      <IconButton onClick={toggleFavorite} color={'error'}>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

const FavoritesScreen = () => {
  let favorites = useSelector(selectFavs);
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate('/login');
  }, [userInfo]);

  if (!favorites) favorites = [];

  return (
    <div className="favorites-container" style={{ padding: '16px' }}>
      <h1>Favorites</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {favorites.map((item) => (
          <li key={item._id}>
            <Item item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesScreen;
