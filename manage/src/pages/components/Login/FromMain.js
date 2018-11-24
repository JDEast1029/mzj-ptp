import React, { Component } from 'react';
import { LOGIN_LOGO } from '@constants/constants';
import Form from './Form';
const style = {
	height: '460px',
	minWidth: '1149px',
	background: 'rgba(0, 0, 0, .6)',
	borderRadius: '10px',
	position: 'relative',
};
const styleA = {
	color: '#000',
	padding: '2px 6px',
	backgroundColor: '#fff',
	fontWeight: 600
};

const Header = (props) => {
	const { actions, layoutActions } = props;
	return (
		<div style={style}>
			<div className="g-w-5 g-c-white g-tc g-flex g-fd-c g-jc-c">
				<div style={{ height: 400 }} className="g-flex g-fd-c g-jc-c">
					<h3 className="g-c-white g-fs-50" >新群宝</h3>
					<h4 className="g-c-white g-fs-28" style={{ marginTop: "-30px" }}>管理后台</h4>
				</div>
				<div className="g-pd-l-20">
					为了获得最好的体验效果，建议使用最新版的谷歌浏览器进行登陆，如果不是最新版，
					<a
						target="view_window"
						style={styleA}
						href="https://sm.myapp.com/original/Browser/67.0.3396.62_chrome_installer_x64.exe"
					>
						请下载
					</a>
				</div>
			</div>
			<Form
				actions={actions}
				layoutActions={layoutActions}
			/>
		</div>
	);
};
export default Header;
