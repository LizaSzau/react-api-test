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
		<LoadingIndicator/>
		<table>
			<TableHeader />
			<TableBody characterData={characterData} removeCharacter={removeCharacter} />
		</table>
		</div>
	)
}

const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>Product</th>
				<th className={"align-right"}>Price</th>
				<th></th>
			</tr>
		</thead>
	)
}

const TableBody = (props) => {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key = {index}>
				<td>
					{row.name}
					<div className={"text-category"} >{row.category_name}</div>
				</td>
				<td >
					<NumberFormat className={"number-format"} value={row.price} thousandSeparator={true} prefix={'$'} />
				</td>
				<td>
					<button onClick={() => props.removeCharacter(index)}><i className={"fas fa-eye"}></i> View</button>
					<button className={"btn-edit"} onClick={() => props.removeCharacter(index)}><i className={"fas fa-edit"}></i> Edit</button>
					<button className={"btn-delete"} onClick={() => props.removeCharacter(index)}><i className={"fas fa-trash"}></i> Delete</button>
				</td>
			</tr>
		)
	})
	
	return <tbody>{rows}</tbody>
}

export default Table