import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider } from '@tanstack/react-router';
import '@fontsource/lexend/600.css';
import '@fontsource/lexend/700.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/500.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';
import { store } from './store/store';
import { theme } from './theme';
import { router } from './router/router';

// Enables RTK Query's refetchOnFocus/refetchOnReconnect behavior.
setupListeners(store.dispatch);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
