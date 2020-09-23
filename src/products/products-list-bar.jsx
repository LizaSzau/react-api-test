import React from 'react';

const Bar = (props) => {
	const {handleSubmitSearch} = props
	
	return (
		<div className={"container"}>
			<div className={"container-products-list-bar"}>
				<div className={"bar-flex"}>
					<BarSearch handleSubmitSearch={handleSubmitSearch} />
					<BarNew />
				</div>
			</div>
		</div>
	)
}

const BarSearch = (props) => {
	return (
		<div className={"search"}>
			<form onSubmit={props.handleSubmitSearch}>
				<input type="text" name="search" placeholder="Search..." />
				<button><i className="fa fa-search"></i></button>
			</form>
		</div>
	)
}

const BarNew = () => {
	return (
		<div>
			<button><i className="fas fa-plus-circle"></i> Add new product</button>
		</div>
	)
}

export default Bar