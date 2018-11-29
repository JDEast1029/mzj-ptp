import React, { Component } from 'react';
import { Link } from 'react-router';
import Item from './Item';
import Wechat from './Wechat';
import net from "@utils/net";
import API_ROOT from "../../../constants/apiRoot";
import * as types from "@constants/actions/home";
import Bg from './list1.png';
import { getItem } from '@utils/utils';
import { Toast } from 'antd-mobile';
import MPopup from '@components/_common/MPopup/MPopup';
import PopContent from './PopContent';

export default class List1 extends Component {
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
				type: '1'
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
		});
	}

	handlePopup = () => {
		MPopup.popup({
			parent: this,
			orientation: 'bottom',
			content: (
				<PopContent />
			)
		}).then((res) => {

		}).catch((error) => {
			
		});
	}

	renderList = () => {
		const { info: { list = [] } } = this.state;

		return list.map((item, index) => {
			return <Item key={index} info={item} />;
		});  
	}

	render() {
		const user = getItem(`user_${_global.version}`) || {};

		return (
			<div className="g-bg-white">
				<div className="g-flex-cc g-c-white" style={{ backgroundImage: `url(${Bg})`, width: '100%', height: 110 }}>
					{user.phone}
				</div>
				{/** <div className="g-flex-ac">
					<div className="g-col" style={{ backgroundColor: '#F4F4F4', height: 1 }} />
					<span className="g-m-lr-10" style={{ fontSize: 13, color: '#E7A683' }}>第1组</span>
					<div className="g-col" style={{ backgroundColor: '#F4F4F4', height: 1 }} />
				</div> **/}

				{this.renderList()}

				<div className="g-m-t-20 g-tc">
					<p style={{ color: '#ADB2BC' }}>
						以上全部申请均未下款即可领取
					</p>
					<div 
						className="g-flex-cc g-c-white g-fs-16" 
						style={{ margin: '10px 40px 10px 40px', backgroundColor: '#EF0F00', borderRadius: 20, padding: '10px' }}
						onClick={this.handlePopup}
					>
						审批被拒领转运红包
					</div>
					<Link to="/home?type=2" className="g-flex-cc g-c-white g-fs-16" style={{ margin: '10px 40px 10px 40px', backgroundColor: '#2296F3', borderRadius: 20, padding: '10px' }}>
						更多新口子
					</Link>
				</div>
				<Wechat />
			</div>
		);
	}
}
