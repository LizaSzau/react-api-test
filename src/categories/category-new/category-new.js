import React, {Component} from 'react'
import StatusMessage from '../../main/statusMessage.jsx'
import CategoryNewForm from './category-new-form.jsx'
import '../../main/sass-common/edit.sass'

class CategoryNew extends Component {

	constructor(){
		super()

		this.state = {
			statusMessage: '',
		}
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

		let category

		if (this.state.isError) {
			category = <StatusMessage statusMessage={statusMessage} messageType="message error" />
		} else {
			category = <CategoryNewForm handleSubmitEdit={this.handleSubmitEdit} />
		}
	
        return (
            <div className="container-main">
                <h1>New category</h1>
				<div className="container">
					{category}
				</div>
            </div>
        )
	}
}

export default CategoryNew
