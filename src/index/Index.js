import React, {Component} from 'react'
import './index.sass';
import Table from './Table';
import Form from './Form';
//import {characters} from './data.js';

class Index extends Component {
	state = {characters: []} 
	//state = {characters} 
	
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
                <h1>Products List</h1>
                <p>Node.js and REST API demo</p>
                <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                />
                <h2>Add new</h2>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        )
	}

}

export default Index;
