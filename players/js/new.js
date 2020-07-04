var t = function (t) {
        return function (e) {
            return Math.pow(e, t);
        };
    },
    e = function (t) {
        return function (e) {
            return 1 - Math.abs(Math.pow(e - 1, t));
        };
    },
    i = function (i) {
        return function (n) {
            return n < 0.5 ? t(i)(2 * n) / 2 : e(i)(2 * n - 1) / 2 + 0.5;
        };
    },
    n = {
        linear: function (t) {
            return t;
        },
        quadIn: t(2),
        quadOut: e(2),
        quadInOut: i(2),
        cubicIn: t(3),
        cubicOut: e(3),
        cubicInOut: i(3),
        quartIn: t(4),
        quartOut: e(4),
        quartInOut: i(4),
        quintIn: t(5),
        quintOut: e(5),
        quintInOut: i(5),
        sineIn: function (t) {
            return 1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
        },
        sineOut: function (t) {
            return Math.sin((Math.PI / 2) * t);
        },
        sineInOut: function (t) {
            return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
        },
        bounce: function (t) {
            var e = 7.5625,
                i = 2.75;
            return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + 0.75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + 0.9375 : e * (t -= 2.625 / i) * t + 0.984375;
        },
    },
    r = [];
function o(t, e, i, o, s) {
    var a = this;
    void 0 === o && (o = 0);
    var h = Date.now(),
        u = {},
        c = {};
    for (var d in i) (u[d] = t[d]), (c[d] = i[d]), (t[d] = i[d]);
    var l = o + h,
        p = {
            start: l,
            end: l + e,
            easing: n[s],
            target: t,
            properties: i,
            duration: e,
            delay: o,
            from: u,
            to: c,
            destroy: function () {
                var t = a.animations.indexOf(p);
                ~t && a.animations.splice(t, 1);
            },
        };
    return (
        r.push(p),
        function (t) {
            p.cb = t;
        }
    );
}
function s(t, e) {
    var i = t.length;
    t.forEach(function (t) {
        t(function (t) {
            0 === --i && e();
        });
    });
}
function a(t, e) {
    if (t === e) return !1;
    var i = (t.absolutePosition || t).x,
        n = (t.absolutePosition || t).y,
        r = t.width,
        o = t.height,
        s = (e.absolutePosition || e).x,
        a = (e.absolutePosition || e).y,
        h = e.width,
        u = e.height;
    return i + r >= s && i <= s + h && n + o >= a && n <= a + u;
}
var h = function (t) {
        void 0 === t && (t = {});
        var e = t.game,
            i = t.group,
            n = t.type,
            r = t.style,
            o = t.x;
        void 0 === o && (o = 0);
        var s = t.y;
        void 0 === s && (s = 0);
        var a = t.width,
            h = t.height,
            u = t.createEl,
            c = t.render;
        (this.type = n),
            (this.style = r),
            (this.x = o),
            (this.y = s),
            (this.width = a),
            (this.height = h),
            (this.createEl = u),
            (this.render = c),
            Object.defineProperties(this, { _game: { writable: !0, value: e }, group: { writable: !0, value: i } });
    },
    u = { absolutePosition: { configurable: !0 }, game: { configurable: !0 } };
