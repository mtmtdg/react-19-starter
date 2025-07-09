import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app.component';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
