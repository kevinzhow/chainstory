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
	storyLine: { name: "storyLine", title: "情节卡", content: "为了推送情节的发展，在续写之时都需要抽取一张情节卡或关键卡，并续写卡片相关的内容。例如抽到了狗血卡，那么无论情节此时如何很单纯很不做作，都需要以狗血为基调编写剧情，如果抽到了火腿卡，那么续写的内容就要包含火腿这个关键词，并承上启下。" },
	shareStory: { name: "shareStory", title: "续写成功, 但是分享才能保存", content: "每次续写都相当于一个故事的平行世界，故事的发展不会影响到之前故事的链接内容，因此你需要将此页面分享给朋友才能保存并延续你写的故事。" }	
}

const CARDS = [
	{ name: "屌丝卡", type: 0, title: "屌丝卡", content: "情节卡：屌丝是高富帅，白富美的绝对反面，一般具备矮矬穷，没理想，猥琐，喜欢拿好人卡等特点。" },
	{ name: "狗血卡", type: 1, title: "狗血卡", content: "情节卡：狗血源于港片驱鬼情节对狗血的滥用，一般是指夸张，俗套，没有新意的剧情，例如坏人总是要被砍死两次才能真的死掉。" },
	{ name: "逆袭卡", type: 2, title: "逆袭卡", content: "情节卡：逆袭来源于日本，通常是指主角光环在处于劣势的情况下发出大招干掉了 NPC。" },
	{ name: "NTR卡", type: 3, title: "NTR卡", content: "情节卡：NTR是日文“寝取る”的被动形“寝取られ”（Ne To Ra Re）的罗马拼音缩写，中译即“被他人强占配偶或对象”、被别人戴绿帽。" },
	{ name: "圣母卡", type: 4, title: "圣母卡", content: "情节卡：圣母”这个词更多倾向于贬义，指牺牲与自己不相干的人的利益来拯救别人的人，慷他人之慨来实现自己的道德优越感或目的的角色，这种含义的圣母也可以叫‘圣母婊’。" },
	{ name: "金坷垃卡", type: 5, title: "金坷垃卡", content: "关键字卡：“金坷垃（jīn kē/kě lā）” 是一电视广告中声称其由“美国圣地亚戈农业集团(American Shengdiyage)” 研发，由中国生产的一种肥料添加剂。" },
	{ name: "大便卡", type: 6, title: "大便卡", content: "关键字卡：粪便，粪便俗称大便，人或动物的食物残渣排泄物。粪便的四分之一是水分，其余大多是蛋白质、无机物、脂肪、未消化的食物纤维、脱了水的消化液残余、以及从肠道脱落的细胞和死掉的细菌，还有维生素K、维生素B。" },
	{ name: "GFW卡", type: 7, title: "GFW卡", content: "关键字卡：防火长城（英文名称Great Firewall of China，简写为Great Firewall，缩写GFW），也称中国防火墙或中国国家防火墙，指中华人民共和国政府在其管辖因特网内部建立的多套网络审查系统的总称，包括相关行政审查系统。  首要设计者为北京邮电大学原校长方滨兴，被称为“国家防火墙之父”" },
	{ name: "上课卡", type: 8, title: "上课卡", content: "关键字卡：上课，指老师在学校里讲课或学生听老师讲课，学生获得知识的过程。" },
	{ name: "做寿司卡", type: 9, title: "做寿司卡", content: "关键字卡：做寿司，即制作寿司。寿司起源于中国，后传入日本，主要用紫菜卷起醋饭，鱼肉，蔬菜，鸡蛋，蟹柳等材料再切件制成，味道鲜美可口，可谓是日本最出众的饮食文化标志" },
	{ name: "化妆卡", type: 10, title: "化妆卡", content: "关键字卡：化妆，也可以叫化装。是运用化妆品和工具，采取合乎规则的步骤和技巧，对人体的面部、五官及其他部位进行渲染、描画、整理，增强立体印象，调整形色，掩饰缺陷，表现神采，从而达到美化视觉感受的目的。" },
	{ name: "挤黑头卡", type: 11, title: "挤黑头卡", content: "关键字卡：黑头又称黑头粉刺，为开放性粉刺（堵塞毛孔的皮脂的表层直接暴露在外面，与空气、空气中的尘埃接触）。是皮肤油脂在空气中的氧化而造成，发臭发黑，黑头粉刺常见于青春发育期的青少年，好发于面部、前胸和后背，尤其是鼻子的小黑头最多，其特征为明显扩大的毛孔中的黑点，挤出后形如小虫，顶端发黑。" },
	{ name: "混不下去卡", type: 12, title: "混不下去卡", content: "关键字卡：生活等方面过得不怎么好，无目标，混混沌沌。北方人最忌说其混日子。" },
	{ name: "被偷了卡", type: 13, title: "被偷了卡", content: "关键字卡：指财物被人偷盗。" },
	{ name: "要饭卡", type: 14, title: "要饭卡", content: "关键字卡：要饭是指向人乞求饭食或其他施舍。" },
	{ name: "周杰伦卡", type: 15, title: "周杰伦卡", content: "关键字卡：周董，周杰伦" },
	{ name: "吃米粉卡", type: 16, title: "吃米粉卡", content: "关键字卡：米粉，中国特色小吃，是中国南方地区非常流行的美食。" },
	{ name: "撸管卡", type: 17, title: "撸管卡", content: "关键字卡：自慰是正常的生理现象，人类的自慰现象广泛存在。" },
	{ name: "喝茶卡", type: 18, title: "喝茶卡", content: "关键字卡：一般来说，每天1-2次，每次3-5克、400毫升的饮量是比较适当的。一般，人们说喝茶还指喝水。" },
	{ name: "睡觉卡", type: 19, title: "睡觉卡", content: "关键字卡：睡眠是生命的需要，所以人不能没有睡眠，而且每天缺少的睡眠还要补上，否则会受到惩罚，很像欠债一定要还一样。" },
	{ name: "腰疼卡", type: 20, title: "腰疼卡", content: "关键字卡：平时注意避免腰部受凉，站立及坐位姿势要正确，负重及弯腰幅度不宜过大。发现腰疼，及时就诊。" },
	{ name: "饿了卡", type: 21, title: "饿了卡", content: "关键字卡：肚子很空，想吃东西。" },
	{ name: "扣了下屁股卡", type: 22, title: "扣了下屁股卡", content: "关键字卡：手放在屁股处，扣了下，或者几下" },
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

function GEN_WECHAT_URL(redirect_uri) {
	if (isWeixinBrowser()) {
		var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WECHAT_CONFIG.APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=${WECHAT_CONFIG.SCOPE}&state=${WECHAT_CONFIG.STATE}#wechat_redirect`
		return encodeURI(url)
	} else {
		var url = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_CONFIG.APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=${WECHAT_CONFIG.SCOPE}&state=${WECHAT_CONFIG.STATE}#wechat_redirect`
		return encodeURI(url)
	}
}

function GEN_WECHAT_USERINFO(access_token, open_id) {
	var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`
	return encodeURI(url)
}

const CONFIG = {
	WECHAT: WECHAT_CONFIG,
	WECHAT_URL: GEN_WECHAT_URL,
	WECHAT_USERINFO_URL: GEN_WECHAT_USERINFO,
	DEMOUSER1: DemoUser,
	DEMOUSER2: DemoUser2,
	SERVER_URL: SERVER_URL,
	PRODUCTION: PRODUCTION,
	TIP: TIP,
	CARDS: CARDS
}

module.exports = CONFIG