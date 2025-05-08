import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPostPage from './pages/BlogPostPage';
import BlogListPage from './pages/BlogListPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={<BlogListPage />} />
        <Route path="/post/:id" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;