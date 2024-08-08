import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const Item = ({ item, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);

  const toggleFavorite = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    onFavoriteToggle(item.id, newFavoriteStatus);
  
    try {
      if (newFavoriteStatus) {
        await fetch(`/api/favorites/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({ itemId: item.id }),
        });
      } else {
        await fetch(`/api/favorites/remove/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setIsFavorite(!newFavoriteStatus); // Revert if the API call fails
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
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <p>{item.description}</p>
      </div>
      <IconButton onClick={toggleFavorite} color={isFavorite ? 'primary' : 'default'}>
        {isFavorite ? <Star /> : <StarBorder />}
      </IconButton>
    </div>
  );
};

const FavoritesScreen = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Recipe 1', imageUrl: 'https://via.placeholder.com/150', description: 'Delicious recipe 1', isFavorite: true },
    { id: 2, name: 'Recipe 2', imageUrl: 'https://via.placeholder.com/150', description: 'Delicious recipe 2', isFavorite: true },
    { id: 3, name: 'Recipe 3', imageUrl: 'https://via.placeholder.com/150', description: 'Delicious recipe 3', isFavorite: true },
  ]);

  const handleFavoriteToggle = (id, isFavorite) => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && !isFavorite)));
  };

  return (
    <div className="favorites-container" style={{ padding: '16px' }}>
      <h1>Favorites</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id}>
            <Item item={item} onFavoriteToggle={handleFavoriteToggle} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesScreen;
