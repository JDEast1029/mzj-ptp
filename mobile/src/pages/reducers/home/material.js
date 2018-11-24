import * as types from '@constants/actions/home';
const initialState = {
	list: [],
	selectArr: []
};
export const homeMaterialList = (state = initialState, action) => {
	switch (action.type) {
		case types.HOME_MATERIAL_LIST_GET + '_SUCCESS': {
			return {
				...state,
				list: [
					...action.data.list
				]
			};
		}
		case types.MATERIAL_SHARE_SELECT_CHANGE: {
			let selectArr = state.selectArr;
			const { community_id } = action;
			if (state.selectArr.indexOf(community_id) > -1) {
				selectArr = selectArr.filter((val, index) => {
					return val != community_id;
				});

			} else {
				selectArr.push(community_id);
			}
			return {
				...state,
				selectArr
			};
		}
		case types.MATERIAL_SHARE_SELECT_CHANGE_INIT: {
			return {
				...state,
				selectArr: []
			};
		}
		default:
			return state;
	}
};