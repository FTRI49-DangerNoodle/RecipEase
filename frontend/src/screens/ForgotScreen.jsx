import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { Form, Field } from '../components/hook-form';

import { useNavigate, Link as ReactLink } from 'react-router-dom';

// ----------------------------------------------------------------------

export const ForgotScreenSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

function ForgotScreen() {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: zodResolver(ForgotScreenSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      // const response = await fetch('/forgotpasswordendpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // if (!response.ok) {
      //   setErrorMsg('Email not found');
      //   return;
      // }
      setSuccessMsg('Reset link has been sent to your email');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant='h5'>Forgot Password</Typography>

      <Stack direction='row' spacing={0.5}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {`Have your password?`}
        </Typography>

        <ReactLink variant='subtitle2' to='/login' underline='hover'>
          Sign in
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

      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
        loadingIndicator='Sending...'
      >
        Send reset link
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!successMsg && (
        <Alert severity='success' sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}

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

export default ForgotScreen;