(u.absolutePosition.get = function () {
    var t = { x: this.x, y: this.y },
        e = (function (t) {
            for (
                var e = {},
                    i = Date.now(),
                    n = function (n) {
                        var s = r[n];
                        if (s.target === t) {
                            var a = s.duration,
                                h = s.to,
                                u = s.easing;
                            void 0 === u &&
                                (u = function (t) {
                                    return t;
                                });
                            var c = s.start,
                                d = s.end,
                                l = s.from;
                            for (var p in s.properties) e[p] || (e[p] = 0), i < c ? (e[p] += l[p] - h[p]) : i >= c && i < d && (e[p] += u((d - Date.now()) / a) * (l[p] - h[p]));
                            i > d &&
                                (r.splice(n--, 1),
                                setTimeout(function () {
                                    s.cb && s.cb();
                                }, 0)),
                                (o = n);
                        }
                    },
                    o = 0;
                o < r.length;
                o++
            )
                n(o);
            return e;
        })(this);
    return (t.x += e.x || 0), (t.y += e.y || 0), this.group && ((t.x += this.group.x), (t.y += this.group.y)), t;
}),
    (h.prototype.isIntersectingWith = function (t) {
        return t.children ? t.isIntersectingWith(this) : a(this, t);
    }),
    (u.game.set = function (t) {
        this._game = t;
    }),
    (u.game.get = function () {
        return this.group ? this.group.game : this._game;
    }),
    Object.defineProperties(h.prototype, u);
