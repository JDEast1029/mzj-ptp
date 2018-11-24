import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import pureRender from 'pure-render-decorator';
import GoBack from './GoBack';
@pureRender
class SetTitle extends Component {
	constructor(props) {
		super(props);
		this.wrapper = props.wrapper;// 需要监听位置的class
		this.bindScroll = this.bindScroll.bind(this);
		this.scrollEvt = this.scrollEvt.bind(this);
	}
	componentDidMount() {
		const {
			scroll,
			refresh
		} = this.props;
		/**
		 * 每个页面滚动条置顶
		 */
		document.querySelector('body').scrollTop = 0;
		scroll && this.bindScroll();// 绑定滚动监听
	}

	componentWillUnmount() {
		const {
			scroll
		} = this.props;
		scroll && this.scrollContainer.removeEventListener('scroll', this.scrollEvt);
	}
	/**
	 * 绑定监听事件
	 * window还是wrapper
	 */
	bindScroll() {
		this.scrollContainer = (this.wrapper) ? document.querySelector(this.wrapper) : window;
		this.scrollContainer.addEventListener('scroll', this.scrollEvt);
		setTimeout(() => {
			let isWindow = (this.scrollContainer === window);
			/**
			 * 滚动到记忆位置；
			 * 这里是针对节点操作
			 */
			let scrollEle = (isWindow) ? document.body : this.scrollContainer;
			let curUrl = `${location.pathname}${location.search}`;
			scrollEle.scrollTop = _global.scroll[curUrl] || 0;
			/**
			 * hack
			 * 点击按钮时候为0了
			 */
			let scrollTopHack = (isWindow) ? document.body.scrollTop : this.scrollContainer.scrollTop;
			_global.scroll[curUrl] = scrollTopHack;
		}, 0);
	}
	scrollEvt(event) {
		let isWindow = (this.scrollContainer === window);
		let curUrl = `${location.pathname}${location.search}`;
		let scrollTop = (isWindow) ? document.body.scrollTop : this.scrollContainer.scrollTop;
		_global.scroll[curUrl] = scrollTop;
	}
	render() {
		const {
			title,
			className,
			back,
			style
		} = this.props;
		return (
			<div className={className} style={style}>
				<title>{title}</title>
			    {this.props.children}
			    {/* !back&&<GoBack />*/}
			</div>
		);
	}
}
SetTitle.propTypes = {
	/**
	 * document.title
	 */
	title: PropTypes.string,
	/**
	 * 初始化class与style
	 */
	className: PropTypes.string,
	style: PropTypes.object,
	/**
	 * false 在 componentDidMount触发
	 * true 在 componentDidUpdate触发
	 */
	refresh: PropTypes.bool,
	/**
	 * 记忆滚动监听需要的wrapper
	 */
	wrapper: PropTypes.string,
	/**
	 * 是否启动记忆滚动监听
	 * true为开启
	 */
	scroll: PropTypes.bool,
	/**
	 * 是否关闭返回，
	 * true为关闭
	 */
	back: PropTypes.bool,
};
/**
 *实现三个功能，标题，滚动监听 
 */
export default SetTitle;

