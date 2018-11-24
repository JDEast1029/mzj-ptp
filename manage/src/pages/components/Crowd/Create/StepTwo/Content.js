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
	
	componentWillMount() {
		const url = types.CROWD_CREATE_MEMBER_LOADER_GET;
		const param = {};
		const params = {
			param,
			ajaxType: 'get',
			onSuccess: () => {
				this.getLocalInfo();
			},
			onError: () => {

			}
		};
		this.props.actions.request(url, params, {});
	}
	getLocalInfo = () => {
		const info =  getItem('createMember');
		console.log(info);
		if (info){
			this.props.actions.crowdCreateAddMemberInit(info);
		}
	}
	loadDataForPaging = (nextPage) => {
		if (!nextPage) return;
		const { info, keyword, page, query } = this.props;
		const { itemArr, curPage, isEnd } = info;
		const realPage = nextPage;
		if (isEnd > 0) { // 只有状态为0时才可以加载数据
			return false;
		}
		let url = types.CROWD_CREATE_MEMBER_CHANGE_PAGE;
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
			return val.user_id;
		});
		SelectAgent.popup({
			getDetail: true,
			disableArr,
			onlyOne: false,
			min: 0,
			title: '创建群分类'
		}).then((res) => {
			this.props.actions.crowdCreateAddMember(res);
		}).catch(() => {

		});
	}
	handleNext = (is_next) => {
		const { stepOne } = this.props;
		const { info, loader, roleArr } = this.props.info;
		console.log(info, 999);
		setItem('createMember', { info, roleArr });
		if (!is_next){
			_global.history.goBack();
			return;
		}
		const users = info.map((val, index) => {
			return {
				...val,
				role: roleArr.indexOf(val.user_id) > -1 ? 2 : 0
			};
		});
		users.push(loader);
		_global.history.push({
			pathname: '/crowd/list/create-three',
			state: { users, name: stepOne.name, img: stepOne.img[0] }
		});
	}
	render() {
    	const { listInfo, actions, keyword, pageStatus, info } = this.props;
		const { isEnd, curPage, totalPage, itemArr, itemObj, selectArr, totalCount, resetPage } = info;
    	return (
			<div style={{ marginTop: 86 }}>
    			<div className="g-flex g-jc-sb g-m-b-10">
    				<div>共计{info.number}名群成员</div>
    				<div  className="gp-btn-blue" onClick={this.handleAdd}>添加群成员</div>
    			</div>
    			<Paging
    				title={title}
    				isEnd={isEnd}
    				dataSource={{ itemArr, itemObj }}
    				actions={actions}
    				curPage={parseInt(curPage, 10)}
					showTotal={() => `共 ${info.info.length + 1 || 0} 条`}
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
							onClick={() => { this.handleNext(0); }}
						>
							上一步
						</div>
						<div className="gp-btn-blue" onClick={() => { this.handleNext(1); }}>下一步</div>
					</div>
				</Paging>
    		</div>
    	);
	}
}

export default Content;
