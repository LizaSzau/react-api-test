import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import Table from './products-list-table.jsx'
import Bar from './products-list-bar.jsx'
import ModalDelete from './products-list-delete.jsx'
import StatusMessage from '../../main/statusMessage.jsx'
import {config} from '../../config'
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
			showModal: false,
			showDelete: false,
			showDeleteOK: false,
			delID: 0,
			delName: ''
		}
	}
  
	componentDidMount() {
		let url

		if (sessionStorage.getItem("url")) {
			url = sessionStorage.getItem("url")
		} else {
			url = config[0].apiURL + 'product/read_paging.php'
		}

		if (sessionStorage.getItem("search")) {
			this.setState ({
				search: sessionStorage.getItem("search"),
			})
		}
	
		sessionStorage.setItem('url', url)
		this.getProductsList(url)
	}
	
// ****************************************************************************
// GetProductsList
// ****************************************************************************

	getProductsList = (url) => {
		trackPromise(
			axios.get(url)
				.then(res => {
					const products = res.data.records
					const paging = res.data.paging
					this.setState ({
						products: products,
						paging: paging,
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
		)
	}

// ****************************************************************************
// HandleClickPageNumber
// ****************************************************************************

    handleClickPageNumber = (url) => {
		this.setState ({
			products: [],
			paging: [],
		})
		
		sessionStorage.setItem('url', url)
		this.getProductsList(url)
    }

// ****************************************************************************
// HandleSubmitSearch
// ****************************************************************************

	handleSubmitSearch = (event) => {
		event.preventDefault()
		let search = event.target.search.value.trim()
		let url
		
		if (search.length > 0)
		{
			url = config[0].apiURL + 'product/search.php?s=' + search
			this.getProductsList(url)
		} else {
			url = config[0].apiURL + 'product/read_paging.php'
			this.getProductsList(url)
		}
		
		sessionStorage.setItem("url", url);
		sessionStorage.setItem('search', search)
	}

// ****************************************************************************
// Show modal for delete
// ****************************************************************************

	handleShowModalDelete = (name, id) => {
		this.setState({ 
			showModal: true, 
			showDelete: true,
			delID: id,
			delName: name,
		});
	}
	
// ****************************************************************************
// Hide modal for delete
// ****************************************************************************

	handleHideModalDelete = () => {
		this.setState({ 
			showModal: false, 
			showDelete: false,
			showDeleteOK: false,
		});
	}

// ****************************************************************************
// HandleDelete
// ****************************************************************************

	handleDelete = (id) => {
		let url = config[0].apiURL + 'product/delete.php'
		
		async function makePostRequest() {

			var params = {
				id: id,
			}

			await axios.post(url, params).catch(err => { 
				let statusMessage 
				if (err.response) {
					statusMessage = 'Something went wrong. Please, try it later.'
				} else if (err.request) {
					statusMessage = 'The client never received a response. Please, try it later.'
				} else {
					statusMessage = 'Something went wrong. Please, try it later.'
				}

				console.log(statusMessage)
			})
		}

		makePostRequest()
				
		if (sessionStorage.getItem("url")) {
			url = sessionStorage.getItem("url")
			const n = url.search('&');
			if (n !== -1) {
				url = url.substring(0, n)
			}
		} else {
			url = config[0].apiURL + 'product/read_paging.php'
		}
		
		this.setState({ 
			showDelete: false,
			showDeleteOK: true,
		});
		
		this.getProductsList(url)
	}
	
// ****************************************************************************
// Render
// ****************************************************************************

    render() {
        const {products} = this.state
        const {paging} = this.state
        const {statusMessage} = this.state
		const {search} = this.state
		
		// Delete
		const {showModal} = this.state
		const {showDelete} = this.state
		const {showDeleteOK} = this.state
		const {delID} = this.state
		const {delName} = this.state

		let table

		if (this.state.isError) {
			table = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			table = <Table productsData={products} pagingData={paging} 
						handleClickPageNumber={this.handleClickPageNumber} handleShowModalDelete={this.handleShowModalDelete} 
					/>
		}
		
        return (
            <div className="container-main">
                <h1>Products list</h1>
				<Bar handleSubmitSearch={this.handleSubmitSearch} searchData={search} />
				<div className="container">
					{table}
				</div>
				<ModalDelete 
					showModal={showModal} showDelete={showDelete} showDeleteOK={showDeleteOK} delID={delID} delName={delName} 
					handleDelete={this.handleDelete} handleHideModalDelete={this.handleHideModalDelete}
				/>
            </div>
        )
	}

}

export default ProductsList;
