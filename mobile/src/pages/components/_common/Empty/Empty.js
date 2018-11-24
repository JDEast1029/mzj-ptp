/**
 * 用于空页面或者404的公共组件
 * @param  {String} className  类名
 * @param  {Object} style 样式
 * @param  {String} img 图片
 * @param  {String} title 标题
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.scss';
class Empty extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { img, title, className, style } = this.props;
		return (
			<div
				className={`${className} c-empty g-flex g-jc-sb g-ai-fs g-bg-white`}
				style={style}
			>
				<div className="__content">
					<img src={img} alt="" className="__pic" />
					<p className="g-pd-30 g-fs-16 g-black-333 g-tc g-width">{title}</p>
				</div>
			</div>
		);
	}
}

const props = {
};
const propTypes = {
	img: PropTypes.string,
	title: PropTypes.string
};
PropTypes.checkPropTypes(propTypes, props, 'prop', 'Empty');
export default Empty;