var c = !1;
var d = (function (t) {
    function e(e) {
        void 0 === e && (e = {}), t.call(this, Object.assign({}, e, { type: "Card" }));
        var i = e.i,
            n = e.side;
        (this.i = i), (this.side = n), Object.defineProperties(this, { _movingGroup: { value: !1, writable: !0 } });
    }
    return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.created = function () {
            this.el.addEventListener("mousedown", this),
                this.el.addEventListener("touchstart", this),
                (this.el.style.touchAction = "none"),
                (this.el.style.userDrag = "none"),
                (this.el.style.userSelect = "none"),
                (this.el.style.webkitUserSelect = "none");
        }),
        (e.prototype.preMove = function () {
            this._moving = !0;
        }),
        (e.prototype.click = function (t) {
            this.side = "front" === this.side ? "back" : "front";
        }),
        (e.prototype.hold = function () {
            this.group && ((this._movingGroup = !0), (this._moving = !1), (this.group.children[0]._moving = !0), this.group.moveBack());
        }),
        (e.prototype.dblClick = function () {
            this.group && "Deck" === this.group.type && this.group.shuffle();
        }),
        (e.prototype.startMove = function (t) {
            this._movingGroup || this.group ? this.group.game.add(this.group, !1) : this.game.add(this, !1);
        }),
        (e.prototype.move = function (t) {
            if (this._movingGroup) (this.group.x += t.x), (this.group.y += t.y);
            else {
                (this.x += t.x), (this.y += t.y);
                var e = this.group;
                e && (e.isIntersectingWith(this) || (e.remove(this, !0), e.game.add(this, !1)));
            }
        }),
        (e.prototype.endMove = function () {
            var t = this;
            if (this._movingGroup) {
                (this._movingGroup = !1),
                    this.group.children.forEach(function (t) {
                        t._moving = !1;
                    });
                var e = this.game.intersectingChildren(this).filter(function (e) {
                    return e !== t.group;
                });
                e.sort(function (t, e) {
                    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
                });
                var i = e[0];
                if (i)
                    if ("Pile" === i.type || "Deck" === i.type)
                        this.group.children
                            .filter(function (t) {
                                return "Card" === t.type;
                            })
                            .forEach(function (t) {
                                i.add(t, !1);
                            }),
                            i.moveBack(!0);
            } else if (((this._moving = !1), this.group)) this.group.moveBack(!0);
            else {
                var n = this.game.intersectingChildren(this);
                n.sort(function (t, e) {
                    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
                });
                var r = n[0];
                if (!r) return;
                if (r.children) {
                    if ("Pile" === r.type && 1 === r.children.length) {
                        var o = { x: Math.abs(r.x - this.x), y: Math.abs(r.y - this.y) };
                        r.dir = o.y > o.x ? "vertical" : "horizontal";
                    }
                    r.add(this, !0);
                } else {
                    var s = { x: Math.abs(r.x - this.x), y: Math.abs(r.y - this.y) },
                        a = new y({ game: this.game, dir: s.y > s.x ? "vertical" : "horizontal" });
                    (a.x = r.x), (a.y = r.y), a.add(r, !1), a.add(this, !0), this.game.add(a, !1);
                }
            }
        }),
        e
    );
})(h);
d.prototype.handleEvent = function (t) {
    var e = this;
    if ("mousedown" === t.type || "touchstart" === t.type) {
        if (c && "mousedown" === t.type) return void this.el.removeEventListener("mousedown", this);
        "touchstart" === t.type && (c = !0);
        var i = { x: (t.touches ? t.touches[0] : t).pageX, y: (t.touches ? t.touches[0] : t).pageY },
            n = Date.now();
        this.preMove();
        var r = i,
            o = 0,
            s = !1,
            a = setTimeout(function () {
                e.hold();
            }, 500),
            h = function (t) {
                var i = { x: (t.touches ? t.touches[0] : t).pageX, y: (t.touches ? t.touches[0] : t).pageY },
                    n = { x: i.x - r.x, y: i.y - r.y };
                (o += Math.abs(n.x + n.y)), a && o > 5 && (clearTimeout(a), (a = null)), s || ((s = !0), e.startMove()), e.move(n), (r = i);
            },
            u = function (t) {
                var i = Date.now();
                o < 5 && (i - e._lastClick < 200 ? e.dblClick() : Date.now() - n < 200 && e.click()),
                    (e._lastClick = i),
                    (e._moving = !1),
                    clearTimeout(a),
                    (a = null),
                    s && e.endMove(),
                    "touchend" === t.type ? (window.removeEventListener("touchmove", h), window.removeEventListener("touchend", u)) : (window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", u));
            };
        "touchstart" === t.type ? (window.addEventListener("touchmove", h), window.addEventListener("touchend", u)) : (window.addEventListener("mousemove", h), window.addEventListener("mouseup", u));
    }
};
var l = function (t) {
    var e = t.game,
        i = t.type,
        n = t.x,
        r = t.y;
    (this.type = i), (this.x = n), (this.y = r), Object.defineProperties(this, { children: { writable: !0, value: [] }, game: { writable: !0, value: e } });
};
function p(t, e) {
    for (var i = this, n = [], r = [], a = 0; a < t.children.length; a++) {
        var h = t.children[a];
        Math.round(Math.random()) ? r.push(h) : n.push(h);
    }
    (this.animations || []).forEach(function (t) {
        return t.destroy();
    }),
        (this.animations = []);
    for (var u = 0; u < n.length || u < r.length; u++) {
        if (u < n.length) {
            var c = n[u];
            (c.side = "back"), this.animations.push(o(c, 225, { x: 40 * Math.random() - 70, y: -u / 2 }, (54 * u * 3 * 1) / t.children.length, "sineInOut"));
        }
        if (u < r.length) {
            var d = r[u];
            (d.side = "back"), this.animations.push(o(d, 225, { x: 70 + 40 * Math.random(), y: -u / 2 }, (54 * u * 3 * 1) / t.children.length, "sineInOut"));
        }
    }
    s(this.animations, function () {
        var a = 0;
        for (i.animations = []; n.length || r.length; ) {
            var h = Math.round(Math.random()) ? n.shift() || r.shift() : r.shift() || n.shift();
            (h.side = "back"), i.animations.push(o(h, 225, { x: -a / 4, y: -a / 4 }, (54 * a * 3 * 1) / t.children.length, "sineInOut")), a++;
        }
        s(i.animations, function () {
            for (
                var n = (function (t) {
                        if (!t.length) return t;
                        for (var e = t.length - 1; e; e--) {
                            var i = Math.floor(Math.random() * (e + 1)),
                                n = t[e];
                            (t[e] = t[i]), (t[i] = n);
                        }
                        return t;
                    })(t.children),
                    r = {},
                    o = {},
                    s = 0;
                s < t.children.length;
                s++
            )
                (r[t.children[s].i] = !0), (o[n[s].i] = !0), (t.children[s].i = n[s].i), (t.children[s].x = -s / 4), (t.children[s].y = -s / 4);
            (i.animations = []), e && e();
        });
    });
}
(l.prototype.add = function (t, e) {
    var i = this;
    return t.length
        ? (t.forEach(function (t) {
              i.add(t, e);
          }),
          this)
        : (t.group ? (t.group.remove(t), (t.x -= this.x), (t.y -= this.y)) : t.game && (t.game.remove(t), (t.x -= this.x), (t.y -= this.y)), (t.group = this), this.children.push(t), !1 !== e && this.moveBack && this.moveBack(e), this);
}),
    (l.prototype.remove = function (t, e) {
        var i = this.children.indexOf(t);
        ~i && ((t.x += this.x), (t.y += this.y), (t.group = null), this.children.splice(i, 1)), e && this.moveBack(!0);
    }),
    (l.prototype.isIntersectingWith = function (t) {
        return t.children
            ? this.children.find(function (e) {
                  return t.children.find(function (t) {
                      return a(e, t);
                  });
              })
            : this.children.find(function (e) {
                  return a(t, e);
              });
    }),
    (l.prototype.distanceTo = function (t) {
        return this.children.reduce(function (e, i) {
            return Math.min(e, Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2)));
        }, 1 / 0);
    });
