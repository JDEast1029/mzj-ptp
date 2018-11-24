import React, { PureComponent } from 'react';
import { ImgsPreview } from 'wya-rc';

class ImageItem extends PureComponent {

	handlePreview = () => {
		const { url } = this.props.mediaData || {};
		ImgsPreview.Func.popup({
			show: true,
			dataSource: [url],
			opts: {
				closeOnScroll: false
			}
		}).then(() => {

		}).catch(() => {

		});
	};

	render() {
		const { url, className } = this.props.mediaData || {};

		return (
			<div className={className}>
				<img src={url} onClick={this.handlePreview}/>
			</div>
		);
	}
}

export default ImageItem;
