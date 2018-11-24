import React, { Component } from 'react';
import * as types from '@constants/actions/home';
import { PullScroll, MToasts } from 'wya-rc';
import { CROWD_NONE_BG } from '@constants/constants';
import Item from './Item';
import Empty from '@components/_common/Empty/Empty';
class ScrollList extends Component {
	constructor(props) {
		super(props);
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}
	loadDataForScroll = (pullToRefresh = false) => {
		const { listInfo } = this.props;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.HOME_MAIN_LIST_GET;
		let param = {
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				pullToRefresh && this.refs.pull && this.refs.pull.setDefault();
				if (pullToRefresh) {
					MToasts.info('刷新成功', 1);
				}
			},
			onError: (res) => {
				MToasts.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, { pullToRefresh, noLoading: true });
	}
	render() {
		const { listInfo = {}, onClick, isFetching } = this.props;
		const { itemArr, itemObj, isEnd, currentPage } = listInfo;
		if (!itemArr.length && isFetching) {
			return <Empty img={CROWD_NONE_BG} title="您暂时还没有加入的群哦~" />;
		}
		return (
			<PullScroll
				className="pull-view-wrap g-col g-bg-white"
				wrapper=".scroll-container"
				height={0}
				loadDataForPull={this.loadDataForPull}
				loadDataForScroll={this.loadDataForScroll}
				isEnd={isEnd}
				itemArr={itemArr}
				currentPage={currentPage}
				show={true} // 总开关 // 默认true
				pull={true} // 允许下拉刷新 默认true
				scroll={true} // 允许上划加载 默认true
				noLoading={false}
				// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
				ref="pull"
			>
				{
					itemArr.map((item, index) => {
						return (
							<Item
								key={index}
								itemData={itemObj[item]}
								onClick={onClick}
							/>
						);
					})
				}
			</PullScroll>
		);
	}
}
export default ScrollList;