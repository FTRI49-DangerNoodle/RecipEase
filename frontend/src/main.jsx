import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// import LoginScreenTest from './screens/LoginScreenTest.jsx';
// import ForgotScreen from './screens/ForgotScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      {/* <Route path='/login' element={<LoginScreenTest />} /> */}
      {/* <Route path='/forgot' element={<ForgotScreen />} /> */}
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
