import { Provider } from 'jotai';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App } from './app.component';
import { store } from './atoms/store';

hydrateRoot(
  // biome-ignore lint/style/noNonNullAssertion: 没有必要
  document.getElementById('root')!,
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
