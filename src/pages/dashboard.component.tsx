import { useAtomValue } from 'jotai';

import { userAtom } from '@/atoms/auth.atoms';
import { authService } from '@/services/auth.service';

export function Dashboard() {
  const user = useAtomValue(userAtom);

  const handleLogout = async () => {
    await authService.logout();
  };

  const containerStyle = {
    padding: '2rem',
  };

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '4px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      <h1>Dashboard</h1>
      <h2>Welcome, {user?.name || user?.email}!</h2>

      <div style={cardStyle}>
        <h3>User Info:</h3>
        <p>ID: {user?.id}</p>
        <p>Email: {user?.email}</p>
        <p>Name: {user?.name}</p>
      </div>

      <button type='button' style={logoutButtonStyle} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
