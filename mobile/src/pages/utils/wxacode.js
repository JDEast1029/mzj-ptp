/**
 * 获取小程序码和小程序二维码
 */
import { message } from 'antd';
import net from '@utils/net';
import APIRoot from '../constants/apiRoot';

/**
 * 获取小程序码（有数量限制）
 * @param path
 * @param params
 * @param opts
 */
export const getXCXCode = (path, params, opts) => {
	return net.ajax({
		url: APIRoot['_XCX_CODE_POST'],
		type: 'POST',
		param: {
			path,
			...params
		}
	});
};
/**
 * 获取小程序码（无数量限制）
 * @param page
 * @param params
 * @param opts
 */
export const getXCXCodeUnlimit = (page, params, opts) => {
	return net.ajax({
		url: APIRoot['_XCX_CODE_UNLIMIT_POST'],
		type: 'POST',
		param: {
			page,
			...params
		}
	});
};
/**
 * 获取小程序二维码（有数量限制）
 * @param path
 * @param params
 * @param opts
 */
export const getXCXQRCode = (path, params, opts) => {
	return net.ajax({
		url: APIRoot['_XCX_QR_CODE_POST'],
		type: 'POST',
		param: {
			path,
			...params
		}
	});
};


/**
 * 获取店铺二维码
 * @param page
 * @param params
 * @param opts
 */
export const getXCXShopQrCode = (page, params, opts) => {
	return net.ajax({
		url: APIRoot['_XCX_CODE_SHOP_POST'],
		type: 'POST',
		param: {
			page,
			...params
		}
	}).then((res) => {
		if (res.status == 0) {
			message.warn(res.msg);
		}
	}).catch((error) => {
		message.error(error.msg);
	});
};

