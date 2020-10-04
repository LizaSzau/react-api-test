import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import {config} from '../../config'
import StatusMessage from '../../main/statusMessage.jsx'
import ProductEditForm from './product-edit-form.jsx'
import '../../main/sass-common/edit.sass'

class ProductEdit extends Component {

	constructor(){
		super()

		this.state = {
			id: '',
			name: '',
			description: '',
			price: '',
			category_id: '',
			category_name: '',
			categories: [],
			statusMessage: '',
		}
	}
	
// ****************************************************************************
// ComponentDidMount
// ****************************************************************************

	componentDidMount () {
		const {id} = this.props.match.params
		
		let url_product = config[0].apiURL + 'product/read_one.php?id=' + id
		this.getProductDetails(url_product)
		
		let url_categories = config[0].apiURL + 'category/read.php'
		this.getCategoriesList(url_categories)
	}
	
// ****************************************************************************
// GetProductDetails
// ****************************************************************************

	getProductDetails = (url) => {
		trackPromise(
			axios.get(url)
				.then(res => {
					const id = res.data.id
					const name = res.data.name
					const description = res.data.description
					const price = res.data.price
					const category_id = res.data.category_id
					const category_name = res.data.category_name
					this.setState ({
						id: id,
						name: name,
						description: description,
						price: price,
						category_id: category_id,
						category_name: category_name,
						statusMessage: '',
						isError: false,
					})
			})
			.catch(err => { 
				let statusMessage 
				
				if (err.response) {
					if (err.response.status === 404) {
						statusMessage = 'No product found.'
					} else {
						statusMessage = 'Something went wrong. Please, try it later.'
					}
				} else if (err.request) {
					statusMessage = 'The client never received a response. Please, try it later.'
				} else {
					statusMessage = 'Something went wrong. Please, try it later.'
				}

				this.setState ({
					isError: true,
					statusMessage: statusMessage
				})
			})
		)		
    }
	
// ****************************************************************************
// GetCategoriesList
// ****************************************************************************

	getCategoriesList = (url) => {
		trackPromise(
			axios.get(url)
				.then(res => {
					const categories = res.data.records
					
					this.setState ({
						categories: categories,
					})
			})
			.catch(err => { 
				let statusMessage 
				
				if (err.response) {
					if (err.response.status === 404) {
						statusMessage = 'No category found.'
					} else {
						statusMessage = 'Something went wrong. Please, try it later.'
					}
				} else if (err.request) {
					statusMessage = 'The client never received a response. Please, try it later.'
				} else {
					statusMessage = 'Something went wrong. Please, try it later.'
				}

				this.setState ({
					isError: true,
					statusMessage: statusMessage
				})
			})
		)		
    }
	
// ****************************************************************************
// HandleInputChange
// ****************************************************************************

    handleInputChange = (event) => {
		this.setState({ [event.target.id]: event.target.value })
    }
	
// ****************************************************************************
// Render
// ****************************************************************************

    render() {
        const {statusMessage} = this.state
		const values = this.state

		let product

		if (this.state.isError) {
			product = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			product = <ProductEditForm values={values} handleSubmitEdit={this.handleSubmitEdit} />
		}
	
        return (
            <div className="container-main">
                <h1>Edit product</h1>
				<div className="container">
					{product}
				</div>
            </div>
        )
	}

}

export default ProductEdit
