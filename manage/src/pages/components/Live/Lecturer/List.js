import React, { Component } from 'react';
import * as types from '@constants/actions/live';
import { Pagination, Button, message } from 'antd';
import { DebounceClick } from 'wya-rc';
import { getHashUrl } from '@utils/utils';
// 业务组件
import Card from './Card/Card';
import Forms from './Modal/Forms';

class Content extends Component {
	constructor(props, context) {
		super(props, context);
		this.loadDataForPaging(props.query.page);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isFetching !== nextProps.isFetching) {
			this.loadDataForPaging(nextProps.query.page);
		}
	}

	loadDataForPaging(page = 1) {
		let url = types.LIVE_LECTURER_LIST_GET;
		let param = {
			page
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	}

	handlePageChange = (page) => {
		_global.history.replace(getHashUrl('/live/lecturer', { page }));
		this.loadDataForPaging(page);
	}

	handleEdit = (opts) => {
		const { type, lecturer_id } = opts;
		const { actions } = this.props;
		if (type == 1) { // 添加
			this.handlePopUp({ type });
		} else if (type == 2) { // 编辑
			let url = types.LIVE_LECTURER_DETAIL_GET;
			let param = {
				lecturer_id
			};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
					if (res.status) {
						this.handlePopUp({ type, detail: res.data });
					}
				},
				onError: (res) => {
					message.error(res.msg);
				}
			};
			this.props.actions.request(url, params, {});
		}
	}

	handlePopUp = (opts) => {
		const { type, detail } = opts;
		const { actions } = this.props;
		Forms.popup({
			type,
			detail,
			actions
		}).then((res) => { // 点击确定

		}).catch(e => {

		});
	}

	handleDel = (opts) => {
		const { lecturer_id } = opts;
		const { actions } = this.props;
		let url = types.LIVE_LECTURER_DEL_POST;
		let param = {
			lecturer_id
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				message.success(res.msg);
			},
			onError: (res) => {
				message.error(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	}

	render() {
		const { liveLecturer = {} } = this.props;
		const { list = [], totalCount, currentPage } = liveLecturer;
		console.log(currentPage, 'hhh');
		return (
			<div className="_container">
				<div className="g-tr">
					<DebounceClick
						onClick={() => this.handleEdit({ type: 1 })}  // type：1添加、2编辑
						style={{ display: 'inline' }}
						type="primary"
						tag={Button}
						className="g-m-b-10"
					>添加讲师
					</DebounceClick>
				</div>
				<div className="g-flex g-fw-w g-jc-fs g-pd-10">
					{list.length > 0 && list.map((item, index) => {
						return <Card
							key={index}
							item={item}
							onEdit={this.handleEdit}
							onDel={this.handleDel}
						/>;
					})}
				</div>

				<div className="g-tr g-m-20">
					<Pagination
						total={Number(totalCount) || 0}
						current={Number(currentPage) || 0}
						defaultPageSize={10}
						onChange={this.handlePageChange}
						showTotal={total => `共 ${total || 0} 条`}
						showQuickJumper
					/>
				</div>
			</div>
		);
	}
}

export default Content;

