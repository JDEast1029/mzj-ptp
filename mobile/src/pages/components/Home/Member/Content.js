import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import { MToasts, PullScroll } from 'wya-rc';
import { getHashUrl } from '@utils/utils';
import * as types from '@constants/actions/home';
import Item from './Item';
class Content extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			nick_name: props.query.nick_name || '' // 搜索用
		};
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}

	loadDataForScroll = (pullToRefresh = false) => {
		const { nick_name } = this.state;
		const { listInfo, query: { community_id = 1 } } = this.props;
		const { currentPage } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.HOME_MEMBER_LIST_GET;
		let param = {
			page: pullToRefresh ? 1 : currentPage + 1,
			community_id,
			nick_name
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
		this.props.actions.request(url, params, { pullToRefresh });
	}

	handleSearch = () => {
		const { query } = this.props;
		this.setState({
			nick_name: this.state.nick_name.replace(/(^\s*)|(\s*$)/g, "")
		}, () => {
			const { nick_name } = this.state;
			_global.history.replace(getHashUrl(`/home/member`, { ...query, nick_name }));
			// init
			this.props.actions.memberSearchInit();
		});
	}

	render() {
		const { listInfo = {}, query = {} } = this.props;
		const { itemArr, itemObj, isEnd, currentPage } = listInfo;
		const { nick_name } = this.state;
		return (
			<div className="g-flex g-fd-c" style={{ height: _global.innerHeight }}>
				<SearchBar
					placeholder="搜索"
					maxLength={10}
					style={{ background: '#f5f5f5' }}
					onChange={(nick_name) => this.setState({ nick_name })}
					onSubmit={this.handleSearch}
					onBlur={this.handleSearch}
					value={nick_name}
				/>
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
					scroll={true} // 允许上滑加载 默认true
					// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
					ref="pull"
				>
					{
						itemArr.map((item, index) => {
							return (
								<Item
									key={index}
									itemData={itemObj[item]}
									query={query}
								/>
							);
						})
					}
				</PullScroll>
			</div >
		);
	}
}
export default Content;