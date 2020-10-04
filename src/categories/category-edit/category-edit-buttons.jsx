import React from 'react'
import {NavLink} from 'react-router-dom'

const CategoryEditButtonBack = (props) => {
	return (
		<div className={"container-product-edit-buttons"}>
			<NavLink to="/categories-list"><button>Back</button></NavLink>
			<button type="submit" className={"btn-edit"}>Save</button>
		</div>
	)
}

export default CategoryEditButtonBack