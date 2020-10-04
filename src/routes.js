import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProductsList from './products/products-list/products-list'
import ProductNew from './products/product-new/product-new'
import ProductView from './products/product-view/product-view'
import ProductEdit from './products/product-edit/product-edit'
import CategoriesList from './categories/categories-list/categories-list'
import CategoryNew from './categories/category-new/category-new'
import CategoryView from './categories/category-view/category-view'
import CategoryEdit from './categories/category-edit/category-edit'
import About from './about/about.jsx'

export default function Routes() {
	return (
		<Switch>
			<Redirect exact from='/' to='/products-list' />
			<Route path="/products-list" component={ProductsList} />
			<Route path="/product/new" component={ProductNew} />
			<Route path="/product/view/:id/:slug" component={ProductView} />
			<Route path="/product/edit/:id/:slug" component={ProductEdit} />
			<Route path="/categories-list" component={CategoriesList} />
			<Route path="/category/new" component={CategoryNew} />
			<Route path="/category/view/:id/:slug" component={CategoryView} />
			<Route path="/category/edit/:id/:slug" component={CategoryEdit} />
			<Route path="/about" component={About} />
		</Switch>
	)
}