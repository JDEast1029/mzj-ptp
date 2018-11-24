import React, { Component } from 'react';
import * as types from '@constants/actions/agent';
import './Styles.scss';
import Item from './Table/Item';
import { Paging, CreatePortalFunc } from 'wya-rc';
import Filter from '@components/Agent/List/Filter/Filter';
import { Button, Message } from 'antd';
import SelectCrowd from '@components/_common/SelectCrowd/SelectCrowd';
import InviteLink from '@components/_common/Modal/InviteLink';
const title = [
	'序号',
	'会员ID',
	'会员昵称',
	'所在社群数量',
	'注册时间',
	<div key="operate" className="g-tl">操作</div>,
];

class Content extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			pageArr: [],
			checkedArr: {},
			selectArr: []
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}

	loadDataForPaging(page) {
		const { listInfo, query } = this.props;
		const { itemArr, curPage } = listInfo;
		if (listInfo.isEnd > 0) { // 只有状态为0时才可以加载数据
			return false;
		}
		let url = types.AGENT_LIST_GET;
		let param = {
			...query,
			page,
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				Message.warn(res.msg, 2);
			}
		};
		this.props.actions.request(url, params, { setPage: itemArr[page] });
	}

	// 会员邀请
	hanleInvite = () => {
		// 1搜索框，2禁言 3邀请，批量换群 4单个换群
		SelectCrowd.popup({
			paramInfo: { use_type: 3 },
			invite: true, // 公共弹窗需要
			describe: '邀请他人成为会员，并加入以下所选社群：',
			title: '会员邀请',
			min: 1
		}).then((data) => {
			const { inviteInfo = {}, selectInfo = [] } = data;
			let url = types.AGENT_LIST_INVITE_POST;
			let param = {
				community_ids: selectInfo,
				hour: inviteInfo.hour || 0, // 不传也要发0
				content: inviteInfo.content || '',
			};
			this.handleAction({ url, param });
		}).catch((data) => {
			console.error(data);
		});
	}
	// 会员调整
	handleAdjust = (data) => {
		const { user_id, user_sn, nick_name } = data;
		SelectCrowd.popup({
			paramInfo: { use_type: 4, user_id },
			extraTitle: <span>会员ID：{user_sn}<span className="g-m-r-30" />会员昵称：{nick_name}</span>,
			title: '社群调整'
		}).then((data) => {
			const { selectInfo = [] } = data;
			let url = types.AGENT_LIST_ADJUST_POST;
			let param = {
				user_id,
				community_ids: selectInfo
			};
			this.handleAction({ url, param });
		}).catch((data) => {
			console.error(data);
		});
	}
	// 禁言
	handleBan = (data) => {
		const { user_id, user_sn, nick_name } = data;
		SelectCrowd.popup({
			paramInfo: { use_type: 2, user_id },
			extraTitle: <span>会员ID：{user_sn}<span className="g-m-r-30" />会员昵称：{nick_name}</span>,
			describe: '所在社群：',
			title: '禁言设置',
			activeText: '已禁言',
			hoverText: '取消禁言',
			staticText: '禁言'
		}).then((data) => {
			const { selectInfo = [] } = data;
			let url = types.AGENT_LIST_BAN_POST;
			let param = {
				user_id,
				community_ids: selectInfo
			};
			this.handleAction({ url, param });
		}).catch((data) => {
			console.error(data);
		});
	}
	// 批量换群
	handleChange = () => {
		const { selectArr } = this.state;
		if (!selectArr.length) {
			Message.destroy();
			Message.error('至少选择一项', 1);
			return;
		}
		const str = this.getChangeStr(selectArr);
		SelectCrowd.popup({
			paramInfo: { use_type: 3 },
			changeCrowd: true, // 公共弹窗需要
			extraTitle: str,
			title: '批量换群'
		}).then((data) => {
			const { selectInfo = [], opt_type = 1 } = data;
			let url = types.AGENT_LIST_CHANGE_POST;
			let param = {
				user_ids: selectArr,
				community_ids: selectInfo,
				opt_type
			};
			this.handleAction({ url, param });
		}).catch((data) => {
			console.error(data);
		});
	}
	// 组织批量换群的extraTitle
	getChangeStr = (arr) => {
		const { listInfo: { itemObj } } = this.props;
		let str = '会员：';
		arr.map((id, index) => {
			if (itemObj[id] && index < 3) {
				str += itemObj[id].nick_name + '、';
			}
		});
		str = str.slice(0, -1);
		if (arr.length > 3) str += `...`;
		str += `  共${arr.length}名会员`;
		return str;
	}
	// 发送请求
	handleAction = (data) => {
		const { url, param } = data;
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				if (res.status) {
					if (res.data) {
						this.handleLink(res.data);
					} else {
						this.handleOffline();
						Message.success('操作成功');
					}
				}
			},
			onError: (res) => {
				Message.error(res.msg);
			}
		};
		this.props.actions.request(url, params);
	}
	/**
	 * 生成邀请链接
	 */
	handleLink = (data) => {
		InviteLink.popup({
			url: data
		}).then((data) => {
		}).catch((data) => {
		});
	}
	/**
	 * 初始化后checkbox都不选中
	 */
	handleOffline = () => {
		this.state.pageArr.map((val, index) => {
			this.paging && this.paging.resetCheckState(val);
			this.setState({
				selectArr: [],
				checkedArr: {},
				pageArr: []
			});
		});
	};

	render() {
		const { listInfo = {}, actions, query, communityList } = this.props;
		const { page = 1, ...reset } = query || {};
		const {
			isEnd,
			curPage = 1,
			totalPage,
			itemArr,
			itemObj,
			isFetching,
			totalCount,
			resetPage
		} = listInfo;
		const rowSelection = {
			getCheckboxProps: (record) => ({
				disabled: record.id === 1,
				checked: record.id === 1,
			}),
			onChange: (selectedRowKeys, selectedRows) => {
				let checkedArr = this.state.checkedArr;
				let pageArr = [];
				let selectArr = [];
				checkedArr[curPage] = selectedRowKeys;
				for (let key in checkedArr) {
					pageArr.push(key);
					selectArr = [...selectArr, ...this.state.checkedArr[key]];
				}
				this.setState({
					checkedArr,
					pageArr,
					selectArr
				});
			}
		};
		return (
			<div className="_container">
				<div className="g-tr g-m-b-10">
					<Button type="primary" onClick={this.hanleInvite}>会员邀请</Button>
				</div>
				<Filter
					actions={actions}
					query={{ page, ...reset }}
					communityList={communityList}
					isFetching={isFetching}
				/>
				<Paging
					ref={paging => this.paging = paging}
					className="v-group-table"
					history={true}
					title={title}
					isEnd={isEnd}
					dataSource={{ itemArr, itemObj }}
					curPage={parseInt(curPage, 10)}
					totalPage={totalPage}
					loadDataForPaging={this.loadDataForPaging}
					resetPrvScrollTop={curPage}
					resetPage={resetPage}
					renderRow={Item}
					rowProps={{
						actions,
						query,
						curPage,
						onAdjust: this.handleAdjust,
						onBan: this.handleBan
					}}
					showTotal={() => `共${totalCount || 0}条`}
					rowSelection={rowSelection}
				/>
				<Button
					type="primary"
					onClick={this.handleChange}
					className="g-relative"
					style={{ top: '-40px' }}
				>批量换群</Button>
			</div>
		);
	}
}

export default Content;

