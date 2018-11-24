import React, { Component } from 'react';
import { Tabs } from 'antd';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import MaterialMessage from './MaterialMessage';
import { getHashUrl } from 'wya-utils';
const TabPane = Tabs.TabPane;
export default class Tab extends Component {
	/**
	 * Tab切换
	 * @param key
	 */
	handleChange = (key) => {
		// let { query, listInfo } = this.props;
		const query = {
			status: key
			// page: listInfo[key].curPage || 1
		};
		_global.history.replace(getHashUrl(`/crowd/message`, { ...query }));
		this.setState({
			status: key
		});
	};
	render() {
		const { status, page, listInfo, actions, query } = this.props;
		return (
			<Tabs 
				defaultActiveKey={status} 
				activeKey = {status}
				onChange = {this.handleChange}
			>
				<TabPane tab="文字" key="1" >
					<TextMessage/>
				</TabPane>
				<TabPane tab="图片" key="2" >
					<ImageMessage/>
				</TabPane>
				<TabPane tab="素材" key="3" >
					<MaterialMessage
						status={status || '1'}
						page={page}
						listInfo={listInfo}
						actions={actions}
						query={query}
					/>
				</TabPane>
			</Tabs>
		);
	}
}
