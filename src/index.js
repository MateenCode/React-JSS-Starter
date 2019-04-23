import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';

import store from 'stores';
import ServeProvider from './ServeProvider';

import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render((
    <Provider store={store}>
      <ServeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ServeProvider>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
