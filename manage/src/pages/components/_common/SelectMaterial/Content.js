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
	<div key="2" className="g-tl">素材名称</div>,
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
			id: props.id || 'material_id',
			category_name: props.category_name || '',
			getDetail: props.getDetail || false,
			hasFatching: false,
			paramInfo: props.paramInfo || {},
			title: props.title || null
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page, search = false) {

		page = page || 1;
		const {
			request,
			title,
			hasFatching,
			selectArr,
			paramInfo
		} = this.state;
		this.setState({
			isEnd: 1
		}, () => {
			this.request = request({
				url: API_ROOT['_COMMON_MATERIAL_LIST_GET'],
				type: "get",
				param: {
					page,
					title,
					...paramInfo,
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'material_id');
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
						hasFatching: true,
						selectArr: hasFatching ? selectArr : res.data.material_ids
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
						hasFatching: true,
						selectArr: hasFatching ? selectArr : res.data.material_ids
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
			product_id,
			product_name,
			activity_type,
			onlyOne,
			sale_price_start,
			sale_price_end,
			disableArr,
			disableText,
			category_name,
		} = this.state;
		return (
			<div className="g-modal-box">
				{
					category_name && <div className="g-tc g-fs-20">分类名称：{category_name}</div>
				}
				<div className="g-m-b-10">全部素材</div>
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
						onlyOne: onlyOne
					}}
					dataSource={{ itemArr, itemObj }}
				>
					{
						!onlyOne &&
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
