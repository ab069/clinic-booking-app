import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

console.log('=== main.jsx START ===');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', !!rootElement);
  
  const root = ReactDOM.createRoot(rootElement);
  console.log('React root created');

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
  
  console.log('App rendered');
} catch (error) {
  console.error('Error during render:', error);
  document.getElementById('root').innerHTML = `<div style="color: red; padding: 20px; font-size: 18px;">Error loading app: ${error.message}</div>`;
}

console.log('=== main.jsx END ===');
