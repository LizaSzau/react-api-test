import React from 'react'
import {usePromiseTracker} from "react-promise-tracker"
import Buttons from './product-edit-buttons.jsx'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
 
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
// Validation
// ****************************************************************************

const EditSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Too Short! (Between 3 and 32 characters)')
		.max(32, 'Too Long! (Between 3 and 32 characters)')
		.required('Required field!'),
});

// ****************************************************************************
// ProductEditDetails
// ****************************************************************************

const ProductEditDetails = (props) => {
	const {values} = props
	const categoriesData = values.categories
	
	return (
		<div className={"container-product-edit-details"}>
			<LoadingIndicator />
			
			<Formik
				enableReinitialize
				initialValues={{
					name: values.name,
					price: values.price,
					description: values.description,
					category_id: values.category_id
				}}
				validationSchema = {EditSchema}
					onSubmit = {values => {
					// same shape as initial values
					console.log();
			   }}
			>
	 
			{({ errors, touched }) => (

				<form onSubmit={props.handleSubmitEdit}>
					<div className="bar-flex">
						<div><label htmlFor="name">Name:</label></div>
						<div>
							<Field name="name" id="name" maxLength="32"/>
							<ErrorMessage name="name" component="div" className="error-message-form" />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="price">Price:</label></div>
						<div>
							<Field name="price" id="price" />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="description">Description:</label></div>
						<div>
							<Field component="textarea" name="description" id="description" />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="category_id">Category:</label></div>
						<div>
							<Field as="select" name="category_id" id="category_id">
								<Categories categoriesData={categoriesData} />
							</Field>
						</div>
					</div>
					<Buttons />
				</form>	

			)}

			</Formik>
		</div>
	)
}

export default ProductEditDetails