import React from 'react';
import './Styles.scss';

const TextItem = (props) => {
	const { isSelf, isLive } = props;
	const classes = `c-chat-item-text g-break-word g-tl ${isSelf || isLive ? 'g-bg-green-middle' : 'g-bg-white'}`;
	return (
		<span className={classes} style={{ display: 'inline-block' }}>
			{props.content}
		</span>
	);
};

export default TextItem;
