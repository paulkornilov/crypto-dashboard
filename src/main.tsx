import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/ui/button';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Button>123</Button>
  </React.StrictMode>,
);
