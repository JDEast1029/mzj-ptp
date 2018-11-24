import React, { Component, createElement } from 'react';
import { Layout, Menu, Icon, Avatar, Dropdown, message } from 'antd';
import { Link } from 'react-router';
import { getCookie, delCookie } from '@utils/utils';
import handleDebounce from '@utils/debounce';
import * as typesLogin from '@constants/actions/login';
import logoWya from '../../assets/images/logo.png';
import Remind from './Remind';
import { clearLoginAuth } from '@router/auth';
import { LOGO_ICON } from '@constants/constants';
const LeftModal = ['/crowd', '/home', '/agent', '/material', '/live', '/setting'];
class Aside extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false, // 是否折叠
			mode: 'inline',
			openKey: '',
			selectedKey: '',
			show: false,
		};
	}
	componentWillMount() {
		this.changeSelectedItem(this.props.path);
	}
	componentWillReceiveProps(nextProps) {
		this.handleCollapse(nextProps.collapsed);
		this.changeSelectedItem(nextProps.path);
	}
	changeSelectedItem = (path) => {
		// 解决三级及以上路由导致左侧Item没有选中的BUG
		let pathArr = path.split('/');
		let openArr = [...pathArr];
		if (pathArr.length >= 4) {
			pathArr.pop();
		}
		this.setState({
			openKey: openArr.splice(0, 2).join('/'),
			selectedKey: pathArr.join('/')
		}, () => { this.scrollLeft(); });
	};
	scrollLeft = () => {
		// const bottomArr = [ '/material', '/live', '/setting' ];
		// if (bottomArr.indexOf(this.state.openKey) > -1 ){
		// 	document.getElementsByClassName('ant-layout-sider')[0].scrollTop = 1000;
		// }
	}
	handleCollapse = (collapsed) => {
		this.setState({
			collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		});
	}
	handleClick = (e) => { // 点击路由
		handleDebounce(() => {
			if (this.state.selectedKey === e.key) {
				this.setState({
					selectedKey: e.key
				});
				this.props.actions.menuInit();
				// 初始化表单
				_global.initForm();
			}
		});
	}
	handleOpenMenu = (v) => { // 导航收缩
		this.setState({
			openKey: v[v.length - 1]
		});
	}
	handleSignOut = () => {
		message.destroy();
		message.loading('提交中...', 0);

		let url = typesLogin.LOGIN_OUT_POST;
		let param = {};

		let params = {
			param: param,
			ajaxType: 'DELETE',
			onSuccess: (res) => {
				message.destroy();
				clearLoginAuth();
			},
			onError: (res) => {
				message.destroy();
				message.error(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, {});
	};
	render() {

		const menu = (
			<Menu>
				<Menu.Item>
					<div onClick={this.handleSignOut}>退出登录</div>
				</Menu.Item>

			</Menu>
		);
		const { collapsed, actions } = this.props;
		const { mode, selectedKey, openKey } = this.state;
		const { account, default_avatar, logo, role_name, company_name } = _global.user || {};

		return (
			<Layout.Sider
				trigger={null}
				collapsible={false}
				defaultCollapsed={false}
				style={{ overflowY: 'auto', width: '100%' }}
			>
				<div
					style={{
						width: '180px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: "center",
						alignItems: "center",
						margin: "0 auto",
						marginBottom: "30px"
					}}>
					<Avatar
						src={logo}
						style={{
							width: 70,
							border: '1px solid #ccc',
							height: 70,
							borderRadius: 64,
						}}
					/>
					<div>{company_name}</div>
				</div>
				{
					createElement(
						this.props.component,
						{
							menuProps: {
								onClick: this.handleClick,
								theme: "dark",
								mode: mode,
								selectedKeys: [selectedKey],
								inlineCollapsed: false,
								openKeys: [openKey],
								onOpenChange: this.handleOpenMenu,
							},
							actions: actions
						}
					)
				}
				<div style={{ height: 140 }} />
				<div
					style={{
						width: '180px',
						height: '140px',
						display: 'flex',
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						bottom: 0
					}}
				>
					<Avatar
						src={default_avatar}
						style={{
							width: 50,
							border: '1px solid #ccc',
							height: 50,
							borderRadius: 50
						}}
					/>
					<div style={{ marginLeft: 15 }}>
						<div>{role_name}</div>
						<Dropdown overlay={menu}>
							<div className="ant-dropdown-link" >
								{account}<Icon type="down" />
							</div>
						</Dropdown>
					</div>
				</div>
			</Layout.Sider>
		);
	}
}
Aside.defaultProps = {
	// path
};

export default Aside;
