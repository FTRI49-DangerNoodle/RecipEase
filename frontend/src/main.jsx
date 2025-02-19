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
import GalleryScreenThree from './screens/GalleryScreenThree.jsx';
import RecipeScreen from './screens/RecipeScreen.jsx';
import FavoritesScreen from './screens/FavoritesScreen.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<GalleryScreenThree />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/recipe/:id' element={<RecipeScreen />} />
      <Route path='/recipes/all' element={<GalleryScreenThree />} />
      <Route path='/favorite' element={<FavoritesScreen />} />
      <Route path='' element={<PrivateRoute />}></Route>
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
