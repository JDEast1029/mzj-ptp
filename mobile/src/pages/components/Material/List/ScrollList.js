/**
 * 立即提货
 */
import React, { Component } from 'react';
import * as types from '@constants/actions/material';
import { PullScroll, MToasts } from 'wya-rc';
import List from './List';

import pureRender from 'pure-render-decorator';

@pureRender
class ScrollList extends Component {
	constructor(props, context) {
		super(props, context);
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}
	loadDataForScroll(pullToRefresh = false) {
		const { listInfo, category_id, community_id } = this.props;
		const { currentPage, title } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.MATERIAL_LIST_LIST_GET;
		let param = {
			page: pullToRefresh ? 1 : currentPage + 1,
			type: community_id ? 2 : 1,
			title,
			category_id,
			community_id
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
		const { listInfo, actions } = this.props;
		const { itemArr, itemObj, currentPage, isEnd } = listInfo;
		return (
			<PullScroll
				className="pull-view-wrap"
				wrapper=".scroll-container"
				height={_global.innerHeight - 44}
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
					actions={actions}
					itemArr={itemArr}
					itemObj={itemObj}
				/>
			</PullScroll>
		);
	}
}
export default ScrollList;
