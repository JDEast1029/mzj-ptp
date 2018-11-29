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
			remove: false,  // 不开启自动删除老式过时的代码
			browsers: [
				"> 1%", 
				"IE > 8",
				"last 2 versions", 
				"Firefox ESR", 
				"Opera 12.1",
				"Safari > 7"
			]
		})
	]
};