import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/mine';
import * as types from '@constants/actions/mine';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
import Footer from '@components/_common/Footer/Footer';

// 业务组件
import Search from '@components/Mine/Collect/Search';
import ScrollList from '@components/Mine/Collect/ScrollList';
class Container extends Component {
	componentWillUnmount() {
		this.props.actions.navigator();
	}
	render() {
		const { actions, mineCollect } = this.props;
		return (
			<WxSetTitle title="我的收藏" className="v-mine-collect">
				<Search
					actions={actions}
				/>
				<ScrollList
					actions={actions}
					listInfo={mineCollect}
				/>
			</WxSetTitle>
		);
	}
}

function mapStateToProps(state) {
	return {
		mineCollect: state.mineCollect
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
