import React from 'react'
import axios from 'axios'
import {Formik, Field, ErrorMessage} from 'formik'  
import * as Yup from 'yup'
import {usePromiseTracker} from "react-promise-tracker"
import Buttons from './product-edit-buttons.jsx'
import {config} from '../../config'
 
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
		.min(3, 'Name is too Short! (Between 3 and 32 characters)')
		.max(32, 'Name is too Long! (Between 3 and 32 characters)')
		.required('Name is required.'),
	price: Yup.number()
		.required('Price is required.')
		.positive('Price most be a positive number.')
		.integer('Price most be an integer.')
		.typeError('You must specify a number.'),
	description: Yup.string()
		.min(3, 'Description is too Short! (Between 3 and 500 characters)')
		.max(500, 'Description is too Long! (Between 3 and 500 characters)')
		.required('Description is required.'),
})

// ****************************************************************************
// ProductEditDetails
// ****************************************************************************

const ProductEditDetails = (props) => (
 
	<div className={"container-product-edit-details"}>
		<LoadingIndicator/>
		<Formik
			enableReinitialize
			validateOnChange={true}
			
			initialValues={{ 
				id: props.values.id, 
				name: props.values.name, 
				price: props.values.price,
				description: props.values.description,
				category_id: props.values.category_id,
				categories: props.values.categories,
				statusMessage: '',
			}}

			validationSchema = {EditSchema}

			onSubmit = {(values, actions) => {
				
				let url = config[0].apiURL + 'product/update.php'
				actions.setSubmitting(false)
				actions.setSubmitting(false)
				actions.setStatus({successMessage: 'The product has successfully updated.'})
			
		
				async function makePostRequest() {

					var params = {
						id: values.id,
						name: values.name,
						price: values.price,
						description: values.description,
						category_id: values.category_id,
					}

					await axios.post(url, params, actions).catch(err => { 
						let statusMessage 
						if (err.response) {
							statusMessage = 'Something went wrong. Please, try it later.'
						} else if (err.request) {
							statusMessage = 'The client never received a response. Please, try it later.'
						} else {
							statusMessage = 'Something went wrong. Please, try it later.'
						}
						
						actions.setStatus({errorMessage: statusMessage})
					})
				}

				makePostRequest()
			}}
		>

			{props  => (
		
				<form onSubmit={props.handleSubmit}>
					{console.log(props)}
					{props.status && props.status.errorMessage &&
						<div>
							<div className="error-message-form ">
								{props.status.errorMessage}
							</div>
							<div className="height-20"></div>
						</div>
					}
					  
					{props.status && props.status.successMessage &&
						<div>
							<div className="success-message-form ">
								{props.status.successMessage}
							</div>
							<div className="height-20"></div>
						</div>
					}
					
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
							<ErrorMessage name="price" component="div" className="error-message-form" />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="description">Description:</label></div>
						<div>
							<Field component="textarea" name="description" id="description" />
							<ErrorMessage name="description" component="div" className="error-message-form" />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="category_id">Category:</label></div>
						<div>
							<Field as="select" name="category_id" id="category_id">
								<Categories categoriesData={props.values.categories} />
							</Field>
						</div>
					</div>
						
					<Buttons />
			 </form>
			 
			)}
	   
		</Formik>
    </div>
 )

export default ProductEditDetails
