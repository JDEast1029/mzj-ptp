
import React, { Component } from 'react';
import Item from './Item';
const List = (props) => {
	const { itemArr, itemObj, actions, info, community_id } = props;
	return (
		<div className="g-pd-t-20">
			{
				itemArr.map((item, index) => {
					return (
						<Item
							key={`${item.category_id}`}
							itemData={itemObj[item]}
							actions={actions}
							community_id={community_id}
						/>
					);
                    
				})
			}
		</div>
	);
};
export default List;
