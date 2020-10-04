import React from 'react'
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

const CategoryViewDetails = (props) => {
	const {name, description} = props

	return (
		<div className={"container-product-view-details"}>
			<LoadingIndicator/>
			<div className="bar-flex">
				<div>Name:</div>
				<div>{name}</div>
			</div>
			<div className="bar-flex">
				<div>Description:</div>
				<div>{description}</div>
			</div>
		</div>
	)
}

export default CategoryViewDetails