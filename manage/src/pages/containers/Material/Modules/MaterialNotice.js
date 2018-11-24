import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MaterialActions from '@actions/material';
import SelectCrowd from '@common/SelectCrowd/SelectCrowd';
// 组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
import MaterialNotice from '@components/Material/MaterialNotice/MaterialNotice';

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	handleClick = () => {
		SelectCrowd.popup({

		}).then(() => {

		});
	}
	render() {
		const {
			materialNotice,
			actions,
			layoutActions
		} = this.props;
		return (
			<SetTitle title="全员公告" className="">
				<MaterialNotice actions={actions}/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		materialNotice: state.materialNotice
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MaterialActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
