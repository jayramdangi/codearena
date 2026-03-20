import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { SocketProvider } from './context/SocketContext';
import { store } from './store';
import App from './app/App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);