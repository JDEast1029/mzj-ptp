import React, { Component } from 'react';
import Item from './Item';
import Wechat from './Wechat';
import net from "@utils/net";
import API_ROOT from "../../../constants/apiRoot";
import * as types from "@constants/actions/home";
import Bg from './list2.jpg';
import { Toast } from 'antd-mobile';
export default class List2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {
				list: [],
				isFetched: false
			}
		};
	}
	componentWillMount() {
		!this.state.info.isFetched && this.loadData();
	}
	loadData = () => {
		Toast.loading();
		net.ajax({
			url: API_ROOT[types.HOME_MAIN_LIST_GET],
			type: "GET",
			param: {
				type: '2'
			},
			noLoading: true
		}).then(res => {
			Toast.hide();
			this.setState({
				info: {
					list: res.data,
					isFetched: true
				}
			});
		}).catch(errors => {
			Toast.hide();
			Toast.info(errors.message);
		});
	}

	renderList = () => {
		const { info: { list = [] } } = this.state;

		return list.map((item, index) => {
			return <Item key={index} info={item} />;
		});  
	}

	render() {
		return (
			<div className="g-bg-white">
				<div style={{ width: '100%', height: 110 }}>
					<img style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover'
					}} src={Bg} />
				</div>
				
				{this.renderList()}

				<Wechat />
			</div>
		);
	}
}
