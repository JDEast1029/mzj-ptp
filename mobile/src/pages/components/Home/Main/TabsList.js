import React, { Component } from 'react';

import { Toast, Tabs }  from 'antd-mobile';
import List1 from './List1';
import List2 from './List2';
import './Styles.scss';

const  tabs = [
	{ title: '最优下款组合', key: '1' },
	{ title: <div style={{ position: 'relative' }}>新口子<span className="g-fs-12" style={{ color: '#ffffff', position: 'absolute', top: '-10px', right: '-20px' }}>新</span></div>, key: '2' },
];
export default class TabList extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		const { type } = this.props;
		this.state = {
			type: type
		};
	}
	handleChange(tab){
		_global.history.replace(`/home?type=${tab.key}`);
		this.setState({
			type: tab.key
		});
	}
	render() {
		const { data = {}, type, actions } = this.props;

		return (
			<Tabs 
				tabs={tabs}
				page={type}
				onChange={this.handleChange}
			>
				<List1 key="1" />
				<List2 key="2"/>
			</Tabs>
		);
	}
}
