define("json@1.0.1/index", [],
function(require, exports, module) {
    "use strict";
    function f(a) {
        return 10 > a ? "0" + a: a
    }
    function quote(a) {
        return escapable.lastIndex = 0,
        escapable.test(a) ? '"' + a.replace(escapable,
        function(a) {
            var b = meta[a];
            return "string" == typeof b ? b: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + a + '"'
    }
    function str(a, b) {
        var c, d, e, f, g, h = gap,
        i = b[a];
        switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
        case "string":
            return quote(i);
        case "number":
            return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
            return String(i);
        case "object":
            if (!i) return "null";
            if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
                return e = 0 === g.length ? "[]": gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]": "[" + g.join(",") + "]",
                gap = h,
                e
            }
            if (rep && "object" == typeof rep) for (f = rep.length, c = 0; f > c; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": ": ":") + e));
            else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": ": ":") + e));
            return e = 0 === g.length ? "{}": gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}": "{" + g.join(",") + "}",
            gap = h,
            e
        }
    }
    var _JSON = "object" != typeof JSON ? {}: JSON;
    module.exports = _JSON,
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
    },
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    rep;
    "function" != typeof _JSON.stringify && (_JSON.stringify = function(a, b, c) {
        var d;
        if (gap = "", indent = "", "number" == typeof c) for (d = 0; c > d; d += 1) indent += " ";
        else "string" == typeof c && (indent = c);
        if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
        return str("", {
            "": a
        })
    }),
    "function" != typeof _JSON.parse && (_JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && "object" == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d: delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
        function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
        "function" == typeof reviver ? walk({
            "": j
        },
        "") : j;
        throw new SyntaxError("JSON.parse")
    })
},
{
    main: !0
});

define("util@1.0.5/index", ["json@~1.0.0"],
function(e, t) {
    "use strict";
    function n(e, n) {
        var i = {
            seen: [],
            stylize: o
        };
        return arguments.length >= 3 && (i.depth = arguments[2]),
        arguments.length >= 4 && (i.colors = arguments[3]),
        f(n) ? i.showHidden = n: n && t._extend(i, n),
        h(i.showHidden) && (i.showHidden = !1),
        h(i.depth) && (i.depth = 2),
        h(i.colors) && (i.colors = !1),
        h(i.customInspect) && (i.customInspect = !0),
        i.colors && (i.stylize = r),
        u(i, e, i.depth)
    }
    function r(e, t) {
        var r = n.styles[t];
        return r ? "[" + n.colors[r][0] + "m" + e + "[" + n.colors[r][1] + "m": e
    }
    function o(e) {
        return e
    }
    function i(e) {
        var t = {};
        return e.forEach(function(e) {
            t[e] = !0
        }),
        t
    }
    function u(e, n, r) {
        if (e.customInspect && n && S(n.inspect) && n.inspect !== t.inspect && (!n.constructor || n.constructor.prototype !== n)) {
            var o = n.inspect(r, e);
            return m(o) || (o = u(e, o, r)),
            o
        }
        var f = c(e, n);
        if (f) return f;
        var g = Object.keys(n),
        y = i(g);
        if (e.showHidden && Object.getOwnPropertyNames && (g = Object.getOwnPropertyNames(n)), 0 === g.length) {
            if (S(n)) {
                var d = n.name ? ": " + n.name: "";
                return e.stylize("[Function" + d + "]", "special")
            }
            if (v(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp");
            if (O(n)) return e.stylize(Date.prototype.toString.call(n), "date");
            if (z(n)) return s(n)
        }
        var b = "",
        h = !1,
        j = ["{", "}"];
        if (J(n) && (h = !0, j = ["[", "]"]), S(n)) {
            var w = n.name ? ": " + n.name: "";
            b = " [Function" + w + "]"
        }
        if (v(n) && (b = " " + RegExp.prototype.toString.call(n)), O(n) && (b = " " + Date.prototype.toUTCString.call(n)), z(n) && (b = " " + s(n)), 0 === g.length && (!h || 0 == n.length)) return j[0] + b + j[1];
        if (0 > r) return v(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special");
        e.seen.push(n);
        var x;
        return x = h ? l(e, n, r, y, g) : g.map(function(t) {
            return a(e, n, r, y, t, h)
        }),
        e.seen.pop(),
        p(x, b, j)
    }
    function c(e, t) {
        if (h(t)) return e.stylize("undefined", "undefined");
        if (m(t)) {
            var n = "'" + A.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return e.stylize(n, "string")
        }
        return d(t) ? 0 === t && 0 > 1 / t ? e.stylize("-0", "number") : e.stylize("" + t, "number") : f(t) ? e.stylize("" + t, "boolean") : g(t) ? e.stylize("null", "null") : void 0
    }
    function s(e) {
        return "[" + Error.prototype.toString.call(e) + "]"
    }
    function l(e, t, n, r, o) {
        for (var i = [], u = 0, c = t.length; c > u; ++u) i.push(N(t, String(u)) ? a(e, t, n, r, String(u), !0) : "");
        return o.forEach(function(o) {
            o.match(/^\d+$/) || i.push(a(e, t, n, r, o, !0))
        }),
        i
    }
    function a(e, t, n, r, o, i) {
        var c, s, l;
        if (l = Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(t, o) || {
            value: t[o]
        },
        l.get ? s = l.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : l.set && (s = e.stylize("[Setter]", "special")), N(r, o) || (c = "[" + o + "]"), s || (e.seen.indexOf(l.value) < 0 ? (s = g(n) ? u(e, l.value, null) : u(e, l.value, n - 1), s.indexOf("\n") > -1 && (s = i ? s.split("\n").map(function(e) {
            return "  " + e
        }).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) {
            return "   " + e
        }).join("\n"))) : s = e.stylize("[Circular]", "special")), h(c)) {
            if (i && o.match(/^\d+$/)) return s;
            c = A.stringify("" + o),
            c.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (c = c.substr(1, c.length - 2), c = e.stylize(c, "name")) : (c = c.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'").replace(/\\\\/g, "\\"), c = e.stylize(c, "string"))
        }
        return c + ": " + s
    }
    function p(e, t, n) {
        var r = 0,
        o = e.reduce(function(e, t) {
            return r++,
            t.indexOf("\n") >= 0 && r++,
            e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
        },
        0);
        return o > 60 ? n[0] + ("" === t ? "": t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
    }
    function f(e) {
        return "boolean" == typeof e
    }
    function g(e) {
        return null === e
    }
    function y(e) {
        return null == e
    }
    function d(e) {
        return "number" == typeof e
    }
    function m(e) {
        return "string" == typeof e
    }
    function b(e) {
        return "symbol" == typeof e
    }
    function h(e) {
        return void 0 === e
    }
    function v(e) {
        return j(e) && "[object RegExp]" === x(e)
    }
    function j(e) {
        return "object" == typeof e && null !== e
    }
    function O(e) {
        return j(e) && "[object Date]" === x(e)
    }
    function z(e) {
        return j(e) && ("[object Error]" === x(e) || e instanceof Error)
    }
    function S(e) {
        return "function" == typeof e
    }
    function w(e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
    }
    function x(e) {
        return Object.prototype.toString.call(e)
    }
    function E(e) {
        return 10 > e ? "0" + e.toString(10) : e.toString(10)
    }
    function D() {
        var e = new Date,
        t = [E(e.getHours()), E(e.getMinutes()), E(e.getSeconds())].join(":");
        return [e.getDate(), R[e.getMonth()], t].join(" ")
    }
    function N(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    var A;
    if ("object" != typeof JSON) try {
        A = e("json")
    } catch(P) {} else A = JSON;
    var H = /%[sdj%]/g;
    t.format = function(e) {
        if (!m(e)) {
            for (var t = [], r = 0; r < arguments.length; r++) t.push(n(arguments[r]));
            return t.join(" ")
        }
        for (var r = 1,
        o = arguments,
        i = o.length,
        u = String(e).replace(H,
        function(e) {
            if ("%%" === e) return "%";
            if (r >= i) return e;
            switch (e) {
            case "%s":
                return String(o[r++]);
            case "%d":
                return Number(o[r++]);
            case "%j":
                try {
                    return A.stringify(o[r++])
                } catch(t) {
                    return "[Circular]"
                }
            default:
                return e
            }
        }), c = o[r]; i > r; c = o[++r]) u += g(c) || !j(c) ? " " + c: " " + n(c);
        return u
    },
    t.inspect = n,
    n.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    },
    n.styles = {
        special: "cyan",
        number: "yellow",
        "boolean": "yellow",
        undefined: "grey",
        "null": "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    };
    var J = Array.isArray ||
    function(e) {
        return "[object Array]" === x(e)
    };
    t.isArray = J,
    t.isBoolean = f,
    t.isNull = g,
    t.isNullOrUndefined = y,
    t.isNumber = d,
    t.isString = m,
    t.isSymbol = b,
    t.isUndefined = h,
    t.isRegExp = v,
    t.isObject = j,
    t.isDate = O,
    t.isError = z,
    t.isFunction = S,
    t.isPrimitive = w;
    var R = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    t.log = function() {
        console.log("%s - %s", D(), t.format.apply(t, arguments))
    },
    t.inherits = function(e, t) {
        if (e.super_ = t, Object.create) e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        });
        else {
            var n = function() {};
            n.prototype = t.prototype,
            e.prototype = new n,
            e.prototype.constructor = e
        }
    },
    t._extend = function(e, t) {
        if (!t || !j(t)) return e;
        for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
        return e
    }
},
{
    main: !0
});

define("clone@0.1.13/clone", ["util@~1.0.2"],
function(e, i, n) {
    "use strict";
    function r(e) {
        var i = "";
        return e.global && (i += "g"),
        e.ignoreCase && (i += "i"),
        e.multiline && (i += "m"),
        i
    }
    function t(e, i) {
        function n(e, i, t, o) {
            var c;
            if ("object" == typeof e) {
                if (null == e) return e;
                for (c in s) if (s[c] === e) return a.push({
                    resolveTo: c,
                    child: t,
                    i: o
                }),
                null;
                if (s[i] = e, f.isArray(e)) {
                    t = [];
                    for (c in e) t[c] = n(e[c], i + "[" + c + "]", t, c)
                } else if (f.isDate(e)) t = new Date(e.getTime());
                else if (f.isRegExp(e)) t = new RegExp(e.source, r(e)),
                e.lastIndex && (t.lastIndex = e.lastIndex);
                else if (l && Buffer.isBuffer(e)) t = new Buffer(e.length),
                e.copy(t);
                else {
                    t = {},
                    t.__proto__ = e.__proto__;
                    for (c in e) t[c] = n(e[c], i + "[" + c + "]", t, c)
                }
                u[i] = t
            } else t = e;
            return t
        }
        "undefined" == typeof i && (i = !0);
        var o, l = "undefined" != typeof Buffer,
        s = {},
        u = {},
        a = [];
        if (i) {
            var c = n(e, "*");
            for (o in a) {
                var _ = a[o];
                _ && _.child && _.i in _.child && (_.child[_.i] = u[_.resolveTo])
            }
            return c
        }
        var d;
        if ("object" == typeof e) {
            if (null == e) return e;
            if ("Array" === e.constructor.name) {
                d = [];
                for (o in e) d[o] = t(e[o], i)
            } else if (f.isDate(e)) d = new Date(e.getTime());
            else if (f.isRegExp(e)) d = new RegExp(e.source, r(e)),
            e.lastIndex && (d.lastIndex = e.lastIndex);
            else {
                d = {},
                d.__proto__ = e.__proto__;
                for (o in e) d[o] = t(e[o], i)
            }
        } else d = e;
        return d
    }
    n.exports = t;
    var f = e("util")
},
{
    main: !0
});

define("events@1.0.5/index", ["util@~1.0.0"],
function(e, t, s) {
    function n() {
        this._events = this._events || {},
        this._maxListeners = this._maxListeners || void 0
    }
    var i = e("util");
    s.exports = n,
    s.exports.EventEmitter = n,
    n.prototype._events = void 0,
    n.prototype._maxListeners = void 0,
    n.defaultMaxListeners = 10,
    n.prototype.setMaxListeners = function(e) {
        if (!i.isNumber(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
        return this._maxListeners = e,
        this
    },
    n.prototype.emit = function(e) {
        var t, s, n, r, o, h;
        if (this._events || (this._events = {}), "error" === e && (!this._events.error || i.isObject(this._events.error) && !this._events.error.length)) return t = arguments[1],
        "undefined" != typeof console && console.log('Uncaught, unspecified "error" event.', t),
        !1;
        if (s = this._events[e], i.isUndefined(s)) return ! 1;
        if (i.isFunction(s)) switch (arguments.length) {
        case 1:
            s.call(this);
            break;
        case 2:
            s.call(this, arguments[1]);
            break;
        case 3:
            s.call(this, arguments[1], arguments[2]);
            break;
        default:
            for (n = arguments.length, r = new Array(n - 1), o = 1; n > o; o++) r[o - 1] = arguments[o];
            s.apply(this, r)
        } else if (i.isObject(s)) {
            for (n = arguments.length, r = new Array(n - 1), o = 1; n > o; o++) r[o - 1] = arguments[o];
            for (h = s.slice(), n = h.length, o = 0; n > o; o++) h[o].apply(this, r)
        }
        return ! 0
    },
    n.prototype.addListener = function(e, t) {
        var s;
        if (!i.isFunction(t)) throw TypeError("listener must be a function");
        if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i.isFunction(t.listener) ? t.listener: t), this._events[e] ? i.isObject(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, i.isObject(this._events[e]) && !this._events[e].warned) {
            var s;
            s = i.isUndefined(this._maxListeners) ? n.defaultMaxListeners: this._maxListeners,
            s && s > 0 && this._events[e].length > s && (this._events[e].warned = !0, "undefined" != typeof console && (console && console.error && console.error("warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), console && console.trace && console.trace()))
        }
        return this
    },
    n.prototype.on = n.prototype.addListener,
    n.prototype.once = function(e, t) {
        function s() {
            this.removeListener(e, s),
            n || (n = !0, t.apply(this, arguments))
        }
        if (!i.isFunction(t)) throw TypeError("listener must be a function");
        var n = !1;
        return s.listener = t,
        this.on(e, s),
        this
    },
    n.prototype.removeListener = function(e, t) {
        var s, n, r, o;
        if (!i.isFunction(t)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[e]) return this;
        if (s = this._events[e], r = s.length, n = -1, s === t || i.isFunction(s.listener) && s.listener === t) delete this._events[e],
        this._events.removeListener && this.emit("removeListener", e, t);
        else if (i.isObject(s)) {
            for (o = r; o-->0;) if (s[o] === t || s[o].listener && s[o].listener === t) {
                n = o;
                break
            }
            if (0 > n) return this;
            1 === s.length ? (s.length = 0, delete this._events[e]) : s.splice(n, 1),
            this._events.removeListener && this.emit("removeListener", e, t)
        }
        return this
    },
    n.prototype.removeAllListeners = function(e) {
        var t, s;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {}: this._events[e] && delete this._events[e],
        this;
        if (0 === arguments.length) {
            for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"),
            this._events = {},
            this
        }
        if (s = this._events[e], i.isFunction(s)) this.removeListener(e, s);
        else if (i.isArray(s)) for (; s.length;) this.removeListener(e, s[s.length - 1]);
        return delete this._events[e],
        this
    },
    n.prototype.listeners = function(e) {
        var t;
        return t = this._events && this._events[e] ? i.isFunction(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    },
    n.listenerCount = function(e, t) {
        var s;
        return s = e._events && e._events[t] ? i.isFunction(e._events[t]) ? 1 : e._events[t].length: 0
    }
},
{
    main: !0
});

define("underscore@1.5.3", [],
function(a, b, c) { (function() {
        var a = this,
        d = a._,
        e = {},
        f = Array.prototype,
        g = Object.prototype,
        h = Function.prototype,
        i = Date.now ||
        function() {
            return (new Date).getTime()
        },
        j = f.push,
        k = f.slice,
        l = f.concat,
        m = g.toString,
        n = g.hasOwnProperty,
        o = f.forEach,
        p = f.map,
        q = f.reduce,
        r = f.reduceRight,
        s = f.filter,
        t = f.every,
        u = f.some,
        v = f.indexOf,
        w = f.lastIndexOf,
        x = Array.isArray,
        y = Object.keys,
        z = h.bind,
        A = function(a) {
            return a instanceof A ? a: this instanceof A ? (this._wrapped = a, void 0) : new A(a)
        };
        "undefined" != typeof b ? ("undefined" != typeof c && c.exports && (b = c.exports = A), b._ = A) : a._ = A,
        A.VERSION = "1.5.2";
        var B = A.each = A.forEach = function(a, b, c) {
            if (null != a) if (o && a.forEach === o) a.forEach(b, c);
            else if (a.length === +a.length) {
                for (var d = 0,
                f = a.length; f > d; d++) if (b.call(c, a[d], d, a) === e) return
            } else for (var g = A.keys(a), d = 0, f = g.length; f > d; d++) if (b.call(c, a[g[d]], g[d], a) === e) return
        };
        A.map = A.collect = function(a, b, c) {
            var d = [];
            return null == a ? d: p && a.map === p ? a.map(b, c) : (B(a,
            function(a, e, f) {
                d.push(b.call(c, a, e, f))
            }), d)
        };
        var C = "Reduce of empty array with no initial value";
        A.reduce = A.foldl = A.inject = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), q && a.reduce === q) return d && (b = A.bind(b, d)),
            e ? a.reduce(b, c) : a.reduce(b);
            if (B(a,
            function(a, f, g) {
                e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
            }), !e) throw new TypeError(C);
            return c
        },
        A.reduceRight = A.foldr = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), r && a.reduceRight === r) return d && (b = A.bind(b, d)),
            e ? a.reduceRight(b, c) : a.reduceRight(b);
            var f = a.length;
            if (f !== +f) {
                var g = A.keys(a);
                f = g.length
            }
            if (B(a,
            function(h, i, j) {
                i = g ? g[--f] : --f,
                e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
            }), !e) throw new TypeError(C);
            return c
        },
        A.find = A.detect = function(a, b, c) {
            var d;
            return D(a,
            function(a, e, f) {
                return b.call(c, a, e, f) ? (d = a, !0) : void 0
            }),
            d
        },
        A.filter = A.select = function(a, b, c) {
            var d = [];
            return null == a ? d: s && a.filter === s ? a.filter(b, c) : (B(a,
            function(a, e, f) {
                b.call(c, a, e, f) && d.push(a)
            }), d)
        },
        A.reject = function(a, b, c) {
            return A.filter(a,
            function(a, d, e) {
                return ! b.call(c, a, d, e)
            },
            c)
        },
        A.every = A.all = function(a, b, c) {
            b || (b = A.identity);
            var d = !0;
            return null == a ? d: t && a.every === t ? a.every(b, c) : (B(a,
            function(a, f, g) {
                return (d = d && b.call(c, a, f, g)) ? void 0 : e
            }), !!d)
        };
        var D = A.some = A.any = function(a, b, c) {
            b || (b = A.identity);
            var d = !1;
            return null == a ? d: u && a.some === u ? a.some(b, c) : (B(a,
            function(a, f, g) {
                return d || (d = b.call(c, a, f, g)) ? e: void 0
            }), !!d)
        };
        A.contains = A.include = function(a, b) {
            return null == a ? !1 : v && a.indexOf === v ? -1 != a.indexOf(b) : D(a,
            function(a) {
                return a === b
            })
        },
        A.invoke = function(a, b) {
            var c = k.call(arguments, 2),
            d = A.isFunction(b);
            return A.map(a,
            function(a) {
                return (d ? b: a[b]).apply(a, c)
            })
        },
        A.pluck = function(a, b) {
            return A.map(a, A.property(b))
        },
        A.where = function(a, b, c) {
            return A.isEmpty(b) ? c ? void 0 : [] : A[c ? "find": "filter"](a,
            function(a) {
                for (var c in b) if (b[c] !== a[c]) return ! 1;
                return ! 0
            })
        },
        A.findWhere = function(a, b) {
            return A.where(a, b, !0)
        },
        A.max = function(a, b, c) {
            if (!b && A.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
            if (!b && A.isEmpty(a)) return - 1 / 0;
            var d = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return B(a,
            function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g > d.computed && (d = {
                    value: a,
                    computed: g
                })
            }),
            d.value
        },
        A.min = function(a, b, c) {
            if (!b && A.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
            if (!b && A.isEmpty(a)) return 1 / 0;
            var d = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return B(a,
            function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g < d.computed && (d = {
                    value: a,
                    computed: g
                })
            }),
            d.value
        },
        A.shuffle = function(a) {
            var b, c = 0,
            d = [];
            return B(a,
            function(a) {
                b = A.random(c++),
                d[c - 1] = d[b],
                d[b] = a
            }),
            d
        },
        A.sample = function(a, b, c) {
            return null == b || c ? (a.length !== +a.length && (a = A.values(a)), a[A.random(a.length - 1)]) : A.shuffle(a).slice(0, Math.max(0, b))
        };
        var E = function(a) {
            return null == a ? A.identity: A.isFunction(a) ? a: A.property(a)
        };
        A.sortBy = function(a, b, c) {
            return b = E(b),
            A.pluck(A.map(a,
            function(a, d, e) {
                return {
                    value: a,
                    index: d,
                    criteria: b.call(c, a, d, e)
                }
            }).sort(function(a, b) {
                var c = a.criteria,
                d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c) return 1;
                    if (d > c || void 0 === d) return - 1
                }
                return a.index - b.index
            }), "value")
        };
        var F = function(a) {
            return function(b, c, d) {
                var e = {};
                return c = E(c),
                B(b,
                function(f, g) {
                    var h = c.call(d, f, g, b);
                    a(e, h, f)
                }),
                e
            }
        };
        A.groupBy = F(function(a, b, c) { (A.has(a, b) ? a[b] : a[b] = []).push(c)
        }),
        A.indexBy = F(function(a, b, c) {
            a[b] = c
        }),
        A.countBy = F(function(a, b) {
            A.has(a, b) ? a[b]++:a[b] = 1
        }),
        A.sortedIndex = function(a, b, c, d) {
            c = E(c);
            for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                var h = f + g >>> 1;
                c.call(d, a[h]) < e ? f = h + 1 : g = h
            }
            return f
        },
        A.toArray = function(a) {
            return a ? A.isArray(a) ? k.call(a) : a.length === +a.length ? A.map(a, A.identity) : A.values(a) : []
        },
        A.size = function(a) {
            return null == a ? 0 : a.length === +a.length ? a.length: A.keys(a).length
        },
        A.first = A.head = A.take = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[0] : 0 > b ? [] : k.call(a, 0, b)
        },
        A.initial = function(a, b, c) {
            return k.call(a, 0, a.length - (null == b || c ? 1 : b))
        },
        A.last = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[a.length - 1] : k.call(a, Math.max(a.length - b, 0))
        },
        A.rest = A.tail = A.drop = function(a, b, c) {
            return k.call(a, null == b || c ? 1 : b)
        },
        A.compact = function(a) {
            return A.filter(a, A.identity)
        };
        var G = function(a, b, c) {
            return b && A.every(a, A.isArray) ? l.apply(c, a) : (B(a,
            function(a) {
                A.isArray(a) || A.isArguments(a) ? b ? j.apply(c, a) : G(a, b, c) : c.push(a)
            }), c)
        };
        A.flatten = function(a, b) {
            return G(a, b, [])
        },
        A.without = function(a) {
            return A.difference(a, k.call(arguments, 1))
        },
        A.uniq = A.unique = function(a, b, c, d) {
            A.isFunction(b) && (d = c, c = b, b = !1);
            var e = c ? A.map(a, c, d) : a,
            f = [],
            g = [];
            return B(e,
            function(c, d) { (b ? d && g[g.length - 1] === c: A.contains(g, c)) || (g.push(c), f.push(a[d]))
            }),
            f
        },
        A.union = function() {
            return A.uniq(A.flatten(arguments, !0))
        },
        A.intersection = function(a) {
            var b = k.call(arguments, 1);
            return A.filter(A.uniq(a),
            function(a) {
                return A.every(b,
                function(b) {
                    return A.indexOf(b, a) >= 0
                })
            })
        },
        A.difference = function(a) {
            var b = l.apply(f, k.call(arguments, 1));
            return A.filter(a,
            function(a) {
                return ! A.contains(b, a)
            })
        },
        A.zip = function() {
            for (var a = A.max(A.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++) b[c] = A.pluck(arguments, "" + c);
            return b
        },
        A.object = function(a, b) {
            if (null == a) return {};
            for (var c = {},
            d = 0,
            e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c
        },
        A.indexOf = function(a, b, c) {
            if (null == a) return - 1;
            var d = 0,
            e = a.length;
            if (c) {
                if ("number" != typeof c) return d = A.sortedIndex(a, b),
                a[d] === b ? d: -1;
                d = 0 > c ? Math.max(0, e + c) : c
            }
            if (v && a.indexOf === v) return a.indexOf(b, c);
            for (; e > d; d++) if (a[d] === b) return d;
            return - 1
        },
        A.lastIndexOf = function(a, b, c) {
            if (null == a) return - 1;
            var d = null != c;
            if (w && a.lastIndexOf === w) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
            for (var e = d ? c: a.length; e--;) if (a[e] === b) return e;
            return - 1
        },
        A.range = function(a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0),
            c = arguments[2] || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a,
            a += c;
            return f
        };
        var H = function() {};
        A.bind = function(a, b) {
            var c, d;
            if (z && a.bind === z) return z.apply(a, k.call(arguments, 1));
            if (!A.isFunction(a)) throw new TypeError;
            return c = k.call(arguments, 2),
            d = function() {
                if (! (this instanceof d)) return a.apply(b, c.concat(k.call(arguments)));
                H.prototype = a.prototype;
                var e = new H;
                H.prototype = null;
                var f = a.apply(e, c.concat(k.call(arguments)));
                return Object(f) === f ? f: e
            }
        },
        A.partial = function(a) {
            var b = k.call(arguments, 1);
            return function() {
                return a.apply(this, b.concat(k.call(arguments)))
            }
        },
        A.bindAll = function(a) {
            var b = k.call(arguments, 1);
            if (0 === b.length) throw new Error("bindAll must be passed function names");
            return B(b,
            function(b) {
                a[b] = A.bind(a[b], a)
            }),
            a
        },
        A.memoize = function(a, b) {
            var c = {};
            return b || (b = A.identity),
            function() {
                var d = b.apply(this, arguments);
                return A.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
            }
        },
        A.delay = function(a, b) {
            var c = k.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, c)
            },
            b)
        },
        A.defer = function(a) {
            return A.delay.apply(A, [a, 1].concat(k.call(arguments, 1)))
        },
        A.throttle = function(a, b, c) {
            var d, e, f, g = null,
            h = 0;
            c || (c = {});
            var j = function() {
                h = c.leading === !1 ? 0 : i(),
                g = null,
                f = a.apply(d, e),
                d = e = null
            };
            return function() {
                var k = i();
                h || c.leading !== !1 || (h = k);
                var l = b - (k - h);
                return d = this,
                e = arguments,
                0 >= l ? (clearTimeout(g), g = null, h = k, f = a.apply(d, e), d = e = null) : g || c.trailing === !1 || (g = setTimeout(j, l)),
                f
            }
        },
        A.debounce = function(a, b, c) {
            var d, e, f, g, h;
            return function() {
                f = this,
                e = arguments,
                g = i();
                var j = function() {
                    var k = i() - g;
                    b > k ? d = setTimeout(j, b - k) : (d = null, c || (h = a.apply(f, e), f = e = null))
                },
                k = c && !d;
                return d || (d = setTimeout(j, b)),
                k && (h = a.apply(f, e), f = e = null),
                h
            }
        },
        A.once = function(a) {
            var b, c = !1;
            return function() {
                return c ? b: (c = !0, b = a.apply(this, arguments), a = null, b)
            }
        },
        A.wrap = function(a, b) {
            return A.partial(b, a)
        },
        A.compose = function() {
            var a = arguments;
            return function() {
                for (var b = arguments,
                c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                return b[0]
            }
        },
        A.after = function(a, b) {
            return function() {
                return--a < 1 ? b.apply(this, arguments) : void 0
            }
        },
        A.keys = y ||
        function(a) {
            if (a !== Object(a)) throw new TypeError("Invalid object");
            var b = [];
            for (var c in a) A.has(a, c) && b.push(c);
            return b
        },
        A.values = function(a) {
            for (var b = A.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++) d[e] = a[b[e]];
            return d
        },
        A.pairs = function(a) {
            for (var b = A.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++) d[e] = [b[e], a[b[e]]];
            return d
        },
        A.invert = function(a) {
            for (var b = {},
            c = A.keys(a), d = 0, e = c.length; e > d; d++) b[a[c[d]]] = c[d];
            return b
        },
        A.functions = A.methods = function(a) {
            var b = [];
            for (var c in a) A.isFunction(a[c]) && b.push(c);
            return b.sort()
        },
        A.extend = function(a) {
            return B(k.call(arguments, 1),
            function(b) {
                if (b) for (var c in b) a[c] = b[c]
            }),
            a
        },
        A.pick = function(a) {
            var b = {},
            c = l.apply(f, k.call(arguments, 1));
            return B(c,
            function(c) {
                c in a && (b[c] = a[c])
            }),
            b
        },
        A.omit = function(a) {
            var b = {},
            c = l.apply(f, k.call(arguments, 1));
            for (var d in a) A.contains(c, d) || (b[d] = a[d]);
            return b
        },
        A.defaults = function(a) {
            return B(k.call(arguments, 1),
            function(b) {
                if (b) for (var c in b) void 0 === a[c] && (a[c] = b[c])
            }),
            a
        },
        A.clone = function(a) {
            return A.isObject(a) ? A.isArray(a) ? a.slice() : A.extend({},
            a) : a
        },
        A.tap = function(a, b) {
            return b(a),
            a
        };
        var I = function(a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof A && (a = a._wrapped),
            b instanceof A && (b = b._wrapped);
            var e = m.call(a);
            if (e != m.call(b)) return ! 1;
            switch (e) {
            case "[object String]":
                return a == String(b);
            case "[object Number]":
                return a != +a ? b != +b: 0 == a ? 1 / a == 1 / b: a == +b;
            case "[object Date]":
            case "[object Boolean]":
                return + a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
            }
            if ("object" != typeof a || "object" != typeof b) return ! 1;
            for (var f = c.length; f--;) if (c[f] == a) return d[f] == b;
            var g = a.constructor,
            h = b.constructor;
            if (g !== h && !(A.isFunction(g) && g instanceof g && A.isFunction(h) && h instanceof h) && "constructor" in a && "constructor" in b) return ! 1;
            c.push(a),
            d.push(b);
            var i = 0,
            j = !0;
            if ("[object Array]" == e) {
                if (i = a.length, j = i == b.length) for (; i--&&(j = I(a[i], b[i], c, d)););
            } else {
                for (var k in a) if (A.has(a, k) && (i++, !(j = A.has(b, k) && I(a[k], b[k], c, d)))) break;
                if (j) {
                    for (k in b) if (A.has(b, k) && !i--) break;
                    j = !i
                }
            }
            return c.pop(),
            d.pop(),
            j
        };
        A.isEqual = function(a, b) {
            return I(a, b, [], [])
        },
        A.isEmpty = function(a) {
            if (null == a) return ! 0;
            if (A.isArray(a) || A.isString(a)) return 0 === a.length;
            for (var b in a) if (A.has(a, b)) return ! 1;
            return ! 0
        },
        A.isElement = function(a) {
            return ! (!a || 1 !== a.nodeType)
        },
        A.isArray = x ||
        function(a) {
            return "[object Array]" == m.call(a)
        },
        A.isObject = function(a) {
            return a === Object(a)
        },
        B(["Arguments", "Function", "String", "Number", "Date", "RegExp"],
        function(a) {
            A["is" + a] = function(b) {
                return m.call(b) == "[object " + a + "]"
            }
        }),
        A.isArguments(arguments) || (A.isArguments = function(a) {
            return ! (!a || !A.has(a, "callee"))
        }),
        "function" != typeof / . / &&(A.isFunction = function(a) {
            return "function" == typeof a
        }),
        A.isFinite = function(a) {
            return isFinite(a) && !isNaN(parseFloat(a))
        },
        A.isNaN = function(a) {
            return A.isNumber(a) && a != +a
        },
        A.isBoolean = function(a) {
            return a === !0 || a === !1 || "[object Boolean]" == m.call(a)
        },
        A.isNull = function(a) {
            return null === a
        },
        A.isUndefined = function(a) {
            return void 0 === a
        },
        A.has = function(a, b) {
            return n.call(a, b)
        },
        A.noConflict = function() {
            return a._ = d,
            this
        },
        A.identity = function(a) {
            return a
        },
        A.constant = function(a) {
            return function() {
                return a
            }
        },
        A.property = function(a) {
            return function(b) {
                return b[a]
            }
        },
        A.times = function(a, b, c) {
            for (var d = Array(Math.max(0, a)), e = 0; a > e; e++) d[e] = b.call(c, e);
            return d
        },
        A.random = function(a, b) {
            return null == b && (b = a, a = 0),
            a + Math.floor(Math.random() * (b - a + 1))
        };
        var J = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;"
            }
        };
        J.unescape = A.invert(J.escape);
        var K = {
            escape: new RegExp("[" + A.keys(J.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + A.keys(J.unescape).join("|") + ")", "g")
        };
        A.each(["escape", "unescape"],
        function(a) {
            A[a] = function(b) {
                return null == b ? "": ("" + b).replace(K[a],
                function(b) {
                    return J[a][b]
                })
            }
        }),
        A.result = function(a, b) {
            if (null == a) return void 0;
            var c = a[b];
            return A.isFunction(c) ? c.call(a) : c
        },
        A.mixin = function(a) {
            B(A.functions(a),
            function(b) {
                var c = A[b] = a[b];
                A.prototype[b] = function() {
                    var a = [this._wrapped];
                    return j.apply(a, arguments),
                    P.call(this, c.apply(A, a))
                }
            })
        };
        var L = 0;
        A.uniqueId = function(a) {
            var b = ++L + "";
            return a ? a + b: b
        },
        A.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var M = /(.)^/,
        N = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        O = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        A.template = function(a, b, c) {
            var d;
            c = A.defaults({},
            c, A.templateSettings);
            var e = new RegExp([(c.escape || M).source, (c.interpolate || M).source, (c.evaluate || M).source].join("|") + "|$", "g"),
            f = 0,
            g = "__p+='";
            a.replace(e,
            function(b, c, d, e, h) {
                return g += a.slice(f, h).replace(O,
                function(a) {
                    return "\\" + N[a]
                }),
                c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"),
                d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"),
                e && (g += "';\n" + e + "\n__p+='"),
                f = h + b.length,
                b
            }),
            g += "';\n",
            c.variable || (g = "with(obj||{}){\n" + g + "}\n"),
            g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
            try {
                d = new Function(c.variable || "obj", "_", g)
            } catch(h) {
                throw h.source = g,
                h
            }
            if (b) return d(b, A);
            var i = function(a) {
                return d.call(this, a, A)
            };
            return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}",
            i
        },
        A.chain = function(a) {
            return A(a).chain()
        };
        var P = function(a) {
            return this._chain ? A(a).chain() : a
        };
        A.mixin(A),
        B(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        function(a) {
            var b = f[a];
            A.prototype[a] = function() {
                var c = this._wrapped;
                return b.apply(c, arguments),
                "shift" != a && "splice" != a || 0 !== c.length || delete c[0],
                P.call(this, c)
            }
        }),
        B(["concat", "join", "slice"],
        function(a) {
            var b = f[a];
            A.prototype[a] = function() {
                return P.call(this, b.apply(this._wrapped, arguments))
            }
        }),
        A.extend(A.prototype, {
            chain: function() {
                return this._chain = !0,
                this
            },
            value: function() {
                return this._wrapped
            }
        }),
        "function" == typeof define && define.amd && define("underscore", [],
        function() {
            return A
        })
    }).call(b)
});

