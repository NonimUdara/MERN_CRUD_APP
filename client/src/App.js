import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PostDetails from './components/PostDetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/add" element={<CreatePost/>}/>
            <Route path="/edit/:id" element={<EditPost />}/>
            <Route path="/post/:id" element={<PostDetails/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
};