import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
const Search = (props) => {
	const handleReturn = () => {
		const { community_id } = props;
		_global.history.push(`material/list${community_id ? '?community_id=' + community_id : ''}`);
	};
	return (
		<div>
			<SearchBar
				placeholder="搜索"
				cancelText="搜索"
				onFocus={handleReturn}
			/>
		</div>
	);
};
export default Search;
