import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const TestComponent = () => {
  try {
    const auth = useAuth();
    return <div>Auth works: {auth ? 'yes' : 'no'}</div>;
  } catch (error) {
    return <div style={{ color: 'red' }}>Error: {error.message}</div>;
  }
};

export default TestComponent;
