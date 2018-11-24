// -- 微一案工具库 --
export * from 'wya-utils';
// -- end --
import { changeObjRegex } from 'wya-utils';
changeObjRegex({
	validSpecialName: {
		regex: /^[()（）A-Za-z0-9\u4e00-\u9fa5_-\s]{1,}$/,
		error: "请不要输入特殊字符"
	},
	validPassword: {
		regex: /^[A-Za-z0-9]{1,}$/,
		error: "请不要输入特殊字符"
	}
});

// -- 业务相关 --

export const initSelect = (res, value, label, children, level = 1) => {
	let __arr = [];
	let __child = [];
	if (res instanceof Array && level > 0) {
		for (let j = 0; j < res.length; j++) {
			__arr = [...__arr, {
				value: res[j][value] || j,
				label: res[j][label] || res[j],
				children: initSelect(res[j][children], value, label, children, level - 1)
			}];
		}
		return __arr;
	}
	return level == 0 ? undefined : [];
};
/**
 * 初始化数据
 * @param  {String} res 传入的数据
 * @param  {String} id  数组是已str区分 ，默认'id'
 * @param  {String} _count
 * @param  {Object} initObj 判断是否有init
 * @param  {Array} initArr 判断是否有init
 * @return {String}
 * 参考reducers中的使用
 */
export const initItem = (res, str, count, initObj, initArr) => {
	let itemArr = [];
	let itemObj = {};
	let data;
	let id = str || 'id';
	if (typeof res == "object" && res.data && res.data instanceof Array) { // 传入的不是数组。res.data是数组
		data = res.data;
	} else if (res instanceof Array) { // 传入的是数组
		data = res;
	} else {
		return console.error('初始化参数错误');
	}
	for (let i = 0; i < data.length; i++) {
		itemArr = [...itemArr, data[i][id]];
		itemObj = {
			...itemObj,
			[data[i][id]]: initObj || data[i]
		};
	}
	/* 判断是否有_count*/
	if (count) {
		let { _count } = res;
		return { itemArr, itemObj, _count };
	} else {
		return { itemArr, itemObj };
	}
};
/**
 * 作为分页初始数据
 * for mobile
 */
export const initObj = {
	currentPage: 0, // 当前页数
	totalPage: 1, // 总页数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: [],
	itemObj: {},

};
/**
 * 作为分页初始数据
 * for pc
 */
export const initPage = {
	curPage: 0, // 当前页数
	totalPage: 1, // 总页数
	pageSize: 10, // 条数
	isEnd: 0, // 是否正在加载 0 上拉加载，1为加载中，2为已全部加载,3数据异常
	itemArr: [],
	itemObj: {},
};
/**
 * 对自定义链接做处理
 */
export const diyLink = (event, type = 'shop') => {
	const url = event.currentTarget.getAttribute('href');
	if (/^((https|http|ftp|rtsp|mms)?:\/\/)/.test(url) && !url.includes(`weiyianws.com/${type}/`) && !url.includes(`m.ruishan666/${type}/`)) {
		location.href = url;
		event.preventDefault();
		return false;
	} else {
		_global.scroll[url] = 0;
	}
};
/**
 * 记忆滚动监听需要初始化
 */
export const initLink = (event) => {
	const url = event.currentTarget.getAttribute('href');
	_global.scroll[url] = 0;
	if (url === location.pathname) {
		document.body.scrollTop = 0;
	}
};

/**
 * 处理base64 前最
 */
export const filterBase64 = (data) => {
	let changeStr = (imgUrl) => {
		imgUrl = imgUrl.replace(/data:image\/[^;]+;base64,/g, '');
		return imgUrl;
	};
	if (!(data instanceof Array)) {
		data = changeStr(data);
	} else {
		for (let i = 0; i < data.length; i++) {
			data[i] = changeStr(data[i]);
		}
	}
	return data;
};

/**
 * 处理项目中rtf（富文本中的图片）
 */
