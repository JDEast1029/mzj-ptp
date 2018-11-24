import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router";

class AddBtn extends Component {
	handleAdd = () => {
		_global.history.push("/live/list/add");
	};
	render() {
		return (
			<Button
				className="gp-btn-blue"
				style={{ marginBottom: "20", float: "right" }}
				onClick={this.handleAdd}
			>
				新建直播
			</Button>
		);
	}
}

export default AddBtn;
