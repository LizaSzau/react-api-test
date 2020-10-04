import React from 'react'
import {NavLink} from 'react-router-dom'

const CategoryViewButtonBack = () => {
	return (
		<div className={"container-product-view-button-back"}>
			<NavLink to="/categories-list"><button>Back</button></NavLink>
		</div>
	)
}

export default CategoryViewButtonBack