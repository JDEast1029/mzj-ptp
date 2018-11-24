/**
 * 直播列表
 */
import React, { Component, Fragment } from "react";
import { MToasts, PullScroll } from "wya-rc";
import * as types from "@constants/actions/live";
import "./Content.scss";
import Card from "@components/_common/Card/Card";
import { LIVE_LIST_NOT_FOUND } from "@constants/constants";
import Empty from "@components/_common/Empty/Empty";
class Content extends Component {
	constructor(props, context) {
		super(props, context);
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}

	loadDataForScroll = (pullToRefresh = false) => {
		const { listInfo, title, query } = this.props;
		const { community_id } = query;
		const { currentPage } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let obj = {
			page: pullToRefresh ? 1 : currentPage + 1,
			title
		};
		if (community_id) {
			obj.community_id = community_id;
		}
		let url = types.LIVE_ROOM_ROOM_LIST_GET;
		let param = obj;
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {
				pullToRefresh && this.refs.pull && this.refs.pull.setDefault();
				if (pullToRefresh) {
					MToasts.info("刷新成功", 1);
				}
			},
			onError: res => {
				MToasts.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, { pullToRefresh });
	};

	handleClick = (room_id, status) => {
		let replay = status == 2 ? 1 : 0;
		_global.history.push(`/live/room?room_id=${room_id}&replay=${replay}`);
	};

	render() {
		const { listInfo = {}, isFetching, isname } = this.props;
		const { itemArr, itemObj, isEnd, currentPage } = listInfo;
		let innerHeight = isname ? _global.innerHeight - 47 : _global.innerHeight - 94;
		if (isFetching && itemArr.length == 0) {
			return <Empty
				img={LIVE_LIST_NOT_FOUND}
				title="暂无直播！"
				style={{ height: _global.innerHeight - 45 }}
			/>;
		}
		return (
			<div className="g-flex g-fd-c v-live-main">
				<PullScroll
					className="pull-view-wrap g-col g-bg-white"
					wrapper=".scroll-container"
					loadDataForPull={this.loadDataForPull}
					loadDataForScroll={this.loadDataForScroll}
					isEnd={isEnd}
					height={innerHeight}
					itemArr={itemArr}
					currentPage={currentPage}
					show={true} // 总开关 // 默认true
					pull={true} // 允许下拉刷新 默认true
					scroll={true} // 允许上滑加载 默认true
					noLoading={false}
					// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
					ref="pull"
				>
					{itemArr.map((item, index) => {
						return (
							<Card
								key={index}
								title={itemObj[item].title}
								desc={itemObj[item].start_time}
								img={itemObj[item].img}
								onClick={this.handleClick.bind(
									this,
									itemObj[item].room_id,
									itemObj[item].status
								)}
							>
								{itemObj[item].status == 1 ? (
									<div className="g-fs-12 g-blue-middle">
										<i className="iconfont icon-dian g-m-r-5" />
										{itemObj[item].status_name}
									</div>
								) : (
									<div className="g-fs-12">
										<i className="iconfont icon-dian g-m-r-5" />
										{itemObj[item].status_name}
									</div>
								)}
							</Card>
						);
					})}
				</PullScroll>
			</div>
		);
	}
}
export default Content;
