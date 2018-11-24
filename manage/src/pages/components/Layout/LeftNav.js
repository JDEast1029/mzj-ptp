import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

class Nav extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		// 注意，这里的props是createNav中管理的
		const { menuProps } = this.props;
		return (
			<Menu {...menuProps}>
				<Menu.Item key="/home/main">
					<Link to={'/home/main'}>
						<i className="iconfont g-fs-18 g-m-r-10 icon-live-manage" />
				系统首页
					</Link>
				</Menu.Item>
			</Menu>
		);
	}
}

export default Nav;