define("class@2.0.5/lib/attrs", ["util@~1.0.0", "clone@~0.1.11"],
function(a, b) {
    "use strict";
    function c(a, b, c) {
        var d;
        2 === arguments.length && (c = !0);
        for (d in b) ! c && d in a || (a[d] = b[d]);
        return a
    }
    function d(a, b, c) {
        var d, e, g = !0;
        return b ? (b[p] ? g = !1 : (e = f(a, b, o), g = !e || e.call(a, c)), g && b[q] && (delete b[q], b[p] = !0), g && (d = f(a, b, n), b.value = d ? d.call(a, c) : c), g) : !1
    }
    function e(a, b) {
        var c = f(a, b, m),
        d = b.value;
        return c ? c.call(a, d) : d
    }
    function f(a, b, c) {
        var d = b[c];
        return "string" == typeof d ? a[d] : d
    }
    function g(a, b) {
        function c(a, c) {
            var d = b[c];
            return d ? e(a, d) : h
        }
        function f(a) {
            var d, e = b,
            f = {};
            for (d in e) f[d] = c(a, d, e);
            return f
        }
        function g(a, c) {
            b[a] || (b[a] = k.isObject(c) ? l(c) : {})
        }
        var h;
        a.set = function(a, c) {
            var e, f = !0;
            if (k.isObject(a)) {
                e = a;
                for (a in e) f = !!d(this, b[a], e[a]) && f
            } else f = !!d(this, b[a], c);
            return f
        },
        a.get = function(a) {
            return arguments.length ? c(this, a) : f(this)
        },
        a.addAttr = function(a, b) {
            if (k.isObject(a)) {
                var c;
                for (c in a) g(c, a[c])
            } else g(a, b)
        },
        a.removeAttr = function(a) {
            delete b[a]
        }
    }
    function h(a) {
        return function() {
            var b = i(this);
            return g(this, b),
            this[a].apply(this, arguments)
        }
    }
    function i(a) {
        var b = a[j.KEY];
        return b ? l(b) : {}
    }
    var j = b,
    k = a("util"),
    l = a("clone"),
    m = "getter",
    n = "setter",
    o = "validator",
    p = "readOnly",
    q = "writeOnce";
    j.KEY = "_ATTRS",
    j._mix = c;
    var r = j._EXT = {}; ["addAttr", "get", "set", "removeAttr"].forEach(function(a) {
        r[a] = h(a)
    }),
    j.patch = function(a, b) {
        "function" == typeof a && (a = a.prototype),
        c(a, r),
        j.set(a, b)
    },
    j.set = function(a, b) {
        "function" == typeof a && (a = a.prototype);
        var d = a[j.KEY];
        d && c(b, d, !1),
        a[j.KEY] = b
    }
}),
define("class@2.0.5/lib/events", ["events@~1.0.0", "underscore@~1.5.2"],
function(a, b) {
    "use strict";
    var c = a("events"),
    d = a("underscore");
    d.extend(b, c.prototype)
}),
define("class@2.0.5/index", ["clone@~0.1.11", "./lib/attrs", "util@~1.0.0", "underscore@~1.5.2", "./lib/events"],
function(a, b, c) {
    "use strict";
    function d(a) {
        var b;
        return a && (b = l.isObject(a) ? a: "string" == typeof a ? d(o[a.toLowerCase()]) : a.prototype),
        b
    }
    function e(a, b, c) {
        var e = d(b);
        e && m.extend(a, j(e), c)
    }
    function f(a, b, c) {
        "string" == typeof b && (b = b.trim().split(/\s+/)),
        l.isArray(b) || (b = [b]),
        b.forEach(function(a) {
            e(this, a, c)
        },
        a)
    }
    function g(a) {
        var b, c, d;
        for (c in a) if (c !== k.KEY) {
            if (b = a[c], l.isObject(b)) {
                var e = function() {};
                e.prototype = b,
                d = g(new e)
            } else d = j(b);
            a[c] = d
        }
        return a
    }
    function h(a, b) {
        if (this instanceof h) throw new Error("Class should not be used with `new`");
        if (l.isObject(a)) {
            var c = "Extends",
            d = a[c];
            return delete a[c],
            i(d, a, b)
        }
        var d = l.isFunction(a) ? a: function() {};
        return b && k.set(d, b),
        d
    }
    function i(a, b, c) {
        function d() {
            var a = i;
            return g(this),
            a ? a.apply(this, arguments) : void 0
        }
        var e, h = "Implements",
        i = b[n] || a,
        j = b[h];
        if (delete b[n], delete b[h], a) {
            var l = function() {};
            l.prototype = a.prototype,
            e = new l,
            j && f(e, j, !0),
            d.super_ = a,
            m.extend(e, b)
        } else e = b,
        j && f(e, j, !1);
        return d.prototype = e,
        e.constructor = d,
        c && k.set(d, c),
        d
    }
    var j = a("clone"),
    k = a("./lib/attrs"),
    l = a("util"),
    m = a("underscore"),
    n = "initialize",
    o = {};
    h.EXTS = o,
    c.exports = h,
    h.EXTS.attrs = k._EXT,
    h.EXTS.events = a("./lib/events")
},
{
    main: !0
});

