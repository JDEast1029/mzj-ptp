import React, { Component } from 'react';
export default class Footer extends Component {
	render() {
		return (
			<div className="g-flex g-fd-rr g-pd-20">
				<button
					onClick={() => { this.props.onSave(); }}
					className="gp-btn-blue"
				>确定</button>
				<button 
					className="gp-btn-white g-m-r-20"
					onClick={() => { this.props.onCloseSoon(); }}
				>取消</button>
				
			</div>
		);
	}
}
