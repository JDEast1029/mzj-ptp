import React, { Component, createElement } from 'react';
import { Layout, Menu, Icon, Dropdown, message } from 'antd';
import { Link } from 'react-router';
import { getCookie, delCookie, delItem } from '@utils/utils';
import net from '@utils/net';
import API_ROOT from '../../constants/apiRoot';
import * as types from '@constants/actions/login';
import PwdModal from './PwdModal';
class LogOut extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		};
	}
	handleClick = ({ key }) => {
		window.location = '/login';
	}
	handleHide = () => {
		this.setState({
			show: false
		});
	}
	render() {
		const { collapsed, actions } = this.props;
		const { mode, selectedKey, openKey } = this.state;

		return (
			<div className="g-absolute g-c-blue-1" style={{ right: 30 }}>
				<Dropdown
					overlay={(
						<Menu onClick={this.handleClick}>
							<Menu.Item key="1">修改密码</Menu.Item>
							<Menu.Item key="2">退出</Menu.Item>
						</Menu>
					)}
					placement="bottomCenter"
				>
					<div>登录或退出</div>
				</Dropdown>
				<PwdModal
					onHide={this.handleHide}
					show={this.state.show}
				/>
			</div>
		);
	}
}
LogOut.defaultProps = {
};

export default LogOut;
