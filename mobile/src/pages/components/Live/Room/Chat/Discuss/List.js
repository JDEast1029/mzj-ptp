import React, { Component } from 'react';
import Item from './Item';

const List = (props) => {
	const { actions, itemArr = [], itemObj, type } = props;
	return (
		<div>
			{
				itemArr.map((item, index) => {
					return (
						<Item
							key={`${item}`}
							itemData={itemObj[item]}
						/>
					);
				})
			}
		</div>
	);
};
export default List;
