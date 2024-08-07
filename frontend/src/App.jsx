import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
