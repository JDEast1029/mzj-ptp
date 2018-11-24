import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// reudx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/material';
import * as types from '@constants/actions/material';
// 公用组件
import { MToasts } from 'wya-rc';
import WxSetTitle from '@components/_common/SetTitle/WxSetTitle/WxSetTitle';
import Footer from '@components/_common/Footer/Footer';

// 业务组件
import Header from '@components/Material/Detail/Header';
import Content from '@components/Material/Detail/Content';
class Container extends Component {
	componentWillMount = () => {
		const { actions, materialDetail, location } = this.props;
		const { query: { material_id, role } } = location;
		if (materialDetail[material_id]) {
			return;
		}
		const url = types.MATERIAL_DETAIL_INFO_GET;
		const param = {
			material_id,
			role
		};
		const params = {
			param,
			ajaxType: 'GET',
			onSuccess: () => {

			},
			onError: (error) => {
				error.msg && MToasts.info(error.msg);
			}
		};
		actions.request(url, params, {});
	}
	componentWillUnmount() {
		this.props.actions.navigator();
	}
	render() {
    	const { actions, materialDetail, location } = this.props;
    	const { state = {}, query: { material_id, role } } = location;
		const info = materialDetail[material_id];
    	return (
    		<WxSetTitle     
    			title="素材详情" 
    			back={false} 
    			className="v-material-detail g-bg-white g-pd-10"
    		>	
    			<Fragment>
    				<Header info={info} actions={actions}/>
    				<Content 
						info={info} 
						actions={actions} 
						material_id={material_id}
						role={role}
					/>
    			</Fragment>
    		</WxSetTitle>
    	);
	}
}

function mapStateToProps(state) {
	return {
		materialDetail: state.materialDetail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
