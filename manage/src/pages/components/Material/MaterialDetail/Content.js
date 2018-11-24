import React, { PureComponent } from 'react';
import AudioItem from '../Common/AudioItem';
import ImageItem from '../Common/ImageItem';

class Content extends PureComponent {

	renderText = (data) => {
		return (
			<div className="g-m-b-10">
				{data.text}
			</div>
		);
	};

	renderImg = (data) => {
		return (
			<ImageItem className="g-m-b-15" mediaData={{ ...data }} />
		);
	};

	renderAudio = (data) => {
		return (
			<AudioItem mediaData={{ ...data }} />
		);
	};

	renderContent = () => {
		const { data = {} } = this.props.materialInfo || {};
		const { viewData = [] } = data;

		return viewData.map((item) => {

			switch (item.type) {
				case 'TEXT':
					return this.renderText(item.data);
				case 'CUSTOM_IMAGE':
					return this.renderImg(item.data);
				case 'CUSTOM_AUDIO':
					return this.renderAudio(item.data);
				default:
					return null;
			}
		});
	};

	render() {
		const { title = '' } = this.props.materialInfo || {};
		return (
			<div className="g-col g-black-dark g-pd-lr-20 v-material-detail">
				<div className="g-fs-16 g-m-b-20">{title}</div>
				<div className="_content">
					<div className="g-m-t-20" style={{ paddingRight: 40 }}>
						{this.renderContent()}
					</div>
				</div>
			</div>
		);
	}
}

export default Content;
