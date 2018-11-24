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
import Search from '@components/Material/Search';
import ScrollList from '@components/Material/ScrollList';
class Container extends Component {
	componentWillUnmount() {
		this.props.actions.navigator();
	}
	render() {
		const { actions, materialMain, location } = this.props;
		const { state = {}, query: { community_id } } = location;
		const title = community_id ? '群素材' : '素材';
		return (
			<WxSetTitle title={title} back={false} className="v-material-mian">
				<Search 
					community_id={community_id}
				/>
				<ScrollList 
					actions={actions}
					listInfo={materialMain}
					community_id={community_id}
				/>
				<Footer hide={community_id}/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		materialMain: state.materialMain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
