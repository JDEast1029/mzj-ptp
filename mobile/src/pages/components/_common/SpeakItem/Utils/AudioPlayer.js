window.XQBAudio = {
	audio: {},
	isAudio: false,
	audioOnce: null,
	chatId: ''
};

/**
 * 录音播放控制中心
 * @param audioList  音频列表
 * @param index      当前要播放的音频的位置
 * @param playId     要播放的ID
 */
const playAudio = (audioList, index, playId) => {
	if (index > audioList.length - 1) return;
	const audioNodes = window.audioNodes;
	let audio = window.XQBAudio.audio;
	let lastChatId = window.XQBAudio.chatId;

	let playItem = audioNodes[playId];
	let url = audioNodes[playId].props.src;
	if (playId === lastChatId) {
		if (audio.paused) { // 暂停状态
			audio.autoplay = true;
			audio.play();
			playItem.handleStart();
		} else {
			audio.pause();
			playItem.handlePause();
		}
	} else { // 点击的不是同一个
		// 其他暂停
		toPause();

		if (window.XQBAudio.audio) {
			audio = window.XQBAudio.audio;
			audio.src = url;
		} else {
			window.XQBAudio.audio = new Audio();
			audio = window.XQBAudio.audio;
			audio.src = url;
		}
		audio.load();
		audio.onloadstart = function() {
			// playItem.setAttribute('class', 'voice-icon  playloading');
		};
		audio.oncanplaythrough = function() {
			window.XQBAudio.chatId = playId;
			playItem.handleStart();
			audio.autoplay = true;
			audio.play();
		};
		audio.ontimeupdate = function () {
			playItem.handlePlaying();
		};
		audio.onended = function() {
			playItem.handlePause();
			// playAudio(audioList, index + 1, audioList[index + 1].content_id);
			playItem.handleEnd();
		};
		audio.onerror = function () {
			playItem.handlePause();
		};
	}

};

const toPause = () => {
	const audioNodes = window.audioNodes;

	for (let key in audioNodes) {
		audioNodes[key].handlePause();
	}
};
export default playAudio;
