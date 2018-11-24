/**
 * 微信设置
 */
import * as types from '@constants/actions/setting';
import { ROUTER_CHANGE } from '@constants/actions/_common';
import { initPage, initItem } from '@utils/utils';

const initialState = {
	isFetching: 0
};
export const settingWechat = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
