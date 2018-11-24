
import React, { Component } from 'react';
import Item from './Item';
const List = (props) => {
	const { itemArr, itemObj, actions, info } = props;
	return (
		<div>
			{
				itemArr.map((item, index) => {
					return (
						<Item
							key={`${item.material_id}`}
							itemData={itemObj[item]}
							actions={actions}
						/>
					);
                    
				})
			}
		</div>
	);
};
export default List;
