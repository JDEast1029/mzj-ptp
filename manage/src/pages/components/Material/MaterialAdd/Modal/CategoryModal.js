/**
 * 素材分类选择框
 */
import React, { Component } from 'react';
import { CreatePortalFunc, CreateLanguage, Paging, DebounceClick } from 'wya-rc';
import { Modal, message, Button } from 'antd';
import { concat, difference, uniq } from 'lodash';
import { initPage, initItem } from '@utils/utils';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';
import Search from './Search';
import Item from './Item';

const initialState = {
	...initPage,
	selectItem: {}
};

const title = [
	'序号',
	<div key="2" className="g-tl">分类名称</div>,
	'操作'
];

@CreatePortalFunc({
	cName: 'root-modal-category'
})
@CreateLanguage()
class CategoryModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
			selectArr: props.selectArr || [],
			activeText: props.activeText || '取消',
			staticText: props.staticText || '选择',
		};
	}

	loadDataForPaging = (page = 1, search = false) => {
		let keywords = this.keywords && this.keywords.props.form.getFieldsValue() || {};

		this.setState({
			isEnd: 1
		}, () => {
			net.ajax({
				url: API_ROOT['_MATERIAL_CATEGORY_LIST_GET'],
				type: "GET",
				param: {
					page,
					name: keywords.category_name
				}
			}).then((res) => {
				let items = initItem(res.data.list || [], 'category_id');
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
						itemObj: { ...initialState.itemObj, ...items.itemObj }
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
						itemObj: { ...this.state.itemObj, ...items.itemObj }
					});
				}
			}).catch((error) => {
				error.msg && message.error(error.msg);
			});
		});
	};

	handleSelect = (flag, id, data, cb) => {
    	let newArr = [...this.state.selectArr];
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
	};

	// 全选
	handleSelectAll = () => {
		const { curPage, itemArr, itemObj, } = this.state;
		const addArray = itemArr[curPage];

		this.setState({
			selectArr: uniq(concat(this.state.selectArr, addArray))
		});
	};

	// 取消全选
	handleCancelAll = () => {
		const { curPage, itemArr } = this.state;
		const delArray = itemArr[curPage];

		this.setState({
			selectArr: difference(this.state.selectArr, delArray)
		});
	};

	getSelectArr = () => {
		return this.state.selectArr;
	};

	handleCancel = () => {
		const { onClose } = this.props;
		onClose && onClose();
	};

	handleOk = () => {
		const { onSure } = this.props;
		onSure && onSure(this.state.selectArr);
	};

	render() {
		const {
			isEnd, curPage, totalPage, totalCount, itemArr, itemObj, resetPage,
			activeText, staticText, selectArr
		} = this.state;

		return (
			<Modal
				className="g-modal-container"
				visible={true}
				closable={true}
				maskClosable={true}
				title={'选择所属分类'}
				width={900}
				zIndex={1001}
				destroyOnClose={true}
				footer={null}
				onCancel={this.handleCancel}
			>
				<div className="g-black-dark">
					<div className="g-m-b-15">全部素材分类</div>
					<Search
						wrappedComponentRef={(keywords) => { this.keywords = keywords; }}
						onSearch={this.loadDataForPaging}
					/>
					<Paging
						title={title}
						className="__no-pd"
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
							selectArr,
							activeText,
							staticText,
						}}
						dataSource={{ itemArr, itemObj }}
					>
						<div
							style={{ width: 98 }}
							className="gp-btn-white"
							onClick={this.handleSelectAll}
						>
							全选
						</div>
						<div
							className="gp-btn-white g-m-l-20"
							onClick={this.handleCancelAll}
						>
							取消全选
						</div>
					</Paging>
					<div className="g-flex-cc" style={{ marginTop: 40 }}>
						<DebounceClick
							className="gp-btn-blue"
							type="primary"
							tag={Button}
							onClick={this.handleOk}
						>
							创建
						</DebounceClick>
					</div>
				</div>
			</Modal>
		);
	}
}

export default CategoryModal;
