import React, {Component} from 'react'
import './index.sass';
import Table from './Table';
import Form from './Form';
import { trackPromise } from 'react-promise-tracker';

class Index extends Component {
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
            <div className="container">
                <h1>Products</h1>
                <p>ReactJS and REST API demo.</p>
                <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                />
                {/* <h2>Add new</h2> */}
				{/* <Form handleSubmit={this.handleSubmit} /> */}
            </div>
        )
	}

}

export default Index;
