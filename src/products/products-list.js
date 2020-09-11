import React, {Component} from 'react'
import './products-list.sass';
import Table from './products-list-table';
import { trackPromise } from 'react-promise-tracker';

class ProductsList extends Component {
	state = {
		characters: [],
	}
	
	componentDidMount() {
		const url = 'https://oszirozsa.hu/product/read.php';

		trackPromise(
		
			fetch(url)
				.then((result) => result.json())
				.then((result) => {
					this.setState ({
						characters: result,
					})
				}) 
			);
	}
	
	removeCharacter = (index) => {
		const {characters} = this.state

		this.setState({
			characters: characters.filter((character, i) => {
				return i !== index
			}),
		})
	}

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
    }
	
    render() {
        const { characters } = this.state;
    
        return (
            <div className="container-main">
                <h1>Products list</h1>
				<div className="container">
					<Table
						characterData={characters}
						removeCharacter={this.removeCharacter}
					/>
					{/* <h2>Add new</h2> */}
					{/* <Form handleSubmit={this.handleSubmit} /> */}
				</div>
            </div>
        )
	}

}

export default ProductsList;