export const rtfImages = (data) => {
	if (!data) {
		return data;
	}
	data = data.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"");
	data = data
		.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, '<img src="$1" />')
		.replace(/<img [^>]*src=['"][^'"]+img\.baidu\.com([^'"]+)[^>]*>/gi, '<img style="width:auto;" src="https://img.baidu.com$1" />')
		.replace(/<img [^>]*src=['"][^'"]+osscdn\.weiyian\.com([^'"]+)[^>]*>/gi, '<img src="http://osscdn.weiyian.com$1!1-0" />');
	return data;
};

/**
 * ios微信支付的坑
 * 重载页面
 */
export const urlReLoad = () => {
	let firstUrl = ['shop', 'train']; // 根路由无视
	/**
	 * ios设备，微信端，长度，当前页
	 */
	if (
		_global.device.ios &&
		(
			_global.landingPage.split('/').length > 3 ||
			(_global.landingPage.split('/').length > 2 && !firstUrl.includes(_global.landingPage.split('/')[1]))
		)
	) {
		// 如： "/shop/goods/2" length: 4
		location.reload();
		return !0;
	}
	return !1;
};
/**
 * 重构验证路由
 */
export const vaildRoute = (routes) => {
	let obj = {};
	for (let i = 0; i < routes.length; i++) {
		let { rule = [] } = routes[i] || {};
		if (process.env.NODE_ENV === 'development' && !(rule instanceof Array)) {
			return console.error("rule must be Array");
		}
		for (let j = 0; j < rule.length; j++) {
			if (process.env.NODE_ENV === 'development' && typeof rule[j] !== "number") {
				return console.error("rule's child must be Number");
			}
			obj = {
				...obj,
				[rule[j]]: [...obj[rule[j]] || [], routes[i].path]
			};
		}
	}
	return obj;
};
/**
 * 将对象转化为url请求参数
 */
export const toQueryPair = (key, value) => {
	if (typeof value == 'undefined') {
		return key;
	}
	return key + '=' + encodeURIComponent(value === null ? '' : String(value));
};
export const toQueryString = (obj) => {
	let ret = [];
	for (let key in obj) {
		key = encodeURIComponent(key);
		let values = obj[key];
		if (values && values.constructor == Array) { // 数组
			let queryValues = [];
			for (let i = 0, len = values.length, value; i < len; i++) {
				value = values[i];
				queryValues.push(toQueryPair(key, value));
			}
			ret = ret.concat(queryValues);
		} else { // 字符串
			ret.push(toQueryPair(key, values));
		}
	}
	return ret.join('&');
};
// -- end --
/**
 * 静态更新列表的部分数据
 * @param  {Object} list 传入的原列表数据
 * @param  {String} id  list的属性
 * @param  {Object} rest 具体要修改的对象{}
 * @return {Object} 变更后的list
 * 参考reducers中的使用
 */
export const updateItem = (list, id, ...rest) => {
	const obj = { ...rest }[0];
	const name = Object.keys(...rest)[0];
	return { ...list, [id]: { ...list[id], [name]: obj[name] } };
};

/**
 * 更改itemArr的排序
 * @param  {String} type 类型
 * @param  {Array} itemArr 原数组
 * @param  {Array} arr 更改排序的依据
 * @returns {Array} 返回新数组
 */
export const sortItemArr = (type = '', itemArr = [], arr = []) => {
	let newArr = itemArr;
	switch (type) {
		case 'add':// 添加-add
			for (let i = arr.length - 1; i >= 0; i--) {
				if (!newArr.includes(arr[i].community_id)) {
					newArr.unshift(arr[i].community_id);
				}
			}
			return newArr;
		case 'edit':// 修改社群-edit
		case 'news':// 新消息-news
			newArr = itemArr.filter(id => {
				return arr.every(item => {
					return item.community_id != id;
				});
			});
			for (let i = arr.length - 1; i >= 0; i--) {
				newArr.unshift(arr[i].community_id);
			}
			return newArr;
		case 'delete':// 删除 delete
			newArr = itemArr.filter(id => {
				return arr.every(item => {
					return item.community_id != id;
				});
			});
			return newArr;
		default:
			return itemArr;
	}
};

/**
 * 更改itemObj的内容
 * @param  {String} type 类型
 * @param  {Object} itemObj 原对象
 * @param  {Array} arr 更改排序的依据
 * @returns {Object} 返回新对象
 * 该方法目前只适用于社群列表
 */
