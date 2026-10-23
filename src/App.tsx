import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import BookingCallbackPage from './pages/BookingCallbackPage';
import MyBookingsPage from './pages/MyBookingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminMoviesPage from './pages/AdminMoviesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminMovieFormPage from './pages/AdminMovieFormPage';
import FrontDeskPage from './pages/FrontDeskPage';
import ProtectedRoute from './components/ProtectedRoute';
import StaffRoute from './components/StaffRoute';
import SuperAdminRoute from './components/SuperAdminRoute';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:slug" element={<MovieDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/password/forgot" element={<PasswordRecoveryPage />} />
      <Route path="/reset-password" element={<PasswordRecoveryPage reset />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route
        path="/showtimes/:showtimeId/seats"
        element={
          <ProtectedRoute>
            <SeatSelectionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/:showtimeId"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route path="/booking/callback" element={<BookingCallbackPage />} />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <SuperAdminRoute>
            <AdminDashboardPage />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/admin/movies"
        element={
          <SuperAdminRoute>
            <AdminMoviesPage />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/admin/movies/new"
        element={
          <SuperAdminRoute>
            <AdminMovieFormPage />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/admin/movies/:slug/edit"
        element={
          <SuperAdminRoute>
            <AdminMovieFormPage />
          </SuperAdminRoute>
        }
      />
      <Route
        path="/frontdesk"
        element={
          <StaffRoute>
            <FrontDeskPage />
          </StaffRoute>
        }
      />
    </Routes>
  );
}

export default App;
