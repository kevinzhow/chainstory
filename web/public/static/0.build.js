webpackJsonp([0],[,,,,,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(21),r=n(20),s=n(9),a=o(s),l=a["default"].DemoUser,u=a["default"].SERVER_URL,c=new i.EventEmitter;e["default"]=c;var p={};c.currentUser=function(){return new r.Promise(function(t,e){void 0==p.username?(console.log("Fetch Current User"),c.fetchUserWithWXOpenID(l.wx_openid).then(function(e){"Error"==e.status?(console.log("Prepare User Creation"),c.createUser(l.wx_openid).then(function(e){t(c.fullUser(e))})):(console.log("User Found"),t(c.fullUser(e)))})):(console.log("User Prepared"),t(p))})},c.fullUser=function(t){return p={username:t.name,avatar:t.avatar,uid:t.uid,wx_openid:t.wx_openid,wb_openid:t.wb_openid},console.log(t),p},c.createUser=function(t){return fetch(u+"/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:l.username,type:0,wx_openid:t,wb_openid:l.wb_openid,avatar:l.avatar})}).then(function(t){return console.log("User Created"),t.json()})["catch"](function(t){console.log("parsing story failed",t)})},c.fetchUserWithWXOpenID=function(t){return fetch(u+"/user/wx_openid/"+t).then(function(t){return t.json()})["catch"](function(t){console.log("parsing story failed",t)})},c.fetchStory=function(t){return fetch(u+"/story/"+t).then(function(t){return t.json()})["catch"](function(t){console.log("parsing story failed",t)})},c.composeStory=function(t,e){var n={author:{uid:p.uid},title:t.title,content:t.content,parent_id:e};return console.log(n),fetch(u+"/story",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(function(t){return t.json()})["catch"](function(t){console.log("parsing story failed",t)})}},function(t,e,n){"use strict";n(29);var o=n(1),i=o.extend({template:n(22),props:["state"]});t.exports=i},function(t,e,n){"use strict";n(31);var o=n(1),i=o.extend({template:n(24),props:["buttonmsg","side"],created:function(){},methods:{touchHandler:function(t){}}});t.exports=i},function(t,e,n){"use strict";n(34);var o=n(1),i=o.extend({template:n(27),props:["bubble"],methods:{toggleTips:function(t){this.$dispatch("toggleTips",null)}}});t.exports=i},function(t,e){"use strict";function n(){var t="https://open.weixin.qq.com/connect/qrconnect?appid="+i.APPID+"&redirect_uri="+i.REDIRECT_URL+"&response_type=code&scope="+i.SCOPE+"&state="+i.STATE+"#wechat_redirect";return encodeURI(t)}var o="http://0.0.0.0:9527/api",i={APPID:"wx65c09df2657f16f7",REDIRECT_URL:"https://zi.com/chainstory",SCOPE:"snsapi_login",STATE:"3d6be0a4035d839573b0481615e"},r={username:"周楷雯Kevin",type:0,wx_openid:"kevinzhow",wb_openid:"kevinzhow",avatar:"http://tva2.sinaimg.cn/crop.0.0.1242.1242.180/68c9c44djw8f0y66adyekj20yi0yigmt.jpg"},s={username:"左耳朵耗子",type:0,wx_openid:"zuoerduo",wb_openid:"zuoerduo",avatar:"http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"},a={WECHAT:i,WECHAT_URL:n(),DEMOUSER1:r,DEMOUSER2:s,SERVER_URL:o};t.exports=a},function(t,e,n){"use strict";n(33);var o=n(1),i=o.extend({template:n(26),props:["dialog"],methods:{toggleDialog:function(t){this.$dispatch("toggleTips",null)}},components:{"app-background-cover":n(6)}});t.exports=i},,function(t,e,n){"use strict";n(30);var o=n(1),i=o.extend({template:n(23),props:["bubble"]});t.exports=i},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var i=n(5),r=o(i);n(32);var s=n(1),a=n(11),l=new a,u=s.extend({template:n(25),props:["content","creation","sid"],methods:{toggleComposeDialog:function(t){this.story_title.length<1&&this.story_content<1&&this.$dispatch("toggleComposeDialog",null)},toggleTips:function(t){this.$dispatch("toggleTips",null)},submit:function(t){var e=this;console.log("Submit Story "+this.sid),void 0!=this.sid&&(this.story_title="Extends"),r["default"].composeStory({title:this.story_title,content:this.story_content},this.sid).then(function(t){console.log(t),"Error"==t.status||void 0==t.sid||(l.go({path:"/story/"+t.sid}),e.$dispatch("refetchData",t.sid),e.$dispatch("toggleComposeDialog",null))})}},data:function(){return{story_title:"",story_content:""}},components:{"app-background-cover":n(6),"submit-button":n(7),"app-tips-bubble":n(8)}});t.exports=u},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".mask{position:fixed;overflow:hidden;left:0;top:0;bottom:0;right:0;z-index:-1;background:transparent;display:block}.mask .mask-blur{background:hsla(0,0%,95%,.7);position:absolute;width:100%;height:100%;opacity:1;backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px)}",""])},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".bubble{background-color:#fff;border-radius:8px;box-shadow:3px 3px 7px hsla(0,0%,46%,.14);border:2px solid #fbf9f9;margin:10px 10px 20px;padding:15px;max-width:500px}.bubble .bubble-header{display:flex}.bubble .bubble-header .bubble-user-avatar{width:42px;height:42px}.bubble .bubble-header .bubble-user-avatar img{width:100%;height:100%;border-radius:42px}.bubble .bubble-header .bubble-user-info{margin-left:10px}.bubble .bubble-header .bubble-user-info .username{color:#484f57;font-size:15px;font-weight:lighter}.bubble .bubble-header .bubble-user-info .created-at{color:#828d9a;font-size:12px;margin-top:5px;font-weight:lighter}.bubble .bubble-body{color:#484f57;margin-top:10px;font-size:16px;margin-bottom:20px;font-weight:lighter;letter-spacing:0;word-wrap:break-word}.bubble .bubble-footer .bubble-footer-info{font-size:12px;color:#9caab9;font-weight:lighter}@media (min-width:500px){.bubble{margin:10px auto 20px}}",""])},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".button{transition:transform .1s ease-in-out;background-color:#3a7bf7;box-shadow:2px 2px 20px rgba(58,123,247,.56);color:#fff;padding:10px;width:110px;text-align:center;border-radius:50px;font-weight:700;position:relative}.button.center{margin-left:auto;margin-right:auto}.button:active{background-color:#3a7bf7;box-shadow:2px 2px 10px rgba(58,123,247,.56);transform:scale(.95)}.button:hover{cursor:pointer}.button.bottom{position:fixed;bottom:50px;left:0;right:0}",""])},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".compose{top:5%!important;transform:translateY(-5%)!important;min-height:200px;max-height:400px}.compose.bubble{padding:0}.compose.bubble .bubble-header{padding:12px 15px}.compose.bubble .bubble-title{flex:1;height:22px;font-weight:700;line-height:22px}.compose.bubble .bubble-body{background-color:#f6f6f6;padding:10px 15px 12px;margin:0;margin-bottom:0!important}.compose input{background:transparent;border:none;font-weight:700;font-size:16px;line-height:22px;height:22px;width:150px}.compose input:focus{outline:none}.compose textarea{width:100%;resize:none;height:132px;border:none;margin-top:0;margin-bottom:0;font-size:16px;color:#484f57;padding:0;line-height:23px;background:transparent}.compose textarea:focus{outline:none}",""])},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".dialog-container{position:fixed;z-index:2001;top:0;bottom:0;left:0;right:0}.dialog-container .dialog{position:absolute;top:40%;left:20px;right:20px;transform:translateY(-40%);z-index:2001}.dialog-container .dialog .bubble-title{font-weight:bolder;color:#484f57}.dialog-container .dialog .bubble-body{line-height:25px;font-weight:lighter;margin-bottom:10px;color:#484f57}",""])},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".bubble.tips{margin-bottom:40px}.bubble.tips .bubble-user-avatar{height:30px;width:30px;flex:none}.bubble.tips .bubble-user-info{flex:1}.bubble.tips .bubble-user-info .username{line-height:30px}.bubble.tips .bubble-body{font-size:16px;color:rgba(72,79,87,.39);letter-spacing:0;margin-top:15px;margin-bottom:10px}.bubble.tips .bubble-body p{font-size:11px;color:rgba(72,79,87,.39);letter-spacing:0;margin-top:5px;margin-bottom:0}.bubble .bubble-symbol{width:22px;height:22px;border-radius:22px;background:#f3f3f3;border:1px solid #e0e0e0;line-height:22px;flex:none;text-align:center;font-size:14px;color:#bebebe;letter-spacing:0;font-weight:lighter}.bubble .bubble-symbol:hover{cursor:pointer;background:#fbfbfb}.bubble .bubble-symbol:active{background:#e0e0e0}",""])},function(t,e,n){var o;(function(t,i,r){/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */
(function(){"use strict";function s(t){return"function"==typeof t||"object"==typeof t&&null!==t}function a(t){return"function"==typeof t}function l(t){B=t}function u(t){tt=t}function c(){return function(){t.nextTick(h)}}function p(){return function(){X(h)}}function b(){var t=0,e=new ot(h),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function d(){var t=new MessageChannel;return t.port1.onmessage=h,function(){t.port2.postMessage(0)}}function f(){return function(){setTimeout(h,1)}}function h(){for(var t=0;t<Z;t+=2){var e=st[t],n=st[t+1];e(n),st[t]=void 0,st[t+1]=void 0}Z=0}function g(){try{var t=n(37);return X=t.runOnLoop||t.runOnContext,p()}catch(e){return f()}}function v(t,e){var n=this,o=new this.constructor(x);void 0===o[ut]&&W(o);var i=n._state;if(i){var r=arguments[i-1];tt(function(){M(i,o,r,n._result)})}else D(n,o,t,e);return o}function m(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(x);return L(n,t),n}function x(){}function _(){return new TypeError("You cannot resolve a promise with itself")}function y(){return new TypeError("A promises callback cannot return that same promise.")}function w(t){try{return t.then}catch(e){return dt.error=e,dt}}function k(t,e,n,o){try{t.call(e,n,o)}catch(i){return i}}function E(t,e,n){tt(function(t){var o=!1,i=k(n,e,function(n){o||(o=!0,e!==n?L(t,n):A(t,n))},function(e){o||(o=!0,U(t,e))},"Settle: "+(t._label||" unknown promise"));!o&&i&&(o=!0,U(t,i))},t)}function S(t,e){e._state===pt?A(t,e._result):e._state===bt?U(t,e._result):D(e,void 0,function(e){L(t,e)},function(e){U(t,e)})}function T(t,e,n){e.constructor===t.constructor&&n===at&&constructor.resolve===lt?S(t,e):n===dt?U(t,dt.error):void 0===n?A(t,e):a(n)?E(t,e,n):A(t,e)}function L(t,e){t===e?U(t,_()):s(e)?T(t,e,w(e)):A(t,e)}function C(t){t._onerror&&t._onerror(t._result),j(t)}function A(t,e){t._state===ct&&(t._result=e,t._state=pt,0!==t._subscribers.length&&tt(j,t))}function U(t,e){t._state===ct&&(t._state=bt,t._result=e,tt(C,t))}function D(t,e,n,o){var i=t._subscribers,r=i.length;t._onerror=null,i[r]=e,i[r+pt]=n,i[r+bt]=o,0===r&&t._state&&tt(j,t)}function j(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var o,i,r=t._result,s=0;s<e.length;s+=3)o=e[s],i=e[s+n],o?M(n,o,i,r):i(r);t._subscribers.length=0}}function z(){this.error=null}function P(t,e){try{return t(e)}catch(n){return ft.error=n,ft}}function M(t,e,n,o){var i,r,s,l,u=a(n);if(u){if(i=P(n,o),i===ft?(l=!0,r=i.error,i=null):s=!0,e===i)return void U(e,y())}else i=o,s=!0;e._state!==ct||(u&&s?L(e,i):l?U(e,r):t===pt?A(e,i):t===bt&&U(e,i))}function O(t,e){try{e(function(e){L(t,e)},function(e){U(t,e)})}catch(n){U(t,n)}}function R(){return ht++}function W(t){t[ut]=ht++,t._state=void 0,t._result=void 0,t._subscribers=[]}function I(t){return new _t(this,t).promise}function $(t){var e=this;return new e(Q(t)?function(n,o){for(var i=t.length,r=0;r<i;r++)e.resolve(t[r]).then(n,o)}:function(t,e){e(new TypeError("You must pass an array to race."))})}function H(t){var e=this,n=new e(x);return U(n,t),n}function N(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function Y(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function F(t){this[ut]=R(),this._result=this._state=void 0,this._subscribers=[],x!==t&&("function"!=typeof t&&N(),this instanceof F?O(this,t):Y())}function q(t,e){this._instanceConstructor=t,this.promise=new t(x),this.promise[ut]||W(this.promise),Q(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&A(this.promise,this._result))):U(this.promise,J())}function J(){return new Error("Array Methods must be provided an Array")}function K(){var t;if("undefined"!=typeof i)t=i;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;n&&"[object Promise]"===Object.prototype.toString.call(n.resolve())&&!n.cast||(t.Promise=xt)}var V;V=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var X,B,G,Q=V,Z=0,tt=function(t,e){st[Z]=t,st[Z+1]=e,Z+=2,2===Z&&(B?B(h):G())},et="undefined"!=typeof window?window:void 0,nt=et||{},ot=nt.MutationObserver||nt.WebKitMutationObserver,it="undefined"==typeof self&&"undefined"!=typeof t&&"[object process]"==={}.toString.call(t),rt="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,st=new Array(1e3);G=it?c():ot?b():rt?d():void 0===et?g():f();var at=v,lt=m,ut=Math.random().toString(36).substring(16),ct=void 0,pt=1,bt=2,dt=new z,ft=new z,ht=0,gt=I,vt=$,mt=H,xt=F;F.all=gt,F.race=vt,F.resolve=lt,F.reject=mt,F._setScheduler=l,F._setAsap=u,F._asap=tt,F.prototype={constructor:F,then:at,"catch":function(t){return this.then(null,t)}};var _t=q;q.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===ct&&n<t;n++)this._eachEntry(e[n],n)},q.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,o=n.resolve;if(o===lt){var i=w(t);if(i===at&&t._state!==ct)this._settledAt(t._state,e,t._result);else if("function"!=typeof i)this._remaining--,this._result[e]=t;else if(n===xt){var r=new n(x);T(r,t,i),this._willSettleAt(r,e)}else this._willSettleAt(new n(function(e){e(t)}),e)}else this._willSettleAt(o(t),e)},q.prototype._settledAt=function(t,e,n){var o=this.promise;o._state===ct&&(this._remaining--,t===bt?U(o,n):this._result[e]=n),0===this._remaining&&A(o,this._result)},q.prototype._willSettleAt=function(t,e){var n=this;D(t,void 0,function(t){n._settledAt(pt,e,t)},function(t){n._settledAt(bt,e,t)})};var yt=K,wt={Promise:xt,polyfill:yt};n(35).amd?(o=function(){return wt}.call(e,n,e,r),!(void 0!==o&&(r.exports=o))):"undefined"!=typeof r&&r.exports?r.exports=wt:"undefined"!=typeof this&&(this.ES6Promise=wt),yt()}).call(this)}).call(e,n(28),function(){return this}(),n(36)(t))},function(t,e){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(t){return"function"==typeof t}function i(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function s(t){return void 0===t}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!i(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,n,i,a,l,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;var c=new Error('Uncaught, unspecified "error" event. ('+e+")");throw c.context=e,c}if(n=this._events[t],s(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(r(n))for(a=Array.prototype.slice.call(arguments,1),u=n.slice(),i=u.length,l=0;l<i;l++)u[l].apply(this,a);return!0},n.prototype.addListener=function(t,e){var i;if(!o(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,o(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(i=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function n(){this.removeListener(t,n),i||(i=!0,e.apply(this,arguments))}if(!o(e))throw TypeError("listener must be a function");var i=!1;return n.listener=e,this.on(t,n),this},n.prototype.removeListener=function(t,e){var n,i,s,a;if(!o(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(n=this._events[t],s=n.length,i=-1,n===e||o(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(n)){for(a=s;a-- >0;)if(n[a]===e||n[a].listener&&n[a].listener===e){i=a;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[t],o(n))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?o(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(o(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e){t.exports="<div class=mask> <div class=mask-blur></div> </div>"},function(t,e){t.exports='<div class=bubble> <div class=bubble-header> <div class=bubble-user-avatar> <img :src=bubble.author.avatar alt=""/> </div> <div class=bubble-user-info> <div class=username> {{ bubble.author.name }} </div> <div class=created-at> {{ bubble.create_at }} </div> </div> </div> <div class=bubble-body> {{ bubble.content }} </div> <div class=bubble-footer> <div class=bubble-footer-info> {{ bubble.likes }} 人喜欢 </div> <div class=bubble-footer-like> </div> </div> </div>'},function(t,e){t.exports='<div class="button {{side}}" v-touch:press=touchHandler>{{ buttonmsg }}</div>'},function(t,e){t.exports='<div class=dialog-container> <div class="bubble dialog compose"> <div class=bubble-header> <div class=bubble-title> 起头:<input type=text name=story-title v-model=story_title placeholder=故事名称 v-show=creation /> </div> <div class=bubble-symbol v-on:click=toggleTips> <div class=symbol-container> ? </div> </div> </div> <div class=bubble-body> <textarea name=story-content v-model=story_content placeholder=请尽情创作吧...></textarea> </div> </div> <submit-button side="center bottom" buttonmsg=提交 v-on:click=submit></submit-button> <app-background-cover v-on:click=toggleComposeDialog></app-background-cover> </div>'},function(t,e){t.exports='<div class=dialog-container v-on:click=toggleDialog> <div class="bubble dialog"> <div class=bubble-header> <div class=bubble-title> {{ dialog.title }} </div> </div> <div class=bubble-body> {{ dialog.content }} </div> </div> <app-background-cover></app-background-cover> </div>'},function(t,e){t.exports='<div class="bubble tips"> <div class=bubble-header> <div class=bubble-user-avatar> <img :src=bubble.user.avatar alt=""/> </div> <div class=bubble-user-info> <div class=username> {{ bubble.user.username }} </div> </div> <div class=bubble-symbol v-on:click=toggleTips> <div class=symbol-container> ? </div> </div> </div> <div class=bubble-body> {{ bubble.content }} <br> <p> 如果你希望获得写作的帮助，请点击右边的问号 </p> </div> </div>'},,function(t,e,n){var o=n(14);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){var o=n(15);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){var o=n(16);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){var o=n(17);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){var o=n(18);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)},function(t,e,n){var o=n(19);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)},function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var i=n(9),r=o(i),s=n(5),a=o(s);n(50);var l=n(1),u=n(11),c=(new u,l.extend({template:n(46),props:["dialog"],created:function(){var t=this;a["default"].currentUser().then(function(e){t.currentUser=e})},methods:{toggleCompose:function(t){console.log(r["default"].WECHAT_URL),""!=this.currentUser.username&&(console.log("Login Success "+this.currentUser.username),this.$dispatch("toggleComposeDialog",null))},toggleTips:function(t){}},data:function(){return{currentUser:{},buttonMsg:"我要起头"}},components:{button:n(7),bubble:n(12),"tips-bubble":n(8)}}));t.exports=c},,,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var i=n(5),r=(o(i),n(9)),s=(o(r),n(1)),a=s.extend({template:n(48),replace:!0,created:function(){},events:{toggleTips:function(){this.toggleTips()},toggleComposeDialog:function(){this.toggleCompose()}},methods:{toggleTips:function(t){this.tipsDialogState=!this.tipsDialogState},toggleCompose:function(t){this.composeDialogState=!this.composeDialogState}},data:function(){return{composeDialogState:!1,composeContent:"",tipsDialogState:!1,dialogContent:{title:"矛盾",content:"在这一段内容里，我们建议您创作本故事的矛盾。小说故事中的矛盾冲突是形成情节的基础，也是推动情节发展的动力，冲突双方的人物性格，则直接决定了情节进展的趋向。矛盾往往代表了阻挠主角欲望的内容。"}}},components:{creation:n(38),"app-compose-dialog":n(13),"app-dialog":n(10),"app-tips-dialog":n(10)}});t.exports=a},,function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".logo{font-size:40px;margin-top:90px;color:#333}.logo,.slogan{text-align:center}.slogan{margin-bottom:100px;margin-top:15px;font-size:15px;color:#9fa7b0}.button{margin-top:0;margin-bottom:20px}.brand{font-size:12px;text-align:center;font-weight:lighter;color:#9fa7b0;letter-spacing:0;text-shadow:1px 1px 0 hsla(0,0%,96%,.5)}",""])},,,function(t,e){t.exports='<div class="landing bubble tips"> <div class=bubble-symbol v-on:click=toggleTips> <div class=symbol-container> ? </div> </div> <div class=logo> 故事 </div> <div class=slogan> “ 互坑，是一种基友之间的传统美德 ” </div> <button side=center :buttonmsg.once=buttonMsg v-on:click=toggleCompose></button> </div> <div class=brand> 由 <b>字里行间</b> 强力驱动 </div>'},,function(t,e){t.exports="<div class=view> <app-compose-dialog v-show=composeDialogState :content=composeContent transition=fade creation=true></app-compose-dialog> <creation></creation> <app-tips-dialog v-show=tipsDialogState :dialog=dialogContent transition=fade></app-tips-dialog> </div>"},,function(t,e,n){var o=n(43);"string"==typeof o&&(o=[[t.id,o,""]]);n(3)(o,{});o.locals&&(t.exports=o.locals)}]);