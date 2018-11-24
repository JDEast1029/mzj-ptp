import React, { Component } from 'react';
import { getPreviewImage } from '@utils/utils';
// 组件
import Item from '@components/_common/SpeakItem/Item';
import LiveItem from './Chat/LiveItem';

const showTime = (curItem, prevItem) => {
	if (!prevItem) return !0;

	let curTime = parseInt(new Date(curItem.create_time).getTime() / 1000);
	let prevTime = parseInt(new Date(prevItem.create_time).getTime() / 1000);
	if (curTime - 60 * 30 > prevTime) return !0;

	return !1;
};

const roleCode2Name = (role) => {
	switch (parseInt(role)) {
		case 9:
			return '群主';
		case 2:
			return '管理员';
		default:
			return !1;
	}
};

const List = (props) => {
	const { 
		actions, itemArr = [], itemObj, 
		user_id, audioChats, canIntoView,
		onCanChangeTab
	} = props;
	let imgs = getPreviewImage(itemArr, itemObj);
	return (
		<div>
			{
				itemArr.map((item, index) => {
					if (itemObj[item].msg_type == 4) {
						return (
							<LiveItem 
								key={`${item}`} 
								title={itemObj[item].msg}
								content={itemObj[item].msg_content}
								room_id={itemObj[item].msg_id}
								create_time={itemObj[item].create_time}
							/>
						);
					}

					/**
					 * 解决坑爹的问题：进入页面时由于user_id为undefined，导致isSelf为false
					 * user_id拿到值后，isSelf又变为true，导致页面出现Item的切换现象
					 */
					if (!user_id) return null;

					return (
						<Item
							key={`${item}`}
							imgs={imgs}
							showTime={showTime(itemObj[item], itemObj[itemArr[index - 1]])}
							canIntoView={canIntoView}
							itemData={itemObj[item]}
							showRole={true}
							role_name={roleCode2Name(itemObj[item].role)}
							isSelf={user_id == itemObj[item].user_id}
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
