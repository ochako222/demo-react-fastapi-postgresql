import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

const root = createRoot(document.getElementById('root') as Element);

root.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>
);
