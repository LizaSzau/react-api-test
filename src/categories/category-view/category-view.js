import React, {Component} from 'react'
import axios from 'axios'
import {trackPromise} from 'react-promise-tracker'
import {config} from '../../config'
import StatusMessage from '../../main/statusMessage.jsx'
import CategoryViewDetails from './category-view-details.jsx'
import ButtonBack from './category-view-button-back.jsx'
import '../../main/sass-common/view.sass'

class CategoryView extends Component {

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
		let url = config[0].apiURL + 'category/read_one.php?id=' + id

		trackPromise(
			axios.get(url)
				.then(res => {
					const name = res.data.name
					const description = res.data.description
					this.setState ({
						name: name,
						description: description,
						statusMessage: '',
						isError: false,
					})
			})
			.catch(err => { 
				let statusMessage 
				
				if (err.response) {
					// client received an error response (5xx, 4xx)
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
	
    render() {
        const {name} = this.state
        const {description} = this.state
        const {statusMessage} = this.state
		
		let category

		if (this.state.isError) {
			category = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			category = <CategoryViewDetails name={name} description={description} />
		}
		
        return (
            <div className="container-main">
                <h1>View category</h1>
				<div className="container">
					{category}
				</div>
				<ButtonBack />
            </div>
        )
	}

}

export default CategoryView
