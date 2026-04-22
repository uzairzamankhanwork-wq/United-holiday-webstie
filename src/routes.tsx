import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import DestinationsPage from './pages/destinations';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import DestinationDetailPage from './pages/destination/[id]';
import VisaDetailPage from './pages/visa/[id]';
import AdminLoginPage from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// 404 routing by runtime:
// - DEV (preview container / local vite): dev-tools PageNotFound — development iframe vs standalone preview
// - PROD (publish build): pages/_404 — plain 404 for visitors
const NotFoundPage = import.meta.env.DEV
  ? lazy(() => import('../dev-tools/src/PageNotFound'))
  : lazy(() => import('./pages/_404'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/destinations',
    element: <DestinationsPage />,
  },
  {
    path: '/destination/:id',
    element: <DestinationDetailPage />,
  },
  {
    path: '/visa/:id',
    element: <VisaDetailPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/destinations' | '/destination/:id' | '/visa/:id' | '/about' | '/contact' | '/admin/login' | '/admin/dashboard';

export type Params = Record<string, string | undefined>;
