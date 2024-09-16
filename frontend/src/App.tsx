import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { AuthProvider } from './context/AuthProvider';
import EditPost from './pages/EditPost';
import PostsList from './pages/PostsList';

import './index.scss';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div>
                <Navbar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/about" element={<Home />} />
                        <Route path="/posts" element={<PostsList />} />
                        <Route path="/posts/:id" element={<EditPost />} />
                        <Route path="/posts/new" element={<EditPost />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
};

export default App;
