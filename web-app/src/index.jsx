import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Routes } from './Routes';

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.unregister();
