/**
 * Table
 */
import React, { Component } from "react";
import { Paging } from "wya-rc";
import Item from "./Item";
import * as types from "@constants/actions/material";

const title = [
	<div key={"num"}>序号</div>,
	<div key={"title"} className="g-tl">
		素材标题
	</div>,
	<div key={"name"}>所属分类数</div>,
	<div key={"create_time"}>创建时间</div>,
	<div key={"caozuo"} className="g-tl">
		操作
	</div>,
];

class Table extends Component {
	constructor(props) {
		super(props);
		this.loadDataForPaging = this.loadDataForPaging.bind(this); // 加载数据
	}
	loadDataForPaging(page) {
		const { listInfo, query } = this.props;
		const { itemArr, curPage } = listInfo;
		if (listInfo.isEnd > 0) {
			// 只有状态为0时才可以加载数据
			return false;
		}
		let url = types.MATERIAL_LIST_GET;
		let param = {
			...query,
			page
		};
		let params = {
			param: param,
			ajaxType: "GET",
			onSuccess: res => {},
			onError: res => {}
		};
		this.props.actions.request(url, params, { setPage: itemArr[page] });
	}
	render() {
		const { listInfo, actions, query } = this.props;
		const {
			isEnd,
			curPage,
			totalPage,
			itemArr,
			itemObj,
			isFetching,
			totalCount,
			resetPage
		} = listInfo;

		return (
			<Paging
				history={true}
				title={title}
				isEnd={isEnd}
				dataSource={{ itemArr, itemObj }}
				curPage={parseInt(curPage, 10)}
				totalPage={totalPage}
				showTotal={() => `共 ${totalCount || 0} 条`}
				loadDataForPaging={this.loadDataForPaging}
				resetPrvScrollTop={curPage}
				resetPage={resetPage}
				renderRow={Item}
				rowProps={{
					actions,
					query,
					curPage
				}}
			/>
		);
	}
}

export default Table;
