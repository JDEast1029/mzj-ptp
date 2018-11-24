
import React, { Component } from 'react';
import Item from './Item';
import net from '@utils/net';
import apiRoot from '@constants/apiRoot';
import { MToasts } from 'wya-rc';
const List = (props) => {
	const { actions, listInfo, material_id } = props;
	const { list,  selectArr } = listInfo;
	const handleSubmit = () => {
		const url = apiRoot._MATERIAL_SHARE_SUBMIT_POST;
		const data = {
			community: selectArr,
			material_id
		};
		net.ajax({
			url,
			param: data,
			type: 'POST'
		}).then((res) => {
			if (res.status){
				MToasts.info('分享成功', 1.5, () => {
					_global.history.goBack();
				});
			} else {
				MToasts.info(res.msg);
			}
		}).catch((error) => {
			error.msg && MToasts.info(error.msg);
		});
	};
	return (
		<div>
			<div className="g-bg-white" style={{ height: _global.innerHeight - 128, overflow: 'auto' }}>
				{
					list.map((item, index) => {
						return (
							<Item
								key={`${item.material_id}`}
								itemData={item}
								actions={actions}
								index={index + 1}
								selectArr={selectArr}
							/>
						);
					})
				}
			</div>
			<div 
				style={{ lineHeight: '44px' }} 
				className="g-tc g-bg-blue-middle" 
				onClick={handleSubmit}
			>
                (已选 {selectArr.length} 个群) 发送
			</div>
		</div>
		
	);
};
export default List;
