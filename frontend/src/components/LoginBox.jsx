import React, { useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function LoginBox() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent default browser submit behvaior, which is to reload the page upon submit. usually first line
    if (!username || !password) {
      setError('Username or password needed.');
      return;
    }
    try {
      const response = await fetch('/authorizationendpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError('Username or password invalid');
        return;
      }
      const res = await response.json();
      localStorage.setItem('token', res.token); //setItem takes in key, and value is the token property on response object from server
      // navigate('/'); //send back to HomeScreen?
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='80vh' //height from top
    >
      <Box
        maxWidth={'20rem'}
        // component='form' //Material UI alternative to using form tags for submission
        // onSubmit={handleSubmit}
        sx={{
          padding: 8,
          paddingBottom: 5,
          border: '2px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
        }}
        noValidate
        autoComplete='off'
      >
        <Typography
          // variant='h5'
          // // gutterBottom
          sx={{ marginBottom: 5, fontSize: '30px' }}
        >
          Welcome Back
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction='column' alignItems='center'>
            <TextField
              label='Username'
              type='text'
              id='outlined-required'
              variant='standard'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              id='outlined-password-input'
              label='Password'
              type='password' //hides input while typing
              variant='standard'
              onChange={(e) => setPassword(e.target.value)}
              // autoComplete="current-password"
            />
            <div style={{ marginTop: '35px', marginBottom: '30px' }}>
              <Button variant='contained' type='submit' sx={{ width: '8rem' }}>
                Log in
              </Button>
            </div>
            <Typography variant='body2' sx={{ fontSize: '13px' }}>
              New to RecipEase?{' '}
              <ReactLink to='/register' underline='hover'>
                Register here
              </ReactLink>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
