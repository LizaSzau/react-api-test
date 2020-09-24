import React from 'react'
import NumberFormat from 'react-number-format'
import {usePromiseTracker} from "react-promise-tracker"
import {NavLink} from 'react-router-dom'
import slugify from 'react-slugify'

const LoadingIndicator = props => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && 
		<div className={"loader-top"}>
			<div className={"loader-1"}></div>
		</div>
	);	
}

const Table = (props) => {
	const {productsData, pagingData, handleClickPageNumber} = props

	return (
		<div className={"container-products-list-table"}>
			<TableHeader />
			<LoadingIndicator/>
			<TableBody productsData={productsData} />
			<Paging pagingData={pagingData} handleClickPageNumber={handleClickPageNumber} />
		</div>
	)
}

const TableHeader = () => {
	return (
		<div className={"flex-container"}>
			<div>Product</div>
			<div className={"align-right"}>Price</div>
			<div></div>
		</div>
	)
}

const TableBody = (props) => {
	const rows = props.productsData.map((row, index) => {
		return (
			<div className={"flex-container"} key = {index}>
				<div>
					<div>
						<div className={"field-name"}>Product:</div>
						<div>{row.name}</div>
						<div>{row.url}</div>
					</div>
					<div>
						<div className={"field-name"}>Category:</div>
						<div className={"text-category"} >{row.category_name}</div>
					</div>
				</div>
				<div>
					<div>
						<div className={"field-name"}>Price:</div>
						<div><NumberFormat className={"number-format"} value={row.price} thousandSeparator={true} prefix={'$'} /></div>
					</div>
				</div>
				<div>
					<NavLink to={'/product/' + row.id + '/' + slugify(row.name) }><button><i className={"fas fa-eye"}></i> View</button></NavLink>
					<button className={"btn-edit"} onClick={() => props.removeCharacter(index)}><i className={"fas fa-edit"}></i> Edit</button>
					<button className={"btn-delete"} onClick={() => props.removeCharacter(index)}><i className={"fas fa-trash"}></i> Delete</button>
				</div>
			</div>
		)
	})
	
	return rows
}


const Paging = (props) => {
	const rows = props.pagingData.map((row, index) => { 
		return (
			<button key={index} className={`current-page-${row.current_page}`} onClick={() => props.handleClickPageNumber(row.url)}>{row.page}</button>
		)
	})
	
	return ( 
		<div className="paging">{rows}</div> 
	)
}

export default Table