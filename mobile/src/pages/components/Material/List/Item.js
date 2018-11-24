import React, { Component } from 'react';
import { Link } from 'react-router';
import './Item.scss';
const Item = (props) => {
	const { icon, title, material_id, remark } = props.itemData;
	const styles = {
		backgroundImage: 'url("' + icon + '")',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	};
	return (
		<Link to={`/material/detail?material_id=${material_id}`} className="_item">
			<div className="_head" style={styles}>
				<div>{title}</div>
			</div>
			<p className="g-m-t-10">
				{
					remark.length > 25 ?
						remark.slice(0, 25) + '......'
						:
						remark
				}
			</p>
		</Link>
	);
};
export default Item;

