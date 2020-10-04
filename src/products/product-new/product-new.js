import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import {config} from '../../config'
import StatusMessage from '../../main/statusMessage.jsx'
import ProductNewForm from './product-new-form.jsx'
import '../product-edit/product-edit.sass'

class ProductNew extends Component {

	constructor(){
		super()

		this.state = {
			categories: [],
			statusMessage: '',
		}
	}
	
// ****************************************************************************
// ComponentDidMount
// ****************************************************************************

	componentDidMount () {
		let url_categories = config[0].apiURL + 'category/read.php'
		this.getCategoriesList(url_categories)
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
		const categories = this.state.categories

		let product

		if (this.state.isError) {
			product = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			product = <ProductNewForm categories={categories} handleSubmitEdit={this.handleSubmitEdit} />
		}
	
        return (
            <div className="container-main">
                <h1>New product</h1>
				<div className="container">
					{product}
				</div>
            </div>
        )
	}
}

export default ProductNew
