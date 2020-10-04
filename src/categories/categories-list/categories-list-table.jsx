import React from 'react'
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
	const {categoriesData, handleShowModalDelete} = props

	return (
		<div className={"container-products-list-table"}>
			<TableHeader />
			<LoadingIndicator/>
			<TableBody categoriesData={categoriesData} handleShowModalDelete={handleShowModalDelete} />
		</div>
	)
}

// ****************************************************************************
// TableHeader
// ****************************************************************************

const TableHeader = () => {
	return (
		<div className={"flex-container"}>
			<div>Category</div>
			<div></div>
		</div>
	)
}

// ****************************************************************************
// ButtonDelete
// ****************************************************************************

const ButtonDelete = (props) => {
	return (
		<button className={"btn-delete"} onClick={() => {props.handleShowModalDelete(props.name, props.id)}}>
			<i className={"fas fa-trash"}></i> Delete
		</button>
	)
}

// ****************************************************************************
// ButtonDeleteNo
// ****************************************************************************

const ButtonDeleteNo = () => {
	return (
		<button className={"btn-delete-no"}>
			<i className={"fas fa-trash"}></i> Delete
		</button>
	)
}

// ****************************************************************************
// TableBody
// ****************************************************************************

const TableBody = (props) => {
	
	const rows = props.categoriesData.map((row, index) => {
		return (
			<div className={"flex-container"} key = {index}>
			
				<div>
					<div>
						<div>{row.name}</div>
					</div>
					<div>
						<div className="text-category" >
							{row.sum} 
							{row.sum > 1 && " products"}
							{row.sum <= 1 && " product"}
						</div>
					</div>
				</div>
				<div></div>
				<div>
					<NavLink to={'/category/view/' + row.id + '/' + slugify(row.name)}>
						<button><i className={"fas fa-eye"}></i> View</button>
					</NavLink>
					<NavLink to={'/category/edit/' + row.id + '/' + slugify(row.name)}>
						<button className={"btn-edit"}><i className={"fas fa-edit"}></i> Edit</button>
					</NavLink>
					
					{row.sum < 1 && <ButtonDelete name={row.name} id={row.id} handleShowModalDelete={props.handleShowModalDelete} />} 
					{row.sum > 0 && <ButtonDeleteNo />} 

				</div>
			</div>
		)
	})
	
	return rows
}

export default Table