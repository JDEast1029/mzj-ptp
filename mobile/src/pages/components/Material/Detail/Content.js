import React, { Component } from 'react';
import Audio from './Audio';
import './content.scss';
import { NO_PERMISSION_GB } from '@constants/constants';
import Empty from '@components/_common/Empty/Empty';
export default class Content extends Component {
	render() {
		const { info = {}, material_id, actions } = this.props;
		const { data = {}, not_allow, is_not_exists } = info;
		const { viewData = [] } = data;
		if (!not_allow && !is_not_exists){
			return (
				<div>
					{
						viewData.map((val, index) => {
							switch (val.type) {
								case 'TEXT':
									if (val.data.text) {
										return <p>{val.data.text}</p>;
									} else {
										return <br />;
									};
								case 'CUSTOM_AUDIO':
									return <Audio
										info={val.data}
										material_id={material_id}
										actions={actions}
										index={index}
									/>;
								case 'CUSTOM_IMAGE':
									return <img style={{ width: '100%' }} src={val.data.url} alt="素材图" />;
							}
						})
					}
				</div>
			);
		} else {
			return (
				<Empty img={NO_PERMISSION_GB} title={is_not_exists ? '该素材已被删除' : '暂无查看权限哦~'} />
			);
		}
	}
}