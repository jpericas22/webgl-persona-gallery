var Js = Object.defineProperty;
var ec = (We, me, _e) => me in We ? Js(We, me, { enumerable: !0, configurable: !0, writable: !0, value: _e }) : We[me] = _e;
var Oe = (We, me, _e) => (ec(We, typeof me != "symbol" ? me + "" : me, _e), _e);
var rc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tc(We) {
  return We && We.__esModule && Object.prototype.hasOwnProperty.call(We, "default") ? We.default : We;
}
var lf = { exports: {} };
(function(We, me) {
  (function(_e, ye) {
    We.exports = ye();
  })(rc, function() {
    var _e = function(e) {
      return e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Float32Array || e instanceof Float64Array || e instanceof Uint8ClampedArray;
    }, ye = function(e, t) {
      for (var s = Object.keys(t), x = 0; x < s.length; ++x)
        e[s[x]] = t[s[x]];
      return e;
    }, Ge = `
`;
    function Re(e) {
      return typeof atob < "u" ? atob(e) : "base64:" + e;
    }
    function Ue(e) {
      var t = new Error("(regl) " + e);
      throw console.error(t), t;
    }
    function xe(e, t) {
      e || Ue(t);
    }
    function ze(e) {
      return e ? ": " + e : "";
    }
    function qt(e, t, s) {
      e in t || Ue("unknown parameter (" + e + ")" + ze(s) + ". possible values: " + Object.keys(t).join());
    }
    function df(e, t) {
      _e(e) || Ue(
        "invalid parameter type" + ze(t) + ". must be a typed array"
      );
    }
    function Zn(e, t) {
      switch (t) {
        case "number":
          return typeof e == "number";
        case "object":
          return typeof e == "object";
        case "string":
          return typeof e == "string";
        case "boolean":
          return typeof e == "boolean";
        case "function":
          return typeof e == "function";
        case "undefined":
          return typeof e > "u";
        case "symbol":
          return typeof e == "symbol";
      }
    }
    function mf(e, t, s) {
      Zn(e, t) || Ue(
        "invalid parameter type" + ze(s) + ". expected " + t + ", got " + typeof e
      );
    }
    function hf(e, t) {
      e >= 0 && (e | 0) === e || Ue("invalid parameter type, (" + e + ")" + ze(t) + ". must be a nonnegative integer");
    }
    function Kt(e, t, s) {
      t.indexOf(e) < 0 && Ue("invalid value" + ze(s) + ". must be one of: " + t);
    }
    var Jn = [
      "gl",
      "canvas",
      "container",
      "attributes",
      "pixelRatio",
      "extensions",
      "optionalExtensions",
      "profile",
      "onDone"
    ];
    function vf(e) {
      Object.keys(e).forEach(function(t) {
        Jn.indexOf(t) < 0 && Ue('invalid regl constructor argument "' + t + '". must be one of ' + Jn);
      });
    }
    function Br(e, t) {
      for (e = e + ""; e.length < t; )
        e = " " + e;
      return e;
    }
    function Zt() {
      this.name = "unknown", this.lines = [], this.index = {}, this.hasErrors = !1;
    }
    function ea(e, t) {
      this.number = e, this.line = t, this.errors = [];
    }
    function ra(e, t, s) {
      this.file = e, this.line = t, this.message = s;
    }
    function yr() {
      var e = new Error(), t = (e.stack || e).toString(), s = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(t);
      if (s)
        return s[1];
      var x = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(t);
      return x ? x[1] : "unknown";
    }
    function ta() {
      var e = new Error(), t = (e.stack || e).toString(), s = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(t);
      if (s)
        return s[1];
      var x = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(t);
      return x ? x[1] : "unknown";
    }
    function Jt(e, t) {
      var s = e.split(`
`), x = 1, O = 0, E = {
        unknown: new Zt(),
        0: new Zt()
      };
      E.unknown.name = E[0].name = t || yr(), E.unknown.lines.push(new ea(0, ""));
      for (var g = 0; g < s.length; ++g) {
        var N = s[g], D = /^\s*#\s*(\w+)\s+(.+)\s*$/.exec(N);
        if (D)
          switch (D[1]) {
            case "line":
              var M = /(\d+)(\s+\d+)?/.exec(D[2]);
              M && (x = M[1] | 0, M[2] && (O = M[2] | 0, O in E || (E[O] = new Zt())));
              break;
            case "define":
              var V = /SHADER_NAME(_B64)?\s+(.*)$/.exec(D[2]);
              V && (E[O].name = V[1] ? Re(V[2]) : V[2]);
              break;
          }
        E[O].lines.push(new ea(x++, N));
      }
      return Object.keys(E).forEach(function(U) {
        var X = E[U];
        X.lines.forEach(function(B) {
          X.index[B.number] = B;
        });
      }), E;
    }
    function pf(e) {
      var t = [];
      return e.split(`
`).forEach(function(s) {
        if (!(s.length < 5)) {
          var x = /^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(s);
          x ? t.push(new ra(
            x[1] | 0,
            x[2] | 0,
            x[3].trim()
          )) : s.length > 0 && t.push(new ra("unknown", 0, s));
        }
      }), t;
    }
    function _f(e, t) {
      t.forEach(function(s) {
        var x = e[s.file];
        if (x) {
          var O = x.index[s.line];
          if (O) {
            O.errors.push(s), x.hasErrors = !0;
            return;
          }
        }
        e.unknown.hasErrors = !0, e.unknown.lines[0].errors.push(s);
      });
    }
    function bf(e, t, s, x, O) {
      if (!e.getShaderParameter(t, e.COMPILE_STATUS)) {
        var E = e.getShaderInfoLog(t), g = x === e.FRAGMENT_SHADER ? "fragment" : "vertex";
        aa(s, "string", g + " shader source must be a string", O);
        var N = Jt(s, O), D = pf(E);
        _f(N, D), Object.keys(N).forEach(function(M) {
          var V = N[M];
          if (!V.hasErrors)
            return;
          var U = [""], X = [""];
          function B(k, v) {
            U.push(k), X.push(v || "");
          }
          B("file number " + M + ": " + V.name + `
`, "color:red;text-decoration:underline;font-weight:bold"), V.lines.forEach(function(k) {
            if (k.errors.length > 0) {
              B(Br(k.number, 4) + "|  ", "background-color:yellow; font-weight:bold"), B(k.line + Ge, "color:red; background-color:yellow; font-weight:bold");
              var v = 0;
              k.errors.forEach(function(T) {
                var P = T.message, K = /^\s*'(.*)'\s*:\s*(.*)$/.exec(P);
                if (K) {
                  var F = K[1];
                  switch (P = K[2], F) {
                    case "assign":
                      F = "=";
                      break;
                  }
                  v = Math.max(k.line.indexOf(F, v), 0);
                } else
                  v = 0;
                B(Br("| ", 6)), B(Br("^^^", v + 3) + Ge, "font-weight:bold"), B(Br("| ", 6)), B(P + Ge, "font-weight:bold");
              }), B(Br("| ", 6) + Ge);
            } else
              B(Br(k.number, 4) + "|  "), B(k.line + Ge, "color:red");
          }), typeof document < "u" && !window.chrome ? (X[0] = U.join("%c"), console.log.apply(console, X)) : console.log(U.join(""));
        }), xe.raise("Error compiling " + g + " shader, " + N[0].name);
      }
    }
    function yf(e, t, s, x, O) {
      if (!e.getProgramParameter(t, e.LINK_STATUS)) {
        var E = e.getProgramInfoLog(t), g = Jt(s, O), N = Jt(x, O), D = 'Error linking program with vertex shader, "' + N[0].name + '", and fragment shader "' + g[0].name + '"';
        typeof document < "u" ? console.log(
          "%c" + D + Ge + "%c" + E,
          "color:red;text-decoration:underline;font-weight:bold",
          "color:red"
        ) : console.log(D + Ge + E), xe.raise(D);
      }
    }
    function na(e) {
      e._commandRef = yr();
    }
    function Ef(e, t, s, x) {
      na(e);
      function O(D) {
        return D ? x.id(D) : 0;
      }
      e._fragId = O(e.static.frag), e._vertId = O(e.static.vert);
      function E(D, M) {
        Object.keys(M).forEach(function(V) {
          D[x.id(V)] = !0;
        });
      }
      var g = e._uniformSet = {};
      E(g, t.static), E(g, t.dynamic);
      var N = e._attributeSet = {};
      E(N, s.static), E(N, s.dynamic), e._hasCount = "count" in e.static || "count" in e.dynamic || "elements" in e.static || "elements" in e.dynamic;
    }
    function vt(e, t) {
      var s = ta();
      Ue(e + " in command " + (t || yr()) + (s === "unknown" ? "" : " called from " + s));
    }
    function xf(e, t, s) {
      e || vt(t, s || yr());
    }
    function Af(e, t, s, x) {
      e in t || vt(
        "unknown parameter (" + e + ")" + ze(s) + ". possible values: " + Object.keys(t).join(),
        x || yr()
      );
    }
    function aa(e, t, s, x) {
      Zn(e, t) || vt(
        "invalid parameter type" + ze(s) + ". expected " + t + ", got " + typeof e,
        x || yr()
      );
    }
    function Tf(e) {
      e();
    }
    function gf(e, t, s) {
      e.texture ? Kt(
        e.texture._texture.internalformat,
        t,
        "unsupported texture format for attachment"
      ) : Kt(
        e.renderbuffer._renderbuffer.format,
        s,
        "unsupported renderbuffer format for attachment"
      );
    }
    var pt = 33071, ia = 9728, Sf = 9984, wf = 9985, Lf = 9986, Of = 9987, Rf = 5120, Gf = 5121, Cf = 5122, Ff = 5123, Df = 5124, Nf = 5125, fa = 5126, oa = 32819, ua = 32820, sa = 33635, ca = 34042, Bf = 36193, qe = {};
    qe[Rf] = qe[Gf] = 1, qe[Cf] = qe[Ff] = qe[Bf] = qe[sa] = qe[oa] = qe[ua] = 2, qe[Df] = qe[Nf] = qe[fa] = qe[ca] = 4;
    function la(e, t) {
      return e === ua || e === oa || e === sa ? 2 : e === ca ? 4 : qe[e] * t;
    }
    function _t(e) {
      return !(e & e - 1) && !!e;
    }
    function If(e, t, s) {
      var x, O = t.width, E = t.height, g = t.channels;
      xe(
        O > 0 && O <= s.maxTextureSize && E > 0 && E <= s.maxTextureSize,
        "invalid texture shape"
      ), (e.wrapS !== pt || e.wrapT !== pt) && xe(
        _t(O) && _t(E),
        "incompatible wrap mode for texture, both width and height must be power of 2"
      ), t.mipmask === 1 ? O !== 1 && E !== 1 && xe(
        e.minFilter !== Sf && e.minFilter !== Lf && e.minFilter !== wf && e.minFilter !== Of,
        "min filter requires mipmap"
      ) : (xe(
        _t(O) && _t(E),
        "texture must be a square power of 2 to support mipmapping"
      ), xe(
        t.mipmask === (O << 1) - 1,
        "missing or incomplete mipmap data"
      )), t.type === fa && (s.extensions.indexOf("oes_texture_float_linear") < 0 && xe(
        e.minFilter === ia && e.magFilter === ia,
        "filter not supported, must enable oes_texture_float_linear"
      ), xe(
        !e.genMipmaps,
        "mipmap generation not supported with float textures"
      ));
      var N = t.images;
      for (x = 0; x < 16; ++x)
        if (N[x]) {
          var D = O >> x, M = E >> x;
          xe(t.mipmask & 1 << x, "missing mipmap data");
          var V = N[x];
          if (xe(
            V.width === D && V.height === M,
            "invalid shape for mip images"
          ), xe(
            V.format === t.format && V.internalformat === t.internalformat && V.type === t.type,
            "incompatible type for mip image"
          ), !V.compressed)
            if (V.data) {
              var U = Math.ceil(la(V.type, g) * D / V.unpackAlignment) * V.unpackAlignment;
              xe(
                V.data.byteLength === U * M,
                "invalid data for image, buffer size is inconsistent with image format"
              );
            } else
              V.element || V.copy;
        } else
          e.genMipmaps || xe((t.mipmask & 1 << x) === 0, "extra mipmap data");
      t.compressed && xe(
        !e.genMipmaps,
        "mipmap generation for compressed images not supported"
      );
    }
    function Pf(e, t, s, x) {
      var O = e.width, E = e.height, g = e.channels;
      xe(
        O > 0 && O <= x.maxTextureSize && E > 0 && E <= x.maxTextureSize,
        "invalid texture shape"
      ), xe(
        O === E,
        "cube map must be square"
      ), xe(
        t.wrapS === pt && t.wrapT === pt,
        "wrap mode not supported by cube map"
      );
      for (var N = 0; N < s.length; ++N) {
        var D = s[N];
        xe(
          D.width === O && D.height === E,
          "inconsistent cube map face shape"
        ), t.genMipmaps && (xe(
          !D.compressed,
          "can not generate mipmap for compressed textures"
        ), xe(
          D.mipmask === 1,
          "can not specify mipmaps and generate mipmaps"
        ));
        for (var M = D.images, V = 0; V < 16; ++V) {
          var U = M[V];
          if (U) {
            var X = O >> V, B = E >> V;
            xe(D.mipmask & 1 << V, "missing mipmap data"), xe(
              U.width === X && U.height === B,
              "invalid shape for mip images"
            ), xe(
              U.format === e.format && U.internalformat === e.internalformat && U.type === e.type,
              "incompatible type for mip image"
            ), U.compressed || (U.data ? xe(
              U.data.byteLength === X * B * Math.max(la(U.type, g), U.unpackAlignment),
              "invalid data for image, buffer size is inconsistent with image format"
            ) : U.element || U.copy);
          }
        }
      }
    }
    var n = ye(xe, {
      optional: Tf,
      raise: Ue,
      commandRaise: vt,
      command: xf,
      parameter: qt,
      commandParameter: Af,
      constructor: vf,
      type: mf,
      commandType: aa,
      isTypedArray: df,
      nni: hf,
      oneOf: Kt,
      shaderError: bf,
      linkError: yf,
      callSite: ta,
      saveCommandRef: na,
      saveDrawInfo: Ef,
      framebufferFormat: gf,
      guessCommand: yr,
      texture2D: If,
      textureCube: Pf
    }), kf = 0, Mf = 0, Uf = 5, Vf = 6;
    function Er(e, t) {
      this.id = kf++, this.type = e, this.data = t;
    }
    function da(e) {
      return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }
    function Kr(e) {
      if (e.length === 0)
        return [];
      var t = e.charAt(0), s = e.charAt(e.length - 1);
      if (e.length > 1 && t === s && (t === '"' || t === "'"))
        return ['"' + da(e.substr(1, e.length - 2)) + '"'];
      var x = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(e);
      if (x)
        return Kr(e.substr(0, x.index)).concat(Kr(x[1])).concat(Kr(e.substr(x.index + x[0].length)));
      var O = e.split(".");
      if (O.length === 1)
        return ['"' + da(e) + '"'];
      for (var E = [], g = 0; g < O.length; ++g)
        E = E.concat(Kr(O[g]));
      return E;
    }
    function ma(e) {
      return "[" + Kr(e).join("][") + "]";
    }
    function jf(e, t) {
      return new Er(e, ma(t + ""));
    }
    function Xf(e) {
      return typeof e == "function" && !e._reglType || e instanceof Er;
    }
    function ha(e, t) {
      if (typeof e == "function")
        return new Er(Mf, e);
      if (typeof e == "number" || typeof e == "boolean")
        return new Er(Uf, e);
      if (Array.isArray(e))
        return new Er(Vf, e.map(function(s, x) {
          return ha(s, t + "[" + x + "]");
        }));
      if (e instanceof Er)
        return e;
      n(!1, "invalid option type in uniform " + t);
    }
    var Ke = {
      DynamicVariable: Er,
      define: jf,
      isDynamic: Xf,
      unbox: ha,
      accessor: ma
    }, en = {
      next: typeof requestAnimationFrame == "function" ? function(e) {
        return requestAnimationFrame(e);
      } : function(e) {
        return setTimeout(e, 16);
      },
      cancel: typeof cancelAnimationFrame == "function" ? function(e) {
        return cancelAnimationFrame(e);
      } : clearTimeout
    }, va = typeof performance < "u" && performance.now ? function() {
      return performance.now();
    } : function() {
      return +/* @__PURE__ */ new Date();
    };
    function Hf() {
      var e = { "": 0 }, t = [""];
      return {
        id: function(s) {
          var x = e[s];
          return x || (x = e[s] = t.length, t.push(s), x);
        },
        str: function(s) {
          return t[s];
        }
      };
    }
    function $f(e, t, s) {
      var x = document.createElement("canvas");
      ye(x.style, {
        border: 0,
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }), e.appendChild(x), e === document.body && (x.style.position = "absolute", ye(e.style, {
        margin: 0,
        padding: 0
      }));
      function O() {
        var N = window.innerWidth, D = window.innerHeight;
        if (e !== document.body) {
          var M = x.getBoundingClientRect();
          N = M.right - M.left, D = M.bottom - M.top;
        }
        x.width = s * N, x.height = s * D;
      }
      var E;
      e !== document.body && typeof ResizeObserver == "function" ? (E = new ResizeObserver(function() {
        setTimeout(O);
      }), E.observe(e)) : window.addEventListener("resize", O, !1);
      function g() {
        E ? E.disconnect() : window.removeEventListener("resize", O), e.removeChild(x);
      }
      return O(), {
        canvas: x,
        onDestroy: g
      };
    }
    function zf(e, t) {
      function s(x) {
        try {
          return e.getContext(x, t);
        } catch {
          return null;
        }
      }
      return s("webgl") || s("experimental-webgl") || s("webgl-experimental");
    }
    function Wf(e) {
      return typeof e.nodeName == "string" && typeof e.appendChild == "function" && typeof e.getBoundingClientRect == "function";
    }
    function Yf(e) {
      return typeof e.drawArrays == "function" || typeof e.drawElements == "function";
    }
    function pa(e) {
      return typeof e == "string" ? e.split() : (n(Array.isArray(e), "invalid extension array"), e);
    }
    function _a(e) {
      return typeof e == "string" ? (n(typeof document < "u", "not supported outside of DOM"), document.querySelector(e)) : e;
    }
    function Qf(e) {
      var t = e || {}, s, x, O, E, g = {}, N = [], D = [], M = typeof window > "u" ? 1 : window.devicePixelRatio, V = !1, U = function(k) {
        k && n.raise(k);
      }, X = function() {
      };
      if (typeof t == "string" ? (n(
        typeof document < "u",
        "selector queries only supported in DOM enviroments"
      ), s = document.querySelector(t), n(s, "invalid query string for element")) : typeof t == "object" ? Wf(t) ? s = t : Yf(t) ? (E = t, O = E.canvas) : (n.constructor(t), "gl" in t ? E = t.gl : "canvas" in t ? O = _a(t.canvas) : "container" in t && (x = _a(t.container)), "attributes" in t && (g = t.attributes, n.type(g, "object", "invalid context attributes")), "extensions" in t && (N = pa(t.extensions)), "optionalExtensions" in t && (D = pa(t.optionalExtensions)), "onDone" in t && (n.type(
        t.onDone,
        "function",
        "invalid or missing onDone callback"
      ), U = t.onDone), "profile" in t && (V = !!t.profile), "pixelRatio" in t && (M = +t.pixelRatio, n(M > 0, "invalid pixel ratio"))) : n.raise("invalid arguments to regl"), s && (s.nodeName.toLowerCase() === "canvas" ? O = s : x = s), !E) {
        if (!O) {
          n(
            typeof document < "u",
            "must manually specify webgl context outside of DOM environments"
          );
          var B = $f(x || document.body, U, M);
          if (!B)
            return null;
          O = B.canvas, X = B.onDestroy;
        }
        g.premultipliedAlpha === void 0 && (g.premultipliedAlpha = !0), E = zf(O, g);
      }
      return E ? {
        gl: E,
        canvas: O,
        container: x,
        extensions: N,
        optionalExtensions: D,
        pixelRatio: M,
        profile: V,
        onDone: U,
        onDestroy: X
      } : (X(), U("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"), null);
    }
    function qf(e, t) {
      var s = {};
      function x(g) {
        n.type(g, "string", "extension name must be string");
        var N = g.toLowerCase(), D;
        try {
          D = s[N] = e.getExtension(N);
        } catch {
        }
        return !!D;
      }
      for (var O = 0; O < t.extensions.length; ++O) {
        var E = t.extensions[O];
        if (!x(E))
          return t.onDestroy(), t.onDone('"' + E + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser'), null;
      }
      return t.optionalExtensions.forEach(x), {
        extensions: s,
        restore: function() {
          Object.keys(s).forEach(function(g) {
            if (s[g] && !x(g))
              throw new Error("(regl): error restoring extension " + g);
          });
        }
      };
    }
    function Ze(e, t) {
      for (var s = Array(e), x = 0; x < e; ++x)
        s[x] = t(x);
      return s;
    }
    var Kf = 5120, Zf = 5121, Jf = 5122, eo = 5123, ro = 5124, to = 5125, no = 5126;
    function ao(e) {
      for (var t = 16; t <= 1 << 28; t *= 16)
        if (e <= t)
          return t;
      return 0;
    }
    function ba(e) {
      var t, s;
      return t = (e > 65535) << 4, e >>>= t, s = (e > 255) << 3, e >>>= s, t |= s, s = (e > 15) << 2, e >>>= s, t |= s, s = (e > 3) << 1, e >>>= s, t |= s, t | e >> 1;
    }
    function ya() {
      var e = Ze(8, function() {
        return [];
      });
      function t(E) {
        var g = ao(E), N = e[ba(g) >> 2];
        return N.length > 0 ? N.pop() : new ArrayBuffer(g);
      }
      function s(E) {
        e[ba(E.byteLength) >> 2].push(E);
      }
      function x(E, g) {
        var N = null;
        switch (E) {
          case Kf:
            N = new Int8Array(t(g), 0, g);
            break;
          case Zf:
            N = new Uint8Array(t(g), 0, g);
            break;
          case Jf:
            N = new Int16Array(t(2 * g), 0, g);
            break;
          case eo:
            N = new Uint16Array(t(2 * g), 0, g);
            break;
          case ro:
            N = new Int32Array(t(4 * g), 0, g);
            break;
          case to:
            N = new Uint32Array(t(4 * g), 0, g);
            break;
          case no:
            N = new Float32Array(t(4 * g), 0, g);
            break;
          default:
            return null;
        }
        return N.length !== g ? N.subarray(0, g) : N;
      }
      function O(E) {
        s(E.buffer);
      }
      return {
        alloc: t,
        free: s,
        allocType: x,
        freeType: O
      };
    }
    var De = ya();
    De.zero = ya();
    var io = 3408, fo = 3410, oo = 3411, uo = 3412, so = 3413, co = 3414, lo = 3415, mo = 33901, ho = 33902, vo = 3379, po = 3386, _o = 34921, bo = 36347, yo = 36348, Eo = 35661, xo = 35660, Ao = 34930, To = 36349, go = 34076, So = 34024, wo = 7936, Lo = 7937, Oo = 7938, Ro = 35724, Go = 34047, Co = 36063, Fo = 34852, bt = 3553, Ea = 34067, Do = 34069, No = 33984, Zr = 6408, rn = 5126, xa = 5121, tn = 36160, Bo = 36053, Io = 36064, Po = 16384, ko = function(e, t) {
      var s = 1;
      t.ext_texture_filter_anisotropic && (s = e.getParameter(Go));
      var x = 1, O = 1;
      t.webgl_draw_buffers && (x = e.getParameter(Fo), O = e.getParameter(Co));
      var E = !!t.oes_texture_float;
      if (E) {
        var g = e.createTexture();
        e.bindTexture(bt, g), e.texImage2D(bt, 0, Zr, 1, 1, 0, Zr, rn, null);
        var N = e.createFramebuffer();
        if (e.bindFramebuffer(tn, N), e.framebufferTexture2D(tn, Io, bt, g, 0), e.bindTexture(bt, null), e.checkFramebufferStatus(tn) !== Bo)
          E = !1;
        else {
          e.viewport(0, 0, 1, 1), e.clearColor(1, 0, 0, 1), e.clear(Po);
          var D = De.allocType(rn, 4);
          e.readPixels(0, 0, 1, 1, Zr, rn, D), e.getError() ? E = !1 : (e.deleteFramebuffer(N), e.deleteTexture(g), E = D[0] === 1), De.freeType(D);
        }
      }
      var M = typeof navigator < "u" && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent)), V = !0;
      if (!M) {
        var U = e.createTexture(), X = De.allocType(xa, 36);
        e.activeTexture(No), e.bindTexture(Ea, U), e.texImage2D(Do, 0, Zr, 3, 3, 0, Zr, xa, X), De.freeType(X), e.bindTexture(Ea, null), e.deleteTexture(U), V = !e.getError();
      }
      return {
        // drawing buffer bit depth
        colorBits: [
          e.getParameter(fo),
          e.getParameter(oo),
          e.getParameter(uo),
          e.getParameter(so)
        ],
        depthBits: e.getParameter(co),
        stencilBits: e.getParameter(lo),
        subpixelBits: e.getParameter(io),
        // supported extensions
        extensions: Object.keys(t).filter(function(B) {
          return !!t[B];
        }),
        // max aniso samples
        maxAnisotropic: s,
        // max draw buffers
        maxDrawbuffers: x,
        maxColorAttachments: O,
        // point and line size ranges
        pointSizeDims: e.getParameter(mo),
        lineWidthDims: e.getParameter(ho),
        maxViewportDims: e.getParameter(po),
        maxCombinedTextureUnits: e.getParameter(Eo),
        maxCubeMapSize: e.getParameter(go),
        maxRenderbufferSize: e.getParameter(So),
        maxTextureUnits: e.getParameter(Ao),
        maxTextureSize: e.getParameter(vo),
        maxAttributes: e.getParameter(_o),
        maxVertexUniforms: e.getParameter(bo),
        maxVertexTextureUnits: e.getParameter(xo),
        maxVaryingVectors: e.getParameter(yo),
        maxFragmentUniforms: e.getParameter(To),
        // vendor info
        glsl: e.getParameter(Ro),
        renderer: e.getParameter(Lo),
        vendor: e.getParameter(wo),
        version: e.getParameter(Oo),
        // quirks
        readFloat: E,
        npotTextureCube: V
      };
    };
    function nr(e) {
      return !!e && typeof e == "object" && Array.isArray(e.shape) && Array.isArray(e.stride) && typeof e.offset == "number" && e.shape.length === e.stride.length && (Array.isArray(e.data) || _e(e.data));
    }
    var Je = function(e) {
      return Object.keys(e).map(function(t) {
        return e[t];
      });
    }, yt = {
      shape: jo,
      flatten: Vo
    };
    function Mo(e, t, s) {
      for (var x = 0; x < t; ++x)
        s[x] = e[x];
    }
    function Uo(e, t, s, x) {
      for (var O = 0, E = 0; E < t; ++E)
        for (var g = e[E], N = 0; N < s; ++N)
          x[O++] = g[N];
    }
    function Aa(e, t, s, x, O, E) {
      for (var g = E, N = 0; N < t; ++N)
        for (var D = e[N], M = 0; M < s; ++M)
          for (var V = D[M], U = 0; U < x; ++U)
            O[g++] = V[U];
    }
    function Ta(e, t, s, x, O) {
      for (var E = 1, g = s + 1; g < t.length; ++g)
        E *= t[g];
      var N = t[s];
      if (t.length - s === 4) {
        var D = t[s + 1], M = t[s + 2], V = t[s + 3];
        for (g = 0; g < N; ++g)
          Aa(e[g], D, M, V, x, O), O += E;
      } else
        for (g = 0; g < N; ++g)
          Ta(e[g], t, s + 1, x, O), O += E;
    }
    function Vo(e, t, s, x) {
      var O = 1;
      if (t.length)
        for (var E = 0; E < t.length; ++E)
          O *= t[E];
      else
        O = 0;
      var g = x || De.allocType(s, O);
      switch (t.length) {
        case 0:
          break;
        case 1:
          Mo(e, t[0], g);
          break;
        case 2:
          Uo(e, t[0], t[1], g);
          break;
        case 3:
          Aa(e, t[0], t[1], t[2], g, 0);
          break;
        default:
          Ta(e, t, 0, g, 0);
      }
      return g;
    }
    function jo(e) {
      for (var t = [], s = e; s.length; s = s[0])
        t.push(s.length);
      return t;
    }
    var nn = {
      "[object Int8Array]": 5120,
      "[object Int16Array]": 5122,
      "[object Int32Array]": 5124,
      "[object Uint8Array]": 5121,
      "[object Uint8ClampedArray]": 5121,
      "[object Uint16Array]": 5123,
      "[object Uint32Array]": 5125,
      "[object Float32Array]": 5126,
      "[object Float64Array]": 5121,
      "[object ArrayBuffer]": 5121
    }, Xo = 5120, Ho = 5122, $o = 5124, zo = 5121, Wo = 5123, Yo = 5125, Qo = 5126, qo = 5126, xr = {
      int8: Xo,
      int16: Ho,
      int32: $o,
      uint8: zo,
      uint16: Wo,
      uint32: Yo,
      float: Qo,
      float32: qo
    }, Ko = 35048, Zo = 35040, Et = {
      dynamic: Ko,
      stream: Zo,
      static: 35044
    }, an = yt.flatten, ga = yt.shape, Sa = 35044, Jo = 35040, fn = 5121, on = 5126, dr = [];
    dr[5120] = 1, dr[5122] = 2, dr[5124] = 4, dr[5121] = 1, dr[5123] = 2, dr[5125] = 4, dr[5126] = 4;
    function xt(e) {
      return nn[Object.prototype.toString.call(e)] | 0;
    }
    function wa(e, t) {
      for (var s = 0; s < t.length; ++s)
        e[s] = t[s];
    }
    function La(e, t, s, x, O, E, g) {
      for (var N = 0, D = 0; D < s; ++D)
        for (var M = 0; M < x; ++M)
          e[N++] = t[O * D + E * M + g];
    }
    function eu(e, t, s, x) {
      var O = 0, E = {};
      function g(v) {
        this.id = O++, this.buffer = e.createBuffer(), this.type = v, this.usage = Sa, this.byteLength = 0, this.dimension = 1, this.dtype = fn, this.persistentData = null, s.profile && (this.stats = { size: 0 });
      }
      g.prototype.bind = function() {
        e.bindBuffer(this.type, this.buffer);
      }, g.prototype.destroy = function() {
        X(this);
      };
      var N = [];
      function D(v, T) {
        var P = N.pop();
        return P || (P = new g(v)), P.bind(), U(P, T, Jo, 0, 1, !1), P;
      }
      function M(v) {
        N.push(v);
      }
      function V(v, T, P) {
        v.byteLength = T.byteLength, e.bufferData(v.type, T, P);
      }
      function U(v, T, P, K, F, Q) {
        var W;
        if (v.usage = P, Array.isArray(T)) {
          if (v.dtype = K || on, T.length > 0) {
            var ae;
            if (Array.isArray(T[0])) {
              W = ga(T);
              for (var R = 1, L = 1; L < W.length; ++L)
                R *= W[L];
              v.dimension = R, ae = an(T, W, v.dtype), V(v, ae, P), Q ? v.persistentData = ae : De.freeType(ae);
            } else if (typeof T[0] == "number") {
              v.dimension = F;
              var ee = De.allocType(v.dtype, T.length);
              wa(ee, T), V(v, ee, P), Q ? v.persistentData = ee : De.freeType(ee);
            } else
              _e(T[0]) ? (v.dimension = T[0].length, v.dtype = K || xt(T[0]) || on, ae = an(
                T,
                [T.length, T[0].length],
                v.dtype
              ), V(v, ae, P), Q ? v.persistentData = ae : De.freeType(ae)) : n.raise("invalid buffer data");
          }
        } else if (_e(T))
          v.dtype = K || xt(T), v.dimension = F, V(v, T, P), Q && (v.persistentData = new Uint8Array(new Uint8Array(T.buffer)));
        else if (nr(T)) {
          W = T.shape;
          var H = T.stride, I = T.offset, $ = 0, z = 0, ce = 0, se = 0;
          W.length === 1 ? ($ = W[0], z = 1, ce = H[0], se = 0) : W.length === 2 ? ($ = W[0], z = W[1], ce = H[0], se = H[1]) : n.raise("invalid shape"), v.dtype = K || xt(T.data) || on, v.dimension = z;
          var Y = De.allocType(v.dtype, $ * z);
          La(
            Y,
            T.data,
            $,
            z,
            ce,
            se,
            I
          ), V(v, Y, P), Q ? v.persistentData = Y : De.freeType(Y);
        } else
          T instanceof ArrayBuffer ? (v.dtype = fn, v.dimension = F, V(v, T, P), Q && (v.persistentData = new Uint8Array(new Uint8Array(T)))) : n.raise("invalid buffer data");
      }
      function X(v) {
        t.bufferCount--, x(v);
        var T = v.buffer;
        n(T, "buffer must not be deleted already"), e.deleteBuffer(T), v.buffer = null, delete E[v.id];
      }
      function B(v, T, P, K) {
        t.bufferCount++;
        var F = new g(T);
        E[F.id] = F;
        function Q(R) {
          var L = Sa, ee = null, H = 0, I = 0, $ = 1;
          return Array.isArray(R) || _e(R) || nr(R) || R instanceof ArrayBuffer ? ee = R : typeof R == "number" ? H = R | 0 : R && (n.type(
            R,
            "object",
            "buffer arguments must be an object, a number or an array"
          ), "data" in R && (n(
            ee === null || Array.isArray(ee) || _e(ee) || nr(ee),
            "invalid data for buffer"
          ), ee = R.data), "usage" in R && (n.parameter(R.usage, Et, "invalid buffer usage"), L = Et[R.usage]), "type" in R && (n.parameter(R.type, xr, "invalid buffer type"), I = xr[R.type]), "dimension" in R && (n.type(R.dimension, "number", "invalid dimension"), $ = R.dimension | 0), "length" in R && (n.nni(H, "buffer length must be a nonnegative integer"), H = R.length | 0)), F.bind(), ee ? U(F, ee, L, I, $, K) : (H && e.bufferData(F.type, H, L), F.dtype = I || fn, F.usage = L, F.dimension = $, F.byteLength = H), s.profile && (F.stats.size = F.byteLength * dr[F.dtype]), Q;
        }
        function W(R, L) {
          n(
            L + R.byteLength <= F.byteLength,
            "invalid buffer subdata call, buffer is too small.  Can't write data of size " + R.byteLength + " starting from offset " + L + " to a buffer of size " + F.byteLength
          ), e.bufferSubData(F.type, L, R);
        }
        function ae(R, L) {
          var ee = (L || 0) | 0, H;
          if (F.bind(), _e(R) || R instanceof ArrayBuffer)
            W(R, ee);
          else if (Array.isArray(R)) {
            if (R.length > 0)
              if (typeof R[0] == "number") {
                var I = De.allocType(F.dtype, R.length);
                wa(I, R), W(I, ee), De.freeType(I);
              } else if (Array.isArray(R[0]) || _e(R[0])) {
                H = ga(R);
                var $ = an(R, H, F.dtype);
                W($, ee), De.freeType($);
              } else
                n.raise("invalid buffer data");
          } else if (nr(R)) {
            H = R.shape;
            var z = R.stride, ce = 0, se = 0, Y = 0, q = 0;
            H.length === 1 ? (ce = H[0], se = 1, Y = z[0], q = 0) : H.length === 2 ? (ce = H[0], se = H[1], Y = z[0], q = z[1]) : n.raise("invalid shape");
            var fe = Array.isArray(R.data) ? F.dtype : xt(R.data), le = De.allocType(fe, ce * se);
            La(
              le,
              R.data,
              ce,
              se,
              Y,
              q,
              R.offset
            ), W(le, ee), De.freeType(le);
          } else
            n.raise("invalid data for buffer subdata");
          return Q;
        }
        return P || Q(v), Q._reglType = "buffer", Q._buffer = F, Q.subdata = ae, s.profile && (Q.stats = F.stats), Q.destroy = function() {
          X(F);
        }, Q;
      }
      function k() {
        Je(E).forEach(function(v) {
          v.buffer = e.createBuffer(), e.bindBuffer(v.type, v.buffer), e.bufferData(
            v.type,
            v.persistentData || v.byteLength,
            v.usage
          );
        });
      }
      return s.profile && (t.getTotalBufferSize = function() {
        var v = 0;
        return Object.keys(E).forEach(function(T) {
          v += E[T].stats.size;
        }), v;
      }), {
        create: B,
        createStream: D,
        destroyStream: M,
        clear: function() {
          Je(E).forEach(X), N.forEach(X);
        },
        getBuffer: function(v) {
          return v && v._buffer instanceof g ? v._buffer : null;
        },
        restore: k,
        _initBuffer: U
      };
    }
    var ru = 0, tu = 0, nu = 1, au = 1, iu = 4, fu = 4, mr = {
      points: ru,
      point: tu,
      lines: nu,
      line: au,
      triangles: iu,
      triangle: fu,
      "line loop": 2,
      "line strip": 3,
      "triangle strip": 5,
      "triangle fan": 6
    }, ou = 0, uu = 1, Jr = 4, su = 5120, Ir = 5121, Oa = 5122, Pr = 5123, Ra = 5124, Ar = 5125, un = 34963, cu = 35040, lu = 35044;
    function du(e, t, s, x) {
      var O = {}, E = 0, g = {
        uint8: Ir,
        uint16: Pr
      };
      t.oes_element_index_uint && (g.uint32 = Ar);
      function N(k) {
        this.id = E++, O[this.id] = this, this.buffer = k, this.primType = Jr, this.vertCount = 0, this.type = 0;
      }
      N.prototype.bind = function() {
        this.buffer.bind();
      };
      var D = [];
      function M(k) {
        var v = D.pop();
        return v || (v = new N(s.create(
          null,
          un,
          !0,
          !1
        )._buffer)), U(v, k, cu, -1, -1, 0, 0), v;
      }
      function V(k) {
        D.push(k);
      }
      function U(k, v, T, P, K, F, Q) {
        k.buffer.bind();
        var W;
        if (v) {
          var ae = Q;
          !Q && (!_e(v) || nr(v) && !_e(v.data)) && (ae = t.oes_element_index_uint ? Ar : Pr), s._initBuffer(
            k.buffer,
            v,
            T,
            ae,
            3
          );
        } else
          e.bufferData(un, F, T), k.buffer.dtype = W || Ir, k.buffer.usage = T, k.buffer.dimension = 3, k.buffer.byteLength = F;
        if (W = Q, !Q) {
          switch (k.buffer.dtype) {
            case Ir:
            case su:
              W = Ir;
              break;
            case Pr:
            case Oa:
              W = Pr;
              break;
            case Ar:
            case Ra:
              W = Ar;
              break;
            default:
              n.raise("unsupported type for element array");
          }
          k.buffer.dtype = W;
        }
        k.type = W, n(
          W !== Ar || !!t.oes_element_index_uint,
          "32 bit element buffers not supported, enable oes_element_index_uint first"
        );
        var R = K;
        R < 0 && (R = k.buffer.byteLength, W === Pr ? R >>= 1 : W === Ar && (R >>= 2)), k.vertCount = R;
        var L = P;
        if (P < 0) {
          L = Jr;
          var ee = k.buffer.dimension;
          ee === 1 && (L = ou), ee === 2 && (L = uu), ee === 3 && (L = Jr);
        }
        k.primType = L;
      }
      function X(k) {
        x.elementsCount--, n(k.buffer !== null, "must not double destroy elements"), delete O[k.id], k.buffer.destroy(), k.buffer = null;
      }
      function B(k, v) {
        var T = s.create(null, un, !0), P = new N(T._buffer);
        x.elementsCount++;
        function K(F) {
          if (!F)
            T(), P.primType = Jr, P.vertCount = 0, P.type = Ir;
          else if (typeof F == "number")
            T(F), P.primType = Jr, P.vertCount = F | 0, P.type = Ir;
          else {
            var Q = null, W = lu, ae = -1, R = -1, L = 0, ee = 0;
            Array.isArray(F) || _e(F) || nr(F) ? Q = F : (n.type(F, "object", "invalid arguments for elements"), "data" in F && (Q = F.data, n(
              Array.isArray(Q) || _e(Q) || nr(Q),
              "invalid data for element buffer"
            )), "usage" in F && (n.parameter(
              F.usage,
              Et,
              "invalid element buffer usage"
            ), W = Et[F.usage]), "primitive" in F && (n.parameter(
              F.primitive,
              mr,
              "invalid element buffer primitive"
            ), ae = mr[F.primitive]), "count" in F && (n(
              typeof F.count == "number" && F.count >= 0,
              "invalid vertex count for elements"
            ), R = F.count | 0), "type" in F && (n.parameter(
              F.type,
              g,
              "invalid buffer type"
            ), ee = g[F.type]), "length" in F ? L = F.length | 0 : (L = R, ee === Pr || ee === Oa ? L *= 2 : (ee === Ar || ee === Ra) && (L *= 4))), U(
              P,
              Q,
              W,
              ae,
              R,
              L,
              ee
            );
          }
          return K;
        }
        return K(k), K._reglType = "elements", K._elements = P, K.subdata = function(F, Q) {
          return T.subdata(F, Q), K;
        }, K.destroy = function() {
          X(P);
        }, K;
      }
      return {
        create: B,
        createStream: M,
        destroyStream: V,
        getElements: function(k) {
          return typeof k == "function" && k._elements instanceof N ? k._elements : null;
        },
        clear: function() {
          Je(O).forEach(X);
        }
      };
    }
    var Ga = new Float32Array(1), mu = new Uint32Array(Ga.buffer), hu = 5123;
    function Ca(e) {
      for (var t = De.allocType(hu, e.length), s = 0; s < e.length; ++s)
        if (isNaN(e[s]))
          t[s] = 65535;
        else if (e[s] === 1 / 0)
          t[s] = 31744;
        else if (e[s] === -1 / 0)
          t[s] = 64512;
        else {
          Ga[0] = e[s];
          var x = mu[0], O = x >>> 31 << 15, E = (x << 1 >>> 24) - 127, g = x >> 13 & 1023;
          if (E < -24)
            t[s] = O;
          else if (E < -14) {
            var N = -14 - E;
            t[s] = O + (g + 1024 >> N);
          } else
            E > 15 ? t[s] = O + 31744 : t[s] = O + (E + 15 << 10) + g;
        }
      return t;
    }
    function Se(e) {
      return Array.isArray(e) || _e(e);
    }
    var Fa = function(e) {
      return !(e & e - 1) && !!e;
    }, vu = 34467, ir = 3553, sn = 34067, At = 34069, Tr = 6408, cn = 6406, Tt = 6407, et = 6409, gt = 6410, Da = 32854, ln = 32855, Na = 36194, pu = 32819, _u = 32820, bu = 33635, yu = 34042, dn = 6402, St = 34041, mn = 35904, hn = 35906, kr = 36193, vn = 33776, pn = 33777, _n = 33778, bn = 33779, Ba = 35986, Ia = 35987, Pa = 34798, ka = 35840, Ma = 35841, Ua = 35842, Va = 35843, ja = 36196, Mr = 5121, yn = 5123, En = 5125, rt = 5126, Eu = 10242, xu = 10243, Au = 10497, xn = 33071, Tu = 33648, gu = 10240, Su = 10241, An = 9728, wu = 9729, Tn = 9984, Xa = 9985, Ha = 9986, gn = 9987, Lu = 33170, wt = 4352, Ou = 4353, Ru = 4354, Gu = 34046, Cu = 3317, Fu = 37440, Du = 37441, Nu = 37443, $a = 37444, tt = 33984, Bu = [
      Tn,
      Ha,
      Xa,
      gn
    ], Lt = [
      0,
      et,
      gt,
      Tt,
      Tr
    ], rr = {};
    rr[et] = rr[cn] = rr[dn] = 1, rr[St] = rr[gt] = 2, rr[Tt] = rr[mn] = 3, rr[Tr] = rr[hn] = 4;
    function Ur(e) {
      return "[object " + e + "]";
    }
    var za = Ur("HTMLCanvasElement"), Wa = Ur("OffscreenCanvas"), Ya = Ur("CanvasRenderingContext2D"), Qa = Ur("ImageBitmap"), qa = Ur("HTMLImageElement"), Ka = Ur("HTMLVideoElement"), Iu = Object.keys(nn).concat([
      za,
      Wa,
      Ya,
      Qa,
      qa,
      Ka
    ]), Vr = [];
    Vr[Mr] = 1, Vr[rt] = 4, Vr[kr] = 2, Vr[yn] = 2, Vr[En] = 4;
    var je = [];
    je[Da] = 2, je[ln] = 2, je[Na] = 2, je[St] = 4, je[vn] = 0.5, je[pn] = 0.5, je[_n] = 1, je[bn] = 1, je[Ba] = 0.5, je[Ia] = 1, je[Pa] = 1, je[ka] = 0.5, je[Ma] = 0.25, je[Ua] = 0.5, je[Va] = 0.25, je[ja] = 0.5;
    function Za(e) {
      return Array.isArray(e) && (e.length === 0 || typeof e[0] == "number");
    }
    function Ja(e) {
      if (!Array.isArray(e))
        return !1;
      var t = e.length;
      return !(t === 0 || !Se(e[0]));
    }
    function gr(e) {
      return Object.prototype.toString.call(e);
    }
    function ei(e) {
      return gr(e) === za;
    }
    function ri(e) {
      return gr(e) === Wa;
    }
    function Pu(e) {
      return gr(e) === Ya;
    }
    function ku(e) {
      return gr(e) === Qa;
    }
    function Mu(e) {
      return gr(e) === qa;
    }
    function Uu(e) {
      return gr(e) === Ka;
    }
    function Sn(e) {
      if (!e)
        return !1;
      var t = gr(e);
      return Iu.indexOf(t) >= 0 ? !0 : Za(e) || Ja(e) || nr(e);
    }
    function ti(e) {
      return nn[Object.prototype.toString.call(e)] | 0;
    }
    function Vu(e, t) {
      var s = t.length;
      switch (e.type) {
        case Mr:
        case yn:
        case En:
        case rt:
          var x = De.allocType(e.type, s);
          x.set(t), e.data = x;
          break;
        case kr:
          e.data = Ca(t);
          break;
        default:
          n.raise("unsupported texture type, must specify a typed array");
      }
    }
    function ni(e, t) {
      return De.allocType(
        e.type === kr ? rt : e.type,
        t
      );
    }
    function ai(e, t) {
      e.type === kr ? (e.data = Ca(t), De.freeType(t)) : e.data = t;
    }
    function ju(e, t, s, x, O, E) {
      for (var g = e.width, N = e.height, D = e.channels, M = g * N * D, V = ni(e, M), U = 0, X = 0; X < N; ++X)
        for (var B = 0; B < g; ++B)
          for (var k = 0; k < D; ++k)
            V[U++] = t[s * B + x * X + O * k + E];
      ai(e, V);
    }
    function Ot(e, t, s, x, O, E) {
      var g;
      if (typeof je[e] < "u" ? g = je[e] : g = rr[e] * Vr[t], E && (g *= 6), O) {
        for (var N = 0, D = s; D >= 1; )
          N += g * D * D, D /= 2;
        return N;
      } else
        return g * s * x;
    }
    function Xu(e, t, s, x, O, E, g) {
      var N = {
        "don't care": wt,
        "dont care": wt,
        nice: Ru,
        fast: Ou
      }, D = {
        repeat: Au,
        clamp: xn,
        mirror: Tu
      }, M = {
        nearest: An,
        linear: wu
      }, V = ye({
        mipmap: gn,
        "nearest mipmap nearest": Tn,
        "linear mipmap nearest": Xa,
        "nearest mipmap linear": Ha,
        "linear mipmap linear": gn
      }, M), U = {
        none: 0,
        browser: $a
      }, X = {
        uint8: Mr,
        rgba4: pu,
        rgb565: bu,
        "rgb5 a1": _u
      }, B = {
        alpha: cn,
        luminance: et,
        "luminance alpha": gt,
        rgb: Tt,
        rgba: Tr,
        rgba4: Da,
        "rgb5 a1": ln,
        rgb565: Na
      }, k = {};
      t.ext_srgb && (B.srgb = mn, B.srgba = hn), t.oes_texture_float && (X.float32 = X.float = rt), t.oes_texture_half_float && (X.float16 = X["half float"] = kr), t.webgl_depth_texture && (ye(B, {
        depth: dn,
        "depth stencil": St
      }), ye(X, {
        uint16: yn,
        uint32: En,
        "depth stencil": yu
      })), t.webgl_compressed_texture_s3tc && ye(k, {
        "rgb s3tc dxt1": vn,
        "rgba s3tc dxt1": pn,
        "rgba s3tc dxt3": _n,
        "rgba s3tc dxt5": bn
      }), t.webgl_compressed_texture_atc && ye(k, {
        "rgb atc": Ba,
        "rgba atc explicit alpha": Ia,
        "rgba atc interpolated alpha": Pa
      }), t.webgl_compressed_texture_pvrtc && ye(k, {
        "rgb pvrtc 4bppv1": ka,
        "rgb pvrtc 2bppv1": Ma,
        "rgba pvrtc 4bppv1": Ua,
        "rgba pvrtc 2bppv1": Va
      }), t.webgl_compressed_texture_etc1 && (k["rgb etc1"] = ja);
      var v = Array.prototype.slice.call(
        e.getParameter(vu)
      );
      Object.keys(k).forEach(function(o) {
        var A = k[o];
        v.indexOf(A) >= 0 && (B[o] = A);
      });
      var T = Object.keys(B);
      s.textureFormats = T;
      var P = [];
      Object.keys(B).forEach(function(o) {
        var A = B[o];
        P[A] = o;
      });
      var K = [];
      Object.keys(X).forEach(function(o) {
        var A = X[o];
        K[A] = o;
      });
      var F = [];
      Object.keys(M).forEach(function(o) {
        var A = M[o];
        F[A] = o;
      });
      var Q = [];
      Object.keys(V).forEach(function(o) {
        var A = V[o];
        Q[A] = o;
      });
      var W = [];
      Object.keys(D).forEach(function(o) {
        var A = D[o];
        W[A] = o;
      });
      var ae = T.reduce(function(o, A) {
        var y = B[A];
        return y === et || y === cn || y === et || y === gt || y === dn || y === St || t.ext_srgb && (y === mn || y === hn) ? o[y] = y : y === ln || A.indexOf("rgba") >= 0 ? o[y] = Tr : o[y] = Tt, o;
      }, {});
      function R() {
        this.internalformat = Tr, this.format = Tr, this.type = Mr, this.compressed = !1, this.premultiplyAlpha = !1, this.flipY = !1, this.unpackAlignment = 1, this.colorSpace = $a, this.width = 0, this.height = 0, this.channels = 0;
      }
      function L(o, A) {
        o.internalformat = A.internalformat, o.format = A.format, o.type = A.type, o.compressed = A.compressed, o.premultiplyAlpha = A.premultiplyAlpha, o.flipY = A.flipY, o.unpackAlignment = A.unpackAlignment, o.colorSpace = A.colorSpace, o.width = A.width, o.height = A.height, o.channels = A.channels;
      }
      function ee(o, A) {
        if (!(typeof A != "object" || !A)) {
          if ("premultiplyAlpha" in A && (n.type(
            A.premultiplyAlpha,
            "boolean",
            "invalid premultiplyAlpha"
          ), o.premultiplyAlpha = A.premultiplyAlpha), "flipY" in A && (n.type(
            A.flipY,
            "boolean",
            "invalid texture flip"
          ), o.flipY = A.flipY), "alignment" in A && (n.oneOf(
            A.alignment,
            [1, 2, 4, 8],
            "invalid texture unpack alignment"
          ), o.unpackAlignment = A.alignment), "colorSpace" in A && (n.parameter(
            A.colorSpace,
            U,
            "invalid colorSpace"
          ), o.colorSpace = U[A.colorSpace]), "type" in A) {
            var y = A.type;
            n(
              t.oes_texture_float || !(y === "float" || y === "float32"),
              "you must enable the OES_texture_float extension in order to use floating point textures."
            ), n(
              t.oes_texture_half_float || !(y === "half float" || y === "float16"),
              "you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."
            ), n(
              t.webgl_depth_texture || !(y === "uint16" || y === "uint32" || y === "depth stencil"),
              "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
            ), n.parameter(
              y,
              X,
              "invalid texture type"
            ), o.type = X[y];
          }
          var J = o.width, he = o.height, a = o.channels, r = !1;
          "shape" in A ? (n(
            Array.isArray(A.shape) && A.shape.length >= 2,
            "shape must be an array"
          ), J = A.shape[0], he = A.shape[1], A.shape.length === 3 && (a = A.shape[2], n(a > 0 && a <= 4, "invalid number of channels"), r = !0), n(J >= 0 && J <= s.maxTextureSize, "invalid width"), n(he >= 0 && he <= s.maxTextureSize, "invalid height")) : ("radius" in A && (J = he = A.radius, n(J >= 0 && J <= s.maxTextureSize, "invalid radius")), "width" in A && (J = A.width, n(J >= 0 && J <= s.maxTextureSize, "invalid width")), "height" in A && (he = A.height, n(he >= 0 && he <= s.maxTextureSize, "invalid height")), "channels" in A && (a = A.channels, n(a > 0 && a <= 4, "invalid number of channels"), r = !0)), o.width = J | 0, o.height = he | 0, o.channels = a | 0;
          var c = !1;
          if ("format" in A) {
            var h = A.format;
            n(
              t.webgl_depth_texture || !(h === "depth" || h === "depth stencil"),
              "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
            ), n.parameter(
              h,
              B,
              "invalid texture format"
            );
            var p = o.internalformat = B[h];
            o.format = ae[p], h in X && ("type" in A || (o.type = X[h])), h in k && (o.compressed = !0), c = !0;
          }
          !r && c ? o.channels = rr[o.format] : r && !c ? o.channels !== Lt[o.format] && (o.format = o.internalformat = Lt[o.channels]) : c && r && n(
            o.channels === rr[o.format],
            "number of channels inconsistent with specified format"
          );
        }
      }
      function H(o) {
        e.pixelStorei(Fu, o.flipY), e.pixelStorei(Du, o.premultiplyAlpha), e.pixelStorei(Nu, o.colorSpace), e.pixelStorei(Cu, o.unpackAlignment);
      }
      function I() {
        R.call(this), this.xOffset = 0, this.yOffset = 0, this.data = null, this.needsFree = !1, this.element = null, this.needsCopy = !1;
      }
      function $(o, A) {
        var y = null;
        if (Sn(A) ? y = A : A && (n.type(A, "object", "invalid pixel data type"), ee(o, A), "x" in A && (o.xOffset = A.x | 0), "y" in A && (o.yOffset = A.y | 0), Sn(A.data) && (y = A.data)), n(
          !o.compressed || y instanceof Uint8Array,
          "compressed texture data must be stored in a uint8array"
        ), A.copy) {
          n(!y, "can not specify copy and data field for the same texture");
          var J = O.viewportWidth, he = O.viewportHeight;
          o.width = o.width || J - o.xOffset, o.height = o.height || he - o.yOffset, o.needsCopy = !0, n(
            o.xOffset >= 0 && o.xOffset < J && o.yOffset >= 0 && o.yOffset < he && o.width > 0 && o.width <= J && o.height > 0 && o.height <= he,
            "copy texture read out of bounds"
          );
        } else if (!y)
          o.width = o.width || 1, o.height = o.height || 1, o.channels = o.channels || 4;
        else if (_e(y))
          o.channels = o.channels || 4, o.data = y, !("type" in A) && o.type === Mr && (o.type = ti(y));
        else if (Za(y))
          o.channels = o.channels || 4, Vu(o, y), o.alignment = 1, o.needsFree = !0;
        else if (nr(y)) {
          var a = y.data;
          !Array.isArray(a) && o.type === Mr && (o.type = ti(a));
          var r = y.shape, c = y.stride, h, p, d, l, m, i;
          r.length === 3 ? (d = r[2], i = c[2]) : (n(r.length === 2, "invalid ndarray pixel data, must be 2 or 3D"), d = 1, i = 1), h = r[0], p = r[1], l = c[0], m = c[1], o.alignment = 1, o.width = h, o.height = p, o.channels = d, o.format = o.internalformat = Lt[d], o.needsFree = !0, ju(o, a, l, m, i, y.offset);
        } else if (ei(y) || ri(y) || Pu(y))
          ei(y) || ri(y) ? o.element = y : o.element = y.canvas, o.width = o.element.width, o.height = o.element.height, o.channels = 4;
        else if (ku(y))
          o.element = y, o.width = y.width, o.height = y.height, o.channels = 4;
        else if (Mu(y))
          o.element = y, o.width = y.naturalWidth, o.height = y.naturalHeight, o.channels = 4;
        else if (Uu(y))
          o.element = y, o.width = y.videoWidth, o.height = y.videoHeight, o.channels = 4;
        else if (Ja(y)) {
          var u = o.width || y[0].length, f = o.height || y.length, b = o.channels;
          Se(y[0][0]) ? b = b || y[0][0].length : b = b || 1;
          for (var _ = yt.shape(y), w = 1, G = 0; G < _.length; ++G)
            w *= _[G];
          var j = ni(o, w);
          yt.flatten(y, _, "", j), ai(o, j), o.alignment = 1, o.width = u, o.height = f, o.channels = b, o.format = o.internalformat = Lt[b], o.needsFree = !0;
        }
        o.type === rt ? n(
          s.extensions.indexOf("oes_texture_float") >= 0,
          "oes_texture_float extension not enabled"
        ) : o.type === kr && n(
          s.extensions.indexOf("oes_texture_half_float") >= 0,
          "oes_texture_half_float extension not enabled"
        );
      }
      function z(o, A, y) {
        var J = o.element, he = o.data, a = o.internalformat, r = o.format, c = o.type, h = o.width, p = o.height;
        H(o), J ? e.texImage2D(A, y, r, r, c, J) : o.compressed ? e.compressedTexImage2D(A, y, a, h, p, 0, he) : o.needsCopy ? (x(), e.copyTexImage2D(
          A,
          y,
          r,
          o.xOffset,
          o.yOffset,
          h,
          p,
          0
        )) : e.texImage2D(A, y, r, h, p, 0, r, c, he || null);
      }
      function ce(o, A, y, J, he) {
        var a = o.element, r = o.data, c = o.internalformat, h = o.format, p = o.type, d = o.width, l = o.height;
        H(o), a ? e.texSubImage2D(
          A,
          he,
          y,
          J,
          h,
          p,
          a
        ) : o.compressed ? e.compressedTexSubImage2D(
          A,
          he,
          y,
          J,
          c,
          d,
          l,
          r
        ) : o.needsCopy ? (x(), e.copyTexSubImage2D(
          A,
          he,
          y,
          J,
          o.xOffset,
          o.yOffset,
          d,
          l
        )) : e.texSubImage2D(
          A,
          he,
          y,
          J,
          d,
          l,
          h,
          p,
          r
        );
      }
      var se = [];
      function Y() {
        return se.pop() || new I();
      }
      function q(o) {
        o.needsFree && De.freeType(o.data), I.call(o), se.push(o);
      }
      function fe() {
        R.call(this), this.genMipmaps = !1, this.mipmapHint = wt, this.mipmask = 0, this.images = Array(16);
      }
      function le(o, A, y) {
        var J = o.images[0] = Y();
        o.mipmask = 1, J.width = o.width = A, J.height = o.height = y, J.channels = o.channels = 4;
      }
      function ve(o, A) {
        var y = null;
        if (Sn(A))
          y = o.images[0] = Y(), L(y, o), $(y, A), o.mipmask = 1;
        else if (ee(o, A), Array.isArray(A.mipmap))
          for (var J = A.mipmap, he = 0; he < J.length; ++he)
            y = o.images[he] = Y(), L(y, o), y.width >>= he, y.height >>= he, $(y, J[he]), o.mipmask |= 1 << he;
        else
          y = o.images[0] = Y(), L(y, o), $(y, A), o.mipmask = 1;
        L(o, o.images[0]), o.compressed && (o.internalformat === vn || o.internalformat === pn || o.internalformat === _n || o.internalformat === bn) && n(
          o.width % 4 === 0 && o.height % 4 === 0,
          "for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4"
        );
      }
      function we(o, A) {
        for (var y = o.images, J = 0; J < y.length; ++J) {
          if (!y[J])
            return;
          z(y[J], A, J);
        }
      }
      var Le = [];
      function be() {
        var o = Le.pop() || new fe();
        R.call(o), o.mipmask = 0;
        for (var A = 0; A < 16; ++A)
          o.images[A] = null;
        return o;
      }
      function Ie(o) {
        for (var A = o.images, y = 0; y < A.length; ++y)
          A[y] && q(A[y]), A[y] = null;
        Le.push(o);
      }
      function ge() {
        this.minFilter = An, this.magFilter = An, this.wrapS = xn, this.wrapT = xn, this.anisotropic = 1, this.genMipmaps = !1, this.mipmapHint = wt;
      }
      function Be(o, A) {
        if ("min" in A) {
          var y = A.min;
          n.parameter(y, V), o.minFilter = V[y], Bu.indexOf(o.minFilter) >= 0 && !("faces" in A) && (o.genMipmaps = !0);
        }
        if ("mag" in A) {
          var J = A.mag;
          n.parameter(J, M), o.magFilter = M[J];
        }
        var he = o.wrapS, a = o.wrapT;
        if ("wrap" in A) {
          var r = A.wrap;
          typeof r == "string" ? (n.parameter(r, D), he = a = D[r]) : Array.isArray(r) && (n.parameter(r[0], D), n.parameter(r[1], D), he = D[r[0]], a = D[r[1]]);
        } else {
          if ("wrapS" in A) {
            var c = A.wrapS;
            n.parameter(c, D), he = D[c];
          }
          if ("wrapT" in A) {
            var h = A.wrapT;
            n.parameter(h, D), a = D[h];
          }
        }
        if (o.wrapS = he, o.wrapT = a, "anisotropic" in A) {
          var p = A.anisotropic;
          n(
            typeof p == "number" && p >= 1 && p <= s.maxAnisotropic,
            "aniso samples must be between 1 and "
          ), o.anisotropic = A.anisotropic;
        }
        if ("mipmap" in A) {
          var d = !1;
          switch (typeof A.mipmap) {
            case "string":
              n.parameter(
                A.mipmap,
                N,
                "invalid mipmap hint"
              ), o.mipmapHint = N[A.mipmap], o.genMipmaps = !0, d = !0;
              break;
            case "boolean":
              d = o.genMipmaps = A.mipmap;
              break;
            case "object":
              n(Array.isArray(A.mipmap), "invalid mipmap type"), o.genMipmaps = !1, d = !0;
              break;
            default:
              n.raise("invalid mipmap type");
          }
          d && !("min" in A) && (o.minFilter = Tn);
        }
      }
      function Pe(o, A) {
        e.texParameteri(A, Su, o.minFilter), e.texParameteri(A, gu, o.magFilter), e.texParameteri(A, Eu, o.wrapS), e.texParameteri(A, xu, o.wrapT), t.ext_texture_filter_anisotropic && e.texParameteri(A, Gu, o.anisotropic), o.genMipmaps && (e.hint(Lu, o.mipmapHint), e.generateMipmap(A));
      }
      var ke = 0, Ve = {}, Xe = s.maxTextureUnits, Ce = Array(Xe).map(function() {
        return null;
      });
      function de(o) {
        R.call(this), this.mipmask = 0, this.internalformat = Tr, this.id = ke++, this.refCount = 1, this.target = o, this.texture = e.createTexture(), this.unit = -1, this.bindCount = 0, this.texInfo = new ge(), g.profile && (this.stats = { size: 0 });
      }
      function He(o) {
        e.activeTexture(tt), e.bindTexture(o.target, o.texture);
      }
      function Ae() {
        var o = Ce[0];
        o ? e.bindTexture(o.target, o.texture) : e.bindTexture(ir, null);
      }
      function ie(o) {
        var A = o.texture;
        n(A, "must not double destroy texture");
        var y = o.unit, J = o.target;
        y >= 0 && (e.activeTexture(tt + y), e.bindTexture(J, null), Ce[y] = null), e.deleteTexture(A), o.texture = null, o.params = null, o.pixels = null, o.refCount = 0, delete Ve[o.id], E.textureCount--;
      }
      ye(de.prototype, {
        bind: function() {
          var o = this;
          o.bindCount += 1;
          var A = o.unit;
          if (A < 0) {
            for (var y = 0; y < Xe; ++y) {
              var J = Ce[y];
              if (J) {
                if (J.bindCount > 0)
                  continue;
                J.unit = -1;
              }
              Ce[y] = o, A = y;
              break;
            }
            A >= Xe && n.raise("insufficient number of texture units"), g.profile && E.maxTextureUnits < A + 1 && (E.maxTextureUnits = A + 1), o.unit = A, e.activeTexture(tt + A), e.bindTexture(o.target, o.texture);
          }
          return A;
        },
        unbind: function() {
          this.bindCount -= 1;
        },
        decRef: function() {
          --this.refCount <= 0 && ie(this);
        }
      });
      function pe(o, A) {
        var y = new de(ir);
        Ve[y.id] = y, E.textureCount++;
        function J(r, c) {
          var h = y.texInfo;
          ge.call(h);
          var p = be();
          return typeof r == "number" ? typeof c == "number" ? le(p, r | 0, c | 0) : le(p, r | 0, r | 0) : r ? (n.type(r, "object", "invalid arguments to regl.texture"), Be(h, r), ve(p, r)) : le(p, 1, 1), h.genMipmaps && (p.mipmask = (p.width << 1) - 1), y.mipmask = p.mipmask, L(y, p), n.texture2D(h, p, s), y.internalformat = p.internalformat, J.width = p.width, J.height = p.height, He(y), we(p, ir), Pe(h, ir), Ae(), Ie(p), g.profile && (y.stats.size = Ot(
            y.internalformat,
            y.type,
            p.width,
            p.height,
            h.genMipmaps,
            !1
          )), J.format = P[y.internalformat], J.type = K[y.type], J.mag = F[h.magFilter], J.min = Q[h.minFilter], J.wrapS = W[h.wrapS], J.wrapT = W[h.wrapT], J;
        }
        function he(r, c, h, p) {
          n(!!r, "must specify image data");
          var d = c | 0, l = h | 0, m = p | 0, i = Y();
          return L(i, y), i.width = 0, i.height = 0, $(i, r), i.width = i.width || (y.width >> m) - d, i.height = i.height || (y.height >> m) - l, n(
            y.type === i.type && y.format === i.format && y.internalformat === i.internalformat,
            "incompatible format for texture.subimage"
          ), n(
            d >= 0 && l >= 0 && d + i.width <= y.width && l + i.height <= y.height,
            "texture.subimage write out of bounds"
          ), n(
            y.mipmask & 1 << m,
            "missing mipmap data"
          ), n(
            i.data || i.element || i.needsCopy,
            "missing image data"
          ), He(y), ce(i, ir, d, l, m), Ae(), q(i), J;
        }
        function a(r, c) {
          var h = r | 0, p = c | 0 || h;
          if (h === y.width && p === y.height)
            return J;
          J.width = y.width = h, J.height = y.height = p, He(y);
          for (var d = 0; y.mipmask >> d; ++d) {
            var l = h >> d, m = p >> d;
            if (!l || !m)
              break;
            e.texImage2D(
              ir,
              d,
              y.format,
              l,
              m,
              0,
              y.format,
              y.type,
              null
            );
          }
          return Ae(), g.profile && (y.stats.size = Ot(
            y.internalformat,
            y.type,
            h,
            p,
            !1,
            !1
          )), J;
        }
        return J(o, A), J.subimage = he, J.resize = a, J._reglType = "texture2d", J._texture = y, g.profile && (J.stats = y.stats), J.destroy = function() {
          y.decRef();
        }, J;
      }
      function Ee(o, A, y, J, he, a) {
        var r = new de(sn);
        Ve[r.id] = r, E.cubeCount++;
        var c = new Array(6);
        function h(l, m, i, u, f, b) {
          var _, w = r.texInfo;
          for (ge.call(w), _ = 0; _ < 6; ++_)
            c[_] = be();
          if (typeof l == "number" || !l) {
            var G = l | 0 || 1;
            for (_ = 0; _ < 6; ++_)
              le(c[_], G, G);
          } else if (typeof l == "object")
            if (m)
              ve(c[0], l), ve(c[1], m), ve(c[2], i), ve(c[3], u), ve(c[4], f), ve(c[5], b);
            else if (Be(w, l), ee(r, l), "faces" in l) {
              var j = l.faces;
              for (n(
                Array.isArray(j) && j.length === 6,
                "cube faces must be a length 6 array"
              ), _ = 0; _ < 6; ++_)
                n(
                  typeof j[_] == "object" && !!j[_],
                  "invalid input for cube map face"
                ), L(c[_], r), ve(c[_], j[_]);
            } else
              for (_ = 0; _ < 6; ++_)
                ve(c[_], l);
          else
            n.raise("invalid arguments to cube map");
          for (L(r, c[0]), n.optional(function() {
            s.npotTextureCube || n(Fa(r.width) && Fa(r.height), "your browser does not support non power or two texture dimensions");
          }), w.genMipmaps ? r.mipmask = (c[0].width << 1) - 1 : r.mipmask = c[0].mipmask, n.textureCube(r, w, c, s), r.internalformat = c[0].internalformat, h.width = c[0].width, h.height = c[0].height, He(r), _ = 0; _ < 6; ++_)
            we(c[_], At + _);
          for (Pe(w, sn), Ae(), g.profile && (r.stats.size = Ot(
            r.internalformat,
            r.type,
            h.width,
            h.height,
            w.genMipmaps,
            !0
          )), h.format = P[r.internalformat], h.type = K[r.type], h.mag = F[w.magFilter], h.min = Q[w.minFilter], h.wrapS = W[w.wrapS], h.wrapT = W[w.wrapT], _ = 0; _ < 6; ++_)
            Ie(c[_]);
          return h;
        }
        function p(l, m, i, u, f) {
          n(!!m, "must specify image data"), n(typeof l == "number" && l === (l | 0) && l >= 0 && l < 6, "invalid face");
          var b = i | 0, _ = u | 0, w = f | 0, G = Y();
          return L(G, r), G.width = 0, G.height = 0, $(G, m), G.width = G.width || (r.width >> w) - b, G.height = G.height || (r.height >> w) - _, n(
            r.type === G.type && r.format === G.format && r.internalformat === G.internalformat,
            "incompatible format for texture.subimage"
          ), n(
            b >= 0 && _ >= 0 && b + G.width <= r.width && _ + G.height <= r.height,
            "texture.subimage write out of bounds"
          ), n(
            r.mipmask & 1 << w,
            "missing mipmap data"
          ), n(
            G.data || G.element || G.needsCopy,
            "missing image data"
          ), He(r), ce(G, At + l, b, _, w), Ae(), q(G), h;
        }
        function d(l) {
          var m = l | 0;
          if (m !== r.width) {
            h.width = r.width = m, h.height = r.height = m, He(r);
            for (var i = 0; i < 6; ++i)
              for (var u = 0; r.mipmask >> u; ++u)
                e.texImage2D(
                  At + i,
                  u,
                  r.format,
                  m >> u,
                  m >> u,
                  0,
                  r.format,
                  r.type,
                  null
                );
            return Ae(), g.profile && (r.stats.size = Ot(
              r.internalformat,
              r.type,
              h.width,
              h.height,
              !1,
              !0
            )), h;
          }
        }
        return h(o, A, y, J, he, a), h.subimage = p, h.resize = d, h._reglType = "textureCube", h._texture = r, g.profile && (h.stats = r.stats), h.destroy = function() {
          r.decRef();
        }, h;
      }
      function Fe() {
        for (var o = 0; o < Xe; ++o)
          e.activeTexture(tt + o), e.bindTexture(ir, null), Ce[o] = null;
        Je(Ve).forEach(ie), E.cubeCount = 0, E.textureCount = 0;
      }
      g.profile && (E.getTotalTextureSize = function() {
        var o = 0;
        return Object.keys(Ve).forEach(function(A) {
          o += Ve[A].stats.size;
        }), o;
      });
      function or() {
        for (var o = 0; o < Xe; ++o) {
          var A = Ce[o];
          A && (A.bindCount = 0, A.unit = -1, Ce[o] = null);
        }
        Je(Ve).forEach(function(y) {
          y.texture = e.createTexture(), e.bindTexture(y.target, y.texture);
          for (var J = 0; J < 32; ++J)
            if (y.mipmask & 1 << J)
              if (y.target === ir)
                e.texImage2D(
                  ir,
                  J,
                  y.internalformat,
                  y.width >> J,
                  y.height >> J,
                  0,
                  y.internalformat,
                  y.type,
                  null
                );
              else
                for (var he = 0; he < 6; ++he)
                  e.texImage2D(
                    At + he,
                    J,
                    y.internalformat,
                    y.width >> J,
                    y.height >> J,
                    0,
                    y.internalformat,
                    y.type,
                    null
                  );
          Pe(y.texInfo, y.target);
        });
      }
      function Cr() {
        for (var o = 0; o < Xe; ++o) {
          var A = Ce[o];
          A && (A.bindCount = 0, A.unit = -1, Ce[o] = null), e.activeTexture(tt + o), e.bindTexture(ir, null), e.bindTexture(sn, null);
        }
      }
      return {
        create2D: pe,
        createCube: Ee,
        clear: Fe,
        getTexture: function(o) {
          return null;
        },
        restore: or,
        refresh: Cr
      };
    }
    var hr = 36161, Rt = 32854, ii = 32855, fi = 36194, oi = 33189, ui = 36168, si = 34041, ci = 35907, li = 34836, di = 34842, mi = 34843, ar = [];
    ar[Rt] = 2, ar[ii] = 2, ar[fi] = 2, ar[oi] = 2, ar[ui] = 1, ar[si] = 4, ar[ci] = 4, ar[li] = 16, ar[di] = 8, ar[mi] = 6;
    function hi(e, t, s) {
      return ar[e] * t * s;
    }
    var Hu = function(e, t, s, x, O) {
      var E = {
        rgba4: Rt,
        rgb565: fi,
        "rgb5 a1": ii,
        depth: oi,
        stencil: ui,
        "depth stencil": si
      };
      t.ext_srgb && (E.srgba = ci), t.ext_color_buffer_half_float && (E.rgba16f = di, E.rgb16f = mi), t.webgl_color_buffer_float && (E.rgba32f = li);
      var g = [];
      Object.keys(E).forEach(function(B) {
        var k = E[B];
        g[k] = B;
      });
      var N = 0, D = {};
      function M(B) {
        this.id = N++, this.refCount = 1, this.renderbuffer = B, this.format = Rt, this.width = 0, this.height = 0, O.profile && (this.stats = { size: 0 });
      }
      M.prototype.decRef = function() {
        --this.refCount <= 0 && V(this);
      };
      function V(B) {
        var k = B.renderbuffer;
        n(k, "must not double destroy renderbuffer"), e.bindRenderbuffer(hr, null), e.deleteRenderbuffer(k), B.renderbuffer = null, B.refCount = 0, delete D[B.id], x.renderbufferCount--;
      }
      function U(B, k) {
        var v = new M(e.createRenderbuffer());
        D[v.id] = v, x.renderbufferCount++;
        function T(K, F) {
          var Q = 0, W = 0, ae = Rt;
          if (typeof K == "object" && K) {
            var R = K;
            if ("shape" in R) {
              var L = R.shape;
              n(
                Array.isArray(L) && L.length >= 2,
                "invalid renderbuffer shape"
              ), Q = L[0] | 0, W = L[1] | 0;
            } else
              "radius" in R && (Q = W = R.radius | 0), "width" in R && (Q = R.width | 0), "height" in R && (W = R.height | 0);
            "format" in R && (n.parameter(
              R.format,
              E,
              "invalid renderbuffer format"
            ), ae = E[R.format]);
          } else
            typeof K == "number" ? (Q = K | 0, typeof F == "number" ? W = F | 0 : W = Q) : K ? n.raise("invalid arguments to renderbuffer constructor") : Q = W = 1;
          if (n(
            Q > 0 && W > 0 && Q <= s.maxRenderbufferSize && W <= s.maxRenderbufferSize,
            "invalid renderbuffer size"
          ), !(Q === v.width && W === v.height && ae === v.format))
            return T.width = v.width = Q, T.height = v.height = W, v.format = ae, e.bindRenderbuffer(hr, v.renderbuffer), e.renderbufferStorage(hr, ae, Q, W), n(
              e.getError() === 0,
              "invalid render buffer format"
            ), O.profile && (v.stats.size = hi(v.format, v.width, v.height)), T.format = g[v.format], T;
        }
        function P(K, F) {
          var Q = K | 0, W = F | 0 || Q;
          return Q === v.width && W === v.height || (n(
            Q > 0 && W > 0 && Q <= s.maxRenderbufferSize && W <= s.maxRenderbufferSize,
            "invalid renderbuffer size"
          ), T.width = v.width = Q, T.height = v.height = W, e.bindRenderbuffer(hr, v.renderbuffer), e.renderbufferStorage(hr, v.format, Q, W), n(
            e.getError() === 0,
            "invalid render buffer format"
          ), O.profile && (v.stats.size = hi(
            v.format,
            v.width,
            v.height
          ))), T;
        }
        return T(B, k), T.resize = P, T._reglType = "renderbuffer", T._renderbuffer = v, O.profile && (T.stats = v.stats), T.destroy = function() {
          v.decRef();
        }, T;
      }
      O.profile && (x.getTotalRenderbufferSize = function() {
        var B = 0;
        return Object.keys(D).forEach(function(k) {
          B += D[k].stats.size;
        }), B;
      });
      function X() {
        Je(D).forEach(function(B) {
          B.renderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(hr, B.renderbuffer), e.renderbufferStorage(hr, B.format, B.width, B.height);
        }), e.bindRenderbuffer(hr, null);
      }
      return {
        create: U,
        clear: function() {
          Je(D).forEach(V);
        },
        restore: X
      };
    }, sr = 36160, wn = 36161, Sr = 3553, Gt = 34069, vi = 36064, pi = 36096, _i = 36128, bi = 33306, yi = 36053, $u = 36054, zu = 36055, Wu = 36057, Yu = 36061, Qu = 36193, qu = 5121, Ku = 5126, Ei = 6407, xi = 6408, Zu = 6402, Ju = [
      Ei,
      xi
    ], Ln = [];
    Ln[xi] = 4, Ln[Ei] = 3;
    var Ct = [];
    Ct[qu] = 1, Ct[Ku] = 4, Ct[Qu] = 2;
    var es = 32854, rs = 32855, ts = 36194, ns = 33189, as = 36168, Ai = 34041, is = 35907, fs = 34836, os = 34842, us = 34843, ss = [
      es,
      rs,
      ts,
      is,
      os,
      us,
      fs
    ], jr = {};
    jr[yi] = "complete", jr[$u] = "incomplete attachment", jr[Wu] = "incomplete dimensions", jr[zu] = "incomplete, missing attachment", jr[Yu] = "unsupported";
    function cs(e, t, s, x, O, E) {
      var g = {
        cur: null,
        next: null,
        dirty: !1,
        setFBO: null
      }, N = ["rgba"], D = ["rgba4", "rgb565", "rgb5 a1"];
      t.ext_srgb && D.push("srgba"), t.ext_color_buffer_half_float && D.push("rgba16f", "rgb16f"), t.webgl_color_buffer_float && D.push("rgba32f");
      var M = ["uint8"];
      t.oes_texture_half_float && M.push("half float", "float16"), t.oes_texture_float && M.push("float", "float32");
      function V(I, $, z) {
        this.target = I, this.texture = $, this.renderbuffer = z;
        var ce = 0, se = 0;
        $ ? (ce = $.width, se = $.height) : z && (ce = z.width, se = z.height), this.width = ce, this.height = se;
      }
      function U(I) {
        I && (I.texture && I.texture._texture.decRef(), I.renderbuffer && I.renderbuffer._renderbuffer.decRef());
      }
      function X(I, $, z) {
        if (I)
          if (I.texture) {
            var ce = I.texture._texture, se = Math.max(1, ce.width), Y = Math.max(1, ce.height);
            n(
              se === $ && Y === z,
              "inconsistent width/height for supplied texture"
            ), ce.refCount += 1;
          } else {
            var q = I.renderbuffer._renderbuffer;
            n(
              q.width === $ && q.height === z,
              "inconsistent width/height for renderbuffer"
            ), q.refCount += 1;
          }
      }
      function B(I, $) {
        $ && ($.texture ? e.framebufferTexture2D(
          sr,
          I,
          $.target,
          $.texture._texture.texture,
          0
        ) : e.framebufferRenderbuffer(
          sr,
          I,
          wn,
          $.renderbuffer._renderbuffer.renderbuffer
        ));
      }
      function k(I) {
        var $ = Sr, z = null, ce = null, se = I;
        typeof I == "object" && (se = I.data, "target" in I && ($ = I.target | 0)), n.type(se, "function", "invalid attachment data");
        var Y = se._reglType;
        return Y === "texture2d" ? (z = se, n($ === Sr)) : Y === "textureCube" ? (z = se, n(
          $ >= Gt && $ < Gt + 6,
          "invalid cube map target"
        )) : Y === "renderbuffer" ? (ce = se, $ = wn) : n.raise("invalid regl object for attachment"), new V($, z, ce);
      }
      function v(I, $, z, ce, se) {
        if (z) {
          var Y = x.create2D({
            width: I,
            height: $,
            format: ce,
            type: se
          });
          return Y._texture.refCount = 0, new V(Sr, Y, null);
        } else {
          var q = O.create({
            width: I,
            height: $,
            format: ce
          });
          return q._renderbuffer.refCount = 0, new V(wn, null, q);
        }
      }
      function T(I) {
        return I && (I.texture || I.renderbuffer);
      }
      function P(I, $, z) {
        I && (I.texture ? I.texture.resize($, z) : I.renderbuffer && I.renderbuffer.resize($, z), I.width = $, I.height = z);
      }
      var K = 0, F = {};
      function Q() {
        this.id = K++, F[this.id] = this, this.framebuffer = e.createFramebuffer(), this.width = 0, this.height = 0, this.colorAttachments = [], this.depthAttachment = null, this.stencilAttachment = null, this.depthStencilAttachment = null;
      }
      function W(I) {
        I.colorAttachments.forEach(U), U(I.depthAttachment), U(I.stencilAttachment), U(I.depthStencilAttachment);
      }
      function ae(I) {
        var $ = I.framebuffer;
        n($, "must not double destroy framebuffer"), e.deleteFramebuffer($), I.framebuffer = null, E.framebufferCount--, delete F[I.id];
      }
      function R(I) {
        var $;
        e.bindFramebuffer(sr, I.framebuffer);
        var z = I.colorAttachments;
        for ($ = 0; $ < z.length; ++$)
          B(vi + $, z[$]);
        for ($ = z.length; $ < s.maxColorAttachments; ++$)
          e.framebufferTexture2D(
            sr,
            vi + $,
            Sr,
            null,
            0
          );
        e.framebufferTexture2D(
          sr,
          bi,
          Sr,
          null,
          0
        ), e.framebufferTexture2D(
          sr,
          pi,
          Sr,
          null,
          0
        ), e.framebufferTexture2D(
          sr,
          _i,
          Sr,
          null,
          0
        ), B(pi, I.depthAttachment), B(_i, I.stencilAttachment), B(bi, I.depthStencilAttachment);
        var ce = e.checkFramebufferStatus(sr);
        !e.isContextLost() && ce !== yi && n.raise("framebuffer configuration not supported, status = " + jr[ce]), e.bindFramebuffer(sr, g.next ? g.next.framebuffer : null), g.cur = g.next, e.getError();
      }
      function L(I, $) {
        var z = new Q();
        E.framebufferCount++;
        function ce(Y, q) {
          var fe;
          n(
            g.next !== z,
            "can not update framebuffer which is currently in use"
          );
          var le = 0, ve = 0, we = !0, Le = !0, be = null, Ie = !0, ge = "rgba", Be = "uint8", Pe = 1, ke = null, Ve = null, Xe = null, Ce = !1;
          if (typeof Y == "number")
            le = Y | 0, ve = q | 0 || le;
          else if (!Y)
            le = ve = 1;
          else {
            n.type(Y, "object", "invalid arguments for framebuffer");
            var de = Y;
            if ("shape" in de) {
              var He = de.shape;
              n(
                Array.isArray(He) && He.length >= 2,
                "invalid shape for framebuffer"
              ), le = He[0], ve = He[1];
            } else
              "radius" in de && (le = ve = de.radius), "width" in de && (le = de.width), "height" in de && (ve = de.height);
            ("color" in de || "colors" in de) && (be = de.color || de.colors, Array.isArray(be) && n(
              be.length === 1 || t.webgl_draw_buffers,
              "multiple render targets not supported"
            )), be || ("colorCount" in de && (Pe = de.colorCount | 0, n(Pe > 0, "invalid color buffer count")), "colorTexture" in de && (Ie = !!de.colorTexture, ge = "rgba4"), "colorType" in de && (Be = de.colorType, Ie ? (n(
              t.oes_texture_float || !(Be === "float" || Be === "float32"),
              "you must enable OES_texture_float in order to use floating point framebuffer objects"
            ), n(
              t.oes_texture_half_float || !(Be === "half float" || Be === "float16"),
              "you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects"
            )) : Be === "half float" || Be === "float16" ? (n(
              t.ext_color_buffer_half_float,
              "you must enable EXT_color_buffer_half_float to use 16-bit render buffers"
            ), ge = "rgba16f") : (Be === "float" || Be === "float32") && (n(
              t.webgl_color_buffer_float,
              "you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"
            ), ge = "rgba32f"), n.oneOf(Be, M, "invalid color type")), "colorFormat" in de && (ge = de.colorFormat, N.indexOf(ge) >= 0 ? Ie = !0 : D.indexOf(ge) >= 0 ? Ie = !1 : n.optional(function() {
              Ie ? n.oneOf(
                de.colorFormat,
                N,
                "invalid color format for texture"
              ) : n.oneOf(
                de.colorFormat,
                D,
                "invalid color format for renderbuffer"
              );
            }))), ("depthTexture" in de || "depthStencilTexture" in de) && (Ce = !!(de.depthTexture || de.depthStencilTexture), n(
              !Ce || t.webgl_depth_texture,
              "webgl_depth_texture extension not supported"
            )), "depth" in de && (typeof de.depth == "boolean" ? we = de.depth : (ke = de.depth, Le = !1)), "stencil" in de && (typeof de.stencil == "boolean" ? Le = de.stencil : (Ve = de.stencil, we = !1)), "depthStencil" in de && (typeof de.depthStencil == "boolean" ? we = Le = de.depthStencil : (Xe = de.depthStencil, we = !1, Le = !1));
          }
          var Ae = null, ie = null, pe = null, Ee = null;
          if (Array.isArray(be))
            Ae = be.map(k);
          else if (be)
            Ae = [k(be)];
          else
            for (Ae = new Array(Pe), fe = 0; fe < Pe; ++fe)
              Ae[fe] = v(
                le,
                ve,
                Ie,
                ge,
                Be
              );
          n(
            t.webgl_draw_buffers || Ae.length <= 1,
            "you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."
          ), n(
            Ae.length <= s.maxColorAttachments,
            "too many color attachments, not supported"
          ), le = le || Ae[0].width, ve = ve || Ae[0].height, ke ? ie = k(ke) : we && !Le && (ie = v(
            le,
            ve,
            Ce,
            "depth",
            "uint32"
          )), Ve ? pe = k(Ve) : Le && !we && (pe = v(
            le,
            ve,
            !1,
            "stencil",
            "uint8"
          )), Xe ? Ee = k(Xe) : !ke && !Ve && Le && we && (Ee = v(
            le,
            ve,
            Ce,
            "depth stencil",
            "depth stencil"
          )), n(
            !!ke + !!Ve + !!Xe <= 1,
            "invalid framebuffer configuration, can specify exactly one depth/stencil attachment"
          );
          var Fe = null;
          for (fe = 0; fe < Ae.length; ++fe)
            if (X(Ae[fe], le, ve), n(
              !Ae[fe] || Ae[fe].texture && Ju.indexOf(Ae[fe].texture._texture.format) >= 0 || Ae[fe].renderbuffer && ss.indexOf(Ae[fe].renderbuffer._renderbuffer.format) >= 0,
              "framebuffer color attachment " + fe + " is invalid"
            ), Ae[fe] && Ae[fe].texture) {
              var or = Ln[Ae[fe].texture._texture.format] * Ct[Ae[fe].texture._texture.type];
              Fe === null ? Fe = or : n(
                Fe === or,
                "all color attachments much have the same number of bits per pixel."
              );
            }
          return X(ie, le, ve), n(
            !ie || ie.texture && ie.texture._texture.format === Zu || ie.renderbuffer && ie.renderbuffer._renderbuffer.format === ns,
            "invalid depth attachment for framebuffer object"
          ), X(pe, le, ve), n(
            !pe || pe.renderbuffer && pe.renderbuffer._renderbuffer.format === as,
            "invalid stencil attachment for framebuffer object"
          ), X(Ee, le, ve), n(
            !Ee || Ee.texture && Ee.texture._texture.format === Ai || Ee.renderbuffer && Ee.renderbuffer._renderbuffer.format === Ai,
            "invalid depth-stencil attachment for framebuffer object"
          ), W(z), z.width = le, z.height = ve, z.colorAttachments = Ae, z.depthAttachment = ie, z.stencilAttachment = pe, z.depthStencilAttachment = Ee, ce.color = Ae.map(T), ce.depth = T(ie), ce.stencil = T(pe), ce.depthStencil = T(Ee), ce.width = z.width, ce.height = z.height, R(z), ce;
        }
        function se(Y, q) {
          n(
            g.next !== z,
            "can not resize a framebuffer which is currently in use"
          );
          var fe = Math.max(Y | 0, 1), le = Math.max(q | 0 || fe, 1);
          if (fe === z.width && le === z.height)
            return ce;
          for (var ve = z.colorAttachments, we = 0; we < ve.length; ++we)
            P(ve[we], fe, le);
          return P(z.depthAttachment, fe, le), P(z.stencilAttachment, fe, le), P(z.depthStencilAttachment, fe, le), z.width = ce.width = fe, z.height = ce.height = le, R(z), ce;
        }
        return ce(I, $), ye(ce, {
          resize: se,
          _reglType: "framebuffer",
          _framebuffer: z,
          destroy: function() {
            ae(z), W(z);
          },
          use: function(Y) {
            g.setFBO({
              framebuffer: ce
            }, Y);
          }
        });
      }
      function ee(I) {
        var $ = Array(6);
        function z(se) {
          var Y;
          n(
            $.indexOf(g.next) < 0,
            "can not update framebuffer which is currently in use"
          );
          var q = {
            color: null
          }, fe = 0, le = null, ve = "rgba", we = "uint8", Le = 1;
          if (typeof se == "number")
            fe = se | 0;
          else if (!se)
            fe = 1;
          else {
            n.type(se, "object", "invalid arguments for framebuffer");
            var be = se;
            if ("shape" in be) {
              var Ie = be.shape;
              n(
                Array.isArray(Ie) && Ie.length >= 2,
                "invalid shape for framebuffer"
              ), n(
                Ie[0] === Ie[1],
                "cube framebuffer must be square"
              ), fe = Ie[0];
            } else
              "radius" in be && (fe = be.radius | 0), "width" in be ? (fe = be.width | 0, "height" in be && n(be.height === fe, "must be square")) : "height" in be && (fe = be.height | 0);
            ("color" in be || "colors" in be) && (le = be.color || be.colors, Array.isArray(le) && n(
              le.length === 1 || t.webgl_draw_buffers,
              "multiple render targets not supported"
            )), le || ("colorCount" in be && (Le = be.colorCount | 0, n(Le > 0, "invalid color buffer count")), "colorType" in be && (n.oneOf(
              be.colorType,
              M,
              "invalid color type"
            ), we = be.colorType), "colorFormat" in be && (ve = be.colorFormat, n.oneOf(
              be.colorFormat,
              N,
              "invalid color format for texture"
            ))), "depth" in be && (q.depth = be.depth), "stencil" in be && (q.stencil = be.stencil), "depthStencil" in be && (q.depthStencil = be.depthStencil);
          }
          var ge;
          if (le)
            if (Array.isArray(le))
              for (ge = [], Y = 0; Y < le.length; ++Y)
                ge[Y] = le[Y];
            else
              ge = [le];
          else {
            ge = Array(Le);
            var Be = {
              radius: fe,
              format: ve,
              type: we
            };
            for (Y = 0; Y < Le; ++Y)
              ge[Y] = x.createCube(Be);
          }
          for (q.color = Array(ge.length), Y = 0; Y < ge.length; ++Y) {
            var Pe = ge[Y];
            n(
              typeof Pe == "function" && Pe._reglType === "textureCube",
              "invalid cube map"
            ), fe = fe || Pe.width, n(
              Pe.width === fe && Pe.height === fe,
              "invalid cube map shape"
            ), q.color[Y] = {
              target: Gt,
              data: ge[Y]
            };
          }
          for (Y = 0; Y < 6; ++Y) {
            for (var ke = 0; ke < ge.length; ++ke)
              q.color[ke].target = Gt + Y;
            Y > 0 && (q.depth = $[0].depth, q.stencil = $[0].stencil, q.depthStencil = $[0].depthStencil), $[Y] ? $[Y](q) : $[Y] = L(q);
          }
          return ye(z, {
            width: fe,
            height: fe,
            color: ge
          });
        }
        function ce(se) {
          var Y, q = se | 0;
          if (n(
            q > 0 && q <= s.maxCubeMapSize,
            "invalid radius for cube fbo"
          ), q === z.width)
            return z;
          var fe = z.color;
          for (Y = 0; Y < fe.length; ++Y)
            fe[Y].resize(q);
          for (Y = 0; Y < 6; ++Y)
            $[Y].resize(q);
          return z.width = z.height = q, z;
        }
        return z(I), ye(z, {
          faces: $,
          resize: ce,
          _reglType: "framebufferCube",
          destroy: function() {
            $.forEach(function(se) {
              se.destroy();
            });
          }
        });
      }
      function H() {
        g.cur = null, g.next = null, g.dirty = !0, Je(F).forEach(function(I) {
          I.framebuffer = e.createFramebuffer(), R(I);
        });
      }
      return ye(g, {
        getFramebuffer: function(I) {
          if (typeof I == "function" && I._reglType === "framebuffer") {
            var $ = I._framebuffer;
            if ($ instanceof Q)
              return $;
          }
          return null;
        },
        create: L,
        createCube: ee,
        clear: function() {
          Je(F).forEach(ae);
        },
        restore: H
      });
    }
    var ls = 5126, Ti = 34962, Ft = 34963, gi = [
      "attributes",
      "elements",
      "offset",
      "count",
      "primitive",
      "instances"
    ];
    function On() {
      this.state = 0, this.x = 0, this.y = 0, this.z = 0, this.w = 0, this.buffer = null, this.size = 0, this.normalized = !1, this.type = ls, this.offset = 0, this.stride = 0, this.divisor = 0;
    }
    function ds(e, t, s, x, O, E, g) {
      for (var N = s.maxAttributes, D = new Array(N), M = 0; M < N; ++M)
        D[M] = new On();
      var V = 0, U = {}, X = {
        Record: On,
        scope: {},
        state: D,
        currentVAO: null,
        targetVAO: null,
        restore: k() ? W : function() {
        },
        createVAO: ae,
        getVAO: T,
        destroyBuffer: B,
        setVAO: k() ? P : K,
        clear: k() ? F : function() {
        }
      };
      function B(R) {
        for (var L = 0; L < D.length; ++L) {
          var ee = D[L];
          ee.buffer === R && (e.disableVertexAttribArray(L), ee.buffer = null);
        }
      }
      function k() {
        return t.oes_vertex_array_object;
      }
      function v() {
        return t.angle_instanced_arrays;
      }
      function T(R) {
        return typeof R == "function" && R._vao ? R._vao : null;
      }
      function P(R) {
        if (R !== X.currentVAO) {
          var L = k();
          R ? L.bindVertexArrayOES(R.vao) : L.bindVertexArrayOES(null), X.currentVAO = R;
        }
      }
      function K(R) {
        if (R !== X.currentVAO) {
          if (R)
            R.bindAttrs();
          else {
            for (var L = v(), ee = 0; ee < D.length; ++ee) {
              var H = D[ee];
              H.buffer ? (e.enableVertexAttribArray(ee), H.buffer.bind(), e.vertexAttribPointer(ee, H.size, H.type, H.normalized, H.stride, H.offfset), L && H.divisor && L.vertexAttribDivisorANGLE(ee, H.divisor)) : (e.disableVertexAttribArray(ee), e.vertexAttrib4f(ee, H.x, H.y, H.z, H.w));
            }
            g.elements ? e.bindBuffer(Ft, g.elements.buffer.buffer) : e.bindBuffer(Ft, null);
          }
          X.currentVAO = R;
        }
      }
      function F() {
        Je(U).forEach(function(R) {
          R.destroy();
        });
      }
      function Q() {
        this.id = ++V, this.attributes = [], this.elements = null, this.ownsElements = !1, this.count = 0, this.offset = 0, this.instances = -1, this.primitive = 4;
        var R = k();
        R ? this.vao = R.createVertexArrayOES() : this.vao = null, U[this.id] = this, this.buffers = [];
      }
      Q.prototype.bindAttrs = function() {
        for (var R = v(), L = this.attributes, ee = 0; ee < L.length; ++ee) {
          var H = L[ee];
          H.buffer ? (e.enableVertexAttribArray(ee), e.bindBuffer(Ti, H.buffer.buffer), e.vertexAttribPointer(ee, H.size, H.type, H.normalized, H.stride, H.offset), R && H.divisor && R.vertexAttribDivisorANGLE(ee, H.divisor)) : (e.disableVertexAttribArray(ee), e.vertexAttrib4f(ee, H.x, H.y, H.z, H.w));
        }
        for (var I = L.length; I < N; ++I)
          e.disableVertexAttribArray(I);
        var $ = E.getElements(this.elements);
        $ ? e.bindBuffer(Ft, $.buffer.buffer) : e.bindBuffer(Ft, null);
      }, Q.prototype.refresh = function() {
        var R = k();
        R && (R.bindVertexArrayOES(this.vao), this.bindAttrs(), X.currentVAO = null, R.bindVertexArrayOES(null));
      }, Q.prototype.destroy = function() {
        if (this.vao) {
          var R = k();
          this === X.currentVAO && (X.currentVAO = null, R.bindVertexArrayOES(null)), R.deleteVertexArrayOES(this.vao), this.vao = null;
        }
        this.ownsElements && (this.elements.destroy(), this.elements = null, this.ownsElements = !1), U[this.id] && (delete U[this.id], x.vaoCount -= 1);
      };
      function W() {
        var R = k();
        R && Je(U).forEach(function(L) {
          L.refresh();
        });
      }
      function ae(R) {
        var L = new Q();
        x.vaoCount += 1;
        function ee(H) {
          var I;
          if (Array.isArray(H))
            I = H, L.elements && L.ownsElements && L.elements.destroy(), L.elements = null, L.ownsElements = !1, L.offset = 0, L.count = 0, L.instances = -1, L.primitive = 4;
          else {
            if (n(typeof H == "object", "invalid arguments for create vao"), n("attributes" in H, "must specify attributes for vao"), H.elements) {
              var $ = H.elements;
              L.ownsElements ? typeof $ == "function" && $._reglType === "elements" ? (L.elements.destroy(), L.ownsElements = !1) : (L.elements($), L.ownsElements = !1) : E.getElements(H.elements) ? (L.elements = H.elements, L.ownsElements = !1) : (L.elements = E.create(H.elements), L.ownsElements = !0);
            } else
              L.elements = null, L.ownsElements = !1;
            I = H.attributes, L.offset = 0, L.count = -1, L.instances = -1, L.primitive = 4, L.elements && (L.count = L.elements._elements.vertCount, L.primitive = L.elements._elements.primType), "offset" in H && (L.offset = H.offset | 0), "count" in H && (L.count = H.count | 0), "instances" in H && (L.instances = H.instances | 0), "primitive" in H && (n(H.primitive in mr, "bad primitive type: " + H.primitive), L.primitive = mr[H.primitive]), n.optional(() => {
              for (var we = Object.keys(H), Le = 0; Le < we.length; ++Le)
                n(gi.indexOf(we[Le]) >= 0, 'invalid option for vao: "' + we[Le] + '" valid options are ' + gi);
            }), n(Array.isArray(I), "attributes must be an array");
          }
          n(I.length < N, "too many attributes"), n(I.length > 0, "must specify at least one attribute");
          var z = {}, ce = L.attributes;
          ce.length = I.length;
          for (var se = 0; se < I.length; ++se) {
            var Y = I[se], q = ce[se] = new On(), fe = Y.data || Y;
            if (Array.isArray(fe) || _e(fe) || nr(fe)) {
              var le;
              L.buffers[se] && (le = L.buffers[se], _e(fe) && le._buffer.byteLength >= fe.byteLength ? le.subdata(fe) : (le.destroy(), L.buffers[se] = null)), L.buffers[se] || (le = L.buffers[se] = O.create(Y, Ti, !1, !0)), q.buffer = O.getBuffer(le), q.size = q.buffer.dimension | 0, q.normalized = !1, q.type = q.buffer.dtype, q.offset = 0, q.stride = 0, q.divisor = 0, q.state = 1, z[se] = 1;
            } else
              O.getBuffer(Y) ? (q.buffer = O.getBuffer(Y), q.size = q.buffer.dimension | 0, q.normalized = !1, q.type = q.buffer.dtype, q.offset = 0, q.stride = 0, q.divisor = 0, q.state = 1) : O.getBuffer(Y.buffer) ? (q.buffer = O.getBuffer(Y.buffer), q.size = (+Y.size || q.buffer.dimension) | 0, q.normalized = !!Y.normalized || !1, "type" in Y ? (n.parameter(Y.type, xr, "invalid buffer type"), q.type = xr[Y.type]) : q.type = q.buffer.dtype, q.offset = (Y.offset || 0) | 0, q.stride = (Y.stride || 0) | 0, q.divisor = (Y.divisor || 0) | 0, q.state = 1, n(q.size >= 1 && q.size <= 4, "size must be between 1 and 4"), n(q.offset >= 0, "invalid offset"), n(q.stride >= 0 && q.stride <= 255, "stride must be between 0 and 255"), n(q.divisor >= 0, "divisor must be positive"), n(!q.divisor || !!t.angle_instanced_arrays, "ANGLE_instanced_arrays must be enabled to use divisor")) : "x" in Y ? (n(se > 0, "first attribute must not be a constant"), q.x = +Y.x || 0, q.y = +Y.y || 0, q.z = +Y.z || 0, q.w = +Y.w || 0, q.state = 2) : n(!1, "invalid attribute spec for location " + se);
          }
          for (var ve = 0; ve < L.buffers.length; ++ve)
            !z[ve] && L.buffers[ve] && (L.buffers[ve].destroy(), L.buffers[ve] = null);
          return L.refresh(), ee;
        }
        return ee.destroy = function() {
          for (var H = 0; H < L.buffers.length; ++H)
            L.buffers[H] && L.buffers[H].destroy();
          L.buffers.length = 0, L.ownsElements && (L.elements.destroy(), L.elements = null, L.ownsElements = !1), L.destroy();
        }, ee._vao = L, ee._reglType = "vao", ee(R);
      }
      return X;
    }
    var Si = 35632, ms = 35633, hs = 35718, vs = 35721;
    function ps(e, t, s, x) {
      var O = {}, E = {};
      function g(v, T, P, K) {
        this.name = v, this.id = T, this.location = P, this.info = K;
      }
      function N(v, T) {
        for (var P = 0; P < v.length; ++P)
          if (v[P].id === T.id) {
            v[P].location = T.location;
            return;
          }
        v.push(T);
      }
      function D(v, T, P) {
        var K = v === Si ? O : E, F = K[T];
        if (!F) {
          var Q = t.str(T);
          F = e.createShader(v), e.shaderSource(F, Q), e.compileShader(F), n.shaderError(e, F, Q, v, P), K[T] = F;
        }
        return F;
      }
      var M = {}, V = [], U = 0;
      function X(v, T) {
        this.id = U++, this.fragId = v, this.vertId = T, this.program = null, this.uniforms = [], this.attributes = [], this.refCount = 1, x.profile && (this.stats = {
          uniformsCount: 0,
          attributesCount: 0
        });
      }
      function B(v, T, P) {
        var K, F, Q = D(Si, v.fragId), W = D(ms, v.vertId), ae = v.program = e.createProgram();
        if (e.attachShader(ae, Q), e.attachShader(ae, W), P)
          for (K = 0; K < P.length; ++K) {
            var R = P[K];
            e.bindAttribLocation(ae, R[0], R[1]);
          }
        e.linkProgram(ae), n.linkError(
          e,
          ae,
          t.str(v.fragId),
          t.str(v.vertId),
          T
        );
        var L = e.getProgramParameter(ae, hs);
        x.profile && (v.stats.uniformsCount = L);
        var ee = v.uniforms;
        for (K = 0; K < L; ++K)
          if (F = e.getActiveUniform(ae, K), F) {
            if (F.size > 1)
              for (var H = 0; H < F.size; ++H) {
                var I = F.name.replace("[0]", "[" + H + "]");
                N(ee, new g(
                  I,
                  t.id(I),
                  e.getUniformLocation(ae, I),
                  F
                ));
              }
            var $ = F.name;
            F.size > 1 && ($ = $.replace("[0]", "")), N(ee, new g(
              $,
              t.id($),
              e.getUniformLocation(ae, $),
              F
            ));
          }
        var z = e.getProgramParameter(ae, vs);
        x.profile && (v.stats.attributesCount = z);
        var ce = v.attributes;
        for (K = 0; K < z; ++K)
          F = e.getActiveAttrib(ae, K), F && N(ce, new g(
            F.name,
            t.id(F.name),
            e.getAttribLocation(ae, F.name),
            F
          ));
      }
      x.profile && (s.getMaxUniformsCount = function() {
        var v = 0;
        return V.forEach(function(T) {
          T.stats.uniformsCount > v && (v = T.stats.uniformsCount);
        }), v;
      }, s.getMaxAttributesCount = function() {
        var v = 0;
        return V.forEach(function(T) {
          T.stats.attributesCount > v && (v = T.stats.attributesCount);
        }), v;
      });
      function k() {
        O = {}, E = {};
        for (var v = 0; v < V.length; ++v)
          B(V[v], null, V[v].attributes.map(function(T) {
            return [T.location, T.name];
          }));
      }
      return {
        clear: function() {
          var v = e.deleteShader.bind(e);
          Je(O).forEach(v), O = {}, Je(E).forEach(v), E = {}, V.forEach(function(T) {
            e.deleteProgram(T.program);
          }), V.length = 0, M = {}, s.shaderCount = 0;
        },
        program: function(v, T, P, K) {
          n.command(v >= 0, "missing vertex shader", P), n.command(T >= 0, "missing fragment shader", P);
          var F = M[T];
          F || (F = M[T] = {});
          var Q = F[v];
          if (Q && (Q.refCount++, !K))
            return Q;
          var W = new X(T, v);
          return s.shaderCount++, B(W, P, K), Q || (F[v] = W), V.push(W), ye(W, {
            destroy: function() {
              if (W.refCount--, W.refCount <= 0) {
                e.deleteProgram(W.program);
                var ae = V.indexOf(W);
                V.splice(ae, 1), s.shaderCount--;
              }
              F[W.vertId].refCount <= 0 && (e.deleteShader(E[W.vertId]), delete E[W.vertId], delete M[W.fragId][W.vertId]), Object.keys(M[W.fragId]).length || (e.deleteShader(O[W.fragId]), delete O[W.fragId], delete M[W.fragId]);
            }
          });
        },
        restore: k,
        shader: D,
        frag: -1,
        vert: -1
      };
    }
    var _s = 6408, nt = 5121, bs = 3333, Dt = 5126;
    function ys(e, t, s, x, O, E, g) {
      function N(V) {
        var U;
        t.next === null ? (n(
          O.preserveDrawingBuffer,
          'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'
        ), U = nt) : (n(
          t.next.colorAttachments[0].texture !== null,
          "You cannot read from a renderbuffer"
        ), U = t.next.colorAttachments[0].texture._texture.type, n.optional(function() {
          E.oes_texture_float ? (n(
            U === nt || U === Dt,
            "Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"
          ), U === Dt && n(g.readFloat, "Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float")) : n(
            U === nt,
            "Reading from a framebuffer is only allowed for the type 'uint8'"
          );
        }));
        var X = 0, B = 0, k = x.framebufferWidth, v = x.framebufferHeight, T = null;
        _e(V) ? T = V : V && (n.type(V, "object", "invalid arguments to regl.read()"), X = V.x | 0, B = V.y | 0, n(
          X >= 0 && X < x.framebufferWidth,
          "invalid x offset for regl.read"
        ), n(
          B >= 0 && B < x.framebufferHeight,
          "invalid y offset for regl.read"
        ), k = (V.width || x.framebufferWidth - X) | 0, v = (V.height || x.framebufferHeight - B) | 0, T = V.data || null), T && (U === nt ? n(
          T instanceof Uint8Array,
          "buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"
        ) : U === Dt && n(
          T instanceof Float32Array,
          "buffer must be 'Float32Array' when reading from a framebuffer of type 'float'"
        )), n(
          k > 0 && k + X <= x.framebufferWidth,
          "invalid width for read pixels"
        ), n(
          v > 0 && v + B <= x.framebufferHeight,
          "invalid height for read pixels"
        ), s();
        var P = k * v * 4;
        return T || (U === nt ? T = new Uint8Array(P) : U === Dt && (T = T || new Float32Array(P))), n.isTypedArray(T, "data buffer for regl.read() must be a typedarray"), n(T.byteLength >= P, "data buffer for regl.read() too small"), e.pixelStorei(bs, 4), e.readPixels(
          X,
          B,
          k,
          v,
          _s,
          U,
          T
        ), T;
      }
      function D(V) {
        var U;
        return t.setFBO({
          framebuffer: V.framebuffer
        }, function() {
          U = N(V);
        }), U;
      }
      function M(V) {
        return !V || !("framebuffer" in V) ? N(V) : D(V);
      }
      return M;
    }
    function Xr(e) {
      return Array.prototype.slice.call(e);
    }
    function Hr(e) {
      return Xr(e).join("");
    }
    function Es() {
      var e = 0, t = [], s = [];
      function x(U) {
        for (var X = 0; X < s.length; ++X)
          if (s[X] === U)
            return t[X];
        var B = "g" + e++;
        return t.push(B), s.push(U), B;
      }
      function O() {
        var U = [];
        function X() {
          U.push.apply(U, Xr(arguments));
        }
        var B = [];
        function k() {
          var v = "v" + e++;
          return B.push(v), arguments.length > 0 && (U.push(v, "="), U.push.apply(U, Xr(arguments)), U.push(";")), v;
        }
        return ye(X, {
          def: k,
          toString: function() {
            return Hr([
              B.length > 0 ? "var " + B.join(",") + ";" : "",
              Hr(U)
            ]);
          }
        });
      }
      function E() {
        var U = O(), X = O(), B = U.toString, k = X.toString;
        function v(T, P) {
          X(T, P, "=", U.def(T, P), ";");
        }
        return ye(function() {
          U.apply(U, Xr(arguments));
        }, {
          def: U.def,
          entry: U,
          exit: X,
          save: v,
          set: function(T, P, K) {
            v(T, P), U(T, P, "=", K, ";");
          },
          toString: function() {
            return B() + k();
          }
        });
      }
      function g() {
        var U = Hr(arguments), X = E(), B = E(), k = X.toString, v = B.toString;
        return ye(X, {
          then: function() {
            return X.apply(X, Xr(arguments)), this;
          },
          else: function() {
            return B.apply(B, Xr(arguments)), this;
          },
          toString: function() {
            var T = v();
            return T && (T = "else{" + T + "}"), Hr([
              "if(",
              U,
              "){",
              k(),
              "}",
              T
            ]);
          }
        });
      }
      var N = O(), D = {};
      function M(U, X) {
        var B = [];
        function k() {
          var F = "a" + B.length;
          return B.push(F), F;
        }
        X = X || 0;
        for (var v = 0; v < X; ++v)
          k();
        var T = E(), P = T.toString, K = D[U] = ye(T, {
          arg: k,
          toString: function() {
            return Hr([
              "function(",
              B.join(),
              "){",
              P(),
              "}"
            ]);
          }
        });
        return K;
      }
      function V() {
        var U = [
          '"use strict";',
          N,
          "return {"
        ];
        Object.keys(D).forEach(function(k) {
          U.push('"', k, '":', D[k].toString(), ",");
        }), U.push("}");
        var X = Hr(U).replace(/;/g, `;
`).replace(/}/g, `}
`).replace(/{/g, `{
`), B = Function.apply(null, t.concat(X));
        return B.apply(null, s);
      }
      return {
        global: N,
        link: x,
        block: O,
        proc: M,
        scope: E,
        cond: g,
        compile: V
      };
    }
    var $r = "xyzw".split(""), wi = 5121, zr = 1, Rn = 2, Gn = 0, Cn = 1, Fn = 2, Dn = 3, Nt = 4, Li = 5, Oi = 6, Ri = "dither", Gi = "blend.enable", Ci = "blend.color", Nn = "blend.equation", Bn = "blend.func", Fi = "depth.enable", Di = "depth.func", Ni = "depth.range", Bi = "depth.mask", In = "colorMask", Ii = "cull.enable", Pi = "cull.face", Pn = "frontFace", kn = "lineWidth", ki = "polygonOffset.enable", Mn = "polygonOffset.offset", Mi = "sample.alpha", Ui = "sample.enable", Un = "sample.coverage", Vi = "stencil.enable", ji = "stencil.mask", Vn = "stencil.func", jn = "stencil.opFront", at = "stencil.opBack", Xi = "scissor.enable", Bt = "scissor.box", cr = "viewport", it = "profile", wr = "framebuffer", ft = "vert", ot = "frag", Lr = "elements", Or = "primitive", Rr = "count", It = "offset", Pt = "instances", ut = "vao", Xn = "Width", Hn = "Height", Wr = wr + Xn, Yr = wr + Hn, xs = cr + Xn, As = cr + Hn, Hi = "drawingBuffer", $i = Hi + Xn, zi = Hi + Hn, Ts = [
      Bn,
      Nn,
      Vn,
      jn,
      at,
      Un,
      cr,
      Bt,
      Mn
    ], Qr = 34962, $n = 34963, gs = 35632, Ss = 35633, Wi = 3553, ws = 34067, Ls = 2884, Os = 3042, Rs = 3024, Gs = 2960, Cs = 2929, Fs = 3089, Ds = 32823, Ns = 32926, Bs = 32928, zn = 5126, kt = 35664, Mt = 35665, Ut = 35666, Wn = 5124, Vt = 35667, jt = 35668, Xt = 35669, Yn = 35670, Ht = 35671, $t = 35672, zt = 35673, st = 35674, ct = 35675, lt = 35676, dt = 35678, mt = 35680, Qn = 4, ht = 1028, Gr = 1029, Yi = 2304, qn = 2305, Is = 32775, Ps = 32776, ks = 519, vr = 7680, Qi = 0, qi = 1, Ki = 32774, Ms = 513, Zi = 36160, Us = 36064, fr = {
      0: 0,
      1: 1,
      zero: 0,
      one: 1,
      "src color": 768,
      "one minus src color": 769,
      "src alpha": 770,
      "one minus src alpha": 771,
      "dst color": 774,
      "one minus dst color": 775,
      "dst alpha": 772,
      "one minus dst alpha": 773,
      "constant color": 32769,
      "one minus constant color": 32770,
      "constant alpha": 32771,
      "one minus constant alpha": 32772,
      "src alpha saturate": 776
    }, Ji = [
      "constant color, constant alpha",
      "one minus constant color, constant alpha",
      "constant color, one minus constant alpha",
      "one minus constant color, one minus constant alpha",
      "constant alpha, constant color",
      "constant alpha, one minus constant color",
      "one minus constant alpha, constant color",
      "one minus constant alpha, one minus constant color"
    ], qr = {
      never: 512,
      less: 513,
      "<": 513,
      equal: 514,
      "=": 514,
      "==": 514,
      "===": 514,
      lequal: 515,
      "<=": 515,
      greater: 516,
      ">": 516,
      notequal: 517,
      "!=": 517,
      "!==": 517,
      gequal: 518,
      ">=": 518,
      always: 519
    }, pr = {
      0: 0,
      zero: 0,
      keep: 7680,
      replace: 7681,
      increment: 7682,
      decrement: 7683,
      "increment wrap": 34055,
      "decrement wrap": 34056,
      invert: 5386
    }, ef = {
      frag: gs,
      vert: Ss
    }, Kn = {
      cw: Yi,
      ccw: qn
    };
    function Wt(e) {
      return Array.isArray(e) || _e(e) || nr(e);
    }
    function rf(e) {
      return e.sort(function(t, s) {
        return t === cr ? -1 : s === cr ? 1 : t < s ? -1 : 1;
      });
    }
    function Me(e, t, s, x) {
      this.thisDep = e, this.contextDep = t, this.propDep = s, this.append = x;
    }
    function _r(e) {
      return e && !(e.thisDep || e.contextDep || e.propDep);
    }
    function Ne(e) {
      return new Me(!1, !1, !1, e);
    }
    function Ye(e, t) {
      var s = e.type;
      if (s === Gn) {
        var x = e.data.length;
        return new Me(
          !0,
          x >= 1,
          x >= 2,
          t
        );
      } else if (s === Nt) {
        var O = e.data;
        return new Me(
          O.thisDep,
          O.contextDep,
          O.propDep,
          t
        );
      } else {
        if (s === Li)
          return new Me(
            !1,
            !1,
            !1,
            t
          );
        if (s === Oi) {
          for (var E = !1, g = !1, N = !1, D = 0; D < e.data.length; ++D) {
            var M = e.data[D];
            if (M.type === Cn)
              N = !0;
            else if (M.type === Fn)
              g = !0;
            else if (M.type === Dn)
              E = !0;
            else if (M.type === Gn) {
              E = !0;
              var V = M.data;
              V >= 1 && (g = !0), V >= 2 && (N = !0);
            } else
              M.type === Nt && (E = E || M.data.thisDep, g = g || M.data.contextDep, N = N || M.data.propDep);
          }
          return new Me(
            E,
            g,
            N,
            t
          );
        } else
          return new Me(
            s === Dn,
            s === Fn,
            s === Cn,
            t
          );
      }
    }
    var tf = new Me(!1, !1, !1, function() {
    });
    function Vs(e, t, s, x, O, E, g, N, D, M, V, U, X, B, k) {
      var v = M.Record, T = {
        add: 32774,
        subtract: 32778,
        "reverse subtract": 32779
      };
      s.ext_blend_minmax && (T.min = Is, T.max = Ps);
      var P = s.angle_instanced_arrays, K = s.webgl_draw_buffers, F = s.oes_vertex_array_object, Q = {
        dirty: !0,
        profile: k.profile
      }, W = {}, ae = [], R = {}, L = {};
      function ee(a) {
        return a.replace(".", "_");
      }
      function H(a, r, c) {
        var h = ee(a);
        ae.push(a), W[h] = Q[h] = !!c, R[h] = r;
      }
      function I(a, r, c) {
        var h = ee(a);
        ae.push(a), Array.isArray(c) ? (Q[h] = c.slice(), W[h] = c.slice()) : Q[h] = W[h] = c, L[h] = r;
      }
      H(Ri, Rs), H(Gi, Os), I(Ci, "blendColor", [0, 0, 0, 0]), I(
        Nn,
        "blendEquationSeparate",
        [Ki, Ki]
      ), I(
        Bn,
        "blendFuncSeparate",
        [qi, Qi, qi, Qi]
      ), H(Fi, Cs, !0), I(Di, "depthFunc", Ms), I(Ni, "depthRange", [0, 1]), I(Bi, "depthMask", !0), I(In, In, [!0, !0, !0, !0]), H(Ii, Ls), I(Pi, "cullFace", Gr), I(Pn, Pn, qn), I(kn, kn, 1), H(ki, Ds), I(Mn, "polygonOffset", [0, 0]), H(Mi, Ns), H(Ui, Bs), I(Un, "sampleCoverage", [1, !1]), H(Vi, Gs), I(ji, "stencilMask", -1), I(Vn, "stencilFunc", [ks, 0, -1]), I(
        jn,
        "stencilOpSeparate",
        [ht, vr, vr, vr]
      ), I(
        at,
        "stencilOpSeparate",
        [Gr, vr, vr, vr]
      ), H(Xi, Fs), I(
        Bt,
        "scissor",
        [0, 0, e.drawingBufferWidth, e.drawingBufferHeight]
      ), I(
        cr,
        cr,
        [0, 0, e.drawingBufferWidth, e.drawingBufferHeight]
      );
      var $ = {
        gl: e,
        context: X,
        strings: t,
        next: W,
        current: Q,
        draw: U,
        elements: E,
        buffer: O,
        shader: V,
        attributes: M.state,
        vao: M,
        uniforms: D,
        framebuffer: N,
        extensions: s,
        timer: B,
        isBufferArgs: Wt
      }, z = {
        primTypes: mr,
        compareFuncs: qr,
        blendFuncs: fr,
        blendEquations: T,
        stencilOps: pr,
        glTypes: xr,
        orientationType: Kn
      };
      n.optional(function() {
        $.isArrayLike = Se;
      }), K && (z.backBuffer = [Gr], z.drawBuffer = Ze(x.maxDrawbuffers, function(a) {
        return a === 0 ? [0] : Ze(a, function(r) {
          return Us + r;
        });
      }));
      var ce = 0;
      function se() {
        var a = Es(), r = a.link, c = a.global;
        a.id = ce++, a.batchId = "0";
        var h = r($), p = a.shared = {
          props: "a0"
        };
        Object.keys($).forEach(function(u) {
          p[u] = c.def(h, ".", u);
        }), n.optional(function() {
          a.CHECK = r(n), a.commandStr = n.guessCommand(), a.command = r(a.commandStr), a.assert = function(u, f, b) {
            u(
              "if(!(",
              f,
              "))",
              this.CHECK,
              ".commandRaise(",
              r(b),
              ",",
              this.command,
              ");"
            );
          }, z.invalidBlendCombinations = Ji;
        });
        var d = a.next = {}, l = a.current = {};
        Object.keys(L).forEach(function(u) {
          Array.isArray(Q[u]) && (d[u] = c.def(p.next, ".", u), l[u] = c.def(p.current, ".", u));
        });
        var m = a.constants = {};
        Object.keys(z).forEach(function(u) {
          m[u] = c.def(JSON.stringify(z[u]));
        }), a.invoke = function(u, f) {
          switch (f.type) {
            case Gn:
              var b = [
                "this",
                p.context,
                p.props,
                a.batchId
              ];
              return u.def(
                r(f.data),
                ".call(",
                b.slice(0, Math.max(f.data.length + 1, 4)),
                ")"
              );
            case Cn:
              return u.def(p.props, f.data);
            case Fn:
              return u.def(p.context, f.data);
            case Dn:
              return u.def("this", f.data);
            case Nt:
              return f.data.append(a, u), f.data.ref;
            case Li:
              return f.data.toString();
            case Oi:
              return f.data.map(function(_) {
                return a.invoke(u, _);
              });
          }
        }, a.attribCache = {};
        var i = {};
        return a.scopeAttrib = function(u) {
          var f = t.id(u);
          if (f in i)
            return i[f];
          var b = M.scope[f];
          b || (b = M.scope[f] = new v());
          var _ = i[f] = r(b);
          return _;
        }, a;
      }
      function Y(a) {
        var r = a.static, c = a.dynamic, h;
        if (it in r) {
          var p = !!r[it];
          h = Ne(function(l, m) {
            return p;
          }), h.enable = p;
        } else if (it in c) {
          var d = c[it];
          h = Ye(d, function(l, m) {
            return l.invoke(m, d);
          });
        }
        return h;
      }
      function q(a, r) {
        var c = a.static, h = a.dynamic;
        if (wr in c) {
          var p = c[wr];
          return p ? (p = N.getFramebuffer(p), n.command(p, "invalid framebuffer object"), Ne(function(l, m) {
            var i = l.link(p), u = l.shared;
            m.set(
              u.framebuffer,
              ".next",
              i
            );
            var f = u.context;
            return m.set(
              f,
              "." + Wr,
              i + ".width"
            ), m.set(
              f,
              "." + Yr,
              i + ".height"
            ), i;
          })) : Ne(function(l, m) {
            var i = l.shared;
            m.set(
              i.framebuffer,
              ".next",
              "null"
            );
            var u = i.context;
            return m.set(
              u,
              "." + Wr,
              u + "." + $i
            ), m.set(
              u,
              "." + Yr,
              u + "." + zi
            ), "null";
          });
        } else if (wr in h) {
          var d = h[wr];
          return Ye(d, function(l, m) {
            var i = l.invoke(m, d), u = l.shared, f = u.framebuffer, b = m.def(
              f,
              ".getFramebuffer(",
              i,
              ")"
            );
            n.optional(function() {
              l.assert(
                m,
                "!" + i + "||" + b,
                "invalid framebuffer object"
              );
            }), m.set(
              f,
              ".next",
              b
            );
            var _ = u.context;
            return m.set(
              _,
              "." + Wr,
              b + "?" + b + ".width:" + _ + "." + $i
            ), m.set(
              _,
              "." + Yr,
              b + "?" + b + ".height:" + _ + "." + zi
            ), b;
          });
        } else
          return null;
      }
      function fe(a, r, c) {
        var h = a.static, p = a.dynamic;
        function d(i) {
          if (i in h) {
            var u = h[i];
            n.commandType(u, "object", "invalid " + i, c.commandStr);
            var f = !0, b = u.x | 0, _ = u.y | 0, w, G;
            return "width" in u ? (w = u.width | 0, n.command(w >= 0, "invalid " + i, c.commandStr)) : f = !1, "height" in u ? (G = u.height | 0, n.command(G >= 0, "invalid " + i, c.commandStr)) : f = !1, new Me(
              !f && r && r.thisDep,
              !f && r && r.contextDep,
              !f && r && r.propDep,
              function(ne, Z) {
                var C = ne.shared.context, S = w;
                "width" in u || (S = Z.def(C, ".", Wr, "-", b));
                var te = G;
                return "height" in u || (te = Z.def(C, ".", Yr, "-", _)), [b, _, S, te];
              }
            );
          } else if (i in p) {
            var j = p[i], ue = Ye(j, function(ne, Z) {
              var C = ne.invoke(Z, j);
              n.optional(function() {
                ne.assert(
                  Z,
                  C + "&&typeof " + C + '==="object"',
                  "invalid " + i
                );
              });
              var S = ne.shared.context, te = Z.def(C, ".x|0"), re = Z.def(C, ".y|0"), oe = Z.def(
                '"width" in ',
                C,
                "?",
                C,
                ".width|0:",
                "(",
                S,
                ".",
                Wr,
                "-",
                te,
                ")"
              ), Te = Z.def(
                '"height" in ',
                C,
                "?",
                C,
                ".height|0:",
                "(",
                S,
                ".",
                Yr,
                "-",
                re,
                ")"
              );
              return n.optional(function() {
                ne.assert(
                  Z,
                  oe + ">=0&&" + Te + ">=0",
                  "invalid " + i
                );
              }), [te, re, oe, Te];
            });
            return r && (ue.thisDep = ue.thisDep || r.thisDep, ue.contextDep = ue.contextDep || r.contextDep, ue.propDep = ue.propDep || r.propDep), ue;
          } else
            return r ? new Me(
              r.thisDep,
              r.contextDep,
              r.propDep,
              function(ne, Z) {
                var C = ne.shared.context;
                return [
                  0,
                  0,
                  Z.def(C, ".", Wr),
                  Z.def(C, ".", Yr)
                ];
              }
            ) : null;
        }
        var l = d(cr);
        if (l) {
          var m = l;
          l = new Me(
            l.thisDep,
            l.contextDep,
            l.propDep,
            function(i, u) {
              var f = m.append(i, u), b = i.shared.context;
              return u.set(
                b,
                "." + xs,
                f[2]
              ), u.set(
                b,
                "." + As,
                f[3]
              ), f;
            }
          );
        }
        return {
          viewport: l,
          scissor_box: d(Bt)
        };
      }
      function le(a, r) {
        var c = a.static, h = typeof c[ot] == "string" && typeof c[ft] == "string";
        if (h) {
          if (Object.keys(r.dynamic).length > 0)
            return null;
          var p = r.static, d = Object.keys(p);
          if (d.length > 0 && typeof p[d[0]] == "number") {
            for (var l = [], m = 0; m < d.length; ++m)
              n(typeof p[d[m]] == "number", "must specify all vertex attribute locations when using vaos"), l.push([p[d[m]] | 0, d[m]]);
            return l;
          }
        }
        return null;
      }
      function ve(a, r, c) {
        var h = a.static, p = a.dynamic;
        function d(f) {
          if (f in h) {
            var b = t.id(h[f]);
            n.optional(function() {
              V.shader(ef[f], b, n.guessCommand());
            });
            var _ = Ne(function() {
              return b;
            });
            return _.id = b, _;
          } else if (f in p) {
            var w = p[f];
            return Ye(w, function(G, j) {
              var ue = G.invoke(j, w), ne = j.def(G.shared.strings, ".id(", ue, ")");
              return n.optional(function() {
                j(
                  G.shared.shader,
                  ".shader(",
                  ef[f],
                  ",",
                  ne,
                  ",",
                  G.command,
                  ");"
                );
              }), ne;
            });
          }
          return null;
        }
        var l = d(ot), m = d(ft), i = null, u;
        return _r(l) && _r(m) ? (i = V.program(m.id, l.id, null, c), u = Ne(function(f, b) {
          return f.link(i);
        })) : u = new Me(
          l && l.thisDep || m && m.thisDep,
          l && l.contextDep || m && m.contextDep,
          l && l.propDep || m && m.propDep,
          function(f, b) {
            var _ = f.shared.shader, w;
            l ? w = l.append(f, b) : w = b.def(_, ".", ot);
            var G;
            m ? G = m.append(f, b) : G = b.def(_, ".", ft);
            var j = _ + ".program(" + G + "," + w;
            return n.optional(function() {
              j += "," + f.command;
            }), b.def(j + ")");
          }
        ), {
          frag: l,
          vert: m,
          progVar: u,
          program: i
        };
      }
      function we(a, r) {
        var c = a.static, h = a.dynamic, p = {}, d = !1;
        function l() {
          if (ut in c) {
            var Z = c[ut];
            return Z !== null && M.getVAO(Z) === null && (Z = M.createVAO(Z)), d = !0, p.vao = Z, Ne(function(S) {
              var te = M.getVAO(Z);
              return te ? S.link(te) : "null";
            });
          } else if (ut in h) {
            d = !0;
            var C = h[ut];
            return Ye(C, function(S, te) {
              var re = S.invoke(te, C);
              return te.def(S.shared.vao + ".getVAO(" + re + ")");
            });
          }
          return null;
        }
        var m = l(), i = !1;
        function u() {
          if (Lr in c) {
            var Z = c[Lr];
            if (p.elements = Z, Wt(Z)) {
              var C = p.elements = E.create(Z, !0);
              Z = E.getElements(C), i = !0;
            } else
              Z && (Z = E.getElements(Z), i = !0, n.command(Z, "invalid elements", r.commandStr));
            var S = Ne(function(re, oe) {
              if (Z) {
                var Te = re.link(Z);
                return re.ELEMENTS = Te, Te;
              }
              return re.ELEMENTS = null, null;
            });
            return S.value = Z, S;
          } else if (Lr in h) {
            i = !0;
            var te = h[Lr];
            return Ye(te, function(re, oe) {
              var Te = re.shared, $e = Te.isBufferArgs, Fr = Te.elements, lr = re.invoke(oe, te), ur = oe.def("null"), br = oe.def($e, "(", lr, ")"), Dr = re.cond(br).then(ur, "=", Fr, ".createStream(", lr, ");").else(ur, "=", Fr, ".getElements(", lr, ");");
              return n.optional(function() {
                re.assert(
                  Dr.else,
                  "!" + lr + "||" + ur,
                  "invalid elements"
                );
              }), oe.entry(Dr), oe.exit(
                re.cond(br).then(Fr, ".destroyStream(", ur, ");")
              ), re.ELEMENTS = ur, ur;
            });
          } else if (d)
            return new Me(
              m.thisDep,
              m.contextDep,
              m.propDep,
              function(re, oe) {
                return oe.def(re.shared.vao + ".currentVAO?" + re.shared.elements + ".getElements(" + re.shared.vao + ".currentVAO.elements):null");
              }
            );
          return null;
        }
        var f = u();
        function b() {
          if (Or in c) {
            var Z = c[Or];
            return p.primitive = Z, n.commandParameter(Z, mr, "invalid primitve", r.commandStr), Ne(function(S, te) {
              return mr[Z];
            });
          } else if (Or in h) {
            var C = h[Or];
            return Ye(C, function(S, te) {
              var re = S.constants.primTypes, oe = S.invoke(te, C);
              return n.optional(function() {
                S.assert(
                  te,
                  oe + " in " + re,
                  "invalid primitive, must be one of " + Object.keys(mr)
                );
              }), te.def(re, "[", oe, "]");
            });
          } else {
            if (i)
              return _r(f) ? f.value ? Ne(function(S, te) {
                return te.def(S.ELEMENTS, ".primType");
              }) : Ne(function() {
                return Qn;
              }) : new Me(
                f.thisDep,
                f.contextDep,
                f.propDep,
                function(S, te) {
                  var re = S.ELEMENTS;
                  return te.def(re, "?", re, ".primType:", Qn);
                }
              );
            if (d)
              return new Me(
                m.thisDep,
                m.contextDep,
                m.propDep,
                function(S, te) {
                  return te.def(S.shared.vao + ".currentVAO?" + S.shared.vao + ".currentVAO.primitive:" + Qn);
                }
              );
          }
          return null;
        }
        function _(Z, C) {
          if (Z in c) {
            var S = c[Z] | 0;
            return C ? p.offset = S : p.instances = S, n.command(!C || S >= 0, "invalid " + Z, r.commandStr), Ne(function(re, oe) {
              return C && (re.OFFSET = S), S;
            });
          } else if (Z in h) {
            var te = h[Z];
            return Ye(te, function(re, oe) {
              var Te = re.invoke(oe, te);
              return C && (re.OFFSET = Te, n.optional(function() {
                re.assert(
                  oe,
                  Te + ">=0",
                  "invalid " + Z
                );
              })), Te;
            });
          } else if (C) {
            if (i)
              return Ne(function(re, oe) {
                return re.OFFSET = 0, 0;
              });
            if (d)
              return new Me(
                m.thisDep,
                m.contextDep,
                m.propDep,
                function(re, oe) {
                  return oe.def(re.shared.vao + ".currentVAO?" + re.shared.vao + ".currentVAO.offset:0");
                }
              );
          } else if (d)
            return new Me(
              m.thisDep,
              m.contextDep,
              m.propDep,
              function(re, oe) {
                return oe.def(re.shared.vao + ".currentVAO?" + re.shared.vao + ".currentVAO.instances:-1");
              }
            );
          return null;
        }
        var w = _(It, !0);
        function G() {
          if (Rr in c) {
            var Z = c[Rr] | 0;
            return p.count = Z, n.command(
              typeof Z == "number" && Z >= 0,
              "invalid vertex count",
              r.commandStr
            ), Ne(function() {
              return Z;
            });
          } else if (Rr in h) {
            var C = h[Rr];
            return Ye(C, function(oe, Te) {
              var $e = oe.invoke(Te, C);
              return n.optional(function() {
                oe.assert(
                  Te,
                  "typeof " + $e + '==="number"&&' + $e + ">=0&&" + $e + "===(" + $e + "|0)",
                  "invalid vertex count"
                );
              }), $e;
            });
          } else if (i)
            if (_r(f)) {
              if (f)
                return w ? new Me(
                  w.thisDep,
                  w.contextDep,
                  w.propDep,
                  function(oe, Te) {
                    var $e = Te.def(
                      oe.ELEMENTS,
                      ".vertCount-",
                      oe.OFFSET
                    );
                    return n.optional(function() {
                      oe.assert(
                        Te,
                        $e + ">=0",
                        "invalid vertex offset/element buffer too small"
                      );
                    }), $e;
                  }
                ) : Ne(function(oe, Te) {
                  return Te.def(oe.ELEMENTS, ".vertCount");
                });
              var S = Ne(function() {
                return -1;
              });
              return n.optional(function() {
                S.MISSING = !0;
              }), S;
            } else {
              var te = new Me(
                f.thisDep || w.thisDep,
                f.contextDep || w.contextDep,
                f.propDep || w.propDep,
                function(oe, Te) {
                  var $e = oe.ELEMENTS;
                  return oe.OFFSET ? Te.def(
                    $e,
                    "?",
                    $e,
                    ".vertCount-",
                    oe.OFFSET,
                    ":-1"
                  ) : Te.def($e, "?", $e, ".vertCount:-1");
                }
              );
              return n.optional(function() {
                te.DYNAMIC = !0;
              }), te;
            }
          else if (d) {
            var re = new Me(
              m.thisDep,
              m.contextDep,
              m.propDep,
              function(oe, Te) {
                return Te.def(oe.shared.vao, ".currentVAO?", oe.shared.vao, ".currentVAO.count:-1");
              }
            );
            return re;
          }
          return null;
        }
        var j = b(), ue = G(), ne = _(Pt, !1);
        return {
          elements: f,
          primitive: j,
          count: ue,
          instances: ne,
          offset: w,
          vao: m,
          vaoActive: d,
          elementsActive: i,
          // static draw props
          static: p
        };
      }
      function Le(a, r) {
        var c = a.static, h = a.dynamic, p = {};
        return ae.forEach(function(d) {
          var l = ee(d);
          function m(i, u) {
            if (d in c) {
              var f = i(c[d]);
              p[l] = Ne(function() {
                return f;
              });
            } else if (d in h) {
              var b = h[d];
              p[l] = Ye(b, function(_, w) {
                return u(_, w, _.invoke(w, b));
              });
            }
          }
          switch (d) {
            case Ii:
            case Gi:
            case Ri:
            case Vi:
            case Fi:
            case Xi:
            case ki:
            case Mi:
            case Ui:
            case Bi:
              return m(
                function(i) {
                  return n.commandType(i, "boolean", d, r.commandStr), i;
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      "typeof " + f + '==="boolean"',
                      "invalid flag " + d,
                      i.commandStr
                    );
                  }), f;
                }
              );
            case Di:
              return m(
                function(i) {
                  return n.commandParameter(i, qr, "invalid " + d, r.commandStr), qr[i];
                },
                function(i, u, f) {
                  var b = i.constants.compareFuncs;
                  return n.optional(function() {
                    i.assert(
                      u,
                      f + " in " + b,
                      "invalid " + d + ", must be one of " + Object.keys(qr)
                    );
                  }), u.def(b, "[", f, "]");
                }
              );
            case Ni:
              return m(
                function(i) {
                  return n.command(
                    Se(i) && i.length === 2 && typeof i[0] == "number" && typeof i[1] == "number" && i[0] <= i[1],
                    "depth range is 2d array",
                    r.commandStr
                  ), i;
                },
                function(i, u, f) {
                  n.optional(function() {
                    i.assert(
                      u,
                      i.shared.isArrayLike + "(" + f + ")&&" + f + ".length===2&&typeof " + f + '[0]==="number"&&typeof ' + f + '[1]==="number"&&' + f + "[0]<=" + f + "[1]",
                      "depth range must be a 2d array"
                    );
                  });
                  var b = u.def("+", f, "[0]"), _ = u.def("+", f, "[1]");
                  return [b, _];
                }
              );
            case Bn:
              return m(
                function(i) {
                  n.commandType(i, "object", "blend.func", r.commandStr);
                  var u = "srcRGB" in i ? i.srcRGB : i.src, f = "srcAlpha" in i ? i.srcAlpha : i.src, b = "dstRGB" in i ? i.dstRGB : i.dst, _ = "dstAlpha" in i ? i.dstAlpha : i.dst;
                  return n.commandParameter(u, fr, l + ".srcRGB", r.commandStr), n.commandParameter(f, fr, l + ".srcAlpha", r.commandStr), n.commandParameter(b, fr, l + ".dstRGB", r.commandStr), n.commandParameter(_, fr, l + ".dstAlpha", r.commandStr), n.command(
                    Ji.indexOf(u + ", " + b) === -1,
                    "unallowed blending combination (srcRGB, dstRGB) = (" + u + ", " + b + ")",
                    r.commandStr
                  ), [
                    fr[u],
                    fr[b],
                    fr[f],
                    fr[_]
                  ];
                },
                function(i, u, f) {
                  var b = i.constants.blendFuncs;
                  n.optional(function() {
                    i.assert(
                      u,
                      f + "&&typeof " + f + '==="object"',
                      "invalid blend func, must be an object"
                    );
                  });
                  function _(C, S) {
                    var te = u.def(
                      '"',
                      C,
                      S,
                      '" in ',
                      f,
                      "?",
                      f,
                      ".",
                      C,
                      S,
                      ":",
                      f,
                      ".",
                      C
                    );
                    return n.optional(function() {
                      i.assert(
                        u,
                        te + " in " + b,
                        "invalid " + d + "." + C + S + ", must be one of " + Object.keys(fr)
                      );
                    }), te;
                  }
                  var w = _("src", "RGB"), G = _("dst", "RGB");
                  n.optional(function() {
                    var C = i.constants.invalidBlendCombinations;
                    i.assert(
                      u,
                      C + ".indexOf(" + w + '+", "+' + G + ") === -1 ",
                      "unallowed blending combination for (srcRGB, dstRGB)"
                    );
                  });
                  var j = u.def(b, "[", w, "]"), ue = u.def(b, "[", _("src", "Alpha"), "]"), ne = u.def(b, "[", G, "]"), Z = u.def(b, "[", _("dst", "Alpha"), "]");
                  return [j, ne, ue, Z];
                }
              );
            case Nn:
              return m(
                function(i) {
                  if (typeof i == "string")
                    return n.commandParameter(i, T, "invalid " + d, r.commandStr), [
                      T[i],
                      T[i]
                    ];
                  if (typeof i == "object")
                    return n.commandParameter(
                      i.rgb,
                      T,
                      d + ".rgb",
                      r.commandStr
                    ), n.commandParameter(
                      i.alpha,
                      T,
                      d + ".alpha",
                      r.commandStr
                    ), [
                      T[i.rgb],
                      T[i.alpha]
                    ];
                  n.commandRaise("invalid blend.equation", r.commandStr);
                },
                function(i, u, f) {
                  var b = i.constants.blendEquations, _ = u.def(), w = u.def(), G = i.cond("typeof ", f, '==="string"');
                  return n.optional(function() {
                    function j(ue, ne, Z) {
                      i.assert(
                        ue,
                        Z + " in " + b,
                        "invalid " + ne + ", must be one of " + Object.keys(T)
                      );
                    }
                    j(G.then, d, f), i.assert(
                      G.else,
                      f + "&&typeof " + f + '==="object"',
                      "invalid " + d
                    ), j(G.else, d + ".rgb", f + ".rgb"), j(G.else, d + ".alpha", f + ".alpha");
                  }), G.then(
                    _,
                    "=",
                    w,
                    "=",
                    b,
                    "[",
                    f,
                    "];"
                  ), G.else(
                    _,
                    "=",
                    b,
                    "[",
                    f,
                    ".rgb];",
                    w,
                    "=",
                    b,
                    "[",
                    f,
                    ".alpha];"
                  ), u(G), [_, w];
                }
              );
            case Ci:
              return m(
                function(i) {
                  return n.command(
                    Se(i) && i.length === 4,
                    "blend.color must be a 4d array",
                    r.commandStr
                  ), Ze(4, function(u) {
                    return +i[u];
                  });
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      i.shared.isArrayLike + "(" + f + ")&&" + f + ".length===4",
                      "blend.color must be a 4d array"
                    );
                  }), Ze(4, function(b) {
                    return u.def("+", f, "[", b, "]");
                  });
                }
              );
            case ji:
              return m(
                function(i) {
                  return n.commandType(i, "number", l, r.commandStr), i | 0;
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      "typeof " + f + '==="number"',
                      "invalid stencil.mask"
                    );
                  }), u.def(f, "|0");
                }
              );
            case Vn:
              return m(
                function(i) {
                  n.commandType(i, "object", l, r.commandStr);
                  var u = i.cmp || "keep", f = i.ref || 0, b = "mask" in i ? i.mask : -1;
                  return n.commandParameter(u, qr, d + ".cmp", r.commandStr), n.commandType(f, "number", d + ".ref", r.commandStr), n.commandType(b, "number", d + ".mask", r.commandStr), [
                    qr[u],
                    f,
                    b
                  ];
                },
                function(i, u, f) {
                  var b = i.constants.compareFuncs;
                  n.optional(function() {
                    function j() {
                      i.assert(
                        u,
                        Array.prototype.join.call(arguments, ""),
                        "invalid stencil.func"
                      );
                    }
                    j(f + "&&typeof ", f, '==="object"'), j(
                      '!("cmp" in ',
                      f,
                      ")||(",
                      f,
                      ".cmp in ",
                      b,
                      ")"
                    );
                  });
                  var _ = u.def(
                    '"cmp" in ',
                    f,
                    "?",
                    b,
                    "[",
                    f,
                    ".cmp]",
                    ":",
                    vr
                  ), w = u.def(f, ".ref|0"), G = u.def(
                    '"mask" in ',
                    f,
                    "?",
                    f,
                    ".mask|0:-1"
                  );
                  return [_, w, G];
                }
              );
            case jn:
            case at:
              return m(
                function(i) {
                  n.commandType(i, "object", l, r.commandStr);
                  var u = i.fail || "keep", f = i.zfail || "keep", b = i.zpass || "keep";
                  return n.commandParameter(u, pr, d + ".fail", r.commandStr), n.commandParameter(f, pr, d + ".zfail", r.commandStr), n.commandParameter(b, pr, d + ".zpass", r.commandStr), [
                    d === at ? Gr : ht,
                    pr[u],
                    pr[f],
                    pr[b]
                  ];
                },
                function(i, u, f) {
                  var b = i.constants.stencilOps;
                  n.optional(function() {
                    i.assert(
                      u,
                      f + "&&typeof " + f + '==="object"',
                      "invalid " + d
                    );
                  });
                  function _(w) {
                    return n.optional(function() {
                      i.assert(
                        u,
                        '!("' + w + '" in ' + f + ")||(" + f + "." + w + " in " + b + ")",
                        "invalid " + d + "." + w + ", must be one of " + Object.keys(pr)
                      );
                    }), u.def(
                      '"',
                      w,
                      '" in ',
                      f,
                      "?",
                      b,
                      "[",
                      f,
                      ".",
                      w,
                      "]:",
                      vr
                    );
                  }
                  return [
                    d === at ? Gr : ht,
                    _("fail"),
                    _("zfail"),
                    _("zpass")
                  ];
                }
              );
            case Mn:
              return m(
                function(i) {
                  n.commandType(i, "object", l, r.commandStr);
                  var u = i.factor | 0, f = i.units | 0;
                  return n.commandType(u, "number", l + ".factor", r.commandStr), n.commandType(f, "number", l + ".units", r.commandStr), [u, f];
                },
                function(i, u, f) {
                  n.optional(function() {
                    i.assert(
                      u,
                      f + "&&typeof " + f + '==="object"',
                      "invalid " + d
                    );
                  });
                  var b = u.def(f, ".factor|0"), _ = u.def(f, ".units|0");
                  return [b, _];
                }
              );
            case Pi:
              return m(
                function(i) {
                  var u = 0;
                  return i === "front" ? u = ht : i === "back" && (u = Gr), n.command(!!u, l, r.commandStr), u;
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      f + '==="front"||' + f + '==="back"',
                      "invalid cull.face"
                    );
                  }), u.def(f, '==="front"?', ht, ":", Gr);
                }
              );
            case kn:
              return m(
                function(i) {
                  return n.command(
                    typeof i == "number" && i >= x.lineWidthDims[0] && i <= x.lineWidthDims[1],
                    "invalid line width, must be a positive number between " + x.lineWidthDims[0] + " and " + x.lineWidthDims[1],
                    r.commandStr
                  ), i;
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      "typeof " + f + '==="number"&&' + f + ">=" + x.lineWidthDims[0] + "&&" + f + "<=" + x.lineWidthDims[1],
                      "invalid line width"
                    );
                  }), f;
                }
              );
            case Pn:
              return m(
                function(i) {
                  return n.commandParameter(i, Kn, l, r.commandStr), Kn[i];
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      f + '==="cw"||' + f + '==="ccw"',
                      "invalid frontFace, must be one of cw,ccw"
                    );
                  }), u.def(f + '==="cw"?' + Yi + ":" + qn);
                }
              );
            case In:
              return m(
                function(i) {
                  return n.command(
                    Se(i) && i.length === 4,
                    "color.mask must be length 4 array",
                    r.commandStr
                  ), i.map(function(u) {
                    return !!u;
                  });
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      i.shared.isArrayLike + "(" + f + ")&&" + f + ".length===4",
                      "invalid color.mask"
                    );
                  }), Ze(4, function(b) {
                    return "!!" + f + "[" + b + "]";
                  });
                }
              );
            case Un:
              return m(
                function(i) {
                  n.command(typeof i == "object" && i, l, r.commandStr);
                  var u = "value" in i ? i.value : 1, f = !!i.invert;
                  return n.command(
                    typeof u == "number" && u >= 0 && u <= 1,
                    "sample.coverage.value must be a number between 0 and 1",
                    r.commandStr
                  ), [u, f];
                },
                function(i, u, f) {
                  n.optional(function() {
                    i.assert(
                      u,
                      f + "&&typeof " + f + '==="object"',
                      "invalid sample.coverage"
                    );
                  });
                  var b = u.def(
                    '"value" in ',
                    f,
                    "?+",
                    f,
                    ".value:1"
                  ), _ = u.def("!!", f, ".invert");
                  return [b, _];
                }
              );
          }
        }), p;
      }
      function be(a, r) {
        var c = a.static, h = a.dynamic, p = {};
        return Object.keys(c).forEach(function(d) {
          var l = c[d], m;
          if (typeof l == "number" || typeof l == "boolean")
            m = Ne(function() {
              return l;
            });
          else if (typeof l == "function") {
            var i = l._reglType;
            i === "texture2d" || i === "textureCube" ? m = Ne(function(u) {
              return u.link(l);
            }) : i === "framebuffer" || i === "framebufferCube" ? (n.command(
              l.color.length > 0,
              'missing color attachment for framebuffer sent to uniform "' + d + '"',
              r.commandStr
            ), m = Ne(function(u) {
              return u.link(l.color[0]);
            })) : n.commandRaise('invalid data for uniform "' + d + '"', r.commandStr);
          } else
            Se(l) ? m = Ne(function(u) {
              var f = u.global.def(
                "[",
                Ze(l.length, function(b) {
                  return n.command(
                    typeof l[b] == "number" || typeof l[b] == "boolean",
                    "invalid uniform " + d,
                    u.commandStr
                  ), l[b];
                }),
                "]"
              );
              return f;
            }) : n.commandRaise('invalid or missing data for uniform "' + d + '"', r.commandStr);
          m.value = l, p[d] = m;
        }), Object.keys(h).forEach(function(d) {
          var l = h[d];
          p[d] = Ye(l, function(m, i) {
            return m.invoke(i, l);
          });
        }), p;
      }
      function Ie(a, r) {
        var c = a.static, h = a.dynamic, p = {};
        return Object.keys(c).forEach(function(d) {
          var l = c[d], m = t.id(d), i = new v();
          if (Wt(l))
            i.state = zr, i.buffer = O.getBuffer(
              O.create(l, Qr, !1, !0)
            ), i.type = 0;
          else {
            var u = O.getBuffer(l);
            if (u)
              i.state = zr, i.buffer = u, i.type = 0;
            else if (n.command(
              typeof l == "object" && l,
              "invalid data for attribute " + d,
              r.commandStr
            ), "constant" in l) {
              var f = l.constant;
              i.buffer = "null", i.state = Rn, typeof f == "number" ? i.x = f : (n.command(
                Se(f) && f.length > 0 && f.length <= 4,
                "invalid constant for attribute " + d,
                r.commandStr
              ), $r.forEach(function(ne, Z) {
                Z < f.length && (i[ne] = f[Z]);
              }));
            } else {
              Wt(l.buffer) ? u = O.getBuffer(
                O.create(l.buffer, Qr, !1, !0)
              ) : u = O.getBuffer(l.buffer), n.command(!!u, 'missing buffer for attribute "' + d + '"', r.commandStr);
              var b = l.offset | 0;
              n.command(
                b >= 0,
                'invalid offset for attribute "' + d + '"',
                r.commandStr
              );
              var _ = l.stride | 0;
              n.command(
                _ >= 0 && _ < 256,
                'invalid stride for attribute "' + d + '", must be integer betweeen [0, 255]',
                r.commandStr
              );
              var w = l.size | 0;
              n.command(
                !("size" in l) || w > 0 && w <= 4,
                'invalid size for attribute "' + d + '", must be 1,2,3,4',
                r.commandStr
              );
              var G = !!l.normalized, j = 0;
              "type" in l && (n.commandParameter(
                l.type,
                xr,
                "invalid type for attribute " + d,
                r.commandStr
              ), j = xr[l.type]);
              var ue = l.divisor | 0;
              n.optional(function() {
                "divisor" in l && (n.command(
                  ue === 0 || P,
                  'cannot specify divisor for attribute "' + d + '", instancing not supported',
                  r.commandStr
                ), n.command(
                  ue >= 0,
                  'invalid divisor for attribute "' + d + '"',
                  r.commandStr
                ));
                var ne = r.commandStr, Z = [
                  "buffer",
                  "offset",
                  "divisor",
                  "normalized",
                  "type",
                  "size",
                  "stride"
                ];
                Object.keys(l).forEach(function(C) {
                  n.command(
                    Z.indexOf(C) >= 0,
                    'unknown parameter "' + C + '" for attribute pointer "' + d + '" (valid parameters are ' + Z + ")",
                    ne
                  );
                });
              }), i.buffer = u, i.state = zr, i.size = w, i.normalized = G, i.type = j || u.dtype, i.offset = b, i.stride = _, i.divisor = ue;
            }
          }
          p[d] = Ne(function(ne, Z) {
            var C = ne.attribCache;
            if (m in C)
              return C[m];
            var S = {
              isStream: !1
            };
            return Object.keys(i).forEach(function(te) {
              S[te] = i[te];
            }), i.buffer && (S.buffer = ne.link(i.buffer), S.type = S.type || S.buffer + ".dtype"), C[m] = S, S;
          });
        }), Object.keys(h).forEach(function(d) {
          var l = h[d];
          function m(i, u) {
            var f = i.invoke(u, l), b = i.shared, _ = i.constants, w = b.isBufferArgs, G = b.buffer;
            n.optional(function() {
              i.assert(
                u,
                f + "&&(typeof " + f + '==="object"||typeof ' + f + '==="function")&&(' + w + "(" + f + ")||" + G + ".getBuffer(" + f + ")||" + G + ".getBuffer(" + f + ".buffer)||" + w + "(" + f + '.buffer)||("constant" in ' + f + "&&(typeof " + f + '.constant==="number"||' + b.isArrayLike + "(" + f + ".constant))))",
                'invalid dynamic attribute "' + d + '"'
              );
            });
            var j = {
              isStream: u.def(!1)
            }, ue = new v();
            ue.state = zr, Object.keys(ue).forEach(function(S) {
              j[S] = u.def("" + ue[S]);
            });
            var ne = j.buffer, Z = j.type;
            u(
              "if(",
              w,
              "(",
              f,
              ")){",
              j.isStream,
              "=true;",
              ne,
              "=",
              G,
              ".createStream(",
              Qr,
              ",",
              f,
              ");",
              Z,
              "=",
              ne,
              ".dtype;",
              "}else{",
              ne,
              "=",
              G,
              ".getBuffer(",
              f,
              ");",
              "if(",
              ne,
              "){",
              Z,
              "=",
              ne,
              ".dtype;",
              '}else if("constant" in ',
              f,
              "){",
              j.state,
              "=",
              Rn,
              ";",
              "if(typeof " + f + '.constant === "number"){',
              j[$r[0]],
              "=",
              f,
              ".constant;",
              $r.slice(1).map(function(S) {
                return j[S];
              }).join("="),
              "=0;",
              "}else{",
              $r.map(function(S, te) {
                return j[S] + "=" + f + ".constant.length>" + te + "?" + f + ".constant[" + te + "]:0;";
              }).join(""),
              "}}else{",
              "if(",
              w,
              "(",
              f,
              ".buffer)){",
              ne,
              "=",
              G,
              ".createStream(",
              Qr,
              ",",
              f,
              ".buffer);",
              "}else{",
              ne,
              "=",
              G,
              ".getBuffer(",
              f,
              ".buffer);",
              "}",
              Z,
              '="type" in ',
              f,
              "?",
              _.glTypes,
              "[",
              f,
              ".type]:",
              ne,
              ".dtype;",
              j.normalized,
              "=!!",
              f,
              ".normalized;"
            );
            function C(S) {
              u(j[S], "=", f, ".", S, "|0;");
            }
            return C("size"), C("offset"), C("stride"), C("divisor"), u("}}"), u.exit(
              "if(",
              j.isStream,
              "){",
              G,
              ".destroyStream(",
              ne,
              ");",
              "}"
            ), j;
          }
          p[d] = Ye(l, m);
        }), p;
      }
      function ge(a) {
        var r = a.static, c = a.dynamic, h = {};
        return Object.keys(r).forEach(function(p) {
          var d = r[p];
          h[p] = Ne(function(l, m) {
            return typeof d == "number" || typeof d == "boolean" ? "" + d : l.link(d);
          });
        }), Object.keys(c).forEach(function(p) {
          var d = c[p];
          h[p] = Ye(d, function(l, m) {
            return l.invoke(m, d);
          });
        }), h;
      }
      function Be(a, r, c, h, p) {
        var d = a.static, l = a.dynamic;
        n.optional(function() {
          var C = [
            wr,
            ft,
            ot,
            Lr,
            Or,
            It,
            Rr,
            Pt,
            it,
            ut
          ].concat(ae);
          function S(te) {
            Object.keys(te).forEach(function(re) {
              n.command(
                C.indexOf(re) >= 0,
                'unknown parameter "' + re + '"',
                p.commandStr
              );
            });
          }
          S(d), S(l);
        });
        var m = le(a, r), i = q(a), u = fe(a, i, p), f = we(a, p), b = Le(a, p), _ = ve(a, p, m);
        function w(C) {
          var S = u[C];
          S && (b[C] = S);
        }
        w(cr), w(ee(Bt));
        var G = Object.keys(b).length > 0, j = {
          framebuffer: i,
          draw: f,
          shader: _,
          state: b,
          dirty: G,
          scopeVAO: null,
          drawVAO: null,
          useVAO: !1,
          attributes: {}
        };
        if (j.profile = Y(a), j.uniforms = be(c, p), j.drawVAO = j.scopeVAO = f.vao, !j.drawVAO && _.program && !m && s.angle_instanced_arrays && f.static.elements) {
          var ue = !0, ne = _.program.attributes.map(function(C) {
            var S = r.static[C];
            return ue = ue && !!S, S;
          });
          if (ue && ne.length > 0) {
            var Z = M.getVAO(M.createVAO({
              attributes: ne,
              elements: f.static.elements
            }));
            j.drawVAO = new Me(null, null, null, function(C, S) {
              return C.link(Z);
            }), j.useVAO = !0;
          }
        }
        return m ? j.useVAO = !0 : j.attributes = Ie(r, p), j.context = ge(h), j;
      }
      function Pe(a, r, c) {
        var h = a.shared, p = h.context, d = a.scope();
        Object.keys(c).forEach(function(l) {
          r.save(p, "." + l);
          var m = c[l], i = m.append(a, r);
          Array.isArray(i) ? d(p, ".", l, "=[", i.join(), "];") : d(p, ".", l, "=", i, ";");
        }), r(d);
      }
      function ke(a, r, c, h) {
        var p = a.shared, d = p.gl, l = p.framebuffer, m;
        K && (m = r.def(p.extensions, ".webgl_draw_buffers"));
        var i = a.constants, u = i.drawBuffer, f = i.backBuffer, b;
        c ? b = c.append(a, r) : b = r.def(l, ".next"), h || r("if(", b, "!==", l, ".cur){"), r(
          "if(",
          b,
          "){",
          d,
          ".bindFramebuffer(",
          Zi,
          ",",
          b,
          ".framebuffer);"
        ), K && r(
          m,
          ".drawBuffersWEBGL(",
          u,
          "[",
          b,
          ".colorAttachments.length]);"
        ), r(
          "}else{",
          d,
          ".bindFramebuffer(",
          Zi,
          ",null);"
        ), K && r(m, ".drawBuffersWEBGL(", f, ");"), r(
          "}",
          l,
          ".cur=",
          b,
          ";"
        ), h || r("}");
      }
      function Ve(a, r, c) {
        var h = a.shared, p = h.gl, d = a.current, l = a.next, m = h.current, i = h.next, u = a.cond(m, ".dirty");
        ae.forEach(function(f) {
          var b = ee(f);
          if (!(b in c.state)) {
            var _, w;
            if (b in l) {
              _ = l[b], w = d[b];
              var G = Ze(Q[b].length, function(ue) {
                return u.def(_, "[", ue, "]");
              });
              u(a.cond(G.map(function(ue, ne) {
                return ue + "!==" + w + "[" + ne + "]";
              }).join("||")).then(
                p,
                ".",
                L[b],
                "(",
                G,
                ");",
                G.map(function(ue, ne) {
                  return w + "[" + ne + "]=" + ue;
                }).join(";"),
                ";"
              ));
            } else {
              _ = u.def(i, ".", b);
              var j = a.cond(_, "!==", m, ".", b);
              u(j), b in R ? j(
                a.cond(_).then(p, ".enable(", R[b], ");").else(p, ".disable(", R[b], ");"),
                m,
                ".",
                b,
                "=",
                _,
                ";"
              ) : j(
                p,
                ".",
                L[b],
                "(",
                _,
                ");",
                m,
                ".",
                b,
                "=",
                _,
                ";"
              );
            }
          }
        }), Object.keys(c.state).length === 0 && u(m, ".dirty=false;"), r(u);
      }
      function Xe(a, r, c, h) {
        var p = a.shared, d = a.current, l = p.current, m = p.gl;
        rf(Object.keys(c)).forEach(function(i) {
          var u = c[i];
          if (!(h && !h(u))) {
            var f = u.append(a, r);
            if (R[i]) {
              var b = R[i];
              _r(u) ? f ? r(m, ".enable(", b, ");") : r(m, ".disable(", b, ");") : r(a.cond(f).then(m, ".enable(", b, ");").else(m, ".disable(", b, ");")), r(l, ".", i, "=", f, ";");
            } else if (Se(f)) {
              var _ = d[i];
              r(
                m,
                ".",
                L[i],
                "(",
                f,
                ");",
                f.map(function(w, G) {
                  return _ + "[" + G + "]=" + w;
                }).join(";"),
                ";"
              );
            } else
              r(
                m,
                ".",
                L[i],
                "(",
                f,
                ");",
                l,
                ".",
                i,
                "=",
                f,
                ";"
              );
          }
        });
      }
      function Ce(a, r) {
        P && (a.instancing = r.def(
          a.shared.extensions,
          ".angle_instanced_arrays"
        ));
      }
      function de(a, r, c, h, p) {
        var d = a.shared, l = a.stats, m = d.current, i = d.timer, u = c.profile;
        function f() {
          return typeof performance > "u" ? "Date.now()" : "performance.now()";
        }
        var b, _;
        function w(C) {
          b = r.def(), C(b, "=", f(), ";"), typeof p == "string" ? C(l, ".count+=", p, ";") : C(l, ".count++;"), B && (h ? (_ = r.def(), C(_, "=", i, ".getNumPendingQueries();")) : C(i, ".beginQuery(", l, ");"));
        }
        function G(C) {
          C(l, ".cpuTime+=", f(), "-", b, ";"), B && (h ? C(
            i,
            ".pushScopeStats(",
            _,
            ",",
            i,
            ".getNumPendingQueries(),",
            l,
            ");"
          ) : C(i, ".endQuery();"));
        }
        function j(C) {
          var S = r.def(m, ".profile");
          r(m, ".profile=", C, ";"), r.exit(m, ".profile=", S, ";");
        }
        var ue;
        if (u) {
          if (_r(u)) {
            u.enable ? (w(r), G(r.exit), j("true")) : j("false");
            return;
          }
          ue = u.append(a, r), j(ue);
        } else
          ue = r.def(m, ".profile");
        var ne = a.block();
        w(ne), r("if(", ue, "){", ne, "}");
        var Z = a.block();
        G(Z), r.exit("if(", ue, "){", Z, "}");
      }
      function He(a, r, c, h, p) {
        var d = a.shared;
        function l(i) {
          switch (i) {
            case kt:
            case Vt:
            case Ht:
              return 2;
            case Mt:
            case jt:
            case $t:
              return 3;
            case Ut:
            case Xt:
            case zt:
              return 4;
            default:
              return 1;
          }
        }
        function m(i, u, f) {
          var b = d.gl, _ = r.def(i, ".location"), w = r.def(d.attributes, "[", _, "]"), G = f.state, j = f.buffer, ue = [
            f.x,
            f.y,
            f.z,
            f.w
          ], ne = [
            "buffer",
            "normalized",
            "offset",
            "stride"
          ];
          function Z() {
            r(
              "if(!",
              w,
              ".buffer){",
              b,
              ".enableVertexAttribArray(",
              _,
              ");}"
            );
            var S = f.type, te;
            if (f.size ? te = r.def(f.size, "||", u) : te = u, r(
              "if(",
              w,
              ".type!==",
              S,
              "||",
              w,
              ".size!==",
              te,
              "||",
              ne.map(function(oe) {
                return w + "." + oe + "!==" + f[oe];
              }).join("||"),
              "){",
              b,
              ".bindBuffer(",
              Qr,
              ",",
              j,
              ".buffer);",
              b,
              ".vertexAttribPointer(",
              [
                _,
                te,
                S,
                f.normalized,
                f.stride,
                f.offset
              ],
              ");",
              w,
              ".type=",
              S,
              ";",
              w,
              ".size=",
              te,
              ";",
              ne.map(function(oe) {
                return w + "." + oe + "=" + f[oe] + ";";
              }).join(""),
              "}"
            ), P) {
              var re = f.divisor;
              r(
                "if(",
                w,
                ".divisor!==",
                re,
                "){",
                a.instancing,
                ".vertexAttribDivisorANGLE(",
                [_, re],
                ");",
                w,
                ".divisor=",
                re,
                ";}"
              );
            }
          }
          function C() {
            r(
              "if(",
              w,
              ".buffer){",
              b,
              ".disableVertexAttribArray(",
              _,
              ");",
              w,
              ".buffer=null;",
              "}if(",
              $r.map(function(S, te) {
                return w + "." + S + "!==" + ue[te];
              }).join("||"),
              "){",
              b,
              ".vertexAttrib4f(",
              _,
              ",",
              ue,
              ");",
              $r.map(function(S, te) {
                return w + "." + S + "=" + ue[te] + ";";
              }).join(""),
              "}"
            );
          }
          G === zr ? Z() : G === Rn ? C() : (r("if(", G, "===", zr, "){"), Z(), r("}else{"), C(), r("}"));
        }
        h.forEach(function(i) {
          var u = i.name, f = c.attributes[u], b;
          if (f) {
            if (!p(f))
              return;
            b = f.append(a, r);
          } else {
            if (!p(tf))
              return;
            var _ = a.scopeAttrib(u);
            n.optional(function() {
              a.assert(
                r,
                _ + ".state",
                "missing attribute " + u
              );
            }), b = {}, Object.keys(new v()).forEach(function(w) {
              b[w] = r.def(_, ".", w);
            });
          }
          m(
            a.link(i),
            l(i.info.type),
            b
          );
        });
      }
      function Ae(a, r, c, h, p, d) {
        for (var l = a.shared, m = l.gl, i = {}, u, f = 0; f < h.length; ++f) {
          var b = h[f], _ = b.name, w = b.info.type, G = b.info.size, j = c.uniforms[_];
          if (G > 1) {
            if (!j)
              continue;
            var ue = _.replace("[0]", "");
            if (i[ue])
              continue;
            i[ue] = 1;
          }
          var ne = a.link(b), Z = ne + ".location", C;
          if (j) {
            if (!p(j))
              continue;
            if (_r(j)) {
              var S = j.value;
              if (n.command(
                S !== null && typeof S < "u",
                'missing uniform "' + _ + '"',
                a.commandStr
              ), w === dt || w === mt) {
                n.command(
                  typeof S == "function" && (w === dt && (S._reglType === "texture2d" || S._reglType === "framebuffer") || w === mt && (S._reglType === "textureCube" || S._reglType === "framebufferCube")),
                  "invalid texture for uniform " + _,
                  a.commandStr
                );
                var te = a.link(S._texture || S.color[0]._texture);
                r(m, ".uniform1i(", Z, ",", te + ".bind());"), r.exit(te, ".unbind();");
              } else if (w === st || w === ct || w === lt) {
                n.optional(function() {
                  n.command(
                    Se(S),
                    "invalid matrix for uniform " + _,
                    a.commandStr
                  ), n.command(
                    w === st && S.length === 4 || w === ct && S.length === 9 || w === lt && S.length === 16,
                    "invalid length for matrix uniform " + _,
                    a.commandStr
                  );
                });
                var re = a.global.def("new Float32Array([" + Array.prototype.slice.call(S) + "])"), oe = 2;
                w === ct ? oe = 3 : w === lt && (oe = 4), r(
                  m,
                  ".uniformMatrix",
                  oe,
                  "fv(",
                  Z,
                  ",false,",
                  re,
                  ");"
                );
              } else {
                switch (w) {
                  case zn:
                    G === 1 ? n.commandType(S, "number", "uniform " + _, a.commandStr) : n.command(
                      Se(S) && S.length === G,
                      "uniform " + _,
                      a.commandStr
                    ), u = "1f";
                    break;
                  case kt:
                    n.command(
                      Se(S) && S.length && S.length % 2 === 0 && S.length <= G * 2,
                      "uniform " + _,
                      a.commandStr
                    ), u = "2f";
                    break;
                  case Mt:
                    n.command(
                      Se(S) && S.length && S.length % 3 === 0 && S.length <= G * 3,
                      "uniform " + _,
                      a.commandStr
                    ), u = "3f";
                    break;
                  case Ut:
                    n.command(
                      Se(S) && S.length && S.length % 4 === 0 && S.length <= G * 4,
                      "uniform " + _,
                      a.commandStr
                    ), u = "4f";
                    break;
                  case Yn:
                    G === 1 ? n.commandType(S, "boolean", "uniform " + _, a.commandStr) : n.command(
                      Se(S) && S.length === G,
                      "uniform " + _,
                      a.commandStr
                    ), u = "1i";
                    break;
                  case Wn:
                    G === 1 ? n.commandType(S, "number", "uniform " + _, a.commandStr) : n.command(
                      Se(S) && S.length === G,
                      "uniform " + _,
                      a.commandStr
                    ), u = "1i";
                    break;
                  case Ht:
                    n.command(
                      Se(S) && S.length && S.length % 2 === 0 && S.length <= G * 2,
                      "uniform " + _,
                      a.commandStr
                    ), u = "2i";
                    break;
                  case Vt:
                    n.command(
                      Se(S) && S.length && S.length % 2 === 0 && S.length <= G * 2,
                      "uniform " + _,
                      a.commandStr
                    ), u = "2i";
                    break;
                  case $t:
                    n.command(
                      Se(S) && S.length && S.length % 3 === 0 && S.length <= G * 3,
                      "uniform " + _,
                      a.commandStr
                    ), u = "3i";
                    break;
                  case jt:
                    n.command(
                      Se(S) && S.length && S.length % 3 === 0 && S.length <= G * 3,
                      "uniform " + _,
                      a.commandStr
                    ), u = "3i";
                    break;
                  case zt:
                    n.command(
                      Se(S) && S.length && S.length % 4 === 0 && S.length <= G * 4,
                      "uniform " + _,
                      a.commandStr
                    ), u = "4i";
                    break;
                  case Xt:
                    n.command(
                      Se(S) && S.length && S.length % 4 === 0 && S.length <= G * 4,
                      "uniform " + _,
                      a.commandStr
                    ), u = "4i";
                    break;
                }
                G > 1 ? (u += "v", S = a.global.def("[" + Array.prototype.slice.call(S) + "]")) : S = Se(S) ? Array.prototype.slice.call(S) : S, r(
                  m,
                  ".uniform",
                  u,
                  "(",
                  Z,
                  ",",
                  S,
                  ");"
                );
              }
              continue;
            } else
              C = j.append(a, r);
          } else {
            if (!p(tf))
              continue;
            C = r.def(l.uniforms, "[", t.id(_), "]");
          }
          w === dt ? (n(!Array.isArray(C), "must specify a scalar prop for textures"), r(
            "if(",
            C,
            "&&",
            C,
            '._reglType==="framebuffer"){',
            C,
            "=",
            C,
            ".color[0];",
            "}"
          )) : w === mt && (n(!Array.isArray(C), "must specify a scalar prop for cube maps"), r(
            "if(",
            C,
            "&&",
            C,
            '._reglType==="framebufferCube"){',
            C,
            "=",
            C,
            ".color[0];",
            "}"
          )), n.optional(function() {
            function er(Qe, Yt) {
              a.assert(
                r,
                Qe,
                'bad data or missing for uniform "' + _ + '".  ' + Yt
              );
            }
            function Nr(Qe, Yt) {
              Yt === 1 && n(!Array.isArray(C), "must not specify an array type for uniform"), er(
                "Array.isArray(" + C + ") && typeof " + C + '[0]===" ' + Qe + '" || typeof ' + C + '==="' + Qe + '"',
                "invalid type, expected " + Qe
              );
            }
            function tr(Qe, Yt, Qt) {
              Array.isArray(C) ? n(C.length && C.length % Qe === 0 && C.length <= Qe * Qt, "must have length of " + (Qt === 1 ? "" : "n * ") + Qe) : er(
                l.isArrayLike + "(" + C + ")&&" + C + ".length && " + C + ".length % " + Qe + " === 0 && " + C + ".length<=" + Qe * Qt,
                "invalid vector, should have length of " + (Qt === 1 ? "" : "n * ") + Qe,
                a.commandStr
              );
            }
            function cf(Qe) {
              n(!Array.isArray(C), "must not specify a value type"), er(
                "typeof " + C + '==="function"&&' + C + '._reglType==="texture' + (Qe === Wi ? "2d" : "Cube") + '"',
                "invalid texture type",
                a.commandStr
              );
            }
            switch (w) {
              case Wn:
                Nr("number", G);
                break;
              case Vt:
                tr(2, "number", G);
                break;
              case jt:
                tr(3, "number", G);
                break;
              case Xt:
                tr(4, "number", G);
                break;
              case zn:
                Nr("number", G);
                break;
              case kt:
                tr(2, "number", G);
                break;
              case Mt:
                tr(3, "number", G);
                break;
              case Ut:
                tr(4, "number", G);
                break;
              case Yn:
                Nr("boolean", G);
                break;
              case Ht:
                tr(2, "boolean", G);
                break;
              case $t:
                tr(3, "boolean", G);
                break;
              case zt:
                tr(4, "boolean", G);
                break;
              case st:
                tr(4, "number", G);
                break;
              case ct:
                tr(9, "number", G);
                break;
              case lt:
                tr(16, "number", G);
                break;
              case dt:
                cf(Wi);
                break;
              case mt:
                cf(ws);
                break;
            }
          });
          var Te = 1;
          switch (w) {
            case dt:
            case mt:
              var $e = r.def(C, "._texture");
              r(m, ".uniform1i(", Z, ",", $e, ".bind());"), r.exit($e, ".unbind();");
              continue;
            case Wn:
            case Yn:
              u = "1i";
              break;
            case Vt:
            case Ht:
              u = "2i", Te = 2;
              break;
            case jt:
            case $t:
              u = "3i", Te = 3;
              break;
            case Xt:
            case zt:
              u = "4i", Te = 4;
              break;
            case zn:
              u = "1f";
              break;
            case kt:
              u = "2f", Te = 2;
              break;
            case Mt:
              u = "3f", Te = 3;
              break;
            case Ut:
              u = "4f", Te = 4;
              break;
            case st:
              u = "Matrix2fv";
              break;
            case ct:
              u = "Matrix3fv";
              break;
            case lt:
              u = "Matrix4fv";
              break;
          }
          if (u.indexOf("Matrix") === -1 && G > 1 && (u += "v", Te = 1), u.charAt(0) === "M") {
            r(m, ".uniform", u, "(", Z, ",");
            var Fr = Math.pow(w - st + 2, 2), lr = a.global.def("new Float32Array(", Fr, ")");
            Array.isArray(C) ? r(
              "false,(",
              Ze(Fr, function(er) {
                return lr + "[" + er + "]=" + C[er];
              }),
              ",",
              lr,
              ")"
            ) : r(
              "false,(Array.isArray(",
              C,
              ")||",
              C,
              " instanceof Float32Array)?",
              C,
              ":(",
              Ze(Fr, function(er) {
                return lr + "[" + er + "]=" + C + "[" + er + "]";
              }),
              ",",
              lr,
              ")"
            ), r(");");
          } else if (Te > 1) {
            for (var ur = [], br = [], Dr = 0; Dr < Te; ++Dr)
              Array.isArray(C) ? br.push(C[Dr]) : br.push(r.def(C + "[" + Dr + "]")), d && ur.push(r.def());
            d && r("if(!", a.batchId, "||", ur.map(function(er, Nr) {
              return er + "!==" + br[Nr];
            }).join("||"), "){", ur.map(function(er, Nr) {
              return er + "=" + br[Nr] + ";";
            }).join("")), r(m, ".uniform", u, "(", Z, ",", br.join(","), ");"), d && r("}");
          } else {
            if (n(!Array.isArray(C), "uniform value must not be an array"), d) {
              var sf = r.def();
              r(
                "if(!",
                a.batchId,
                "||",
                sf,
                "!==",
                C,
                "){",
                sf,
                "=",
                C,
                ";"
              );
            }
            r(m, ".uniform", u, "(", Z, ",", C, ");"), d && r("}");
          }
        }
      }
      function ie(a, r, c, h) {
        var p = a.shared, d = p.gl, l = p.draw, m = h.draw;
        function i() {
          var te = m.elements, re, oe = r;
          return te ? ((te.contextDep && h.contextDynamic || te.propDep) && (oe = c), re = te.append(a, oe), m.elementsActive && oe(
            "if(" + re + ")" + d + ".bindBuffer(" + $n + "," + re + ".buffer.buffer);"
          )) : (re = oe.def(), oe(
            re,
            "=",
            l,
            ".",
            Lr,
            ";",
            "if(",
            re,
            "){",
            d,
            ".bindBuffer(",
            $n,
            ",",
            re,
            ".buffer.buffer);}",
            "else if(",
            p.vao,
            ".currentVAO){",
            re,
            "=",
            a.shared.elements + ".getElements(" + p.vao,
            ".currentVAO.elements);",
            F ? "" : "if(" + re + ")" + d + ".bindBuffer(" + $n + "," + re + ".buffer.buffer);",
            "}"
          )), re;
        }
        function u() {
          var te = m.count, re, oe = r;
          return te ? ((te.contextDep && h.contextDynamic || te.propDep) && (oe = c), re = te.append(a, oe), n.optional(function() {
            te.MISSING && a.assert(r, "false", "missing vertex count"), te.DYNAMIC && a.assert(oe, re + ">=0", "missing vertex count");
          })) : (re = oe.def(l, ".", Rr), n.optional(function() {
            a.assert(oe, re + ">=0", "missing vertex count");
          })), re;
        }
        var f = i();
        function b(te) {
          var re = m[te];
          return re ? re.contextDep && h.contextDynamic || re.propDep ? re.append(a, c) : re.append(a, r) : r.def(l, ".", te);
        }
        var _ = b(Or), w = b(It), G = u();
        if (typeof G == "number") {
          if (G === 0)
            return;
        } else
          c("if(", G, "){"), c.exit("}");
        var j, ue;
        P && (j = b(Pt), ue = a.instancing);
        var ne = f + ".type", Z = m.elements && _r(m.elements) && !m.vaoActive;
        function C() {
          function te() {
            c(ue, ".drawElementsInstancedANGLE(", [
              _,
              G,
              ne,
              w + "<<((" + ne + "-" + wi + ")>>1)",
              j
            ], ");");
          }
          function re() {
            c(
              ue,
              ".drawArraysInstancedANGLE(",
              [_, w, G, j],
              ");"
            );
          }
          f && f !== "null" ? Z ? te() : (c("if(", f, "){"), te(), c("}else{"), re(), c("}")) : re();
        }
        function S() {
          function te() {
            c(d + ".drawElements(" + [
              _,
              G,
              ne,
              w + "<<((" + ne + "-" + wi + ")>>1)"
            ] + ");");
          }
          function re() {
            c(d + ".drawArrays(" + [_, w, G] + ");");
          }
          f && f !== "null" ? Z ? te() : (c("if(", f, "){"), te(), c("}else{"), re(), c("}")) : re();
        }
        P && (typeof j != "number" || j >= 0) ? typeof j == "string" ? (c("if(", j, ">0){"), C(), c("}else if(", j, "<0){"), S(), c("}")) : C() : S();
      }
      function pe(a, r, c, h, p) {
        var d = se(), l = d.proc("body", p);
        return n.optional(function() {
          d.commandStr = r.commandStr, d.command = d.link(r.commandStr);
        }), P && (d.instancing = l.def(
          d.shared.extensions,
          ".angle_instanced_arrays"
        )), a(d, l, c, h), d.compile().body;
      }
      function Ee(a, r, c, h) {
        Ce(a, r), c.useVAO ? c.drawVAO ? r(a.shared.vao, ".setVAO(", c.drawVAO.append(a, r), ");") : r(a.shared.vao, ".setVAO(", a.shared.vao, ".targetVAO);") : (r(a.shared.vao, ".setVAO(null);"), He(a, r, c, h.attributes, function() {
          return !0;
        })), Ae(a, r, c, h.uniforms, function() {
          return !0;
        }, !1), ie(a, r, r, c);
      }
      function Fe(a, r) {
        var c = a.proc("draw", 1);
        Ce(a, c), Pe(a, c, r.context), ke(a, c, r.framebuffer), Ve(a, c, r), Xe(a, c, r.state), de(a, c, r, !1, !0);
        var h = r.shader.progVar.append(a, c);
        if (c(a.shared.gl, ".useProgram(", h, ".program);"), r.shader.program)
          Ee(a, c, r, r.shader.program);
        else {
          c(a.shared.vao, ".setVAO(null);");
          var p = a.global.def("{}"), d = c.def(h, ".id"), l = c.def(p, "[", d, "]");
          c(
            a.cond(l).then(l, ".call(this,a0);").else(
              l,
              "=",
              p,
              "[",
              d,
              "]=",
              a.link(function(m) {
                return pe(Ee, a, r, m, 1);
              }),
              "(",
              h,
              ");",
              l,
              ".call(this,a0);"
            )
          );
        }
        Object.keys(r.state).length > 0 && c(a.shared.current, ".dirty=true;"), a.shared.vao && c(a.shared.vao, ".setVAO(null);");
      }
      function or(a, r, c, h) {
        a.batchId = "a1", Ce(a, r);
        function p() {
          return !0;
        }
        He(a, r, c, h.attributes, p), Ae(a, r, c, h.uniforms, p, !1), ie(a, r, r, c);
      }
      function Cr(a, r, c, h) {
        Ce(a, r);
        var p = c.contextDep, d = r.def(), l = "a0", m = "a1", i = r.def();
        a.shared.props = i, a.batchId = d;
        var u = a.scope(), f = a.scope();
        r(
          u.entry,
          "for(",
          d,
          "=0;",
          d,
          "<",
          m,
          ";++",
          d,
          "){",
          i,
          "=",
          l,
          "[",
          d,
          "];",
          f,
          "}",
          u.exit
        );
        function b(ne) {
          return ne.contextDep && p || ne.propDep;
        }
        function _(ne) {
          return !b(ne);
        }
        if (c.needsContext && Pe(a, f, c.context), c.needsFramebuffer && ke(a, f, c.framebuffer), Xe(a, f, c.state, b), c.profile && b(c.profile) && de(a, f, c, !1, !0), h)
          c.useVAO ? c.drawVAO ? b(c.drawVAO) ? f(a.shared.vao, ".setVAO(", c.drawVAO.append(a, f), ");") : u(a.shared.vao, ".setVAO(", c.drawVAO.append(a, u), ");") : u(a.shared.vao, ".setVAO(", a.shared.vao, ".targetVAO);") : (u(a.shared.vao, ".setVAO(null);"), He(a, u, c, h.attributes, _), He(a, f, c, h.attributes, b)), Ae(a, u, c, h.uniforms, _, !1), Ae(a, f, c, h.uniforms, b, !0), ie(a, u, f, c);
        else {
          var w = a.global.def("{}"), G = c.shader.progVar.append(a, f), j = f.def(G, ".id"), ue = f.def(w, "[", j, "]");
          f(
            a.shared.gl,
            ".useProgram(",
            G,
            ".program);",
            "if(!",
            ue,
            "){",
            ue,
            "=",
            w,
            "[",
            j,
            "]=",
            a.link(function(ne) {
              return pe(
                or,
                a,
                c,
                ne,
                2
              );
            }),
            "(",
            G,
            ");}",
            ue,
            ".call(this,a0[",
            d,
            "],",
            d,
            ");"
          );
        }
      }
      function o(a, r) {
        var c = a.proc("batch", 2);
        a.batchId = "0", Ce(a, c);
        var h = !1, p = !0;
        Object.keys(r.context).forEach(function(w) {
          h = h || r.context[w].propDep;
        }), h || (Pe(a, c, r.context), p = !1);
        var d = r.framebuffer, l = !1;
        d ? (d.propDep ? h = l = !0 : d.contextDep && h && (l = !0), l || ke(a, c, d)) : ke(a, c, null), r.state.viewport && r.state.viewport.propDep && (h = !0);
        function m(w) {
          return w.contextDep && h || w.propDep;
        }
        Ve(a, c, r), Xe(a, c, r.state, function(w) {
          return !m(w);
        }), (!r.profile || !m(r.profile)) && de(a, c, r, !1, "a1"), r.contextDep = h, r.needsContext = p, r.needsFramebuffer = l;
        var i = r.shader.progVar;
        if (i.contextDep && h || i.propDep)
          Cr(
            a,
            c,
            r,
            null
          );
        else {
          var u = i.append(a, c);
          if (c(a.shared.gl, ".useProgram(", u, ".program);"), r.shader.program)
            Cr(
              a,
              c,
              r,
              r.shader.program
            );
          else {
            c(a.shared.vao, ".setVAO(null);");
            var f = a.global.def("{}"), b = c.def(u, ".id"), _ = c.def(f, "[", b, "]");
            c(
              a.cond(_).then(_, ".call(this,a0,a1);").else(
                _,
                "=",
                f,
                "[",
                b,
                "]=",
                a.link(function(w) {
                  return pe(Cr, a, r, w, 2);
                }),
                "(",
                u,
                ");",
                _,
                ".call(this,a0,a1);"
              )
            );
          }
        }
        Object.keys(r.state).length > 0 && c(a.shared.current, ".dirty=true;"), a.shared.vao && c(a.shared.vao, ".setVAO(null);");
      }
      function A(a, r) {
        var c = a.proc("scope", 3);
        a.batchId = "a2";
        var h = a.shared, p = h.current;
        Pe(a, c, r.context), r.framebuffer && r.framebuffer.append(a, c), rf(Object.keys(r.state)).forEach(function(l) {
          var m = r.state[l], i = m.append(a, c);
          Se(i) ? i.forEach(function(u, f) {
            c.set(a.next[l], "[" + f + "]", u);
          }) : c.set(h.next, "." + l, i);
        }), de(a, c, r, !0, !0), [Lr, It, Rr, Pt, Or].forEach(
          function(l) {
            var m = r.draw[l];
            m && c.set(h.draw, "." + l, "" + m.append(a, c));
          }
        ), Object.keys(r.uniforms).forEach(function(l) {
          var m = r.uniforms[l].append(a, c);
          Array.isArray(m) && (m = "[" + m.join() + "]"), c.set(
            h.uniforms,
            "[" + t.id(l) + "]",
            m
          );
        }), Object.keys(r.attributes).forEach(function(l) {
          var m = r.attributes[l].append(a, c), i = a.scopeAttrib(l);
          Object.keys(new v()).forEach(function(u) {
            c.set(i, "." + u, m[u]);
          });
        }), r.scopeVAO && c.set(h.vao, ".targetVAO", r.scopeVAO.append(a, c));
        function d(l) {
          var m = r.shader[l];
          m && c.set(h.shader, "." + l, m.append(a, c));
        }
        d(ft), d(ot), Object.keys(r.state).length > 0 && (c(p, ".dirty=true;"), c.exit(p, ".dirty=true;")), c("a1(", a.shared.context, ",a0,", a.batchId, ");");
      }
      function y(a) {
        if (!(typeof a != "object" || Se(a))) {
          for (var r = Object.keys(a), c = 0; c < r.length; ++c)
            if (Ke.isDynamic(a[r[c]]))
              return !0;
          return !1;
        }
      }
      function J(a, r, c) {
        var h = r.static[c];
        if (!h || !y(h))
          return;
        var p = a.global, d = Object.keys(h), l = !1, m = !1, i = !1, u = a.global.def("{}");
        d.forEach(function(b) {
          var _ = h[b];
          if (Ke.isDynamic(_)) {
            typeof _ == "function" && (_ = h[b] = Ke.unbox(_));
            var w = Ye(_, null);
            l = l || w.thisDep, i = i || w.propDep, m = m || w.contextDep;
          } else {
            switch (p(u, ".", b, "="), typeof _) {
              case "number":
                p(_);
                break;
              case "string":
                p('"', _, '"');
                break;
              case "object":
                Array.isArray(_) && p("[", _.join(), "]");
                break;
              default:
                p(a.link(_));
                break;
            }
            p(";");
          }
        });
        function f(b, _) {
          d.forEach(function(w) {
            var G = h[w];
            if (Ke.isDynamic(G)) {
              var j = b.invoke(_, G);
              _(u, ".", w, "=", j, ";");
            }
          });
        }
        r.dynamic[c] = new Ke.DynamicVariable(Nt, {
          thisDep: l,
          contextDep: m,
          propDep: i,
          ref: u,
          append: f
        }), delete r.static[c];
      }
      function he(a, r, c, h, p) {
        var d = se();
        d.stats = d.link(p), Object.keys(r.static).forEach(function(m) {
          J(d, r, m);
        }), Ts.forEach(function(m) {
          J(d, a, m);
        });
        var l = Be(a, r, c, h, d);
        return Fe(d, l), A(d, l), o(d, l), ye(d.compile(), {
          destroy: function() {
            l.shader.program.destroy();
          }
        });
      }
      return {
        next: W,
        current: Q,
        procs: function() {
          var a = se(), r = a.proc("poll"), c = a.proc("refresh"), h = a.block();
          r(h), c(h);
          var p = a.shared, d = p.gl, l = p.next, m = p.current;
          h(m, ".dirty=false;"), ke(a, r), ke(a, c, null, !0);
          var i;
          P && (i = a.link(P)), s.oes_vertex_array_object && c(a.link(s.oes_vertex_array_object), ".bindVertexArrayOES(null);");
          for (var u = 0; u < x.maxAttributes; ++u) {
            var f = c.def(p.attributes, "[", u, "]"), b = a.cond(f, ".buffer");
            b.then(
              d,
              ".enableVertexAttribArray(",
              u,
              ");",
              d,
              ".bindBuffer(",
              Qr,
              ",",
              f,
              ".buffer.buffer);",
              d,
              ".vertexAttribPointer(",
              u,
              ",",
              f,
              ".size,",
              f,
              ".type,",
              f,
              ".normalized,",
              f,
              ".stride,",
              f,
              ".offset);"
            ).else(
              d,
              ".disableVertexAttribArray(",
              u,
              ");",
              d,
              ".vertexAttrib4f(",
              u,
              ",",
              f,
              ".x,",
              f,
              ".y,",
              f,
              ".z,",
              f,
              ".w);",
              f,
              ".buffer=null;"
            ), c(b), P && c(
              i,
              ".vertexAttribDivisorANGLE(",
              u,
              ",",
              f,
              ".divisor);"
            );
          }
          return c(
            a.shared.vao,
            ".currentVAO=null;",
            a.shared.vao,
            ".setVAO(",
            a.shared.vao,
            ".targetVAO);"
          ), Object.keys(R).forEach(function(_) {
            var w = R[_], G = h.def(l, ".", _), j = a.block();
            j(
              "if(",
              G,
              "){",
              d,
              ".enable(",
              w,
              ")}else{",
              d,
              ".disable(",
              w,
              ")}",
              m,
              ".",
              _,
              "=",
              G,
              ";"
            ), c(j), r(
              "if(",
              G,
              "!==",
              m,
              ".",
              _,
              "){",
              j,
              "}"
            );
          }), Object.keys(L).forEach(function(_) {
            var w = L[_], G = Q[_], j, ue, ne = a.block();
            if (ne(d, ".", w, "("), Se(G)) {
              var Z = G.length;
              j = a.global.def(l, ".", _), ue = a.global.def(m, ".", _), ne(
                Ze(Z, function(C) {
                  return j + "[" + C + "]";
                }),
                ");",
                Ze(Z, function(C) {
                  return ue + "[" + C + "]=" + j + "[" + C + "];";
                }).join("")
              ), r(
                "if(",
                Ze(Z, function(C) {
                  return j + "[" + C + "]!==" + ue + "[" + C + "]";
                }).join("||"),
                "){",
                ne,
                "}"
              );
            } else
              j = h.def(l, ".", _), ue = h.def(m, ".", _), ne(
                j,
                ");",
                m,
                ".",
                _,
                "=",
                j,
                ";"
              ), r(
                "if(",
                j,
                "!==",
                ue,
                "){",
                ne,
                "}"
              );
            c(ne);
          }), a.compile();
        }(),
        compile: he
      };
    }
    function js() {
      return {
        vaoCount: 0,
        bufferCount: 0,
        elementsCount: 0,
        framebufferCount: 0,
        shaderCount: 0,
        textureCount: 0,
        cubeCount: 0,
        renderbufferCount: 0,
        maxTextureUnits: 0
      };
    }
    var Xs = 34918, Hs = 34919, nf = 35007, $s = function(e, t) {
      if (!t.ext_disjoint_timer_query)
        return null;
      var s = [];
      function x() {
        return s.pop() || t.ext_disjoint_timer_query.createQueryEXT();
      }
      function O(P) {
        s.push(P);
      }
      var E = [];
      function g(P) {
        var K = x();
        t.ext_disjoint_timer_query.beginQueryEXT(nf, K), E.push(K), B(E.length - 1, E.length, P);
      }
      function N() {
        t.ext_disjoint_timer_query.endQueryEXT(nf);
      }
      function D() {
        this.startQueryIndex = -1, this.endQueryIndex = -1, this.sum = 0, this.stats = null;
      }
      var M = [];
      function V() {
        return M.pop() || new D();
      }
      function U(P) {
        M.push(P);
      }
      var X = [];
      function B(P, K, F) {
        var Q = V();
        Q.startQueryIndex = P, Q.endQueryIndex = K, Q.sum = 0, Q.stats = F, X.push(Q);
      }
      var k = [], v = [];
      function T() {
        var P, K, F = E.length;
        if (F !== 0) {
          v.length = Math.max(v.length, F + 1), k.length = Math.max(k.length, F + 1), k[0] = 0, v[0] = 0;
          var Q = 0;
          for (P = 0, K = 0; K < E.length; ++K) {
            var W = E[K];
            t.ext_disjoint_timer_query.getQueryObjectEXT(W, Hs) ? (Q += t.ext_disjoint_timer_query.getQueryObjectEXT(W, Xs), O(W)) : E[P++] = W, k[K + 1] = Q, v[K + 1] = P;
          }
          for (E.length = P, P = 0, K = 0; K < X.length; ++K) {
            var ae = X[K], R = ae.startQueryIndex, L = ae.endQueryIndex;
            ae.sum += k[L] - k[R];
            var ee = v[R], H = v[L];
            H === ee ? (ae.stats.gpuTime += ae.sum / 1e6, U(ae)) : (ae.startQueryIndex = ee, ae.endQueryIndex = H, X[P++] = ae);
          }
          X.length = P;
        }
      }
      return {
        beginQuery: g,
        endQuery: N,
        pushScopeStats: B,
        update: T,
        getNumPendingQueries: function() {
          return E.length;
        },
        clear: function() {
          s.push.apply(s, E);
          for (var P = 0; P < s.length; P++)
            t.ext_disjoint_timer_query.deleteQueryEXT(s[P]);
          E.length = 0, s.length = 0;
        },
        restore: function() {
          E.length = 0, s.length = 0;
        }
      };
    }, zs = 16384, Ws = 256, Ys = 1024, Qs = 34962, af = "webglcontextlost", ff = "webglcontextrestored", of = 1, qs = 2, Ks = 3;
    function uf(e, t) {
      for (var s = 0; s < e.length; ++s)
        if (e[s] === t)
          return s;
      return -1;
    }
    function Zs(e) {
      var t = Qf(e);
      if (!t)
        return null;
      var s = t.gl, x = s.getContextAttributes(), O = s.isContextLost(), E = qf(s, t);
      if (!E)
        return null;
      var g = Hf(), N = js(), D = E.extensions, M = $s(s, D), V = va(), U = s.drawingBufferWidth, X = s.drawingBufferHeight, B = {
        tick: 0,
        time: 0,
        viewportWidth: U,
        viewportHeight: X,
        framebufferWidth: U,
        framebufferHeight: X,
        drawingBufferWidth: U,
        drawingBufferHeight: X,
        pixelRatio: t.pixelRatio
      }, k = {}, v = {
        elements: null,
        primitive: 4,
        // GL_TRIANGLES
        count: -1,
        offset: 0,
        instances: -1
      }, T = ko(s, D), P = eu(
        s,
        N,
        t,
        Q
      ), K = du(s, D, P, N), F = ds(
        s,
        D,
        T,
        N,
        P,
        K,
        v
      );
      function Q(ie) {
        return F.destroyBuffer(ie);
      }
      var W = ps(s, g, N, t), ae = Xu(
        s,
        D,
        T,
        function() {
          ee.procs.poll();
        },
        B,
        N,
        t
      ), R = Hu(s, D, T, N, t), L = cs(
        s,
        D,
        T,
        ae,
        R,
        N
      ), ee = Vs(
        s,
        g,
        D,
        T,
        P,
        K,
        ae,
        L,
        k,
        F,
        W,
        v,
        B,
        M,
        t
      ), H = ys(
        s,
        L,
        ee.procs.poll,
        B,
        x,
        D,
        T
      ), I = ee.next, $ = s.canvas, z = [], ce = [], se = [], Y = [t.onDestroy], q = null;
      function fe() {
        if (z.length === 0) {
          M && M.update(), q = null;
          return;
        }
        q = en.next(fe), Xe();
        for (var ie = z.length - 1; ie >= 0; --ie) {
          var pe = z[ie];
          pe && pe(B, null, 0);
        }
        s.flush(), M && M.update();
      }
      function le() {
        !q && z.length > 0 && (q = en.next(fe));
      }
      function ve() {
        q && (en.cancel(fe), q = null);
      }
      function we(ie) {
        ie.preventDefault(), O = !0, ve(), ce.forEach(function(pe) {
          pe();
        });
      }
      function Le(ie) {
        s.getError(), O = !1, E.restore(), W.restore(), P.restore(), ae.restore(), R.restore(), L.restore(), F.restore(), M && M.restore(), ee.procs.refresh(), le(), se.forEach(function(pe) {
          pe();
        });
      }
      $ && ($.addEventListener(af, we, !1), $.addEventListener(ff, Le, !1));
      function be() {
        z.length = 0, ve(), $ && ($.removeEventListener(af, we), $.removeEventListener(ff, Le)), W.clear(), L.clear(), R.clear(), F.clear(), ae.clear(), K.clear(), P.clear(), M && M.clear(), Y.forEach(function(ie) {
          ie();
        });
      }
      function Ie(ie) {
        n(!!ie, "invalid args to regl({...})"), n.type(ie, "object", "invalid args to regl({...})");
        function pe(p) {
          var d = ye({}, p);
          delete d.uniforms, delete d.attributes, delete d.context, delete d.vao, "stencil" in d && d.stencil.op && (d.stencil.opBack = d.stencil.opFront = d.stencil.op, delete d.stencil.op);
          function l(m) {
            if (m in d) {
              var i = d[m];
              delete d[m], Object.keys(i).forEach(function(u) {
                d[m + "." + u] = i[u];
              });
            }
          }
          return l("blend"), l("depth"), l("cull"), l("stencil"), l("polygonOffset"), l("scissor"), l("sample"), "vao" in p && (d.vao = p.vao), d;
        }
        function Ee(p, d) {
          var l = {}, m = {};
          return Object.keys(p).forEach(function(i) {
            var u = p[i];
            if (Ke.isDynamic(u)) {
              m[i] = Ke.unbox(u, i);
              return;
            } else if (d && Array.isArray(u)) {
              for (var f = 0; f < u.length; ++f)
                if (Ke.isDynamic(u[f])) {
                  m[i] = Ke.unbox(u, i);
                  return;
                }
            }
            l[i] = u;
          }), {
            dynamic: m,
            static: l
          };
        }
        var Fe = Ee(ie.context || {}, !0), or = Ee(ie.uniforms || {}, !0), Cr = Ee(ie.attributes || {}, !1), o = Ee(pe(ie), !1), A = {
          gpuTime: 0,
          cpuTime: 0,
          count: 0
        }, y = ee.compile(o, Cr, or, Fe, A), J = y.draw, he = y.batch, a = y.scope, r = [];
        function c(p) {
          for (; r.length < p; )
            r.push(null);
          return r;
        }
        function h(p, d) {
          var l;
          if (O && n.raise("context lost"), typeof p == "function")
            return a.call(this, null, p, 0);
          if (typeof d == "function")
            if (typeof p == "number")
              for (l = 0; l < p; ++l)
                a.call(this, null, d, l);
            else if (Array.isArray(p))
              for (l = 0; l < p.length; ++l)
                a.call(this, p[l], d, l);
            else
              return a.call(this, p, d, 0);
          else if (typeof p == "number") {
            if (p > 0)
              return he.call(this, c(p | 0), p | 0);
          } else if (Array.isArray(p)) {
            if (p.length)
              return he.call(this, p, p.length);
          } else
            return J.call(this, p);
        }
        return ye(h, {
          stats: A,
          destroy: function() {
            y.destroy();
          }
        });
      }
      var ge = L.setFBO = Ie({
        framebuffer: Ke.define.call(null, of, "framebuffer")
      });
      function Be(ie, pe) {
        var Ee = 0;
        ee.procs.poll();
        var Fe = pe.color;
        Fe && (s.clearColor(+Fe[0] || 0, +Fe[1] || 0, +Fe[2] || 0, +Fe[3] || 0), Ee |= zs), "depth" in pe && (s.clearDepth(+pe.depth), Ee |= Ws), "stencil" in pe && (s.clearStencil(pe.stencil | 0), Ee |= Ys), n(!!Ee, "called regl.clear with no buffer specified"), s.clear(Ee);
      }
      function Pe(ie) {
        if (n(
          typeof ie == "object" && ie,
          "regl.clear() takes an object as input"
        ), "framebuffer" in ie)
          if (ie.framebuffer && ie.framebuffer_reglType === "framebufferCube")
            for (var pe = 0; pe < 6; ++pe)
              ge(ye({
                framebuffer: ie.framebuffer.faces[pe]
              }, ie), Be);
          else
            ge(ie, Be);
        else
          Be(null, ie);
      }
      function ke(ie) {
        n.type(ie, "function", "regl.frame() callback must be a function"), z.push(ie);
        function pe() {
          var Ee = uf(z, ie);
          n(Ee >= 0, "cannot cancel a frame twice");
          function Fe() {
            var or = uf(z, Fe);
            z[or] = z[z.length - 1], z.length -= 1, z.length <= 0 && ve();
          }
          z[Ee] = Fe;
        }
        return le(), {
          cancel: pe
        };
      }
      function Ve() {
        var ie = I.viewport, pe = I.scissor_box;
        ie[0] = ie[1] = pe[0] = pe[1] = 0, B.viewportWidth = B.framebufferWidth = B.drawingBufferWidth = ie[2] = pe[2] = s.drawingBufferWidth, B.viewportHeight = B.framebufferHeight = B.drawingBufferHeight = ie[3] = pe[3] = s.drawingBufferHeight;
      }
      function Xe() {
        B.tick += 1, B.time = de(), Ve(), ee.procs.poll();
      }
      function Ce() {
        ae.refresh(), Ve(), ee.procs.refresh(), M && M.update();
      }
      function de() {
        return (va() - V) / 1e3;
      }
      Ce();
      function He(ie, pe) {
        n.type(pe, "function", "listener callback must be a function");
        var Ee;
        switch (ie) {
          case "frame":
            return ke(pe);
          case "lost":
            Ee = ce;
            break;
          case "restore":
            Ee = se;
            break;
          case "destroy":
            Ee = Y;
            break;
          default:
            n.raise("invalid event, must be one of frame,lost,restore,destroy");
        }
        return Ee.push(pe), {
          cancel: function() {
            for (var Fe = 0; Fe < Ee.length; ++Fe)
              if (Ee[Fe] === pe) {
                Ee[Fe] = Ee[Ee.length - 1], Ee.pop();
                return;
              }
          }
        };
      }
      var Ae = ye(Ie, {
        // Clear current FBO
        clear: Pe,
        // Short cuts for dynamic variables
        prop: Ke.define.bind(null, of),
        context: Ke.define.bind(null, qs),
        this: Ke.define.bind(null, Ks),
        // executes an empty draw command
        draw: Ie({}),
        // Resources
        buffer: function(ie) {
          return P.create(ie, Qs, !1, !1);
        },
        elements: function(ie) {
          return K.create(ie, !1);
        },
        texture: ae.create2D,
        cube: ae.createCube,
        renderbuffer: R.create,
        framebuffer: L.create,
        framebufferCube: L.createCube,
        vao: F.createVAO,
        // Expose context attributes
        attributes: x,
        // Frame rendering
        frame: ke,
        on: He,
        // System limits
        limits: T,
        hasExtension: function(ie) {
          return T.extensions.indexOf(ie.toLowerCase()) >= 0;
        },
        // Read pixels
        read: H,
        // Destroy regl and all associated resources
        destroy: be,
        // Direct GL state manipulation
        _gl: s,
        _refresh: Ce,
        poll: function() {
          Xe(), M && M.update();
        },
        // Current time
        now: de,
        // regl Statistics Information
        stats: N
      });
      return t.onDone(null, Ae), Ae;
    }
    return Zs;
  });
})(lf);
var nc = lf.exports;
const ac = /* @__PURE__ */ tc(nc);
var ic = `precision mediump float;
uniform vec4 color;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float rows;
uniform float total_textures;
uniform vec2 vignete;
varying vec2 vUv;
uniform sampler2D tex;
uniform sampler2D text_tex;

uniform float tethaYOffset;
uniform float animateXOffset;
uniform float marginOffset;
uniform float fisheye_value;

#define PI 3.1415926535897932384626433832795

vec2 fisheye(vec2 uv, float k, float rows) {
  float r = length(uv);
  if(fisheye_value < 0.0) return uv;
  if(r < 0.14) return uv * mix(1.0, 0.14, fisheye_value);
  float theta = atan((1.0 + tethaYOffset * fisheye_value) * uv.y, uv.x);
  float radius = mix(r, (1.0 / cos(r*PI/3.0)) - 1.0, fisheye_value);
  vec2 uvf = radius * vec2(cos(theta), sin(theta));
  return mix(uvf, uv * (1.0 - animateXOffset), max(0.0, min(1.0, r)));
}

float round(float x) {
  return floor(x + 0.5);
}

vec2 round(vec2 x) {
  return floor(x + 0.5);
}

vec3 round(vec3 x) {
  return floor(x + 0.5);
}

vec4 round(vec4 x) {
  return floor(x + 0.5);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
  vec2 fuv = -1.0 + vUv * 2.0;
  vec2 uv = vUv + vec2(time, 0);
  float aspect_ratio = resolution.x / resolution.y;
  uv.x *= aspect_ratio;
  float division = 1.0 / rows;

  float k = 2.0;
  uv = fisheye(uv - mouse, k, rows) + mouse; 

  float margin_v = 1.0 + marginOffset;
  vec2 pattern_uv = mod(uv, division);
  float circle_fade = 1.0 - max(min(distance(pattern_uv * (0.5 / division) + (division - 0.25), vec2(division)) * 4.0 * margin_v, 1.0), 0.0);
  
  vec2 texture_coord = vec2((pattern_uv)* (1.0 / division) * margin_v - mod(margin_v + 1.0, 2.0) * 0.5);
  vec2 texture_index = floor(((uv) * (((total_textures * 2.0)) / division)) / (total_textures * 2.0));
  float texture_index_rand = floor(random(texture_index) * (total_textures * 20.0));
  texture_coord.x *= (1.0 / (total_textures));
  texture_coord.x += mod(texture_index_rand, total_textures) * (1.0 / total_textures);

  vec4 uv_color = texture2D(tex, texture_coord);
  vec4 uv_text = texture2D(text_tex, texture_coord);
  float circle_mask = min(circle_fade * 20.0, 1.0);

  float vignete_mask = smoothstep(vignete.x, vignete.y, vUv.y) * smoothstep(vignete.x, vignete.y, 1.0 - vUv.y);

  vec4 final_color = mix(uv_color, uv_text, (1.0 - step(division * 0.5, distance(uv, mouse))) * uv_text.a * 0.8 * (fisheye_value));
  gl_FragColor = final_color * circle_mask * vignete_mask;
}`, fc = `precision mediump float;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = vec2(position.x * 0.5 + 0.5, 1.0 - position.y * 0.5 - 0.5);
  gl_Position = vec4(position, 0, 1);
}`;
class uc {
  constructor(me, _e) {
    Oe(this, "regl");
    Oe(this, "target");
    Oe(this, "rows", 20);
    Oe(this, "entries");
    Oe(this, "resolution", [1, 1]);
    Oe(this, "mouse", [0, 0]);
    Oe(this, "mouseTarget", [0, 0]);
    Oe(this, "fisheye", 0);
    Oe(this, "fisheyeTarget", 0);
    Oe(this, "maxFPS", 120);
    Oe(this, "spriteSheet", null);
    Oe(this, "textSpriteSheet", null);
    Oe(this, "resizeObserver", null);
    Oe(this, "tethaYOffset", 0.2);
    Oe(this, "animateXOffset", 0);
    Oe(this, "lerpFactor", 0.2);
    Oe(this, "marginOffset", 0.4);
    Oe(this, "shouldUpdateMouse", !0);
    Oe(this, "isMobile", !1);
    Oe(this, "isFirstMovement", !0);
    Oe(this, "onMouseMove", (me) => {
      this.isFirstMovement && (this.fisheyeTarget = 1, this.shouldUpdateMouse = !0, this.isFirstMovement = !1), this.shouldUpdateMouse && (this.mouseTarget = this.calculateMousePosition(me), me.type === "click" && this.isMobile && this.fisheye > 0.96 && this.isMousePositionRange(me, 2) && (this.fisheyeTarget = 0));
    });
    Oe(this, "onResize", (me) => {
      setTimeout(() => {
        const { width: _e, height: ye } = me[0].contentRect;
        this.resolution = [_e, ye], this.regl.poll();
      }, 10);
    });
    Oe(this, "init", async () => {
      const me = await Promise.all(this.entries.map((xe) => {
        const ze = new Image();
        return ze.src = xe.imageUrl, new Promise((qt) => ze.onload = () => qt(ze));
      })), _e = document.createElement("canvas"), ye = _e.getContext("2d");
      _e.width = me[0].width * me.length, _e.height = me[0].height, me.forEach((xe, ze) => {
        ye.drawImage(xe, ze * xe.width, 0);
      }), this.spriteSheet = this.regl.texture(_e);
      const Ge = document.createElement("canvas"), Re = Ge.getContext("2d");
      Re.imageSmoothingEnabled = !0, Re.imageSmoothingQuality = "high", Re.globalCompositeOperation = "source-over";
      const Ue = 4;
      Ge.width = me[0].width * me.length * Ue, Ge.height = me[0].height * Ue, Re.fillStyle = "#222222", Re.fillRect(0, 0, Ge.width, Ge.height), Re.textAlign = "center", Re.textBaseline = "middle", this.entries.forEach((xe, ze) => {
        Re.fillStyle = "#ffffff", Re.font = "80px sans-serif", Re.fillText(xe.title, ze * me[0].width * Ue + me[0].width * 2, me[0].height * 2 - 10), Re.fillStyle = "#bbbbbb", Re.font = "40px sans-serif", Re.fillText(xe.description, ze * me[0].width * Ue + me[0].width * 2, me[0].height * 2 + 70);
      }), Re.filter = "blur(1px)", Re.drawImage(Ge, 0, 0, Ge.width, Ge.height), this.textSpriteSheet = this.regl.texture(Ge), this.setupEventListeners(), this.render(), this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.target);
    });
    Oe(this, "render", () => {
      performance.mark("start"), this.updateMousePosition(), this.updateFisheye(), this.regl.clear({
        color: [0, 0, 0, 1],
        depth: 1
      }), this.regl({
        frag: ic,
        vert: fc,
        attributes: {
          position: [
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
            [-1, 1]
          ]
        },
        uniforms: {
          color: [1, 0, 0, 1],
          rows: this.rows,
          tex: this.spriteSheet,
          text_tex: this.textSpriteSheet,
          resolution: this.resolution,
          mouse: this.mouse,
          total_textures: this.entries.length,
          time: 0,
          vignete: [0, 0.2],
          tethaYOffset: this.tethaYOffset,
          animateXOffset: this.animateXOffset,
          marginOffset: this.marginOffset,
          fisheye_value: this.fisheye
        },
        count: 6
      })(), performance.mark("end"), performance.measure("render", "start", "end");
      const me = performance.getEntriesByName("render")[0].duration, _e = Math.max(0, 1e3 / this.maxFPS - me);
      setTimeout(() => {
        requestAnimationFrame(() => this.render());
      }, _e);
    });
    if (_e.length === 0)
      throw new Error("No entries provided");
    this.regl = ac(me), this.target = me, this.entries = _e, this.resolution = [me.clientWidth, me.clientHeight], this.init();
  }
  setupEventListeners() {
    this.target.style.touchAction = "none", this.target.addEventListener("touchstart", () => {
      this.fisheyeTarget = 1, this.isMobile = !0;
    }, { passive: !0 }), this.target.addEventListener("touchmove", (me) => {
      this.fisheyeTarget = 1, this.onMouseMove({ clientX: me.touches[0].clientX, clientY: me.touches[0].clientY });
    }, { passive: !0 }), this.target.addEventListener("mousemove", this.onMouseMove), this.target.addEventListener("mouseleave", () => this.shouldUpdateMouse && (this.fisheyeTarget = 0)), this.target.addEventListener("mouseenter", () => this.fisheyeTarget = 1), this.target.addEventListener("click", (me) => {
      this.shouldUpdateMouse = this.isMobile || !this.shouldUpdateMouse, this.onMouseMove(me);
    });
  }
  calculateMousePosition(me) {
    const _e = this.resolution[0] / this.resolution[1], ye = 1 / this.rows, Ge = this.target.getBoundingClientRect(), Re = me.clientX - Ge.left, Ue = me.clientY - Ge.top;
    return [Re / this.resolution[0] * _e, Ue / this.resolution[1]].map((xe) => Math.floor(xe * this.rows) * ye + ye * 0.5);
  }
  isMousePositionRange(me, _e) {
    const ye = this.calculateMousePosition(me), Ge = 1 / this.rows, Re = this.mouse.map((Ue) => [Ue - Ge * _e, Ue + Ge * _e]);
    return Re[0][0] <= ye[0] && ye[0] <= Re[0][1] && Re[1][0] <= ye[1] && ye[1] <= Re[1][1];
  }
  lerp(me, _e, ye) {
    return me * (1 - ye) + _e * ye;
  }
  updateMousePosition() {
    this.mouse[0] = this.lerp(this.mouse[0], this.mouseTarget[0], this.lerpFactor), this.mouse[1] = this.lerp(this.mouse[1], this.mouseTarget[1], this.lerpFactor);
  }
  updateFisheye() {
    this.fisheye = this.lerp(this.fisheye, this.fisheyeTarget, this.lerpFactor);
  }
}
export {
  uc as WebGLGallery
};
