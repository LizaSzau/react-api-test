import React from 'react';
import NumberFormat from 'react-number-format';
import { usePromiseTracker } from "react-promise-tracker";

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
  const {characterData, removeCharacter} = props

  return (
		<div>
			<TableHeader />
			<LoadingIndicator/>
			<TableBody characterData={characterData} removeCharacter={removeCharacter} />
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
	const rows = props.characterData.map((row, index) => {
		return (
			<div className={"flex-container"} key = {index}>
				<div>
					<div>
						<div className={"field-name"}>Product:</div>
						<div>{row.name}</div>
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
					<button onClick={() => props.removeCharacter(index)}><i className={"fas fa-eye"}></i> View</button>
					<button className={"btn-edit"} onClick={() => props.removeCharacter(index)}><i className={"fas fa-edit"}></i> Edit</button>
					<button className={"btn-delete"} onClick={() => props.removeCharacter(index)}><i className={"fas fa-trash"}></i> Delete</button>
				</div>
			</div>
		)
	})
	
	return rows
}

export default Table