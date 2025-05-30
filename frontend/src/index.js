import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SocketProvider } from './context/SocketContext'; // 👈 import this

export const BASE_URL = 'https://mern-chat-backend-9jup.onrender.com';
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <App />
          <Toaster />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
