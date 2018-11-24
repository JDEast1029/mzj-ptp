import React, { PureComponent } from 'react';
import { message } from 'antd';
import * as types from '@constants/actions/material';
import './Styles.scss';

class Preview extends PureComponent {

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		const { material_id } = this.props;
		let url = types.MATERIAL_DETAIL_GET;
		let param = {
			material_id
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

		this.props.actions.request(url, params);
	};

	render() {
		const { title = '', icon, remark = '' } = this.props.materialInfo || {};
		return (
			<div className="g-col g-flex-ac g-fd-c v-material-detail">
				<div className="g-relative  _cover">
					<img className="__img" src={icon}/>
					<span className="__title">{title}</span>
				</div>
				<div className="g-black-dark g-m-t-10" style={{ width: '490px' }}>
					{remark}
				</div>
			</div>
		);
	}
}

export default Preview;
