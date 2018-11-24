import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/home';
import * as types from '@constants/actions/home';
import * as commons from '@constants/actions/_common';
import { MToasts } from 'wya-rc';
import MModals from "@components/_common/MModals/MModals";
import { getCookie, getIosVersion } from '@utils/utils';
import { Socket } from 'wya-socket';
import { setItem } from '@utils/utils';
import { URL_WEBSOCKET } from '@utils/url';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
import Footer from '@components/_common/Footer/Footer';
// 业务组件
import Content from '@components/Home/Main/content';

class Container extends Component {

	getChildContext() {
		let userInfo = getCookie("user_info") || {};
		return {
			socket: this.socket,
			user_id: userInfo.user_id || '1'
		};
	}

	componentWillMount = () => {
		this.socket = new Socket();
		this.socket.connect(URL_WEBSOCKET);
		// 链接成功后获取client_id
		this.socket.on('connect', (res) => {
			const { data = {} } = res.data || {};
			this.client_id = data.client_id;
			this.handleBindGroup();
		});
	}

	componentWillUnmount() {
		const { homeMain: { listInfo = {} } } = this.props;
		const { itemObj } = listInfo;
		// 列表数据存入本地
		setItem(`homeItemObj@${_global.version}`, itemObj, 'localStorage');
		this.socket && this.socket.close();
		this.socket = null;
		this.props.actions.navigator();
	}

	/**
	 * 绑定user_id, 后台需要
	 */
	handleBindGroup = () => {
		const { actions, location } = this.props;
		let url = commons.BIND_USERID_POST;
		let param = {
			client_id: this.client_id,
			type: 4
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				const { data = {} } = res;
				if (data.error_code){
					MToasts.info(res.msg); 
					this.closeWebsocket();
				} else {
					this.socket && this.socket.emit('100', { ...data });
				}
			},
			onError: (res) => {
				MToasts.info(res.msg, 1);
			}
		};
		this.props.actions.request(url, params, { noLoading: true });
	}
	// 关闭websocket
	closeWebsocket = () => {
		this.socket && this.socket.close();
		this.socket = null;
	}

	// 不存在Modal
	showNoLive = (msg) => {
		MModals.alert("",
			<div className="g-flex-ac g-fd-c g-fs-14" style={{ height: 90 }}>
				<div className="g-pd-15">抱歉</div>
				<div className="g-fs-13">{msg}</div>
			</div>,
			[{
				text: "确定",
				onPress: () => { _global.history.replace('/home'); }
			}],
			{
				maskClosable: false
			}
		);
	}
	render() {
		
		// console.log(getIosVersion());
		// let wechatVersion = wechatInfo[1]; 
		// console.log(wechatVersion);

		const { actions, homeMain, location, commonInfo } = this.props;
		const { listInfo, isFetching = 0 } = homeMain;
		return (
			<WxSetTitle title="社群">
				<Content
					actions={actions}
					listInfo={listInfo}
					isFetching={isFetching}
				/>
				<Footer />
			</WxSetTitle>
		);
	}
}

Container.childContextTypes = {
	socket: PropTypes.object,
	user_id: PropTypes.string
};

function mapStateToProps(state) {
	return {
		homeMain: state.homeMain,
		commonInfo: state.commonInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
