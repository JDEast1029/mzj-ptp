import React, { Component, Fragment } from 'react';
import { Paging } from 'wya-rc';
import Item from './Item';
import SelectAgent from '@common/SelectAgent/SelectAgent';
import { Modal } from 'antd';
import { getItem, setItem } from '@utils/utils';
import * as types from '@constants/actions/crowd';
const title = [
	'序号',
	<div key="1" className="g-tl">
		会员ID
	</div>,
	<div key="2" className="g-tl">
		会员昵称
	</div>,
	'注册时间',
	<div key="3" className="g-tl" style={{ width: 60 }}>
		身份
	</div>,
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
    	let url = types.CROWD_EDIT_MEMBER_LIST_GET;
    	let param = {
			...query,
			page: realPage,
			step: 2,
			community_id: query.id
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
		const { isEnd, curPage, totalPage, itemArr, itemObj, selectArr, totalCount, resetPage } = listInfo;
    	return (
    		<Fragment>
    			<Paging
					history
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
    					selectArr,
    					curPage,
    					pageStatus,
    					actions,
    				}}
    			 />
    		</Fragment>
    	);
	}
}

export default Content;
