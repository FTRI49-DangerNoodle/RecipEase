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
<<<<<<< HEAD
import GalleryScreen from './screens/GalleryScreen.jsx';
import GalleryScreenTest from './screens/GalleryScreenTest.jsx';
=======
import RecipeScreen from './screens/RecipeScreen.jsx';
import FavoritesScreen from './screens/FavoritesScreen.jsx';

>>>>>>> dev
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
<<<<<<< HEAD
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/gallery' element={<GalleryScreen />} />
      <Route path='/gallerytest' element={<GalleryScreenTest />} />
      <Route path='' element={<PrivateRoute />}></Route>
=======
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/recipe/:id" element={<RecipeScreen />} />
      <Route path="/favorite" element={<FavoritesScreen />} />
      <Route path="" element={<PrivateRoute />}></Route>
>>>>>>> dev
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
