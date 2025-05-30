import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from './redux/userSlice';
import io from 'socket.io-client';
import { useSocket } from './context/SocketContext'; // React context for socket
import { BASE_URL } from '.';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const socketRef = useSocket();

  useEffect(() => {
    if (authUser && !socketRef.current) {
      // Connect socket with userId query param
      socketRef.current = io(BASE_URL, {
        query: { userId: authUser._id },
      });

      // Listen for online users list from backend
      socketRef.current.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }

    return () => {
      // Cleanup socket connection on logout or component unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authUser, dispatch, socketRef]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
