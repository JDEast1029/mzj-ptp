/**
 * 日志Item
 */
import React, { Component, Fragment } from "react";

class Item extends Component {
	render() {
		const { itemData = {} } = this.props;
		const {
			log_id,
			action_user,
			module_name,
			info,
			create_time,
			ip,
			role_name
		} = itemData;

		return (
			<tr className="g-c-dark">
				<td>{log_id}</td>
				<td>{action_user}</td>
				<td>{module_name}</td>
				<td>{role_name}</td>
				<td className="g-w-4 g-tl">{info}</td>
				<td>{ip}</td>
				<td>{create_time}</td>
			</tr>
		);
	}
}

export default Item;
