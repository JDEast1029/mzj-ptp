import React, { Component } from 'react';
import Search from './Search';
import Item from './Item';
import Invite from './Invite';
import Crowd from './Crowd';
import { initPage, initItem } from '@utils/utils';
import { message } from 'antd';
import { Paging } from 'wya-rc';
import { ajax } from 'wya-fetch';
import API_ROOT from '@constants/apiRoot';
const initialState = {
	...initPage,
	selectItem: {}
};
const title = [
	<div key="1" className="g-tl">序号</div>,
	<div key="2" className="g-tl">社群名称</div>,
	'操作'
];
export default class Content extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			...initialState,
			itemObj: props.itemObj,
			request: props.request || ajax,
			selectArr: props.selectArr || [],
			selectObj: props.selectObj || {},
			activeText: props.activeText || '取消',
			staticText: props.staticText || '选择',
			disableText: props.disableText || '已选',
			hoverText: props.hoverText || '取消选择',
			name: props.name || '',
			disableArr: props.disableArr || [],
			onlyOne: props.onlyOne || false,
			id: props.id || 'community_id',
			describe: props.describe || '全部社群:',
			getDetail: props.getDetail || false,
			invite: props.invite || false,
			is_fetch: false,
			extraTitle: props.extraTitle || '',
			changeCrowd: props.changeCrowd || false,
			paramInfo: props.paramInfo || {},
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page, search = false) {
		page = page || 1;
		const {
			request,
			name,
			is_fetch,
			selectArr,
			paramInfo
		} = this.state;
		this.setState({
			isEnd: 1
		}, () => {
			this.request = request({
				url: API_ROOT['_COMMON_CROWD_LIST_GET'],
				type: "get",
				param: {
					page,
					name,
					...paramInfo
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'community_id');
				let totalPage = res.data.totalPage;
				let totalCount = res.data.totalCount;
				if (search) {
					this.setState({
						isEnd: 0,
						curPage: page,
						totalPage,
						totalCount,
						itemArr: {
							...initialState.itemArr,
							[page]: items.itemArr
						},
						itemObj: { ...initialState.itemObj, ...items.itemObj },
						is_fetch: true,
						selectArr: this.state.is_fetch ? this.state.selectArr : res.data.check_community_ids
					});
				} else {
					this.setState({
						isEnd: 0,
						curPage: page,
						totalPage,
						totalCount,
						itemArr: {
							...this.state.itemArr,
							[page]: items.itemArr
						},
						itemObj: { ...this.state.itemObj, ...items.itemObj },
						is_fetch: true,
						selectArr: this.state.is_fetch ? this.state.selectArr : res.data.check_community_ids
					});
				}
			}).catch((res = {}) => {
				res.msg && message.error(res.msg);
			});
		});
	}
	handleSelect = (flag, id, data, cb) => {
		let newArr = [...this.state.selectArr];
		if (flag) {
			cb && cb();
			newArr.push(id);
		} else {
			cb && cb();
			newArr = this.state.selectArr.filter((item, index) => {
				return item != id;
			});
		}
		this.setState({
			selectArr: newArr
		});
	}
	handleChangeInput = (val, key) => {
		this.setState({
			[key]: val
		});
	}
	selectAll = () => {
		const { disableArr } = this.state;
		const arr = this.state.itemArr[this.state.curPage].filter((val) => {
			return disableArr.indexOf(val) == -1;
		});
		this.setState({
			selectArr: Array.from(new Set(this.state.selectArr.concat(arr)))
		});
	}
	cancelSelectAll = () => {
		const arr = this.state.itemArr[this.state.curPage];
		const selectArr = this.state.selectArr.filter((val, index) => {
			return arr.indexOf(val) == -1;
		});
		this.setState({
			selectArr
		});
	}
	selectOne = (status, id) => {
		let selectArr = [];
		if (status) {
			selectArr = this.state.selectArr.push(id);
		} else {
			selectAll = this.state.selectArr.filter((val) => {
				return val != id;
			});
		}
		this.setState({
			selectArr
		});
	}
	getSelectInfo = (status, id) => {
		const { getDetail, selectArr, invite, changeCrowd } = this.state;
		let selectInfo = [];
		let inviteInfo = {};
		if (getDetail) {
			selectInfo = this.state.selectArr.map((val, index) => {
				return this.state.itemObj[val];
			});
		} else {
			selectInfo = selectArr;
		}
		if (invite) {
			inviteInfo = this.invite.getInfo();
			if (!inviteInfo) return false;
			return {
				selectInfo,
				inviteInfo
			};
		} else if (changeCrowd) {
			const opt_type = this.changeCrowdType.getInfo();
			return {
				selectInfo,
				opt_type
			};
		} else {
			return { selectInfo };
		}
	}
	render() {
		const {
			request,
			activeText,
			staticText,
			isEnd,
			selectArr,
			curPage,
			totalPage,
			totalCount,
			itemArr = [],
			itemObj = {},
			resetPage,
			product_id,
			product_name,
			activity_type,
			onlyOne,
			sale_price_start,
			sale_price_end,
			disableArr,
			describe,
			invite,
			disableText,
			extraTitle,
			changeCrowd,
			hoverText
		} = this.state;
    	return (
    		<div className="g-modal-box">
				{
					extraTitle && <div className="g-tc g-fs-18">{extraTitle}</div>
				}
				<div className="g-pd-tb-10">{describe}</div>
				<Search
					product_name={product_name}
					request={request}
					onInputChange={this.handleChangeInput}
					onSearch={this.loadDataForPaging}
				/>
				<Paging
					title={title}
					className="__no-pd __page"
					isEnd={isEnd}
					curPage={curPage}
					totalPage={totalPage}
					showTotal={() => totalCount ? `共 ${totalCount} 条` : null}
					loadDataForPaging={this.loadDataForPaging}
					resetPrvScrollTop={curPage}
					resetPage={resetPage}
					renderRow={Item}
					rowProps={{
						itemArr: itemArr[curPage] || [],
						itemObj: itemObj,
						onSelect: this.handleSelect,
						selectArr: selectArr,
						activeText: activeText,
						staticText: staticText,
						disableArr: disableArr,
						disableText: disableText,
						onlyOne: onlyOne,
						hoverText: hoverText
					}}
					dataSource={{ itemArr, itemObj }}
				>
					{
						!this.state.onlyOne &&
						<div className="g-flex-cc">
							<div
								className="gp-btn-white g-m-r-20"
								onClick={this.selectAll}
								style={{ width: 98 }}
							>
								全选
							</div>
							<div
								className="gp-btn-white"
								onClick={this.cancelSelectAll}
							>
								取消全选
							</div>
						</div>
					}
				</Paging>
				<Invite invite={invite} ref={val => this.invite = val} />
				<Crowd changeCrowd={changeCrowd} ref={val => this.changeCrowdType = val} />
			</div>
		);
	}
}
