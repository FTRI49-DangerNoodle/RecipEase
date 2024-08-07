import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchAppBar from 'src/components/navbar.jsx';

function App() {
  return (
    <>
      <CssBaseline />
      <SearchAppBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
