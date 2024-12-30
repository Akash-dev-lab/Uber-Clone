import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  
  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 200) {
          localStorage.removeItem('token'); // Clear token on successful logout
          navigate('/captain-login'); // Redirect to captain login page
        }
      } catch (error) {
        console.error('Error during captain logout:', error.response || error.message);
        localStorage.removeItem('token'); // Clear token even if there's an error
        navigate('/captain-login'); // Redirect to captain login page
      }
    };

    // Call the logout function
    logout();
  }, [token, navigate]);

  return null; // Render nothing
};

export default CaptainLogout;
