import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as MaterialActions from '@actions/material';
// 公用组件
import SetTitle from '@components/_common/SetTitle/SetTitle';
// 业务组价
import Preview from '@components/Material/MaterialDetail/Preview';
import Content from '@components/Material/MaterialDetail/Content';

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillUnmount() {
		this.props.actions.navigator();
	}

	handleEdit = () => {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const { material_id } = query;

		_global.history.push(`/material/list/add?material_id=${material_id}`);
	};

	render() {
		const {
			locationBeforeTransitions: { query }
		} = this.props.routing;
		const {
			materialDetail,
			actions
		} = this.props;
		const { material_id } = query;
		const { create_time, update_time } = materialDetail.materialInfo || {};

		return (
			<SetTitle 
				title="素材详情" 
				style={{ paddingBottom: 50 }} 
				renderRight={() => {
					return (
						<div className="g-fs-14 g-c-gray">
							<span style={{ marginRight: 35 }}>创建于{create_time}</span>
							<span>最后编辑于{update_time}</span>
						</div>
					);
				}}
			>
				<div className="g-pd-20 g-flex g-jc-fe">
					<Button
						type="primary"
						className="gp-blue-btn"
						onClick={this.handleEdit}
					>
						编辑
					</Button>
				</div>
				<div className="g-flex" style={{ overflowX: 'auto' }}>
					<Preview
						material_id={material_id}
						actions={actions}
						materialInfo={materialDetail.materialInfo}
					/>
					<Content
						materialInfo={materialDetail.materialInfo}
					/>
				</div>
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
