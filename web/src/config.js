const WECHAT_CONFIG = {
	APPID: "wx65c09df2657f16f7",
	REDIRECT_URL: "https://zi.com/chainstory",
	SCOPE: "snsapi_login",
	STATE: "3d6be0a4035d839573b0481615e"
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