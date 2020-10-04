import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import Table from './categories-list-table.jsx'
import Bar from './categories-list-bar.jsx'
import ModalDelete from './categories-list-delete.jsx'
import StatusMessage from '../../main/statusMessage.jsx'
import {config} from '../../config'
import '../../main/sass-common/list.sass'

class ProductsList extends Component {
	constructor(){
		super()

		this.state = {
			categories: [],
			isError: false,
			statusMessage: '',
			showModal: false,
			showDelete: false,
			showDeleteOK: false,
			delID: 0,
			delName: ''
		}
	}
  
	componentDidMount() {
		let url_categories = config[0].apiURL + 'category/read_sum.php'
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
		let url = config[0].apiURL + 'category/delete.php'
		
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
				
		if (sessionStorage.getItem('url')) {
			url = sessionStorage.getItem('url')
			const n = url.search('&')
			
			if (n !== -1) {
				url = url.substring(0, n)
			}
		} else {
			url = config[0].apiURL + 'product/read_paging.php'
		}
		
		/*
		this.setState({ 
			showDelete: false,
			showDeleteOK: true,
		});
		*/
		//this.getProductsList(url)
		
		const {categories} = this.state
		this.setState({ 
			showDelete: false,
			showDeleteOK: true,
			categories: categories.filter((product, i) => {
				return product.id !== id
			})
		});
		
	}
	
// ****************************************************************************
// Render
// ****************************************************************************

    render() {
        const {categories} = this.state
        const {statusMessage} = this.state
		
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
			table = <Table categoriesData={categories} handleShowModalDelete={this.handleShowModalDelete} />
		}
		
        return (
            <div className="container-main">
                <h1>Categories list</h1>
				<Bar />
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
