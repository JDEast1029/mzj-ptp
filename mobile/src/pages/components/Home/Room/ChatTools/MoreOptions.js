import React, { Component } from 'react';
import PropTypes from 'prop-types';
import wx from 'weixin-js-sdk';
import { MToasts } from 'wya-rc';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';
import './Styles.scss';

class MoreOptions extends Component {
	// 发送图片
	handleSendPic = () => {
		let _this = this;
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
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
			fail: function(error) {
				console.error(JSON.stringify(error), 'uploadImage');
			}
		});
	}

	// 获取图片url地址
	handleGetImageUrl = (media_id, callback) => {
		const { socket } = this.context;
		const { community_id, baseInfo } = this.props;
		net.ajax({
			url: API_ROOT['_UPLOAD_MEDIA_POST'],
			type: 'POST',
			param: {
				media_id
			},
			noLoading: true,
		}).then((res) => {
			const { url } = res.data || {};
			callback();
			socket.emit('650', {
				...baseInfo,
				community_id,
				msg_type: 1,
				msg_url: url
			});
		}).catch((errors) => {
			MToasts.info(errors.msg, 1);
		});
	}

	handleSendMaterial = () => {
		const { community_id } = this.props;
		_global.history.push(`/home/materiallist?community_id=${community_id}`);
	}

	render() {
		return (
			<div className="g-b-t g-pd-20 v-chat-more" style={{ height: 206 }}>
				<div className="g-flex-ac">
					<div 
						className="g-col g-flex-cc g-fd-c g-pd-lr-15" 
						onClick={this.handleSendPic}
					>
						<div className="_item g-flex-cc">
							<i className="iconfont icon-tupian g-fs-24" /> 
						</div>
						
						<span className="g-m-t-2 g-fs-12">发送图片</span>
					</div>
					<div 
						className="g-col g-flex-cc g-fd-c g-pd-lr-15"
						onClick={this.handleSendMaterial}
					>
						<div className="_item g-flex-cc">
							<i className="iconfont icon-material2 g-fs-24" /> 
						</div>
						
						<span className="g-m-t-2 g-fs-12">发送素材</span>
					</div>
					<div className="g-col g-pd-lr-15" />
					<div className="g-col g-pd-lr-15" />
				</div>
			</div>
		);
	}
}

MoreOptions.contextTypes = {
	socket: PropTypes.object,
	baseInfo: PropTypes.object,
};

export default MoreOptions;