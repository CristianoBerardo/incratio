import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
