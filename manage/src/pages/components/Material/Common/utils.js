/**
 * 格式化 富文本中的raw
 * @param data
 * @returns {Array}
 */
export const formatRaw = (data = {}) => {
	const { blocks = [], entityMap } = data;
	let viewData = [], entityIndex = 0;
	for (let i = 0; i < blocks.length; i++) {
		let item = blocks[i] || {};
		if (item.type === 'atomic') {
			viewData.push({
				...entityMap[entityIndex]
			});
			entityIndex++;
		} else if (item.type === 'unstyled') {
			viewData.push({
				type: "TEXT",
				data: { text: item.text }
			});
		}
	}

	return viewData;
};
