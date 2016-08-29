const SERVER_URL = "http://0.0.0.0:9527/api"

const WECHAT_CONFIG = {
	APPID: "wx65c09df2657f16f7",
	REDIRECT_URL: "https://zi.com/chainstory",
	SCOPE: "snsapi_login",
	STATE: "3d6be0a4035d839573b0481615e"
}

const DemoUser = {
	username: "周楷雯Kevin",
	type: 0,
	wx_openid: 'kevinzhow',
	wb_openid: 'kevinzhow',
	avatar: "http://tva2.sinaimg.cn/crop.0.0.1242.1242.180/68c9c44djw8f0y66adyekj20yi0yigmt.jpg"
}

const DemoUser2 = {
	username: "左耳朵耗子",
	type: 0,
	wx_openid: 'zuoerduo',
	wb_openid: 'zuoerduo',
	avatar: "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
}

function GEN_WECHAT_URL() {
	var url = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_CONFIG.APPID}&redirect_uri=${WECHAT_CONFIG.REDIRECT_URL}&response_type=code&scope=${WECHAT_CONFIG.SCOPE}&state=${WECHAT_CONFIG.STATE}#wechat_redirect`
	return encodeURI(url)
}


const CONFIG = {
	WECHAT: WECHAT_CONFIG,
	WECHAT_URL: GEN_WECHAT_URL(),
	DEMOUSER1: DemoUser,
	DEMOUSER2: DemoUser2,
	SERVER_URL: SERVER_URL
}

module.exports = CONFIG