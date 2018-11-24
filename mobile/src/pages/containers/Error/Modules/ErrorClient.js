import React, { Component } from 'react';
import { ERROR_CLIENT_BG } from '@constants/constants';

class ErrorClient extends Component {

	render() {
		return (
			<div className="g-flex g-jc-c">
				<div style={{
					background: '#fafafa',
					maxWidth: '640px',
					height: '100vh'
				}}>
					<img style={{ width: '100vw' }} src={ERROR_CLIENT_BG} />
				</div>
			</div>
		);
	}
}

export default ErrorClient;
