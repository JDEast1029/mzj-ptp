import React, { Component, Fragment } from "react";
import Item from "./Item";
import net from "@utils/net";
import apiRoot from "@constants/apiRoot";
import { MToasts } from "wya-rc";
import "./Styles.scss";
const List = props => {
	const { actions, listInfo } = props;
	const { list, selectArr } = listInfo;

	const handleSubmit = () => {
		const { actions, listInfo, query } = props;
		const { list, selectArr } = listInfo;
		const { community_id } = query;
		let material = selectArr;
		const url = apiRoot.HOME_MATERIAL_SEND_MATERIAL_POST;
		net.ajax({
			url,
			param: { material, community_id },
			type: "POST"
		})
			.then(res => {
				if (res.status) {
					MToasts.info("发送成功", 1.5, () => {
						_global.history.push(`/home/room?community_id=${community_id}`);
					});
					props.actions.materialShartInit();
				} else {
					MToasts.info(res.msg);
				}
			})
			.catch(error => {
				MToasts.info("发送失败");
			});
	};
	return (
		<Fragment>
			<div className="v-home-materiallist-fill v-home-materiallist-main">
				{list.map((item, index) => {
					return (
						<Item
							key={`${item.material_id}`}
							itemData={item}
							actions={actions}
							index={index + 1}
							selectArr={selectArr}
							className="v-home-materiallist-list"
						/>
					);
				})}
			</div>
			<div
				style={{ lineHeight: "44px" }}
				className="g-tc g-bg-blue-middle v-home-materiallist-footer"
				onClick={handleSubmit}
			>
				发送
			</div>
		</Fragment>
	);
};
export default List;
