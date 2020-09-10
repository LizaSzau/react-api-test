import React, {Component} from 'react'

class Api extends Component {
	state = {
		products: [],
	}

	componentDidMount() {
		const url = 'https://oszirozsa.hu/product/read.php';

		fetch(url)
			.then((result) => result.json())
			.then((result) => {
				this.setState ({
					products: result,
				})
		});
	}

	render() {
		const products = this.state.products;

		const result = products.map((product) => {
			return <li>{product.name}</li>
		})
	
		return <ul>{result}</ul>
	}
  
}

export default Api
