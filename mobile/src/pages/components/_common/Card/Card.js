/**
 * 用于小标题的公共组件
 * @param  {String} className  类名
 * @param  {Object} style 样式
 * @param  {String} img 左侧图片
 * @param  {String} title 标题
 * @param  {String} desc 底部描述
 * @param  {Function} onClick 点击事件,传入即有右侧箭头
 * @param  {Ele} children 类似插槽，底部右侧的内容
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.scss';
class Card extends Component {
	constructor(props) {
		super(props);
	}
	handleClick = (opts) => {
		const { onClick } = this.props;
		onClick && onClick(opts);
	}
	render() {
		const { img, title, desc, children, className, style, key } = this.props;
		return (
			<div
				className={`${className} c-card g-flex g-jc-sb g-ai-fs`}
				style={style}
				onClick={this.handleClick}
				key={key || Math.random()}
			>
				<div
					style={{ backgroundImage: `url('${img}')`, backgroundSize: '100% 100%' }}
					alt=""
					className="__pic"
				/>
				{title
					? <div className="__content g-flex g-fd-c g-jc-sb">
						<div className="__title g-fs-14 g-c-black g-twoline">{title}</div>
						<div className="g-flex g-jc-sb g-ai-c">
							<span className="g-black-light1 g-fs-12">{desc}</span>
							{children}
						</div>
					</div>
					: null
				}
			</div>
		);
	}
}

const props = {
};
const propTypes = {
	img: PropTypes.string,
	title: PropTypes.string,
	style: PropTypes.object,
	desc: PropTypes.string,
	children: PropTypes.element,
};
PropTypes.checkPropTypes(propTypes, props, 'prop', 'Card');
export default Card;