import React from 'react';
import './index.sass';
import './loader.sass';
import ReactDOM from 'react-dom';
import Index from './index/Index.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