var f = (function (t) {
    function e() {
        t.apply(this, arguments);
    }
    return t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)), (e.prototype.constructor = e), e;
})(
    (function (t) {
        function e(e) {
            void 0 === e && (e = {}), t.call(this, Object.assign({}, e, { type: "Deck" }));
        }
        return t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)), (e.prototype.constructor = e), e;
    })(l)
);
(f.prototype.moveBack = function (t) {
    for (var e = 0; e < this.children.length; e++) {
        var i = { x: -e / 4, y: -e / 4 };
        t ? o(this.children[e], 200, i) : ((this.children[e].x = i.x), (this.children[e].y = i.y));
    }
}),
    (f.prototype.shuffle = function () {
        var t = this;
        p(this, function () {
            p(t, function () {
                p(t);
            });
        });
    });
var v = function (t) {
        void 0 === t && (t = {});
        var e = t.width;
        void 0 === e && (e = 1920);
        var i = t.height;
        void 0 === i && (i = 1080);
        var n = t.cardTypes;
        void 0 === n && (n = {}), (this.width = e), (this.height = i), Object.defineProperties(this, { children: { writable: !0, value: [] }, rendering: { writable: !0, value: null }, cardTypes: { writable: !0, value: n } });
    },
    g = { entities: { configurable: !0 }, groups: { configurable: !0 } };
(g.entities.get = function () {
    return this.children.reduce(function (t, e) {
        return e.children ? t.concat(e.children) : t.concat(e);
    }, []);
}),
    (g.groups.get = function () {
        return this.children.filter(function (t) {
            return null != t.children;
        });
    }),
    Object.defineProperties(v.prototype, g),
    (v.prototype.createCards = function (t, e) {
        void 0 === t && (t = {}), void 0 === e && (e = {});
        var i = t.type,
            n = this.cardTypes[i] || {},
            r = t.Card;
        void 0 === r && (r = n.Card || d);
        var o = t.start;
        void 0 === o && (o = 0);
        var s = t.end;
        void 0 === s && (s = o || 0);
        for (var a = new Array(s - o), h = o; h < s; h++) {
            var u = new r(Object.assign({}, e, n, { i: h }));
            a[s - h] = u;
        }
        return a;
    }),
    (v.prototype.add = function (t) {
        var e = this;
        return t.length
            ? (t.forEach(function (t) {
                  e.add(t);
              }),
              this)
            : (t.game && t.game.remove(t), t.group && t.group.remove(t), this.children.push(t), (t.game = this), this);
    }),
    (v.prototype.remove = function (t) {
        var e = this.children.indexOf(t);
        return ~e && (this.children.splice(e, 1), (t.game = null)), this;
    }),
    (v.prototype.intersectingChildren = function (t) {
        return this.children.filter(function (e) {
            return e.isIntersectingWith(t);
        });
    });
