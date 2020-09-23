import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import Table from './products-list-table.jsx'
import Bar from './products-list-bar.jsx'
import StatusMessage from '../main/statusMessage.jsx'
import {config} from '../main/config'
import './products-list.sass'

class ProductsList extends Component {
	constructor(){
		super()

		this.state = {
			products: [],
			paging: [],
			isError: false,
			search: '',
			statusMessage: '',
			apiMessage: '',
		}
	}
  
	componentDidMount() {
		this.getProductsList(config[0].apiURL + 'product/read_paging.php')
	}
	
	getProductsList = (url) => {
		trackPromise(
			axios.get(url)
				.then(res => {
					const products = res.data.records
					const paging = res.data.paging
					this.setState ({
						products: products,
						paging: paging,
						apiMessage: '',
						isError: false,
					})
			})
			.catch(err => { 
				let statusMessage 
				
				if (err.response) {
					// client received an error response (5xx, 4xx)
					if (err.response.status === 404) {
						statusMessage = 'No products found.'
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
		);
	}

    handleClickPageNumber = (url) => {
		this.setState ({
			products: [],
			paging: [],
		})
		this.getProductsList(url)
    }

	handleSubmitSearch = (event) => {
		event.preventDefault()
		let search = event.target.search.value.trim()
		if (search.length > 0)
		{
			this.getProductsList(config[0].apiURL + 'product/search.php?s=' + search)
		} else {
			this.getProductsList(config[0].apiURL + 'product/read_paging.php')
		}
	}


  /*
	removeCharacter = (index) => {
		const {characters} = this.state

		this.setState({
			characters: characters.filter((character, i) => {
				return i !== index
			})
		})
	}

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
    }
	*/
    render() {
        const {products} = this.state
        const {paging} = this.state
        const {statusMessage} = this.state
		
		let table

		if (this.state.isError) {
			table = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			table = <Table productsData={products} pagingData={paging} handleClickPageNumber={this.handleClickPageNumber} />
		}
		
        return (
            <div className="container-main">
                <h1>Products list</h1>
				<Bar handleSubmitSearch={this.handleSubmitSearch} />
				<div className="container">
					{table}
				</div>
            </div>
        )
	}

}

export default ProductsList;
