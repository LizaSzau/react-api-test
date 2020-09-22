import React from 'react';

const Bar = () => {
  return (
		<div className={"container"}>
			<div className={"container-products-list-bar"}>
				<div className={"bar-flex"}>
					<BarSearch />
					<BarNew />
				</div>
			</div>
		</div>
	)
}

const BarSearch = () => {
	return (
		<div className={"search"}>
			<input type="text" placeholder="Search.." name="search" />
			<button><i className="fa fa-search"></i></button>
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