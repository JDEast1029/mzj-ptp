module.exports = {
	plugins: [
		require('postcss-smart-import')({
			/* ...options */
		}),
		require('postcss-flexbugs-fixes')({

		}),
		require('precss')({
			/* ...options */ 
		}),
		require('autoprefixer')({
			/* ...options */
			remove: false  // 不开启自动删除老式过时的代码
		})
	]
};