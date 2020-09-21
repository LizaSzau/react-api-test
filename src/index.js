import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import MenuMain from './main/menu-main'
import App from './app'
import './index.sass';
import './loader.sass';

render(
	<BrowserRouter>
		<MenuMain />
		<App />
	</BrowserRouter>,
	document.querySelector('#root')
)