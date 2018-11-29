/**
 * 微信分享处理
 */
import { MToasts } from 'wya-rc';

import { parseUrl } from './utils';
// import wx from '../libs/jweixin-1.2.0.js';
import wx from 'weixin-js-sdk';
import net from './net';
import API_ROOT from '@constants/apiRoot';

/**
 * 微信分享功能
 * config = {
 *     type  : 哪里发起的请求，agent还是user,
 *     agent_retail : 是否从代理端零售发起，1：是
 *     title : 分享标题
 *     desc ：分享详情，可不写
 *     img：分享图片链接
 *     title：分享时候标题是否显示店铺标题
 *     desc: 分享时候详情是否显示店铺标题
 * }
 */
/**
 * 给微信配置设置信息。这里暂时先通过分享统一设置
 * @param  {Object} options 参数
 * 	{appId,timestamp,nonceStr,signature}
 */
let count = 0;
let _configOpts = {};
export const wxConfigFn = (options = {}, param = {}) => {
	if (_global.device.ios && count == 1){
		_configOpts = options;
	}
	if (_global.device.ios){
		options = _configOpts || options;
	}
	wx.config({
		debug: false,
		appId: options.appId,
		timestamp: options.timestamp,
		nonceStr: options.nonceStr,
		signature: options.signature,
		jsApiList: [
			/**
			 * 所有要调用的 API 都要加到这个列表中
			 */
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
			'openAddress',
			'scanQRCode',
			'hideMenuItems',
			'showMenuItems',
			'chooseImage',
			'previewImage',
			'startRecord',
			'stopRecord',
			'onVoiceRecordEnd',
			'uploadVoice',
			'uploadImage',
			'playVoice',
			'stopVoice',
			'onVoicePlayEnd',
		]
	});
	wx.error(function(res) {
		let str = JSON.stringify(res);
		console.error(`wx-error: ${str}\n url: ${param.url} \n href: ${location.href}`);
	});
};
/**
 * 微信分享，每次都发起，保证签名和发起分享时url一致
 */

