import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from '../hooks/use-boolean';

import { Iconify } from '../components/iconify';
import { Form, Field } from '../components/hook-form';

import { Link as ReactLink, useNavigate } from 'react-router-dom'; //to /register path

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

function LoginScreenTest() {
  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();
  const navigate = useNavigate();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const response = await fetch('/authorizationendpoint', {
        //to replace endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setErrorMsg('Username or password invalid');
        return;
      }
      const res = await response.json();
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant='h5'>Sign in to your account</Typography>

      <Stack direction='row' spacing={0.5}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {`Don't have an account?`}
        </Typography>

        <ReactLink variant='subtitle2' to='/register' underline='hover'>
          Get started
        </ReactLink>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text
        name='email'
        label='Email address'
        InputLabelProps={{ shrink: true }}
      />

      <Stack spacing={1.5}>
        <Link
          component={ReactLink}
          to='/forgot'
          variant='body2'
          color='inherit'
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

        <Field.Text
          name='password'
          label='Password'
          placeholder='6+ characters'
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={password.onToggle} edge='end'>
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
        loadingIndicator='Sign in...'
      >
        Sign in
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      <Alert severity='info' sx={{ mb: 3 }}>
        Use <strong>{defaultValues.email}</strong>
        {' with password '}
        <strong>{defaultValues.password}</strong>
      </Alert>

      {!!errorMsg && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}

export default LoginScreenTest;
