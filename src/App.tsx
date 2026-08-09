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
import AdminMovieFormPage from './pages/AdminMovieFormPage';
import FrontDeskPage from './pages/FrontDeskPage';
import ProtectedRoute from './components/ProtectedRoute';
import StaffRoute from './components/StaffRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:slug" element={<MovieDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
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
        path="/admin/movies"
        element={
          <StaffRoute>
            <AdminMoviesPage />
          </StaffRoute>
        }
      />
      <Route
        path="/admin/movies/new"
        element={
          <StaffRoute>
            <AdminMovieFormPage />
          </StaffRoute>
        }
      />
      <Route
        path="/admin/movies/:slug/edit"
        element={
          <StaffRoute>
            <AdminMovieFormPage />
          </StaffRoute>
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
