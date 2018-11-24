import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MaterialActions from '@actions/material';
// 公用组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
// 业务组价
import InfoForm from '@components/Material/MaterialAdd/InfoForm';

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	render() {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const {
			materialDetail,
			actions
		} = this.props;
		const { material_id } = query;
		let title = material_id ? '编辑素材' : '创建素材';

		return (
			<SetTitle title={title} style={{ paddingBottom: 50 }}>
				<InfoForm
					actions={actions}
					materialInfo={materialDetail.materialInfo}
					material_id={material_id}
				/>
			</SetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		routing: state.routing,
		materialDetail: state.materialDetail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MaterialActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