!
function() {
    var n = "mbase-css@1.1.1/index.js",
    i = {},
    a = i;
    define(n, [],
    function(n, i, a, e, s) {},
    {
        main: !0,
        map: a
    })
} ();
//# sourceMappingURL=mbase-css.js.map
!
function() {
    function e(e, t) {
        for (var n in t) e[n] = t[n];
        return e
    }
    var t = "app-map-datashow@0.1.8/entries/index.js",
    n = "app-map-datashow@0.1.8/entries/jquery.js",
    i = "app-map-datashow@0.1.8/entries/main.js",
    r = "app-map-datashow@0.1.8/entries/module/purl.js",
    a = "app-map-datashow@0.1.8/entries/module/search.js",
    o = "app-map-datashow@0.1.8/entries/module/searchnew.js",
    c = "app-map-datashow@0.1.8/entries/module/selectpanel.js",
    s = "app-map-datashow@0.1.8/entries/module/sidebar.js",
    l = "app-map-datashow@0.1.8/entries/module/svgchart.js",
    u = "app-map-datashow@0.1.8/entries/module/svgchart.origin.js",
    d = "app-map-datashow@0.1.8/entries/page/charts.js",
    p = "app-map-datashow@0.1.8/entries/page/index.js",
    f = "app-map-datashow@0.1.8/entries/page/rankingpage.js",
    m = "app-map-datashow@0.1.8/entries/page/searchmain.js",
    h = "app-map-datashow@0.1.8/entries/random.js",
    g = "app-map-datashow@0.1.8/entries/share.js",
    v = "app-map-datashow@0.1.8/entries/time.js",
    y = [t, n, i, r, a, o, c, s, l, u, d, p, f, m, h, g, v],
    N = {},
    x = N;
    define(i, [n, r, v, h, g],
    function(e, t, n, i, r) {
        function a() {
            _.initShare(),
            C || (C = 0),
            k || (k = ""),
            u(C, k),
            c(A(".map.p" + C)),
            g(),
            p(),
            v(),
            y(),
            l(A("#Map_" + C + " area, .map.p" + C + " a")),
            k ? (A("#infrank").hide(), A("#infors").show()) : (H.randomInit(C), A("#infors").hide(), A("#infrank").show()),
            "fun" == E ? (A("body").addClass("wan"), A(".tabnav li").eq(1).addClass("cur")) : "food" == E && A(".tabnav li").eq(0).addClass("cur"),
            A("aside .tab li").on("click",
            function() {
                A(this).hasClass("cur") || (A("aside .tab li").removeClass("cur"), A(this).addClass("cur"), S = 0 == A(this).index() ? "item": "price", N(), x())
            }),
            A(".tabnav li").on("click",
            function() {
                A(this).hasClass("cur") || (A(".tabnav li").removeClass("cur"), A(this).addClass("cur"), 0 == A(this).index() ? (E = "food", A("body").removeClass("wan")) : (E = "fun", A("body").addClass("wan")), o(), S = "item", N(), k ? I() : b(), x())
            })
        }
        function o() {
            clearTimeout(j),
            clearTimeout(D),
            A("aside .tab li").removeClass("cur").eq(0).addClass("cur"),
            A(".timeline li.icon").removeClass("cur"),
            A(".timeline li.icon:eq(6)").addClass("cur"),
            g(),
            v()
        }
        function c(e) {
            var t = e;
            A("#mapContainer");
            t.find("area, a.mapPos").on("click",
            function() {
                var e = A(this),
                n = e.index(),
                i = t.find("area").eq(n);
                0 == C ? s(i.attr("pid"), i.attr("cid")) : s(C, i.attr("cid"))
            })
        }
        function s(e, t) {
            clearTimeout(D),
            C = e && 0 != e ? e: "",
            k = t && 0 != t ? t: "";
            var n = location.origin + location.pathname + "?pid=" + C + "&cid=" + k + "&category=" + E;
            location.href = n
        }
        function l(e) {
            A("area, .mapArea a").off("mouseenter"),
            A("area, .mapArea a").off("mouseleave"),
            e.on({
                mouseenter: function() {
                    clearTimeout(L),
                    H.stopRandom();
                    var e = A(this).index();
                    if (A(".mapArea a").removeClass("hover").removeAttr("style"), A(".map.p" + C + " a:eq(" + e + ")").addClass("hover").css({
                        display: "inline",
                        opacity: 1
                    }), "China" == A(".mapArea").attr("name")) {
                        var t = A(".p0 img").attr("src"),
                        n = t.substr(0, t.indexOf("china")) + "china" + (A(this).index() + 1) + ".png";
                        A(".p0 img").attr("src", n)
                    }
                },
                mouseleave: function() {
                    var e = A(this).index();
                    if (A(".map.p" + C + " a:eq(" + e + ")").removeClass("hover").removeAttr("style"), L = k ? setTimeout(function() {
                        d()
                    },
                    800) : setTimeout(function() {
                        H.randomInit(C)
                    },
                    800), "China" == A(".mapArea").attr("name")) {
                        var t = A(".p0 img").attr("src"),
                        n = t.substr(0, t.indexOf("china")) + "china.png";
                        A(".p0 img").attr("src", n)
                    }
                }
            })
        }
        function u(e, t) {
            A(".map").hide();
            var n = A("#mapContainer").find(".p" + e),
            i = n.show().attr("title");
            A(".mapArea").attr("name", i),
            d()
        }
        function d() {
            if (k) {
                var e = A("#Map_" + C + ' area[cid="' + k + '"]').index();
                A("#mapContainer").find(".p" + C + " a").eq(e).addClass("hover").css({
                    display: "inline",
                    opacity: 1
                })
            }
        }
        function p() {
            var e = W,
            t = "全国版";
            A(".citylist .cityUl");
            0 != C && (e = W[C - 1], t = e.pName, k && (t = A('area[cid="' + k + '"]').attr("title")), 1 == e.cList.length && (e = W)),
            A("#citybtn").text(t),
            m(e),
            h(),
            f()
        }
        function f() {
            A(".citylist a").off("click"),
            A(".citylist a").on("click",
            function() {
                var e = A(this);
                e.hasClass("active") || (e.attr("cid") ? s(e.attr("pid"), e.attr("cid")) : (e.parent(".citytit").length ? cityLists = W: cityLists = W[e.attr("pid") - 1], m(cityLists)))
            })
        }
        function m(e) {
            var t, n = e;
            e.cList && (t = e.pId, n = e.cList);
            var i = A(".citylist .cityUl");
            if (i.empty(), t ? (n.length > 1 && i.append('<li><a pid="' + t + '" cid="0">全省</a></li>'), A(".citylist .citytit").empty().append("<a>&lt; 所有省份</a>")) : A(".citylist .citytit").empty().append('<a pid="0" cid="0">全国</a>'), A.each(n,
            function(e, n) {
                var r = n,
                a = r.pId,
                o = r.pName,
                c = "";
                a ? (c = '<li><a pid="' + a + '">' + o + "</a></li>", r.cList && 1 == r.cList.length && (c = '<li><a pid="' + a + '" cid="' + r.cList[0].cId + '">' + o + "</a></li>")) : (a = r.cId, o = r.cName, c = '<li><a pid="' + t + '" cid="' + a + '">' + o + "</a></li>"),
                i.append(c)
            }), t == C) {
                var r = k ? k: 0;
                A('.citylist a[cid="' + r + '"]').addClass("active")
            } else t || C && 0 != C || k ? t || 0 == C || A('.citylist a[cid="' + k + '"]').addClass("active") : A(".citylist .citytit a").addClass("active");
            f()
        }
        function h() {
            var e;
            A("nav .citylist").on({
                mouseenter: function() {
                    clearTimeout(e),
                    A("nav .provincebox").slideDown(600)
                },
                mouseleave: function() {
                    e = setTimeout(function() {
                        A("nav .provincebox").slideUp(600)
                    },
                    400)
                }
            })
        }
        function g() {
            T = new Date;
            var e;
            T.getHours() > 6 && T.getHours() < 23 ? (e = q.setFormat("hh:mm:ss", T), P = "realtime") : (e = q.setFormat("YYYY-MM-DD", T), P = "realtime"),
            A("#main .countDown").html(e),
            j = setTimeout(g, 1e3)
        }
        function v() {
            D && clearTimeout(D),
            w("map", P),
            k ? w("rec", P) : w("list", P),
            "history" != P && (D = setTimeout(v, 3e3))
        }
        function y() {
            A.each(A(".timeline li.icon"),
            function(e, t) {
                var n = new Date(new Date - 864e5 * (6 - e));
                6 == e ? A(t).text("今天").data("date", n) : A(t).text(q.setFormat("MM.DD", n)).data("date", n)
            }),
            A(".timeline li").on("click",
            function() {
                clearTimeout(j),
                clearTimeout(D),
                A(this).hasClass("cur") || (A(".nav li").removeClass("cur"), A(this).addClass("cur"), 6 == A(this).index() ? (g(), v()) : (T = A(this).data("date"), A("#main .countDown").html(q.setFormat("YYYY-MM-DD", T)), P = "history", v()))
            })
        }
        function N() {
            var e = O[E][S];
            if (e) {
                return;//
                var t = e.list;
                A("aside .lib ul").hide();
                var n = A("#main").find("ul." + S),
                i = A("#main .mainDes"),
                r = A("#main .subDes");
                n.show().empty();
                var a, o, c, s, l, u, d, p, f, m, h;
                if (p = t[0].number, f = t[0].name, m = O[E].avgprice, h = A(".mapArea").attr("name"), "China" == h && (h = "国"), k) {
                    var g = O[E];
                    A("#main aside").addClass("city").find(".sum").show(),
                    A("aside .tab li:eq(1)").remove();
                    var v = A("#main aside .sum");
                    "food" == E ? v.find(".avg_tit").text("一顿饭人均消费：") : "fun" == E && v.find(".avg_tit").text("玩一次人均消费："),
                    v.find(".avg_num").text("￥" + g.avgprice),
                    v.find(".rank_p").text(g.prank),
                    v.find(".rank_t").text(g.rank)
                }
                var y = "超过<span>" + p;
                for (100 > p && (y = "小于<span>100"), "food" == E ? "item" == S ? (i.html("当前设备数:<span>" + "170" + "</span>"), r.html(y + "</span>人关注").show(), A("aside .tab li:eq(0)").text("省设备排行")) : "price" == S && (i.html(h + "人一顿饭的平均花费:<span>￥" + m + "</span>"), r.hide()) : "fun" == E && ("item" == S ? (i.html("当前最热:<span>" + f + "</span>"), r.html(y + "</span>人关注").show(), A("aside .tab li:eq(0)").text("最热玩法排行")) : "price" == S && (i.html(h + "人玩一次的平均花费:<span>￥" + m + "</span>"), r.hide())), d = [], o = t.length, o > 10 && (o = 10), a = 0; o > a; a++) c = t[a],
                u = c.number,
                l = u / p,
                "price" == S && (u = "￥" + u),
                s = '<li class="l' + (a + 1) + '"><span class="num">' + (a + 1) + '</span><span class="tit">' + c.name + '</span><span class="centline"><span class="l" style="width:' + 100 * l + '%"><span class="r">' + u + "</span></span></span></a></li>",
                d.push(n.append(s))
            }
        }
        function x() {
            var e = O[E][S];
            return;//chenfw
            if (e) {
                var t = e.mappoints,
                n = [],
                i = A(".map.p" + C);
                i.children("a").children("div").empty(),
                k && R[E][S].mappoints.length && (n = t, t = R[E][S].mappoints);
                var r, a, o, c, s, l, u, d = t.length;
                for (r = 0; d > r; r++) {
                    a = t[r],
                    c = a.provinceid,
                    s = "pid",
                    c || (c = a.cityid, s = "cid"),
                    n.length && a.cityid == n[0].cityid && void 0 != n[0].cityid && (a = n[0]);
                    var p = i.find("area[" + s + '="' + c + '"]').index();
                    if (p >= 0) {
                        var f = i.children("a").eq(p);
                        "item" == S ? (l = a.number, u = a.name, o = "<strong>" + u + "</strong><p><span>" + l + "</span>人关注</p><em></em>") : "price" == S && (l = f.attr("title"), u = a.number, o = "<p><span>" + l + "</span>人均消费</p><strong>￥" + u + "</strong><em></em>"),
                        f.children("div").append(o)
                    }
                }
            }
        }
        function b() {
            var e = F[E].price.list;
            if (e) {
                var t = e.length,
                n = A("#infrank .infrankhead"),
                i = A("#infrank .inf-td3"),
                r = "全国",
                a = A("#mapContainer"),
                o = A("#infrank .infrankcon ul");
                o.empty(),
                0 != C && (r = a.find(".map.p" + C).attr("title")),
                "food" == E ? (n.text(r + "吃饭消费排行榜"), i.text("最火爆菜品")) : "fun" == E && (n.text(r + "休闲娱乐消费排行榜"), i.text("最流行玩法"));
                var c, s, l, u;
                for (c = 0; t > c; c++) l = e[c],
                u = "",
                A(l.topitems.split(";")).each(function(e, t) {
                    u += t + " "
                }),
                s = '<li class="top' + (c + 1) + '"><a><div class="field-num">' + (c + 1) + '</div><div class="field-name">' + l.name + '</div><div class="field-sale">￥' + l.number + '</div><div class="field-ff">' + u + "</div></a></li>",
                o.append(s)
            }
        }
        function I() {
            var e = B[E].recshop.list;
            if (e) {
                var t = e.length,
                n = A('<div class="rtbox"><div class="rtbox-left"><div class="rtbox-tit icon"></div><div class="rtbox-img"><img src="" width="264" height="194"></div></div><div class="rtbox-right"><div class="rtbox-inf"></div><ul></ul></div></div>'),
                i = '<div class="rtbox-line"></div>',
                r = A("#infors div");
                r.empty();
                var a, o, c, s;
                for (k && (s = A("#Map_" + C).find('area[cid="' + k + '"]').attr("title")), a = 0; t > a; a++) {
                    o = e[a],
                    c = o.shops;
                    var l = n.clone();
                    l.addClass("rtbox" + (a + 1)).find(".rtbox-tit").html("<i>" + (a + 1) + "</i>" + o.name),
                    a % 2 != 0 && l.addClass("gright");
                    var u = c[0].img; ! u && t > 1 && (u = c[1].img),
                    l.find(".rtbox-img img").attr("src", u),
                    l.find(".rtbox-inf").text(s + o.name + "哪家火");
                    for (var d = l.find("ul"), p = 0; p < c.length; p++) {
                        var f, m = c[p];
                        if (m.shopid && 0 != m.shopid) {
                            var h = "http://www.dianping.com/shop/" + m.shopid,
                            g = m.avgprice;
                            g = g > 0 ? "￥" + g: "-",
                            f = '<li class="l' + (p + 1) + '"><a href="' + h + '" target="_blank"><span class="s1">' + (p + 1) + '</span><span class="s2">' + m.name + '</span><span class="s3">' + m.bizdistrict + '</span><span class="s4">人均 ' + g + "</span></a></li>"
                        } else f = '<li class="l' + (p + 1) + '"><span class="s1">' + (p + 1) + '</span><span class="s2">暂无</span></li>';
                        d.append(f)
                    }
                    0 != a && r.append(i),
                    r.append(l)
                }
            }
        }
        function w(e, t, n) {
            var i = C; (0 == C || "" != k) && (i = "");
            var r = {
                time: q.setFormat("YYYYMMDDhhmmss", T),
                provinceid: i,
                cityid: k,
                page: e,
                cache: t
            };
            n && (r.provinceid = n.pid, r.cityid = n.cid);
            var a = "http://visualization.dianping.com/search/visulization?";
            location.host.indexOf("51ping") > 0 && (a = "http://10.2.2.52:8080/search/visulization?"),
            A.ajax({
                type: "GET",
                url: a,
                dataType: "jsonp",
                data: r,
                success: function(t) {
                    if (200 == t.code) if (n) R = t,
                    x();
                    else switch (e) {
                    case "map":
                        if (O = t, N(), k) {
                            var i = {
                                pid: C,
                                cid: ""
                            };
                            w("map", P, i)
                        } else x();
                        break;
                    case "list":
                        F = t,
                        b();
                        break;
                    case "rec":
                        B = t,
                        I();
                        break;
                    default:
                        console.error("page not found")
                    } else console.log(t.err_msg)
                },
                error: function() {
                    console.log("get json error")
                }
            })
        }
        var T, C, k, E, S, L, j, D, A = e("./jquery.js"),
        q = e("./time"),
        H = e("./random"),
        _ = e("./share"),
        M = (e("./module/purl.js"), {}),
        O = {},
        F = {},
        B = {},
        R = {},
        W = [{
            pId: "1",
            pName: "北京",
            cList: [{
                cId: "2",
                cName: "北京"
            }]
        },
        {
            pId: "2",
            pName: "天津",
            cList: [{
                cId: "10",
                cName: "天津"
            }]
        },
        {
            pId: "3",
            pName: "河北",
            cList: [{
                cId: "24",
                cName: "石家庄"
            },
            {
                cId: "25",
                cName: "唐山"
            },
            {
                cId: "26",
                cName: "秦皇岛"
            },
            {
                cId: "27",
                cName: "邯郸"
            },
            {
                cId: "28",
                cName: "邢台"
            },
            {
                cId: "29",
                cName: "保定"
            },
            {
                cId: "30",
                cName: "张家口"
            },
            {
                cId: "31",
                cName: "承德"
            },
            {
                cId: "32",
                cName: "沧州"
            },
            {
                cId: "33",
                cName: "廊坊"
            },
            {
                cId: "34",
                cName: "衡水"
            }]
        },
        {
            pId: "4",
            pName: "山西",
            cList: [{
                cId: "35",
                cName: "太原"
            },
            {
                cId: "36",
                cName: "大同"
            },
            {
                cId: "37",
                cName: "阳泉"
            },
            {
                cId: "38",
                cName: "长治"
            },
            {
                cId: "39",
                cName: "晋城"
            },
            {
                cId: "40",
                cName: "朔州"
            },
            {
                cId: "41",
                cName: "晋中"
            },
            {
                cId: "42",
                cName: "运城"
            },
            {
                cId: "43",
                cName: "忻州"
            },
            {
                cId: "44",
                cName: "临汾"
            },
            {
                cId: "45",
                cName: "吕梁"
            }]
        },
        {
            pId: "5",
            pName: "内蒙古",
            cList: [{
                cId: "46",
                cName: "呼和浩特"
            },
            {
                cId: "47",
                cName: "包头"
            },
            {
                cId: "48",
                cName: "乌海"
            },
            {
                cId: "49",
                cName: "赤峰"
            },
            {
                cId: "50",
                cName: "通辽"
            },
            {
                cId: "51",
                cName: "鄂尔多斯"
            },
            {
                cId: "52",
                cName: "呼伦贝尔"
            },
            {
                cId: "53",
                cName: "兴安盟"
            },
            {
                cId: "54",
                cName: "锡林郭勒"
            },
            {
                cId: "55",
                cName: "乌兰察布"
            },
            {
                cId: "56",
                cName: "巴彦淖尔"
            },
            {
                cId: "57",
                cName: "阿拉善"
            }]
        },
        {
            pId: "6",
            pName: "辽宁",
            cList: [{
                cId: "18",
                cName: "沈阳"
            },
            {
                cId: "19",
                cName: "大连"
            },
            {
                cId: "58",
                cName: "鞍山"
            },
            {
                cId: "59",
                cName: "抚顺"
            },
            {
                cId: "60",
                cName: "本溪"
            },
            {
                cId: "61",
                cName: "丹东"
            },
            {
                cId: "62",
                cName: "锦州"
            },
            {
                cId: "63",
                cName: "营口"
            },
            {
                cId: "64",
                cName: "阜新"
            },
            {
                cId: "65",
                cName: "辽阳"
            },
            {
                cId: "66",
                cName: "盘锦"
            },
            {
                cId: "67",
                cName: "铁岭"
            },
            {
                cId: "68",
                cName: "朝阳"
            },
            {
                cId: "69",
                cName: "葫芦岛"
            }]
        },
        {
            pId: "7",
            pName: "吉林",
            cList: [{
                cId: "70",
                cName: "长春"
            },
            {
                cId: "71",
                cName: "吉林"
            },
            {
                cId: "72",
                cName: "四平"
            },
            {
                cId: "73",
                cName: "辽源"
            },
            {
                cId: "74",
                cName: "通化"
            },
            {
                cId: "75",
                cName: "白山"
            },
            {
                cId: "76",
                cName: "松原"
            },
            {
                cId: "77",
                cName: "白城"
            },
            {
                cId: "78",
                cName: "延边"
            }]
        },
        {
            pId: "8",
            pName: "黑龙江",
            cList: [{
                cId: "79",
                cName: "哈尔滨"
            },
            {
                cId: "80",
                cName: "齐齐哈尔"
            },
            {
                cId: "81",
                cName: "鸡西"
            },
            {
                cId: "82",
                cName: "鹤岗"
            },
            {
                cId: "83",
                cName: "双鸭山"
            },
            {
                cId: "84",
                cName: "大庆"
            },
            {
                cId: "85",
                cName: "伊春"
            },
            {
                cId: "86",
                cName: "佳木斯"
            },
            {
                cId: "87",
                cName: "七台河"
            },
            {
                cId: "88",
                cName: "牡丹江"
            },
            {
                cId: "89",
                cName: "黑河"
            },
            {
                cId: "90",
                cName: "绥化"
            },
            {
                cId: "91",
                cName: "大兴安岭"
            }]
        },
        {
            pId: "9",
            pName: "上海",
            cList: [{
                cId: "1",
                cName: "上海"
            }]
        },
        {
            pId: "10",
            pName: "江苏",
            cList: [{
                cId: "5",
                cName: "南京"
            },
            {
                cId: "6",
                cName: "苏州"
            },
            {
                cId: "12",
                cName: "扬州"
            },
            {
                cId: "13",
                cName: "无锡"
            },
            {
                cId: "92",
                cName: "徐州"
            },
            {
                cId: "93",
                cName: "常州"
            },
            {
                cId: "94",
                cName: "南通"
            },
            {
                cId: "95",
                cName: "连云港"
            },
            {
                cId: "96",
                cName: "淮安"
            },
            {
                cId: "97",
                cName: "盐城"
            },
            {
                cId: "98",
                cName: "镇江"
            },
            {
                cId: "99",
                cName: "泰州"
            },
            {
                cId: "100",
                cName: "宿迁"
            }]
        },
        {
            pId: "11",
            pName: "浙江",
            cList: [{
                cId: "3",
                cName: "杭州"
            },
            {
                cId: "11",
                cName: "宁波"
            },
            {
                cId: "101",
                cName: "温州"
            },
            {
                cId: "102",
                cName: "嘉兴"
            },
            {
                cId: "103",
                cName: "湖州"
            },
            {
                cId: "104",
                cName: "绍兴"
            },
            {
                cId: "105",
                cName: "金华"
            },
            {
                cId: "106",
                cName: "衢州"
            },
            {
                cId: "107",
                cName: "舟山"
            },
            {
                cId: "108",
                cName: "台州"
            },
            {
                cId: "109",
                cName: "丽水"
            }]
        },
        {
            pId: "12",
            pName: "安徽",
            cList: [{
                cId: "110",
                cName: "合肥"
            },
            {
                cId: "111",
                cName: "芜湖"
            },
            {
                cId: "112",
                cName: "蚌埠"
            },
            {
                cId: "113",
                cName: "淮南"
            },
            {
                cId: "114",
                cName: "马鞍山"
            },
            {
                cId: "115",
                cName: "淮北"
            },
            {
                cId: "116",
                cName: "铜陵"
            },
            {
                cId: "117",
                cName: "安庆"
            },
            {
                cId: "118",
                cName: "黄山"
            },
            {
                cId: "119",
                cName: "滁州"
            },
            {
                cId: "120",
                cName: "阜阳"
            },
            {
                cId: "121",
                cName: "宿州"
            },
            {
                cId: "123",
                cName: "六安"
            },
            {
                cId: "124",
                cName: "亳州"
            },
            {
                cId: "125",
                cName: "池州"
            },
            {
                cId: "126",
                cName: "宣城"
            }]
        },
        {
            pId: "13",
            pName: "福建",
            cList: [{
                cId: "14",
                cName: "福州"
            },
            {
                cId: "15",
                cName: "厦门"
            },
            {
                cId: "127",
                cName: "莆田"
            },
            {
                cId: "128",
                cName: "三明"
            },
            {
                cId: "129",
                cName: "泉州"
            },
            {
                cId: "130",
                cName: "漳州"
            },
            {
                cId: "131",
                cName: "南平"
            },
            {
                cId: "132",
                cName: "龙岩"
            },
            {
                cId: "133",
                cName: "宁德"
            }]
        },
        {
            pId: "14",
            pName: "江西",
            cList: [{
                cId: "134",
                cName: "南昌"
            },
            {
                cId: "135",
                cName: "景德镇"
            },
            {
                cId: "136",
                cName: "萍乡"
            },
            {
                cId: "137",
                cName: "九江"
            },
            {
                cId: "138",
                cName: "新余"
            },
            {
                cId: "139",
                cName: "鹰潭"
            },
            {
                cId: "140",
                cName: "赣州"
            },
            {
                cId: "141",
                cName: "吉安"
            },
            {
                cId: "142",
                cName: "宜春"
            },
            {
                cId: "143",
                cName: "抚州"
            },
            {
                cId: "144",
                cName: "上饶"
            }]
        },
        {
            pId: "15",
            pName: "山东",
            cList: [{
                cId: "21",
                cName: "青岛"
            },
            {
                cId: "22",
                cName: "济南"
            },
            {
                cId: "145",
                cName: "淄博"
            },
            {
                cId: "146",
                cName: "枣庄"
            },
            {
                cId: "147",
                cName: "东营"
            },
            {
                cId: "148",
                cName: "烟台"
            },
            {
                cId: "149",
                cName: "潍坊"
            },
            {
                cId: "150",
                cName: "济宁"
            },
            {
                cId: "151",
                cName: "泰安"
            },
            {
                cId: "152",
                cName: "威海"
            },
            {
                cId: "153",
                cName: "日照"
            },
            {
                cId: "154",
                cName: "莱芜"
            },
            {
                cId: "155",
                cName: "临沂"
            },
            {
                cId: "156",
                cName: "德州"
            },
            {
                cId: "157",
                cName: "聊城"
            },
            {
                cId: "158",
                cName: "滨州"
            },
            {
                cId: "159",
                cName: "菏泽"
            }]
        },
        {
            pId: "16",
            pName: "河南",
            cList: [{
                cId: "160",
                cName: "郑州"
            },
            {
                cId: "161",
                cName: "开封"
            },
            {
                cId: "162",
                cName: "洛阳"
            },
            {
                cId: "163",
                cName: "平顶山"
            },
            {
                cId: "164",
                cName: "安阳"
            },
            {
                cId: "165",
                cName: "鹤壁"
            },
            {
                cId: "166",
                cName: "新乡"
            },
            {
                cId: "167",
                cName: "焦作"
            },
            {
                cId: "168",
                cName: "濮阳"
            },
            {
                cId: "169",
                cName: "许昌"
            },
            {
                cId: "170",
                cName: "漯河"
            },
            {
                cId: "171",
                cName: "三门峡"
            },
            {
                cId: "172",
                cName: "南阳"
            },
            {
                cId: "173",
                cName: "商丘"
            },
            {
                cId: "174",
                cName: "信阳"
            },
            {
                cId: "175",
                cName: "周口"
            },
            {
                cId: "176",
                cName: "驻马店"
            },
            {
                cId: "397",
                cName: "济源"
            }]
        },
        {
            pId: "17",
            pName: "湖北",
            cList: [{
                cId: "16",
                cName: "武汉"
            },
            {
                cId: "177",
                cName: "黄石"
            },
            {
                cId: "178",
                cName: "十堰"
            },
            {
                cId: "179",
                cName: "宜昌"
            },
            {
                cId: "180",
                cName: "襄阳"
            },
            {
                cId: "181",
                cName: "鄂州"
            },
            {
                cId: "182",
                cName: "荆门"
            },
            {
                cId: "183",
                cName: "孝感"
            },
            {
                cId: "184",
                cName: "荆州"
            },
            {
                cId: "185",
                cName: "黄冈"
            },
            {
                cId: "186",
                cName: "咸宁"
            },
            {
                cId: "187",
                cName: "随州"
            },
            {
                cId: "188",
                cName: "恩施州"
            },
            {
                cId: "189",
                cName: "仙桃"
            },
            {
                cId: "190",
                cName: "潜江"
            },
            {
                cId: "191",
                cName: "天门"
            },
            {
                cId: "404",
                cName: "神农架"
            }]
        },
        {
            pId: "18",
            pName: "湖南",
            cList: [{
                cId: "192",
                cName: "株洲"
            },
            {
                cId: "193",
                cName: "湘潭"
            },
            {
                cId: "194",
                cName: "衡阳"
            },
            {
                cId: "195",
                cName: "邵阳"
            },
            {
                cId: "196",
                cName: "岳阳"
            },
            {
                cId: "197",
                cName: "常德"
            },
            {
                cId: "198",
                cName: "张家界"
            },
            {
                cId: "199",
                cName: "益阳"
            },
            {
                cId: "200",
                cName: "郴州"
            },
            {
                cId: "201",
                cName: "永州"
            },
            {
                cId: "202",
                cName: "怀化"
            },
            {
                cId: "203",
                cName: "娄底"
            },
            {
                cId: "204",
                cName: "湘西"
            },
            {
                cId: "344",
                cName: "长沙"
            }]
        },
        {
            pId: "19",
            pName: "广东",
            cList: [{
                cId: "4",
                cName: "广州"
            },
            {
                cId: "7",
                cName: "深圳"
            },
            {
                cId: "205",
                cName: "韶关"
            },
            {
                cId: "206",
                cName: "珠海"
            },
            {
                cId: "207",
                cName: "汕头"
            },
            {
                cId: "208",
                cName: "佛山"
            },
            {
                cId: "209",
                cName: "江门"
            },
            {
                cId: "210",
                cName: "湛江"
            },
            {
                cId: "211",
                cName: "茂名"
            },
            {
                cId: "212",
                cName: "肇庆"
            },
            {
                cId: "213",
                cName: "惠州"
            },
            {
                cId: "214",
                cName: "梅州"
            },
            {
                cId: "215",
                cName: "汕尾"
            },
            {
                cId: "216",
                cName: "河源"
            },
            {
                cId: "217",
                cName: "阳江"
            },
            {
                cId: "218",
                cName: "清远"
            },
            {
                cId: "219",
                cName: "东莞"
            },
            {
                cId: "220",
                cName: "中山"
            },
            {
                cId: "221",
                cName: "潮州"
            },
            {
                cId: "222",
                cName: "揭阳"
            },
            {
                cId: "223",
                cName: "云浮"
            }]
        },
        {
            pId: "20",
            pName: "广西",
            cList: [{
                cId: "224",
                cName: "南宁"
            },
            {
                cId: "225",
                cName: "柳州"
            },
            {
                cId: "226",
                cName: "桂林"
            },
            {
                cId: "227",
                cName: "梧州"
            },
            {
                cId: "228",
                cName: "北海"
            },
            {
                cId: "229",
                cName: "防城港"
            },
            {
                cId: "230",
                cName: "钦州"
            },
            {
                cId: "231",
                cName: "贵港"
            },
            {
                cId: "232",
                cName: "玉林"
            },
            {
                cId: "233",
                cName: "百色"
            },
            {
                cId: "234",
                cName: "贺州"
            },
            {
                cId: "235",
                cName: "河池"
            },
            {
                cId: "394",
                cName: "崇左"
            },
            {
                cId: "398",
                cName: "来宾"
            }]
        },
        {
            pId: "21",
            pName: "海南",
            cList: [{
                cId: "23",
                cName: "海口"
            },
            {
                cId: "345",
                cName: "三亚"
            },
            {
                cId: "358",
                cName: "儋州"
            },
            {
                cId: "390",
                cName: "白沙"
            },
            {
                cId: "391",
                cName: "保亭"
            },
            {
                cId: "392",
                cName: "昌江"
            },
            {
                cId: "393",
                cName: "澄迈"
            },
            {
                cId: "395",
                cName: "定安"
            },
            {
                cId: "396",
                cName: "东方"
            },
            {
                cId: "399",
                cName: "乐东"
            },
            {
                cId: "400",
                cName: "临高"
            },
            {
                cId: "401",
                cName: "陵水"
            },
            {
                cId: "402",
                cName: "琼海"
            },
            {
                cId: "406",
                cName: "屯昌"
            },
            {
                cId: "407",
                cName: "万宁"
            },
            {
                cId: "408",
                cName: "文昌"
            },
            {
                cId: "410",
                cName: "五指山"
            }]
        },
        {
            pId: "22",
            pName: "重庆",
            cList: [{
                cId: "9",
                cName: "重庆"
            }]
        },
        {
            pId: "23",
            pName: "四川",
            cList: [{
                cId: "8",
                cName: "成都"
            },
            {
                cId: "238",
                cName: "自贡"
            },
            {
                cId: "239",
                cName: "攀枝花"
            },
            {
                cId: "240",
                cName: "泸州"
            },
            {
                cId: "241",
                cName: "德阳"
            },
            {
                cId: "242",
                cName: "绵阳"
            },
            {
                cId: "243",
                cName: "广元"
            },
            {
                cId: "244",
                cName: "遂宁"
            },
            {
                cId: "245",
                cName: "内江"
            },
            {
                cId: "246",
                cName: "乐山"
            },
            {
                cId: "247",
                cName: "南充"
            },
            {
                cId: "248",
                cName: "眉山"
            },
            {
                cId: "249",
                cName: "宜宾"
            },
            {
                cId: "250",
                cName: "广安"
            },
            {
                cId: "251",
                cName: "达州"
            },
            {
                cId: "252",
                cName: "雅安"
            },
            {
                cId: "253",
                cName: "巴中"
            },
            {
                cId: "254",
                cName: "资阳"
            },
            {
                cId: "255",
                cName: "阿坝"
            },
            {
                cId: "256",
                cName: "甘孜州"
            },
            {
                cId: "257",
                cName: "凉山"
            }]
        },
        {
            pId: "24",
            pName: "贵州",
            cList: [{
                cId: "258",
                cName: "贵阳"
            },
            {
                cId: "259",
                cName: "六盘水"
            },
            {
                cId: "260",
                cName: "遵义"
            },
            {
                cId: "261",
                cName: "安顺"
            },
            {
                cId: "262",
                cName: "铜仁"
            },
            {
                cId: "263",
                cName: "黔西南"
            },
            {
                cId: "264",
                cName: "毕节"
            },
            {
                cId: "265",
                cName: "黔东南"
            },
            {
                cId: "266",
                cName: "黔南"
            }]
        },
        {
            pId: "25",
            pName: "云南",
            cList: [{
                cId: "267",
                cName: "昆明"
            },
            {
                cId: "268",
                cName: "曲靖"
            },
            {
                cId: "269",
                cName: "玉溪"
            },
            {
                cId: "270",
                cName: "保山"
            },
            {
                cId: "271",
                cName: "昭通"
            },
            {
                cId: "272",
                cName: "楚雄州"
            },
            {
                cId: "273",
                cName: "红河"
            },
            {
                cId: "274",
                cName: "文山州"
            },
            {
                cId: "275",
                cName: "普洱"
            },
            {
                cId: "276",
                cName: "西双版纳"
            },
            {
                cId: "277",
                cName: "大理"
            },
            {
                cId: "278",
                cName: "德宏"
            },
            {
                cId: "279",
                cName: "丽江"
            },
            {
                cId: "280",
                cName: "怒江"
            },
            {
                cId: "281",
                cName: "迪庆"
            },
            {
                cId: "282",
                cName: "临沧"
            }]
        },
        {
            pId: "26",
            pName: "西藏",
            cList: [{
                cId: "283",
                cName: "拉萨"
            },
            {
                cId: "284",
                cName: "昌都"
            },
            {
                cId: "285",
                cName: "山南"
            },
            {
                cId: "286",
                cName: "日喀则"
            },
            {
                cId: "287",
                cName: "那曲"
            },
            {
                cId: "288",
                cName: "阿里"
            },
            {
                cId: "289",
                cName: "林芝"
            }]
        },
        {
            pId: "27",
            pName: "陕西",
            cList: [{
                cId: "17",
                cName: "西安"
            },
            {
                cId: "290",
                cName: "铜川"
            },
            {
                cId: "291",
                cName: "宝鸡"
            },
            {
                cId: "292",
                cName: "咸阳"
            },
            {
                cId: "293",
                cName: "渭南"
            },
            {
                cId: "294",
                cName: "延安"
            },
            {
                cId: "295",
                cName: "汉中"
            },
            {
                cId: "296",
                cName: "榆林"
            },
            {
                cId: "297",
                cName: "安康"
            },
            {
                cId: "298",
                cName: "商洛"
            }]
        },
        {
            pId: "28",
            pName: "甘肃",
            cList: [{
                cId: "299",
                cName: "兰州"
            },
            {
                cId: "300",
                cName: "嘉峪关"
            },
            {
                cId: "301",
                cName: "金昌"
            },
            {
                cId: "302",
                cName: "白银"
            },
            {
                cId: "303",
                cName: "天水"
            },
            {
                cId: "304",
                cName: "武威"
            },
            {
                cId: "305",
                cName: "张掖"
            },
            {
                cId: "306",
                cName: "平凉"
            },
            {
                cId: "307",
                cName: "酒泉"
            },
            {
                cId: "308",
                cName: "庆阳"
            },
            {
                cId: "309",
                cName: "定西"
            },
            {
                cId: "310",
                cName: "陇南"
            },
            {
                cId: "311",
                cName: "临夏州"
            },
            {
                cId: "312",
                cName: "甘南"
            }]
        },
        {
            pId: "29",
            pName: "青海",
            cList: [{
                cId: "313",
                cName: "西宁"
            },
            {
                cId: "314",
                cName: "海东"
            },
            {
                cId: "315",
                cName: "海北"
            },
            {
                cId: "316",
                cName: "黄南"
            },
            {
                cId: "318",
                cName: "果洛"
            },
            {
                cId: "319",
                cName: "玉树"
            },
            {
                cId: "320",
                cName: "海西"
            },
            {
                cId: "411",
                cName: "海南州"
            }]
        },
        {
            pId: "30",
            pName: "宁夏",
            cList: [{
                cId: "321",
                cName: "银川"
            },
            {
                cId: "322",
                cName: "石嘴山"
            },
            {
                cId: "323",
                cName: "吴忠"
            },
            {
                cId: "324",
                cName: "固原"
            },
            {
                cId: "351",
                cName: "中卫"
            }]
        },
        {
            pId: "31",
            pName: "新疆",
            cList: [{
                cId: "325",
                cName: "乌鲁木齐"
            },
            {
                cId: "326",
                cName: "克拉玛依"
            },
            {
                cId: "327",
                cName: "吐鲁番"
            },
            {
                cId: "328",
                cName: "哈密"
            },
            {
                cId: "329",
                cName: "昌吉州"
            },
            {
                cId: "330",
                cName: "博尔塔拉"
            },
            {
                cId: "331",
                cName: "巴音郭楞"
            },
            {
                cId: "332",
                cName: "阿克苏"
            },
            {
                cId: "333",
                cName: "克孜勒苏"
            },
            {
                cId: "334",
                cName: "喀什"
            },
            {
                cId: "335",
                cName: "和田"
            },
            {
                cId: "336",
                cName: "伊犁"
            },
            {
                cId: "337",
                cName: "塔城"
            },
            {
                cId: "338",
                cName: "阿勒泰"
            },
            {
                cId: "339",
                cName: "石河子"
            },
            {
                cId: "346",
                cName: "北屯"
            },
            {
                cId: "389",
                cName: "阿拉尔"
            },
            {
                cId: "405",
                cName: "图木舒克"
            },
            {
                cId: "409",
                cName: "五家渠"
            }]
        },
        {
            pId: "32",
            pName: "香港",
            cList: [{
                cId: "341",
                cName: "香港"
            }]
        },
        {
            pId: "33",
            pName: "澳门",
            cList: [{
                cId: "342",
                cName: "澳门"
            }]
        },
        {
            pId: "34",
            pName: "台湾",
            cList: [{
                cId: "2335",
                cName: "台北"
            },
            {
                cId: "2336",
                cName: "花莲"
            },
            {
                cId: "2337",
                cName: "高雄"
            },
            {
                cId: "2338",
                cName: "台南"
            },
            {
                cId: "2339",
                cName: "桃园"
            },
            {
                cId: "2340",
                cName: "新北"
            },
            {
                cId: "2341",
                cName: "台中"
            },
            {
                cId: "2504",
                cName: "南投"
            }]
        }],
        P = "realtime";
        t.init = function(e) {
            M = e,
            C = purl().param("pid"),
            k = purl().param("cid"),
            E = purl().param("category"),
            "food" != E && "fun" != E && (E = "food"),
            S = "item",
            a()
        }
    },
    {
        entries: y,
        map: e({
            "./jquery.js": n,
            "./module/purl.js": r,
            "./time": v,
            "./random": h,
            "./share": g
        },
        x)
    }),
    define(n, [],
    function(e, t, n, i, r) { !
        function(e, t) {
            "object" == typeof n && "object" == typeof n.exports ? n.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e)
            }: t(e)
        } ("undefined" != typeof window ? window: this,
        function(e, t) {
            function n(e) {
                var t = e.length,
                n = re.type(e);
                return "function" === n || re.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
            }
            function i(e, t, n) {
                if (re.isFunction(t)) return re.grep(e,
                function(e, i) {
                    return !! t.call(e, i, e) !== n
                });
                if (t.nodeType) return re.grep(e,
                function(e) {
                    return e === t !== n
                });
                if ("string" == typeof t) {
                    if (pe.test(t)) return re.filter(t, e, n);
                    t = re.filter(t, e)
                }
                return re.grep(e,
                function(e) {
                    return re.inArray(e, t) >= 0 !== n
                })
            }
            function r(e, t) {
                do e = e[t];
                while (e && 1 !== e.nodeType);
                return e
            }
            function a(e) {
                var t = xe[e] = {};
                return re.each(e.match(Ne) || [],
                function(e, n) {
                    t[n] = !0
                }),
                t
            }
            function o() {
                me.addEventListener ? (me.removeEventListener("DOMContentLoaded", c, !1), e.removeEventListener("load", c, !1)) : (me.detachEvent("onreadystatechange", c), e.detachEvent("onload", c))
            }
            function c() { (me.addEventListener || "load" === event.type || "complete" === me.readyState) && (o(), re.ready())
            }
            function s(e, t, n) {
                if (void 0 === n && 1 === e.nodeType) {
                    var i = "data-" + t.replace(Ce, "-$1").toLowerCase();
                    if (n = e.getAttribute(i), "string" == typeof n) {
                        try {
                            n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null: +n + "" === n ? +n: Te.test(n) ? re.parseJSON(n) : n
                        } catch(r) {}
                        re.data(e, t, n)
                    } else n = void 0
                }
                return n
            }
            function l(e) {
                var t;
                for (t in e) if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t) return ! 1;
                return ! 0
            }
            function u(e, t, n, i) {
                if (re.acceptData(e)) {
                    var r, a, o = re.expando,
                    c = e.nodeType,
                    s = c ? re.cache: e,
                    l = c ? e[o] : e[o] && o;
                    if (l && s[l] && (i || s[l].data) || void 0 !== n || "string" != typeof t) return l || (l = c ? e[o] = J.pop() || re.guid++:o),
                    s[l] || (s[l] = c ? {}: {
                        toJSON: re.noop
                    }),
                    ("object" == typeof t || "function" == typeof t) && (i ? s[l] = re.extend(s[l], t) : s[l].data = re.extend(s[l].data, t)),
                    a = s[l],
                    i || (a.data || (a.data = {}), a = a.data),
                    void 0 !== n && (a[re.camelCase(t)] = n),
                    "string" == typeof t ? (r = a[t], null == r && (r = a[re.camelCase(t)])) : r = a,
                    r
                }
            }
            function d(e, t, n) {
                if (re.acceptData(e)) {
                    var i, r, a = e.nodeType,
                    o = a ? re.cache: e,
                    c = a ? e[re.expando] : re.expando;
                    if (o[c]) {
                        if (t && (i = n ? o[c] : o[c].data)) {
                            re.isArray(t) ? t = t.concat(re.map(t, re.camelCase)) : t in i ? t = [t] : (t = re.camelCase(t), t = t in i ? [t] : t.split(" ")),
                            r = t.length;
                            for (; r--;) delete i[t[r]];
                            if (n ? !l(i) : !re.isEmptyObject(i)) return
                        } (n || (delete o[c].data, l(o[c]))) && (a ? re.cleanData([e], !0) : ne.deleteExpando || o != o.window ? delete o[c] : o[c] = null)
                    }
                }
            }
            function p() {
                return ! 0
            }
            function f() {
                return ! 1
            }
            function m() {
                try {
                    return me.activeElement
                } catch(e) {}
            }
            function h(e) {
                var t = Me.split("|"),
                n = e.createDocumentFragment();
                if (n.createElement) for (; t.length;) n.createElement(t.pop());
                return n
            }
            function g(e, t) {
                var n, i, r = 0,
                a = typeof e.getElementsByTagName !== we ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== we ? e.querySelectorAll(t || "*") : void 0;
                if (!a) for (a = [], n = e.childNodes || e; null != (i = n[r]); r++) ! t || re.nodeName(i, t) ? a.push(i) : re.merge(a, g(i, t));
                return void 0 === t || t && re.nodeName(e, t) ? re.merge([e], a) : a
            }
            function v(e) {
                je.test(e.type) && (e.defaultChecked = e.checked)
            }
            function y(e, t) {
                return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t: t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }
            function N(e) {
                return e.type = (null !== re.find.attr(e, "type")) + "/" + e.type,
                e
            }
            function x(e) {
                var t = Ue.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"),
                e
            }
            function b(e, t) {
                for (var n, i = 0; null != (n = e[i]); i++) re._data(n, "globalEval", !t || re._data(t[i], "globalEval"))
            }
            function I(e, t) {
                if (1 === t.nodeType && re.hasData(e)) {
                    var n, i, r, a = re._data(e),
                    o = re._data(t, a),
                    c = a.events;
                    if (c) {
                        delete o.handle,
                        o.events = {};
                        for (n in c) for (i = 0, r = c[n].length; r > i; i++) re.event.add(t, n, c[n][i])
                    }
                    o.data && (o.data = re.extend({},
                    o.data))
                }
            }
            function w(e, t) {
                var n, i, r;
                if (1 === t.nodeType) {
                    if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[re.expando]) {
                        r = re._data(t);
                        for (i in r.events) re.removeEvent(t, i, r.handle);
                        t.removeAttribute(re.expando)
                    }
                    "script" === n && t.text !== e.text ? (N(t).text = e.text, x(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !re.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && je.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected: ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
                }
            }
            function T(t, n) {
                var i, r = re(n.createElement(t)).appendTo(n.body),
                a = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(r[0])) ? i.display: re.css(r[0], "display");
                return r.detach(),
                a
            }
            function C(e) {
                var t = me,
                n = Ze[e];
                return n || (n = T(e, t), "none" !== n && n || (Ke = (Ke || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ke[0].contentWindow || Ke[0].contentDocument).document, t.write(), t.close(), n = T(e, t), Ke.detach()), Ze[e] = n),
                n
            }
            function k(e, t) {
                return {
                    get: function() {
                        var n = e();
                        if (null != n) return n ? void delete this.get: (this.get = t).apply(this, arguments)
                    }
                }
            }
            function E(e, t) {
                if (t in e) return t;
                for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = pt.length; r--;) if (t = pt[r] + n, t in e) return t;
                return i
            }
            function S(e, t) {
                for (var n, i, r, a = [], o = 0, c = e.length; c > o; o++) i = e[o],
                i.style && (a[o] = re._data(i, "olddisplay"), n = i.style.display, t ? (a[o] || "none" !== n || (i.style.display = ""), "" === i.style.display && Se(i) && (a[o] = re._data(i, "olddisplay", C(i.nodeName)))) : (r = Se(i), (n && "none" !== n || !r) && re._data(i, "olddisplay", r ? n: re.css(i, "display"))));
                for (o = 0; c > o; o++) i = e[o],
                i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? a[o] || "": "none"));
                return e
            }
            function L(e, t, n) {
                var i = st.exec(t);
                return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
            }
            function j(e, t, n, i, r) {
                for (var a = n === (i ? "border": "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2)"margin" === n && (o += re.css(e, n + Ee[a], !0, r)),
                i ? ("content" === n && (o -= re.css(e, "padding" + Ee[a], !0, r)), "margin" !== n && (o -= re.css(e, "border" + Ee[a] + "Width", !0, r))) : (o += re.css(e, "padding" + Ee[a], !0, r), "padding" !== n && (o += re.css(e, "border" + Ee[a] + "Width", !0, r)));
                return o
            }
            function D(e, t, n) {
                var i = !0,
                r = "width" === t ? e.offsetWidth: e.offsetHeight,
                a = et(e),
                o = ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, a);
                if (0 >= r || null == r) {
                    if (r = tt(e, t, a), (0 > r || null == r) && (r = e.style[t]), it.test(r)) return r;
                    i = o && (ne.boxSizingReliable() || r === e.style[t]),
                    r = parseFloat(r) || 0
                }
                return r + j(e, t, n || (o ? "border": "content"), i, a) + "px"
            }
            function A(e, t, n, i, r) {
                return new A.prototype.init(e, t, n, i, r)
            }
            function q() {
                return setTimeout(function() {
                    ft = void 0
                }),
                ft = re.now()
            }
            function H(e, t) {
                var n, i = {
                    height: e
                },
                r = 0;
                for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Ee[r],
                i["margin" + n] = i["padding" + n] = e;
                return t && (i.opacity = i.width = e),
                i
            }
            function _(e, t, n) {
                for (var i, r = (Nt[t] || []).concat(Nt["*"]), a = 0, o = r.length; o > a; a++) if (i = r[a].call(n, t, e)) return i
            }
            function M(e, t, n) {
                var i, r, a, o, c, s, l, u, d = this,
                p = {},
                f = e.style,
                m = e.nodeType && Se(e),
                h = re._data(e, "fxshow");
                n.queue || (c = re._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, s = c.empty.fire, c.empty.fire = function() {
                    c.unqueued || s()
                }), c.unqueued++, d.always(function() {
                    d.always(function() {
                        c.unqueued--,
                        re.queue(e, "fx").length || c.empty.fire()
                    })
                })),
                1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], l = re.css(e, "display"), u = "none" === l ? re._data(e, "olddisplay") || C(e.nodeName) : l, "inline" === u && "none" === re.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== C(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")),
                n.overflow && (f.overflow = "hidden", ne.shrinkWrapBlocks() || d.always(function() {
                    f.overflow = n.overflow[0],
                    f.overflowX = n.overflow[1],
                    f.overflowY = n.overflow[2]
                }));
                for (i in t) if (r = t[i], ht.exec(r)) {
                    if (delete t[i], a = a || "toggle" === r, r === (m ? "hide": "show")) {
                        if ("show" !== r || !h || void 0 === h[i]) continue;
                        m = !0
                    }
                    p[i] = h && h[i] || re.style(e, i)
                } else l = void 0;
                if (re.isEmptyObject(p))"inline" === ("none" === l ? C(e.nodeName) : l) && (f.display = l);
                else {
                    h ? "hidden" in h && (m = h.hidden) : h = re._data(e, "fxshow", {}),
                    a && (h.hidden = !m),
                    m ? re(e).show() : d.done(function() {
                        re(e).hide()
                    }),
                    d.done(function() {
                        var t;
                        re._removeData(e, "fxshow");
                        for (t in p) re.style(e, t, p[t])
                    });
                    for (i in p) o = _(m ? h[i] : 0, i, d),
                    i in h || (h[i] = o.start, m && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
                }
            }
            function O(e, t) {
                var n, i, r, a, o;
                for (n in e) if (i = re.camelCase(n), r = t[i], a = e[n], re.isArray(a) && (r = a[1], a = e[n] = a[0]), n !== i && (e[i] = a, delete e[n]), o = re.cssHooks[i], o && "expand" in o) {
                    a = o.expand(a),
                    delete e[i];
                    for (n in a) n in e || (e[n] = a[n], t[n] = r)
                } else t[i] = r
            }
            function F(e, t, n) {
                var i, r, a = 0,
                o = yt.length,
                c = re.Deferred().always(function() {
                    delete s.elem
                }),
                s = function() {
                    if (r) return ! 1;
                    for (var t = ft || q(), n = Math.max(0, l.startTime + l.duration - t), i = n / l.duration || 0, a = 1 - i, o = 0, s = l.tweens.length; s > o; o++) l.tweens[o].run(a);
                    return c.notifyWith(e, [l, a, n]),
                    1 > a && s ? n: (c.resolveWith(e, [l]), !1)
                },
                l = c.promise({
                    elem: e,
                    props: re.extend({},
                    t),
                    opts: re.extend(!0, {
                        specialEasing: {}
                    },
                    n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: ft || q(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = re.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(i),
                        i
                    },
                    stop: function(t) {
                        var n = 0,
                        i = t ? l.tweens.length: 0;
                        if (r) return this;
                        for (r = !0; i > n; n++) l.tweens[n].run(1);
                        return t ? c.resolveWith(e, [l, t]) : c.rejectWith(e, [l, t]),
                        this
                    }
                }),
                u = l.props;
                for (O(u, l.opts.specialEasing); o > a; a++) if (i = yt[a].call(l, e, u, l.opts)) return i;
                return re.map(u, _, l),
                re.isFunction(l.opts.start) && l.opts.start.call(e, l),
                re.fx.timer(re.extend(s, {
                    elem: e,
                    anim: l,
                    queue: l.opts.queue
                })),
                l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
            }
            function B(e) {
                return function(t, n) {
                    "string" != typeof t && (n = t, t = "*");
                    var i, r = 0,
                    a = t.toLowerCase().match(Ne) || [];
                    if (re.isFunction(n)) for (; i = a[r++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                }
            }
            function R(e, t, n, i) {
                function r(c) {
                    var s;
                    return a[c] = !0,
                    re.each(e[c] || [],
                    function(e, c) {
                        var l = c(t, n, i);
                        return "string" != typeof l || o || a[l] ? o ? !(s = l) : void 0 : (t.dataTypes.unshift(l), r(l), !1)
                    }),
                    s
                }
                var a = {},
                o = e === $t;
                return r(t.dataTypes[0]) || !a["*"] && r("*")
            }
            function W(e, t) {
                var n, i, r = re.ajaxSettings.flatOptions || {};
                for (i in t) void 0 !== t[i] && ((r[i] ? e: n || (n = {}))[i] = t[i]);
                return n && re.extend(!0, e, n),
                e
            }
            function P(e, t, n) {
                for (var i, r, a, o, c = e.contents,
                s = e.dataTypes;
                "*" === s[0];) s.shift(),
                void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r) for (o in c) if (c[o] && c[o].test(r)) {
                    s.unshift(o);
                    break
                }
                if (s[0] in n) a = s[0];
                else {
                    for (o in n) {
                        if (!s[0] || e.converters[o + " " + s[0]]) {
                            a = o;
                            break
                        }
                        i || (i = o)
                    }
                    a = a || i
                }
                return a ? (a !== s[0] && s.unshift(a), n[a]) : void 0
            }
            function $(e, t, n, i) {
                var r, a, o, c, s, l = {},
                u = e.dataTypes.slice();
                if (u[1]) for (o in e.converters) l[o.toLowerCase()] = e.converters[o];
                for (a = u.shift(); a;) if (e.responseFields[a] && (n[e.responseFields[a]] = t), !s && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), s = a, a = u.shift()) if ("*" === a) a = s;
                else if ("*" !== s && s !== a) {
                    if (o = l[s + " " + a] || l["* " + a], !o) for (r in l) if (c = r.split(" "), c[1] === a && (o = l[s + " " + c[0]] || l["* " + c[0]])) {
                        o === !0 ? o = l[r] : l[r] !== !0 && (a = c[0], u.unshift(c[1]));
                        break
                    }
                    if (o !== !0) if (o && e["throws"]) t = o(t);
                    else try {
                        t = o(t)
                    } catch(d) {
                        return {
                            state: "parsererror",
                            error: o ? d: "No conversion from " + s + " to " + a
                        }
                    }
                }
                return {
                    state: "success",
                    data: t
                }
            }
            function z(e, t, n, i) {
                var r;
                if (re.isArray(t)) re.each(t,
                function(t, r) {
                    n || Ut.test(e) ? i(e, r) : z(e + "[" + ("object" == typeof r ? t: "") + "]", r, n, i)
                });
                else if (n || "object" !== re.type(t)) i(e, t);
                else for (r in t) z(e + "[" + r + "]", t[r], n, i)
            }
            function X() {
                try {
                    return new e.XMLHttpRequest
                } catch(t) {}
            }
            function Y() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch(t) {}
            }
            function U(e) {
                return re.isWindow(e) ? e: 9 === e.nodeType ? e.defaultView || e.parentWindow: !1
            }
            var J = [],
            V = J.slice,
            G = J.concat,
            Q = J.push,
            K = J.indexOf,
            Z = {},
            ee = Z.toString,
            te = Z.hasOwnProperty,
            ne = {},
            ie = "1.11.2",
            re = function(e, t) {
                return new re.fn.init(e, t)
            },
            ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            oe = /^-ms-/,
            ce = /-([\da-z])/gi,
            se = function(e, t) {
                return t.toUpperCase()
            };
            re.fn = re.prototype = {
                jquery: ie,
                constructor: re,
                selector: "",
                length: 0,
                toArray: function() {
                    return V.call(this)
                },
                get: function(e) {
                    return null != e ? 0 > e ? this[e + this.length] : this[e] : V.call(this)
                },
                pushStack: function(e) {
                    var t = re.merge(this.constructor(), e);
                    return t.prevObject = this,
                    t.context = this.context,
                    t
                },
                each: function(e, t) {
                    return re.each(this, e, t)
                },
                map: function(e) {
                    return this.pushStack(re.map(this,
                    function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(V.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq( - 1)
                },
                eq: function(e) {
                    var t = this.length,
                    n = +e + (0 > e ? t: 0);
                    return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: Q,
                sort: J.sort,
                splice: J.splice
            },
            re.extend = re.fn.extend = function() {
                var e, t, n, i, r, a, o = arguments[0] || {},
                c = 1,
                s = arguments.length,
                l = !1;
                for ("boolean" == typeof o && (l = o, o = arguments[c] || {},
                c++), "object" == typeof o || re.isFunction(o) || (o = {}), c === s && (o = this, c--); s > c; c++) if (null != (r = arguments[c])) for (i in r) e = o[i],
                n = r[i],
                o !== n && (l && n && (re.isPlainObject(n) || (t = re.isArray(n))) ? (t ? (t = !1, a = e && re.isArray(e) ? e: []) : a = e && re.isPlainObject(e) ? e: {},
                o[i] = re.extend(l, a, n)) : void 0 !== n && (o[i] = n));
                return o
            },
            re.extend({
                expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return "function" === re.type(e)
                },
                isArray: Array.isArray ||
                function(e) {
                    return "array" === re.type(e)
                },
                isWindow: function(e) {
                    return null != e && e == e.window
                },
                isNumeric: function(e) {
                    return ! re.isArray(e) && e - parseFloat(e) + 1 >= 0
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return ! 1;
                    return ! 0
                },
                isPlainObject: function(e) {
                    var t;
                    if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e)) return ! 1;
                    try {
                        if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
                    } catch(n) {
                        return ! 1
                    }
                    if (ne.ownLast) for (t in e) return te.call(e, t);
                    for (t in e);
                    return void 0 === t || te.call(e, t)
                },
                type: function(e) {
                    return null == e ? e + "": "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object": typeof e
                },
                globalEval: function(t) {
                    t && re.trim(t) && (e.execScript ||
                    function(t) {
                        e.eval.call(e, t)
                    })(t)
                },
                camelCase: function(e) {
                    return e.replace(oe, "ms-").replace(ce, se)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t, i) {
                    var r, a = 0,
                    o = e.length,
                    c = n(e);
                    if (i) {
                        if (c) for (; o > a && (r = t.apply(e[a], i), r !== !1); a++);
                        else for (a in e) if (r = t.apply(e[a], i), r === !1) break
                    } else if (c) for (; o > a && (r = t.call(e[a], a, e[a]), r !== !1); a++);
                    else for (a in e) if (r = t.call(e[a], a, e[a]), r === !1) break;
                    return e
                },
                trim: function(e) {
                    return null == e ? "": (e + "").replace(ae, "")
                },
                makeArray: function(e, t) {
                    var i = t || [];
                    return null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [e] : e) : Q.call(i, e)),
                    i
                },
                inArray: function(e, t, n) {
                    var i;
                    if (t) {
                        if (K) return K.call(t, e, n);
                        for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n: 0; i > n; n++) if (n in t && t[n] === e) return n
                    }
                    return - 1
                },
                merge: function(e, t) {
                    for (var n = +t.length,
                    i = 0,
                    r = e.length; n > i;) e[r++] = t[i++];
                    if (n !== n) for (; void 0 !== t[i];) e[r++] = t[i++];
                    return e.length = r,
                    e
                },
                grep: function(e, t, n) {
                    for (var i, r = [], a = 0, o = e.length, c = !n; o > a; a++) i = !t(e[a], a),
                    i !== c && r.push(e[a]);
                    return r
                },
                map: function(e, t, i) {
                    var r, a = 0,
                    o = e.length,
                    c = n(e),
                    s = [];
                    if (c) for (; o > a; a++) r = t(e[a], a, i),
                    null != r && s.push(r);
                    else for (a in e) r = t(e[a], a, i),
                    null != r && s.push(r);
                    return G.apply([], s)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, i, r;
                    return "string" == typeof t && (r = e[t], t = e, e = r),
                    re.isFunction(e) ? (n = V.call(arguments, 2), i = function() {
                        return e.apply(t || this, n.concat(V.call(arguments)))
                    },
                    i.guid = e.guid = e.guid || re.guid++, i) : void 0
                },
                now: function() {
                    return + new Date
                },
                support: ne
            }),
            re.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
            function(e, t) {
                Z["[object " + t + "]"] = t.toLowerCase()
            });
            var le = function(e) {
                function t(e, t, n, i) {
                    var r, a, o, c, s, l, d, f, m, h;
                    if ((t ? t.ownerDocument || t: R) !== A && D(t), t = t || A, n = n || [], c = t.nodeType, "string" != typeof e || !e || 1 !== c && 9 !== c && 11 !== c) return n;
                    if (!i && H) {
                        if (11 !== c && (r = ye.exec(e))) if (o = r[1]) {
                            if (9 === c) {
                                if (a = t.getElementById(o), !a || !a.parentNode) return n;
                                if (a.id === o) return n.push(a),
                                n
                            } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && F(t, a) && a.id === o) return n.push(a),
                            n
                        } else {
                            if (r[2]) return K.apply(n, t.getElementsByTagName(e)),
                            n;
                            if ((o = r[3]) && b.getElementsByClassName) return K.apply(n, t.getElementsByClassName(o)),
                            n
                        }
                        if (b.qsa && (!_ || !_.test(e))) {
                            if (f = d = B, m = t, h = 1 !== c && e, 1 === c && "object" !== t.nodeName.toLowerCase()) {
                                for (l = C(e), (d = t.getAttribute("id")) ? f = d.replace(xe, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", s = l.length; s--;) l[s] = f + p(l[s]);
                                m = Ne.test(e) && u(t.parentNode) || t,
                                h = l.join(",")
                            }
                            if (h) try {
                                return K.apply(n, m.querySelectorAll(h)),
                                n
                            } catch(g) {} finally {
                                d || t.removeAttribute("id")
                            }
                        }
                    }
                    return E(e.replace(se, "$1"), t, n, i)
                }
                function n() {
                    function e(n, i) {
                        return t.push(n + " ") > I.cacheLength && delete e[t.shift()],
                        e[n + " "] = i
                    }
                    var t = [];
                    return e
                }
                function i(e) {
                    return e[B] = !0,
                    e
                }
                function r(e) {
                    var t = A.createElement("div");
                    try {
                        return !! e(t)
                    } catch(n) {
                        return ! 1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null
                    }
                }
                function a(e, t) {
                    for (var n = e.split("|"), i = e.length; i--;) I.attrHandle[n[i]] = t
                }
                function o(e, t) {
                    var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
                    if (i) return i;
                    if (n) for (; n = n.nextSibling;) if (n === t) return - 1;
                    return e ? 1 : -1
                }
                function c(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }
                function s(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }
                function l(e) {
                    return i(function(t) {
                        return t = +t,
                        i(function(n, i) {
                            for (var r, a = e([], n.length, t), o = a.length; o--;) n[r = a[o]] && (n[r] = !(i[r] = n[r]))
                        })
                    })
                }
                function u(e) {
                    return e && "undefined" != typeof e.getElementsByTagName && e
                }
                function d() {}
                function p(e) {
                    for (var t = 0,
                    n = e.length,
                    i = ""; n > t; t++) i += e[t].value;
                    return i
                }
                function f(e, t, n) {
                    var i = t.dir,
                    r = n && "parentNode" === i,
                    a = P++;
                    return t.first ?
                    function(t, n, a) {
                        for (; t = t[i];) if (1 === t.nodeType || r) return e(t, n, a)
                    }: function(t, n, o) {
                        var c, s, l = [W, a];
                        if (o) {
                            for (; t = t[i];) if ((1 === t.nodeType || r) && e(t, n, o)) return ! 0
                        } else for (; t = t[i];) if (1 === t.nodeType || r) {
                            if (s = t[B] || (t[B] = {}), (c = s[i]) && c[0] === W && c[1] === a) return l[2] = c[2];
                            if (s[i] = l, l[2] = e(t, n, o)) return ! 0
                        }
                    }
                }
                function m(e) {
                    return e.length > 1 ?
                    function(t, n, i) {
                        for (var r = e.length; r--;) if (!e[r](t, n, i)) return ! 1;
                        return ! 0
                    }: e[0]
                }
                function h(e, n, i) {
                    for (var r = 0,
                    a = n.length; a > r; r++) t(e, n[r], i);
                    return i
                }
                function g(e, t, n, i, r) {
                    for (var a, o = [], c = 0, s = e.length, l = null != t; s > c; c++)(a = e[c]) && (!n || n(a, i, r)) && (o.push(a), l && t.push(c));
                    return o
                }
                function v(e, t, n, r, a, o) {
                    return r && !r[B] && (r = v(r)),
                    a && !a[B] && (a = v(a, o)),
                    i(function(i, o, c, s) {
                        var l, u, d, p = [],
                        f = [],
                        m = o.length,
                        v = i || h(t || "*", c.nodeType ? [c] : c, []),
                        y = !e || !i && t ? v: g(v, p, e, c, s),
                        N = n ? a || (i ? e: m || r) ? [] : o: y;
                        if (n && n(y, N, c, s), r) for (l = g(N, f), r(l, [], c, s), u = l.length; u--;)(d = l[u]) && (N[f[u]] = !(y[f[u]] = d));
                        if (i) {
                            if (a || e) {
                                if (a) {
                                    for (l = [], u = N.length; u--;)(d = N[u]) && l.push(y[u] = d);
                                    a(null, N = [], l, s)
                                }
                                for (u = N.length; u--;)(d = N[u]) && (l = a ? ee(i, d) : p[u]) > -1 && (i[l] = !(o[l] = d))
                            }
                        } else N = g(N === o ? N.splice(m, N.length) : N),
                        a ? a(null, o, N, s) : K.apply(o, N)
                    })
                }
                function y(e) {
                    for (var t, n, i, r = e.length,
                    a = I.relative[e[0].type], o = a || I.relative[" "], c = a ? 1 : 0, s = f(function(e) {
                        return e === t
                    },
                    o, !0), l = f(function(e) {
                        return ee(t, e) > -1
                    },
                    o, !0), u = [function(e, n, i) {
                        var r = !a && (i || n !== S) || ((t = n).nodeType ? s(e, n, i) : l(e, n, i));
                        return t = null,
                        r
                    }]; r > c; c++) if (n = I.relative[e[c].type]) u = [f(m(u), n)];
                    else {
                        if (n = I.filter[e[c].type].apply(null, e[c].matches), n[B]) {
                            for (i = ++c; r > i && !I.relative[e[i].type]; i++);
                            return v(c > 1 && m(u), c > 1 && p(e.slice(0, c - 1).concat({
                                value: " " === e[c - 2].type ? "*": ""
                            })).replace(se, "$1"), n, i > c && y(e.slice(c, i)), r > i && y(e = e.slice(i)), r > i && p(e))
                        }
                        u.push(n)
                    }
                    return m(u)
                }
                function N(e, n) {
                    var r = n.length > 0,
                    a = e.length > 0,
                    o = function(i, o, c, s, l) {
                        var u, d, p, f = 0,
                        m = "0",
                        h = i && [],
                        v = [],
                        y = S,
                        N = i || a && I.find.TAG("*", l),
                        x = W += null == y ? 1 : Math.random() || .1,
                        b = N.length;
                        for (l && (S = o !== A && o); m !== b && null != (u = N[m]); m++) {
                            if (a && u) {
                                for (d = 0; p = e[d++];) if (p(u, o, c)) {
                                    s.push(u);
                                    break
                                }
                                l && (W = x)
                            }
                            r && ((u = !p && u) && f--, i && h.push(u))
                        }
                        if (f += m, r && m !== f) {
                            for (d = 0; p = n[d++];) p(h, v, o, c);
                            if (i) {
                                if (f > 0) for (; m--;) h[m] || v[m] || (v[m] = G.call(s));
                                v = g(v)
                            }
                            K.apply(s, v),
                            l && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(s)
                        }
                        return l && (W = x, S = y),
                        h
                    };
                    return r ? i(o) : o
                }
                var x, b, I, w, T, C, k, E, S, L, j, D, A, q, H, _, M, O, F, B = "sizzle" + 1 * new Date,
                R = e.document,
                W = 0,
                P = 0,
                $ = n(),
                z = n(),
                X = n(),
                Y = function(e, t) {
                    return e === t && (j = !0),
                    0
                },
                U = 1 << 31,
                J = {}.hasOwnProperty,
                V = [],
                G = V.pop,
                Q = V.push,
                K = V.push,
                Z = V.slice,
                ee = function(e, t) {
                    for (var n = 0,
                    i = e.length; i > n; n++) if (e[n] === t) return n;
                    return - 1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                re = ie.replace("w", "w#"),
                ae = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
                oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
                ce = new RegExp(ne + "+", "g"),
                se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                pe = new RegExp(oe),
                fe = new RegExp("^" + re + "$"),
                me = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + ae),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                he = /^(?:input|select|textarea|button)$/i,
                ge = /^h\d$/i,
                ve = /^[^{]+\{\s*\[native \w/,
                ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Ne = /[+~]/,
                xe = /'|\\/g,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                Ie = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t: 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                we = function() {
                    D()
                };
                try {
                    K.apply(V = Z.call(R.childNodes), R.childNodes),
                    V[R.childNodes.length].nodeType
                } catch(Te) {
                    K = {
                        apply: V.length ?
                        function(e, t) {
                            Q.apply(e, Z.call(t))
                        }: function(e, t) {
                            for (var n = e.length,
                            i = 0; e[n++] = t[i++];);
                            e.length = n - 1
                        }
                    }
                }
                b = t.support = {},
                T = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? "HTML" !== t.nodeName: !1
                },
                D = t.setDocument = function(e) {
                    var t, n, i = e ? e.ownerDocument || e: R;
                    return i !== A && 9 === i.nodeType && i.documentElement ? (A = i, q = i.documentElement, n = i.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), H = !T(i), b.attributes = r(function(e) {
                        return e.className = "i",
                        !e.getAttribute("className")
                    }), b.getElementsByTagName = r(function(e) {
                        return e.appendChild(i.createComment("")),
                        !e.getElementsByTagName("*").length
                    }), b.getElementsByClassName = ve.test(i.getElementsByClassName), b.getById = r(function(e) {
                        return q.appendChild(e).id = B,
                        !i.getElementsByName || !i.getElementsByName(B).length
                    }), b.getById ? (I.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && H) {
                            var n = t.getElementById(e);
                            return n && n.parentNode ? [n] : []
                        }
                    },
                    I.filter.ID = function(e) {
                        var t = e.replace(be, Ie);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete I.find.ID, I.filter.ID = function(e) {
                        var t = e.replace(be, Ie);
                        return function(e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), I.find.TAG = b.getElementsByTagName ?
                    function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : b.qsa ? t.querySelectorAll(e) : void 0
                    }: function(e, t) {
                        var n, i = [],
                        r = 0,
                        a = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = a[r++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return a
                    },
                    I.find.CLASS = b.getElementsByClassName &&
                    function(e, t) {
                        return H ? t.getElementsByClassName(e) : void 0
                    },
                    M = [], _ = [], (b.qsa = ve.test(i.querySelectorAll)) && (r(function(e) {
                        q.appendChild(e).innerHTML = "<a id='" + B + "'></a><select id='" + B + "-\f]' msallowcapture=''><option selected=''></option></select>",
                        e.querySelectorAll("[msallowcapture^='']").length && _.push("[*^$]=" + ne + "*(?:''|\"\")"),
                        e.querySelectorAll("[selected]").length || _.push("\\[" + ne + "*(?:value|" + te + ")"),
                        e.querySelectorAll("[id~=" + B + "-]").length || _.push("~="),
                        e.querySelectorAll(":checked").length || _.push(":checked"),
                        e.querySelectorAll("a#" + B + "+*").length || _.push(".#.+[+~]")
                    }), r(function(e) {
                        var t = i.createElement("input");
                        t.setAttribute("type", "hidden"),
                        e.appendChild(t).setAttribute("name", "D"),
                        e.querySelectorAll("[name=d]").length && _.push("name" + ne + "*[*^$|!~]?="),
                        e.querySelectorAll(":enabled").length || _.push(":enabled", ":disabled"),
                        e.querySelectorAll("*,:x"),
                        _.push(",.*:")
                    })), (b.matchesSelector = ve.test(O = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && r(function(e) {
                        b.disconnectedMatch = O.call(e, "div"),
                        O.call(e, "[s!='']:x"),
                        M.push("!=", oe)
                    }), _ = _.length && new RegExp(_.join("|")), M = M.length && new RegExp(M.join("|")), t = ve.test(q.compareDocumentPosition), F = t || ve.test(q.contains) ?
                    function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement: e,
                        i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    }: function(e, t) {
                        if (t) for (; t = t.parentNode;) if (t === e) return ! 0;
                        return ! 1
                    },
                    Y = t ?
                    function(e, t) {
                        if (e === t) return j = !0,
                        0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n ? n: (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !b.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === R && F(R, e) ? -1 : t === i || t.ownerDocument === R && F(R, t) ? 1 : L ? ee(L, e) - ee(L, t) : 0 : 4 & n ? -1 : 1)
                    }: function(e, t) {
                        if (e === t) return j = !0,
                        0;
                        var n, r = 0,
                        a = e.parentNode,
                        c = t.parentNode,
                        s = [e],
                        l = [t];
                        if (!a || !c) return e === i ? -1 : t === i ? 1 : a ? -1 : c ? 1 : L ? ee(L, e) - ee(L, t) : 0;
                        if (a === c) return o(e, t);
                        for (n = e; n = n.parentNode;) s.unshift(n);
                        for (n = t; n = n.parentNode;) l.unshift(n);
                        for (; s[r] === l[r];) r++;
                        return r ? o(s[r], l[r]) : s[r] === R ? -1 : l[r] === R ? 1 : 0
                    },
                    i) : A
                },
                t.matches = function(e, n) {
                    return t(e, null, null, n)
                },
                t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== A && D(e), n = n.replace(de, "='$1']"), b.matchesSelector && H && (!M || !M.test(n)) && (!_ || !_.test(n))) try {
                        var i = O.call(e, n);
                        if (i || b.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                    } catch(r) {}
                    return t(n, A, null, [e]).length > 0
                },
                t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== A && D(e),
                    F(e, t)
                },
                t.attr = function(e, t) { (e.ownerDocument || e) !== A && D(e);
                    var n = I.attrHandle[t.toLowerCase()],
                    i = n && J.call(I.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
                    return void 0 !== i ? i: b.attributes || !H ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value: null
                },
                t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                },
                t.uniqueSort = function(e) {
                    var t, n = [],
                    i = 0,
                    r = 0;
                    if (j = !b.detectDuplicates, L = !b.sortStable && e.slice(0), e.sort(Y), j) {
                        for (; t = e[r++];) t === e[r] && (i = n.push(r));
                        for (; i--;) e.splice(n[i], 1)
                    }
                    return L = null,
                    e
                },
                w = t.getText = function(e) {
                    var t, n = "",
                    i = 0,
                    r = e.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += w(e)
                        } else if (3 === r || 4 === r) return e.nodeValue
                    } else for (; t = e[i++];) n += w(t);
                    return n
                },
                I = t.selectors = {
                    cacheLength: 50,
                    createPseudo: i,
                    match: me,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(be, Ie),
                            e[3] = (e[3] || e[4] || e[5] || "").replace(be, Ie),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                            e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                            e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return me.CHILD.test(e[0]) ? null: (e[3] ? e[2] = e[4] || e[5] || "": n && pe.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(be, Ie).toLowerCase();
                            return "*" === e ?
                            function() {
                                return ! 0
                            }: function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = $[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && $(e,
                            function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, i) {
                            return function(r) {
                                var a = t.attr(r, e);
                                return null == a ? "!=" === n: n ? (a += "", "=" === n ? a === i: "!=" === n ? a !== i: "^=" === n ? i && 0 === a.indexOf(i) : "*=" === n ? i && a.indexOf(i) > -1 : "$=" === n ? i && a.slice( - i.length) === i: "~=" === n ? (" " + a.replace(ce, " ") + " ").indexOf(i) > -1 : "|=" === n ? a === i || a.slice(0, i.length + 1) === i + "-": !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, i, r) {
                            var a = "nth" !== e.slice(0, 3),
                            o = "last" !== e.slice( - 4),
                            c = "of-type" === t;
                            return 1 === i && 0 === r ?
                            function(e) {
                                return !! e.parentNode
                            }: function(t, n, s) {
                                var l, u, d, p, f, m, h = a !== o ? "nextSibling": "previousSibling",
                                g = t.parentNode,
                                v = c && t.nodeName.toLowerCase(),
                                y = !s && !c;
                                if (g) {
                                    if (a) {
                                        for (; h;) {
                                            for (d = t; d = d[h];) if (c ? d.nodeName.toLowerCase() === v: 1 === d.nodeType) return ! 1;
                                            m = h = "only" === e && !m && "nextSibling"
                                        }
                                        return ! 0
                                    }
                                    if (m = [o ? g.firstChild: g.lastChild], o && y) {
                                        for (u = g[B] || (g[B] = {}), l = u[e] || [], f = l[0] === W && l[1], p = l[0] === W && l[2], d = f && g.childNodes[f]; d = ++f && d && d[h] || (p = f = 0) || m.pop();) if (1 === d.nodeType && ++p && d === t) {
                                            u[e] = [W, f, p];
                                            break
                                        }
                                    } else if (y && (l = (t[B] || (t[B] = {}))[e]) && l[0] === W) p = l[1];
                                    else for (; (d = ++f && d && d[h] || (p = f = 0) || m.pop()) && ((c ? d.nodeName.toLowerCase() !== v: 1 !== d.nodeType) || !++p || (y && ((d[B] || (d[B] = {}))[e] = [W, p]), d !== t)););
                                    return p -= r,
                                    p === i || p % i === 0 && p / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var r, a = I.pseudos[e] || I.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return a[B] ? a(n) : a.length > 1 ? (r = [e, e, "", n], I.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                                for (var i, r = a(e, n), o = r.length; o--;) i = ee(e, r[o]),
                                e[i] = !(t[i] = r[o])
                            }) : function(e) {
                                return a(e, 0, r)
                            }) : a
                        }
                    },
                    pseudos: {
                        not: i(function(e) {
                            var t = [],
                            n = [],
                            r = k(e.replace(se, "$1"));
                            return r[B] ? i(function(e, t, n, i) {
                                for (var a, o = r(e, null, i, []), c = e.length; c--;)(a = o[c]) && (e[c] = !(t[c] = a))
                            }) : function(e, i, a) {
                                return t[0] = e,
                                r(t, null, a, n),
                                t[0] = null,
                                !n.pop()
                            }
                        }),
                        has: i(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: i(function(e) {
                            return e = e.replace(be, Ie),
                            function(t) {
                                return (t.textContent || t.innerText || w(t)).indexOf(e) > -1
                            }
                        }),
                        lang: i(function(e) {
                            return fe.test(e || "") || t.error("unsupported lang: " + e),
                            e = e.replace(be, Ie).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                if (n = H ? t.lang: t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
                                n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return ! 1
                            }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === q
                        },
                        focus: function(e) {
                            return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex,
                            e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return ! 1;
                            return ! 0
                        },
                        parent: function(e) {
                            return ! I.pseudos.empty(e)
                        },
                        header: function(e) {
                            return ge.test(e.nodeName)
                        },
                        input: function(e) {
                            return he.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: l(function() {
                            return [0]
                        }),
                        last: l(function(e, t) {
                            return [t - 1]
                        }),
                        eq: l(function(e, t, n) {
                            return [0 > n ? n + t: n]
                        }),
                        even: l(function(e, t) {
                            for (var n = 0; t > n; n += 2) e.push(n);
                            return e
                        }),
                        odd: l(function(e, t) {
                            for (var n = 1; t > n; n += 2) e.push(n);
                            return e
                        }),
                        lt: l(function(e, t, n) {
                            for (var i = 0 > n ? n + t: n; --i >= 0;) e.push(i);
                            return e
                        }),
                        gt: l(function(e, t, n) {
                            for (var i = 0 > n ? n + t: n; ++i < t;) e.push(i);
                            return e
                        })
                    }
                },
                I.pseudos.nth = I.pseudos.eq;
                for (x in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) I.pseudos[x] = c(x);
                for (x in {
                    submit: !0,
                    reset: !0
                }) I.pseudos[x] = s(x);
                return d.prototype = I.filters = I.pseudos,
                I.setFilters = new d,
                C = t.tokenize = function(e, n) {
                    var i, r, a, o, c, s, l, u = z[e + " "];
                    if (u) return n ? 0 : u.slice(0);
                    for (c = e, s = [], l = I.preFilter; c;) { (!i || (r = le.exec(c))) && (r && (c = c.slice(r[0].length) || c), s.push(a = [])),
                        i = !1,
                        (r = ue.exec(c)) && (i = r.shift(), a.push({
                            value: i,
                            type: r[0].replace(se, " ")
                        }), c = c.slice(i.length));
                        for (o in I.filter) ! (r = me[o].exec(c)) || l[o] && !(r = l[o](r)) || (i = r.shift(), a.push({
                            value: i,
                            type: o,
                            matches: r
                        }), c = c.slice(i.length));
                        if (!i) break
                    }
                    return n ? c.length: c ? t.error(e) : z(e, s).slice(0)
                },
                k = t.compile = function(e, t) {
                    var n, i = [],
                    r = [],
                    a = X[e + " "];
                    if (!a) {
                        for (t || (t = C(e)), n = t.length; n--;) a = y(t[n]),
                        a[B] ? i.push(a) : r.push(a);
                        a = X(e, N(r, i)),
                        a.selector = e
                    }
                    return a
                },
                E = t.select = function(e, t, n, i) {
                    var r, a, o, c, s, l = "function" == typeof e && e,
                    d = !i && C(e = l.selector || e);
                    if (n = n || [], 1 === d.length) {
                        if (a = d[0] = d[0].slice(0), a.length > 2 && "ID" === (o = a[0]).type && b.getById && 9 === t.nodeType && H && I.relative[a[1].type]) {
                            if (t = (I.find.ID(o.matches[0].replace(be, Ie), t) || [])[0], !t) return n;
                            l && (t = t.parentNode),
                            e = e.slice(a.shift().value.length)
                        }
                        for (r = me.needsContext.test(e) ? 0 : a.length; r--&&(o = a[r], !I.relative[c = o.type]);) if ((s = I.find[c]) && (i = s(o.matches[0].replace(be, Ie), Ne.test(a[0].type) && u(t.parentNode) || t))) {
                            if (a.splice(r, 1), e = i.length && p(a), !e) return K.apply(n, i),
                            n;
                            break
                        }
                    }
                    return (l || k(e, d))(i, t, !H, n, Ne.test(e) && u(t.parentNode) || t),
                    n
                },
                b.sortStable = B.split("").sort(Y).join("") === B,
                b.detectDuplicates = !!j,
                D(),
                b.sortDetached = r(function(e) {
                    return 1 & e.compareDocumentPosition(A.createElement("div"))
                }),
                r(function(e) {
                    return e.innerHTML = "<a href='#'></a>",
                    "#" === e.firstChild.getAttribute("href")
                }) || a("type|href|height|width",
                function(e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                }),
                b.attributes && r(function(e) {
                    return e.innerHTML = "<input/>",
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
                }) || a("value",
                function(e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                }),
                r(function(e) {
                    return null == e.getAttribute("disabled")
                }) || a(te,
                function(e, t, n) {
                    var i;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value: null
                }),
                t
            } (e);
            re.find = le,
            re.expr = le.selectors,
            re.expr[":"] = re.expr.pseudos,
            re.unique = le.uniqueSort,
            re.text = le.getText,
            re.isXMLDoc = le.isXML,
            re.contains = le.contains;
            var ue = re.expr.match.needsContext,
            de = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            pe = /^.[^:#\[\.,]*$/;
            re.filter = function(e, t, n) {
                var i = t[0];
                return n && (e = ":not(" + e + ")"),
                1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [i] : [] : re.find.matches(e, re.grep(t,
                function(e) {
                    return 1 === e.nodeType
                }))
            },
            re.fn.extend({
                find: function(e) {
                    var t, n = [],
                    i = this,
                    r = i.length;
                    if ("string" != typeof e) return this.pushStack(re(e).filter(function() {
                        for (t = 0; r > t; t++) if (re.contains(i[t], this)) return ! 0
                    }));
                    for (t = 0; r > t; t++) re.find(e, i[t], n);
                    return n = this.pushStack(r > 1 ? re.unique(n) : n),
                    n.selector = this.selector ? this.selector + " " + e: e,
                    n
                },
                filter: function(e) {
                    return this.pushStack(i(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(i(this, e || [], !0))
                },
                is: function(e) {
                    return !! i(this, "string" == typeof e && ue.test(e) ? re(e) : e || [], !1).length
                }
            });
            var fe, me = e.document,
            he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            ge = re.fn.init = function(e, t) {
                var n, i;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e), !n || !n[1] && t) return ! t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
                    if (n[1]) {
                        if (t = t instanceof re ? t[0] : t, re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t: me, !0)), de.test(n[1]) && re.isPlainObject(t)) for (n in t) re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    if (i = me.getElementById(n[2]), i && i.parentNode) {
                        if (i.id !== n[2]) return fe.find(e);
                        this.length = 1,
                        this[0] = i
                    }
                    return this.context = me,
                    this.selector = e,
                    this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : re.isFunction(e) ? "undefined" != typeof fe.ready ? fe.ready(e) : e(re) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), re.makeArray(e, this))
            };
            ge.prototype = re.fn,
            fe = re(me);
            var ve = /^(?:parents|prev(?:Until|All))/,
            ye = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            re.extend({
                dir: function(e, t, n) {
                    for (var i = [], r = e[t]; r && 9 !== r.nodeType && (void 0 === n || 1 !== r.nodeType || !re(r).is(n));) 1 === r.nodeType && i.push(r),
                    r = r[t];
                    return i
                },
                sibling: function(e, t) {
                    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                    return n
                }
            }),
            re.fn.extend({
                has: function(e) {
                    var t, n = re(e, this),
                    i = n.length;
                    return this.filter(function() {
                        for (t = 0; i > t; t++) if (re.contains(this, n[t])) return ! 0
                    })
                },
                closest: function(e, t) {
                    for (var n, i = 0,
                    r = this.length,
                    a = [], o = ue.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; r > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
                    return this.pushStack(a.length > 1 ? re.unique(a) : a)
                },
                index: function(e) {
                    return e ? "string" == typeof e ? re.inArray(this[0], re(e)) : re.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
                },
                add: function(e, t) {
                    return this.pushStack(re.unique(re.merge(this.get(), re(e, t))))
                },
                addBack: function(e) {
                    return this.add(null == e ? this.prevObject: this.prevObject.filter(e))
                }
            }),
            re.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t: null
                },
                parents: function(e) {
                    return re.dir(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return re.dir(e, "parentNode", n)
                },
                next: function(e) {
                    return r(e, "nextSibling")
                },
                prev: function(e) {
                    return r(e, "previousSibling")
                },
                nextAll: function(e) {
                    return re.dir(e, "nextSibling")
                },
                prevAll: function(e) {
                    return re.dir(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return re.dir(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return re.dir(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return re.sibling((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return re.sibling(e.firstChild)
                },
                contents: function(e) {
                    return re.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: re.merge([], e.childNodes)
                }
            },
            function(e, t) {
                re.fn[e] = function(n, i) {
                    var r = re.map(this, t, n);
                    return "Until" !== e.slice( - 5) && (i = n),
                    i && "string" == typeof i && (r = re.filter(i, r)),
                    this.length > 1 && (ye[e] || (r = re.unique(r)), ve.test(e) && (r = r.reverse())),
                    this.pushStack(r)
                }
            });
            var Ne = /\S+/g,
            xe = {};
            re.Callbacks = function(e) {
                e = "string" == typeof e ? xe[e] || a(e) : re.extend({},
                e);
                var t, n, i, r, o, c, s = [],
                l = !e.once && [],
                u = function(a) {
                    for (n = e.memory && a, i = !0, o = c || 0, c = 0, r = s.length, t = !0; s && r > o; o++) if (s[o].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                    t = !1,
                    s && (l ? l.length && u(l.shift()) : n ? s = [] : d.disable())
                },
                d = {
                    add: function() {
                        if (s) {
                            var i = s.length; !
                            function a(t) {
                                re.each(t,
                                function(t, n) {
                                    var i = re.type(n);
                                    "function" === i ? e.unique && d.has(n) || s.push(n) : n && n.length && "string" !== i && a(n)
                                })
                            } (arguments),
                            t ? r = s.length: n && (c = i, u(n))
                        }
                        return this
                    },
                    remove: function() {
                        return s && re.each(arguments,
                        function(e, n) {
                            for (var i; (i = re.inArray(n, s, i)) > -1;) s.splice(i, 1),
                            t && (r >= i && r--, o >= i && o--)
                        }),
                        this
                    },
                    has: function(e) {
                        return e ? re.inArray(e, s) > -1 : !(!s || !s.length)
                    },
                    empty: function() {
                        return s = [],
                        r = 0,
                        this
                    },
                    disable: function() {
                        return s = l = n = void 0,
                        this
                    },
                    disabled: function() {
                        return ! s
                    },
                    lock: function() {
                        return l = void 0,
                        n || d.disable(),
                        this
                    },
                    locked: function() {
                        return ! l
                    },
                    fireWith: function(e, n) {
                        return ! s || i && !l || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? l.push(n) : u(n)),
                        this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments),
                        this
                    },
                    fired: function() {
                        return !! i
                    }
                };
                return d
            },
            re.extend({
                Deferred: function(e) {
                    var t = [["resolve", "done", re.Callbacks("once memory"), "resolved"], ["reject", "fail", re.Callbacks("once memory"), "rejected"], ["notify", "progress", re.Callbacks("memory")]],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return r.done(arguments).fail(arguments),
                            this
                        },
                        then: function() {
                            var e = arguments;
                            return re.Deferred(function(n) {
                                re.each(t,
                                function(t, a) {
                                    var o = re.isFunction(e[t]) && e[t];
                                    r[a[1]](function() {
                                        var e = o && o.apply(this, arguments);
                                        e && re.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === i ? n.promise() : this, o ? [e] : arguments)
                                    })
                                }),
                                e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? re.extend(e, i) : i
                        }
                    },
                    r = {};
                    return i.pipe = i.then,
                    re.each(t,
                    function(e, a) {
                        var o = a[2],
                        c = a[3];
                        i[a[1]] = o.add,
                        c && o.add(function() {
                            n = c
                        },
                        t[1 ^ e][2].disable, t[2][2].lock),
                        r[a[0]] = function() {
                            return r[a[0] + "With"](this === r ? i: this, arguments),
                            this
                        },
                        r[a[0] + "With"] = o.fireWith
                    }),
                    i.promise(r),
                    e && e.call(r, r),
                    r
                },
                when: function(e) {
                    var t, n, i, r = 0,
                    a = V.call(arguments),
                    o = a.length,
                    c = 1 !== o || e && re.isFunction(e.promise) ? o: 0,
                    s = 1 === c ? e: re.Deferred(),
                    l = function(e, n, i) {
                        return function(r) {
                            n[e] = this,
                            i[e] = arguments.length > 1 ? V.call(arguments) : r,
                            i === t ? s.notifyWith(n, i) : --c || s.resolveWith(n, i)
                        }
                    };
                    if (o > 1) for (t = new Array(o), n = new Array(o), i = new Array(o); o > r; r++) a[r] && re.isFunction(a[r].promise) ? a[r].promise().done(l(r, i, a)).fail(s.reject).progress(l(r, n, t)) : --c;
                    return c || s.resolveWith(i, a),
                    s.promise()
                }
            });
            var be;
            re.fn.ready = function(e) {
                return re.ready.promise().done(e),
                this
            },
            re.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? re.readyWait++:re.ready(!0)
                },
                ready: function(e) {
                    if (e === !0 ? !--re.readyWait: !re.isReady) {
                        if (!me.body) return setTimeout(re.ready);
                        re.isReady = !0,
                        e !== !0 && --re.readyWait > 0 || (be.resolveWith(me, [re]), re.fn.triggerHandler && (re(me).triggerHandler("ready"), re(me).off("ready")))
                    }
                }
            }),
            re.ready.promise = function(t) {
                if (!be) if (be = re.Deferred(), "complete" === me.readyState) setTimeout(re.ready);
                else if (me.addEventListener) me.addEventListener("DOMContentLoaded", c, !1),
                e.addEventListener("load", c, !1);
                else {
                    me.attachEvent("onreadystatechange", c),
                    e.attachEvent("onload", c);
                    var n = !1;
                    try {
                        n = null == e.frameElement && me.documentElement
                    } catch(i) {}
                    n && n.doScroll && !
                    function r() {
                        if (!re.isReady) {
                            try {
                                n.doScroll("left")
                            } catch(e) {
                                return setTimeout(r, 50)
                            }
                            o(),
                            re.ready()
                        }
                    } ()
                }
                return be.promise(t)
            };
            var Ie, we = "undefined";
            for (Ie in re(ne)) break;
            ne.ownLast = "0" !== Ie,
            ne.inlineBlockNeedsLayout = !1,
            re(function() {
                var e, t, n, i;
                n = me.getElementsByTagName("body")[0],
                n && n.style && (t = me.createElement("div"), i = me.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== we && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
            }),
            function() {
                var e = me.createElement("div");
                if (null == ne.deleteExpando) {
                    ne.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch(t) {
                        ne.deleteExpando = !1
                    }
                }
                e = null
            } (),
            re.acceptData = function(e) {
                var t = re.noData[(e.nodeName + " ").toLowerCase()],
                n = +e.nodeType || 1;
                return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
            };
            var Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Ce = /([A-Z])/g;
            re.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function(e) {
                    return e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando],
                    !!e && !l(e)
                },
                data: function(e, t, n) {
                    return u(e, t, n)
                },
                removeData: function(e, t) {
                    return d(e, t)
                },
                _data: function(e, t, n) {
                    return u(e, t, n, !0)
                },
                _removeData: function(e, t) {
                    return d(e, t, !0)
                }
            }),
            re.fn.extend({
                data: function(e, t) {
                    var n, i, r, a = this[0],
                    o = a && a.attributes;
                    if (void 0 === e) {
                        if (this.length && (r = re.data(a), 1 === a.nodeType && !re._data(a, "parsedAttrs"))) {
                            for (n = o.length; n--;) o[n] && (i = o[n].name, 0 === i.indexOf("data-") && (i = re.camelCase(i.slice(5)), s(a, i, r[i])));
                            re._data(a, "parsedAttrs", !0)
                        }
                        return r
                    }
                    return "object" == typeof e ? this.each(function() {
                        re.data(this, e)
                    }) : arguments.length > 1 ? this.each(function() {
                        re.data(this, e, t)
                    }) : a ? s(a, e, re.data(a, e)) : void 0
                },
                removeData: function(e) {
                    return this.each(function() {
                        re.removeData(this, e)
                    })
                }
            }),
            re.extend({
                queue: function(e, t, n) {
                    var i;
                    return e ? (t = (t || "fx") + "queue", i = re._data(e, t), n && (!i || re.isArray(n) ? i = re._data(e, t, re.makeArray(n)) : i.push(n)), i || []) : void 0
                },
                dequeue: function(e, t) {
                    t = t || "fx";
                    var n = re.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    a = re._queueHooks(e, t),
                    o = function() {
                        re.dequeue(e, t)
                    };
                    "inprogress" === r && (r = n.shift(), i--),
                    r && ("fx" === t && n.unshift("inprogress"), delete a.stop, r.call(e, o, a)),
                    !i && a && a.empty.fire()
                },
                _queueHooks: function(e, t) {
                    var n = t + "queueHooks";
                    return re._data(e, n) || re._data(e, n, {
                        empty: re.Callbacks("once memory").add(function() {
                            re._removeData(e, t + "queue"),
                            re._removeData(e, n)
                        })
                    })
                }
            }),
            re.fn.extend({
                queue: function(e, t) {
                    var n = 2;
                    return "string" != typeof e && (t = e, e = "fx", n--),
                    arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this: this.each(function() {
                        var n = re.queue(this, e, t);
                        re._queueHooks(this, e),
                        "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e)
                    })
                },
                dequeue: function(e) {
                    return this.each(function() {
                        re.dequeue(this, e)
                    })
                },
                clearQueue: function(e) {
                    return this.queue(e || "fx", [])
                },
                promise: function(e, t) {
                    var n, i = 1,
                    r = re.Deferred(),
                    a = this,
                    o = this.length,
                    c = function() {--i || r.resolveWith(a, [a])
                    };
                    for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) n = re._data(a[o], e + "queueHooks"),
                    n && n.empty && (i++, n.empty.add(c));
                    return c(),
                    r.promise(t)
                }
            });
            var ke = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ee = ["Top", "Right", "Bottom", "Left"],
            Se = function(e, t) {
                return e = t || e,
                "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
            },
            Le = re.access = function(e, t, n, i, r, a, o) {
                var c = 0,
                s = e.length,
                l = null == n;
                if ("object" === re.type(n)) {
                    r = !0;
                    for (c in n) re.access(e, t, c, n[c], !0, a, o)
                } else if (void 0 !== i && (r = !0, re.isFunction(i) || (o = !0), l && (o ? (t.call(e, i), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(re(e), n)
                })), t)) for (; s > c; c++) t(e[c], n, o ? i: i.call(e[c], c, t(e[c], n)));
                return r ? e: l ? t.call(e) : s ? t(e[0], n) : a
            },
            je = /^(?:checkbox|radio)$/i; !
            function() {
                var e = me.createElement("input"),
                t = me.createElement("div"),
                n = me.createDocumentFragment();
                if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== me.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick",
                function() {
                    ne.noCloneEvent = !1
                }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
                    ne.deleteExpando = !0;
                    try {
                        delete t.test
                    } catch(i) {
                        ne.deleteExpando = !1
                    }
                }
            } (),
            function() {
                var t, n, i = me.createElement("div");
                for (t in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) n = "on" + t,
                (ne[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ne[t + "Bubbles"] = i.attributes[n].expando === !1);
                i = null
            } ();
            var De = /^(?:input|select|textarea)$/i,
            Ae = /^key/,
            qe = /^(?:mouse|pointer|contextmenu)|click/,
            He = /^(?:focusinfocus|focusoutblur)$/,
            _e = /^([^.]*)(?:\.(.+)|)$/;
            re.event = {
                global: {},
                add: function(e, t, n, i, r) {
                    var a, o, c, s, l, u, d, p, f, m, h, g = re._data(e);
                    if (g) {
                        for (n.handler && (s = n, n = s.handler, r = s.selector), n.guid || (n.guid = re.guid++), (o = g.events) || (o = g.events = {}), (u = g.handle) || (u = g.handle = function(e) {
                            return typeof re === we || e && re.event.triggered === e.type ? void 0 : re.event.dispatch.apply(u.elem, arguments)
                        },
                        u.elem = e), t = (t || "").match(Ne) || [""], c = t.length; c--;) a = _e.exec(t[c]) || [],
                        f = h = a[1],
                        m = (a[2] || "").split(".").sort(),
                        f && (l = re.event.special[f] || {},
                        f = (r ? l.delegateType: l.bindType) || f, l = re.event.special[f] || {},
                        d = re.extend({
                            type: f,
                            origType: h,
                            data: i,
                            handler: n,
                            guid: n.guid,
                            selector: r,
                            needsContext: r && re.expr.match.needsContext.test(r),
                            namespace: m.join(".")
                        },
                        s), (p = o[f]) || (p = o[f] = [], p.delegateCount = 0, l.setup && l.setup.call(e, i, m, u) !== !1 || (e.addEventListener ? e.addEventListener(f, u, !1) : e.attachEvent && e.attachEvent("on" + f, u))), l.add && (l.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), r ? p.splice(p.delegateCount++, 0, d) : p.push(d), re.event.global[f] = !0);
                        e = null
                    }
                },
                remove: function(e, t, n, i, r) {
                    var a, o, c, s, l, u, d, p, f, m, h, g = re.hasData(e) && re._data(e);
                    if (g && (u = g.events)) {
                        for (t = (t || "").match(Ne) || [""], l = t.length; l--;) if (c = _e.exec(t[l]) || [], f = h = c[1], m = (c[2] || "").split(".").sort(), f) {
                            for (d = re.event.special[f] || {},
                            f = (i ? d.delegateType: d.bindType) || f, p = u[f] || [], c = c[2] && new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = a = p.length; a--;) o = p[a],
                            !r && h !== o.origType || n && n.guid !== o.guid || c && !c.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (p.splice(a, 1), o.selector && p.delegateCount--, d.remove && d.remove.call(e, o));
                            s && !p.length && (d.teardown && d.teardown.call(e, m, g.handle) !== !1 || re.removeEvent(e, f, g.handle), delete u[f])
                        } else for (f in u) re.event.remove(e, f + t[l], n, i, !0);
                        re.isEmptyObject(u) && (delete g.handle, re._removeData(e, "events"))
                    }
                },
                trigger: function(t, n, i, r) {
                    var a, o, c, s, l, u, d, p = [i || me],
                    f = te.call(t, "type") ? t.type: t,
                    m = te.call(t, "namespace") ? t.namespace.split(".") : [];
                    if (c = u = i = i || me, 3 !== i.nodeType && 8 !== i.nodeType && !He.test(f + re.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), o = f.indexOf(":") < 0 && "on" + f, t = t[re.expando] ? t: new re.Event(f, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = m.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : re.makeArray(n, [t]), l = re.event.special[f] || {},
                    r || !l.trigger || l.trigger.apply(i, n) !== !1)) {
                        if (!r && !l.noBubble && !re.isWindow(i)) {
                            for (s = l.delegateType || f, He.test(s + f) || (c = c.parentNode); c; c = c.parentNode) p.push(c),
                            u = c;
                            u === (i.ownerDocument || me) && p.push(u.defaultView || u.parentWindow || e)
                        }
                        for (d = 0; (c = p[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? s: l.bindType || f,
                        a = (re._data(c, "events") || {})[t.type] && re._data(c, "handle"),
                        a && a.apply(c, n),
                        a = o && c[o],
                        a && a.apply && re.acceptData(c) && (t.result = a.apply(c, n), t.result === !1 && t.preventDefault());
                        if (t.type = f, !r && !t.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), n) === !1) && re.acceptData(i) && o && i[f] && !re.isWindow(i)) {
                            u = i[o],
                            u && (i[o] = null),
                            re.event.triggered = f;
                            try {
                                i[f]()
                            } catch(h) {}
                            re.event.triggered = void 0,
                            u && (i[o] = u)
                        }
                        return t.result
                    }
                },
                dispatch: function(e) {
                    e = re.event.fix(e);
                    var t, n, i, r, a, o = [],
                    c = V.call(arguments),
                    s = (re._data(this, "events") || {})[e.type] || [],
                    l = re.event.special[e.type] || {};
                    if (c[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                        for (o = re.event.handlers.call(this, e, s), t = 0; (r = o[t++]) && !e.isPropagationStopped();) for (e.currentTarget = r.elem, a = 0; (i = r.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((re.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, c), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                        return l.postDispatch && l.postDispatch.call(this, e),
                        e.result
                    }
                },
                handlers: function(e, t) {
                    var n, i, r, a, o = [],
                    c = t.delegateCount,
                    s = e.target;
                    if (c && s.nodeType && (!e.button || "click" !== e.type)) for (; s != this; s = s.parentNode || this) if (1 === s.nodeType && (s.disabled !== !0 || "click" !== e.type)) {
                        for (r = [], a = 0; c > a; a++) i = t[a],
                        n = i.selector + " ",
                        void 0 === r[n] && (r[n] = i.needsContext ? re(n, this).index(s) >= 0 : re.find(n, this, null, [s]).length),
                        r[n] && r.push(i);
                        r.length && o.push({
                            elem: s,
                            handlers: r
                        })
                    }
                    return c < t.length && o.push({
                        elem: this,
                        handlers: t.slice(c)
                    }),
                    o
                },
                fix: function(e) {
                    if (e[re.expando]) return e;
                    var t, n, i, r = e.type,
                    a = e,
                    o = this.fixHooks[r];
                    for (o || (this.fixHooks[r] = o = qe.test(r) ? this.mouseHooks: Ae.test(r) ? this.keyHooks: {}), i = o.props ? this.props.concat(o.props) : this.props, e = new re.Event(a), t = i.length; t--;) n = i[t],
                    e[n] = a[n];
                    return e.target || (e.target = a.srcElement || me),
                    3 === e.target.nodeType && (e.target = e.target.parentNode),
                    e.metaKey = !!e.metaKey,
                    o.filter ? o.filter(e, a) : e
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
                        e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, i, r, a = t.button,
                        o = t.fromElement;
                        return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || me, r = i.documentElement, n = i.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)),
                        !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement: o),
                        e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
                        e
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== m() && this.focus) try {
                                return this.focus(),
                                !1
                            } catch(e) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === m() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return re.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                        },
                        _default: function(e) {
                            return re.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function(e, t, n, i) {
                    var r = re.extend(new re.Event, n, {
                        type: e,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    i ? re.event.trigger(r, null, t) : re.event.dispatch.call(t, r),
                    r.isDefaultPrevented() && n.preventDefault()
                }
            },
            re.removeEvent = me.removeEventListener ?
            function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            }: function(e, t, n) {
                var i = "on" + t;
                e.detachEvent && (typeof e[i] === we && (e[i] = null), e.detachEvent(i, n))
            },
            re.Event = function(e, t) {
                return this instanceof re.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p: f) : this.type = e, t && re.extend(this, t), this.timeStamp = e && e.timeStamp || re.now(), void(this[re.expando] = !0)) : new re.Event(e, t)
            },
            re.Event.prototype = {
                isDefaultPrevented: f,
                isPropagationStopped: f,
                isImmediatePropagationStopped: f,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = p,
                    e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = p,
                    e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = p,
                    e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
                    this.stopPropagation()
                }
            },
            re.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            },
            function(e, t) {
                re.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, i = this,
                        r = e.relatedTarget,
                        a = e.handleObj;
                        return (!r || r !== i && !re.contains(i, r)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t),
                        n
                    }
                }
            }),
            ne.submitBubbles || (re.event.special.submit = {
                setup: function() {
                    return re.nodeName(this, "form") ? !1 : void re.event.add(this, "click._submit keypress._submit",
                    function(e) {
                        var t = e.target,
                        n = re.nodeName(t, "input") || re.nodeName(t, "button") ? t.form: void 0;
                        n && !re._data(n, "submitBubbles") && (re.event.add(n, "submit._submit",
                        function(e) {
                            e._submit_bubble = !0
                        }), re._data(n, "submitBubbles", !0))
                    })
                },
                postDispatch: function(e) {
                    e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && re.event.simulate("submit", this.parentNode, e, !0))
                },
                teardown: function() {
                    return re.nodeName(this, "form") ? !1 : void re.event.remove(this, "._submit")
                }
            }),
            ne.changeBubbles || (re.event.special.change = {
                setup: function() {
                    return De.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (re.event.add(this, "propertychange._change",
                    function(e) {
                        "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                    }), re.event.add(this, "click._change",
                    function(e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1),
                        re.event.simulate("change", this, e, !0)
                    })), !1) : void re.event.add(this, "beforeactivate._change",
                    function(e) {
                        var t = e.target;
                        De.test(t.nodeName) && !re._data(t, "changeBubbles") && (re.event.add(t, "change._change",
                        function(e) { ! this.parentNode || e.isSimulated || e.isTrigger || re.event.simulate("change", this.parentNode, e, !0)
                        }), re._data(t, "changeBubbles", !0))
                    })
                },
                handle: function(e) {
                    var t = e.target;
                    return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                },
                teardown: function() {
                    return re.event.remove(this, "._change"),
                    !De.test(this.nodeName)
                }
            }),
            ne.focusinBubbles || re.each({
                focus: "focusin",
                blur: "focusout"
            },
            function(e, t) {
                var n = function(e) {
                    re.event.simulate(t, e.target, re.event.fix(e), !0)
                };
                re.event.special[t] = {
                    setup: function() {
                        var i = this.ownerDocument || this,
                        r = re._data(i, t);
                        r || i.addEventListener(e, n, !0),
                        re._data(i, t, (r || 0) + 1)
                    },
                    teardown: function() {
                        var i = this.ownerDocument || this,
                        r = re._data(i, t) - 1;
                        r ? re._data(i, t, r) : (i.removeEventListener(e, n, !0), re._removeData(i, t))
                    }
                }
            }),
            re.fn.extend({
                on: function(e, t, n, i, r) {
                    var a, o;
                    if ("object" == typeof e) {
                        "string" != typeof t && (n = n || t, t = void 0);
                        for (a in e) this.on(a, t, n, e[a], r);
                        return this
                    }
                    if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = f;
                    else if (!i) return this;
                    return 1 === r && (o = i, i = function(e) {
                        return re().off(e),
                        o.apply(this, arguments)
                    },
                    i.guid = o.guid || (o.guid = re.guid++)),
                    this.each(function() {
                        re.event.add(this, e, i, n, t)
                    })
                },
                one: function(e, t, n, i) {
                    return this.on(e, t, n, i, 1)
                },
                off: function(e, t, n) {
                    var i, r;
                    if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
                    re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace: i.origType, i.selector, i.handler),
                    this;
                    if ("object" == typeof e) {
                        for (r in e) this.off(r, t, e[r]);
                        return this
                    }
                    return (t === !1 || "function" == typeof t) && (n = t, t = void 0),
                    n === !1 && (n = f),
                    this.each(function() {
                        re.event.remove(this, e, n, t)
                    })
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        re.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    return n ? re.event.trigger(e, t, n, !0) : void 0
                }
            });
            var Me = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Oe = / jQuery\d+="(?:null|\d+)"/g,
            Fe = new RegExp("<(?:" + Me + ")[\\s/>]", "i"),
            Be = /^\s+/,
            Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            We = /<([\w:]+)/,
            Pe = /<tbody/i,
            $e = /<|&#?\w+;/,
            ze = /<(?:script|style|link)/i,
            Xe = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ye = /^$|\/(?:java|ecma)script/i,
            Ue = /^true\/(.*)/,
            Je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Ve = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            Ge = h(me),
            Qe = Ge.appendChild(me.createElement("div"));
            Ve.optgroup = Ve.option,
            Ve.tbody = Ve.tfoot = Ve.colgroup = Ve.caption = Ve.thead,
            Ve.th = Ve.td,
            re.extend({
                clone: function(e, t, n) {
                    var i, r, a, o, c, s = re.contains(e.ownerDocument, e);
                    if (ne.html5Clone || re.isXMLDoc(e) || !Fe.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (Qe.innerHTML = e.outerHTML, Qe.removeChild(a = Qe.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e))) for (i = g(a), c = g(e), o = 0; null != (r = c[o]); ++o) i[o] && w(r, i[o]);
                    if (t) if (n) for (c = c || g(e), i = i || g(a), o = 0; null != (r = c[o]); o++) I(r, i[o]);
                    else I(e, a);
                    return i = g(a, "script"),
                    i.length > 0 && b(i, !s && g(e, "script")),
                    i = c = r = null,
                    a
                },
                buildFragment: function(e, t, n, i) {
                    for (var r, a, o, c, s, l, u, d = e.length,
                    p = h(t), f = [], m = 0; d > m; m++) if (a = e[m], a || 0 === a) if ("object" === re.type(a)) re.merge(f, a.nodeType ? [a] : a);
                    else if ($e.test(a)) {
                        for (c = c || p.appendChild(t.createElement("div")), s = (We.exec(a) || ["", ""])[1].toLowerCase(), u = Ve[s] || Ve._default, c.innerHTML = u[1] + a.replace(Re, "<$1></$2>") + u[2], r = u[0]; r--;) c = c.lastChild;
                        if (!ne.leadingWhitespace && Be.test(a) && f.push(t.createTextNode(Be.exec(a)[0])), !ne.tbody) for (a = "table" !== s || Pe.test(a) ? "<table>" !== u[1] || Pe.test(a) ? 0 : c: c.firstChild, r = a && a.childNodes.length; r--;) re.nodeName(l = a.childNodes[r], "tbody") && !l.childNodes.length && a.removeChild(l);
                        for (re.merge(f, c.childNodes), c.textContent = ""; c.firstChild;) c.removeChild(c.firstChild);
                        c = p.lastChild
                    } else f.push(t.createTextNode(a));
                    for (c && p.removeChild(c), ne.appendChecked || re.grep(g(f, "input"), v), m = 0; a = f[m++];) if ((!i || -1 === re.inArray(a, i)) && (o = re.contains(a.ownerDocument, a), c = g(p.appendChild(a), "script"), o && b(c), n)) for (r = 0; a = c[r++];) Ye.test(a.type || "") && n.push(a);
                    return c = null,
                    p
                },
                cleanData: function(e, t) {
                    for (var n, i, r, a, o = 0,
                    c = re.expando,
                    s = re.cache,
                    l = ne.deleteExpando,
                    u = re.event.special; null != (n = e[o]); o++) if ((t || re.acceptData(n)) && (r = n[c], a = r && s[r])) {
                        if (a.events) for (i in a.events) u[i] ? re.event.remove(n, i) : re.removeEvent(n, i, a.handle);
                        s[r] && (delete s[r], l ? delete n[c] : typeof n.removeAttribute !== we ? n.removeAttribute(c) : n[c] = null, J.push(r))
                    }
                }
            }),
            re.fn.extend({
                text: function(e) {
                    return Le(this,
                    function(e) {
                        return void 0 === e ? re.text(this) : this.empty().append((this[0] && this[0].ownerDocument || me).createTextNode(e))
                    },
                    null, e, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments,
                    function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = y(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments,
                    function(e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = y(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments,
                    function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments,
                    function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                remove: function(e, t) {
                    for (var n, i = e ? re.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || re.cleanData(g(n)),
                    n.parentNode && (t && re.contains(n.ownerDocument, n) && b(g(n, "script")), n.parentNode.removeChild(n));
                    return this
                },
                empty: function() {
                    for (var e, t = 0; null != (e = this[t]); t++) {
                        for (1 === e.nodeType && re.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                        e.options && re.nodeName(e, "select") && (e.options.length = 0)
                    }
                    return this
                },
                clone: function(e, t) {
                    return e = null == e ? !1 : e,
                    t = null == t ? e: t,
                    this.map(function() {
                        return re.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return Le(this,
                    function(e) {
                        var t = this[0] || {},
                        n = 0,
                        i = this.length;
                        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Oe, "") : void 0;
                        if ("string" == typeof e && !ze.test(e) && (ne.htmlSerialize || !Fe.test(e)) && (ne.leadingWhitespace || !Be.test(e)) && !Ve[(We.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(Re, "<$1></$2>");
                            try {
                                for (; i > n; n++) t = this[n] || {},
                                1 === t.nodeType && (re.cleanData(g(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch(r) {}
                        }
                        t && this.empty().append(e)
                    },
                    null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = arguments[0];
                    return this.domManip(arguments,
                    function(t) {
                        e = this.parentNode,
                        re.cleanData(g(this)),
                        e && e.replaceChild(t, this)
                    }),
                    e && (e.length || e.nodeType) ? this: this.remove()
                },
                detach: function(e) {
                    return this.remove(e, !0)
                },
                domManip: function(e, t) {
                    e = G.apply([], e);
                    var n, i, r, a, o, c, s = 0,
                    l = this.length,
                    u = this,
                    d = l - 1,
                    p = e[0],
                    f = re.isFunction(p);
                    if (f || l > 1 && "string" == typeof p && !ne.checkClone && Xe.test(p)) return this.each(function(n) {
                        var i = u.eq(n);
                        f && (e[0] = p.call(this, n, i.html())),
                        i.domManip(e, t)
                    });
                    if (l && (c = re.buildFragment(e, this[0].ownerDocument, !1, this), n = c.firstChild, 1 === c.childNodes.length && (c = n), n)) {
                        for (a = re.map(g(c, "script"), N), r = a.length; l > s; s++) i = c,
                        s !== d && (i = re.clone(i, !0, !0), r && re.merge(a, g(i, "script"))),
                        t.call(this[s], i, s);
                        if (r) for (o = a[a.length - 1].ownerDocument, re.map(a, x), s = 0; r > s; s++) i = a[s],
                        Ye.test(i.type || "") && !re._data(i, "globalEval") && re.contains(o, i) && (i.src ? re._evalUrl && re._evalUrl(i.src) : re.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Je, "")));
                        c = n = null
                    }
                    return this
                }
            }),
            re.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            },
            function(e, t) {
                re.fn[e] = function(e) {
                    for (var n, i = 0,
                    r = [], a = re(e), o = a.length - 1; o >= i; i++) n = i === o ? this: this.clone(!0),
                    re(a[i])[t](n),
                    Q.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var Ke, Ze = {}; !
            function() {
                var e;
                ne.shrinkWrapBlocks = function() {
                    if (null != e) return e;
                    e = !1;
                    var t, n, i;
                    return n = me.getElementsByTagName("body")[0],
                    n && n.style ? (t = me.createElement("div"), i = me.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== we && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(me.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
                }
            } ();
            var et, tt, nt = /^margin/,
            it = new RegExp("^(" + ke + ")(?!px)[a-z%]+$", "i"),
            rt = /^(top|right|bottom|left)$/;
            e.getComputedStyle ? (et = function(t) {
                return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
            },
            tt = function(e, t, n) {
                var i, r, a, o, c = e.style;
                return n = n || et(e),
                o = n ? n.getPropertyValue(t) || n[t] : void 0,
                n && ("" !== o || re.contains(e.ownerDocument, e) || (o = re.style(e, t)), it.test(o) && nt.test(t) && (i = c.width, r = c.minWidth, a = c.maxWidth, c.minWidth = c.maxWidth = c.width = o, o = n.width, c.width = i, c.minWidth = r, c.maxWidth = a)),
                void 0 === o ? o: o + ""
            }) : me.documentElement.currentStyle && (et = function(e) {
                return e.currentStyle
            },
            tt = function(e, t, n) {
                var i, r, a, o, c = e.style;
                return n = n || et(e),
                o = n ? n[t] : void 0,
                null == o && c && c[t] && (o = c[t]),
                it.test(o) && !rt.test(t) && (i = c.left, r = e.runtimeStyle, a = r && r.left, a && (r.left = e.currentStyle.left), c.left = "fontSize" === t ? "1em": o, o = c.pixelLeft + "px", c.left = i, a && (r.left = a)),
                void 0 === o ? o: o + "" || "auto"
            }),
            function() {
                function t() {
                    var t, n, i, r;
                    n = me.getElementsByTagName("body")[0],
                    n && n.style && (t = me.createElement("div"), i = me.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a = o = !1, s = !0, e.getComputedStyle && (a = "1%" !== (e.getComputedStyle(t, null) || {}).top, o = "4px" === (e.getComputedStyle(t, null) || {
                        width: "4px"
                    }).width, r = t.appendChild(me.createElement("div")), r.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", r.style.marginRight = r.style.width = "0", t.style.width = "1px", s = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight), t.removeChild(r)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = t.getElementsByTagName("td"), r[0].style.cssText = "margin:0;border:0;padding:0;display:none", c = 0 === r[0].offsetHeight, c && (r[0].style.display = "", r[1].style.display = "none", c = 0 === r[0].offsetHeight), n.removeChild(i))
                }
                var n, i, r, a, o, c, s;
                n = me.createElement("div"),
                n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                r = n.getElementsByTagName("a")[0],
                i = r && r.style,
                i && (i.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === i.opacity, ne.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, re.extend(ne, {
                    reliableHiddenOffsets: function() {
                        return null == c && t(),
                        c
                    },
                    boxSizingReliable: function() {
                        return null == o && t(),
                        o
                    },
                    pixelPosition: function() {
                        return null == a && t(),
                        a
                    },
                    reliableMarginRight: function() {
                        return null == s && t(),
                        s
                    }
                }))
            } (),
            re.swap = function(e, t, n, i) {
                var r, a, o = {};
                for (a in t) o[a] = e.style[a],
                e.style[a] = t[a];
                r = n.apply(e, i || []);
                for (a in t) e.style[a] = o[a];
                return r
            };
            var at = /alpha\([^)]*\)/i,
            ot = /opacity\s*=\s*([^)]*)/,
            ct = /^(none|table(?!-c[ea]).+)/,
            st = new RegExp("^(" + ke + ")(.*)$", "i"),
            lt = new RegExp("^([+-])=(" + ke + ")", "i"),
            ut = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            dt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            pt = ["Webkit", "O", "Moz", "ms"];
            re.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = tt(e, "opacity");
                                return "" === n ? "1": n
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": ne.cssFloat ? "cssFloat": "styleFloat"
                },
                style: function(e, t, n, i) {
                    if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                        var r, a, o, c = re.camelCase(t),
                        s = e.style;
                        if (t = re.cssProps[c] || (re.cssProps[c] = E(s, c)), o = re.cssHooks[t] || re.cssHooks[c], void 0 === n) return o && "get" in o && void 0 !== (r = o.get(e, !1, i)) ? r: s[t];
                        if (a = typeof n, "string" === a && (r = lt.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(re.css(e, t)), a = "number"), null != n && n === n && ("number" !== a || re.cssNumber[c] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (s[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, i))))) try {
                            s[t] = n
                        } catch(l) {}
                    }
                },
                css: function(e, t, n, i) {
                    var r, a, o, c = re.camelCase(t);
                    return t = re.cssProps[c] || (re.cssProps[c] = E(e.style, c)),
                    o = re.cssHooks[t] || re.cssHooks[c],
                    o && "get" in o && (a = o.get(e, !0, n)),
                    void 0 === a && (a = tt(e, t, i)),
                    "normal" === a && t in dt && (a = dt[t]),
                    "" === n || n ? (r = parseFloat(a), n === !0 || re.isNumeric(r) ? r || 0 : a) : a
                }
            }),
            re.each(["height", "width"],
            function(e, t) {
                re.cssHooks[t] = {
                    get: function(e, n, i) {
                        return n ? ct.test(re.css(e, "display")) && 0 === e.offsetWidth ? re.swap(e, ut,
                        function() {
                            return D(e, t, i)
                        }) : D(e, t, i) : void 0
                    },
                    set: function(e, n, i) {
                        var r = i && et(e);
                        return L(e, n, i ? j(e, t, i, ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, r), r) : 0)
                    }
                }
            }),
            ne.opacity || (re.cssHooks.opacity = {
                get: function(e, t) {
                    return ot.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
                },
                set: function(e, t) {
                    var n = e.style,
                    i = e.currentStyle,
                    r = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")": "",
                    a = i && i.filter || n.filter || "";
                    n.zoom = 1,
                    (t >= 1 || "" === t) && "" === re.trim(a.replace(at, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = at.test(a) ? a.replace(at, r) : a + " " + r)
                }
            }),
            re.cssHooks.marginRight = k(ne.reliableMarginRight,
            function(e, t) {
                return t ? re.swap(e, {
                    display: "inline-block"
                },
                tt, [e, "marginRight"]) : void 0
            }),
            re.each({
                margin: "",
                padding: "",
                border: "Width"
            },
            function(e, t) {
                re.cssHooks[e + t] = {
                    expand: function(n) {
                        for (var i = 0,
                        r = {},
                        a = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + Ee[i] + t] = a[i] || a[i - 2] || a[0];
                        return r
                    }
                },
                nt.test(e) || (re.cssHooks[e + t].set = L)
            }),
            re.fn.extend({
                css: function(e, t) {
                    return Le(this,
                    function(e, t, n) {
                        var i, r, a = {},
                        o = 0;
                        if (re.isArray(t)) {
                            for (i = et(e), r = t.length; r > o; o++) a[t[o]] = re.css(e, t[o], !1, i);
                            return a
                        }
                        return void 0 !== n ? re.style(e, t, n) : re.css(e, t)
                    },
                    e, t, arguments.length > 1)
                },
                show: function() {
                    return S(this, !0)
                },
                hide: function() {
                    return S(this)
                },
                toggle: function(e) {
                    return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                        Se(this) ? re(this).show() : re(this).hide()
                    })
                }
            }),
            re.Tween = A,
            A.prototype = {
                constructor: A,
                init: function(e, t, n, i, r, a) {
                    this.elem = e,
                    this.prop = n,
                    this.easing = r || "swing",
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = i,
                    this.unit = a || (re.cssNumber[n] ? "": "px")
                },
                cur: function() {
                    var e = A.propHooks[this.prop];
                    return e && e.get ? e.get(this) : A.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = A.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : A.propHooks._default.set(this),
                    this
                }
            },
            A.prototype.init.prototype = A.prototype,
            A.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = re.css(e.elem, e.prop, ""), t && "auto" !== t ? t: 0) : e.elem[e.prop]
                    },
                    set: function(e) {
                        re.fx.step[e.prop] ? re.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop]) ? re.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                    }
                }
            },
            A.propHooks.scrollTop = A.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            },
            re.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return.5 - Math.cos(e * Math.PI) / 2
                }
            },
            re.fx = A.prototype.init,
            re.fx.step = {};
            var ft, mt, ht = /^(?:toggle|show|hide)$/,
            gt = new RegExp("^(?:([+-])=|)(" + ke + ")([a-z%]*)$", "i"),
            vt = /queueHooks$/,
            yt = [M],
            Nt = {
                "*": [function(e, t) {
                    var n = this.createTween(e, t),
                    i = n.cur(),
                    r = gt.exec(t),
                    a = r && r[3] || (re.cssNumber[e] ? "": "px"),
                    o = (re.cssNumber[e] || "px" !== a && +i) && gt.exec(re.css(n.elem, e)),
                    c = 1,
                    s = 20;
                    if (o && o[3] !== a) {
                        a = a || o[3],
                        r = r || [],
                        o = +i || 1;
                        do c = c || ".5",
                        o /= c,
                        re.style(n.elem, e, o + a);
                        while (c !== (c = n.cur() / i) && 1 !== c && --s)
                    }
                    return r && (o = n.start = +o || +i || 0, n.unit = a, n.end = r[1] ? o + (r[1] + 1) * r[2] : +r[2]),
                    n
                }]
            };
            re.Animation = re.extend(F, {
                tweener: function(e, t) {
                    re.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    for (var n, i = 0,
                    r = e.length; r > i; i++) n = e[i],
                    Nt[n] = Nt[n] || [],
                    Nt[n].unshift(t)
                },
                prefilter: function(e, t) {
                    t ? yt.unshift(e) : yt.push(e)
                }
            }),
            re.speed = function(e, t, n) {
                var i = e && "object" == typeof e ? re.extend({},
                e) : {
                    complete: n || !n && t || re.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !re.isFunction(t) && t
                };
                return i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration: i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default,
                (null == i.queue || i.queue === !0) && (i.queue = "fx"),
                i.old = i.complete,
                i.complete = function() {
                    re.isFunction(i.old) && i.old.call(this),
                    i.queue && re.dequeue(this, i.queue)
                },
                i
            },
            re.fn.extend({
                fadeTo: function(e, t, n, i) {
                    return this.filter(Se).css("opacity", 0).show().end().animate({
                        opacity: t
                    },
                    e, n, i)
                },
                animate: function(e, t, n, i) {
                    var r = re.isEmptyObject(e),
                    a = re.speed(t, n, i),
                    o = function() {
                        var t = F(this, re.extend({},
                        e), a); (r || re._data(this, "finish")) && t.stop(!0)
                    };
                    return o.finish = o,
                    r || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
                },
                stop: function(e, t, n) {
                    var i = function(e) {
                        var t = e.stop;
                        delete e.stop,
                        t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0),
                    t && e !== !1 && this.queue(e || "fx", []),
                    this.each(function() {
                        var t = !0,
                        r = null != e && e + "queueHooks",
                        a = re.timers,
                        o = re._data(this);
                        if (r) o[r] && o[r].stop && i(o[r]);
                        else for (r in o) o[r] && o[r].stop && vt.test(r) && i(o[r]);
                        for (r = a.length; r--;) a[r].elem !== this || null != e && a[r].queue !== e || (a[r].anim.stop(n), t = !1, a.splice(r, 1)); (t || !n) && re.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"),
                    this.each(function() {
                        var t, n = re._data(this),
                        i = n[e + "queue"],
                        r = n[e + "queueHooks"],
                        a = re.timers,
                        o = i ? i.length: 0;
                        for (n.finish = !0, re.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
                        for (t = 0; o > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish
                    })
                }
            }),
            re.each(["toggle", "show", "hide"],
            function(e, t) {
                var n = re.fn[t];
                re.fn[t] = function(e, i, r) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(H(t, !0), e, i, r)
                }
            }),
            re.each({
                slideDown: H("show"),
                slideUp: H("hide"),
                slideToggle: H("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            },
            function(e, t) {
                re.fn[e] = function(e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }),
            re.timers = [],
            re.fx.tick = function() {
                var e, t = re.timers,
                n = 0;
                for (ft = re.now(); n < t.length; n++) e = t[n],
                e() || t[n] !== e || t.splice(n--, 1);
                t.length || re.fx.stop(),
                ft = void 0
            },
            re.fx.timer = function(e) {
                re.timers.push(e),
                e() ? re.fx.start() : re.timers.pop()
            },
            re.fx.interval = 13,
            re.fx.start = function() {
                mt || (mt = setInterval(re.fx.tick, re.fx.interval))
            },
            re.fx.stop = function() {
                clearInterval(mt),
                mt = null
            },
            re.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            re.fn.delay = function(e, t) {
                return e = re.fx ? re.fx.speeds[e] || e: e,
                t = t || "fx",
                this.queue(t,
                function(t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(i)
                    }
                })
            },
            function() {
                var e, t, n, i, r;
                t = me.createElement("div"),
                t.setAttribute("className", "t"),
                t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                i = t.getElementsByTagName("a")[0],
                n = me.createElement("select"),
                r = n.appendChild(me.createElement("option")),
                e = t.getElementsByTagName("input")[0],
                i.style.cssText = "top:1px",
                ne.getSetAttribute = "t" !== t.className,
                ne.style = /top/.test(i.getAttribute("style")),
                ne.hrefNormalized = "/a" === i.getAttribute("href"),
                ne.checkOn = !!e.value,
                ne.optSelected = r.selected,
                ne.enctype = !!me.createElement("form").enctype,
                n.disabled = !0,
                ne.optDisabled = !r.disabled,
                e = me.createElement("input"),
                e.setAttribute("value", ""),
                ne.input = "" === e.getAttribute("value"),
                e.value = "t",
                e.setAttribute("type", "radio"),
                ne.radioValue = "t" === e.value
            } ();
            var xt = /\r/g;
            re.fn.extend({
                val: function(e) {
                    var t, n, i, r = this[0]; {
                        if (arguments.length) return i = re.isFunction(e),
                        this.each(function(n) {
                            var r;
                            1 === this.nodeType && (r = i ? e.call(this, n, re(this).val()) : e, null == r ? r = "": "number" == typeof r ? r += "": re.isArray(r) && (r = re.map(r,
                            function(e) {
                                return null == e ? "": e + ""
                            })), t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                        });
                        if (r) return t = re.valHooks[r.type] || re.valHooks[r.nodeName.toLowerCase()],
                        t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n: (n = r.value, "string" == typeof n ? n.replace(xt, "") : null == n ? "": n)
                    }
                }
            }),
            re.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = re.find.attr(e, "value");
                            return null != t ? t: re.trim(re.text(e))
                        }
                    },
                    select: {
                        get: function(e) {
                            for (var t, n, i = e.options,
                            r = e.selectedIndex,
                            a = "select-one" === e.type || 0 > r,
                            o = a ? null: [], c = a ? r + 1 : i.length, s = 0 > r ? c: a ? r: 0; c > s; s++) if (n = i[s], (n.selected || s === r) && (ne.optDisabled ? !n.disabled: null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !re.nodeName(n.parentNode, "optgroup"))) {
                                if (t = re(n).val(), a) return t;
                                o.push(t)
                            }
                            return o
                        },
                        set: function(e, t) {
                            for (var n, i, r = e.options,
                            a = re.makeArray(t), o = r.length; o--;) if (i = r[o], re.inArray(re.valHooks.option.get(i), a) >= 0) try {
                                i.selected = n = !0
                            } catch(c) {
                                i.scrollHeight
                            } else i.selected = !1;
                            return n || (e.selectedIndex = -1),
                            r
                        }
                    }
                }
            }),
            re.each(["radio", "checkbox"],
            function() {
                re.valHooks[this] = {
                    set: function(e, t) {
                        return re.isArray(t) ? e.checked = re.inArray(re(e).val(), t) >= 0 : void 0
                    }
                },
                ne.checkOn || (re.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on": e.value
                })
            });
            var bt, It, wt = re.expr.attrHandle,
            Tt = /^(?:checked|selected)$/i,
            Ct = ne.getSetAttribute,
            kt = ne.input;
            re.fn.extend({
                attr: function(e, t) {
                    return Le(this, re.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        re.removeAttr(this, e)
                    })
                }
            }),
            re.extend({
                attr: function(e, t, n) {
                    var i, r, a = e.nodeType;
                    if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === we ? re.prop(e, t, n) : (1 === a && re.isXMLDoc(e) || (t = t.toLowerCase(), i = re.attrHooks[t] || (re.expr.match.bool.test(t) ? It: bt)), void 0 === n ? i && "get" in i && null !== (r = i.get(e, t)) ? r: (r = re.find.attr(e, t), null == r ? void 0 : r) : null !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r: (e.setAttribute(t, n + ""), n) : void re.removeAttr(e, t))
                },
                removeAttr: function(e, t) {
                    var n, i, r = 0,
                    a = t && t.match(Ne);
                    if (a && 1 === e.nodeType) for (; n = a[r++];) i = re.propFix[n] || n,
                    re.expr.match.bool.test(n) ? kt && Ct || !Tt.test(n) ? e[i] = !1 : e[re.camelCase("default-" + n)] = e[i] = !1 : re.attr(e, n, ""),
                    e.removeAttribute(Ct ? n: i)
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!ne.radioValue && "radio" === t && re.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                            }
                        }
                    }
                }
            }),
            It = {
                set: function(e, t, n) {
                    return t === !1 ? re.removeAttr(e, n) : kt && Ct || !Tt.test(n) ? e.setAttribute(!Ct && re.propFix[n] || n, n) : e[re.camelCase("default-" + n)] = e[n] = !0,
                    n
                }
            },
            re.each(re.expr.match.bool.source.match(/\w+/g),
            function(e, t) {
                var n = wt[t] || re.find.attr;
                wt[t] = kt && Ct || !Tt.test(t) ?
                function(e, t, i) {
                    var r, a;
                    return i || (a = wt[t], wt[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, wt[t] = a),
                    r
                }: function(e, t, n) {
                    return n ? void 0 : e[re.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
            }),
            kt && Ct || (re.attrHooks.value = {
                set: function(e, t, n) {
                    return re.nodeName(e, "input") ? void(e.defaultValue = t) : bt && bt.set(e, t, n)
                }
            }),
            Ct || (bt = {
                set: function(e, t, n) {
                    var i = e.getAttributeNode(n);
                    return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)),
                    i.value = t += "",
                    "value" === n || t === e.getAttribute(n) ? t: void 0
                }
            },
            wt.id = wt.name = wt.coords = function(e, t, n) {
                var i;
                return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value: null
            },
            re.valHooks.button = {
                get: function(e, t) {
                    var n = e.getAttributeNode(t);
                    return n && n.specified ? n.value: void 0
                },
                set: bt.set
            },
            re.attrHooks.contenteditable = {
                set: function(e, t, n) {
                    bt.set(e, "" === t ? !1 : t, n)
                }
            },
            re.each(["width", "height"],
            function(e, t) {
                re.attrHooks[t] = {
                    set: function(e, n) {
                        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                    }
                }
            })),
            ne.style || (re.attrHooks.style = {
                get: function(e) {
                    return e.style.cssText || void 0
                },
                set: function(e, t) {
                    return e.style.cssText = t + ""
                }
            });
            var Et = /^(?:input|select|textarea|button|object)$/i,
            St = /^(?:a|area)$/i;
            re.fn.extend({
                prop: function(e, t) {
                    return Le(this, re.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return e = re.propFix[e] || e,
                    this.each(function() {
                        try {
                            this[e] = void 0,
                            delete this[e]
                        } catch(t) {}
                    })
                }
            }),
            re.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(e, t, n) {
                    var i, r, a, o = e.nodeType;
                    if (e && 3 !== o && 8 !== o && 2 !== o) return a = 1 !== o || !re.isXMLDoc(e),
                    a && (t = re.propFix[t] || t, r = re.propHooks[t]),
                    void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i: e[t] = n: r && "get" in r && null !== (i = r.get(e, t)) ? i: e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = re.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : Et.test(e.nodeName) || St.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                }
            }),
            ne.hrefNormalized || re.each(["href", "src"],
            function(e, t) {
                re.propHooks[t] = {
                    get: function(e) {
                        return e.getAttribute(t, 4)
                    }
                }
            }),
            ne.optSelected || (re.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
                    null
                }
            }),
            re.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
            function() {
                re.propFix[this.toLowerCase()] = this
            }),
            ne.enctype || (re.propFix.enctype = "encoding");
            var Lt = /[\t\r\n\f]/g;
            re.fn.extend({
                addClass: function(e) {
                    var t, n, i, r, a, o, c = 0,
                    s = this.length,
                    l = "string" == typeof e && e;
                    if (re.isFunction(e)) return this.each(function(t) {
                        re(this).addClass(e.call(this, t, this.className))
                    });
                    if (l) for (t = (e || "").match(Ne) || []; s > c; c++) if (n = this[c], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Lt, " ") : " ")) {
                        for (a = 0; r = t[a++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        o = re.trim(i),
                        n.className !== o && (n.className = o)
                    }
                    return this
                },
                removeClass: function(e) {
                    var t, n, i, r, a, o, c = 0,
                    s = this.length,
                    l = 0 === arguments.length || "string" == typeof e && e;
                    if (re.isFunction(e)) return this.each(function(t) {
                        re(this).removeClass(e.call(this, t, this.className))
                    });
                    if (l) for (t = (e || "").match(Ne) || []; s > c; c++) if (n = this[c], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Lt, " ") : "")) {
                        for (a = 0; r = t[a++];) for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                        o = e ? re.trim(i) : "",
                        n.className !== o && (n.className = o)
                    }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function(n) {
                        re(this).toggleClass(e.call(this, n, this.className, t), t)
                    }) : this.each(function() {
                        if ("string" === n) for (var t, i = 0,
                        r = re(this), a = e.match(Ne) || []; t = a[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                        else(n === we || "boolean" === n) && (this.className && re._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "": re._data(this, "__className__") || "")
                    })
                },
                hasClass: function(e) {
                    for (var t = " " + e + " ",
                    n = 0,
                    i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Lt, " ").indexOf(t) >= 0) return ! 0;
                    return ! 1
                }
            }),
            re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
            function(e, t) {
                re.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }),
            re.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                },
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, i) {
                    return this.on(t, e, n, i)
                },
                undelegate: function(e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            });
            var jt = re.now(),
            Dt = /\?/,
            At = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            re.parseJSON = function(t) {
                if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
                var n, i = null,
                r = re.trim(t + "");
                return r && !re.trim(r.replace(At,
                function(e, t, r, a) {
                    return n && t && (i = 0),
                    0 === i ? e: (n = r || t, i += !a - !r, "")
                })) ? Function("return " + r)() : re.error("Invalid JSON: " + t)
            },
            re.parseXML = function(t) {
                var n, i;
                if (!t || "string" != typeof t) return null;
                try {
                    e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
                } catch(r) {
                    n = void 0
                }
                return n && n.documentElement && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t),
                n
            };
            var qt, Ht, _t = /#.*$/,
            Mt = /([?&])_=[^&]*/,
            Ot = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Bt = /^(?:GET|HEAD)$/,
            Rt = /^\/\//,
            Wt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Pt = {},
            $t = {},
            zt = "*/".concat("*");
            try {
                Ht = location.href
            } catch(Xt) {
                Ht = me.createElement("a"),
                Ht.href = "",
                Ht = Ht.href
            }
            qt = Wt.exec(Ht.toLowerCase()) || [],
            re.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Ht,
                    type: "GET",
                    isLocal: Ft.test(qt[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": zt,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": re.parseJSON,
                        "text xml": re.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? W(W(e, re.ajaxSettings), t) : W(re.ajaxSettings, e)
                },
                ajaxPrefilter: B(Pt),
                ajaxTransport: B($t),
                ajax: function(e, t) {
                    function n(e, t, n, i) {
                        var r, u, v, y, x, I = t;
                        2 !== N && (N = 2, c && clearTimeout(c), l = void 0, o = i || "", b.readyState = e > 0 ? 4 : 0, r = e >= 200 && 300 > e || 304 === e, n && (y = P(d, b, n)), y = $(d, y, b, r), r ? (d.ifModified && (x = b.getResponseHeader("Last-Modified"), x && (re.lastModified[a] = x), x = b.getResponseHeader("etag"), x && (re.etag[a] = x)), 204 === e || "HEAD" === d.type ? I = "nocontent": 304 === e ? I = "notmodified": (I = y.state, u = y.data, v = y.error, r = !v)) : (v = I, (e || !I) && (I = "error", 0 > e && (e = 0))), b.status = e, b.statusText = (t || I) + "", r ? m.resolveWith(p, [u, I, b]) : m.rejectWith(p, [b, I, v]), b.statusCode(g), g = void 0, s && f.trigger(r ? "ajaxSuccess": "ajaxError", [b, d, r ? u: v]), h.fireWith(p, [b, I]), s && (f.trigger("ajaxComplete", [b, d]), --re.active || re.event.trigger("ajaxStop")))
                    }
                    "object" == typeof e && (t = e, e = void 0),
                    t = t || {};
                    var i, r, a, o, c, s, l, u, d = re.ajaxSetup({},
                    t),
                    p = d.context || d,
                    f = d.context && (p.nodeType || p.jquery) ? re(p) : re.event,
                    m = re.Deferred(),
                    h = re.Callbacks("once memory"),
                    g = d.statusCode || {},
                    v = {},
                    y = {},
                    N = 0,
                    x = "canceled",
                    b = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === N) {
                                if (!u) for (u = {}; t = Ot.exec(o);) u[t[1].toLowerCase()] = t[2];
                                t = u[e.toLowerCase()]
                            }
                            return null == t ? null: t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === N ? o: null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return N || (e = y[n] = y[n] || e, v[e] = t),
                            this
                        },
                        overrideMimeType: function(e) {
                            return N || (d.mimeType = e),
                            this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e) if (2 > N) for (t in e) g[t] = [g[t], e[t]];
                            else b.always(e[b.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || x;
                            return l && l.abort(t),
                            n(0, t),
                            this
                        }
                    };
                    if (m.promise(b).complete = h.add, b.success = b.done, b.error = b.fail, d.url = ((e || d.url || Ht) + "").replace(_t, "").replace(Rt, qt[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = re.trim(d.dataType || "*").toLowerCase().match(Ne) || [""], null == d.crossDomain && (i = Wt.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === qt[1] && i[2] === qt[2] && (i[3] || ("http:" === i[1] ? "80": "443")) === (qt[3] || ("http:" === qt[1] ? "80": "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = re.param(d.data, d.traditional)), R(Pt, d, t, b), 2 === N) return b;
                    s = re.event && d.global,
                    s && 0 === re.active++&&re.event.trigger("ajaxStart"),
                    d.type = d.type.toUpperCase(),
                    d.hasContent = !Bt.test(d.type),
                    a = d.url,
                    d.hasContent || (d.data && (a = d.url += (Dt.test(a) ? "&": "?") + d.data, delete d.data), d.cache === !1 && (d.url = Mt.test(a) ? a.replace(Mt, "$1_=" + jt++) : a + (Dt.test(a) ? "&": "?") + "_=" + jt++)),
                    d.ifModified && (re.lastModified[a] && b.setRequestHeader("If-Modified-Since", re.lastModified[a]), re.etag[a] && b.setRequestHeader("If-None-Match", re.etag[a])),
                    (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && b.setRequestHeader("Content-Type", d.contentType),
                    b.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + zt + "; q=0.01": "") : d.accepts["*"]);
                    for (r in d.headers) b.setRequestHeader(r, d.headers[r]);
                    if (d.beforeSend && (d.beforeSend.call(p, b, d) === !1 || 2 === N)) return b.abort();
                    x = "abort";
                    for (r in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) b[r](d[r]);
                    if (l = R($t, d, t, b)) {
                        b.readyState = 1,
                        s && f.trigger("ajaxSend", [b, d]),
                        d.async && d.timeout > 0 && (c = setTimeout(function() {
                            b.abort("timeout")
                        },
                        d.timeout));
                        try {
                            N = 1,
                            l.send(v, n)
                        } catch(I) {
                            if (! (2 > N)) throw I;
                            n( - 1, I)
                        }
                    } else n( - 1, "No Transport");
                    return b
                },
                getJSON: function(e, t, n) {
                    return re.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return re.get(e, void 0, t, "script")
                }
            }),
            re.each(["get", "post"],
            function(e, t) {
                re[t] = function(e, n, i, r) {
                    return re.isFunction(n) && (r = r || i, i = n, n = void 0),
                    re.ajax({
                        url: e,
                        type: t,
                        dataType: r,
                        data: n,
                        success: i
                    })
                }
            }),
            re._evalUrl = function(e) {
                return re.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            },
            re.fn.extend({
                wrapAll: function(e) {
                    if (re.isFunction(e)) return this.each(function(t) {
                        re(this).wrapAll(e.call(this, t))
                    });
                    if (this[0]) {
                        var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && t.insertBefore(this[0]),
                        t.map(function() {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                            return e
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(e) {
                    return re.isFunction(e) ? this.each(function(t) {
                        re(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = re(this),
                        n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = re.isFunction(e);
                    return this.each(function(n) {
                        re(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        re.nodeName(this, "body") || re(this).replaceWith(this.childNodes)
                    }).end()
                }
            }),
            re.expr.filters.hidden = function(e) {
                return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || re.css(e, "display"))
            },
            re.expr.filters.visible = function(e) {
                return ! re.expr.filters.hidden(e)
            };
            var Yt = /%20/g,
            Ut = /\[\]$/,
            Jt = /\r?\n/g,
            Vt = /^(?:submit|button|image|reset|file)$/i,
            Gt = /^(?:input|select|textarea|keygen)/i;
            re.param = function(e, t) {
                var n, i = [],
                r = function(e, t) {
                    t = re.isFunction(t) ? t() : null == t ? "": t,
                    i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
                if (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional), re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e,
                function() {
                    r(this.name, this.value)
                });
                else for (n in e) z(n, e[n], t, r);
                return i.join("&").replace(Yt, "+")
            },
            re.fn.extend({
                serialize: function() {
                    return re.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = re.prop(this, "elements");
                        return e ? re.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !re(this).is(":disabled") && Gt.test(this.nodeName) && !Vt.test(e) && (this.checked || !je.test(e))
                    }).map(function(e, t) {
                        var n = re(this).val();
                        return null == n ? null: re.isArray(n) ? re.map(n,
                        function(e) {
                            return {
                                name: t.name,
                                value: e.replace(Jt, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(Jt, "\r\n")
                        }
                    }).get()
                }
            }),
            re.ajaxSettings.xhr = void 0 !== e.ActiveXObject ?
            function() {
                return ! this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || Y()
            }: X;
            var Qt = 0,
            Kt = {},
            Zt = re.ajaxSettings.xhr();
            e.attachEvent && e.attachEvent("onunload",
            function() {
                for (var e in Kt) Kt[e](void 0, !0)
            }),
            ne.cors = !!Zt && "withCredentials" in Zt,
            Zt = ne.ajax = !!Zt,
            Zt && re.ajaxTransport(function(e) {
                if (!e.crossDomain || ne.cors) {
                    var t;
                    return {
                        send: function(n, i) {
                            var r, a = e.xhr(),
                            o = ++Qt;
                            if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (r in e.xhrFields) a[r] = e.xhrFields[r];
                            e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType),
                            e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                            for (r in n) void 0 !== n[r] && a.setRequestHeader(r, n[r] + "");
                            a.send(e.hasContent && e.data || null),
                            t = function(n, r) {
                                var c, s, l;
                                if (t && (r || 4 === a.readyState)) if (delete Kt[o], t = void 0, a.onreadystatechange = re.noop, r) 4 !== a.readyState && a.abort();
                                else {
                                    l = {},
                                    c = a.status,
                                    "string" == typeof a.responseText && (l.text = a.responseText);
                                    try {
                                        s = a.statusText
                                    } catch(u) {
                                        s = ""
                                    }
                                    c || !e.isLocal || e.crossDomain ? 1223 === c && (c = 204) : c = l.text ? 200 : 404
                                }
                                l && i(c, s, l, a.getAllResponseHeaders())
                            },
                            e.async ? 4 === a.readyState ? setTimeout(t) : a.onreadystatechange = Kt[o] = t: t()
                        },
                        abort: function() {
                            t && t(void 0, !0)
                        }
                    }
                }
            }),
            re.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(e) {
                        return re.globalEval(e),
                        e
                    }
                }
            }),
            re.ajaxPrefilter("script",
            function(e) {
                void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET", e.global = !1)
            }),
            re.ajaxTransport("script",
            function(e) {
                if (e.crossDomain) {
                    var t, n = me.head || re("head")[0] || me.documentElement;
                    return {
                        send: function(i, r) {
                            t = me.createElement("script"),
                            t.async = !0,
                            e.scriptCharset && (t.charset = e.scriptCharset),
                            t.src = e.url,
                            t.onload = t.onreadystatechange = function(e, n) { (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || r(200, "success"))
                            },
                            n.insertBefore(t, n.firstChild)
                        },
                        abort: function() {
                            t && t.onload(void 0, !0)
                        }
                    }
                }
            });
            var en = [],
            tn = /(=)\?(?=&|$)|\?\?/;
            re.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = en.pop() || re.expando + "_" + jt++;
                    return this[e] = !0,
                    e
                }
            }),
            re.ajaxPrefilter("json jsonp",
            function(t, n, i) {
                var r, a, o, c = t.jsonp !== !1 && (tn.test(t.url) ? "url": "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
                return c || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, c ? t[c] = t[c].replace(tn, "$1" + r) : t.jsonp !== !1 && (t.url += (Dt.test(t.url) ? "&": "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
                    return o || re.error(r + " was not called"),
                    o[0]
                },
                t.dataTypes[0] = "json", a = e[r], e[r] = function() {
                    o = arguments
                },
                i.always(function() {
                    e[r] = a,
                    t[r] && (t.jsonpCallback = n.jsonpCallback, en.push(r)),
                    o && re.isFunction(a) && a(o[0]),
                    o = a = void 0
                }), "script") : void 0
            }),
            re.parseHTML = function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1),
                t = t || me;
                var i = de.exec(e),
                r = !n && [];
                return i ? [t.createElement(i[1])] : (i = re.buildFragment([e], t, r), r && r.length && re(r).remove(), re.merge([], i.childNodes))
            };
            var nn = re.fn.load;
            re.fn.load = function(e, t, n) {
                if ("string" != typeof e && nn) return nn.apply(this, arguments);
                var i, r, a, o = this,
                c = e.indexOf(" ");
                return c >= 0 && (i = re.trim(e.slice(c, e.length)), e = e.slice(0, c)),
                re.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (a = "POST"),
                o.length > 0 && re.ajax({
                    url: e,
                    type: a,
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    r = arguments,
                    o.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e)
                }).complete(n &&
                function(e, t) {
                    o.each(n, r || [e.responseText, t, e])
                }),
                this
            },
            re.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
            function(e, t) {
                re.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }),
            re.expr.filters.animated = function(e) {
                return re.grep(re.timers,
                function(t) {
                    return e === t.elem
                }).length
            };
            var rn = e.document.documentElement;
            re.offset = {
                setOffset: function(e, t, n) {
                    var i, r, a, o, c, s, l, u = re.css(e, "position"),
                    d = re(e),
                    p = {};
                    "static" === u && (e.style.position = "relative"),
                    c = d.offset(),
                    a = re.css(e, "top"),
                    s = re.css(e, "left"),
                    l = ("absolute" === u || "fixed" === u) && re.inArray("auto", [a, s]) > -1,
                    l ? (i = d.position(), o = i.top, r = i.left) : (o = parseFloat(a) || 0, r = parseFloat(s) || 0),
                    re.isFunction(t) && (t = t.call(e, n, c)),
                    null != t.top && (p.top = t.top - c.top + o),
                    null != t.left && (p.left = t.left - c.left + r),
                    "using" in t ? t.using.call(e, p) : d.css(p)
                }
            },
            re.fn.extend({
                offset: function(e) {
                    if (arguments.length) return void 0 === e ? this: this.each(function(t) {
                        re.offset.setOffset(this, e, t)
                    });
                    var t, n, i = {
                        top: 0,
                        left: 0
                    },
                    r = this[0],
                    a = r && r.ownerDocument;
                    if (a) return t = a.documentElement,
                    re.contains(t, r) ? (typeof r.getBoundingClientRect !== we && (i = r.getBoundingClientRect()), n = U(a), {
                        top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                    }) : i
                },
                position: function() {
                    if (this[0]) {
                        var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                        return "fixed" === re.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), re.nodeName(e[0], "html") || (n = e.offset()), n.top += re.css(e[0], "borderTopWidth", !0), n.left += re.css(e[0], "borderLeftWidth", !0)),
                        {
                            top: t.top - n.top - re.css(i, "marginTop", !0),
                            left: t.left - n.left - re.css(i, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var e = this.offsetParent || rn; e && !re.nodeName(e, "html") && "static" === re.css(e, "position");) e = e.offsetParent;
                        return e || rn
                    })
                }
            }),
            re.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            },
            function(e, t) {
                var n = /Y/.test(t);
                re.fn[e] = function(i) {
                    return Le(this,
                    function(e, i, r) {
                        var a = U(e);
                        return void 0 === r ? a ? t in a ? a[t] : a.document.documentElement[i] : e[i] : void(a ? a.scrollTo(n ? re(a).scrollLeft() : r, n ? r: re(a).scrollTop()) : e[i] = r)
                    },
                    e, i, arguments.length, null)
                }
            }),
            re.each(["top", "left"],
            function(e, t) {
                re.cssHooks[t] = k(ne.pixelPosition,
                function(e, n) {
                    return n ? (n = tt(e, t), it.test(n) ? re(e).position()[t] + "px": n) : void 0
                })
            }),
            re.each({
                Height: "height",
                Width: "width"
            },
            function(e, t) {
                re.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                },
                function(n, i) {
                    re.fn[i] = function(i, r) {
                        var a = arguments.length && (n || "boolean" != typeof i),
                        o = n || (i === !0 || r === !0 ? "margin": "border");
                        return Le(this,
                        function(t, n, i) {
                            var r;
                            return re.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? re.css(t, n, o) : re.style(t, n, i, o)
                        },
                        t, a ? i: void 0, a, null)
                    }
                })
            }),
            re.fn.size = function() {
                return this.length
            },
            re.fn.andSelf = re.fn.addBack,
            "function" == typeof define && define.amd && define("jquery", [],
            function() {
                return re
            });
            var an = e.jQuery,
            on = e.$;
            return re.noConflict = function(t) {
                return e.$ === re && (e.$ = on),
                t && e.jQuery === re && (e.jQuery = an),
                re
            },
            typeof t === we && (e.jQuery = e.$ = re),
            re
        })
    },
    {
        entries: y,
        map: x
    }),
    define(r, [],
    function(e, t, n, i, r) { !
        function(e) {
            "function" == typeof define && define.amd ? define(e) : window.purl = e()
        } (function() {
            function e(e, t) {
                for (var n = decodeURI(e), i = h[t ? "strict": "loose"].exec(n), r = {
                    attr: {},
                    param: {},
                    seg: {}
                },
                o = 14; o--;) r.attr[f[o]] = i[o] || "";
                return r.param.query = a(r.attr.query),
                r.param.fragment = a(r.attr.fragment),
                r.seg.path = r.attr.path.replace(/^\/+|\/+$/g, "").split("/"),
                r.seg.fragment = r.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"),
                r.attr.base = r.attr.host ? (r.attr.protocol ? r.attr.protocol + "://" + r.attr.host: r.attr.host) + (r.attr.port ? ":" + r.attr.port: "") : "",
                r
            }
            function t(e) {
                var t = e.tagName;
                return "undefined" != typeof t ? p[t.toLowerCase()] : t
            }
            function n(e, t) {
                if (0 === e[t].length) return e[t] = {};
                var n = {};
                for (var i in e[t]) n[i] = e[t][i];
                return e[t] = n,
                n
            }
            function i(e, t, r, a) {
                var o = e.shift();
                if (o) {
                    var c = t[r] = t[r] || [];
                    "]" == o ? l(c) ? "" !== a && c.push(a) : "object" == typeof c ? c[u(c).length] = a: c = t[r] = [t[r], a] : ~o.indexOf("]") ? (o = o.substr(0, o.length - 1), !g.test(o) && l(c) && (c = n(t, r)), i(e, c, o, a)) : (!g.test(o) && l(c) && (c = n(t, r)), i(e, c, o, a))
                } else l(t[r]) ? t[r].push(a) : "object" == typeof t[r] ? t[r] = a: "undefined" == typeof t[r] ? t[r] = a: t[r] = [t[r], a]
            }
            function r(e, t, n) {
                if (~t.indexOf("]")) {
                    var r = t.split("[");
                    i(r, e, "base", n)
                } else {
                    if (!g.test(t) && l(e.base)) {
                        var a = {};
                        for (var c in e.base) a[c] = e.base[c];
                        e.base = a
                    }
                    "" !== t && o(e.base, t, n)
                }
                return e
            }
            function a(e) {
                return s(String(e).split(/&|;/),
                function(e, t) {
                    try {
                        t = decodeURIComponent(t.replace(/\+/g, " "))
                    } catch(n) {}
                    var i = t.indexOf("="),
                    a = c(t),
                    o = t.substr(0, a || i),
                    s = t.substr(a || i, t.length);
                    return s = s.substr(s.indexOf("=") + 1, s.length),
                    "" === o && (o = t, s = ""),
                    r(e, o, s)
                },
                {
                    base: {}
                }).base
            }
            function o(e, t, n) {
                var i = e[t];
                "undefined" == typeof i ? e[t] = n: l(i) ? i.push(n) : e[t] = [i, n]
            }
            function c(e) {
                for (var t, n, i = e.length,
                r = 0; i > r; ++r) if (n = e[r], "]" == n && (t = !1), "[" == n && (t = !0), "=" == n && !t) return r
            }
            function s(e, t) {
                for (var n = 0,
                i = e.length >> 0,
                r = arguments[2]; i > n;) n in e && (r = t.call(void 0, r, e[n], n, e)),
                ++n;
                return r
            }
            function l(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
            function u(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push(n);
                return t
            }
            function d(t, n) {
                return 1 === arguments.length && t === !0 && (n = !0, t = void 0),
                n = n || !1,
                t = t || window.location.toString(),
                {
                    data: e(t, n),
                    attr: function(e) {
                        return e = m[e] || e,
                        "undefined" != typeof e ? this.data.attr[e] : this.data.attr
                    },
                    param: function(e) {
                        return "undefined" != typeof e ? this.data.param.query[e] : this.data.param.query
                    },
                    fparam: function(e) {
                        return "undefined" != typeof e ? this.data.param.fragment[e] : this.data.param.fragment
                    },
                    segment: function(e) {
                        return "undefined" == typeof e ? this.data.seg.path: (e = 0 > e ? this.data.seg.path.length + e: e - 1, this.data.seg.path[e])
                    },
                    fsegment: function(e) {
                        return "undefined" == typeof e ? this.data.seg.fragment: (e = 0 > e ? this.data.seg.fragment.length + e: e - 1, this.data.seg.fragment[e])
                    }
                }
            }
            var p = {
                a: "href",
                img: "src",
                form: "action",
                base: "href",
                script: "src",
                iframe: "src",
                link: "href",
                embed: "src",
                object: "data"
            },
            f = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
            m = {
                anchor: "fragment"
            },
            h = {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            },
            g = /^[0-9]+$/;
            return d.Zepto = function(e) {
                null != e && (e.fn.url = function(n) {
                    var i = "";
                    return this.length && (i = e(this).attr(t(this[0])) || ""),
                    d(i, n)
                },
                e.url = d)
            },
            d.Zepto(window.Zepto),
            d
        })
    },
    {
        entries: y,
        map: x
    }),
    define(v, [],
    function(e, t, n, i, r) {
        var a = function(e) {
            return e.getHours() > 6 && e.getHours() < 23 ? o("hh:mm:ss", e) : o("YYYY-MM-DD", e)
        },
        o = function(e, t) {
            var n = {
                "M+": t.getMonth() + 1,
                "D+": t.getDate(),
                "h+": t.getHours(),
                "m+": t.getMinutes(),
                "s+": t.getSeconds()
            };
            /(Y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (var i in n) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[i] : ("00" + n[i]).substr(("" + n[i]).length)));
            return e
        };
        n.exports = {
            showTime: a,
            setFormat: o
        }
    },
    {
        entries: y,
        map: x
    }),
    define(h, [n],
    function(e, t, n, i, r) {
        function a(e, t) {
            return Math.floor(Math.random() * (t - e)) + e
        }
        function o(e) {
            if (d = e, d || (d = 0), p = h("#Map_" + d), f = p.parent(".map"), m = "pid", 0 != e && (m = "cid"), v = g[d], !v) {
                v = [];
                for (var t = [], n = f.find("area"), i = 0; i < n.length; i++) h(n[i]).attr(m) && t.push(h(n[i]).attr(m));
                0 != t.length && v.push(t)
            }
            return;//chenfw
            var r = v.length;
            if (0 == y.length) for (var i = 0; r > i; i++) {
                var a = c(v[i]),
                o = p.find("area[" + m + '="' + a + '"]').index();
                f.find("a").eq(o).css({
                    display: "inline",
                    opacity: 1
                }),
                y.push(a)
            } else for (var i = 0; r > i; i++) {
                var a = y[i],
                o = p.find("area[" + m + '="' + a + '"]').index();
                f.find("a").eq(o).css({
                    display: "inline",
                    opacity: 1
                })
            }
            s()
        }
        function c(e) {
            if (h.isArray(e)) {
                var t = e.length,
                n = a(0, t);
                return e[n]
            }
        }
        function s() {
            var e, t, n = y.length;
            0 != n && (N = (N + 1) % n, e = y[N], t = c(v[N]), y[N] = t, u(e, t), x = setTimeout(s, 3e3))
        }
        function l() {
            clearTimeout(x)
        }
        function u(e, t) {
            l();
            return;//chenfw
            var n = f.find("a"),
            i = p.find("area[" + m + '="' + e + '"]').index(),
            r = p.find("area[" + m + '="' + t + '"]').index();
            n.eq(i).animate({
                opacity: 0
            },
            600,
            function() {
                h(this).removeAttr("style"),
                n.eq(r).css({
                    display: "inline"
                }).animate({
                    opacity: 1
                },
                600,
                function() {})
            })
        }
        var d, p, f, m, h = e("./jquery.js"),
        g = {
            0 : [[1, 2, 3, 4, 6, 7, 8, 15, 16], [9, 10, 11, 12, 14], [13, 19, 20, 21, 32, 33, 34], [23, 25, 26, 29, 31], [5, 17, 18, 22, 24, 27, 28, 30]]
        },
        v = [],
        y = [],
        N = 0,
        x = null;
        n.exports = {
            randomInit: o,
            stopRandom: l
        }
    },
    {
        entries: y,
        map: e({
            "./jquery.js": n
        },
        x)
    }),
    define(g, [],
    function(e, t, n, i, r) {
        function a() {
            window.WeixinJSBridge && (WeixinJSBridge.on("menu:share:appmessage",
            function(e) {
                WeixinJSBridge.invoke("sendAppMessage", shareContent,
                function(e) {})
            }), WeixinJSBridge.on("menu:share:timeline",
            function(e) {
                WeixinJSBridge.invoke("shareTimeline", shareContent,
                function(e) {})
            }))
        }
        function o() {
            a(),
            document.addEventListener("WeixinJSBridgeReady", a, !1);
            var e = window.mqq && "function" == typeof window.mqq.support,
            t = e && window.mqq.support("mqq.data.setShareInfo");
            t && mqq.data.setShareInfo({
                title: shareContent.title,
                desc: shareContent.desc,
                image_url: shareContent.image_url,
                share_url: shareContent.link
            })
        }
        n.exports = {
            initShare: o
        }
    },
    {
        entries: y,
        map: x
    })
} ();
//# sourceMappingURL=entries/main.js.map
