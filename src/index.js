import React from 'react';
import ReactDom from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const element = document.getElementById('root');
const root = ReactDom.createRoot(element);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);




