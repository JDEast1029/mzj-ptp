import React, { Component } from 'react';
import { Link } from 'react-router';
import './Item.scss';
const Item = (props) => {
	const { community_id } = props;
	const { name, logo, category_id } = props.itemData;
	return (
		<div className="_item">
			<Link to={`/material/list?category_id=${category_id}&community_id=${community_id ? community_id : ''}`}>
				<img src={logo} alt="" />
				<p>{name}</p>
			</Link>
		</div>
	);
};
export default Item;