export const setShare = (config = {}) => {
	/**
	 * 不是微信禁止分享
	 */
	if (!_global.device.weixin || process.env.NODE_ENV !== "production" ){ return false; }
	let param = {
		...config,
		url: `${location.origin}${location.pathname}${location.search}`, // location.href貌似也可以，可能#要去掉
		// type: config.type || 'agent'
	};
	// 微信自身版本修复
	// if(_global.device.ios){// ios微信分享的坑
	// 	param ={
	// 		...param,
	// 		url:_global.landingSharePage
	// 	};
	// }
	// if (_global.device.ios && count) return;
	
	// net.ajax({
	// 	url: API_ROOT['_WECHAT_SHARE'],
	// 	type: 'GET',
	// 	param,
	// 	noLoading: true,
	// }).then((response) => {
	// 	_global.device.ios && count++;
	// 	let res = {
	// 		...response.data
	// 	};

	// 	res = {
	// 		...res,
	// 		url: config.url || res.url
	// 	};
	// 	/**
	// 	 * 分享的标题，描述，图片
	// 	 */
	// 	res = {
	// 		...res,
	// 		title: config.title || res.title || "",
	// 		desc: config.desc || res.desc || "",
	// 		imgUrl: config.img || res.imgUrl || ""
	// 	};
	// 	/**
	// 	 * config
	// 	 */
	// 	wxConfigFn(res, param);
	// 	/**
	// 	 * ready
	// 	 */
	// 	wx.ready(() => {
	// 		/**
	// 		 * 在这里调用 API
	// 		 */
	// 		const showPage = []; // 允许分享页面
	// 		if (showPage.includes(location.pathname)) {
	// 			wx.showMenuItems({
	// 				menuList: [
	// 					'menuItem:share:appMessage',
	// 					'menuItem:share:timeline',
	// 					'menuItem:share:qq',
	// 					'menuItem:share:weiboApp',
	// 					'menuItem:share:facebook',
	// 					'menuItem:share:QZone'
	// 				],
	// 				success: function(res){

	// 				},
	// 				fail: function(res){
	// 					console.log(JSON.stringify(res));
	// 				}
	// 			});
	// 			wx.onMenuShareAppMessage({
	// 				title: res.title, // 分享标题
	// 				desc: res.desc, // 分享页面描述
	// 				link: res.url, // 分享链接
	// 				imgUrl: res.imgUrl, // 图片链接
	// 				success: function(ress) {
	// 					/**
	// 					 * 用户确认分享后执行的回调函数
	// 					 */
	// 					MToasts.info('操作成功');
	// 				},
	// 				cancel: function() {
	// 					/**
	// 					 * 用户取消分享后执行的回调函数
	// 					 */
	// 					MToasts.info('您取消了该操作');
	// 				}
	// 			});
	// 			wx.onMenuShareTimeline({
	// 				title: res.title,
	// 				link: res.url,
	// 				desc: res.desc, // 分享页面描述
	// 				imgUrl: res.imgUrl,
	// 				success: function() {
	// 					/**
	// 					 * 用户确认分享后执行的回调函数
	// 					 */
	// 					MToasts.info('分享到朋友圈成功');
	// 				},
	// 				cancel: function() {
	// 					/**
	// 					 * 用户取消分享后执行的回调函数
	// 					 */
	// 					MToasts.info('您已取消分享到朋友圈');
	// 				}
	// 			});
	// 			wx.onMenuShareQQ({
	// 				title: res.title,
	// 				link: res.url,
	// 				desc: res.desc, // 分享页面描述
	// 				imgUrl: res.imgUrl,
	// 				success: function() {
	// 					/**
	// 					 * 用户确认分享后执行的回调函数
	// 					 */
	// 					MToasts.info('分享到QQ成功！');
	// 				},
	// 				cancel: function() {
	// 					/**
	// 					 * 用户取消分享后执行的回调函数
	// 					 */
	// 					MToasts.info('您已取消分享到QQ');
	// 				}
	// 			});
	// 			wx.onMenuShareWeibo({
	// 				title: res.title,
	// 				link: res.url,
	// 				desc: res.desc, // 分享页面描述
	// 				imgUrl: res.imgUrl,
	// 				success: function() {
	// 					/**
	// 					 * 用户确认分享后执行的回调函数
	// 					 */
	// 					MToasts.info('分享到微博成功！');
	// 				},
	// 				cancel: function() {
	// 					/**
	// 					 * 用户取消分享后执行的回调函数
	// 					 */
	// 					MToasts.info('您已取消分享到微博');
	// 				}
	// 			});
	// 			wx.onMenuShareQZone({
	// 				title: res.title,
	// 				desc: res.desc, // 分享页面描述
	// 				link: res.url.replace('http://', ''),
	// 				url: res.url,
	// 				imgUrl: res.imgUrl,
	// 				success: function() {
	// 					/**
	// 					 * 用户确认分享后执行的回调函数
	// 					 */
	// 					MToasts.info('分享到QQ空间成功！');
	// 				},
	// 				cancel: function() {
	// 					/**
	// 					 * 用户取消分享后执行的回调函数
	// 					 */
	// 					MToasts.info('您已取消分享到QQ空间');
	// 				}
	// 			});
	// 		} else {
	// 			wx.hideMenuItems({
	// 				menuList: [
	// 					'menuItem:share:appMessage',
	// 					'menuItem:share:timeline',
	// 					'menuItem:share:qq',
	// 					'menuItem:share:weiboApp',
	// 					'menuItem:share:facebook',
	// 					'menuItem:share:QZone'
	// 				],
	// 				success: function(res){

	// 				},
	// 				fail: function(res){
	// 					console.log(JSON.stringify(res));
	// 				}
	// 			});
	// 		}
	// 	});
	// }).catch ((res) => {
	// 	alert(JSON.stringify(res));
	// 	console.error('wechat-share is failed');
	// });	
};
