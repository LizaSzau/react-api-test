import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProductsList from './products/products-list'
import CategoriesList from './categories/categories-list'
import About from './about/about.jsx'

export default function App() {
	return (
		<Switch>
			<Redirect exact from='/' to='/products-list' />
			<Route path="/products-list" component={ProductsList} />
			<Route path="/categories-list" component={CategoriesList} />
			<Route path="/about" component={About} />
		</Switch>
	)
}