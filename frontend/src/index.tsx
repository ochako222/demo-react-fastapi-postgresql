import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = createRoot(document.getElementById('root') as Element);

root.render(
    <GoogleOAuthProvider clientId="220384885877-abk6e7gtjivjghdmi69tkd3f326hbggt.apps.googleusercontent.com">
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </GoogleOAuthProvider>
);
