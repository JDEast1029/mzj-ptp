import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const list = [
	{
		name: "社群",
		icon: "icon-tab-wechat",
		route: "/home"
	},
	{
		name: "素材",
		icon: "icon-tab-material",
		route: "/material"
	},
	{
		name: "直播",
		icon: "icon-tab-live",
		route: "/live"
	},
	{
		name: "我的",
		icon: "icon-tab-mine",
		route: "/mine"
	}

];

class Footer extends Component {

	render() {
		if (this.props.hide) {
			return null;
		} else {
			return (
				<div>
					<div style={{ height: 50 }} />
					<footer
						className="g-fixed-footer g-flex-ac g-tc"
						style={{ height: 50, borderTop: '0.5px solid #e5e5e5' }}
					>
						{list.map((item, index) => {
							const { name, route, icon } = item;
							return (
								<Link
									key={index}
									to={route}
									activeClassName="g-blue-middle"
									className="g-flex g-fd-c g-col g-brown-middle g-bg-white"
								>
									<div className="g-flex-cc g-fd-c">
										<i className={`iconfont g-fs-24 ${icon}`} />
										<span className="g-fs-12">{name}</span>
									</div>
								</Link>
							);
						})}
					</footer>
				</div>
			);
		}
	}
}

export default Footer;
