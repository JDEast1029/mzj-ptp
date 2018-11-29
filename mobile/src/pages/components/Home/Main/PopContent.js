import React, { Component } from 'react';
import PopupBg from './image.png';
import QRCode from './QRcode.png';

export default class PopContent extends Component {
	render() {
		const { onClose } = this.props;
		return (
			<div 
				style={{ 
					position: 'relative',
					height: '100vh', 
					width: '100%', 
					backgroundImage: `url(${PopupBg})`,
					backgroundSize: 'cover'
				}} 
			>
				<div 
					style={{
						position: 'absolute',
						top: '20px',
						left: '20px',
						padding: '4px 10px',
						border: '1px solid #ffffff',
						color: '#ffffff'
					}}
					onClick={onClose}
				>
					关闭
				</div>

				<img 
					src={QRCode} 
					style={{ 
						height: '100px',
						width: '100px',
						position: 'absolute',
						top: '0',
						left: '0',
						bottom: '0',
						right: '0',
						margin: 'auto'
					 }}
				/>
			</div>
		);
	}
}
