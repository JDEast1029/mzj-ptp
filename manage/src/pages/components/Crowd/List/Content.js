import React, { Component, Fragment } from 'react';
import { Paging } from 'wya-rc';
import Item from './Item';

import { Modal } from 'antd';
import * as types from '@constants/actions/crowd';
const title = [
	'序号',
	<div key="name" className="g-tl">
		社群名称
	</div>,
	'群成员人数',
	'管理员人数',
	'群素材数',
	'群直播数',
	'创建时间',
	'操作'
];

class Content extends Component {
    loadDataForPaging = (nextPage) => {
    	const { listInfo, keyword, page, query } = this.props;
    	const { itemArr, curPage } = listInfo;
    	const realPage = nextPage;
    	if (listInfo.isEnd > 0) { // 只有状态为0时才可以加载数据
    		return false;
    	}
    	let url = types.CROWD_LIST_GET;
    	let param = {
    		...query,
    		page: realPage
    	};
    	let params = {
    		param: param,
    		ajaxType: 'GET',
    		onSuccess: (res) => {

    		},
    		onError: (res) => {
    		}
    	};
    	this.props.actions.request(url, params, { setPage: itemArr[realPage] });
    }
    render() {
    	const { listInfo, actions, keyword, pageStatus } = this.props;
    	const { 
    		isEnd, 
    		curPage, 
    		totalPage, 
    		itemArr, 
    		itemObj, 
    		selectArr, 
    		totalCount, 
    		resetPage 
    	} = listInfo;
    	return (
    		<Paging
    			history={true}
    			title={title}
    			isEnd={isEnd}
    			dataSource={{ itemArr, itemObj }}
    			actions={actions}
    			curPage={parseInt(curPage, 10)}
    			showTotal={() => `共 ${totalCount || 0} 条`}
    			totalPage={totalPage}
    			loadDataForPaging={this.loadDataForPaging}
    			resetPrvScrollTop={curPage}
    			resetPage={resetPage}
    			renderRow={Item}
    			rowProps={{
    				keyword,
    				selectArr,
    				curPage,
    				pageStatus,
    				actions,
    			}}
    		/>
    	);
    }
}

export default Content;
