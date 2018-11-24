import React, { Component } from "react";
import { CreatePortalFunc, Copy, DebounceClick } from "wya-rc";
import { Modal, message, Button, Input } from "antd";
import net from "@utils/net";
import API_ROOT from "@constants/apiRoot";
import qrcode, { createQRCode } from "wya-qrcode";

@CreatePortalFunc({
	cName: "root-modal-share-code",
	onBefore: (opts = {}) => {
		message.destroy();
		let { room_id } = opts;
		return new Promise((resolve, reject) => {
			net.ajax({
				url: API_ROOT["_LIVE_MAIN_LIST_SHARECODE_GET"],
				type: "GET",
				param: {
					room_id
				}
			}).then(res => {
				resolve(res);
			}).catch(error => {
				reject(error);
			});
		});
	}
})
class ShareCodeModal extends Component {
	constructor(props) {
		super(props);
	}

	handleOk = () => {
		this.props.onSure && this.props.onSure();
	};

	handleCancel = () => {
		this.props.onClose && this.props.onClose();
	};

	render() {
		let { data, room_id, status } = this.props;
		let replay = Number(status) !== 2 ? "0" : "1";
		let code = `${data.url}/live/room?${room_id}&replay=${replay}`;
		return (
			<Modal
				visible={true}
				closable
				wrapClassName="g-modal-container"
				width={400}
				zIndex={1001}
				destroyOnClose={true}
				footer={null}
				onCancel={this.handleCancel}
			>
				<div style={{ padding: "30px" }}>
					<img
						src={createQRCode(code)}
						style={{ width: "283px", marginLeft: "3%" }}
					/>
					<div style={{ marginTop: "15px" }}>
						<Input
							value={code}
							id="url"
							style={{ width: 210, margin: 10 }}
						/>
						<Copy value={code}>
							<DebounceClick
								className="gp-btn-blue"
								tag={Button}
								onClick={this.handleSearch}
							>
								复制
							</DebounceClick>
						</Copy>
					</div>
				</div>
			</Modal>
		);
	}
}

export default ShareCodeModal;
