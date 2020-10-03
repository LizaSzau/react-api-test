import React from 'react'
import NumberFormat from 'react-number-format'
import {usePromiseTracker} from "react-promise-tracker"
import {NavLink} from 'react-router-dom'
import slugify from 'react-slugify'

// ****************************************************************************
// LoadingIndicator
// ****************************************************************************

const LoadingIndicator = () => {
	const { promiseInProgress } = usePromiseTracker();
	return (
		promiseInProgress && 
		<div className={"loader-top"}>
			<div className={"loader-1"}></div>
		</div>
	);	
}

// ****************************************************************************
// Table
// ****************************************************************************

const Table = (props) => {
	const {productsData, pagingData, handleClickPageNumber, handleShowModalDelete} = props

	return (
		<div className={"container-products-list-table"}>
			<TableHeader />
			<LoadingIndicator/>
			<TableBody productsData={productsData} handleShowModalDelete={handleShowModalDelete} />
			<Paging pagingData={pagingData} handleClickPageNumber={handleClickPageNumber} />
		</div>
	)
}

// ****************************************************************************
// TableHeader
// ****************************************************************************

const TableHeader = () => {
	return (
		<div className={"flex-container"}>
			<div>Product</div>
			<div className={"align-right"}>Price</div>
			<div></div>
		</div>
	)
}

// ****************************************************************************
// TableBody
// ****************************************************************************

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
					<NavLink to={'/product/view/' + row.id + '/' + slugify(row.name)}>
						<button><i className={"fas fa-eye"}></i> View</button>
					</NavLink>
					<NavLink to={'/product/edit/' + row.id + '/' + slugify(row.name)}>
						<button className={"btn-edit"}><i className={"fas fa-edit"}></i> Edit</button>
					</NavLink>
					<button className={"btn-delete"} onClick={() => {props.handleShowModalDelete(row.name, row.id)}}>
						<i className={"fas fa-trash"}></i> Delete
					</button>
				</div>
			</div>
		)
	})
	
	return rows
}

// ****************************************************************************
// paging
// ****************************************************************************

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