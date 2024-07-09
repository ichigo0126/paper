import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { supabase } from './supabase'; // supabaseの正しいインポートを確認してください
import { ChakraProvider } from '@chakra-ui/react';

const Root = () => {
  

  return (
    <React.StrictMode>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!); // 非nullアサーションを使用してnullチェックを回避
root.render(<Root />);