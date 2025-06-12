import { useEffect } from 'react';
import './App.css'
import Layout from './layout/Layout'
import Router from './routes/Router'
import { useAppDispatch } from './store/hooks'
import { authenticateUser } from './features/auth/authApi';
import { login, logout } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();

  // Authenticate user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authenticateUser();
        dispatch(login(user));
      } catch (error) {
        dispatch(logout());
      }
    };

    fetchUser();
  }, [dispatch])

  return (
    <>
      <Layout children={ <Router /> } />
    </>
  )
}

export default App
