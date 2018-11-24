import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/material';
import * as types from '@constants/actions/material';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
import Footer from '@components/_common/Footer/Footer';

// 业务组件
import Search from '@components/Material/List/Search';
import ScrollList from '@components/Material/List/ScrollList';
class Container extends Component {

	componentWillUnmount() {
		this.props.actions.materialListInit();
	}

	render() {
		const { actions, materialList, location } = this.props;
		const { state = {}, query: { category_id, community_id } } = location;
		return (
			<WxSetTitle title="素材" back={false} className="v-material-list">
				<Search 
					actions={actions}
				/>
				<ScrollList
					actions={actions}
					listInfo={materialList}
					category_id={category_id}
					community_id={community_id || ''}
				/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		materialList: state.materialList
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
