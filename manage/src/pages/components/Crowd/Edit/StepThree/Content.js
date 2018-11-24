import React, { Component, Fragment } from 'react';
import { Paging } from 'wya-rc';
import Item from './Item';
import SelectCategory from '@common/SelectCategory/SelectCategory';
import { Modal } from 'antd';
import { getItem, setItem } from '@utils/utils';
import * as types from '@constants/actions/crowd';
const title = [
	'序号',
	<div key="1" className="g-tl">
		分类名称
	</div>,
	<div key="2" className="g-tl">
		素材数量
	</div>
];

class Content extends Component {
	loadDataForPaging = (nextPage) => {
		const { listInfo, keyword, page, query } = this.props;
		const { itemArr, curPage } = listInfo;
		const realPage = nextPage;
		if (listInfo.isEnd > 0) { // 只有状态为0时才可以加载数据
			return false;
		}
		let url = types.CROWD_EDIT_MATERIAL_LIST_GET;
		let param = {
			...query,
			page: realPage,
			step: 3,
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
	handleAdd = () => {
		const { query: { id } } = this.props;
		SelectCategory.popup({
			onlyOne: false,
			paramInfo: {
				community_id: id,
				type: 2
			}
		}).then((res) => {
			// this.props.actions.crowdCreateAddMember(res);
			this.addAgent(res);
		}).catch(() => {

		});
	}
	addAgent = (data) => {
		const { query: { id } } = this.props;
		const url = types.CROWD_EDIT_MATERIAL_ADD_POST;
		const param = {
			material_category_ids: data,
			step: 3,
			community_id: id
		};
		const params = {
			param,
			ajaxType: 'POST',
			onSuccess: () => {

			},
			onError: () => {

			}
		};
		this.props.actions.request(url, params, {});
	}
	render() {
		const { listInfo, actions, keyword, pageStatus } = this.props;
		const { isEnd, curPage, totalPage, itemArr, itemObj, selectArr, totalCount, resetPage } = listInfo;
		return (
			<Fragment>
				<div className="g-flex g-jc-sb g-m-b-20" style={{ marginTop: 40 }}>
					<div>共计{listInfo.community_material_num}条素材（不含重复素材）</div>
					<div className="gp-btn-blue" onClick={this.handleAdd}>编辑素材</div>
				</div>
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
