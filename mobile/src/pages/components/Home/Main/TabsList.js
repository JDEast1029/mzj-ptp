import React, { Component } from 'react';

import { Toast, Tabs }  from 'antd-mobile';
import List1 from './List1';
import List2 from './List2';
import './Styles.scss';

const  tabs = [
	{ title: '最优下款组合', type: '1' },
	{ title: '新口子', type: '2' },
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
		_global.history.replace(`/home?type=${tab.type}`);
		this.setState({
			type: tab.type
		});
	}
	render() {
		const { data = {}, type, actions } = this.props;

		return (
			<Tabs 
				tabs={tabs}
				initialPage={type}
				onChange={this.handleChange}
			>
				<List1 />
				<List2 />
			</Tabs>
		);
	}
}
