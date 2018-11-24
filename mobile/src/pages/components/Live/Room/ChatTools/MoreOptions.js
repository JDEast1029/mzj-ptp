import React, { Component } from 'react';
import { MToasts } from 'wya-rc';
import MModals from "@components/_common/MModals/MModals";
import * as types from '@constants/actions/live';

class MoreOptions extends Component {

	handleComfirm = () => {
		MModals.alert("", 
			<div className="g-flex-ac g-fd-c g-fs-14" style={{ height: 90 }}>
				<div className="g-pd-15">结束直播</div>
				<div className="g-fs-13">你确定结束本次直播?</div>
			</div>, 
			[
				{
					text: "取消",
					onPress: () => {
						
					}
				},
				{
					text: "确定",
					onPress: () => {
						this.handleEnd();
					}
				}
			]
		);
	}

	handleEnd = () => {
		const { room_id } = this.props;
		let url = types.LIVE_ROOM_END_GET;
		let param = { room_id };
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				MToasts.info(res.msg, 1);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	}

	render() {
		return (
			<div className="g-flex-ac g-bg-white g-b-t" style={{ height: 40 }}>
				<div 
					className="g-col g-pd-tb-5 g-flex-cc"
					onClick={this.handleComfirm}
				>
					<i className="iconfont icon-end g-m-r-5 g-fs-18" />结束
				</div>
				<div className="g-col" />
				<div className="g-col" />
				<div className="g-col" />
			</div>
		);
	}
}

export default MoreOptions;