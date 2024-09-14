import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.scss';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { AuthProvider } from './context/AuthProvider';

const App: React.FC = () => {
    // const { userId, login, logout } = useAuth();

    // const isLoggedIn = userId === process.env.REACT_APP_USER_ID;

    // const auth = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn, login, logout]);

    return (
        <AuthProvider>
            <div>
                <Navbar />
                <BrowserRouter>
                    <Routes>
                        {/* <Route path="/" element={<Navigate to="/posts" />} /> */}
                        <Route path="/about" element={<Home />} />
                        {/* <Route path="/posts" element={<PostsList />} />
                        <Route path="/posts/:id" element={<EditPost />} />
                        <Route path="/posts/new" element={<EditPost />} /> */}
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
};

export default App;
