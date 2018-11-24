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
				<Menu.SubMenu
					key="/home"
					title={
						<span className="_nav-text">
							<i className="iconfont g-fs-18 g-m-r-10 icon-home" />
							首页
						</span>
					}
				>
					<Menu.Item key="/home/main">
						<Link to={'/home/main'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-live-manage" />
							系统首页
						</Link>
					</Menu.Item>
					<Menu.Item key="/home/log">
						<Link to={'/home/log'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-teacher" />
							操作日志
						</Link>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/agent"
					title={
						<span className="_nav-text">
							<i className="iconfont g-fs-18 g-m-r-10 icon-member" />
							会员
						</span>
					}
				>
					<Menu.Item key="/agent/list">
						<Link to={'/agent/list'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-members" />
							会员列表
						</Link>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/crowd"
					title={
						<span className="_nav-text">
							<i className="iconfont g-fs-18 g-m-r-10 icon-group" />
							社群
						</span>
					}
				>
					<Menu.Item key="/crowd/list">
						<Link to={'/crowd/list'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-association" />
							社群列表
						</Link>
					</Menu.Item>
					<Menu.Item key="/crowd/message">
						<Link to={'/crowd/message'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-mass-texing" />
							群发消息
						</Link>
					</Menu.Item>
					<Menu.Item key="/crowd/setting">
						<Link to={'/crowd/setting'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-group-setting" />
							群主设置
						</Link>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/material"
					title={
						<span className="_nav-text">
							<i className="iconfont g-fs-18 g-m-r-10 icon-photo" />
							素材
						</span>
					}
				>
					<Menu.Item key="/material/list">
						<Link to={'/material/list'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-file" />
							素材列表
						</Link>
					</Menu.Item>
					<Menu.Item key="/material/category">
						<Link to={'/material/category'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-material1" />
							素材分类
						</Link>
					</Menu.Item>
					<Menu.Item key="/material/notice">
						<Link to={'/material/notice'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-notes" />
							全员公告
						</Link>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/live"
					title={
						<span className="_nav-text">
							<i
								className="iconfont g-fs-18 g-m-r-10 icon-live"
								style={{
									marginLeft: '-3px',
									marginRight: '7px'
								}} />
							直播
						</span>
					}
				>
					<Menu.Item key="/live/list">
						<Link to={'/live/list'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-live-manage" />
							直播管理
						</Link>
					</Menu.Item>
					<Menu.Item key="/live/lecturer">
						<Link to={'/live/lecturer'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-teacher" />
							讲师管理
						</Link>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/setting"
					title={
						<span className="_nav-text">
							<i className="iconfont g-fs-18 g-m-r-10 icon-settings" />
							设置
						</span>
					}
				>
					<Menu.Item key="/setting/system">
						<Link to={'/setting/system'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-system-settings" />
							系统设置
						</Link>
					</Menu.Item>
					<Menu.Item key="/setting/wechat">
						<Link to={'/setting/wechat'}>
							<i className="iconfont g-fs-18 g-m-r-10 icon-setting" />
							微信设置
						</Link>
					</Menu.Item>
				</Menu.SubMenu>
			</Menu>
		);
	}
}

export default Nav;
