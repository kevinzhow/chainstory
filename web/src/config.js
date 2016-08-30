const PRODUCTION = process.env.NODE_ENV === 'production'? true : false

const SERVER_URL = PRODUCTION ? "https://zi.com/chainstory/api" : "http://0.0.0.0:9527/api"

const WECHAT_CONFIG = {
	APPID: "wx65c09df2657f16f7",
	REDIRECT_URL: "https://zi.com/chainstory/",
	SCOPE: "snsapi_login,snsapi_userinfo",
	STATE: "3d6be0a4035d839573b0481615e"
}

const TIP = {
	brand: { name: "brand",  title: "故事接龙", content: "故事接龙是 字里行间(zi.com) 出品的一款 HTML5 文字互动游戏，旨在发现创作的乐趣。" },
	newStory: { name: "newStory", title: "起头", content: "在第一段，我们建议设定故事的时间，地点，人物。当起好头，埋好坑之后，分享给你的朋友，他将抽取一张剧情卡来完成续写任务。" },
	storyLine: { name: "storyLine", title: "情节卡", content: "为了推送情节的发展，在续写之时都需要抽取一张情节卡，并续写卡片相关的内容。例如抽到了 狗血 卡，那么无论情节此时如何很单纯很不做作，都需要以狗血为基调编写剧情。" }
}

const CARDS = [
	{ name: "屌丝卡", type: 0, title: "屌丝卡", content: "屌丝剧情" },
	{ name: "狗血卡", type: 1, title: "狗血卡", content: "狗血剧情" },
	{ name: "逆袭卡", type: 2, title: "逆袭卡", content: "逆袭剧情" }
]

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

function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

function GEN_WECHAT_URL() {
	if (isWeixinBrowser()) {
		var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WECHAT_CONFIG.APPID}&redirect_uri=${WECHAT_CONFIG.REDIRECT_URL}&response_type=code&scope=${WECHAT_CONFIG.SCOPE}&state=${WECHAT_CONFIG.STATE}#wechat_redirect`
		return encodeURI(url)
	} else {
		var url = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_CONFIG.APPID}&redirect_uri=${WECHAT_CONFIG.REDIRECT_URL}&response_type=code&scope=${WECHAT_CONFIG.SCOPE}&state=${WECHAT_CONFIG.STATE}#wechat_redirect`
		return encodeURI(url)
	}
}

function GEN_WECHAT_USERINFO(access_token, open_id) {
	var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`
	return encodeURI(url)
}

const CONFIG = {
	WECHAT: WECHAT_CONFIG,
	WECHAT_URL: GEN_WECHAT_URL(),
	WECHAT_USERINFO_URL: GEN_WECHAT_USERINFO,
	DEMOUSER1: DemoUser,
	DEMOUSER2: DemoUser2,
	SERVER_URL: SERVER_URL,
	PRODUCTION: PRODUCTION,
	TIP: TIP,
	CARDS: CARDS
}

module.exports = CONFIG