import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import lightTheme from './light_theme';  // Import custom light theme
import darkTheme from './dark_theme';  // Import custom dark theme
import { useThemeMode } from './hooks/useThemeMode';  // Import the theme hook  
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout';  // Import the Layout component
import Dashboard from './pages/dashboard';  // Import the Dashboard page  
import Orders from './pages/orders';  // Import the Orders page 
import MenuManagement from './pages/menu_management';  // Import the Menu page 
import LoginPage from './pages/login';
import RegisterPage from './pages/register'; 

function App() {
  const { mode, toggleTheme } = useThemeMode();  // Get the theme mode from custom hook
  // Select the appropriate theme based on the mode
  const theme = mode === 'light' ? lightTheme : darkTheme; 

  return (
    <ThemeProvider theme={theme}>  
      <CssBaseline/> {/* CssBaseline helps normalize and reset default styles */} 
      <Router>
        <AppRoutes toggleTheme={toggleTheme} mode={mode} /> {/* Render routes */}
      </Router>
    </ThemeProvider>  
  );   
}

// Component to manage the routes and layout logic
function AppRoutes ({ toggleTheme, mode }) {
  const location = useLocation();  // Get current route location 
  // Check if the current path is '/login'
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register'; 

  return(
    <>
      {isLoginPage || isRegisterPage ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} /> {/* Login page  */}
          <Route path="/register" element={<RegisterPage />} /> {/* Register page  */} 
        </Routes>
      ) : (
        <Layout toggleTheme={toggleTheme} mode={mode}> {/* Wrap with Layout */}
          <Routes>
            <Route path="/home_dashboard" element={<Dashboard />} /> {/* Dashboard */}
            <Route path="/orders" element={<Orders />} /> {/* Orders */}
            <Route path="/menu_management" element={<MenuManagement />} /> {/* Menu */}
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App; 
