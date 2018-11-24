import React, { Component } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { CreatePortalFunc } from 'wya-rc';
import { createQRCode } from 'wya-qrcode';
import { DebounceClick, Copy } from 'wya-rc';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';

@CreatePortalFunc({
	cName: 'rc-modal-link',
	onBefore: (options = {}) => {
		const { community_ids, refreshable } = options;
		return new Promise((resolve, reject) => {
			if (!refreshable) {
				resolve({});
				return !1;
			}
			net.ajax({
				url: API_ROOT['_CROW_INVITE_LINK_GET'],
				type: 'GET',
				param: {
					community_ids
				},
				noLoading: true,
			}).then((res) => {
				resolve({ data: { url: res.data } });
			}).catch((errors) => {
				message.error(errors.msg);
			});
		});
	}
})
class Link extends Component {
	constructor(props) {
		super(props);
		const { url, data } = props;
		this.state = {
			url: url || data.url
		};
	}

	handleCancle = () => {
		const { onClose } = this.props;
		onClose && onClose();
	}

	handleCopyAfter = () => {
		message.success('复制成功', 1);
	}

	handleRefresh = () => {
		const { community_ids } = this.props;
		Modal.confirm({
			title: '确定刷新?',
			content: '刷新后，之前加入该群的链接将会失效，请使用刷新后的最新的链接邀请他人',
			onOk: () => {
				net.ajax({
					url: API_ROOT["_COMMON_REFRESH_INVITE_LINK_GET"],
					type: "GET",
					param: {
						community_ids
					}
				}).then(res => {
					this.setState({
						url: res.data
					});
				}).catch(error => {
					message.warn(error.msg);
				});
			}
		  });
	}

	render() {
		const { data, refreshable = false } = this.props;
		const { url } = this.state;
		
		return (
			<Modal
				width={600}
				title="邀请链接"
				wrapClassName="g-modal-container"
				onCancel={this.handleCancle}
				visible={true}
				maskClosable
				footer={null}
			>
				<div className="g-flex g-ai-c g-jc-sa g-fw-w g-relative">
					<p className="g-tc g-width">二维码地址：</p>
					<span
						hidden={!refreshable} 
						className="g-pointer g-c-blue"
						style={{
							position: 'absolute',
							top: 0,
							right: 0
						}}
						onClick={this.handleRefresh}
					>
						刷新
					</span>
					<img src={createQRCode(url)} alt="" className="g-img-125" />
					<div className="g-width g-m-t-20 g-flex g-jc-c g-fw-w g-m-b-20">
						<p className="g-tc g-width">请用微信将下面的邀请函链接发送给他人</p>
						<span className="g-lh-32">链接地址：</span>
						<Input value={url} className="_copy" style={{ width: 240, marginRight: 5 }} />
						<Copy
							value={url}
							onCopyAfter={this.handleCopyAfter}
						>
							<DebounceClick
								style={{ display: 'inline' }}
								type="primary"
								tag={Button}
							>复制链接</DebounceClick>
						</Copy>
					</div>
				</div>
			</Modal>
		);
	}
}
export default Link;