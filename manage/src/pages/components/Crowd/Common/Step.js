import React, { Component } from 'react';
import './Step.scss';
const styles = {
	color: 'white'
};
const Step = (param) => {
	const { step, community_id, edit } = param;
	const returnLink = (type) => {
		if (edit){
			_global.history.replace(`/crowd/list/edit-${type}?id=${community_id}`);
		}
	};
	return (
		<div className="g-flex g-jc-sa g-ai-c v-crowd-step">
			<div 
				onClick={() => { returnLink('one'); }} 
				className={`_step ${step >= 1 && !edit ? '_active' : null} ${step === 1 && edit ? '_active' : null}`}>
				{!edit ? "第一步" : null} 基本设置
			</div>
			<div className={`_arrows ${!edit ? '_arrows-create' : '_arrows-edit'}`} />
			<div 
				onClick={() => { returnLink('two'); }} 
				className={`_step ${step >= 2 && !edit ? '_active' : null} ${step === 2 && edit ? '_active' : null}`}>
				{!edit ? "第二步" : null} 群成员设置 
			</div>
			<div className={`_arrows ${!edit ? '_arrows-create' : '_arrows-edit'}`}  style={{}}/>
			<div 
				onClick={() => { returnLink('three'); }} 
				className={`_step ${step >= 3 && !edit ? '_active' : null} ${step === 3 && edit ? '_active' : null}`}>
				{!edit ? "第三步" : null} 群素材设置
			</div>
		</div>
	);
};
export default Step;