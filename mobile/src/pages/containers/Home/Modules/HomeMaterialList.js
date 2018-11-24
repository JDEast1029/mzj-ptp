import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/home';
import * as types from '@constants/actions/home';
// 公用组件
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
import Footer from '@components/_common/Footer/Footer';

// 业务组件
import Search from '@components/Home/MaterialList/Search';
import List from '@components/Home/MaterialList/List';
class Container extends Component {
    componentWillMount = () => {
    	this.getInfo();
    }
    getInfo = (title) => {
    	const { actions, location } = this.props;
    	const {
    		locationBeforeTransitions: { query }
    	} = this.props.routing;
    	const { community_id } = query;
    	const url = types.HOME_MATERIAL_LIST_GET;
    	const param = {
    		community_id,
    		type: 2,
    		title,
    	};
    	const params = {
    		param,
    		ajaxType: 'GET',
    		onSuccess: () => { },
    		onError: () => { }
    	};
    	actions.request(url, params, {});
    } 
    render() {
    	const { actions, homeMaterialList } = this.props;
    	const {
    		locationBeforeTransitions: { query }
    	} = this.props.routing;
    	
    	return (
    		<WxSetTitle 
    			title="选择群素材"
    			className="v-home-materiallist g-flex g-fd-c"
    		>
    			<Search
    				actions={actions}
    				getInfo={this.getInfo}
    			/>
    			<List
    				actions={actions}
    				listInfo={homeMaterialList}
    				query={query}
    			/>
    		</WxSetTitle>
    	);
    }
}

function mapStateToProps(state) {
	return {
		homeMaterialList: state.homeMaterialList,
		routing: state.routing,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);