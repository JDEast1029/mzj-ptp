import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GoBack.scss';

function goback(event){
	event.preventDefault();
	_global.history.goBack();
}
const GoBack = (props) => {
	const { gobackPosition } = props;
	return (
		<div className="c-share-back" style={{ ...gobackPosition }}>
			<div className="__content">
				<i 
					className="iconfont icon-goback __icon" 
					onClick={goback}
				 />
			</div>
		</div>
	);
};

export default GoBack;