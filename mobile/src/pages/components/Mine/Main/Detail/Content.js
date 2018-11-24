/**
 * 个人资料
 */
import React, { Component } from 'react';
import { getHashUrl } from '@utils/utils';
import wx from 'weixin-js-sdk';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';
import { MToasts } from 'wya-rc';
import * as types from '@constants/actions/mine';
// 业务组件
import Cell from '@components/_common/Cell/Cell';
import './Styles.scss';
class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			avatar: props.data.avatar || ''
		};
		this.loadMainData(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isFetching > 0) {
			this.setState({
				avatar: nextProps.data.avatar || ''
			});
		}
	}

	loadMainData(props) {
		let url = types.MINE_MAIN_LIST_GET;
		let param = {
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				console.error(res.msg);
			}
		};
		props.actions.request(url, params, {});
	}

	handleName = () => {
		const { data: { nick_name = '' } } = this.props;
		_global.history.push(getHashUrl(`/mine/name`, { nick_name }));
	}

	handleAvatar = () => {
		let _this = this;
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			success: function (res) {
				// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				let localIds = res.localIds;
				_this.handleUploadImg(localIds);
			},
			fail: function (error) {
				console.error(JSON.stringify(error), 'chooseImage');
			}
		});
	}

	handleUploadImg = (localIds) => {
		let _this = this;
		let localId = localIds.shift();
		wx.uploadImage({
			localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			// isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
				let serverId = res.serverId; // 返回图片的服务器端ID
				_this.handleGetImageUrl(serverId, () => { _this.handleUploadImg(localIds); });
			},
			fail: function (error) {
				console.error(JSON.stringify(error), 'uploadImage');
			}
		});
	}

	// 获取图片url地址
	handleGetImageUrl = (media_id, callback) => {
		const _this = this;
		net.ajax({
			url: API_ROOT['_UPLOAD_MEDIA_POST'],
			type: 'POST',
			param: {
				media_id
			},
			noLoading: true,
		}).then((res) => {
			const { url } = res.data || {};
			this.setState({ avatar: url }, () => {
				_this.handleSaveAvatar();
			});
			callback();
		}).catch((errors) => {
			MToasts.info(errors.msg, 1);
		});
	}
	// 保存头像
	handleSaveAvatar = () => {
		const { avatar } = this.state;
		let url = types.MINE_AVATAR_SAVE_POST;
		let param = {
			avatar
		};
		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				if (res.status) {
					MToasts.info("保存成功", 1);
				}
			},
			onError: (res) => {
				MToasts.info(res.msg);
			}
		};
		this.props.actions.request(url, params, {});
	}

	render() {
		const { data = {} } = this.props;
		const { avatar } = this.state;
		return (
			<div className="v-mine-detail g-m-t-5">
				<Cell
					title="头像"
					onClick={this.handleAvatar}
					className="g-border-b-line"
					style={{ height: 75 }}
				>
					<img src={avatar} alt="" className="_avatar" />
				</Cell>
				<Cell
					title="ID"
					className="g-border-b-line"
				>
					{data.user_sn}
				</Cell>
				<Cell
					title="名称"
					onClick={this.handleName}
				>
					{data.nick_name}
				</Cell>
			</div>
		);
	}

};

export default Main;
