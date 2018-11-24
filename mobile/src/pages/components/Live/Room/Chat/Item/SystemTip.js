import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import './Styles.scss';

@pureRender
class SystemTip extends Component {
	render() {
		const { itemData = {} } = this.props;

		return (
			<div className="v-live-item-tip g-flex-cc g-m-tb-5">
				<div className="_tip">
					{itemData.msg}
				</div>
			</div>
		);
	}
}

export default SystemTip;
