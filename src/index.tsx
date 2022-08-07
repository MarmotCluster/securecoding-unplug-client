import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

const root: ReactDOM.Root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
