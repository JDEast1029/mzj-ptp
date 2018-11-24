
import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import { defineProperty } from '@utils/utils';
import { getCookie, setCookie } from '@utils/utils';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.expire_msg && !getCookie('is_showed')
		};
	}

	handleHide = (e) => {
		this.setState({
			visible: false
		});
		setCookie('is_showed', true);
	};

	render() {
		let { expire_msg } = this.props;

		return (
			<Modal
				title="服务到期提醒"
				visible={(this.state.visible)}
				onOk={this.handleHide}
				onCancel={this.handleHide}
			>
				<p>{expire_msg}</p>
			</Modal>
		);
	}


}
export default App;




