import React, {Component} from 'react'
import './products-list.sass';
import Table from './products-list-table';
import Bar from './products-list-bar';
import { trackPromise } from 'react-promise-tracker';

class ProductsList extends Component {
	state = {
		products: [],
		paging: [],
	}
	
	componentDidMount() {
		const url = 'https://oszirozsa.hu/product/read_paging.php';

		trackPromise(
		
			fetch(url)
				.then((result) => result.json())
				.then((result) => {
					this.setState ({
						products: result.records,
						paging: result.paging,
					})
				}) 
		);
	}
	
	/*
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
	*/
	
    render() {
        const { products } = this.state;
        const { paging } = this.state;

        return (
            <div className="container-main">
                <h1>Products list</h1>
				<Bar />
				<div className="container">
					<Table productsData={ products } pagingData = { paging } />
				</div>
            </div>
        )
	}

}

export default ProductsList;
