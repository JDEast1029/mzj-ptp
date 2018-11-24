import React, { Component } from 'react';
import Form from '../../common/Form';
import { setItem, getItem } from '@utils/utils';
import apiRoot from '@constants/apiRoot';
import { message, Row, Col } from 'antd';
import net from '@utils/net';

export default class Content extends Component {
	constructor(params) {
		super(params);
		this.state = {
			info: {}
		};
	}
	componentWillMount() {
		const { id } = this.props;
		const url = apiRoot._CROWD_EDIT_USER_GET;
		net.ajax({
			url,
			param: { community_id: id, step: 1 }
		}).then((res) => {
			this.setState({
				info: res.data
			});
		}).catch((error) => {
			error.msg && message.error(error.msg);
		});
	}
	onHandleGetFrom = () => {
		this.form.getInfo(this.handleSave);
	}
	handleSave = (info) => {
		const { id } = this.props;
		const param = {
			name: info.name,
			img: info.img[0],
			step: 1,
			community_id: id
		};
		const url = apiRoot._CROWD_EDIT_USER_SAVE_POST;
		net.ajax({
			url,
			param,
			type: 'POST'
		}).then((res) => {
			message.info('保存成功');
			this.setState({
				...res.data
			});
		}).catch((error) => {
			error.msg && message.error(error.msg);
		});
	}
	render() {
		const { info = {} } = this.state;
    	return (
    		<div style={{ marginTop: 86 }}>
				<Form
					wrappedComponentRef={val => this.form = val}
					info={info}
				/>
				<Row>
					<Col xs={{ span: 24, offset: 24 }} sm={{ span: 12, offset: 6 }} md={{ span: 12, offset: 3 }} >
						<div onClick={this.onHandleGetFrom} className="gp-btn-blue g-m-r-20">保存</div>
					</Col>
				</Row>
    		</div>
    	);
	}
}