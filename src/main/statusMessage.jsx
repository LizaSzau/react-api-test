import React from 'react'
import './messages.sass'

const StatusMessage = (props) => {
	const statusMessage = props.statusMessage
	const messageType = props.messageType
	
	return ( 
		<div className={messageType}>{statusMessage}</div> 
	)
}

export default StatusMessage