import React from "react";
import {NavLink} from 'react-router-dom'

const Bar = (props) => {
	const {handleSubmitSearch} = props
	const {searchData} = props
	
	return (
		<div className={"container"}>
			<div className={"container-products-list-bar"}>
				<div className={"bar-flex"}>
					<BarSearch handleSubmitSearch={handleSubmitSearch}  searchData={searchData}/>
					<BarNew />
				</div>
			</div>
		</div>
	)
}

const BarSearch = (props) => {
	return (
		<div className={"search"}>
			<form onSubmit={props.handleSubmitSearch} >
				<input type="text" name="search" placeholder="Search..." defaultValue={props.searchData} />
				<button><i className="fa fa-search"></i></button>
			</form>
		</div>
	)
}

const BarNew = () => {
	return (
		<div>
			<NavLink to={'/product/new/'}>
				<button><i className="fas fa-plus-circle"></i> Add new product</button>
			</NavLink>
		</div>
	)
}

export default Bar