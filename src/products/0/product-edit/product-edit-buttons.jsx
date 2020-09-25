import React from 'react'
import {NavLink} from 'react-router-dom'

const ProductEditButtonBack = () => {
	return (
		<div className={"container-product-edit-buttons"}>
			<NavLink to="/products-list"><button>Back</button></NavLink>
			<button className={"btn-edit"}>Save</button>
		</div>
	)
}

export default ProductEditButtonBack