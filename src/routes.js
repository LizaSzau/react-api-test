import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProductsList from './products/products-list/products-list'
import CategoriesList from './categories/categories-list'
import About from './about/about.jsx'
import ProductView from './products/product-view/product-view'
import ProductNew from './products/product-new/product-new'
import ProductEdit from './products/product-edit/product-edit'

export default function Routes() {
	return (
		<Switch>
			<Redirect exact from='/' to='/products-list' />
			<Route path="/products-list" component={ProductsList} />
			<Route path="/categories-list" component={CategoriesList} />
			<Route path="/about" component={About} />
			<Route path="/product/new" component={ProductNew} />
			<Route path="/product/view/:id/:slug" component={ProductView} />
			<Route path="/product/edit/:id/:slug" component={ProductEdit} />
		</Switch>
	)
}