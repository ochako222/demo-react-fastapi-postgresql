import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.scss';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';

import { AuthContext, useAuth } from './context/AuthContext';
import EditPost from './pages/EditPost';
import PostsList from './pages/PostsList';

const App: React.FC = () => {
    const { userId, login, logout } = useAuth();

    const isLoggedIn = userId === process.env.REACT_APP_USER_ID;

    const auth = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn, login, logout]);

    return (
        <AuthContext.Provider value={auth}>
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
        </AuthContext.Provider>
    );
};

export default App;
