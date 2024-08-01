export const useAuth = () => {
  const logout = () => {
    localStorage.removeItem('token');
    location.reload();
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return { logout, isAuthenticated };
};
