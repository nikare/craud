import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import 'purecss';

import { App } from 'App';
import { store } from 'store';

const Root = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

ReactDOM.createRoot(rootEl).render(Root);
