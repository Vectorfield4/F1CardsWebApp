import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '@/services/authService';

export const ProtectedRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    return <Navigate to="/login" replace />;
  }

  // Если аутентифицирован, показываем дочерний компонент (запрошенную страницу)
  return <Outlet />;
}; 