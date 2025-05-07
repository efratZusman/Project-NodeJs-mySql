import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './styles/App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Albums from './components/Albums';
import Photos from './components/Photos';
import Comments from './components/Comments';
import Info from './components/Info';
import NotFound from './components/NotFound';
import AuthProvider, { AuthContext } from './components/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home/users/:userId" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/home/users/:userId/info" element={<PrivateRoute><Info /></PrivateRoute>} />
        <Route path="/home/users/:userId/todos" element={<PrivateRoute><Todos /></PrivateRoute>} />
        <Route path="/home/users/:userId/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
        <Route path="/home/users/:userId/albums" element={<PrivateRoute><Albums /></PrivateRoute>} />
        <Route path="/home/users/:userId/albums/:albumId/photos" element={<PrivateRoute><Photos /></PrivateRoute>} />
        <Route path="/home/users/:userId/posts/:postId/comments" element={<PrivateRoute><Comments /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default App

