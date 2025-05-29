// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session/auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Optional: clear other auth context, Redux, etc.

    // Redirect to login after short delay (or immediately)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1000); // 1 second delay to show message

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
      Logging out...
    </div>
  );
}
