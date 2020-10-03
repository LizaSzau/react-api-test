import React from 'react'

const ModalDelete  = (props) => {
	const {showModal} = props
	const {showDelete} = props
	const {showDeleteOK} = props
	
	const showHideModal = showModal ? "modal display-block" : "modal display-none"
	const showHideDelete = showDelete ? "flex delete-buttons display-block" : "display-none"
	const showHideDeleteOK = showDeleteOK ? "delete-ok display-block" : "display-none"

	return (
		<div className={showHideModal}>
			<section className="modal-main">
				<div className="modal-title">Are you sure you want to delete this item?</div>
				<div className="content">
					<div className="flex">
						<div>ID:</div>
						<div>{props.delID}</div>
					</div>
					<div className="flex">
						<div>Name:</div>
						<div>{props.delName}</div>
					</div>
					<div className={showHideDeleteOK}>
						<div className="success-message-form">The item has been deleted.</div>
						<div className="button-ok">
							<button onClick={() => {props.handleHideModalDelete()}}>
								<i className="fas fa-check-circle"></i> OK
							</button>
						</div>
					</div>
					<div className={showHideDelete}>
						<div>
							<button onClick={() => {props.handleHideModalDelete()}}>
								<i className={"fas fa-times"}></i> Cancel
							</button>
						</div>
						<div>
							<button className="btn-delete" onClick={() => {props.handleDelete(props.delID)}}>
								<i className={"fas fa-trash"}></i> Delete
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default ModalDelete