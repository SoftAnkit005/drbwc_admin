import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component

/***** Pages ****/
const Dashboard = lazy(() => import('../views/dashboards/Dashboard'));
const Coupon = lazy(() => import('../views/coupon/Coupons'));
const Categories = lazy(() => import('../views/category/Categories'));
const Products = lazy(() => import('../views/product/Products'));
const Attributes = lazy(() => import('../views/attributes/Attributes'));
const Tags = lazy(() => import('../views/tags/Tags'));
const Reviews = lazy(() => import('../views/reviews/Reviews'));
const Orders = lazy(() => import('../views/orders/Orders'));
const Customers = lazy(() => import('../views/customers/Customers'));
const Coupons = lazy(() => import('../views/prmotion/Coupons'));
const Setting = lazy(() => import('../views/setting/Setting'));
const Banner = lazy(() => import('../views/banner/Banner'));
const FeaturedProduct = lazy(() => import('../views/featuredproduct/FeaturedProduct'));
const OrderStatus = lazy(() => import('../views/orders/OrderStatus'));

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

      { path: '/banner', name: 'Banner', exact: true, element: <Banner component={Banner} /> },
      { path: '/products', name: 'Products', exact: true, element: <ProtectedRoute component={Products} /> },
      { path: '/categories', name: 'Categories', exact: true, element: <ProtectedRoute component={Categories} /> },
      { path: '/attributes', name: 'Attributes', exact: true, element: <ProtectedRoute component={Attributes} /> },
      { path: '/featured-product', name: 'Featured Product', exact: true, element: <FeaturedProduct component={FeaturedProduct} /> },
      { path: '/coupons', name: 'Coupons', exact: true, element: <ProtectedRoute component={Coupon} /> },
      { path: '/tags', name: 'Tags', exact: true, element: <ProtectedRoute component={Tags} /> },
      { path: '/reviews', name: 'Reviews', exact: true, element: <ProtectedRoute component={Reviews} /> },
      { path: '/orders', name: 'Orders', exact: true, element: <ProtectedRoute component={Orders} /> },
      { path: '/orders-status', name: 'Orders Status', exact: true, element: <ProtectedRoute component={OrderStatus} /> },
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
