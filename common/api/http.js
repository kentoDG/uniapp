const util = require('../helper.js')
const BASE_URL = process.uniEnv.baseUrl
const _request = (options) => {
	const token = uni.getStorageSync('token') || '';
	return new Promise((resolve, reject) => {
		uni.request({
			url: options.allUrl ? options.allUrl : BASE_URL + options.url,
			method: options.method || "GET", // 请求类型，默认为GET
			data: options.data || {}, // 请求参数，默认空对象
			header: {
				"content-type": options.contentType||"application/x-www-form-urlencoded",
				"token": token
			},

			success: res => {
				// 状态判断，根据后台定义并提示
				if (res.data.code == '401') {
					uni.clearStorage()
					uni.navigateTo({
						url: `/pages/auth/login/login`
					})

				} else {
					resolve(res)
				}
			},
			fail: err => {
				uni.showToast({
					title: "请求失败！"
				})
				reject(err)
			}
		})
	})
}
const _uploadFile = (options) => {
	const token = uni.getStorageSync('token') || '';
	console.log('fffffffffffffffffff',options.filePath);
	return new Promise((reslove, reject) => {
		uni.uploadFile({
			url: BASE_URL + options.url,
			fileType:"image",
			filePath: options.filePath, //哪张图片
			name: options.name||'file', //对应接口的文件名称
			header: { //请求头
				"token": token
			},
			success: (res) => {
				console.log('fffffffffffffff',JSON.parse(res.data));
				reslove(JSON.parse(res.data).data.url)
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}
export const httpRequest = options => {
	return util.awaitWrap(_request(options))
}
export const uploadFile = options => {
	return util.awaitWrap(_uploadFile(options))
}
