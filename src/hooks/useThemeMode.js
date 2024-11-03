import { useState, useEffect } from 'react';

export const useThemeMode = () => {
    const [mode,setMode] = useState(()=>{
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });     
    // We use an initial function inside useState to load the user's theme preference from localStorage when the hook is first run.
    // If no theme preference is found in localStorage, the default 'light' theme is used.
    
    useEffect(()=>{
        localStorage.setItem('theme',mode);
    },[mode]);
    // Runs whenever the mode value changes.
    // Saves the theme mode (either 'dark' or 'light') in the browser's localStorage so it persists across page reloads.
    
    //Whenever the user switches themes, the new theme mode is saved in localStorage.
    // This ensures that the next time the page is loaded, the theme mode will match the user’s last selected theme.

    // Function to toggle theme 
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));  
    }; 

    return { mode, toggleTheme };    // The hook returns an object containing: mode, toggleTheme
};  