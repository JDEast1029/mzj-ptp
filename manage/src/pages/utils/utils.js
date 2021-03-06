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
 * 格式化用户等级数据（传给后台的）
 */
export const formatLimitLevel = (array = []) => {
	let limitLevel = {
		head_level: [],
		user_level: []
	};
	for (let i = 0; i < array.length; i++) {
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

export const getHashUrls = (url = '', paramObj, opts = {}) => {
	let paramArray = [];
	for (let key in paramObj) {
		if (paramObj[key] || paramObj[key] === false || paramObj[key] === 0) { // 过滤掉值为null,undefined,''情况
			paramArray = [...paramArray, `${key}=${encodeURIComponent(paramObj[key])}`];
		}
	}
	return `${url}?${paramArray.join('&')}`;
};
