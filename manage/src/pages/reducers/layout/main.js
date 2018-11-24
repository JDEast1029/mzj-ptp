import * as types from '../../constants/actions/layout';
import { getItem } from '@utils/utils';

const initialState = {
	logo: getItem('logo')
};
export const layoutMain = (state = initialState, action) => {
	switch (action.type) {
		case types.LAYOUT_SET_LOGO:
			return {
				...state,
				logo: action.logo,
			};
		default:
			return state;
	}
};
