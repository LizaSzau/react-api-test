import React from 'react'
import axios from 'axios'
import {Formik, Field, ErrorMessage} from 'formik'  
import * as Yup from 'yup'
import {usePromiseTracker} from "react-promise-tracker"
import Buttons from './category-new-buttons.jsx'
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
// Validation
// ****************************************************************************

const EditSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Name is too Short! (Between 3 and 32 characters)')
		.max(32, 'Name is too Long! (Between 3 and 32 characters)')
		.required('Name is required.'),
	description: Yup.string()
		.min(3, 'Description is too Short! (Between 3 and 500 characters)')
		.max(500, 'Description is too Long! (Between 3 and 500 characters)')
		.required('Description is required.'),
})

// ****************************************************************************
// CategoryNewDetails
// ****************************************************************************

const CategoryNewForm = (props) => (
	<div className={"container-product-edit-details"}>
		<LoadingIndicator/>
		<Formik
			enableReinitialize
			validateOnChange={true}
				
			initialValues={{ 
				name: '', 
				description: '',
				statusMessage: '',
			}}

			validationSchema = {EditSchema}

			onSubmit = {(values, actions) => {
				
				let url = config[0].apiURL + 'category/create.php'
				actions.setSubmitting(false)

				actions.setStatus({successMessage: 'The ' + values.name + ' has successfully added.'})
			
				async function makePostRequest() {

					var params = {
						name: values.name,
						description: values.description,
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
					
					<div className="bar-flex">
						<div><label htmlFor="name">Name:</label></div>
						<div>
							<Field name="name" id="name" maxLength="32" />
							<ErrorMessage name="name" component="div" className="error-message-form" onBlur={e => {props.setStatus({successMessage: null}) }} />
						</div>
					</div>
					<div className="bar-flex">
						<div><label htmlFor="description">Description:</label></div>
						<div>
							<Field component="textarea" name="description" id="description" />
							<ErrorMessage name="description" component="div" className="error-message-form" onBlur={e => {props.setStatus({successMessage: null}) }} />
						</div>
					</div>

					{props.status && props.status.errorMessage &&
						<div>
							<div className="error-message-form ">
								{props.status.errorMessage}
							</div>
						</div>
					}
					  
					{props.status && props.status.successMessage &&
						<div>
							<div className="success-message-form ">
								{props.status.successMessage}
							</div>
						</div>
					}
					
					<Buttons />
			 </form>
			 
			)}
	   
		</Formik>
    </div>
 )

export default CategoryNewForm
