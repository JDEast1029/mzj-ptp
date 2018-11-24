import React, { Component } from 'react';
import Search from './Search';
import Item from './Item';
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
	'会员ID',
	'会员昵称',
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
			user_sn: props.user_sn || '',
			disableArr: props.disableArr || [],
			nick_name: props.nick_name || '',
			community_id: props.community_id || '',
			onlyOne: props.onlyOne || false,
			id: props.id || 'user_id',
			paramInfo: props.paramInfo || {},
			is_fetch: false,
			getDetail: props.getDetail || false,
			categoryName: props.categoryName || ''
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page, search = false) {
		page = page || 1;
		const { 
			request, 
			user_sn, 
			nick_name,  
			community_id,
			paramInfo
		} = this.state;
		this.setState({
			isEnd: 1
		}, () => {
			this.request = request({
				url: API_ROOT['_COMMON_AGENT_LIST_GET'],
				type: "get",
				param: {
					page,
					user_sn,
					nick_name,
					community_id,
					...paramInfo
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'user_id');
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
						selectArr: this.state.is_fetch ? this.state.selectArr : res.data.check_user_ids
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
						selectArr: this.state.is_fetch ? this.state.selectArr : res.data.check_user_ids
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
		const { getDetail, selectArr } = this.state;
		if (getDetail) {
			return this.state.selectArr.map((val, index) => {
				return this.state.itemObj[val];
			});
		} else {
			return selectArr;
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
			activity_type,
			onlyOne,
			disableArr,
			disableText,
			categoryName
		} = this.state;
    	return (
			<div className="g-modal-box">
    			<Search
    				request={request}
    				onInputChange={this.handleChangeInput}
    				onSearch={this.loadDataForPaging}
					categoryName={categoryName}
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
						onlyOne: onlyOne
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
    		</div>
    	);
	}
}