var y = (function (t) {
        function e(e) {
            void 0 === e && (e = {});
            var i = e.dir;
            t.call(this, Object.assign({}, e, { type: "Pile" })), (this.dir = i);
        }
        return (
            t && (e.__proto__ = t),
            (e.prototype = Object.create(t && t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.moveBack = function () {
                for (var t = this.dir, e = 0; e < this.children.length; e++) o(this.children[e], 200, { x: "horizontal" === t ? 15 * e : 0, y: "vertical" === t ? 30 * e : 0 });
            }),
            e
        );
    })(l),
    m = function (t, e) {
        (this.game = t), (this.container = e);
    };
(m.prototype.start = function () {
    var t = this;
    this.rendering ||
        (this.rendering = requestAnimationFrame(function () {
            var e = t.container;
            (t.rendering = null), t.start(e), t.render(e);
        }));
}),
    (m.prototype.render = function () {
        !(function (t, e) {
            (e.style.width = t.width + "px"), (e.style.height = t.height + "px");
            for (var i = t.entities, n = 0; n < i.length; n++) {
                var r = i[n];
                if (!r.el) {
                    var o = r.createEl && r.createEl();
                    o && Object.defineProperties(r, { el: { writable: !0, value: o } }), r.created && r.created();
                }
                r.render && r.render(r.el, r);
            }
            for (var s = e.firstChild, a = 0; a < i.length; a++) {
                var h = i[a];
                if (h.el)
                    if (s) {
                        if (s === h.el) {
                            s = s.nextSibling;
                            continue;
                        }
                        e.insertBefore(h.el, s);
                    } else e.appendChild(h.el);
            }
            for (; s; ) {
                var u = s.nextSibling;
                e.removeChild(s), (s = u);
            }
        })(this.game, this.container);
    }),
    (m.prototype.stop = function () {
        cancelAnimationFrame(this.rendering);
    });
var x = new v({
        width: 1920,
        height: 1080,
        cardTypes: {
            standard: {
                style: "standard",
                width: 100,
                height: 140,
                side: "front",
                createEl: function () {
                    var t = document.createElement("div");
                    return (
                        (t.style.position = "absolute"),
                        (t.style.backgroundColor = "#fff"),
                        (t.style.backgroundPosition = "50% 50%"),
                        (t.style.backgroundSize = "contain"),
                        (t.style.backgroundRepeat = "no-repeat"),
                        (t.style.borderRadius = "6% " + 6 / 1.4 + "%"),
                        (t.style.overflow = "hidden"),
                        (t.style.willChange = "transform"),
                        t
                    );
                },
                render: function () {
                    var t = this.i,
                        e = this.width,
                        i = this.height,
                        n = this.side,
                        r = this.absolutePosition,
                        o = this._moving,
                        s = r.x,
                        a = r.y;
                    (this.el.style.transform = "translate(" + Math.round(s) + "px, " + Math.round(a) + "px)"),
                        (this.el.style.width = e + "px"),
                        (this.el.style.height = i + "px"),
                        (this.el.style.marginLeft = -e / 2 + "px"),
                        (this.el.style.marginTop = -i / 2 + "px"),
                        (this.el.style.backgroundImage = "front" === n ? "url(standard-deck/front-" + t + ".png)" : "url(standard-deck/back.png)"),
                        (this.el.style.boxShadow = o ? "0px 2px 5px rgba(0, 0, 0, 0.25)" : "0px 1px 1px rgba(0, 0, 0, 0.05)");
                },
            },
        },
    }),
    b = new f({ x: 960, y: 540 }),
    w = x.createCards({ type: "standard", start: 0, end: 52 }, { side: "back" });
x.add(b), b.add(w), new m(x, document.querySelector("#game")).start();
