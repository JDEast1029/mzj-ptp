/**
 * 用于小标题的公共组件
 * @param  {String} className  类名
 * @param  {String} style 样式
 * @param  {String} title 必传，标题
 * @param  {String} icon  标题左侧的icon
 * @param  {Object} iconStyles icon样式
 * @param  {Function} onClick 点击事件,传入即有右侧箭头
 * @param  {Ele} children 类似插槽，右侧箭头旁边的内容
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.scss';
class Cell extends Component {
	constructor(props) {
		super(props);
	}
	handleClick = () => {
		const { onClick } = this.props;
		onClick && onClick();
	}
	render() {
		const { title, icon, iconStyles, style, className, onClick, children } = this.props;
		return (
			<div
				className={`c-cell ${className}`}
				onClick={this.handleClick}
				style={style}
			>
				<div className="g-flex g-ai-c">
					{icon && <i
						className={`iconfont ${icon} __icon`}
						style={{ ...iconStyles }}
					/>}
					<span>{title}</span>
				</div>
				<div className="g-flex g-ai-c">
					{children && <div className="__children">{children}</div>}
					{onClick && <div className="__arrow" />}
				</div>
			</div >
		);
	}
}

/* 
 * 往常的写法不起作用，具体参考https://github.com/facebook/prop-types
 * 但是这里并不是我想要的效果，title应该是外部传入的，而这里props并不是
 */

const props = {
	title: '标题'
};
const propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};
PropTypes.checkPropTypes(propTypes, props, 'prop', 'Cell');
export default Cell;