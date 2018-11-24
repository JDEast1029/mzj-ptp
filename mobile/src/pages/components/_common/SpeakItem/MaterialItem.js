import React from 'react';
import './Styles.scss';

const MaterialItem = (props) => {
	const { isSelf, material_id, role } = props;
	return (
		<div
			className={`c-chat-item-material ${isSelf ? 'g-bg-green-middle' : 'g-bg-white'}`}
			onClick={() => { _global.history.push(`/material/detail?material_id=${material_id}&role=${role}`); }}
		>
			<div className="g-break-word g-pd-tb-5 g-tl"
				style={{ borderBottom: isSelf ? '1px solid #95c151' : '1px solid #e5e5e5' }}
			>
				{props.content}
			</div>
			<div
				className="g-fs-12 g-tr"
				style={{ color: isSelf ? '#5b8716' : '#999' }}
			>
				来自素材
			</div>
		</div>
	);
};

export default MaterialItem;