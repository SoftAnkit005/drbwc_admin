import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component

/***** Pages ****/
import Dashboard from '../views/dashboards/Dashboard';
import AddProducts from '../views/product/AddProducts';
import AddCoupon from '../views/coupon/AddCoupon';
import Categories from '../views/category/Categories';
import Products from '../views/product/Products';
import Attributes from '../views/attributes/Attributes';
import Tags from '../views/tags/Tags';
import Reviews from '../views/reviews/Reviews';
import Orders from '../views/orders/Orders';
import Customers from '../views/customers/Customers';
import Coupons from '../views/prmotion/Coupons';
import Setting from '../views/setting/Setting';

/****Layouts*****/
const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

/***** Check if User is Logged In ****/
const isUserLoggedIn = localStorage.getItem('authToken') !== null;

/***** Routes Configuration *****/
const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to={isUserLoggedIn ? "/dashboard" : "/auth/login"} /> },
      { path: '/dashboard', name: 'Dashboard', exact: true, element: <ProtectedRoute component={Dashboard} /> },
      { path: '/add-product', name: 'Add Products', exact: true, element: <ProtectedRoute component={AddProducts} /> },
      { path: '/add-coupon', name: 'Add Coupon', exact: true, element: <ProtectedRoute component={AddCoupon} /> },
      { path: '/products', name: 'Products', exact: true, element: <ProtectedRoute component={Products} /> },
      { path: '/categories', name: 'Categories', exact: true, element: <ProtectedRoute component={Categories} /> },
      { path: '/attributes', name: 'Attributes', exact: true, element: <ProtectedRoute component={Attributes} /> },
      { path: '/tags', name: 'Tags', exact: true, element: <ProtectedRoute component={Tags} /> },
      { path: '/reviews', name: 'Reviews', exact: true, element: <ProtectedRoute component={Reviews} /> },
      { path: '/orders', name: 'Orders', exact: true, element: <ProtectedRoute component={Orders} /> },
      { path: '/customers', name: 'Customers', exact: true, element: <ProtectedRoute component={Customers} /> },
      { path: '/coupons', name: 'Coupons', exact: true, element: <ProtectedRoute component={Coupons} /> },
      { path: '/setting', name: 'Setting', exact: true, element: <ProtectedRoute component={Setting} /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'register', element: <RegisterFormik /> },
      { path: 'login', element: <LoginFormik /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
    ],
  },
];

export default ThemeRoutes;
