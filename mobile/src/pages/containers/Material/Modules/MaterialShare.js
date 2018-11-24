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
import Search from '@components/Material/Share/Search';
import List from '@components/Material/Share/List';
class Container extends Component {
    componentWillMount = () => {
    	this.getInfo();
    }
    componentWillUnmount() {
    	this.props.actions.navigator();
    }
    getInfo = (name) => {
    	const { actions, location } = this.props;
    	const { query: { material_id } } = location;
    	const url = types.MATERIAL_SHARE_LIST_GET;
    	const param = {
    		name,
    		material_id
    	};
    	const params = {
    		param,
    		ajaxType: 'GET',
    		onSuccess: () => {

    		},
    		onError: () => {

    		}
    	};
    	actions.request(url, params, {});
    } 
    render() {
    	const { actions, materialShare, location } = this.props;
    	const { query: { material_id } } = location;
    	return (
    		<WxSetTitle title="素材" back={false} className="v-material-share">
    			<Search
    				actions={actions}
    				getInfo={this.getInfo}
    				length={materialShare.list.length}
    			/>
    			<List
    				actions={actions}
    				material_id={material_id}
    				listInfo={materialShare}
    			/>
    		</WxSetTitle>
    	);
    }
}

function mapStateToProps(state) {
	return {
		materialShare: state.materialShare
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