export const updateItemObj = (type = '', itemObj = {}, arr = []) => {
	let newObj = itemObj;
	switch (type) {
		case 'add':
		case 'edit':
			for (let i = arr.length - 1; i >= 0; i--) {
				newObj[arr[i].community_id] = arr[i];
			}
			return newObj;
		case 'news':// 在edit基础上新绑定remind字段，提示有新消息
			for (let i = arr.length - 1; i >= 0; i--) {
				arr[i]['remind'] = 1;
				newObj[arr[i].community_id] = arr[i];
			}
			return newObj;
		case 'delete':
			for (let i = arr.length - 1; i >= 0; i--) {
				delete newObj[arr[i].community_id];
			}
			return newObj;
		default:
			return itemObj;
	}
};

/**
 * 新数据与旧数据比较，排序，给新消息添加remind字段
 * 返回一个新的内容newObj和一个新的排序newOrder
 * 该方法目前只适用于社群列表
 * @param  {Object} oldObj 本地的旧数据
 * @param  {Object} newObj 接收的新数据
 * @param  {Array} newArr 接收的新排序
 */
export const compareItemObj = (oldObj, newObj, newOrder) => {
	/**
	 * 生成newObj
	 */
	for (let i in oldObj) {
		let id = oldObj[i].community_id;
		if (!oldObj[i] || !newObj[id]) continue;
		if (!newObj[id].chat_sn) continue;
		if (oldObj[i].remind) { // 将localStorage里面的未读remind添加上
			newObj[id].remind = 1;
		}
		if (oldObj[i].chat_sn != newObj[id].chat_sn) { // 将chat_sn变化的标记remind未读
			newObj[id].remind = 1;
		}
	}
	for (let j in newObj) { // 给新群中有chat_sn的添加上remind未读
		if (!oldObj[j] && newObj[j].chat_sn) {
			newObj[j].remind = 1;
		}
	}
	return { newObj, newOrder };
};

/**
 * 获取直播间/群聊的所有图片信息
 * @param {*} itemArr 
 * @param {*} itemObj 
 */
export const getPreviewImage = (itemArr, itemObj) => {
	let imgs = [];
	for (let i = 0; i < itemArr.length; i++) {
		let itemData = itemObj[itemArr[i]] || {};
		if (itemData.msg_type == 1) {
			imgs.push(itemData.msg_url);
		}
	}
	return imgs;
};

/**
 * 格式化用户等级数据（传给后台的）
 */
export const formatLimitLevel = (array = []) => {
	let limitLevel = {
		head_level: [],
		user_level: []
	};
	// console.log(array);
	for (let i = 0; i < array.length; i++) {
		// console.log(array[i], i);
		if (String(array[i]).indexOf('head') != -1) {
			limitLevel.head_level.push(array[i].replace('head', ''));
		} else {
			limitLevel.user_level.push(array[i]);
		}
	}
	return limitLevel;
};

/**
 * 解析后台传过来的用户等级数据
 */
export const deFormatLimitLevel = (limitLevel = {}) => {
	if (limitLevel instanceof Array && limitLevel.length == 0) {
		limitLevel = null;
	}
	if (typeof limitLevel == 'string') {
		limitLevel = JSON.parse(limitLevel);
	}
	let { head_level = [], user_level = [] } = limitLevel || {};
	for (let i = 0; i < head_level.length; i++) {
		head_level[i] = 'head' + head_level[i];
	}
	return [...head_level, ...user_level];
};

export const getWechatVersion = () => {
	let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
	if (wechatInfo) {
		return wechatInfo[1];
	} else {
		return null;
	}
};

export const getIosVersion = () => {
	let ua = navigator.userAgent.toLowerCase();
	let version = null;
	if (ua.indexOf("like mac os x") > 0) {
		let reg = /os [\d._]+/gi;
		let v_info = ua.match(reg);
		version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, "."); // 得到版本号9.3.2或者9.0
		version = parseInt(version.split('.')[0]); // 得到版本号第一位
	}
	return version;
};

export const hasBottom = () => {

	if (getWechatVersion.slice(2) > 6.7 && getWechatVersion.split('.')[0] >= 6) {
		return true;
	} else {
		return false;
	}
};