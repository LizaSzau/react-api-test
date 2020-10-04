import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import {config} from '../../config'
import StatusMessage from '../../main/statusMessage.jsx'
import CategoryEditForm from './category-edit-form.jsx'
import '../../main/sass-common/edit.sass'

class CategoryEdit extends Component {

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
		let url = config[0].apiURL + 'category/read_one.php?id=' + id
		this.geCategoryDetails(url)
	}
	
// ****************************************************************************
// GetCategoryDetails
// ****************************************************************************

	geCategoryDetails = (url) => {
		trackPromise(
			axios.get(url)
				.then(res => {
					const id = res.data.id
					const name = res.data.name
					const description = res.data.description
					this.setState ({
						id: id,
						name: name,
						description: description,
						statusMessage: '',
						isError: false,
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

		let category

		if (this.state.isError) {
			category = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			category = <CategoryEditForm values={values} handleSubmitEdit={this.handleSubmitEdit} />
		}
	
        return (
            <div className="container-main">
                <h1>Edit category</h1>
				<div className="container">
					{category}
				</div>
            </div>
        )
	}

}

export default CategoryEdit
