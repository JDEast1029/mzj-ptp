import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import { PullScroll, MToasts } from 'wya-rc';
import * as types from '@constants/actions/live';
import List from './List';
import './Styles.scss';

@pureRender
class ScrollList extends Component {
	constructor(props) {
		super(props);
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}

	loadDataForScroll = (pullToRefresh = false) => {
		const { listInfo, room_id } = this.props;
		const { currentPage, max_discuss_id } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.LIVE_ROOM_DISCUSS_LIST_GET;
		let param = {
			room_id,
			max_discuss_id: pullToRefresh ? '' : max_discuss_id,
			page: pullToRefresh ? 1 : currentPage + 1,
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				pullToRefresh && this.refs.pull && this.refs.pull.setDefault();
			},
			onError: (res) => {
				MToasts.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, { pullToRefresh });
	}

	render() {
		const { listInfo = {} } = this.props;
		const { itemArr, itemObj, isEnd, currentPage } = listInfo;

		return (
			<PullScroll
				className="pull-view-wrap g-col g-bg-white"
				wrapper=".disciss-scroll-container"
				height={0}
				loadDataForPull={this.loadDataForPull}
				loadDataForScroll={this.loadDataForScroll}
				isEnd={isEnd}
				itemArr={itemArr}
				currentPage={currentPage}
				show={true} // 总开关 // 默认true
				pull={true} // 允许下拉刷新 默认true
				scroll={true} // 允许上划加载 默认true
				// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
				ref="pull"
			>
				<List 
					itemArr={itemArr}
					itemObj={itemObj}
				/>
			</PullScroll>

		);
	}
}

export default ScrollList;
