import React, { Component } from "react";
import { Button } from "antd";

class AddBtn extends Component {
	handleAdd = () => {
		_global.history.push("/material/add");
	};
	render() {
		return (
			<div
				style={{ margin: 20, float: "right" }}
				onClick={this.handleAdd}
			>
				<div className="gp-btn-blue">新建素材</div>
			</div>
		);
	}
}

export default AddBtn;
