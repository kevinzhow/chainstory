webpackJsonp([0],[,,,,,function(e,t,n){"use strict";n(30);var i=n(1),o=i.extend({template:n(23),props:["state"]});e.exports=o},function(e,t,n){"use strict";n(32);var i=n(1),o=i.extend({template:n(25),props:["buttonmsg","side"]});e.exports=o},,function(e,t,n){"use strict";n(31);var i=n(1),o=i.extend({template:n(24),props:["bubble"]});e.exports=o},function(e,t,n){"use strict";n(33);var i=n(1),o=i.extend({template:n(26),props:["content"],methods:{toggleComposeDialog:function(e){this.$dispatch("timeline-toggleComposeDialog",null)}},components:{"app-background-cover":n(5),"submit-button":n(6)}});e.exports=o},function(e,t,n){"use strict";n(34);var i=n(1),o=i.extend({template:n(27),props:["dialog"],methods:{toggleDialog:function(e){this.$dispatch("timeline-toggleTips",null)}},components:{"app-background-cover":n(5)}});e.exports=o},function(e,t,n){"use strict";n(35);var i=n(1),o=i.extend({template:n(28),props:["bubble"],methods:{toggleTips:function(e){this.$dispatch("timeline-toggleTips",null)}}});e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(22),o=(n(21),new i.EventEmitter);t["default"]=o,o.fetchStory=function(e){return fetch("/stories/"+e).then(function(e){return e.json()})["catch"](function(e){console.log("parsing story failed",e)})},o.composeStory=function(){return fetch("/stories",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:"Hubot",login:"hubot"})}).then(function(e){return e.json()})["catch"](function(e){console.log("parsing story failed",e)})}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var o=n(12),r=i(o),s=n(1),a=s.extend({template:n(29),replace:!0,created:function(){var e=this;r["default"].fetchStory("story_id").then(function(t){e.bubbles=[{user:{username:"左耳朵耗子",avatar:"http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"},content:"小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。",likes:130,created_at:"1 分钟前"},{user:{username:"周楷雯Kevin",avatar:"http://tva2.sinaimg.cn/crop.0.0.1242.1242.180/68c9c44djw8f0y66adyekj20yi0yigmt.jpg"},content:"2017 年，北京政府实行了全面断网的政策，一时间，中国失去了和外界的联系，无数人都在猜测，这是新一代的闭关锁国，还是有所策划的一场大阴谋",likes:130,created_at:"1 分钟前"}]})},events:{"timeline-toggleTips":function(){(void 0).toggleTips()},"timeline-toggleComposeDialog":function(){(void 0).toggleCompose()}},methods:{toggleTips:function(e){(void 0).tipsDialogState=!(void 0).tipsDialogState},toggleCompose:function(e){(void 0).composeDialogState=!(void 0).composeDialogState}},data:function(){return{buttonMsg:"我要续写",tipsDialogState:!1,composeDialogState:!1,composeContent:"",bubbles:[],tipsBubble:{user:{username:"左耳朵耗子",avatar:"http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"},content:"请点击我要续写续写本故事的矛盾"},dialogContent:{title:"矛盾",content:"在这一段内容里，我们建议您创作本故事的矛盾。小说故事中的矛盾冲突是形成情节的基础，也是推动情节发展的动力，冲突双方的人物性格，则直接决定了情节进展的趋向。矛盾往往代表了阻挠主角欲望的内容。"}}},components:{"app-compose-button":n(6),"app-bubble":n(8),"app-tips-bubble":n(11),"app-background-cover":n(5),"app-tips-dialog":n(10),"app-compose-dialog":n(9)}});e.exports=a},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".mask{position:fixed;overflow:hidden;left:0;top:0;bottom:0;right:0;z-index:-1;background:transparent;display:block}.mask .mask-blur{background:hsla(0,0%,95%,.7);position:absolute;width:100%;height:100%;opacity:1;backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px)}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".bubble{background-color:#fff;border-radius:8px;box-shadow:3px 3px 7px hsla(0,0%,46%,.14);border:2px solid #fbf9f9;margin:10px 10px 20px;padding:15px;max-width:500px}.bubble .bubble-header{display:flex}.bubble .bubble-header .bubble-user-avatar{width:42px;height:42px}.bubble .bubble-header .bubble-user-avatar img{width:100%;height:100%;border-radius:42px}.bubble .bubble-header .bubble-user-info{margin-left:10px}.bubble .bubble-header .bubble-user-info .username{color:#484f57;font-size:15px;font-weight:lighter}.bubble .bubble-header .bubble-user-info .created-at{color:#828d9a;font-size:12px;margin-top:5px;font-weight:lighter}.bubble .bubble-body{color:#484f57;margin-top:10px;font-size:16px;margin-bottom:20px;font-weight:lighter;letter-spacing:0}.bubble .bubble-footer .bubble-footer-info{font-size:12px;color:#9caab9;font-weight:lighter}@media (min-width:500px){.bubble{margin:10px auto 20px}}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".button{background-color:#3a7bf7;box-shadow:2px 2px 20px rgba(58,123,247,.56);color:#fff;padding:10px;width:110px;text-align:center;border-radius:50px;font-weight:700;position:relative}.button.center{margin-left:auto;margin-right:auto}.button:active{background-color:#3a7bf7;box-shadow:2px 2px 10px rgba(58,123,247,.56)}.button:hover{cursor:pointer}.button.bottom{position:fixed;bottom:50px;left:0;right:0}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".compose{top:5%!important;transform:translateY(-5%)!important;min-height:200px;max-height:400px}.compose .bubble-body{margin:5px}.compose textarea{width:100%;resize:none;height:192px;border:none;margin-top:0;margin-bottom:0;font-size:16px;color:#484f57;padding:0;line-height:23px}.compose textarea:focus{outline:none}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".dialog-container{position:fixed;z-index:2001;top:0;bottom:0;left:0;right:0}.dialog-container .dialog{position:absolute;top:40%;left:20px;right:20px;transform:translateY(-40%);z-index:2001}.dialog-container .dialog .bubble-title{font-weight:bolder;color:#484f57}.dialog-container .dialog .bubble-body{line-height:25px;font-weight:lighter;margin-bottom:10px;color:#484f57}",""])},function(e,t,n){t=e.exports=n(2)(),t.push([e.id,".bubble.tips{margin-bottom:40px}.bubble.tips .bubble-header .bubble-user-avatar{height:30px;width:30px;flex:none}.bubble.tips .bubble-header .bubble-user-info{flex:1}.bubble.tips .bubble-header .bubble-user-info .username{line-height:30px}.bubble.tips .bubble-header .bubble-symbol{width:22px;height:22px;border-radius:22px;background:#f3f3f3;border:1px solid #e0e0e0;line-height:22px;flex:none;text-align:center;font-size:14px;color:#bebebe;letter-spacing:0;font-weight:lighter}.bubble.tips .bubble-header .bubble-symbol:hover{cursor:pointer;background:#fbfbfb}.bubble.tips .bubble-header .bubble-symbol:active{background:#e0e0e0}.bubble.tips .bubble-body{font-size:16px;color:rgba(72,79,87,.39);letter-spacing:0;margin-top:15px;margin-bottom:10px}.bubble.tips .bubble-body p{font-size:11px;color:rgba(72,79,87,.39);letter-spacing:0;margin-top:5px;margin-bottom:0}",""])},,function(e,t,n){var i;(function(e,o,r){/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */
(function(){"use strict";function s(e){return"function"==typeof e||"object"==typeof e&&null!==e}function a(e){return"function"==typeof e}function l(e){R=e}function u(e){ee=e}function c(){return function(){e.nextTick(h)}}function b(){return function(){Q(h)}}function p(){var e=0,t=new ie(h),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function f(){var e=new MessageChannel;return e.port1.onmessage=h,function(){e.port2.postMessage(0)}}function d(){return function(){setTimeout(h,1)}}function h(){for(var e=0;e<Z;e+=2){var t=se[e],n=se[e+1];t(n),se[e]=void 0,se[e+1]=void 0}Z=0}function v(){try{var e=n(39);return Q=e.runOnLoop||e.runOnContext,b()}catch(t){return d()}}function g(e,t){var n=this,i=new this.constructor(x);void 0===i[ue]&&U(i);var o=n._state;if(o){var r=arguments[o-1];ee(function(){O(o,i,r,n._result)})}else D(n,i,e,t);return i}function m(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(x);return S(n,e),n}function x(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function y(){return new TypeError("A promises callback cannot return that same promise.")}function w(e){try{return e.then}catch(t){return fe.error=t,fe}}function k(e,t,n,i){try{e.call(t,n,i)}catch(o){return o}}function L(e,t,n){ee(function(e){var i=!1,o=k(n,t,function(n){i||(i=!0,t!==n?S(e,n):C(e,n))},function(t){i||(i=!0,T(e,t))},"Settle: "+(e._label||" unknown promise"));!i&&o&&(i=!0,T(e,o))},e)}function A(e,t){t._state===be?C(e,t._result):t._state===pe?T(e,t._result):D(t,void 0,function(t){S(e,t)},function(t){T(e,t)})}function j(e,t,n){t.constructor===e.constructor&&n===ae&&constructor.resolve===le?A(e,t):n===fe?T(e,fe.error):void 0===n?C(e,t):a(n)?L(e,t,n):C(e,t)}function S(e,t){e===t?T(e,_()):s(t)?j(e,t,w(t)):C(e,t)}function E(e){e._onerror&&e._onerror(e._result),M(e)}function C(e,t){e._state===ce&&(e._result=t,e._state=be,0!==e._subscribers.length&&ee(M,e))}function T(e,t){e._state===ce&&(e._state=pe,e._result=t,ee(E,e))}function D(e,t,n,i){var o=e._subscribers,r=o.length;e._onerror=null,o[r]=t,o[r+be]=n,o[r+pe]=i,0===r&&e._state&&ee(M,e)}function M(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var i,o,r=e._result,s=0;s<t.length;s+=3)i=t[s],o=t[s+n],i?O(n,i,o,r):o(r);e._subscribers.length=0}}function z(){this.error=null}function P(e,t){try{return e(t)}catch(n){return de.error=n,de}}function O(e,t,n,i){var o,r,s,l,u=a(n);if(u){if(o=P(n,i),o===de?(l=!0,r=o.error,o=null):s=!0,t===o)return void T(t,y())}else o=i,s=!0;t._state!==ce||(u&&s?S(t,o):l?T(t,r):e===be?C(t,o):e===pe&&T(t,o))}function Y(e,t){try{t(function(t){S(e,t)},function(t){T(e,t)})}catch(n){T(e,n)}}function N(){return he++}function U(e){e[ue]=he++,e._state=void 0,e._result=void 0,e._subscribers=[]}function $(e){return new _e(this,e).promise}function B(e){var t=this;return new t(X(e)?function(n,i){for(var o=e.length,r=0;r<o;r++)t.resolve(e[r]).then(n,i)}:function(e,t){t(new TypeError("You must pass an array to race."))})}function F(e){var t=this,n=new t(x);return T(n,e),n}function J(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function K(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function H(e){this[ue]=N(),this._result=this._state=void 0,this._subscribers=[],x!==e&&("function"!=typeof e&&J(),this instanceof H?Y(this,e):K())}function W(e,t){this._instanceConstructor=e,this.promise=new e(x),this.promise[ue]||U(this.promise),X(t)?(this._input=t,this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&C(this.promise,this._result))):T(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function G(){var e;if("undefined"!=typeof o)e=o;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;n&&"[object Promise]"===Object.prototype.toString.call(n.resolve())&&!n.cast||(e.Promise=xe)}var I;I=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var Q,R,V,X=I,Z=0,ee=function(e,t){se[Z]=e,se[Z+1]=t,Z+=2,2===Z&&(R?R(h):V())},te="undefined"!=typeof window?window:void 0,ne=te||{},ie=ne.MutationObserver||ne.WebKitMutationObserver,oe="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),re="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,se=new Array(1e3);V=oe?c():ie?p():re?f():void 0===te?v():d();var ae=g,le=m,ue=Math.random().toString(36).substring(16),ce=void 0,be=1,pe=2,fe=new z,de=new z,he=0,ve=$,ge=B,me=F,xe=H;H.all=ve,H.race=ge,H.resolve=le,H.reject=me,H._setScheduler=l,H._setAsap=u,H._asap=ee,H.prototype={constructor:H,then:ae,"catch":function(e){return this.then(null,e)}};var _e=W;W.prototype._enumerate=function(){for(var e=this.length,t=this._input,n=0;this._state===ce&&n<e;n++)this._eachEntry(t[n],n)},W.prototype._eachEntry=function(e,t){var n=this._instanceConstructor,i=n.resolve;if(i===le){var o=w(e);if(o===ae&&e._state!==ce)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(n===xe){var r=new n(x);j(r,e,o),this._willSettleAt(r,t)}else this._willSettleAt(new n(function(t){t(e)}),t)}else this._willSettleAt(i(e),t)},W.prototype._settledAt=function(e,t,n){var i=this.promise;i._state===ce&&(this._remaining--,e===pe?T(i,n):this._result[t]=n),0===this._remaining&&C(i,this._result)},W.prototype._willSettleAt=function(e,t){var n=this;D(e,void 0,function(e){n._settledAt(be,t,e)},function(e){n._settledAt(pe,t,e)})};var ye=G,we={Promise:xe,polyfill:ye};n(37).amd?(i=function(){return we}.call(t,n,t,r),!(void 0!==i&&(r.exports=i))):"undefined"!=typeof r&&r.exports?r.exports=we:"undefined"!=typeof this&&(this.ES6Promise=we),ye()}).call(this)}).call(t,n(7),function(){return this}(),n(38)(e))},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function o(e){return"number"==typeof e}function r(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!o(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,o,a,l,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}if(n=this._events[e],s(n))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(r(n))for(a=Array.prototype.slice.call(arguments,1),u=n.slice(),o=u.length,l=0;l<o;l++)u[l].apply(this,a);return!0},n.prototype.addListener=function(e,t){var o;if(!i(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?r(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,r(this._events[e])&&!this._events[e].warned&&(o=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,o&&o>0&&this._events[e].length>o&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),o||(o=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function");var o=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,o,s,a;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],s=n.length,o=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(r(n)){for(a=s;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){o=a;break}if(o<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],i(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t){e.exports="<div class=mask> <div class=mask-blur></div> </div>"},function(e,t){e.exports='<div class=bubble> <div class=bubble-header> <div class=bubble-user-avatar> <img :src=bubble.user.avatar alt=""/> </div> <div class=bubble-user-info> <div class=username> {{ bubble.user.username }} </div> <div class=created-at> {{ bubble.created_at }} </div> </div> </div> <div class=bubble-body> {{ bubble.content }} </div> <div class=bubble-footer> <div class=bubble-footer-info> {{ bubble.likes }} 人喜欢 </div> <div class=bubble-footer-like> </div> </div> </div>'},function(e,t){e.exports='<div class="button {{side}}">{{ buttonmsg }}</div>'},function(e,t){e.exports='<div class=dialog-container> <div class="bubble dialog compose"> <div class=bubble-body> <textarea name=story-content placeholder=请尽情创作吧...></textarea> </div> </div> <submit-button side="center bottom" buttonmsg=提交></submit-button> <app-background-cover v-on:click=toggleComposeDialog></app-background-cover> </div>'},function(e,t){e.exports='<div class=dialog-container v-on:click=toggleDialog> <div class="bubble dialog"> <div class=bubble-header> <div class=bubble-title> {{ dialog.title }} </div> </div> <div class=bubble-body> {{ dialog.content }} </div> </div> <app-background-cover></app-background-cover> </div>'},function(e,t){e.exports='<div class="bubble tips"> <div class=bubble-header> <div class=bubble-user-avatar> <img :src=bubble.user.avatar alt=""/> </div> <div class=bubble-user-info> <div class=username> {{ bubble.user.username }} </div> </div> <div class=bubble-symbol v-on:click=toggleTips> <div class=symbol-container> ? </div> </div> </div> <div class=bubble-body> {{ bubble.content }} <br> <p> 如果你希望获得写作的帮助，请点击右边的问号 </p> </div> </div>'},function(e,t){e.exports='<div class=view> <li v-for="bubble in bubbles"> <app-bubble :bubble.once=bubble></app-bubble> </li> <app-tips-bubble :bubble.once=tipsBubble></app-tips-bubble> <app-tips-dialog v-show=tipsDialogState :dialog=dialogContent transition=fade></app-tips-dialog> <app-compose-dialog v-show=composeDialogState :content=composeContent transition=fade></app-compose-dialog> <app-compose-button side=center :buttonmsg.once=buttonMsg v-on:click=toggleCompose></app-compose-button> </div>'},function(e,t,n){var i=n(14);"string"==typeof i&&(i=[[e.id,i,""]]);n(3)(i,{});i.locals&&(e.exports=i.locals)},function(e,t,n){var i=n(15);"string"==typeof i&&(i=[[e.id,i,""]]);n(3)(i,{});i.locals&&(e.exports=i.locals)},function(e,t,n){var i=n(16);"string"==typeof i&&(i=[[e.id,i,""]]);n(3)(i,{});i.locals&&(e.exports=i.locals)},function(e,t,n){var i=n(17);"string"==typeof i&&(i=[[e.id,i,""]]);n(3)(i,{});i.locals&&(e.exports=i.locals)},function(e,t,n){var i=n(18);"string"==typeof i&&(i=[[e.id,i,""]]);n(3)(i,{});i.locals&&(e.exports=i.locals)},function(e,t,n){var i=n(19);"string"==typeof i&&(i=[[e.id,i,""]]);n(3)(i,{});i.locals&&(e.exports=i.locals)},,function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){}]);