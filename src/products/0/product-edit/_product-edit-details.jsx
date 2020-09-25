import React from 'react'
import {usePromiseTracker} from "react-promise-tracker"
import Buttons from './product-edit-buttons.jsx'

// ****************************************************************************
// LoadingIndicator
// ****************************************************************************

const LoadingIndicator = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && 
		<div className={"loader-top"}>
			<div className={"loader-1"}></div>
		</div>
	);	
}

// ****************************************************************************
// Categories
// ****************************************************************************

const Categories = (props) => {
	const rows = props.categoriesData.map((row, index) => {
		return (
			<option value={row.id} key={index}>{row.name}</option>
		)
	})

	return rows
}

// ****************************************************************************
// LoadingIndicator
// ****************************************************************************

const ProductEditDetails = (props) => {
	const {values} = props

	const name = values.name
	const price = values.price
	const description = values.description
	const category_id = values.category_id
	const categoriesData = values.categories

	return (
		<div className={"container-product-edit-details"}>
			<LoadingIndicator/>
			<form onSubmit={props.handleSubmitEdit}>
				<div className="bar-flex">
					<div>Name:</div>
					<div>
						<input type="text" value={name} id="name" onChange={props.handleInputChange} required />
					</div>
				</div>
				<div className="bar-flex">
					<div>Price:</div>
					<div>
						<input type="number" value={price} id="price" onChange={props.handleInputChange} required />
					</div>
				</div>
				<div className="bar-flex">
					<div>Description:</div>
					<div>
						<textarea value={description} id="description" onChange={props.handleInputChange} required />
					</div>
				</div>
				<div className="bar-flex">
					<div>Category:</div>
					<div>
						<select value={category_id} id="category_id" onChange={props.handleInputChange}>
							<Categories categoriesData={categoriesData} />
						</select>
					</div>
				</div>
				<Buttons />
			</form>	
		</div>
	)
}

export default  ProductEditDetails = styled.input`
  border-color: ${props => props.validationFailed ? "red" : "transparent";
`;