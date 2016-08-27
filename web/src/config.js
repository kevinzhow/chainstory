const WECHAT_CONFIG = {
	APPID: "wxb",
	REDIRECT_URL: "",
	SCOPE: "",
	STATE: ""
}

function GEN_WECHAT_URL() {
	var url = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_CONFIG.APPID}&redirect_uri=${WECHAT_CONFIG.REDIRECT_URL}&response_type=code&scope=${WECHAT_CONFIG.SCOPE}&state=${WECHAT_CONFIG.STATE}#wechat_redirect`
	return encodeURI(url)
}


const CONFIG = {
	WECHAT: WECHAT_CONFIG,
	WECHAT_URL: GEN_WECHAT_URL()
}

module.exports = CONFIG