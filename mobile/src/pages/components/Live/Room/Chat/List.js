import React, { Component } from 'react';
import { getPreviewImage } from '@utils/utils';
// 组件
import SystemTip from './Item/SystemTip';
import Item from '@components/_common/SpeakItem/Item';

const getRoleName = (userType) => {
	if (userType == 3) {
		return '讲师';
	} else if (userType == 2) {
		return '主持人';
	}
};

const showTime = (curItem, prevItem) => {
	if (!prevItem) return !0;

	let curTime = parseInt(new Date(curItem.create_time).getTime() / 1000);
	let prevTime = parseInt(new Date(prevItem.create_time).getTime() / 1000);
	if (curTime - 60 > prevTime) return !0;

	return !1;
};

const List = (props) => {
	const { onCanChangeTab, itemArr = [], itemObj, audioChats, canIntoView } = props;
	let imgs = getPreviewImage(itemArr, itemObj);
	return (
		<div>
			{
				itemArr.map((item, index) => {
					if (itemObj[item].msg_type == 5) {
						return (
							<SystemTip 
								itemData={itemObj[item]}
							/>
						);
					}
					return (
						<Item
							key={`${item}`}
							imgs={imgs}
							isLive={true}
							showRole={true}
							showTime={showTime(itemObj[item], itemObj[itemArr[index - 1]])}
							canIntoView={canIntoView}
							role_name={getRoleName(itemObj[item].user_type)}
							itemData={itemObj[item]}
							audioChats={audioChats}
							onCanChangeTab={onCanChangeTab}
						/>
					);
				})
			}
		</div>
	);
};
export default List;
