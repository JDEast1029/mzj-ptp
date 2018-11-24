import React, { Component } from 'react';
import { LOGIN_LOGO } from '@constants/constants';
import Form from './Form';

const Header = (props) => {
	const { actions, layoutActions } = props;
	return (
		<div className="g-flex-cc">
			<Form
				actions={actions}
				layoutActions={layoutActions}
			/>
		</div>
	);
};
export default Header;
