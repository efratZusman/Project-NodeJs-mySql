import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import Posts from './Posts/Posts';
import ViewComments from './Posts/ViewComments';
import ViewPhotos from './Album/ViewPhotos';
import Home from './Home/Home';
import PageNotFound from './PageNotFound/PageNotFound';
import Todos from './Todos/Todos';
import Albums from './Album/Album';
import {useUserContext} from './UserContext';

function MyApp() {
  const {userData} = useUserContext();
  const{username}=userData.username;
  if (userData.UserId!='') {
    return ( 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Home />} />
          <Route path={`/user/${username}/home`} element={<Home/>} />
          <Route path={`/user/${username}/todos`} element={<Todos />} />
          <Route path={`/user/${username}/posts`} element={<Posts />} />
          <Route path={`/user/${username}/albums`} element={<Albums />} />
          <Route path={`/user/${username}/post/:postId/comments`} element={<ViewComments />} />
          <Route path={`/user/${username}/album/:albumId/photos`} element={<ViewPhotos/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>  
    );
  }
  else {
    return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
  }
}
export default MyApp;
