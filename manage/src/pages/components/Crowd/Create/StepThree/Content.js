import React, { Component, Fragment } from 'react';
import { Paging } from 'wya-rc';
import Item from './Item';
import SelectCategory from '@common/SelectCategory/SelectCategory';
import { Modal, message } from 'antd';
import * as types from '@constants/actions/crowd';
import apiRoot from '@constants/apiRoot';
import { delItem } from '@utils/utils';
import net from '@utils/net';
const title = [
	'序号',
	<div key="1" className="g-tl">
		分类名称
	</div>,
	<div key="2" className="g-tl">
		素材数量
	</div>,
	'操作'
];

class Content extends Component {
    loadDataForPaging = () => {
    	if (!nextPage) return;
    	const { info, keyword, page, query } = this.props;
    	const { itemArr, curPage, isEnd } = info;
    	const realPage = nextPage;
    	if (isEnd > 0) { // 只有状态为0时才可以加载数据
    		return false;
    	}
    	let url = types.CROWD_CREATE_MATERIAL_CHANGE_PAGE;
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
	handleAdd = () => {
		const disableArr = this.props.info.info.map((val) => {
			return val.category_id;
		});
		SelectCategory.popup({
			getDetail: true,
			disableArr,
			onlyOne: false,
			title: '添加群素材'
		}).then((res) => {
			this.props.actions.crowdCreateAddMaterial(res);
		}).catch(() => {

		});
	}
	handleDone = () => {
		const { beforeInfo } = this.props;
		const material_category_ids = this.props.info.info.map((val, index) => {
			return val.category_id;
		});
		net.ajax({
			url: apiRoot['_CROWD_CREATE_SAVE_POST'],
			type: 'POST',
			param: { ...beforeInfo, material_category_ids },

		}).then(() => {	
			delItem('createUser');
			delItem('createMember');
			message.success('创建成功', 1.5, () => {
				this.props.actions.crowdCreateInitMaterial();
				_global.history.push('/crowd/list');
			});
		}).catch((error) => {
			error.msg && message.error(error.msg);
		});
	}
	render() {
    	const { listInfo, actions, keyword, pageStatus, info } = this.props;
		const { isEnd, curPage, totalPage, itemArr, itemObj, selectArr, totalCount, resetPage } = info;
    	return (
			<div style={{ marginTop: 86 }}>
    			<div className="g-flex g-jc-fe g-m-b-10">
    				{/* <div>共计{info.number}条素材（不含群素材）</div> */}
    				<div  className="gp-btn-blue" onClick={this.handleAdd}>添加群素材</div>
    			</div>
    			<Paging
    				history={true}
    				title={title}
    				isEnd={isEnd}
    				dataSource={{ itemArr, itemObj }}
    				actions={actions}
    				curPage={parseInt(curPage, 10)}
					showTotal={() => `共 ${info.info.length || 0} 条`}
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
    			>
					<div className="g-flex">
						<div 
							className="gp-btn-blue g-m-r-10" 
							style={{ marginRight: '60px' }} 
							onClick={() => { _global.history.goBack(); }}
						>
							上一步
						</div>
						<div className="gp-btn-blue" onClick={this.handleDone}>完成</div>
					</div>
				</Paging>
    		</div>
    	);
	}
}

export default Content;
