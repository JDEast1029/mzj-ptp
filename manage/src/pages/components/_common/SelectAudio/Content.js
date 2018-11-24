import React, { Component } from 'react';
import Search from './Search';
import Item from './Item';
import { initPage, initItem } from '@utils/utils';
import { message } from 'antd';
import { Paging } from 'wya-rc';
import { ajax } from 'wya-fetch';
import API_ROOT from '@constants/apiRoot';
import AddAudio from '../AddAudio/AddAudio';
const initialState = {
	...initPage,
	selectItem: {}
};
const title = [
	<div key="1" className="g-tl">名称</div>,
	'格式',
	'大小',
	'上传时间',
	'操作'
];
export default class Content extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			...initialState,
			selectArr: [],
			request: props.request || ajax,
			selectObj: props.selectObj || {},
			activeText: props.activeText || '取消',
			staticText: props.staticText || '选择',
			visible: true,
			type: props.type || '',
			name: props.name || '',
			upload_time_start: props.upload_time_start || '',
			upload_time_end: props.upload_time_end || '',
			id: props.id || 'audio_id',
			onlyOne: props.onlyOne || false,
			getDetail: props.getDetail || false,
			max: props.max || null,
			itemObj: props.itemObj,
		};
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page, search = false) {
		page = page || 1;
		const { name, type, upload_time_start, upload_time_end, request } = this.state;
		this.setState({
			isEnd: 1
		}, () => {
			this.request = request({
				url: API_ROOT['_COMMON_AUDIO_LIST_GET'],
				type: "get",
				param: {
					page,
					name,
					type,
					upload_time_start,
					upload_time_end
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'audio_id');
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
						disableArr: res.data.activity_product_id || []
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
						disableArr: res.data.activity_product_id || []
					});
				}
			}).catch((res = {}) => {
				res.msg && message.error(res.msg);
			});
		});
	}
	selectAll = () => {
		const { disableArr, max } = this.state;
		const arr = this.state.itemArr[this.state.curPage].filter((val) => {
			return disableArr.indexOf(val) == -1;
		});
		const newArr = this.state.selectArr.concat(arr);
		if (max && newArr.length > max){
			message.error('做多只能选择{max}个');
		}
		this.setState({
			selectArr: Array.from(new Set(newArr))
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
    handleSelect = (flag, id, data, cb) => {
    	let newArr = [...this.state.selectArr];
    	cb && cb();
    	if (flag) {
    		 newArr.push(id);
    	} else {
    		newArr = this.state.selectArr.filter((item, index) => {
    			return item != id;
    		});
    	}
    	this.setState({
    		selectArr: newArr
    	});
    }
	handleDel = (audio_id) => {
		const { request } = this.state;
		request({
			url: API_ROOT['_COMMON_AUDIO_DEL_POST'],
			type: "GET",
			param: {
				audio_id
			},
		}).then((res) => {
			this.loadDataForPaging(1, true);
		}).catch((res = {}) => {
			res.msg && message.error(res.msg);
		});
	}
	getSelectArr = () => {
		return this.selectArr;
	}
	handleChangeInput = (val, key) => {
		if (key == 'time'){
			this.setState({
				upload_time_start: val[0],
				upload_time_end: val[1]
			});
			return;
		}
		this.setState({
			[key]: val
		});
	}
	handleShowGoodsInfo = () => {
		AddAudio.popup({
		}).then((res) => {
			console.log(res);
			this.uploadAudio(res);
		}).catch((error) => {

		});
	}
	uploadAudio = (fileList) => {
		const data = fileList.map((val, index) => {
			const { type, url, size, title } = val;
			return  {
				type,
				url,
				size,
				title
			};
		});
		console.log(data);
		this.state.request({
			url: API_ROOT['_COMMON_AUDIO_ADD_SAVE_POST'],
			type: "POST",
			requestType: 'form-data',
			param: data,
			requestType: 'form-data:json',
		}).then((res) => {
			message.success('添加成功');
			this.loadDataForPaging(1, true);
		}).catch((res = {}) => {
			res.msg && message.error(res.msg);
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
    	const { onClick, component } = this.props;
    	const {
			activeText, 
			staticText, 
			disableText,
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
    		sale_price_start,
			sale_price_end,
			onlyOne,
			max
		} = this.state;
    	return (
			<div className="g-modal-box">
    			<Search
					product_name={product_name}
					onInputChange={this.handleChangeInput}
					onSearch={this.loadDataForPaging}
					onAdd={this.handleShowGoodsInfo}
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
						onDel: this.handleDel,
    					activeText: activeText,
    					staticText: staticText,
						onlyOne,
						max
    				}}
    				dataSource={{ itemArr, itemObj }}
    			/>
    		</div>
    	);
	}
}
