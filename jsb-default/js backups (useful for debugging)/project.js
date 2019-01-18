window.__require = function t(e, o, r) {
function n(i, a) {
if (!o[i]) {
if (!e[i]) {
var l = i.split("/");
l = l[l.length - 1];
if (!e[l]) {
var c = "function" == typeof __require && __require;
if (!a && c) return c(l, !0);
if (s) return s(l, !0);
throw new Error("Cannot find module '" + i + "'");
}
}
var u = o[i] = {
exports: {}
};
e[i][0].call(u.exports, function(t) {
return n(e[i][1][t] || t);
}, u, u.exports, t, e, o, r);
}
return o[i].exports;
}
for (var s = "function" == typeof __require && __require, i = 0; i < r.length; i++) n(r[i]);
return n;
}({
AudioMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "988b5FfYkRD7qkZSiLpWhSZ", "AudioMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r, n = cc._decorator, s = n.ccclass, i = n.property;
(function(t) {
t[t.music = 0] = "music";
t[t.big_award = 1] = "big_award";
t[t.spin = 2] = "spin";
t[t.symbol1 = 3] = "symbol1";
t[t.symbol2 = 4] = "symbol2";
t[t.symbol3 = 5] = "symbol3";
t[t.success = 6] = "success";
})(r = o.AudioName || (o.AudioName = {}));
var a = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.arr_effect = [];
e._cache = [];
e._soundSwitch = !0;
e._volume = 1;
return e;
}
e.prototype.onLoad = function() {
var t = this;
cc.log(this.name + ".onLoad");
var e = Object.keys(r).filter(function(t) {
return !isNaN(Number(r[t]));
});
cc.log(this.name + ".onLoad : audio_name_strings : " + e);
for (var o in e) {
cc.log(this.name + ".onLoad : key:" + e[o]);
this.arr_effect[o].loaded || cc.loader.loadRes(this.arr_effect[o].nativeUrl, function(e, o) {
cc.log(t.name + ".onLoad : load finish (" + o + ")");
});
}
};
e.prototype.playMusic = function(t) {
cc.log(this.name + ".playMusic : soundEnum(" + r[t] + ")");
this._cache[t] = cc.audioEngine.playMusic(this.arr_effect[t], !0);
};
e.prototype.stopMusic = function() {
cc.log(this.name + ".stopSound : stopMusic()");
cc.audioEngine.stopMusic();
};
e.prototype.playEffect = function(t) {
cc.log(this.name + ".playEffect : soundEnum(" + r[t] + ")");
this._cache[t] = cc.audioEngine.playEffect(this.arr_effect[t], !1);
};
e.prototype.stopEffect = function(t) {
cc.log(this.name + ".stopEffect : soundEnum(" + r[t] + ")");
cc.audioEngine.stopEffect(this._cache[t]);
};
e.prototype.setMusicVolume = function(t) {
cc.log(this.name + ".setMusicVolume : _v(" + t + ")");
cc.audioEngine.setMusicVolume(t);
};
e.prototype.setEffectSwitch = function(t) {
cc.log(this.name + ".setEffectSwitch : _switch:" + t);
this._soundSwitch = t;
this._soundSwitch ? this._volume = 1 : this._volume = 0;
for (var e in this._cache) cc.audioEngine.setVolume(this._cache[e], this._volume);
};
__decorate([ i({
type: [ cc.AudioClip ]
}) ], e.prototype, "arr_effect", void 0);
return e = __decorate([ s ], e);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {} ],
AwardMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "9b012s+chhGPq1ql7Ug8FpS", "AwardMgr");
var r = t("./RollerActor");
cc.Class({
extends: cc.Component,
properties: {
rollerActor: r,
_symbolArr: [ cc.Node ]
},
start: function() {
this.node.position = this.rollerActor.node.position;
},
playWinAnime: function(t) {
cc.log("playWinAnime");
this.clearAllWinAnime();
for (var e in t) {
if (t[e]) {
var o = this.rollerActor._targetSymbolArr[e], r = cc.instantiate(this.rollerActor.symbolCreator.win[o]);
r.parent = this.node;
r.position = this.rollerActor.symbolRect[e].position;
this._symbolArr.push(r);
}
}
},
clearAllWinAnime: function() {
for (var t in this._symbolArr) null != this._symbolArr[t] && this._symbolArr[t].destroy();
this._symbolArr = [];
this.rollerActor.showAllSymbol();
}
});
cc._RF.pop();
}, {
"./RollerActor": "RollerActor"
} ],
BeerModel: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "e8c5a+RyNRPn5bXcSW/GlTV", "BeerModel");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./BonusInfo"), n = t("./JSUtils"), s = function() {
function t() {
this.bonus_pool = [];
this.user_cups_num = 0;
this.user_bonus_num = 0;
}
t.prototype.init_pool = function() {
this.user_cups_num = 0;
this.user_bonus_num = 0;
cc.log("BeerModel.init_pool : arr_bonus:" + r.arr_bonus);
this.bonus_pool = [];
for (var t in r.arr_bonus) for (var e = 0; e < r.arr_bonus_count[t]; e++) {
var o = r.arr_bonus[t], n = new r.BonusInfo();
n.setBonus(o);
cc.log("BeerModel.init_pool : bonus_info(" + this.bonus_pool.length + "):" + JSON.stringify(n));
this.bonus_pool.push(n);
}
this.random_pool();
};
t.prototype.random_pool = function() {
n.JSUtils.random_array(this.bonus_pool);
cc.log("BeerModel.random_pool : " + this.bonus_pool);
};
t.prototype.pull_bonus_pool = function() {
if (this.bonus_pool.length > 0) return this.bonus_pool[0];
var t = new r.BonusInfo();
t.setBonus(r.arr_bonus[0]);
cc.warn("BeerModel.pull_bonus_pool : this.bonus_pool.length <= 0 , new bonus_info:" + JSON.stringify(t));
return t;
};
t.prototype.pop_bonus_pool = function() {
this.bonus_pool.length > 0 ? this.bonus_pool.shift() : cc.warn("BeerModel.pop_bonus_pool : this.bonus_pool.length <= 0");
};
t.prototype.add_bonus_by_user = function() {
var t = this.pull_bonus_pool();
cc.log("enter_spin : bonus:" + JSON.stringify(t));
this.user_bonus_num += t.bonus;
this.user_cups_num += t.cups;
};
t.prototype.next_user = function() {
this.user_bonus_num = 0;
this.user_cups_num = 0;
};
return t;
}();
o.BeerModel = s;
cc._RF.pop();
}, {
"./BonusInfo": "BonusInfo",
"./JSUtils": "JSUtils"
} ],
BonusInfo: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "b8176PNdIlLE6rms76uUQzK", "BonusInfo");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./JSUtils");
o.arr_bonus = [ 5e3, 8e3, 1e4, 12e3, 15e3, 18e3, 2e4 ];
o.arr_bonus_count = [ 7, 5, 3, 2, 1, 1, 1 ];
o.arr_cups = [ 5, 10, 15, 20 ];
o.arr_missions = [ "深蹲喝", "棒式喝", "用吸管喝", "屁股開8喝", "用M字腿喝", "金雞獨立喝", "找主管陪喝" ];
var n = [ [ 5, 10, 15, 20 ], [ 5, 10, 15, 20 ], [ 5, 10, 15, 20 ], [ 5, 10, 15, 20 ], [ 15, 20 ], [ 15, 20 ], [ 15, 20 ] ], s = [ [ "深蹲喝", "棒式喝", "用吸管喝", "屁股開8喝", "用M字腿喝", "金雞獨立喝" ], [ "深蹲喝", "棒式喝", "用吸管喝", "屁股開8喝", "用M字腿喝", "金雞獨立喝" ], [ "深蹲喝", "棒式喝", "用吸管喝", "屁股開8喝", "用M字腿喝", "金雞獨立喝" ], [ "深蹲喝", "棒式喝", "用吸管喝", "屁股開8喝", "用M字腿喝", "金雞獨立喝" ], [ "深蹲喝", "棒式喝", "屁股開8喝", "用M字腿喝", "找主管陪喝" ], [ "深蹲喝", "棒式喝", "屁股開8喝", "用M字腿喝", "找主管陪喝" ], [ "深蹲喝", "棒式喝", "屁股開8喝", "用M字腿喝", "找主管陪喝" ] ], i = function() {
function t() {
this.bonus = 5e3;
this.cups = 5;
this.missions = "深蹲喝";
this.bonus_index = 0;
this.cups_index = 0;
this.missions_index = 0;
}
t.prototype.setBonus = function(t) {
this.bonus = t;
this.bonus_index = o.arr_bonus.indexOf(t);
var e = n[this.bonus_index], i = r.JSUtils.get_random_from_array(e);
this.setCups(i);
var a = s[this.bonus_index], l = r.JSUtils.get_random_from_array(a);
this.setMissions(l);
};
t.prototype.setCupsIndex = function(t) {
this.cups_index = t;
this.cups = o.arr_cups[t];
};
t.prototype.setMissionsIndex = function(t) {
this.missions_index = t;
this.missions = o.arr_missions[t];
};
t.prototype.setCups = function(t) {
this.cups = t;
this.cups_index = o.arr_cups.indexOf(t);
};
t.prototype.setMissions = function(t) {
this.missions = t;
this.missions_index = o.arr_missions.indexOf(t);
};
return t;
}();
o.BonusInfo = i;
cc._RF.pop();
}, {
"./JSUtils": "JSUtils"
} ],
GameFSM: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c5279X8o4JO9oYeZzkoWLte", "GameFSM");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./StateMachine"), n = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.stateName = {
GameInit: "GameInit",
GameWait: "GameWait",
Spin: "Spin",
ShowResult: "ShowResult",
Sccess: "Sccess",
Fail: "Fail",
reset: "reset"
};
e.eventName = {
game_wait: "game_wait",
spin: "spin",
show_result: "show_result",
reset: "reset",
sccess: "sccess",
fail: "fail"
};
return e;
}
e.prototype.fsmTrigger = function(t) {
for (var e, o = [], r = 1; r < arguments.length; r++) o[r - 1] = arguments[r];
(e = this.fsm)[t].apply(e, o);
};
e.prototype.fsmIs = function(t) {
return this.fsm.is(t);
};
e.prototype.fsmCan = function(t) {
return this.fsm.can(t);
};
e.prototype.fsmCannot = function(t) {
return this.fsm.cannot(t);
};
e.prototype.fsmCurrent = function() {
return this.fsm.current;
};
e.prototype.fsmStartUp = function() {
this.fsm = r.default.create({
initial: "GameInit",
events: [ {
name: "game_wait",
from: "GameInit",
to: "GameWait"
}, {
name: "spin",
from: "GameWait",
to: "Spin"
}, {
name: "show_result",
from: "Spin",
to: "ShowResult"
}, {
name: "reset",
from: "GameWait",
to: "reset"
}, {
name: "sccess",
from: "ShowResult",
to: "Sccess"
}, {
name: "fail",
from: "ShowResult",
to: "Fail"
}, {
name: "game_wait",
from: "Fail",
to: "GameWait"
}, {
name: "game_wait",
from: "Sccess",
to: "GameWait"
}, {
name: "game_wait",
from: "reset",
to: "GameWait"
} ],
callbacks: {
onenterGameInit: [ this.enter_game_init ],
onleaveGameInit: [ this.leave_game_init ],
onenterGameWait: [ this.enter_game_wait ],
onleaveGameWait: [ this.leave_game_wait ],
onenterSpin: [ this.enter_spin ],
onleaveSpin: [ this.leave_spin ],
onenterShowResult: [ this.enter_show_result ],
onleaveShowResult: [ this.leave_show_result ],
onenterSccess: [ this.enter_sccess ],
onleaveSccess: [ this.leave_sccess ],
onenterFail: [ this.enter_fail ],
onleaveFail: [ this.leave_fail ],
onenterreset: [ this.enter_reset ],
onleavereset: [ this.leave_reset ],
onbeforeevent: [ this.global_before ],
onafterevent: [ this.global_after ]
}
}, this);
};
e.prototype.game_wait = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
(t = this.fsm).game_wait.apply(t, e);
};
e.prototype.spin = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
(t = this.fsm).spin.apply(t, e);
};
e.prototype.show_result = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
(t = this.fsm).show_result.apply(t, e);
};
e.prototype.reset = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
(t = this.fsm).reset.apply(t, e);
};
e.prototype.sccess = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
(t = this.fsm).sccess.apply(t, e);
};
e.prototype.fail = function() {
for (var t, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
(t = this.fsm).fail.apply(t, e);
};
return e;
}(cc.Component);
o.default = n;
cc._RF.pop();
}, {
"./StateMachine": "StateMachine"
} ],
GameMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "2e93eEHQbtALLw8YrV4yHAf", "GameMgr");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = cc._decorator, n = r.ccclass, s = r.property, i = r.help, a = t("./GameFSM"), l = t("./AudioMgr"), c = t("./RollerMgrState_"), u = t("./JSUtils"), _ = t("./BonusInfo"), h = t("./BeerModel"), p = function(t) {
__extends(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.btn_spin = null;
e.btn_fail = null;
e.btn_success = null;
e.btn_reset = null;
e.label_beer_cups = null;
e.label_bonus = null;
e.audio_mgr = null;
e.roller_mgr_node = null;
e.roller_mgr = null;
e._model = null;
return e;
}
e.prototype.start = function() {
try {
this.fsmStartUp();
} catch (t) {
cc.error(t);
}
};
e.prototype.god = function(t, e) {
var o = this;
this._model.bonus_pool.sort(function(t, e) {
return t.bonus > e.bonus ? -1 : 1;
});
cc.log(this._model.bonus_pool);
o.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
if (o.btn_spin.node.active && o.btn_spin.interactable) {
cc.log("btn_spin click");
o.btn_spin.node.emit("click");
}
if (o.btn_success.node.active && o.btn_success.interactable) {
cc.log("btn_success click");
o.btn_success.node.emit("click");
}
})).repeatForever());
};
e.prototype.fireEvent = function(t) {
for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
cc.log(this.name + ".fireEvent : event:" + t + ", data:" + e);
try {
this.fsmTrigger(t, e);
} catch (t) {
cc.error(t);
}
};
e.prototype.fireEventOnAction = function(t) {
for (var e = this, o = [], r = 1; r < arguments.length; r++) o[r - 1] = arguments[r];
this.node.runAction(cc.callFunc(function() {
e.fireEvent(t, o);
}));
};
e.prototype.updateLabel_CupsAndBonus = function() {
this.label_bonus.string = u.JSUtils.toCurrency(this._model.user_bonus_num).toString();
this.label_beer_cups.string = u.JSUtils.toCurrency(this._model.user_cups_num).toString();
};
e.prototype.enter_game_init = function(t, e, o) {
for (var r = this, n = [], s = 3; s < arguments.length; s++) n[s - 3] = arguments[s];
cc.log("enter_game_init : is Release");
this.getComponent(cc.Label).enabled = !1;
this.getComponent(cc.Button).enabled = !1;
cc.debug.setDisplayStats(!1);
this._model = new h.BeerModel();
this._model.init_pool();
this.updateLabel_CupsAndBonus();
this.roller_mgr = this.roller_mgr_node.getComponent("RollerMgr");
var i = u.JSUtils.get_random_array(0, _.arr_bonus.length - 1, 5), a = u.JSUtils.get_random_array(0, _.arr_cups.length - 1, 5), p = u.JSUtils.get_random_array(0, _.arr_missions.length - 1, 5);
this.roller_mgr.rollerActor[0].gotoTargetSymbolByArray(i);
this.roller_mgr.rollerActor[1].gotoTargetSymbolByArray(a);
this.roller_mgr.rollerActor[2].gotoTargetSymbolByArray(p);
this.roller_mgr.node.on("RollerMgrState.STOP", function(t) {
cc.log("RollerMgrState.STOP(" + t + ")");
switch (t) {
case c.default.STOP:
r.fireEventOnAction(r.eventName.show_result);
break;

default:
cc.error("state: " + t + " not find");
return "";
}
});
this.roller_mgr.node.on("ROLLER_ACTOR_STATE.BOUNDS", function(t, e) {
cc.log("ROLLER_ACTOR_STATE:BOUNDS(" + t + "," + e + ")");
switch (e) {
case 0:
if (r._model.pull_bonus_pool().bonus_index >= 4) {
r.roller_mgr.awardMgr[e].playWinAnime([ 0, 0, 1, 0, 0 ]);
r.audio_mgr.playEffect(l.AudioName.big_award);
} else r.audio_mgr.playEffect(l.AudioName.symbol1);
break;

case 1:
r.audio_mgr.playEffect(l.AudioName.symbol2);
break;

case 2:
r.audio_mgr.playEffect(l.AudioName.symbol3);
break;

default:
cc.error("state: " + t + " not find");
return "";
}
});
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function() {
r.fireEvent(r.eventName.spin);
}, this);
this.btn_spin.interactable = !1;
this.btn_success.interactable = !1;
this.btn_fail.interactable = !1;
this.btn_reset.interactable = !1;
this.btn_spin.node.on("click", function(t) {
r.fireEvent(r.eventName.spin);
}, this);
this.btn_fail.node.on("click", function(t) {
r.fireEvent(r.eventName.fail);
}, this);
this.btn_success.node.on("click", function(t) {
r.fireEvent(r.eventName.sccess);
}, this);
this.btn_reset.node.on("click", function(t) {
r.fireEvent(r.eventName.reset);
}, this);
this.audio_mgr.playMusic(l.AudioName.music);
this.audio_mgr.setMusicVolume(.5);
this.fireEventOnAction(this.eventName.game_wait);
};
e.prototype.leave_game_init = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.enter_game_wait = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this.roller_mgr.clearAllWinAnime();
this.btn_fail.node.active = !1;
this.btn_success.node.active = !1;
this.btn_spin.node.active = !0;
this.btn_spin.interactable = !0;
this.btn_reset.interactable = !0;
};
e.prototype.leave_game_wait = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this.btn_reset.interactable = !1;
};
e.prototype.enter_spin = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this.btn_spin.interactable = !1;
var s = this._model.pull_bonus_pool();
cc.log("enter_spin : bonus:" + JSON.stringify(s));
var i = u.JSUtils.get_random_array(0, _.arr_bonus.length - 1, 5), a = u.JSUtils.get_random_array(0, _.arr_cups.length - 1, 5), l = u.JSUtils.get_random_array(0, _.arr_missions.length - 1, 5);
i[2] = s.bonus_index;
a[2] = s.cups_index;
l[2] = s.missions_index;
cc.log("enter_spin : arr_display_bonus:" + i);
cc.log("enter_spin : arr_display_cups:" + a);
cc.log("enter_spin : arr_display_missions:" + l);
this.roller_mgr.playRolling([ 60, 60, 60 ], [ i, a, l ]);
};
e.prototype.leave_spin = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.enter_show_result = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this.btn_spin.node.active = !1;
this.btn_fail.node.active = !0;
this.btn_fail.interactable = !0;
this.btn_success.node.active = !0;
this.btn_success.interactable = !0;
};
e.prototype.leave_show_result = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.enter_sccess = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this.audio_mgr.playEffect(l.AudioName.success);
this._model.add_bonus_by_user();
this.updateLabel_CupsAndBonus();
this._model.pop_bonus_pool();
this.fireEventOnAction(this.eventName.game_wait);
};
e.prototype.leave_sccess = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.enter_fail = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this._model.random_pool();
this.fireEventOnAction(this.eventName.game_wait);
};
e.prototype.leave_fail = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.enter_reset = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
this._model.next_user();
this.updateLabel_CupsAndBonus();
this.fireEventOnAction(this.eventName.game_wait);
};
e.prototype.leave_reset = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.global_before = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
};
e.prototype.global_after = function(t, e, o) {
for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
cc.log("global_after(" + t + "," + e + "," + o + "," + r + ")");
this.getComponent(cc.Label).string = "State: " + o;
};
__decorate([ s(cc.Button) ], e.prototype, "btn_spin", void 0);
__decorate([ s(cc.Button) ], e.prototype, "btn_fail", void 0);
__decorate([ s(cc.Button) ], e.prototype, "btn_success", void 0);
__decorate([ s(cc.Button) ], e.prototype, "btn_reset", void 0);
__decorate([ s(cc.Label) ], e.prototype, "label_beer_cups", void 0);
__decorate([ s(cc.Label) ], e.prototype, "label_bonus", void 0);
__decorate([ s(l.default) ], e.prototype, "audio_mgr", void 0);
__decorate([ s(cc.Node) ], e.prototype, "roller_mgr_node", void 0);
return e = __decorate([ n, i("https://forum.cocos.com/t/cocos-creator-typescript/46515") ], e);
}(a.default);
o.default = p;
cc._RF.pop();
}, {
"./AudioMgr": "AudioMgr",
"./BeerModel": "BeerModel",
"./BonusInfo": "BonusInfo",
"./GameFSM": "GameFSM",
"./JSUtils": "JSUtils",
"./RollerMgrState_": "RollerMgrState_"
} ],
JSUtils: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "4fb798XSJlGGp5/haqYIJ/h", "JSUtils");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.generateRandomArray = function(t, e, o) {
if (e > o) throw new Error("rangeL应该大于rangR");
for (var r = new Array(t), n = 0; n < t; n++) r[n] = Math.floor(Math.random() * (o - e + 1)) + e;
return r;
};
t.random = function(t, e) {
return Math.floor(Math.random() * (e - t + 1) + t);
};
t.get_random_array = function(t, e, o) {
for (var r = new Array(o), n = 0; n < r.length; n++) r[n] = this.random(t, e);
return r;
};
t.get_random_from_array = function(t) {
if (t.length > 0) {
var e = t.length - 1;
return t[this.random(0, e)];
}
cc.error("JSUtils.random_from_array : array size is zero.");
return null;
};
t.random_array = function(t) {
if (!(t.length > 0)) {
cc.error("JSUtils.random_array : array size is zero.");
return null;
}
t.sort(function() {
return Math.random() > .5 ? -1 : 1;
});
};
t.toCurrency = function(t) {
var e = t.toString().split(".");
e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return e.join(".");
};
t.copyFields = function(t, e) {
for (var o in e) t[o] = e[o];
return t;
};
t.swap = function(t) {
return [ t[1], t[0] ];
};
t.createArray = function(t, e) {
for (var o = [], r = 0; r < t; r++) o[r] = e;
return o;
};
t.getLength = function(t) {
return t.length ? t.length : t.toString().length;
};
t.push = function(t) {
for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
e.forEach(function(e) {
t.push(e);
});
};
t.reverse = function(t) {
return "number" == typeof t ? Number(t.toString().split("").reverse().join("")) : "string" == typeof t ? t.split("").reverse().join("") : void 0;
};
return t;
}();
o.JSUtils = r;
cc._RF.pop();
}, {} ],
RollerActorState: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "61d67ae9jlOQKhyOEvhejbI", "RollerActorState");
var r = cc.Enum({
STOP: -1,
SPEED_UP: -1,
MAX_SPEED: -1,
BUFFER: -1,
REPLACE_TO_TARGET: -1,
SLOW_DOWN: -1,
BOUNDS: -1
});
e.exports = r;
cc._RF.pop();
}, {} ],
RollerActor: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "879f08u5IRNz4M+91sr5HHL", "RollerActor");
var r = t("./RollerActorState"), n = t("./SymbolCreator"), s = cc.Class({
extends: cc.Component,
ctor: function() {
cc.log("RollerActor constrctor");
},
properties: function() {
return {
symbolCreator: n,
symbolRect: [ cc.Node ],
maxSpeed: 1,
speedUpAcceleration: 1,
speedDownAcceleration: 1,
boundsTweenLeft: {
default: 1,
max: 1,
min: 0
},
boundsTweenRight: {
default: -1,
max: 0,
min: -1
},
callBack: cc.Component.EventHandler,
rollerState: r.STOP,
_symbolArr: [ cc.Node ],
_currentSpeed: 0,
_symbolInitData: null,
_startPos: cc.Vec2,
_endPos: cc.Vec2,
_targetSymbolArr: null,
_targetSymbolCount: 0,
_boundsTween: 0,
_gotoStop: !1
};
},
onLoad: function() {
this._currentSpeed = 0;
this._targetSymbolCount = 0;
this._boundsTween = 1;
this.rollerState = r.STOP;
this._symbolInitData = [];
this._gotoStop = !1;
for (var t = 0; t < this.symbolRect.length; t++) {
this._symbolInitData[t] = {};
this._symbolInitData[t].initPos = this.symbolRect[t].position;
this._symbolInitData[t].width = this.symbolRect[t].width;
this._symbolInitData[t].height = this.symbolRect[t].height;
}
this._startPos = this._symbolInitData[0].initPos;
this._endPos = this._symbolInitData[this.symbolRect.length - 1].initPos;
cc.log("this._symbolInitData:size=", this._symbolInitData.length);
cc.log("this.symbolRect:size=", this.symbolRect.length);
},
start: function() {},
update: function(t) {
switch (this.rollerState) {
case r.SPEED_UP:
this._currentSpeed += this.maxSpeed * (t / this.speedUpAcceleration);
if (this._currentSpeed < this.maxSpeed) this._moveSymbolPosition(this._currentSpeed * t); else {
this._currentSpeed = this.maxSpeed;
this.setState(r.MAX_SPEED);
this._dispathEvent(r.MAX_SPEED);
}
break;

case r.MAX_SPEED:
this._moveSymbolPosition(this.maxSpeed * t);
this._gotoStop && this.setState(r.SLOW_DOWN);
break;

case r.REPLACE_TO_TARGET:
this._moveSymbolPosition(this.maxSpeed * t);
break;

case r.SLOW_DOWN:
if (this._currentSpeed > this.maxSpeed / 10) {
this._currentSpeed -= this.maxSpeed * (t / this.speedDownAcceleration);
this._moveSymbolPosition(this._currentSpeed * t);
if (this._targetSymbolCount >= this._targetSymbolArr.length) {
this._boundsTween = this.boundsTweenLeft;
this.setState(r.BOUNDS);
this._dispathEvent(r.BOUNDS);
}
} else {
cc.warn("Roller too fast");
this._currentSpeed = 0;
this.gotoTargetSymbol();
this.setState(r.STOP);
this._dispathEvent(r.STOP);
}
break;

case r.BOUNDS:
this._boundsTween > this.boundsTweenRight && (this._boundsTween -= 8 * t);
this._boundsTween < this.boundsTweenRight && (this._boundsTween = this.boundsTweenRight);
if (this._boundsTween <= 0 && (Math.abs(this._symbolArr[0].y - this._symbolInitData[0].initPos.y) < 1 || this._symbolArr[0].y - this._symbolInitData[0].initPos.y > -1)) {
this._currentSpeed = 0;
this.gotoTargetSymbol();
this.setState(r.STOP);
this._dispathEvent(r.STOP);
} else {
var e = this._currentSpeed * this._boundsTween - t;
this._moveSymbolPosition_bounds(e * t);
}
break;

case r.STOP:
}
},
getState: function() {
return this.rollerState;
},
setState: function(t) {
this.rollerState = t;
cc.log("this.rollerState:" + function(t) {
switch (t) {
case r.STOP:
return "STOP";

case r.SPEED_UP:
return "SPEED_UP";

case r.MAX_SPEED:
return "MAX_SPEED";

case r.BUFFER:
return "BUFFER";

case r.REPLACE_TO_TARGET:
return "REPLACE_TO_TARGET";

case r.SLOW_DOWN:
return "SLOW_DOWN";

case r.BOUNDS:
return "BOUNDS";

default:
cc.log("state: " + t + " not find");
return "";
}
}(t));
},
_moveSymbolPosition: function(t) {
for (var e = 0; e < this._symbolArr.length; ++e) {
this._symbolArr[e].y -= t;
if (this._symbolArr[e].y < this._endPos.y) {
this._symbolArr[e].destroy();
this._symbolArr.splice(e--, 1);
}
}
for (;;) {
var o = null;
if (this._symbolArr.length > 0) o = this._symbolArr[0]; else {
cc.warn("this._symbolArr.length = 0 , FPS too slow");
o = this.symbolRect[0];
}
if (this._startPos.y - o.y < this._symbolInitData[0].height) break;
var n = null;
if (this.rollerState === r.SLOW_DOWN) if (this._targetSymbolCount < this._targetSymbolArr.length) {
var s = this._targetSymbolArr.length - this._targetSymbolCount - 1, i = this._targetSymbolArr[s];
null === (n = cc.instantiate(this.symbolCreator.first[i])) && cc.error("newSymbol is null .. symbolIndex(" + i + ")");
this._targetSymbolCount++;
} else cc.warn("symbol too much .. this._targetSymbolCount(" + this._targetSymbolCount + ")"); else {
if (this.rollerState === r.SPEED_UP) {
var a = Math.floor(Math.random() * this.symbolCreator.first.length);
n = cc.instantiate(this.symbolCreator.first[a]);
}
if (this.rollerState === r.MAX_SPEED) {
a = Math.floor(Math.random() * this.symbolCreator.blur.length);
n = cc.instantiate(this.symbolCreator.blur[a]);
}
}
if (null == n) break;
n.parent = o.parent;
n.setPosition(o.getPosition());
n.y += this._symbolInitData[0].height;
this._symbolArr.unshift(n);
}
},
_moveSymbolPosition_bounds: function(t) {
for (var e in this._symbolArr) this._symbolArr[e].y -= t;
},
gotoTargetSymbolByArray: function(t) {
cc.log("targetSymbolArr:" + t);
for (var e = 0; e < this._symbolArr.length; ++e) this._symbolArr[e].destroy();
this._symbolArr = [];
for (var o = 0; o < t.length; ++o) if (o < this.symbolRect.length) {
var r = t[o], n = cc.instantiate(this.symbolCreator.first[r]);
if (n) {
n.parent = this.symbolRect[o].parent;
n.setPosition(this.symbolRect[o].getPosition());
this._symbolArr.push(n);
} else cc.error("gotoTargetSymbolByArray : newTargetSymbol is null .. symbolIndex(" + r + ")");
} else cc.warn("gotoTargetSymbolByArray : targetSymbolArr.length too long");
},
gotoTargetSymbol: function() {
this.gotoTargetSymbolByArray(this._targetSymbolArr);
},
playRolling: function(t) {
cc.log("playRolling");
this.showAllSymbol();
this._targetSymbolArr = t;
this._targetSymbolCount = 0;
this._gotoStop = !1;
this.rollerState === r.STOP && this.setState(r.SPEED_UP);
},
stopRolling: function() {
cc.log("stopRolling");
this._gotoStop = !0;
},
_dispathEvent: function(t) {
this.callBack && this.callBack.emit([ t ]);
},
hideSymbol: function(t) {
cc.log("hideSymbol(" + t + ")");
this._symbolArr[t].opacity = 0;
},
showAllSymbol: function() {
cc.log("showAllSymbol");
for (var t in this._symbolArr) this._symbolArr[t].opacity = 255;
}
});
e.exports = s;
cc._RF.pop();
}, {
"./RollerActorState": "RollerActorState",
"./SymbolCreator": "SymbolCreator"
} ],
RollerMgrState_: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "08a9aOLAVZESo4lYE1dNw50", "RollerMgrState_");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r;
(function(t) {
t[t.ROLLING = 0] = "ROLLING";
t[t.STOP = 1] = "STOP";
})(r || (r = {}));
o.default = r;
cc._RF.pop();
}, {} ],
RollerMgrState: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "1b675v6WWBG07zytzVFBqog", "RollerMgrState");
var r = cc.Enum({
ROLLING: -1,
STOP: -1
});
e.exports = r;
cc._RF.pop();
}, {} ],
RollerMgr: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "82665NIB71KNpx/HhBU1jiF", "RollerMgr");
var r = t("./RollerActorState"), n = t("./RollerMgrState"), s = t("./RollerActor"), i = t("./AwardMgr"), a = cc.Class({
extends: cc.Component,
ctor: function() {
cc.log("RollerMgr constrctor");
},
properties: function() {
return {
rollerActor: [ s ],
awardMgr: [ i ],
_rollerStopTimer: [ cc.Integer ],
_currentStopRollerActor: 0,
_stopRollerActorCount: 0,
_state: n.STOP
};
},
start: function() {},
update: function(t) {
if (this._rollerStopTimer.length > 0) {
this._rollerStopTimer[this._currentStopRollerActor]--;
if (this._rollerStopTimer[this._currentStopRollerActor] <= 0) {
this.rollerActor[this._currentStopRollerActor].stopRolling();
this._currentStopRollerActor++;
if (this._currentStopRollerActor >= this.rollerActor.length) {
this._state = n.STOP;
this._currentStopRollerActor = 0;
this._rollerStopTimer = [];
}
}
}
},
playRolling: function(t, e) {
if (this._state === n.STOP) {
this._state = n.ROLLING;
this._rollerStopTimer = t;
this._stopRollerActorCount = 0;
for (var o in this.rollerActor) {
var r = new cc.Component.EventHandler();
r.target = this.node;
r.component = "RollerMgr";
r.handler = "_onRollerActorEvent";
this.rollerActor[o].callBack = r;
this.rollerActor[o].playRolling(e[o]);
}
}
},
stopRolling: function() {
if (this._state === n.ROLLING) {
this._state = n.STOP;
this._currentStopRollerActor = 0;
this._rollerStopTimer = [];
for (var t in this.rollerActor) this.rollerActor[t].stopRolling();
}
},
_onRollerActorEvent: function(t) {
cc.log("_onRollerActorEvent:event(" + t + ")");
switch (t) {
case r.STOP:
this._stopRollerActorCount++;
if (this._stopRollerActorCount >= this.rollerActor.length) {
cc.log("_onRollerActorEvent:RollerMgrState.STOP");
this._stopRollerActorCount = 0;
this._dispathEvent(n.STOP);
}
break;

case r.SPEED_UP:
case r.MAX_SPEED:
case r.BUFFER:
case r.REPLACE_TO_TARGET:
case r.SLOW_DOWN:
break;

case r.BOUNDS:
this.node.emit("ROLLER_ACTOR_STATE.BOUNDS", t, this._stopRollerActorCount);
break;

default:
cc.log("state: " + t + " not find");
return "";
}
},
_dispathEvent: function(t) {
this.node.emit("RollerMgrState.STOP", t);
},
playWinAnime: function(t) {
for (var e in this.awardMgr) this.awardMgr[e].playWinAnime(t[e]);
},
clearAllWinAnime: function() {
for (var t in this.awardMgr) this.awardMgr[t].clearAllWinAnime();
}
});
e.exports = a;
cc._RF.pop();
}, {
"./AwardMgr": "AwardMgr",
"./RollerActor": "RollerActor",
"./RollerActorState": "RollerActorState",
"./RollerMgrState": "RollerMgrState"
} ],
StateMachine: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "c1f69P1fnpKmYUqnGuXkGM8", "StateMachine");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.create = function(e, o) {
var r = "string" == typeof e.initial ? {
state: e.initial
} : e.initial, n = e.terminal || e.final, s = o, i = e.events || [], a = e.callbacks || {}, l = {}, c = {}, u = function(e) {
var o = Array.isArray(e.from) ? e.from : e.from ? [ e.from ] : [ t.WILDCARD ];
l[e.name] = l[e.name] || {};
for (var r = 0; r < o.length; r++) {
c[o[r]] = c[o[r]] || [];
c[o[r]].push(e.name);
l[e.name][o[r]] = e.to || o[r];
}
e.to && (c[e.to] = c[e.to] || []);
};
if (r) {
r.event = r.event || "startup";
u({
name: r.event,
from: "none",
to: r.state
});
}
for (var _ = 0; _ < i.length; _++) u(i[_]);
for (var h in l) l.hasOwnProperty(h) && (s[h] = t.buildEvent(h, l[h]));
for (var h in a) a.hasOwnProperty(h) && (s[h] = a[h]);
s.current = "none";
s.is = function(t) {
return Array.isArray(t) ? t.indexOf(this.current) >= 0 : this.current === t;
};
s.can = function(e) {
return !this.transition && void 0 !== l[e] && (l[e].hasOwnProperty(this.current) || l[e].hasOwnProperty(t.WILDCARD));
};
s.cannot = function(t) {
return !this.can(t);
};
s.transitions = function() {
return (c[this.current] || []).concat(c[t.WILDCARD] || []);
};
s.isFinished = function() {
return this.is(n);
};
s.error = e.error || function(t, e, o, r, n, s, i) {
throw i || s;
};
s.states = function() {
return Object.keys(c).sort();
};
r && !r.defer && s[r.event]();
return s;
};
t.doCallback = function(e, o, r, n, s, i) {
if (o) try {
if (Array.isArray(o)) {
for (var a = 0, l = o.length; a < l; a++) o[a].apply(e, [ r, n, s ].concat(i));
return !0;
}
for (a = 0, l = o[n].length; a < l; a++) o[n][a].apply(e, [ r, n, s ].concat(i));
return !0;
} catch (o) {
e.error(r, n, s, i, t.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", o);
return !0;
}
return !0;
};
t.beforeAnyEvent = function(e, o, r, n, s) {
return t.doCallback(e, e.onbeforeevent, o, r, n, s);
};
t.afterAnyEvent = function(e, o, r, n, s) {
return t.doCallback(e, e.onafterevent || e.onevent, o, r, n, s);
};
t.leaveAnyState = function(e, o, r, n, s) {
return t.doCallback(e, e.onleavestate, o, r, n, s);
};
t.enterAnyState = function(e, o, r, n, s) {
return t.doCallback(e, e.onenterstate || e.onstate, o, r, n, s);
};
t.changeState = function(e, o, r, n, s) {
return t.doCallback(e, e.onchangestate, o, r, n, s);
};
t.beforeThisEvent = function(e, o, r, n, s) {
return t.doCallback(e, e["onbefore" + o], o, r, n, s);
};
t.afterThisEvent = function(e, o, r, n, s) {
return t.doCallback(e, e["onafter" + o] || e["on" + o], o, r, n, s);
};
t.leaveThisState = function(e, o, r, n, s) {
return t.doCallback(e, e["onleave" + r], o, r, n, s);
};
t.enterThisState = function(e, o, r, n, s) {
return t.doCallback(e, e["onenter" + n] || e["on" + n], o, r, n, s);
};
t.beforeEvent = function(e, o, r, n, s) {
return !1 !== t.beforeThisEvent(e, o, r, n, s) && !1 !== t.beforeAnyEvent(e, o, r, n, s);
};
t.afterEvent = function(e, o, r, n, s) {
t.afterThisEvent(e, o, r, n, s);
t.afterAnyEvent(e, o, r, n, s);
};
t.leaveState = function(e, o, r, n, s) {
var i = t.leaveThisState(e, o, r, n, s), a = t.leaveAnyState(e, o, r, n, s);
return !1 !== i && !1 !== a && (typeof t.ASYNC != typeof i && typeof t.ASYNC != typeof a || t.ASYNC);
};
t.enterState = function(e, o, r, n, s) {
t.enterThisState(e, o, r, n, s);
t.enterAnyState(e, o, r, n, s);
};
t.buildEvent = function(e, o) {
return function() {
var r = this.current, n = o[r] || (o[t.WILDCARD] != t.WILDCARD ? o[t.WILDCARD] : r) || r, s = Array.prototype.slice.call(arguments);
if (this.transition) return this.error(e, r, n, s, t.Error.PENDING_TRANSITION, "event " + e + " inappropriate because previous transition did not complete");
if (this.cannot(e)) return this.error(e, r, n, s, t.Error.INVALID_TRANSITION, "event " + e + " inappropriate in current state " + this.current);
if (!1 === t.beforeEvent(this, e, r, n, s)) return t.Result.CANCELLED;
if (r === n) {
t.afterEvent(this, e, r, n, s);
return t.Result.NOTRANSITION;
}
var i = this;
this.transition = function() {
i.transition = null;
i.current = n;
t.enterState(i, e, r, n, s);
t.changeState(i, e, r, n, s);
t.afterEvent(i, e, r, n, s);
return t.Result.SUCCEEDED;
};
this.transition.cancel = function() {
i.transition = null;
t.afterEvent(i, e, r, n, s);
};
var a = t.leaveState(this, e, r, n, s);
if (!1 === a) {
this.transition = null;
return t.Result.CANCELLED;
}
return t.ASYNC === a ? t.Result.PENDING : this.transition ? this.transition() : void 0;
};
};
t.VERSION = "2.4.0";
t.Result = {
SUCCEEDED: 1,
NOTRANSITION: 2,
CANCELLED: 3,
PENDING: 4
};
t.Error = {
INVALID_TRANSITION: 100,
PENDING_TRANSITION: 200,
INVALID_CALLBACK: 300
};
t.WILDCARD = "*";
t.ASYNC = "async";
return t;
}();
o.default = r;
cc._RF.pop();
}, {} ],
SymbolCreator: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "9a631tmDTtMX65z5P/oa6xZ", "SymbolCreator");
var r = cc.Class({
extends: cc.Component,
ctor: function() {
cc.log("SymbolCreator constrctor");
},
properties: function() {
return {
blur: {
default: [],
type: cc.Prefab
},
first: {
default: [],
type: cc.Prefab
},
win: {
default: [],
type: cc.Prefab
}
};
}
});
e.exports = r;
cc._RF.pop();
}, {} ],
test_run: [ function(t, e, o) {
"use strict";
cc._RF.push(e, "506daA52qVIL4lrSicCzMOo", "test_run");
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = t("./JSUtils"), n = t("./BeerModel");
o.test_run = function() {
(function() {
for (var t = [], e = r.JSUtils.createArray(25, 0), o = 0; o <= 1e3; o++) {
var n = r.JSUtils.random(0, 19);
t.push(n);
e[n]++;
}
cc.log("arr_test:" + t);
cc.log("arr_count:" + e);
})();
(function() {
for (var t = new n.BeerModel(), e = 0; e <= 1e3; e++) t.init_pool();
cc.log((t.bonus_pool.length, new n.BeerModel().bonus_pool.length, "pass"));
})();
(function() {
var t = new n.BeerModel(), e = t.pull_bonus_pool(), o = t.pull_bonus_pool();
cc.log("test_bonus_same : " + (e === o ? "pass" : "fail"));
})();
(function() {
for (var t = new n.BeerModel(), e = 0; e <= 1e3; e++) {
var o = t.pull_bonus_pool();
cc.log("test_bonus_same2 : bonus:" + JSON.stringify(o));
}
})();
(function() {
for (var t = new n.BeerModel(), e = 0; e <= 19; e++) {
var o = t.pull_bonus_pool();
cc.log("test_get_bonus_1000 : bonus:" + JSON.stringify(o));
t.pop_bonus_pool();
}
})();
};
cc._RF.pop();
}, {
"./BeerModel": "BeerModel",
"./JSUtils": "JSUtils"
} ]
}, {}, [ "AudioMgr", "BeerModel", "BonusInfo", "GameFSM", "GameMgr", "JSUtils", "RollerMgrState_", "StateMachine", "AwardMgr", "RollerActor", "RollerActorState", "RollerMgr", "RollerMgrState", "SymbolCreator", "test_run" ]);