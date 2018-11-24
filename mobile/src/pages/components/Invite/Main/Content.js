import React, { Component, Fragment } from 'react';
import * as types from '@constants/actions/invite';
import Item from './Item';
import Footer from './Footer';
import Empty from '@components/_common/Empty/Empty';
import { MToasts } from 'wya-rc';
import { INVITE_NOT_FOUND } from '@constants/constants';
import './Styles.scss';

class Content extends Component {
	constructor(props) {
		super(props);
		this.loadData(props);
	}

	loadData(props) {
		const { query, actions } = props;
		let url = types.INVITE_MAIN_LIST_GET;
		let param = {
			url_id: query.url_id || 0
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				MToasts.info(res.msg, 1.5);
			}
		};
		actions.request(url, params, {});
	}

	handleEnter = () => {
		const { query, actions } = this.props;
		let url = types.INVITE_MAIN_ENTER_POST;
		let param = {
			url_id: query.url_id || 0
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				_global.history.replace('/home');
			},
			onError: (res) => {
				MToasts.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, {});
	}

	render() {
		const { data = {}, isFetching = 0, actions } = this.props;
		const { list = [], content = '' } = data;
		if (isFetching && !list.length) {
			return <Empty title="邀请函已失效" img={INVITE_NOT_FOUND} />;
		}
		return (
			<div className="v-invite-container g-bg-white g-flex g-fd-c">
				<div
					className="g-fs-16 g-black-333 g-pd-tb-10 g-bg-gray-middle v-invite-other"
					style={{ paddingLeft: 12, height: 40 }}
				>掌柜邀您入群</div>
				<div className="v-invite-main">
					{list.map((item, index) => {
						return (
							<Item
								key={index}
								itemData={item}
							/>
						);
					})}
				</div>
				<Footer
					content={content}
					onClick={this.handleEnter}
				/>
			</div>
		);
	}
}
export default Content;