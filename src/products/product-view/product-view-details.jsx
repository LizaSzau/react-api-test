import React from 'react'
import NumberFormat from 'react-number-format'
import {usePromiseTracker} from "react-promise-tracker"

const LoadingIndicator = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && 
		<div className={"loader-top"}>
			<div className={"loader-1"}></div>
		</div>
	);	
}

const ProductViewDetails = (props) => {
	const {name, price, description, category_name} = props

	return (
		<div className={"container-product-view-details"}>
			<LoadingIndicator/>
			<div className="bar-flex">
				<div>Name:</div>
				<div>{name}</div>
			</div>
			<div className="bar-flex">
				<div>Price:</div>
				<NumberFormat className={"number-format"} value={price} thousandSeparator={true} prefix={'$'} />
			</div>
			<div className="bar-flex">
				<div>Description:</div>
				<div>{description}</div>
			</div>
			<div className="bar-flex">
				<div>Category:</div>
				<div>{category_name}</div>
			</div>
		</div>
	)
}

export default ProductViewDetails