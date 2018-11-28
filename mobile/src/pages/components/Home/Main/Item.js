import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Item extends Component {
	render() {
		const { info = {} } = this.props;
		return (
			<div className="v-list-item g-flex">
				<img src={company_logo} />
				<div className="g-m-l-10 g-flex g-fd-c g-jc-sa g-col">
					<div className="g-flex">
						<div className="g-col">
							<span className="g-fs-16 g-m-r-5">{info.company_name}</span>
							{info.is_recommend == 1 && <span className="_recommend g-m-r-5">推荐</span> }
							{ info.is_new == 1 && <span className="_new">New</span> }
						</div>
						<Link to={info.skip_url} className="g-flex-ac g-fs-12 g-m-r-10" style={{ color: '#979797' }}>
							点击申请
							<i className="iconfont icon-right g-m-l-5" style={{ color: '#DBDBDB' }} />
						</Link>
					</div>
					<p className="g-fs-12 g-oneline" style={{ color: '#979797' }}>
						{info.desc}
					</p>
				</div>
				<div className="_divider-line" />
			</div>
		);
	}
}
