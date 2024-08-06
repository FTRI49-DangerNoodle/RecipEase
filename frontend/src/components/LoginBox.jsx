import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function LoginBox() {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      minHeight='90vh' //height from top
    >
      <Box
        maxWidth={'10rem'}
        component='form'
        sx={{
          p: 3,
          border: '2px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
        }}
        noValidate
        autoComplete='off'
      >
        <Typography variant='h5' gutterBottom sx={{ marginBottom: 2 }}>
          Welcome Back
        </Typography>
        <Stack spacing={2} direction='column' alignItems='center'>
          <TextField
            label='Username'
            type='username'
            id='outlined-required'
            variant='standard'
          />

          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            variant='standard'
            // autoComplete="current-password"
          />
          <div style={{ marginTop: '30px' }}>
            <Button variant='contained'>Log in</Button>
          </div>
          <Typography variant='body2' sx={{ fontSize: '10px' }}>
            New to RecipEase?{' '}
            <ReactLink to='/register' underline='hover'>
              Register here
            </ReactLink>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
