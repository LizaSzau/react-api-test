import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import {config} from '../../config'
import StatusMessage from '../../main/statusMessage.jsx'
import ProductViewDetails from './product-view-details.jsx'
import ButtonBack from './product-view-button-back.jsx'
import './product-view.sass'

class ProductView extends Component {

	constructor(){
		super()

		this.state = {
			name: '',
			description: '',
			price: '',
			category_name: '',
			statusMessage: '',
		}
	}
	
	componentDidMount () {
		const {id} = this.props.match.params
		let url = config[0].apiURL + 'product/read_one.php?id=' + id

		trackPromise(
			axios.get(url)
				.then(res => {
					const name = res.data.name
					const description = res.data.description
					const price = res.data.price
					const category_name = res.data.category_name
					this.setState ({
						name: name,
						description: description,
						price: price,
						category_name: category_name,
						statusMessage: '',
						isError: false,
					})
			})
			.catch(err => { 
				let statusMessage 
				
				if (err.response) {
					// client received an error response (5xx, 4xx)
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
	
    render() {
        const {name} = this.state
        const {price} = this.state
        const {description} = this.state
        const {category_name} = this.state
        const {statusMessage} = this.state
		
		let product

		if (this.state.isError) {
			product = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			product = <ProductViewDetails name={name} price={price} description={description} category_name={category_name} />
		}
		
        return (
            <div className="container-main">
                <h1>View product</h1>
				<div className="container">
					{product}
				</div>
				<ButtonBack />
            </div>
        )
	}

}

export default ProductView
