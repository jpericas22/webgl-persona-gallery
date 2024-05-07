var Js = Object.defineProperty;
var ec = (ze, me, ye) => me in ze ? Js(ze, me, { enumerable: !0, configurable: !0, writable: !0, value: ye }) : ze[me] = ye;
var we = (ze, me, ye) => (ec(ze, typeof me != "symbol" ? me + "" : me, ye), ye);
var rc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function tc(ze) {
  return ze && ze.__esModule && Object.prototype.hasOwnProperty.call(ze, "default") ? ze.default : ze;
}
var hf = { exports: {} };
(function(ze, me) {
  (function(ye, he) {
    ze.exports = he();
  })(rc, function() {
    var ye = function(e) {
      return e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Float32Array || e instanceof Float64Array || e instanceof Uint8ClampedArray;
    }, he = function(e, t) {
      for (var s = Object.keys(t), x = 0; x < s.length; ++x)
        e[s[x]] = t[s[x]];
      return e;
    }, $e = `
`;
    function Ue(e) {
      return typeof atob < "u" ? atob(e) : "base64:" + e;
    }
    function ge(e) {
      var t = new Error("(regl) " + e);
      throw console.error(t), t;
    }
    function Ae(e, t) {
      e || ge(t);
    }
    function ar(e) {
      return e ? ": " + e : "";
    }
    function Pr(e, t, s) {
      e in t || ge("unknown parameter (" + e + ")" + ar(s) + ". possible values: " + Object.keys(t).join());
    }
    function rt(e, t) {
      ye(e) || ge(
        "invalid parameter type" + ar(t) + ". must be a typed array"
      );
    }
    function ir(e, t) {
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
    function kr(e, t, s) {
      ir(e, t) || ge(
        "invalid parameter type" + ar(s) + ". expected " + t + ", got " + typeof e
      );
    }
    function tt(e, t) {
      e >= 0 && (e | 0) === e || ge("invalid parameter type, (" + e + ")" + ar(t) + ". must be a nonnegative integer");
    }
    function Er(e, t, s) {
      t.indexOf(e) < 0 && ge("invalid value" + ar(s) + ". must be one of: " + t);
    }
    var ta = [
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
        ta.indexOf(t) < 0 && ge('invalid regl constructor argument "' + t + '". must be one of ' + ta);
      });
    }
    function Mr(e, t) {
      for (e = e + ""; e.length < t; )
        e = " " + e;
      return e;
    }
    function tn() {
      this.name = "unknown", this.lines = [], this.index = {}, this.hasErrors = !1;
    }
    function na(e, t) {
      this.number = e, this.line = t, this.errors = [];
    }
    function aa(e, t, s) {
      this.file = e, this.line = t, this.message = s;
    }
    function xr() {
      var e = new Error(), t = (e.stack || e).toString(), s = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(t);
      if (s)
        return s[1];
      var x = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(t);
      return x ? x[1] : "unknown";
    }
    function ia() {
      var e = new Error(), t = (e.stack || e).toString(), s = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(t);
      if (s)
        return s[1];
      var x = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(t);
      return x ? x[1] : "unknown";
    }
    function nn(e, t) {
      var s = e.split(`
`), x = 1, O = 0, E = {
        unknown: new tn(),
        0: new tn()
      };
      E.unknown.name = E[0].name = t || xr(), E.unknown.lines.push(new na(0, ""));
      for (var g = 0; g < s.length; ++g) {
        var N = s[g], D = /^\s*#\s*(\w+)\s+(.+)\s*$/.exec(N);
        if (D)
          switch (D[1]) {
            case "line":
              var M = /(\d+)(\s+\d+)?/.exec(D[2]);
              M && (x = M[1] | 0, M[2] && (O = M[2] | 0, O in E || (E[O] = new tn())));
              break;
            case "define":
              var V = /SHADER_NAME(_B64)?\s+(.*)$/.exec(D[2]);
              V && (E[O].name = V[1] ? Ue(V[2]) : V[2]);
              break;
          }
        E[O].lines.push(new na(x++, N));
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
          x ? t.push(new aa(
            x[1] | 0,
            x[2] | 0,
            x[3].trim()
          )) : s.length > 0 && t.push(new aa("unknown", 0, s));
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
        oa(s, "string", g + " shader source must be a string", O);
        var N = nn(s, O), D = pf(E);
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
              B(Mr(k.number, 4) + "|  ", "background-color:yellow; font-weight:bold"), B(k.line + $e, "color:red; background-color:yellow; font-weight:bold");
              var v = 0;
              k.errors.forEach(function(A) {
                var P = A.message, K = /^\s*'(.*)'\s*:\s*(.*)$/.exec(P);
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
                B(Mr("| ", 6)), B(Mr("^^^", v + 3) + $e, "font-weight:bold"), B(Mr("| ", 6)), B(P + $e, "font-weight:bold");
              }), B(Mr("| ", 6) + $e);
            } else
              B(Mr(k.number, 4) + "|  "), B(k.line + $e, "color:red");
          }), typeof document < "u" && !window.chrome ? (X[0] = U.join("%c"), console.log.apply(console, X)) : console.log(U.join(""));
        }), Ae.raise("Error compiling " + g + " shader, " + N[0].name);
      }
    }
    function yf(e, t, s, x, O) {
      if (!e.getProgramParameter(t, e.LINK_STATUS)) {
        var E = e.getProgramInfoLog(t), g = nn(s, O), N = nn(x, O), D = 'Error linking program with vertex shader, "' + N[0].name + '", and fragment shader "' + g[0].name + '"';
        typeof document < "u" ? console.log(
          "%c" + D + $e + "%c" + E,
          "color:red;text-decoration:underline;font-weight:bold",
          "color:red"
        ) : console.log(D + $e + E), Ae.raise(D);
      }
    }
    function fa(e) {
      e._commandRef = xr();
    }
    function Ef(e, t, s, x) {
      fa(e);
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
    function xt(e, t) {
      var s = ia();
      ge(e + " in command " + (t || xr()) + (s === "unknown" ? "" : " called from " + s));
    }
    function xf(e, t, s) {
      e || xt(t, s || xr());
    }
    function Tf(e, t, s, x) {
      e in t || xt(
        "unknown parameter (" + e + ")" + ar(s) + ". possible values: " + Object.keys(t).join(),
        x || xr()
      );
    }
    function oa(e, t, s, x) {
      ir(e, t) || xt(
        "invalid parameter type" + ar(s) + ". expected " + t + ", got " + typeof e,
        x || xr()
      );
    }
    function Af(e) {
      e();
    }
    function gf(e, t, s) {
      e.texture ? Er(
        e.texture._texture.internalformat,
        t,
        "unsupported texture format for attachment"
      ) : Er(
        e.renderbuffer._renderbuffer.format,
        s,
        "unsupported renderbuffer format for attachment"
      );
    }
    var Tt = 33071, ua = 9728, Sf = 9984, wf = 9985, Lf = 9986, Of = 9987, Rf = 5120, Cf = 5121, Gf = 5122, Ff = 5123, Df = 5124, Nf = 5125, sa = 5126, ca = 32819, la = 32820, da = 33635, ma = 34042, Bf = 36193, Qe = {};
    Qe[Rf] = Qe[Cf] = 1, Qe[Gf] = Qe[Ff] = Qe[Bf] = Qe[da] = Qe[ca] = Qe[la] = 2, Qe[Df] = Qe[Nf] = Qe[sa] = Qe[ma] = 4;
    function ha(e, t) {
      return e === la || e === ca || e === da ? 2 : e === ma ? 4 : Qe[e] * t;
    }
    function At(e) {
      return !(e & e - 1) && !!e;
    }
    function If(e, t, s) {
      var x, O = t.width, E = t.height, g = t.channels;
      Ae(
        O > 0 && O <= s.maxTextureSize && E > 0 && E <= s.maxTextureSize,
        "invalid texture shape"
      ), (e.wrapS !== Tt || e.wrapT !== Tt) && Ae(
        At(O) && At(E),
        "incompatible wrap mode for texture, both width and height must be power of 2"
      ), t.mipmask === 1 ? O !== 1 && E !== 1 && Ae(
        e.minFilter !== Sf && e.minFilter !== Lf && e.minFilter !== wf && e.minFilter !== Of,
        "min filter requires mipmap"
      ) : (Ae(
        At(O) && At(E),
        "texture must be a square power of 2 to support mipmapping"
      ), Ae(
        t.mipmask === (O << 1) - 1,
        "missing or incomplete mipmap data"
      )), t.type === sa && (s.extensions.indexOf("oes_texture_float_linear") < 0 && Ae(
        e.minFilter === ua && e.magFilter === ua,
        "filter not supported, must enable oes_texture_float_linear"
      ), Ae(
        !e.genMipmaps,
        "mipmap generation not supported with float textures"
      ));
      var N = t.images;
      for (x = 0; x < 16; ++x)
        if (N[x]) {
          var D = O >> x, M = E >> x;
          Ae(t.mipmask & 1 << x, "missing mipmap data");
          var V = N[x];
          if (Ae(
            V.width === D && V.height === M,
            "invalid shape for mip images"
          ), Ae(
            V.format === t.format && V.internalformat === t.internalformat && V.type === t.type,
            "incompatible type for mip image"
          ), !V.compressed)
            if (V.data) {
              var U = Math.ceil(ha(V.type, g) * D / V.unpackAlignment) * V.unpackAlignment;
              Ae(
                V.data.byteLength === U * M,
                "invalid data for image, buffer size is inconsistent with image format"
              );
            } else
              V.element || V.copy;
        } else
          e.genMipmaps || Ae((t.mipmask & 1 << x) === 0, "extra mipmap data");
      t.compressed && Ae(
        !e.genMipmaps,
        "mipmap generation for compressed images not supported"
      );
    }
    function Pf(e, t, s, x) {
      var O = e.width, E = e.height, g = e.channels;
      Ae(
        O > 0 && O <= x.maxTextureSize && E > 0 && E <= x.maxTextureSize,
        "invalid texture shape"
      ), Ae(
        O === E,
        "cube map must be square"
      ), Ae(
        t.wrapS === Tt && t.wrapT === Tt,
        "wrap mode not supported by cube map"
      );
      for (var N = 0; N < s.length; ++N) {
        var D = s[N];
        Ae(
          D.width === O && D.height === E,
          "inconsistent cube map face shape"
        ), t.genMipmaps && (Ae(
          !D.compressed,
          "can not generate mipmap for compressed textures"
        ), Ae(
          D.mipmask === 1,
          "can not specify mipmaps and generate mipmaps"
        ));
        for (var M = D.images, V = 0; V < 16; ++V) {
          var U = M[V];
          if (U) {
            var X = O >> V, B = E >> V;
            Ae(D.mipmask & 1 << V, "missing mipmap data"), Ae(
              U.width === X && U.height === B,
              "invalid shape for mip images"
            ), Ae(
              U.format === e.format && U.internalformat === e.internalformat && U.type === e.type,
              "incompatible type for mip image"
            ), U.compressed || (U.data ? Ae(
              U.data.byteLength === X * B * Math.max(ha(U.type, g), U.unpackAlignment),
              "invalid data for image, buffer size is inconsistent with image format"
            ) : U.element || U.copy);
          }
        }
      }
    }
    var n = he(Ae, {
      optional: Af,
      raise: ge,
      commandRaise: xt,
      command: xf,
      parameter: Pr,
      commandParameter: Tf,
      constructor: vf,
      type: kr,
      commandType: oa,
      isTypedArray: rt,
      nni: tt,
      oneOf: Er,
      shaderError: bf,
      linkError: yf,
      callSite: ia,
      saveCommandRef: fa,
      saveDrawInfo: Ef,
      framebufferFormat: gf,
      guessCommand: xr,
      texture2D: If,
      textureCube: Pf
    }), kf = 0, Mf = 0, Uf = 5, Vf = 6;
    function Tr(e, t) {
      this.id = kf++, this.type = e, this.data = t;
    }
    function va(e) {
      return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }
    function nt(e) {
      if (e.length === 0)
        return [];
      var t = e.charAt(0), s = e.charAt(e.length - 1);
      if (e.length > 1 && t === s && (t === '"' || t === "'"))
        return ['"' + va(e.substr(1, e.length - 2)) + '"'];
      var x = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(e);
      if (x)
        return nt(e.substr(0, x.index)).concat(nt(x[1])).concat(nt(e.substr(x.index + x[0].length)));
      var O = e.split(".");
      if (O.length === 1)
        return ['"' + va(e) + '"'];
      for (var E = [], g = 0; g < O.length; ++g)
        E = E.concat(nt(O[g]));
      return E;
    }
    function pa(e) {
      return "[" + nt(e).join("][") + "]";
    }
    function jf(e, t) {
      return new Tr(e, pa(t + ""));
    }
    function Xf(e) {
      return typeof e == "function" && !e._reglType || e instanceof Tr;
    }
    function _a(e, t) {
      if (typeof e == "function")
        return new Tr(Mf, e);
      if (typeof e == "number" || typeof e == "boolean")
        return new Tr(Uf, e);
      if (Array.isArray(e))
        return new Tr(Vf, e.map(function(s, x) {
          return _a(s, t + "[" + x + "]");
        }));
      if (e instanceof Tr)
        return e;
      n(!1, "invalid option type in uniform " + t);
    }
    var qe = {
      DynamicVariable: Tr,
      define: jf,
      isDynamic: Xf,
      unbox: _a,
      accessor: pa
    }, an = {
      next: typeof requestAnimationFrame == "function" ? function(e) {
        return requestAnimationFrame(e);
      } : function(e) {
        return setTimeout(e, 16);
      },
      cancel: typeof cancelAnimationFrame == "function" ? function(e) {
        return cancelAnimationFrame(e);
      } : clearTimeout
    }, ba = typeof performance < "u" && performance.now ? function() {
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
      he(x.style, {
        border: 0,
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }), e.appendChild(x), e === document.body && (x.style.position = "absolute", he(e.style, {
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
    function ya(e) {
      return typeof e == "string" ? e.split() : (n(Array.isArray(e), "invalid extension array"), e);
    }
    function Ea(e) {
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
      ), s = document.querySelector(t), n(s, "invalid query string for element")) : typeof t == "object" ? Wf(t) ? s = t : Yf(t) ? (E = t, O = E.canvas) : (n.constructor(t), "gl" in t ? E = t.gl : "canvas" in t ? O = Ea(t.canvas) : "container" in t && (x = Ea(t.container)), "attributes" in t && (g = t.attributes, n.type(g, "object", "invalid context attributes")), "extensions" in t && (N = ya(t.extensions)), "optionalExtensions" in t && (D = ya(t.optionalExtensions)), "onDone" in t && (n.type(
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
    function Ke(e, t) {
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
    function xa(e) {
      var t, s;
      return t = (e > 65535) << 4, e >>>= t, s = (e > 255) << 3, e >>>= s, t |= s, s = (e > 15) << 2, e >>>= s, t |= s, s = (e > 3) << 1, e >>>= s, t |= s, t | e >> 1;
    }
    function Ta() {
      var e = Ke(8, function() {
        return [];
      });
      function t(E) {
        var g = ao(E), N = e[xa(g) >> 2];
        return N.length > 0 ? N.pop() : new ArrayBuffer(g);
      }
      function s(E) {
        e[xa(E.byteLength) >> 2].push(E);
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
    var Fe = Ta();
    Fe.zero = Ta();
    var io = 3408, fo = 3410, oo = 3411, uo = 3412, so = 3413, co = 3414, lo = 3415, mo = 33901, ho = 33902, vo = 3379, po = 3386, _o = 34921, bo = 36347, yo = 36348, Eo = 35661, xo = 35660, To = 34930, Ao = 36349, go = 34076, So = 34024, wo = 7936, Lo = 7937, Oo = 7938, Ro = 35724, Co = 34047, Go = 36063, Fo = 34852, gt = 3553, Aa = 34067, Do = 34069, No = 33984, at = 6408, fn = 5126, ga = 5121, on = 36160, Bo = 36053, Io = 36064, Po = 16384, ko = function(e, t) {
      var s = 1;
      t.ext_texture_filter_anisotropic && (s = e.getParameter(Co));
      var x = 1, O = 1;
      t.webgl_draw_buffers && (x = e.getParameter(Fo), O = e.getParameter(Go));
      var E = !!t.oes_texture_float;
      if (E) {
        var g = e.createTexture();
        e.bindTexture(gt, g), e.texImage2D(gt, 0, at, 1, 1, 0, at, fn, null);
        var N = e.createFramebuffer();
        if (e.bindFramebuffer(on, N), e.framebufferTexture2D(on, Io, gt, g, 0), e.bindTexture(gt, null), e.checkFramebufferStatus(on) !== Bo)
          E = !1;
        else {
          e.viewport(0, 0, 1, 1), e.clearColor(1, 0, 0, 1), e.clear(Po);
          var D = Fe.allocType(fn, 4);
          e.readPixels(0, 0, 1, 1, at, fn, D), e.getError() ? E = !1 : (e.deleteFramebuffer(N), e.deleteTexture(g), E = D[0] === 1), Fe.freeType(D);
        }
      }
      var M = typeof navigator < "u" && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent)), V = !0;
      if (!M) {
        var U = e.createTexture(), X = Fe.allocType(ga, 36);
        e.activeTexture(No), e.bindTexture(Aa, U), e.texImage2D(Do, 0, at, 3, 3, 0, at, ga, X), Fe.freeType(X), e.bindTexture(Aa, null), e.deleteTexture(U), V = !e.getError();
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
        maxTextureUnits: e.getParameter(To),
        maxTextureSize: e.getParameter(vo),
        maxAttributes: e.getParameter(_o),
        maxVertexUniforms: e.getParameter(bo),
        maxVertexTextureUnits: e.getParameter(xo),
        maxVaryingVectors: e.getParameter(yo),
        maxFragmentUniforms: e.getParameter(Ao),
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
    function tr(e) {
      return !!e && typeof e == "object" && Array.isArray(e.shape) && Array.isArray(e.stride) && typeof e.offset == "number" && e.shape.length === e.stride.length && (Array.isArray(e.data) || ye(e.data));
    }
    var Ze = function(e) {
      return Object.keys(e).map(function(t) {
        return e[t];
      });
    }, St = {
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
    function Sa(e, t, s, x, O, E) {
      for (var g = E, N = 0; N < t; ++N)
        for (var D = e[N], M = 0; M < s; ++M)
          for (var V = D[M], U = 0; U < x; ++U)
            O[g++] = V[U];
    }
    function wa(e, t, s, x, O) {
      for (var E = 1, g = s + 1; g < t.length; ++g)
        E *= t[g];
      var N = t[s];
      if (t.length - s === 4) {
        var D = t[s + 1], M = t[s + 2], V = t[s + 3];
        for (g = 0; g < N; ++g)
          Sa(e[g], D, M, V, x, O), O += E;
      } else
        for (g = 0; g < N; ++g)
          wa(e[g], t, s + 1, x, O), O += E;
    }
    function Vo(e, t, s, x) {
      var O = 1;
      if (t.length)
        for (var E = 0; E < t.length; ++E)
          O *= t[E];
      else
        O = 0;
      var g = x || Fe.allocType(s, O);
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
          Sa(e, t[0], t[1], t[2], g, 0);
          break;
        default:
          wa(e, t, 0, g, 0);
      }
      return g;
    }
    function jo(e) {
      for (var t = [], s = e; s.length; s = s[0])
        t.push(s.length);
      return t;
    }
    var un = {
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
    }, Xo = 5120, Ho = 5122, $o = 5124, zo = 5121, Wo = 5123, Yo = 5125, Qo = 5126, qo = 5126, Ar = {
      int8: Xo,
      int16: Ho,
      int32: $o,
      uint8: zo,
      uint16: Wo,
      uint32: Yo,
      float: Qo,
      float32: qo
    }, Ko = 35048, Zo = 35040, wt = {
      dynamic: Ko,
      stream: Zo,
      static: 35044
    }, sn = St.flatten, La = St.shape, Oa = 35044, Jo = 35040, cn = 5121, ln = 5126, mr = [];
    mr[5120] = 1, mr[5122] = 2, mr[5124] = 4, mr[5121] = 1, mr[5123] = 2, mr[5125] = 4, mr[5126] = 4;
    function Lt(e) {
      return un[Object.prototype.toString.call(e)] | 0;
    }
    function Ra(e, t) {
      for (var s = 0; s < t.length; ++s)
        e[s] = t[s];
    }
    function Ca(e, t, s, x, O, E, g) {
      for (var N = 0, D = 0; D < s; ++D)
        for (var M = 0; M < x; ++M)
          e[N++] = t[O * D + E * M + g];
    }
    function eu(e, t, s, x) {
      var O = 0, E = {};
      function g(v) {
        this.id = O++, this.buffer = e.createBuffer(), this.type = v, this.usage = Oa, this.byteLength = 0, this.dimension = 1, this.dtype = cn, this.persistentData = null, s.profile && (this.stats = { size: 0 });
      }
      g.prototype.bind = function() {
        e.bindBuffer(this.type, this.buffer);
      }, g.prototype.destroy = function() {
        X(this);
      };
      var N = [];
      function D(v, A) {
        var P = N.pop();
        return P || (P = new g(v)), P.bind(), U(P, A, Jo, 0, 1, !1), P;
      }
      function M(v) {
        N.push(v);
      }
      function V(v, A, P) {
        v.byteLength = A.byteLength, e.bufferData(v.type, A, P);
      }
      function U(v, A, P, K, F, Q) {
        var W;
        if (v.usage = P, Array.isArray(A)) {
          if (v.dtype = K || ln, A.length > 0) {
            var ae;
            if (Array.isArray(A[0])) {
              W = La(A);
              for (var R = 1, L = 1; L < W.length; ++L)
                R *= W[L];
              v.dimension = R, ae = sn(A, W, v.dtype), V(v, ae, P), Q ? v.persistentData = ae : Fe.freeType(ae);
            } else if (typeof A[0] == "number") {
              v.dimension = F;
              var ee = Fe.allocType(v.dtype, A.length);
              Ra(ee, A), V(v, ee, P), Q ? v.persistentData = ee : Fe.freeType(ee);
            } else
              ye(A[0]) ? (v.dimension = A[0].length, v.dtype = K || Lt(A[0]) || ln, ae = sn(
                A,
                [A.length, A[0].length],
                v.dtype
              ), V(v, ae, P), Q ? v.persistentData = ae : Fe.freeType(ae)) : n.raise("invalid buffer data");
          }
        } else if (ye(A))
          v.dtype = K || Lt(A), v.dimension = F, V(v, A, P), Q && (v.persistentData = new Uint8Array(new Uint8Array(A.buffer)));
        else if (tr(A)) {
          W = A.shape;
          var H = A.stride, I = A.offset, $ = 0, z = 0, ce = 0, se = 0;
          W.length === 1 ? ($ = W[0], z = 1, ce = H[0], se = 0) : W.length === 2 ? ($ = W[0], z = W[1], ce = H[0], se = H[1]) : n.raise("invalid shape"), v.dtype = K || Lt(A.data) || ln, v.dimension = z;
          var Y = Fe.allocType(v.dtype, $ * z);
          Ca(
            Y,
            A.data,
            $,
            z,
            ce,
            se,
            I
          ), V(v, Y, P), Q ? v.persistentData = Y : Fe.freeType(Y);
        } else
          A instanceof ArrayBuffer ? (v.dtype = cn, v.dimension = F, V(v, A, P), Q && (v.persistentData = new Uint8Array(new Uint8Array(A)))) : n.raise("invalid buffer data");
      }
      function X(v) {
        t.bufferCount--, x(v);
        var A = v.buffer;
        n(A, "buffer must not be deleted already"), e.deleteBuffer(A), v.buffer = null, delete E[v.id];
      }
      function B(v, A, P, K) {
        t.bufferCount++;
        var F = new g(A);
        E[F.id] = F;
        function Q(R) {
          var L = Oa, ee = null, H = 0, I = 0, $ = 1;
          return Array.isArray(R) || ye(R) || tr(R) || R instanceof ArrayBuffer ? ee = R : typeof R == "number" ? H = R | 0 : R && (n.type(
            R,
            "object",
            "buffer arguments must be an object, a number or an array"
          ), "data" in R && (n(
            ee === null || Array.isArray(ee) || ye(ee) || tr(ee),
            "invalid data for buffer"
          ), ee = R.data), "usage" in R && (n.parameter(R.usage, wt, "invalid buffer usage"), L = wt[R.usage]), "type" in R && (n.parameter(R.type, Ar, "invalid buffer type"), I = Ar[R.type]), "dimension" in R && (n.type(R.dimension, "number", "invalid dimension"), $ = R.dimension | 0), "length" in R && (n.nni(H, "buffer length must be a nonnegative integer"), H = R.length | 0)), F.bind(), ee ? U(F, ee, L, I, $, K) : (H && e.bufferData(F.type, H, L), F.dtype = I || cn, F.usage = L, F.dimension = $, F.byteLength = H), s.profile && (F.stats.size = F.byteLength * mr[F.dtype]), Q;
        }
        function W(R, L) {
          n(
            L + R.byteLength <= F.byteLength,
            "invalid buffer subdata call, buffer is too small.  Can't write data of size " + R.byteLength + " starting from offset " + L + " to a buffer of size " + F.byteLength
          ), e.bufferSubData(F.type, L, R);
        }
        function ae(R, L) {
          var ee = (L || 0) | 0, H;
          if (F.bind(), ye(R) || R instanceof ArrayBuffer)
            W(R, ee);
          else if (Array.isArray(R)) {
            if (R.length > 0)
              if (typeof R[0] == "number") {
                var I = Fe.allocType(F.dtype, R.length);
                Ra(I, R), W(I, ee), Fe.freeType(I);
              } else if (Array.isArray(R[0]) || ye(R[0])) {
                H = La(R);
                var $ = sn(R, H, F.dtype);
                W($, ee), Fe.freeType($);
              } else
                n.raise("invalid buffer data");
          } else if (tr(R)) {
            H = R.shape;
            var z = R.stride, ce = 0, se = 0, Y = 0, q = 0;
            H.length === 1 ? (ce = H[0], se = 1, Y = z[0], q = 0) : H.length === 2 ? (ce = H[0], se = H[1], Y = z[0], q = z[1]) : n.raise("invalid shape");
            var fe = Array.isArray(R.data) ? F.dtype : Lt(R.data), le = Fe.allocType(fe, ce * se);
            Ca(
              le,
              R.data,
              ce,
              se,
              Y,
              q,
              R.offset
            ), W(le, ee), Fe.freeType(le);
          } else
            n.raise("invalid data for buffer subdata");
          return Q;
        }
        return P || Q(v), Q._reglType = "buffer", Q._buffer = F, Q.subdata = ae, s.profile && (Q.stats = F.stats), Q.destroy = function() {
          X(F);
        }, Q;
      }
      function k() {
        Ze(E).forEach(function(v) {
          v.buffer = e.createBuffer(), e.bindBuffer(v.type, v.buffer), e.bufferData(
            v.type,
            v.persistentData || v.byteLength,
            v.usage
          );
        });
      }
      return s.profile && (t.getTotalBufferSize = function() {
        var v = 0;
        return Object.keys(E).forEach(function(A) {
          v += E[A].stats.size;
        }), v;
      }), {
        create: B,
        createStream: D,
        destroyStream: M,
        clear: function() {
          Ze(E).forEach(X), N.forEach(X);
        },
        getBuffer: function(v) {
          return v && v._buffer instanceof g ? v._buffer : null;
        },
        restore: k,
        _initBuffer: U
      };
    }
    var ru = 0, tu = 0, nu = 1, au = 1, iu = 4, fu = 4, hr = {
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
    }, ou = 0, uu = 1, it = 4, su = 5120, Ur = 5121, Ga = 5122, Vr = 5123, Fa = 5124, gr = 5125, dn = 34963, cu = 35040, lu = 35044;
    function du(e, t, s, x) {
      var O = {}, E = 0, g = {
        uint8: Ur,
        uint16: Vr
      };
      t.oes_element_index_uint && (g.uint32 = gr);
      function N(k) {
        this.id = E++, O[this.id] = this, this.buffer = k, this.primType = it, this.vertCount = 0, this.type = 0;
      }
      N.prototype.bind = function() {
        this.buffer.bind();
      };
      var D = [];
      function M(k) {
        var v = D.pop();
        return v || (v = new N(s.create(
          null,
          dn,
          !0,
          !1
        )._buffer)), U(v, k, cu, -1, -1, 0, 0), v;
      }
      function V(k) {
        D.push(k);
      }
      function U(k, v, A, P, K, F, Q) {
        k.buffer.bind();
        var W;
        if (v) {
          var ae = Q;
          !Q && (!ye(v) || tr(v) && !ye(v.data)) && (ae = t.oes_element_index_uint ? gr : Vr), s._initBuffer(
            k.buffer,
            v,
            A,
            ae,
            3
          );
        } else
          e.bufferData(dn, F, A), k.buffer.dtype = W || Ur, k.buffer.usage = A, k.buffer.dimension = 3, k.buffer.byteLength = F;
        if (W = Q, !Q) {
          switch (k.buffer.dtype) {
            case Ur:
            case su:
              W = Ur;
              break;
            case Vr:
            case Ga:
              W = Vr;
              break;
            case gr:
            case Fa:
              W = gr;
              break;
            default:
              n.raise("unsupported type for element array");
          }
          k.buffer.dtype = W;
        }
        k.type = W, n(
          W !== gr || !!t.oes_element_index_uint,
          "32 bit element buffers not supported, enable oes_element_index_uint first"
        );
        var R = K;
        R < 0 && (R = k.buffer.byteLength, W === Vr ? R >>= 1 : W === gr && (R >>= 2)), k.vertCount = R;
        var L = P;
        if (P < 0) {
          L = it;
          var ee = k.buffer.dimension;
          ee === 1 && (L = ou), ee === 2 && (L = uu), ee === 3 && (L = it);
        }
        k.primType = L;
      }
      function X(k) {
        x.elementsCount--, n(k.buffer !== null, "must not double destroy elements"), delete O[k.id], k.buffer.destroy(), k.buffer = null;
      }
      function B(k, v) {
        var A = s.create(null, dn, !0), P = new N(A._buffer);
        x.elementsCount++;
        function K(F) {
          if (!F)
            A(), P.primType = it, P.vertCount = 0, P.type = Ur;
          else if (typeof F == "number")
            A(F), P.primType = it, P.vertCount = F | 0, P.type = Ur;
          else {
            var Q = null, W = lu, ae = -1, R = -1, L = 0, ee = 0;
            Array.isArray(F) || ye(F) || tr(F) ? Q = F : (n.type(F, "object", "invalid arguments for elements"), "data" in F && (Q = F.data, n(
              Array.isArray(Q) || ye(Q) || tr(Q),
              "invalid data for element buffer"
            )), "usage" in F && (n.parameter(
              F.usage,
              wt,
              "invalid element buffer usage"
            ), W = wt[F.usage]), "primitive" in F && (n.parameter(
              F.primitive,
              hr,
              "invalid element buffer primitive"
            ), ae = hr[F.primitive]), "count" in F && (n(
              typeof F.count == "number" && F.count >= 0,
              "invalid vertex count for elements"
            ), R = F.count | 0), "type" in F && (n.parameter(
              F.type,
              g,
              "invalid buffer type"
            ), ee = g[F.type]), "length" in F ? L = F.length | 0 : (L = R, ee === Vr || ee === Ga ? L *= 2 : (ee === gr || ee === Fa) && (L *= 4))), U(
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
          return A.subdata(F, Q), K;
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
          Ze(O).forEach(X);
        }
      };
    }
    var Da = new Float32Array(1), mu = new Uint32Array(Da.buffer), hu = 5123;
    function Na(e) {
      for (var t = Fe.allocType(hu, e.length), s = 0; s < e.length; ++s)
        if (isNaN(e[s]))
          t[s] = 65535;
        else if (e[s] === 1 / 0)
          t[s] = 31744;
        else if (e[s] === -1 / 0)
          t[s] = 64512;
        else {
          Da[0] = e[s];
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
    function Le(e) {
      return Array.isArray(e) || ye(e);
    }
    var Ba = function(e) {
      return !(e & e - 1) && !!e;
    }, vu = 34467, fr = 3553, mn = 34067, Ot = 34069, Sr = 6408, hn = 6406, Rt = 6407, ft = 6409, Ct = 6410, Ia = 32854, vn = 32855, Pa = 36194, pu = 32819, _u = 32820, bu = 33635, yu = 34042, pn = 6402, Gt = 34041, _n = 35904, bn = 35906, jr = 36193, yn = 33776, En = 33777, xn = 33778, Tn = 33779, ka = 35986, Ma = 35987, Ua = 34798, Va = 35840, ja = 35841, Xa = 35842, Ha = 35843, $a = 36196, Xr = 5121, An = 5123, gn = 5125, ot = 5126, Eu = 10242, xu = 10243, Tu = 10497, Sn = 33071, Au = 33648, gu = 10240, Su = 10241, wn = 9728, wu = 9729, Ln = 9984, za = 9985, Wa = 9986, On = 9987, Lu = 33170, Ft = 4352, Ou = 4353, Ru = 4354, Cu = 34046, Gu = 3317, Fu = 37440, Du = 37441, Nu = 37443, Ya = 37444, ut = 33984, Bu = [
      Ln,
      Wa,
      za,
      On
    ], Dt = [
      0,
      ft,
      Ct,
      Rt,
      Sr
    ], er = {};
    er[ft] = er[hn] = er[pn] = 1, er[Gt] = er[Ct] = 2, er[Rt] = er[_n] = 3, er[Sr] = er[bn] = 4;
    function Hr(e) {
      return "[object " + e + "]";
    }
    var Qa = Hr("HTMLCanvasElement"), qa = Hr("OffscreenCanvas"), Ka = Hr("CanvasRenderingContext2D"), Za = Hr("ImageBitmap"), Ja = Hr("HTMLImageElement"), ei = Hr("HTMLVideoElement"), Iu = Object.keys(un).concat([
      Qa,
      qa,
      Ka,
      Za,
      Ja,
      ei
    ]), $r = [];
    $r[Xr] = 1, $r[ot] = 4, $r[jr] = 2, $r[An] = 2, $r[gn] = 4;
    var Ve = [];
    Ve[Ia] = 2, Ve[vn] = 2, Ve[Pa] = 2, Ve[Gt] = 4, Ve[yn] = 0.5, Ve[En] = 0.5, Ve[xn] = 1, Ve[Tn] = 1, Ve[ka] = 0.5, Ve[Ma] = 1, Ve[Ua] = 1, Ve[Va] = 0.5, Ve[ja] = 0.25, Ve[Xa] = 0.5, Ve[Ha] = 0.25, Ve[$a] = 0.5;
    function ri(e) {
      return Array.isArray(e) && (e.length === 0 || typeof e[0] == "number");
    }
    function ti(e) {
      if (!Array.isArray(e))
        return !1;
      var t = e.length;
      return !(t === 0 || !Le(e[0]));
    }
    function wr(e) {
      return Object.prototype.toString.call(e);
    }
    function ni(e) {
      return wr(e) === Qa;
    }
    function ai(e) {
      return wr(e) === qa;
    }
    function Pu(e) {
      return wr(e) === Ka;
    }
    function ku(e) {
      return wr(e) === Za;
    }
    function Mu(e) {
      return wr(e) === Ja;
    }
    function Uu(e) {
      return wr(e) === ei;
    }
    function Rn(e) {
      if (!e)
        return !1;
      var t = wr(e);
      return Iu.indexOf(t) >= 0 ? !0 : ri(e) || ti(e) || tr(e);
    }
    function ii(e) {
      return un[Object.prototype.toString.call(e)] | 0;
    }
    function Vu(e, t) {
      var s = t.length;
      switch (e.type) {
        case Xr:
        case An:
        case gn:
        case ot:
          var x = Fe.allocType(e.type, s);
          x.set(t), e.data = x;
          break;
        case jr:
          e.data = Na(t);
          break;
        default:
          n.raise("unsupported texture type, must specify a typed array");
      }
    }
    function fi(e, t) {
      return Fe.allocType(
        e.type === jr ? ot : e.type,
        t
      );
    }
    function oi(e, t) {
      e.type === jr ? (e.data = Na(t), Fe.freeType(t)) : e.data = t;
    }
    function ju(e, t, s, x, O, E) {
      for (var g = e.width, N = e.height, D = e.channels, M = g * N * D, V = fi(e, M), U = 0, X = 0; X < N; ++X)
        for (var B = 0; B < g; ++B)
          for (var k = 0; k < D; ++k)
            V[U++] = t[s * B + x * X + O * k + E];
      oi(e, V);
    }
    function Nt(e, t, s, x, O, E) {
      var g;
      if (typeof Ve[e] < "u" ? g = Ve[e] : g = er[e] * $r[t], E && (g *= 6), O) {
        for (var N = 0, D = s; D >= 1; )
          N += g * D * D, D /= 2;
        return N;
      } else
        return g * s * x;
    }
    function Xu(e, t, s, x, O, E, g) {
      var N = {
        "don't care": Ft,
        "dont care": Ft,
        nice: Ru,
        fast: Ou
      }, D = {
        repeat: Tu,
        clamp: Sn,
        mirror: Au
      }, M = {
        nearest: wn,
        linear: wu
      }, V = he({
        mipmap: On,
        "nearest mipmap nearest": Ln,
        "linear mipmap nearest": za,
        "nearest mipmap linear": Wa,
        "linear mipmap linear": On
      }, M), U = {
        none: 0,
        browser: Ya
      }, X = {
        uint8: Xr,
        rgba4: pu,
        rgb565: bu,
        "rgb5 a1": _u
      }, B = {
        alpha: hn,
        luminance: ft,
        "luminance alpha": Ct,
        rgb: Rt,
        rgba: Sr,
        rgba4: Ia,
        "rgb5 a1": vn,
        rgb565: Pa
      }, k = {};
      t.ext_srgb && (B.srgb = _n, B.srgba = bn), t.oes_texture_float && (X.float32 = X.float = ot), t.oes_texture_half_float && (X.float16 = X["half float"] = jr), t.webgl_depth_texture && (he(B, {
        depth: pn,
        "depth stencil": Gt
      }), he(X, {
        uint16: An,
        uint32: gn,
        "depth stencil": yu
      })), t.webgl_compressed_texture_s3tc && he(k, {
        "rgb s3tc dxt1": yn,
        "rgba s3tc dxt1": En,
        "rgba s3tc dxt3": xn,
        "rgba s3tc dxt5": Tn
      }), t.webgl_compressed_texture_atc && he(k, {
        "rgb atc": ka,
        "rgba atc explicit alpha": Ma,
        "rgba atc interpolated alpha": Ua
      }), t.webgl_compressed_texture_pvrtc && he(k, {
        "rgb pvrtc 4bppv1": Va,
        "rgb pvrtc 2bppv1": ja,
        "rgba pvrtc 4bppv1": Xa,
        "rgba pvrtc 2bppv1": Ha
      }), t.webgl_compressed_texture_etc1 && (k["rgb etc1"] = $a);
      var v = Array.prototype.slice.call(
        e.getParameter(vu)
      );
      Object.keys(k).forEach(function(o) {
        var T = k[o];
        v.indexOf(T) >= 0 && (B[o] = T);
      });
      var A = Object.keys(B);
      s.textureFormats = A;
      var P = [];
      Object.keys(B).forEach(function(o) {
        var T = B[o];
        P[T] = o;
      });
      var K = [];
      Object.keys(X).forEach(function(o) {
        var T = X[o];
        K[T] = o;
      });
      var F = [];
      Object.keys(M).forEach(function(o) {
        var T = M[o];
        F[T] = o;
      });
      var Q = [];
      Object.keys(V).forEach(function(o) {
        var T = V[o];
        Q[T] = o;
      });
      var W = [];
      Object.keys(D).forEach(function(o) {
        var T = D[o];
        W[T] = o;
      });
      var ae = A.reduce(function(o, T) {
        var y = B[T];
        return y === ft || y === hn || y === ft || y === Ct || y === pn || y === Gt || t.ext_srgb && (y === _n || y === bn) ? o[y] = y : y === vn || T.indexOf("rgba") >= 0 ? o[y] = Sr : o[y] = Rt, o;
      }, {});
      function R() {
        this.internalformat = Sr, this.format = Sr, this.type = Xr, this.compressed = !1, this.premultiplyAlpha = !1, this.flipY = !1, this.unpackAlignment = 1, this.colorSpace = Ya, this.width = 0, this.height = 0, this.channels = 0;
      }
      function L(o, T) {
        o.internalformat = T.internalformat, o.format = T.format, o.type = T.type, o.compressed = T.compressed, o.premultiplyAlpha = T.premultiplyAlpha, o.flipY = T.flipY, o.unpackAlignment = T.unpackAlignment, o.colorSpace = T.colorSpace, o.width = T.width, o.height = T.height, o.channels = T.channels;
      }
      function ee(o, T) {
        if (!(typeof T != "object" || !T)) {
          if ("premultiplyAlpha" in T && (n.type(
            T.premultiplyAlpha,
            "boolean",
            "invalid premultiplyAlpha"
          ), o.premultiplyAlpha = T.premultiplyAlpha), "flipY" in T && (n.type(
            T.flipY,
            "boolean",
            "invalid texture flip"
          ), o.flipY = T.flipY), "alignment" in T && (n.oneOf(
            T.alignment,
            [1, 2, 4, 8],
            "invalid texture unpack alignment"
          ), o.unpackAlignment = T.alignment), "colorSpace" in T && (n.parameter(
            T.colorSpace,
            U,
            "invalid colorSpace"
          ), o.colorSpace = U[T.colorSpace]), "type" in T) {
            var y = T.type;
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
          var J = o.width, ve = o.height, a = o.channels, r = !1;
          "shape" in T ? (n(
            Array.isArray(T.shape) && T.shape.length >= 2,
            "shape must be an array"
          ), J = T.shape[0], ve = T.shape[1], T.shape.length === 3 && (a = T.shape[2], n(a > 0 && a <= 4, "invalid number of channels"), r = !0), n(J >= 0 && J <= s.maxTextureSize, "invalid width"), n(ve >= 0 && ve <= s.maxTextureSize, "invalid height")) : ("radius" in T && (J = ve = T.radius, n(J >= 0 && J <= s.maxTextureSize, "invalid radius")), "width" in T && (J = T.width, n(J >= 0 && J <= s.maxTextureSize, "invalid width")), "height" in T && (ve = T.height, n(ve >= 0 && ve <= s.maxTextureSize, "invalid height")), "channels" in T && (a = T.channels, n(a > 0 && a <= 4, "invalid number of channels"), r = !0)), o.width = J | 0, o.height = ve | 0, o.channels = a | 0;
          var c = !1;
          if ("format" in T) {
            var h = T.format;
            n(
              t.webgl_depth_texture || !(h === "depth" || h === "depth stencil"),
              "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."
            ), n.parameter(
              h,
              B,
              "invalid texture format"
            );
            var p = o.internalformat = B[h];
            o.format = ae[p], h in X && ("type" in T || (o.type = X[h])), h in k && (o.compressed = !0), c = !0;
          }
          !r && c ? o.channels = er[o.format] : r && !c ? o.channels !== Dt[o.format] && (o.format = o.internalformat = Dt[o.channels]) : c && r && n(
            o.channels === er[o.format],
            "number of channels inconsistent with specified format"
          );
        }
      }
      function H(o) {
        e.pixelStorei(Fu, o.flipY), e.pixelStorei(Du, o.premultiplyAlpha), e.pixelStorei(Nu, o.colorSpace), e.pixelStorei(Gu, o.unpackAlignment);
      }
      function I() {
        R.call(this), this.xOffset = 0, this.yOffset = 0, this.data = null, this.needsFree = !1, this.element = null, this.needsCopy = !1;
      }
      function $(o, T) {
        var y = null;
        if (Rn(T) ? y = T : T && (n.type(T, "object", "invalid pixel data type"), ee(o, T), "x" in T && (o.xOffset = T.x | 0), "y" in T && (o.yOffset = T.y | 0), Rn(T.data) && (y = T.data)), n(
          !o.compressed || y instanceof Uint8Array,
          "compressed texture data must be stored in a uint8array"
        ), T.copy) {
          n(!y, "can not specify copy and data field for the same texture");
          var J = O.viewportWidth, ve = O.viewportHeight;
          o.width = o.width || J - o.xOffset, o.height = o.height || ve - o.yOffset, o.needsCopy = !0, n(
            o.xOffset >= 0 && o.xOffset < J && o.yOffset >= 0 && o.yOffset < ve && o.width > 0 && o.width <= J && o.height > 0 && o.height <= ve,
            "copy texture read out of bounds"
          );
        } else if (!y)
          o.width = o.width || 1, o.height = o.height || 1, o.channels = o.channels || 4;
        else if (ye(y))
          o.channels = o.channels || 4, o.data = y, !("type" in T) && o.type === Xr && (o.type = ii(y));
        else if (ri(y))
          o.channels = o.channels || 4, Vu(o, y), o.alignment = 1, o.needsFree = !0;
        else if (tr(y)) {
          var a = y.data;
          !Array.isArray(a) && o.type === Xr && (o.type = ii(a));
          var r = y.shape, c = y.stride, h, p, d, l, m, i;
          r.length === 3 ? (d = r[2], i = c[2]) : (n(r.length === 2, "invalid ndarray pixel data, must be 2 or 3D"), d = 1, i = 1), h = r[0], p = r[1], l = c[0], m = c[1], o.alignment = 1, o.width = h, o.height = p, o.channels = d, o.format = o.internalformat = Dt[d], o.needsFree = !0, ju(o, a, l, m, i, y.offset);
        } else if (ni(y) || ai(y) || Pu(y))
          ni(y) || ai(y) ? o.element = y : o.element = y.canvas, o.width = o.element.width, o.height = o.element.height, o.channels = 4;
        else if (ku(y))
          o.element = y, o.width = y.width, o.height = y.height, o.channels = 4;
        else if (Mu(y))
          o.element = y, o.width = y.naturalWidth, o.height = y.naturalHeight, o.channels = 4;
        else if (Uu(y))
          o.element = y, o.width = y.videoWidth, o.height = y.videoHeight, o.channels = 4;
        else if (ti(y)) {
          var u = o.width || y[0].length, f = o.height || y.length, b = o.channels;
          Le(y[0][0]) ? b = b || y[0][0].length : b = b || 1;
          for (var _ = St.shape(y), w = 1, C = 0; C < _.length; ++C)
            w *= _[C];
          var j = fi(o, w);
          St.flatten(y, _, "", j), oi(o, j), o.alignment = 1, o.width = u, o.height = f, o.channels = b, o.format = o.internalformat = Dt[b], o.needsFree = !0;
        }
        o.type === ot ? n(
          s.extensions.indexOf("oes_texture_float") >= 0,
          "oes_texture_float extension not enabled"
        ) : o.type === jr && n(
          s.extensions.indexOf("oes_texture_half_float") >= 0,
          "oes_texture_half_float extension not enabled"
        );
      }
      function z(o, T, y) {
        var J = o.element, ve = o.data, a = o.internalformat, r = o.format, c = o.type, h = o.width, p = o.height;
        H(o), J ? e.texImage2D(T, y, r, r, c, J) : o.compressed ? e.compressedTexImage2D(T, y, a, h, p, 0, ve) : o.needsCopy ? (x(), e.copyTexImage2D(
          T,
          y,
          r,
          o.xOffset,
          o.yOffset,
          h,
          p,
          0
        )) : e.texImage2D(T, y, r, h, p, 0, r, c, ve || null);
      }
      function ce(o, T, y, J, ve) {
        var a = o.element, r = o.data, c = o.internalformat, h = o.format, p = o.type, d = o.width, l = o.height;
        H(o), a ? e.texSubImage2D(
          T,
          ve,
          y,
          J,
          h,
          p,
          a
        ) : o.compressed ? e.compressedTexSubImage2D(
          T,
          ve,
          y,
          J,
          c,
          d,
          l,
          r
        ) : o.needsCopy ? (x(), e.copyTexSubImage2D(
          T,
          ve,
          y,
          J,
          o.xOffset,
          o.yOffset,
          d,
          l
        )) : e.texSubImage2D(
          T,
          ve,
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
        o.needsFree && Fe.freeType(o.data), I.call(o), se.push(o);
      }
      function fe() {
        R.call(this), this.genMipmaps = !1, this.mipmapHint = Ft, this.mipmask = 0, this.images = Array(16);
      }
      function le(o, T, y) {
        var J = o.images[0] = Y();
        o.mipmask = 1, J.width = o.width = T, J.height = o.height = y, J.channels = o.channels = 4;
      }
      function pe(o, T) {
        var y = null;
        if (Rn(T))
          y = o.images[0] = Y(), L(y, o), $(y, T), o.mipmask = 1;
        else if (ee(o, T), Array.isArray(T.mipmap))
          for (var J = T.mipmap, ve = 0; ve < J.length; ++ve)
            y = o.images[ve] = Y(), L(y, o), y.width >>= ve, y.height >>= ve, $(y, J[ve]), o.mipmask |= 1 << ve;
        else
          y = o.images[0] = Y(), L(y, o), $(y, T), o.mipmask = 1;
        L(o, o.images[0]), o.compressed && (o.internalformat === yn || o.internalformat === En || o.internalformat === xn || o.internalformat === Tn) && n(
          o.width % 4 === 0 && o.height % 4 === 0,
          "for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4"
        );
      }
      function Oe(o, T) {
        for (var y = o.images, J = 0; J < y.length; ++J) {
          if (!y[J])
            return;
          z(y[J], T, J);
        }
      }
      var Re = [];
      function be() {
        var o = Re.pop() || new fe();
        R.call(o), o.mipmask = 0;
        for (var T = 0; T < 16; ++T)
          o.images[T] = null;
        return o;
      }
      function Be(o) {
        for (var T = o.images, y = 0; y < T.length; ++y)
          T[y] && q(T[y]), T[y] = null;
        Re.push(o);
      }
      function Se() {
        this.minFilter = wn, this.magFilter = wn, this.wrapS = Sn, this.wrapT = Sn, this.anisotropic = 1, this.genMipmaps = !1, this.mipmapHint = Ft;
      }
      function Ne(o, T) {
        if ("min" in T) {
          var y = T.min;
          n.parameter(y, V), o.minFilter = V[y], Bu.indexOf(o.minFilter) >= 0 && !("faces" in T) && (o.genMipmaps = !0);
        }
        if ("mag" in T) {
          var J = T.mag;
          n.parameter(J, M), o.magFilter = M[J];
        }
        var ve = o.wrapS, a = o.wrapT;
        if ("wrap" in T) {
          var r = T.wrap;
          typeof r == "string" ? (n.parameter(r, D), ve = a = D[r]) : Array.isArray(r) && (n.parameter(r[0], D), n.parameter(r[1], D), ve = D[r[0]], a = D[r[1]]);
        } else {
          if ("wrapS" in T) {
            var c = T.wrapS;
            n.parameter(c, D), ve = D[c];
          }
          if ("wrapT" in T) {
            var h = T.wrapT;
            n.parameter(h, D), a = D[h];
          }
        }
        if (o.wrapS = ve, o.wrapT = a, "anisotropic" in T) {
          var p = T.anisotropic;
          n(
            typeof p == "number" && p >= 1 && p <= s.maxAnisotropic,
            "aniso samples must be between 1 and "
          ), o.anisotropic = T.anisotropic;
        }
        if ("mipmap" in T) {
          var d = !1;
          switch (typeof T.mipmap) {
            case "string":
              n.parameter(
                T.mipmap,
                N,
                "invalid mipmap hint"
              ), o.mipmapHint = N[T.mipmap], o.genMipmaps = !0, d = !0;
              break;
            case "boolean":
              d = o.genMipmaps = T.mipmap;
              break;
            case "object":
              n(Array.isArray(T.mipmap), "invalid mipmap type"), o.genMipmaps = !1, d = !0;
              break;
            default:
              n.raise("invalid mipmap type");
          }
          d && !("min" in T) && (o.minFilter = Ln);
        }
      }
      function Ie(o, T) {
        e.texParameteri(T, Su, o.minFilter), e.texParameteri(T, gu, o.magFilter), e.texParameteri(T, Eu, o.wrapS), e.texParameteri(T, xu, o.wrapT), t.ext_texture_filter_anisotropic && e.texParameteri(T, Cu, o.anisotropic), o.genMipmaps && (e.hint(Lu, o.mipmapHint), e.generateMipmap(T));
      }
      var Pe = 0, Me = {}, je = s.maxTextureUnits, Ce = Array(je).map(function() {
        return null;
      });
      function de(o) {
        R.call(this), this.mipmask = 0, this.internalformat = Sr, this.id = Pe++, this.refCount = 1, this.target = o, this.texture = e.createTexture(), this.unit = -1, this.bindCount = 0, this.texInfo = new Se(), g.profile && (this.stats = { size: 0 });
      }
      function Xe(o) {
        e.activeTexture(ut), e.bindTexture(o.target, o.texture);
      }
      function xe() {
        var o = Ce[0];
        o ? e.bindTexture(o.target, o.texture) : e.bindTexture(fr, null);
      }
      function ie(o) {
        var T = o.texture;
        n(T, "must not double destroy texture");
        var y = o.unit, J = o.target;
        y >= 0 && (e.activeTexture(ut + y), e.bindTexture(J, null), Ce[y] = null), e.deleteTexture(T), o.texture = null, o.params = null, o.pixels = null, o.refCount = 0, delete Me[o.id], E.textureCount--;
      }
      he(de.prototype, {
        bind: function() {
          var o = this;
          o.bindCount += 1;
          var T = o.unit;
          if (T < 0) {
            for (var y = 0; y < je; ++y) {
              var J = Ce[y];
              if (J) {
                if (J.bindCount > 0)
                  continue;
                J.unit = -1;
              }
              Ce[y] = o, T = y;
              break;
            }
            T >= je && n.raise("insufficient number of texture units"), g.profile && E.maxTextureUnits < T + 1 && (E.maxTextureUnits = T + 1), o.unit = T, e.activeTexture(ut + T), e.bindTexture(o.target, o.texture);
          }
          return T;
        },
        unbind: function() {
          this.bindCount -= 1;
        },
        decRef: function() {
          --this.refCount <= 0 && ie(this);
        }
      });
      function _e(o, T) {
        var y = new de(fr);
        Me[y.id] = y, E.textureCount++;
        function J(r, c) {
          var h = y.texInfo;
          Se.call(h);
          var p = be();
          return typeof r == "number" ? typeof c == "number" ? le(p, r | 0, c | 0) : le(p, r | 0, r | 0) : r ? (n.type(r, "object", "invalid arguments to regl.texture"), Ne(h, r), pe(p, r)) : le(p, 1, 1), h.genMipmaps && (p.mipmask = (p.width << 1) - 1), y.mipmask = p.mipmask, L(y, p), n.texture2D(h, p, s), y.internalformat = p.internalformat, J.width = p.width, J.height = p.height, Xe(y), Oe(p, fr), Ie(h, fr), xe(), Be(p), g.profile && (y.stats.size = Nt(
            y.internalformat,
            y.type,
            p.width,
            p.height,
            h.genMipmaps,
            !1
          )), J.format = P[y.internalformat], J.type = K[y.type], J.mag = F[h.magFilter], J.min = Q[h.minFilter], J.wrapS = W[h.wrapS], J.wrapT = W[h.wrapT], J;
        }
        function ve(r, c, h, p) {
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
          ), Xe(y), ce(i, fr, d, l, m), xe(), q(i), J;
        }
        function a(r, c) {
          var h = r | 0, p = c | 0 || h;
          if (h === y.width && p === y.height)
            return J;
          J.width = y.width = h, J.height = y.height = p, Xe(y);
          for (var d = 0; y.mipmask >> d; ++d) {
            var l = h >> d, m = p >> d;
            if (!l || !m)
              break;
            e.texImage2D(
              fr,
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
          return xe(), g.profile && (y.stats.size = Nt(
            y.internalformat,
            y.type,
            h,
            p,
            !1,
            !1
          )), J;
        }
        return J(o, T), J.subimage = ve, J.resize = a, J._reglType = "texture2d", J._texture = y, g.profile && (J.stats = y.stats), J.destroy = function() {
          y.decRef();
        }, J;
      }
      function Ee(o, T, y, J, ve, a) {
        var r = new de(mn);
        Me[r.id] = r, E.cubeCount++;
        var c = new Array(6);
        function h(l, m, i, u, f, b) {
          var _, w = r.texInfo;
          for (Se.call(w), _ = 0; _ < 6; ++_)
            c[_] = be();
          if (typeof l == "number" || !l) {
            var C = l | 0 || 1;
            for (_ = 0; _ < 6; ++_)
              le(c[_], C, C);
          } else if (typeof l == "object")
            if (m)
              pe(c[0], l), pe(c[1], m), pe(c[2], i), pe(c[3], u), pe(c[4], f), pe(c[5], b);
            else if (Ne(w, l), ee(r, l), "faces" in l) {
              var j = l.faces;
              for (n(
                Array.isArray(j) && j.length === 6,
                "cube faces must be a length 6 array"
              ), _ = 0; _ < 6; ++_)
                n(
                  typeof j[_] == "object" && !!j[_],
                  "invalid input for cube map face"
                ), L(c[_], r), pe(c[_], j[_]);
            } else
              for (_ = 0; _ < 6; ++_)
                pe(c[_], l);
          else
            n.raise("invalid arguments to cube map");
          for (L(r, c[0]), n.optional(function() {
            s.npotTextureCube || n(Ba(r.width) && Ba(r.height), "your browser does not support non power or two texture dimensions");
          }), w.genMipmaps ? r.mipmask = (c[0].width << 1) - 1 : r.mipmask = c[0].mipmask, n.textureCube(r, w, c, s), r.internalformat = c[0].internalformat, h.width = c[0].width, h.height = c[0].height, Xe(r), _ = 0; _ < 6; ++_)
            Oe(c[_], Ot + _);
          for (Ie(w, mn), xe(), g.profile && (r.stats.size = Nt(
            r.internalformat,
            r.type,
            h.width,
            h.height,
            w.genMipmaps,
            !0
          )), h.format = P[r.internalformat], h.type = K[r.type], h.mag = F[w.magFilter], h.min = Q[w.minFilter], h.wrapS = W[w.wrapS], h.wrapT = W[w.wrapT], _ = 0; _ < 6; ++_)
            Be(c[_]);
          return h;
        }
        function p(l, m, i, u, f) {
          n(!!m, "must specify image data"), n(typeof l == "number" && l === (l | 0) && l >= 0 && l < 6, "invalid face");
          var b = i | 0, _ = u | 0, w = f | 0, C = Y();
          return L(C, r), C.width = 0, C.height = 0, $(C, m), C.width = C.width || (r.width >> w) - b, C.height = C.height || (r.height >> w) - _, n(
            r.type === C.type && r.format === C.format && r.internalformat === C.internalformat,
            "incompatible format for texture.subimage"
          ), n(
            b >= 0 && _ >= 0 && b + C.width <= r.width && _ + C.height <= r.height,
            "texture.subimage write out of bounds"
          ), n(
            r.mipmask & 1 << w,
            "missing mipmap data"
          ), n(
            C.data || C.element || C.needsCopy,
            "missing image data"
          ), Xe(r), ce(C, Ot + l, b, _, w), xe(), q(C), h;
        }
        function d(l) {
          var m = l | 0;
          if (m !== r.width) {
            h.width = r.width = m, h.height = r.height = m, Xe(r);
            for (var i = 0; i < 6; ++i)
              for (var u = 0; r.mipmask >> u; ++u)
                e.texImage2D(
                  Ot + i,
                  u,
                  r.format,
                  m >> u,
                  m >> u,
                  0,
                  r.format,
                  r.type,
                  null
                );
            return xe(), g.profile && (r.stats.size = Nt(
              r.internalformat,
              r.type,
              h.width,
              h.height,
              !1,
              !0
            )), h;
          }
        }
        return h(o, T, y, J, ve, a), h.subimage = p, h.resize = d, h._reglType = "textureCube", h._texture = r, g.profile && (h.stats = r.stats), h.destroy = function() {
          r.decRef();
        }, h;
      }
      function Ge() {
        for (var o = 0; o < je; ++o)
          e.activeTexture(ut + o), e.bindTexture(fr, null), Ce[o] = null;
        Ze(Me).forEach(ie), E.cubeCount = 0, E.textureCount = 0;
      }
      g.profile && (E.getTotalTextureSize = function() {
        var o = 0;
        return Object.keys(Me).forEach(function(T) {
          o += Me[T].stats.size;
        }), o;
      });
      function ur() {
        for (var o = 0; o < je; ++o) {
          var T = Ce[o];
          T && (T.bindCount = 0, T.unit = -1, Ce[o] = null);
        }
        Ze(Me).forEach(function(y) {
          y.texture = e.createTexture(), e.bindTexture(y.target, y.texture);
          for (var J = 0; J < 32; ++J)
            if (y.mipmask & 1 << J)
              if (y.target === fr)
                e.texImage2D(
                  fr,
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
                for (var ve = 0; ve < 6; ++ve)
                  e.texImage2D(
                    Ot + ve,
                    J,
                    y.internalformat,
                    y.width >> J,
                    y.height >> J,
                    0,
                    y.internalformat,
                    y.type,
                    null
                  );
          Ie(y.texInfo, y.target);
        });
      }
      function Dr() {
        for (var o = 0; o < je; ++o) {
          var T = Ce[o];
          T && (T.bindCount = 0, T.unit = -1, Ce[o] = null), e.activeTexture(ut + o), e.bindTexture(fr, null), e.bindTexture(mn, null);
        }
      }
      return {
        create2D: _e,
        createCube: Ee,
        clear: Ge,
        getTexture: function(o) {
          return null;
        },
        restore: ur,
        refresh: Dr
      };
    }
    var vr = 36161, Bt = 32854, ui = 32855, si = 36194, ci = 33189, li = 36168, di = 34041, mi = 35907, hi = 34836, vi = 34842, pi = 34843, nr = [];
    nr[Bt] = 2, nr[ui] = 2, nr[si] = 2, nr[ci] = 2, nr[li] = 1, nr[di] = 4, nr[mi] = 4, nr[hi] = 16, nr[vi] = 8, nr[pi] = 6;
    function _i(e, t, s) {
      return nr[e] * t * s;
    }
    var Hu = function(e, t, s, x, O) {
      var E = {
        rgba4: Bt,
        rgb565: si,
        "rgb5 a1": ui,
        depth: ci,
        stencil: li,
        "depth stencil": di
      };
      t.ext_srgb && (E.srgba = mi), t.ext_color_buffer_half_float && (E.rgba16f = vi, E.rgb16f = pi), t.webgl_color_buffer_float && (E.rgba32f = hi);
      var g = [];
      Object.keys(E).forEach(function(B) {
        var k = E[B];
        g[k] = B;
      });
      var N = 0, D = {};
      function M(B) {
        this.id = N++, this.refCount = 1, this.renderbuffer = B, this.format = Bt, this.width = 0, this.height = 0, O.profile && (this.stats = { size: 0 });
      }
      M.prototype.decRef = function() {
        --this.refCount <= 0 && V(this);
      };
      function V(B) {
        var k = B.renderbuffer;
        n(k, "must not double destroy renderbuffer"), e.bindRenderbuffer(vr, null), e.deleteRenderbuffer(k), B.renderbuffer = null, B.refCount = 0, delete D[B.id], x.renderbufferCount--;
      }
      function U(B, k) {
        var v = new M(e.createRenderbuffer());
        D[v.id] = v, x.renderbufferCount++;
        function A(K, F) {
          var Q = 0, W = 0, ae = Bt;
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
            return A.width = v.width = Q, A.height = v.height = W, v.format = ae, e.bindRenderbuffer(vr, v.renderbuffer), e.renderbufferStorage(vr, ae, Q, W), n(
              e.getError() === 0,
              "invalid render buffer format"
            ), O.profile && (v.stats.size = _i(v.format, v.width, v.height)), A.format = g[v.format], A;
        }
        function P(K, F) {
          var Q = K | 0, W = F | 0 || Q;
          return Q === v.width && W === v.height || (n(
            Q > 0 && W > 0 && Q <= s.maxRenderbufferSize && W <= s.maxRenderbufferSize,
            "invalid renderbuffer size"
          ), A.width = v.width = Q, A.height = v.height = W, e.bindRenderbuffer(vr, v.renderbuffer), e.renderbufferStorage(vr, v.format, Q, W), n(
            e.getError() === 0,
            "invalid render buffer format"
          ), O.profile && (v.stats.size = _i(
            v.format,
            v.width,
            v.height
          ))), A;
        }
        return A(B, k), A.resize = P, A._reglType = "renderbuffer", A._renderbuffer = v, O.profile && (A.stats = v.stats), A.destroy = function() {
          v.decRef();
        }, A;
      }
      O.profile && (x.getTotalRenderbufferSize = function() {
        var B = 0;
        return Object.keys(D).forEach(function(k) {
          B += D[k].stats.size;
        }), B;
      });
      function X() {
        Ze(D).forEach(function(B) {
          B.renderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(vr, B.renderbuffer), e.renderbufferStorage(vr, B.format, B.width, B.height);
        }), e.bindRenderbuffer(vr, null);
      }
      return {
        create: U,
        clear: function() {
          Ze(D).forEach(V);
        },
        restore: X
      };
    }, cr = 36160, Cn = 36161, Lr = 3553, It = 34069, bi = 36064, yi = 36096, Ei = 36128, xi = 33306, Ti = 36053, $u = 36054, zu = 36055, Wu = 36057, Yu = 36061, Qu = 36193, qu = 5121, Ku = 5126, Ai = 6407, gi = 6408, Zu = 6402, Ju = [
      Ai,
      gi
    ], Gn = [];
    Gn[gi] = 4, Gn[Ai] = 3;
    var Pt = [];
    Pt[qu] = 1, Pt[Ku] = 4, Pt[Qu] = 2;
    var es = 32854, rs = 32855, ts = 36194, ns = 33189, as = 36168, Si = 34041, is = 35907, fs = 34836, os = 34842, us = 34843, ss = [
      es,
      rs,
      ts,
      is,
      os,
      us,
      fs
    ], zr = {};
    zr[Ti] = "complete", zr[$u] = "incomplete attachment", zr[Wu] = "incomplete dimensions", zr[zu] = "incomplete, missing attachment", zr[Yu] = "unsupported";
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
          cr,
          I,
          $.target,
          $.texture._texture.texture,
          0
        ) : e.framebufferRenderbuffer(
          cr,
          I,
          Cn,
          $.renderbuffer._renderbuffer.renderbuffer
        ));
      }
      function k(I) {
        var $ = Lr, z = null, ce = null, se = I;
        typeof I == "object" && (se = I.data, "target" in I && ($ = I.target | 0)), n.type(se, "function", "invalid attachment data");
        var Y = se._reglType;
        return Y === "texture2d" ? (z = se, n($ === Lr)) : Y === "textureCube" ? (z = se, n(
          $ >= It && $ < It + 6,
          "invalid cube map target"
        )) : Y === "renderbuffer" ? (ce = se, $ = Cn) : n.raise("invalid regl object for attachment"), new V($, z, ce);
      }
      function v(I, $, z, ce, se) {
        if (z) {
          var Y = x.create2D({
            width: I,
            height: $,
            format: ce,
            type: se
          });
          return Y._texture.refCount = 0, new V(Lr, Y, null);
        } else {
          var q = O.create({
            width: I,
            height: $,
            format: ce
          });
          return q._renderbuffer.refCount = 0, new V(Cn, null, q);
        }
      }
      function A(I) {
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
        e.bindFramebuffer(cr, I.framebuffer);
        var z = I.colorAttachments;
        for ($ = 0; $ < z.length; ++$)
          B(bi + $, z[$]);
        for ($ = z.length; $ < s.maxColorAttachments; ++$)
          e.framebufferTexture2D(
            cr,
            bi + $,
            Lr,
            null,
            0
          );
        e.framebufferTexture2D(
          cr,
          xi,
          Lr,
          null,
          0
        ), e.framebufferTexture2D(
          cr,
          yi,
          Lr,
          null,
          0
        ), e.framebufferTexture2D(
          cr,
          Ei,
          Lr,
          null,
          0
        ), B(yi, I.depthAttachment), B(Ei, I.stencilAttachment), B(xi, I.depthStencilAttachment);
        var ce = e.checkFramebufferStatus(cr);
        !e.isContextLost() && ce !== Ti && n.raise("framebuffer configuration not supported, status = " + zr[ce]), e.bindFramebuffer(cr, g.next ? g.next.framebuffer : null), g.cur = g.next, e.getError();
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
          var le = 0, pe = 0, Oe = !0, Re = !0, be = null, Be = !0, Se = "rgba", Ne = "uint8", Ie = 1, Pe = null, Me = null, je = null, Ce = !1;
          if (typeof Y == "number")
            le = Y | 0, pe = q | 0 || le;
          else if (!Y)
            le = pe = 1;
          else {
            n.type(Y, "object", "invalid arguments for framebuffer");
            var de = Y;
            if ("shape" in de) {
              var Xe = de.shape;
              n(
                Array.isArray(Xe) && Xe.length >= 2,
                "invalid shape for framebuffer"
              ), le = Xe[0], pe = Xe[1];
            } else
              "radius" in de && (le = pe = de.radius), "width" in de && (le = de.width), "height" in de && (pe = de.height);
            ("color" in de || "colors" in de) && (be = de.color || de.colors, Array.isArray(be) && n(
              be.length === 1 || t.webgl_draw_buffers,
              "multiple render targets not supported"
            )), be || ("colorCount" in de && (Ie = de.colorCount | 0, n(Ie > 0, "invalid color buffer count")), "colorTexture" in de && (Be = !!de.colorTexture, Se = "rgba4"), "colorType" in de && (Ne = de.colorType, Be ? (n(
              t.oes_texture_float || !(Ne === "float" || Ne === "float32"),
              "you must enable OES_texture_float in order to use floating point framebuffer objects"
            ), n(
              t.oes_texture_half_float || !(Ne === "half float" || Ne === "float16"),
              "you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects"
            )) : Ne === "half float" || Ne === "float16" ? (n(
              t.ext_color_buffer_half_float,
              "you must enable EXT_color_buffer_half_float to use 16-bit render buffers"
            ), Se = "rgba16f") : (Ne === "float" || Ne === "float32") && (n(
              t.webgl_color_buffer_float,
              "you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"
            ), Se = "rgba32f"), n.oneOf(Ne, M, "invalid color type")), "colorFormat" in de && (Se = de.colorFormat, N.indexOf(Se) >= 0 ? Be = !0 : D.indexOf(Se) >= 0 ? Be = !1 : n.optional(function() {
              Be ? n.oneOf(
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
            )), "depth" in de && (typeof de.depth == "boolean" ? Oe = de.depth : (Pe = de.depth, Re = !1)), "stencil" in de && (typeof de.stencil == "boolean" ? Re = de.stencil : (Me = de.stencil, Oe = !1)), "depthStencil" in de && (typeof de.depthStencil == "boolean" ? Oe = Re = de.depthStencil : (je = de.depthStencil, Oe = !1, Re = !1));
          }
          var xe = null, ie = null, _e = null, Ee = null;
          if (Array.isArray(be))
            xe = be.map(k);
          else if (be)
            xe = [k(be)];
          else
            for (xe = new Array(Ie), fe = 0; fe < Ie; ++fe)
              xe[fe] = v(
                le,
                pe,
                Be,
                Se,
                Ne
              );
          n(
            t.webgl_draw_buffers || xe.length <= 1,
            "you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."
          ), n(
            xe.length <= s.maxColorAttachments,
            "too many color attachments, not supported"
          ), le = le || xe[0].width, pe = pe || xe[0].height, Pe ? ie = k(Pe) : Oe && !Re && (ie = v(
            le,
            pe,
            Ce,
            "depth",
            "uint32"
          )), Me ? _e = k(Me) : Re && !Oe && (_e = v(
            le,
            pe,
            !1,
            "stencil",
            "uint8"
          )), je ? Ee = k(je) : !Pe && !Me && Re && Oe && (Ee = v(
            le,
            pe,
            Ce,
            "depth stencil",
            "depth stencil"
          )), n(
            !!Pe + !!Me + !!je <= 1,
            "invalid framebuffer configuration, can specify exactly one depth/stencil attachment"
          );
          var Ge = null;
          for (fe = 0; fe < xe.length; ++fe)
            if (X(xe[fe], le, pe), n(
              !xe[fe] || xe[fe].texture && Ju.indexOf(xe[fe].texture._texture.format) >= 0 || xe[fe].renderbuffer && ss.indexOf(xe[fe].renderbuffer._renderbuffer.format) >= 0,
              "framebuffer color attachment " + fe + " is invalid"
            ), xe[fe] && xe[fe].texture) {
              var ur = Gn[xe[fe].texture._texture.format] * Pt[xe[fe].texture._texture.type];
              Ge === null ? Ge = ur : n(
                Ge === ur,
                "all color attachments much have the same number of bits per pixel."
              );
            }
          return X(ie, le, pe), n(
            !ie || ie.texture && ie.texture._texture.format === Zu || ie.renderbuffer && ie.renderbuffer._renderbuffer.format === ns,
            "invalid depth attachment for framebuffer object"
          ), X(_e, le, pe), n(
            !_e || _e.renderbuffer && _e.renderbuffer._renderbuffer.format === as,
            "invalid stencil attachment for framebuffer object"
          ), X(Ee, le, pe), n(
            !Ee || Ee.texture && Ee.texture._texture.format === Si || Ee.renderbuffer && Ee.renderbuffer._renderbuffer.format === Si,
            "invalid depth-stencil attachment for framebuffer object"
          ), W(z), z.width = le, z.height = pe, z.colorAttachments = xe, z.depthAttachment = ie, z.stencilAttachment = _e, z.depthStencilAttachment = Ee, ce.color = xe.map(A), ce.depth = A(ie), ce.stencil = A(_e), ce.depthStencil = A(Ee), ce.width = z.width, ce.height = z.height, R(z), ce;
        }
        function se(Y, q) {
          n(
            g.next !== z,
            "can not resize a framebuffer which is currently in use"
          );
          var fe = Math.max(Y | 0, 1), le = Math.max(q | 0 || fe, 1);
          if (fe === z.width && le === z.height)
            return ce;
          for (var pe = z.colorAttachments, Oe = 0; Oe < pe.length; ++Oe)
            P(pe[Oe], fe, le);
          return P(z.depthAttachment, fe, le), P(z.stencilAttachment, fe, le), P(z.depthStencilAttachment, fe, le), z.width = ce.width = fe, z.height = ce.height = le, R(z), ce;
        }
        return ce(I, $), he(ce, {
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
          }, fe = 0, le = null, pe = "rgba", Oe = "uint8", Re = 1;
          if (typeof se == "number")
            fe = se | 0;
          else if (!se)
            fe = 1;
          else {
            n.type(se, "object", "invalid arguments for framebuffer");
            var be = se;
            if ("shape" in be) {
              var Be = be.shape;
              n(
                Array.isArray(Be) && Be.length >= 2,
                "invalid shape for framebuffer"
              ), n(
                Be[0] === Be[1],
                "cube framebuffer must be square"
              ), fe = Be[0];
            } else
              "radius" in be && (fe = be.radius | 0), "width" in be ? (fe = be.width | 0, "height" in be && n(be.height === fe, "must be square")) : "height" in be && (fe = be.height | 0);
            ("color" in be || "colors" in be) && (le = be.color || be.colors, Array.isArray(le) && n(
              le.length === 1 || t.webgl_draw_buffers,
              "multiple render targets not supported"
            )), le || ("colorCount" in be && (Re = be.colorCount | 0, n(Re > 0, "invalid color buffer count")), "colorType" in be && (n.oneOf(
              be.colorType,
              M,
              "invalid color type"
            ), Oe = be.colorType), "colorFormat" in be && (pe = be.colorFormat, n.oneOf(
              be.colorFormat,
              N,
              "invalid color format for texture"
            ))), "depth" in be && (q.depth = be.depth), "stencil" in be && (q.stencil = be.stencil), "depthStencil" in be && (q.depthStencil = be.depthStencil);
          }
          var Se;
          if (le)
            if (Array.isArray(le))
              for (Se = [], Y = 0; Y < le.length; ++Y)
                Se[Y] = le[Y];
            else
              Se = [le];
          else {
            Se = Array(Re);
            var Ne = {
              radius: fe,
              format: pe,
              type: Oe
            };
            for (Y = 0; Y < Re; ++Y)
              Se[Y] = x.createCube(Ne);
          }
          for (q.color = Array(Se.length), Y = 0; Y < Se.length; ++Y) {
            var Ie = Se[Y];
            n(
              typeof Ie == "function" && Ie._reglType === "textureCube",
              "invalid cube map"
            ), fe = fe || Ie.width, n(
              Ie.width === fe && Ie.height === fe,
              "invalid cube map shape"
            ), q.color[Y] = {
              target: It,
              data: Se[Y]
            };
          }
          for (Y = 0; Y < 6; ++Y) {
            for (var Pe = 0; Pe < Se.length; ++Pe)
              q.color[Pe].target = It + Y;
            Y > 0 && (q.depth = $[0].depth, q.stencil = $[0].stencil, q.depthStencil = $[0].depthStencil), $[Y] ? $[Y](q) : $[Y] = L(q);
          }
          return he(z, {
            width: fe,
            height: fe,
            color: Se
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
        return z(I), he(z, {
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
        g.cur = null, g.next = null, g.dirty = !0, Ze(F).forEach(function(I) {
          I.framebuffer = e.createFramebuffer(), R(I);
        });
      }
      return he(g, {
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
          Ze(F).forEach(ae);
        },
        restore: H
      });
    }
    var ls = 5126, wi = 34962, kt = 34963, Li = [
      "attributes",
      "elements",
      "offset",
      "count",
      "primitive",
      "instances"
    ];
    function Fn() {
      this.state = 0, this.x = 0, this.y = 0, this.z = 0, this.w = 0, this.buffer = null, this.size = 0, this.normalized = !1, this.type = ls, this.offset = 0, this.stride = 0, this.divisor = 0;
    }
    function ds(e, t, s, x, O, E, g) {
      for (var N = s.maxAttributes, D = new Array(N), M = 0; M < N; ++M)
        D[M] = new Fn();
      var V = 0, U = {}, X = {
        Record: Fn,
        scope: {},
        state: D,
        currentVAO: null,
        targetVAO: null,
        restore: k() ? W : function() {
        },
        createVAO: ae,
        getVAO: A,
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
      function A(R) {
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
            g.elements ? e.bindBuffer(kt, g.elements.buffer.buffer) : e.bindBuffer(kt, null);
          }
          X.currentVAO = R;
        }
      }
      function F() {
        Ze(U).forEach(function(R) {
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
          H.buffer ? (e.enableVertexAttribArray(ee), e.bindBuffer(wi, H.buffer.buffer), e.vertexAttribPointer(ee, H.size, H.type, H.normalized, H.stride, H.offset), R && H.divisor && R.vertexAttribDivisorANGLE(ee, H.divisor)) : (e.disableVertexAttribArray(ee), e.vertexAttrib4f(ee, H.x, H.y, H.z, H.w));
        }
        for (var I = L.length; I < N; ++I)
          e.disableVertexAttribArray(I);
        var $ = E.getElements(this.elements);
        $ ? e.bindBuffer(kt, $.buffer.buffer) : e.bindBuffer(kt, null);
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
        R && Ze(U).forEach(function(L) {
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
            I = H.attributes, L.offset = 0, L.count = -1, L.instances = -1, L.primitive = 4, L.elements && (L.count = L.elements._elements.vertCount, L.primitive = L.elements._elements.primType), "offset" in H && (L.offset = H.offset | 0), "count" in H && (L.count = H.count | 0), "instances" in H && (L.instances = H.instances | 0), "primitive" in H && (n(H.primitive in hr, "bad primitive type: " + H.primitive), L.primitive = hr[H.primitive]), n.optional(() => {
              for (var Oe = Object.keys(H), Re = 0; Re < Oe.length; ++Re)
                n(Li.indexOf(Oe[Re]) >= 0, 'invalid option for vao: "' + Oe[Re] + '" valid options are ' + Li);
            }), n(Array.isArray(I), "attributes must be an array");
          }
          n(I.length < N, "too many attributes"), n(I.length > 0, "must specify at least one attribute");
          var z = {}, ce = L.attributes;
          ce.length = I.length;
          for (var se = 0; se < I.length; ++se) {
            var Y = I[se], q = ce[se] = new Fn(), fe = Y.data || Y;
            if (Array.isArray(fe) || ye(fe) || tr(fe)) {
              var le;
              L.buffers[se] && (le = L.buffers[se], ye(fe) && le._buffer.byteLength >= fe.byteLength ? le.subdata(fe) : (le.destroy(), L.buffers[se] = null)), L.buffers[se] || (le = L.buffers[se] = O.create(Y, wi, !1, !0)), q.buffer = O.getBuffer(le), q.size = q.buffer.dimension | 0, q.normalized = !1, q.type = q.buffer.dtype, q.offset = 0, q.stride = 0, q.divisor = 0, q.state = 1, z[se] = 1;
            } else
              O.getBuffer(Y) ? (q.buffer = O.getBuffer(Y), q.size = q.buffer.dimension | 0, q.normalized = !1, q.type = q.buffer.dtype, q.offset = 0, q.stride = 0, q.divisor = 0, q.state = 1) : O.getBuffer(Y.buffer) ? (q.buffer = O.getBuffer(Y.buffer), q.size = (+Y.size || q.buffer.dimension) | 0, q.normalized = !!Y.normalized || !1, "type" in Y ? (n.parameter(Y.type, Ar, "invalid buffer type"), q.type = Ar[Y.type]) : q.type = q.buffer.dtype, q.offset = (Y.offset || 0) | 0, q.stride = (Y.stride || 0) | 0, q.divisor = (Y.divisor || 0) | 0, q.state = 1, n(q.size >= 1 && q.size <= 4, "size must be between 1 and 4"), n(q.offset >= 0, "invalid offset"), n(q.stride >= 0 && q.stride <= 255, "stride must be between 0 and 255"), n(q.divisor >= 0, "divisor must be positive"), n(!q.divisor || !!t.angle_instanced_arrays, "ANGLE_instanced_arrays must be enabled to use divisor")) : "x" in Y ? (n(se > 0, "first attribute must not be a constant"), q.x = +Y.x || 0, q.y = +Y.y || 0, q.z = +Y.z || 0, q.w = +Y.w || 0, q.state = 2) : n(!1, "invalid attribute spec for location " + se);
          }
          for (var pe = 0; pe < L.buffers.length; ++pe)
            !z[pe] && L.buffers[pe] && (L.buffers[pe].destroy(), L.buffers[pe] = null);
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
    var Oi = 35632, ms = 35633, hs = 35718, vs = 35721;
    function ps(e, t, s, x) {
      var O = {}, E = {};
      function g(v, A, P, K) {
        this.name = v, this.id = A, this.location = P, this.info = K;
      }
      function N(v, A) {
        for (var P = 0; P < v.length; ++P)
          if (v[P].id === A.id) {
            v[P].location = A.location;
            return;
          }
        v.push(A);
      }
      function D(v, A, P) {
        var K = v === Oi ? O : E, F = K[A];
        if (!F) {
          var Q = t.str(A);
          F = e.createShader(v), e.shaderSource(F, Q), e.compileShader(F), n.shaderError(e, F, Q, v, P), K[A] = F;
        }
        return F;
      }
      var M = {}, V = [], U = 0;
      function X(v, A) {
        this.id = U++, this.fragId = v, this.vertId = A, this.program = null, this.uniforms = [], this.attributes = [], this.refCount = 1, x.profile && (this.stats = {
          uniformsCount: 0,
          attributesCount: 0
        });
      }
      function B(v, A, P) {
        var K, F, Q = D(Oi, v.fragId), W = D(ms, v.vertId), ae = v.program = e.createProgram();
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
          A
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
        return V.forEach(function(A) {
          A.stats.uniformsCount > v && (v = A.stats.uniformsCount);
        }), v;
      }, s.getMaxAttributesCount = function() {
        var v = 0;
        return V.forEach(function(A) {
          A.stats.attributesCount > v && (v = A.stats.attributesCount);
        }), v;
      });
      function k() {
        O = {}, E = {};
        for (var v = 0; v < V.length; ++v)
          B(V[v], null, V[v].attributes.map(function(A) {
            return [A.location, A.name];
          }));
      }
      return {
        clear: function() {
          var v = e.deleteShader.bind(e);
          Ze(O).forEach(v), O = {}, Ze(E).forEach(v), E = {}, V.forEach(function(A) {
            e.deleteProgram(A.program);
          }), V.length = 0, M = {}, s.shaderCount = 0;
        },
        program: function(v, A, P, K) {
          n.command(v >= 0, "missing vertex shader", P), n.command(A >= 0, "missing fragment shader", P);
          var F = M[A];
          F || (F = M[A] = {});
          var Q = F[v];
          if (Q && (Q.refCount++, !K))
            return Q;
          var W = new X(A, v);
          return s.shaderCount++, B(W, P, K), Q || (F[v] = W), V.push(W), he(W, {
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
    var _s = 6408, st = 5121, bs = 3333, Mt = 5126;
    function ys(e, t, s, x, O, E, g) {
      function N(V) {
        var U;
        t.next === null ? (n(
          O.preserveDrawingBuffer,
          'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'
        ), U = st) : (n(
          t.next.colorAttachments[0].texture !== null,
          "You cannot read from a renderbuffer"
        ), U = t.next.colorAttachments[0].texture._texture.type, n.optional(function() {
          E.oes_texture_float ? (n(
            U === st || U === Mt,
            "Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"
          ), U === Mt && n(g.readFloat, "Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float")) : n(
            U === st,
            "Reading from a framebuffer is only allowed for the type 'uint8'"
          );
        }));
        var X = 0, B = 0, k = x.framebufferWidth, v = x.framebufferHeight, A = null;
        ye(V) ? A = V : V && (n.type(V, "object", "invalid arguments to regl.read()"), X = V.x | 0, B = V.y | 0, n(
          X >= 0 && X < x.framebufferWidth,
          "invalid x offset for regl.read"
        ), n(
          B >= 0 && B < x.framebufferHeight,
          "invalid y offset for regl.read"
        ), k = (V.width || x.framebufferWidth - X) | 0, v = (V.height || x.framebufferHeight - B) | 0, A = V.data || null), A && (U === st ? n(
          A instanceof Uint8Array,
          "buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"
        ) : U === Mt && n(
          A instanceof Float32Array,
          "buffer must be 'Float32Array' when reading from a framebuffer of type 'float'"
        )), n(
          k > 0 && k + X <= x.framebufferWidth,
          "invalid width for read pixels"
        ), n(
          v > 0 && v + B <= x.framebufferHeight,
          "invalid height for read pixels"
        ), s();
        var P = k * v * 4;
        return A || (U === st ? A = new Uint8Array(P) : U === Mt && (A = A || new Float32Array(P))), n.isTypedArray(A, "data buffer for regl.read() must be a typedarray"), n(A.byteLength >= P, "data buffer for regl.read() too small"), e.pixelStorei(bs, 4), e.readPixels(
          X,
          B,
          k,
          v,
          _s,
          U,
          A
        ), A;
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
    function Wr(e) {
      return Array.prototype.slice.call(e);
    }
    function Yr(e) {
      return Wr(e).join("");
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
          U.push.apply(U, Wr(arguments));
        }
        var B = [];
        function k() {
          var v = "v" + e++;
          return B.push(v), arguments.length > 0 && (U.push(v, "="), U.push.apply(U, Wr(arguments)), U.push(";")), v;
        }
        return he(X, {
          def: k,
          toString: function() {
            return Yr([
              B.length > 0 ? "var " + B.join(",") + ";" : "",
              Yr(U)
            ]);
          }
        });
      }
      function E() {
        var U = O(), X = O(), B = U.toString, k = X.toString;
        function v(A, P) {
          X(A, P, "=", U.def(A, P), ";");
        }
        return he(function() {
          U.apply(U, Wr(arguments));
        }, {
          def: U.def,
          entry: U,
          exit: X,
          save: v,
          set: function(A, P, K) {
            v(A, P), U(A, P, "=", K, ";");
          },
          toString: function() {
            return B() + k();
          }
        });
      }
      function g() {
        var U = Yr(arguments), X = E(), B = E(), k = X.toString, v = B.toString;
        return he(X, {
          then: function() {
            return X.apply(X, Wr(arguments)), this;
          },
          else: function() {
            return B.apply(B, Wr(arguments)), this;
          },
          toString: function() {
            var A = v();
            return A && (A = "else{" + A + "}"), Yr([
              "if(",
              U,
              "){",
              k(),
              "}",
              A
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
        var A = E(), P = A.toString, K = D[U] = he(A, {
          arg: k,
          toString: function() {
            return Yr([
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
        var X = Yr(U).replace(/;/g, `;
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
    var Qr = "xyzw".split(""), Ri = 5121, qr = 1, Dn = 2, Nn = 0, Bn = 1, In = 2, Pn = 3, Ut = 4, Ci = 5, Gi = 6, Fi = "dither", Di = "blend.enable", Ni = "blend.color", kn = "blend.equation", Mn = "blend.func", Bi = "depth.enable", Ii = "depth.func", Pi = "depth.range", ki = "depth.mask", Un = "colorMask", Mi = "cull.enable", Ui = "cull.face", Vn = "frontFace", jn = "lineWidth", Vi = "polygonOffset.enable", Xn = "polygonOffset.offset", ji = "sample.alpha", Xi = "sample.enable", Hn = "sample.coverage", Hi = "stencil.enable", $i = "stencil.mask", $n = "stencil.func", zn = "stencil.opFront", ct = "stencil.opBack", zi = "scissor.enable", Vt = "scissor.box", lr = "viewport", lt = "profile", Or = "framebuffer", dt = "vert", mt = "frag", Rr = "elements", Cr = "primitive", Gr = "count", jt = "offset", Xt = "instances", ht = "vao", Wn = "Width", Yn = "Height", Kr = Or + Wn, Zr = Or + Yn, xs = lr + Wn, Ts = lr + Yn, Wi = "drawingBuffer", Yi = Wi + Wn, Qi = Wi + Yn, As = [
      Mn,
      kn,
      $n,
      zn,
      ct,
      Hn,
      lr,
      Vt,
      Xn
    ], Jr = 34962, Qn = 34963, gs = 35632, Ss = 35633, qi = 3553, ws = 34067, Ls = 2884, Os = 3042, Rs = 3024, Cs = 2960, Gs = 2929, Fs = 3089, Ds = 32823, Ns = 32926, Bs = 32928, qn = 5126, Ht = 35664, $t = 35665, zt = 35666, Kn = 5124, Wt = 35667, Yt = 35668, Qt = 35669, Zn = 35670, qt = 35671, Kt = 35672, Zt = 35673, vt = 35674, pt = 35675, _t = 35676, bt = 35678, yt = 35680, Jn = 4, Et = 1028, Fr = 1029, Ki = 2304, ea = 2305, Is = 32775, Ps = 32776, ks = 519, pr = 7680, Zi = 0, Ji = 1, ef = 32774, Ms = 513, rf = 36160, Us = 36064, or = {
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
    }, tf = [
      "constant color, constant alpha",
      "one minus constant color, constant alpha",
      "constant color, one minus constant alpha",
      "one minus constant color, one minus constant alpha",
      "constant alpha, constant color",
      "constant alpha, one minus constant color",
      "one minus constant alpha, constant color",
      "one minus constant alpha, one minus constant color"
    ], et = {
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
    }, _r = {
      0: 0,
      zero: 0,
      keep: 7680,
      replace: 7681,
      increment: 7682,
      decrement: 7683,
      "increment wrap": 34055,
      "decrement wrap": 34056,
      invert: 5386
    }, nf = {
      frag: gs,
      vert: Ss
    }, ra = {
      cw: Ki,
      ccw: ea
    };
    function Jt(e) {
      return Array.isArray(e) || ye(e) || tr(e);
    }
    function af(e) {
      return e.sort(function(t, s) {
        return t === lr ? -1 : s === lr ? 1 : t < s ? -1 : 1;
      });
    }
    function ke(e, t, s, x) {
      this.thisDep = e, this.contextDep = t, this.propDep = s, this.append = x;
    }
    function br(e) {
      return e && !(e.thisDep || e.contextDep || e.propDep);
    }
    function De(e) {
      return new ke(!1, !1, !1, e);
    }
    function We(e, t) {
      var s = e.type;
      if (s === Nn) {
        var x = e.data.length;
        return new ke(
          !0,
          x >= 1,
          x >= 2,
          t
        );
      } else if (s === Ut) {
        var O = e.data;
        return new ke(
          O.thisDep,
          O.contextDep,
          O.propDep,
          t
        );
      } else {
        if (s === Ci)
          return new ke(
            !1,
            !1,
            !1,
            t
          );
        if (s === Gi) {
          for (var E = !1, g = !1, N = !1, D = 0; D < e.data.length; ++D) {
            var M = e.data[D];
            if (M.type === Bn)
              N = !0;
            else if (M.type === In)
              g = !0;
            else if (M.type === Pn)
              E = !0;
            else if (M.type === Nn) {
              E = !0;
              var V = M.data;
              V >= 1 && (g = !0), V >= 2 && (N = !0);
            } else
              M.type === Ut && (E = E || M.data.thisDep, g = g || M.data.contextDep, N = N || M.data.propDep);
          }
          return new ke(
            E,
            g,
            N,
            t
          );
        } else
          return new ke(
            s === Pn,
            s === In,
            s === Bn,
            t
          );
      }
    }
    var ff = new ke(!1, !1, !1, function() {
    });
    function Vs(e, t, s, x, O, E, g, N, D, M, V, U, X, B, k) {
      var v = M.Record, A = {
        add: 32774,
        subtract: 32778,
        "reverse subtract": 32779
      };
      s.ext_blend_minmax && (A.min = Is, A.max = Ps);
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
      H(Fi, Rs), H(Di, Os), I(Ni, "blendColor", [0, 0, 0, 0]), I(
        kn,
        "blendEquationSeparate",
        [ef, ef]
      ), I(
        Mn,
        "blendFuncSeparate",
        [Ji, Zi, Ji, Zi]
      ), H(Bi, Gs, !0), I(Ii, "depthFunc", Ms), I(Pi, "depthRange", [0, 1]), I(ki, "depthMask", !0), I(Un, Un, [!0, !0, !0, !0]), H(Mi, Ls), I(Ui, "cullFace", Fr), I(Vn, Vn, ea), I(jn, jn, 1), H(Vi, Ds), I(Xn, "polygonOffset", [0, 0]), H(ji, Ns), H(Xi, Bs), I(Hn, "sampleCoverage", [1, !1]), H(Hi, Cs), I($i, "stencilMask", -1), I($n, "stencilFunc", [ks, 0, -1]), I(
        zn,
        "stencilOpSeparate",
        [Et, pr, pr, pr]
      ), I(
        ct,
        "stencilOpSeparate",
        [Fr, pr, pr, pr]
      ), H(zi, Fs), I(
        Vt,
        "scissor",
        [0, 0, e.drawingBufferWidth, e.drawingBufferHeight]
      ), I(
        lr,
        lr,
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
        isBufferArgs: Jt
      }, z = {
        primTypes: hr,
        compareFuncs: et,
        blendFuncs: or,
        blendEquations: A,
        stencilOps: _r,
        glTypes: Ar,
        orientationType: ra
      };
      n.optional(function() {
        $.isArrayLike = Le;
      }), K && (z.backBuffer = [Fr], z.drawBuffer = Ke(x.maxDrawbuffers, function(a) {
        return a === 0 ? [0] : Ke(a, function(r) {
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
          }, z.invalidBlendCombinations = tf;
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
            case Nn:
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
            case Bn:
              return u.def(p.props, f.data);
            case In:
              return u.def(p.context, f.data);
            case Pn:
              return u.def("this", f.data);
            case Ut:
              return f.data.append(a, u), f.data.ref;
            case Ci:
              return f.data.toString();
            case Gi:
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
        if (lt in r) {
          var p = !!r[lt];
          h = De(function(l, m) {
            return p;
          }), h.enable = p;
        } else if (lt in c) {
          var d = c[lt];
          h = We(d, function(l, m) {
            return l.invoke(m, d);
          });
        }
        return h;
      }
      function q(a, r) {
        var c = a.static, h = a.dynamic;
        if (Or in c) {
          var p = c[Or];
          return p ? (p = N.getFramebuffer(p), n.command(p, "invalid framebuffer object"), De(function(l, m) {
            var i = l.link(p), u = l.shared;
            m.set(
              u.framebuffer,
              ".next",
              i
            );
            var f = u.context;
            return m.set(
              f,
              "." + Kr,
              i + ".width"
            ), m.set(
              f,
              "." + Zr,
              i + ".height"
            ), i;
          })) : De(function(l, m) {
            var i = l.shared;
            m.set(
              i.framebuffer,
              ".next",
              "null"
            );
            var u = i.context;
            return m.set(
              u,
              "." + Kr,
              u + "." + Yi
            ), m.set(
              u,
              "." + Zr,
              u + "." + Qi
            ), "null";
          });
        } else if (Or in h) {
          var d = h[Or];
          return We(d, function(l, m) {
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
              "." + Kr,
              b + "?" + b + ".width:" + _ + "." + Yi
            ), m.set(
              _,
              "." + Zr,
              b + "?" + b + ".height:" + _ + "." + Qi
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
            var f = !0, b = u.x | 0, _ = u.y | 0, w, C;
            return "width" in u ? (w = u.width | 0, n.command(w >= 0, "invalid " + i, c.commandStr)) : f = !1, "height" in u ? (C = u.height | 0, n.command(C >= 0, "invalid " + i, c.commandStr)) : f = !1, new ke(
              !f && r && r.thisDep,
              !f && r && r.contextDep,
              !f && r && r.propDep,
              function(ne, Z) {
                var G = ne.shared.context, S = w;
                "width" in u || (S = Z.def(G, ".", Kr, "-", b));
                var te = C;
                return "height" in u || (te = Z.def(G, ".", Zr, "-", _)), [b, _, S, te];
              }
            );
          } else if (i in p) {
            var j = p[i], ue = We(j, function(ne, Z) {
              var G = ne.invoke(Z, j);
              n.optional(function() {
                ne.assert(
                  Z,
                  G + "&&typeof " + G + '==="object"',
                  "invalid " + i
                );
              });
              var S = ne.shared.context, te = Z.def(G, ".x|0"), re = Z.def(G, ".y|0"), oe = Z.def(
                '"width" in ',
                G,
                "?",
                G,
                ".width|0:",
                "(",
                S,
                ".",
                Kr,
                "-",
                te,
                ")"
              ), Te = Z.def(
                '"height" in ',
                G,
                "?",
                G,
                ".height|0:",
                "(",
                S,
                ".",
                Zr,
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
            return r ? new ke(
              r.thisDep,
              r.contextDep,
              r.propDep,
              function(ne, Z) {
                var G = ne.shared.context;
                return [
                  0,
                  0,
                  Z.def(G, ".", Kr),
                  Z.def(G, ".", Zr)
                ];
              }
            ) : null;
        }
        var l = d(lr);
        if (l) {
          var m = l;
          l = new ke(
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
                "." + Ts,
                f[3]
              ), f;
            }
          );
        }
        return {
          viewport: l,
          scissor_box: d(Vt)
        };
      }
      function le(a, r) {
        var c = a.static, h = typeof c[mt] == "string" && typeof c[dt] == "string";
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
      function pe(a, r, c) {
        var h = a.static, p = a.dynamic;
        function d(f) {
          if (f in h) {
            var b = t.id(h[f]);
            n.optional(function() {
              V.shader(nf[f], b, n.guessCommand());
            });
            var _ = De(function() {
              return b;
            });
            return _.id = b, _;
          } else if (f in p) {
            var w = p[f];
            return We(w, function(C, j) {
              var ue = C.invoke(j, w), ne = j.def(C.shared.strings, ".id(", ue, ")");
              return n.optional(function() {
                j(
                  C.shared.shader,
                  ".shader(",
                  nf[f],
                  ",",
                  ne,
                  ",",
                  C.command,
                  ");"
                );
              }), ne;
            });
          }
          return null;
        }
        var l = d(mt), m = d(dt), i = null, u;
        return br(l) && br(m) ? (i = V.program(m.id, l.id, null, c), u = De(function(f, b) {
          return f.link(i);
        })) : u = new ke(
          l && l.thisDep || m && m.thisDep,
          l && l.contextDep || m && m.contextDep,
          l && l.propDep || m && m.propDep,
          function(f, b) {
            var _ = f.shared.shader, w;
            l ? w = l.append(f, b) : w = b.def(_, ".", mt);
            var C;
            m ? C = m.append(f, b) : C = b.def(_, ".", dt);
            var j = _ + ".program(" + C + "," + w;
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
      function Oe(a, r) {
        var c = a.static, h = a.dynamic, p = {}, d = !1;
        function l() {
          if (ht in c) {
            var Z = c[ht];
            return Z !== null && M.getVAO(Z) === null && (Z = M.createVAO(Z)), d = !0, p.vao = Z, De(function(S) {
              var te = M.getVAO(Z);
              return te ? S.link(te) : "null";
            });
          } else if (ht in h) {
            d = !0;
            var G = h[ht];
            return We(G, function(S, te) {
              var re = S.invoke(te, G);
              return te.def(S.shared.vao + ".getVAO(" + re + ")");
            });
          }
          return null;
        }
        var m = l(), i = !1;
        function u() {
          if (Rr in c) {
            var Z = c[Rr];
            if (p.elements = Z, Jt(Z)) {
              var G = p.elements = E.create(Z, !0);
              Z = E.getElements(G), i = !0;
            } else
              Z && (Z = E.getElements(Z), i = !0, n.command(Z, "invalid elements", r.commandStr));
            var S = De(function(re, oe) {
              if (Z) {
                var Te = re.link(Z);
                return re.ELEMENTS = Te, Te;
              }
              return re.ELEMENTS = null, null;
            });
            return S.value = Z, S;
          } else if (Rr in h) {
            i = !0;
            var te = h[Rr];
            return We(te, function(re, oe) {
              var Te = re.shared, He = Te.isBufferArgs, Nr = Te.elements, dr = re.invoke(oe, te), sr = oe.def("null"), yr = oe.def(He, "(", dr, ")"), Br = re.cond(yr).then(sr, "=", Nr, ".createStream(", dr, ");").else(sr, "=", Nr, ".getElements(", dr, ");");
              return n.optional(function() {
                re.assert(
                  Br.else,
                  "!" + dr + "||" + sr,
                  "invalid elements"
                );
              }), oe.entry(Br), oe.exit(
                re.cond(yr).then(Nr, ".destroyStream(", sr, ");")
              ), re.ELEMENTS = sr, sr;
            });
          } else if (d)
            return new ke(
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
          if (Cr in c) {
            var Z = c[Cr];
            return p.primitive = Z, n.commandParameter(Z, hr, "invalid primitve", r.commandStr), De(function(S, te) {
              return hr[Z];
            });
          } else if (Cr in h) {
            var G = h[Cr];
            return We(G, function(S, te) {
              var re = S.constants.primTypes, oe = S.invoke(te, G);
              return n.optional(function() {
                S.assert(
                  te,
                  oe + " in " + re,
                  "invalid primitive, must be one of " + Object.keys(hr)
                );
              }), te.def(re, "[", oe, "]");
            });
          } else {
            if (i)
              return br(f) ? f.value ? De(function(S, te) {
                return te.def(S.ELEMENTS, ".primType");
              }) : De(function() {
                return Jn;
              }) : new ke(
                f.thisDep,
                f.contextDep,
                f.propDep,
                function(S, te) {
                  var re = S.ELEMENTS;
                  return te.def(re, "?", re, ".primType:", Jn);
                }
              );
            if (d)
              return new ke(
                m.thisDep,
                m.contextDep,
                m.propDep,
                function(S, te) {
                  return te.def(S.shared.vao + ".currentVAO?" + S.shared.vao + ".currentVAO.primitive:" + Jn);
                }
              );
          }
          return null;
        }
        function _(Z, G) {
          if (Z in c) {
            var S = c[Z] | 0;
            return G ? p.offset = S : p.instances = S, n.command(!G || S >= 0, "invalid " + Z, r.commandStr), De(function(re, oe) {
              return G && (re.OFFSET = S), S;
            });
          } else if (Z in h) {
            var te = h[Z];
            return We(te, function(re, oe) {
              var Te = re.invoke(oe, te);
              return G && (re.OFFSET = Te, n.optional(function() {
                re.assert(
                  oe,
                  Te + ">=0",
                  "invalid " + Z
                );
              })), Te;
            });
          } else if (G) {
            if (i)
              return De(function(re, oe) {
                return re.OFFSET = 0, 0;
              });
            if (d)
              return new ke(
                m.thisDep,
                m.contextDep,
                m.propDep,
                function(re, oe) {
                  return oe.def(re.shared.vao + ".currentVAO?" + re.shared.vao + ".currentVAO.offset:0");
                }
              );
          } else if (d)
            return new ke(
              m.thisDep,
              m.contextDep,
              m.propDep,
              function(re, oe) {
                return oe.def(re.shared.vao + ".currentVAO?" + re.shared.vao + ".currentVAO.instances:-1");
              }
            );
          return null;
        }
        var w = _(jt, !0);
        function C() {
          if (Gr in c) {
            var Z = c[Gr] | 0;
            return p.count = Z, n.command(
              typeof Z == "number" && Z >= 0,
              "invalid vertex count",
              r.commandStr
            ), De(function() {
              return Z;
            });
          } else if (Gr in h) {
            var G = h[Gr];
            return We(G, function(oe, Te) {
              var He = oe.invoke(Te, G);
              return n.optional(function() {
                oe.assert(
                  Te,
                  "typeof " + He + '==="number"&&' + He + ">=0&&" + He + "===(" + He + "|0)",
                  "invalid vertex count"
                );
              }), He;
            });
          } else if (i)
            if (br(f)) {
              if (f)
                return w ? new ke(
                  w.thisDep,
                  w.contextDep,
                  w.propDep,
                  function(oe, Te) {
                    var He = Te.def(
                      oe.ELEMENTS,
                      ".vertCount-",
                      oe.OFFSET
                    );
                    return n.optional(function() {
                      oe.assert(
                        Te,
                        He + ">=0",
                        "invalid vertex offset/element buffer too small"
                      );
                    }), He;
                  }
                ) : De(function(oe, Te) {
                  return Te.def(oe.ELEMENTS, ".vertCount");
                });
              var S = De(function() {
                return -1;
              });
              return n.optional(function() {
                S.MISSING = !0;
              }), S;
            } else {
              var te = new ke(
                f.thisDep || w.thisDep,
                f.contextDep || w.contextDep,
                f.propDep || w.propDep,
                function(oe, Te) {
                  var He = oe.ELEMENTS;
                  return oe.OFFSET ? Te.def(
                    He,
                    "?",
                    He,
                    ".vertCount-",
                    oe.OFFSET,
                    ":-1"
                  ) : Te.def(He, "?", He, ".vertCount:-1");
                }
              );
              return n.optional(function() {
                te.DYNAMIC = !0;
              }), te;
            }
          else if (d) {
            var re = new ke(
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
        var j = b(), ue = C(), ne = _(Xt, !1);
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
      function Re(a, r) {
        var c = a.static, h = a.dynamic, p = {};
        return ae.forEach(function(d) {
          var l = ee(d);
          function m(i, u) {
            if (d in c) {
              var f = i(c[d]);
              p[l] = De(function() {
                return f;
              });
            } else if (d in h) {
              var b = h[d];
              p[l] = We(b, function(_, w) {
                return u(_, w, _.invoke(w, b));
              });
            }
          }
          switch (d) {
            case Mi:
            case Di:
            case Fi:
            case Hi:
            case Bi:
            case zi:
            case Vi:
            case ji:
            case Xi:
            case ki:
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
            case Ii:
              return m(
                function(i) {
                  return n.commandParameter(i, et, "invalid " + d, r.commandStr), et[i];
                },
                function(i, u, f) {
                  var b = i.constants.compareFuncs;
                  return n.optional(function() {
                    i.assert(
                      u,
                      f + " in " + b,
                      "invalid " + d + ", must be one of " + Object.keys(et)
                    );
                  }), u.def(b, "[", f, "]");
                }
              );
            case Pi:
              return m(
                function(i) {
                  return n.command(
                    Le(i) && i.length === 2 && typeof i[0] == "number" && typeof i[1] == "number" && i[0] <= i[1],
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
            case Mn:
              return m(
                function(i) {
                  n.commandType(i, "object", "blend.func", r.commandStr);
                  var u = "srcRGB" in i ? i.srcRGB : i.src, f = "srcAlpha" in i ? i.srcAlpha : i.src, b = "dstRGB" in i ? i.dstRGB : i.dst, _ = "dstAlpha" in i ? i.dstAlpha : i.dst;
                  return n.commandParameter(u, or, l + ".srcRGB", r.commandStr), n.commandParameter(f, or, l + ".srcAlpha", r.commandStr), n.commandParameter(b, or, l + ".dstRGB", r.commandStr), n.commandParameter(_, or, l + ".dstAlpha", r.commandStr), n.command(
                    tf.indexOf(u + ", " + b) === -1,
                    "unallowed blending combination (srcRGB, dstRGB) = (" + u + ", " + b + ")",
                    r.commandStr
                  ), [
                    or[u],
                    or[b],
                    or[f],
                    or[_]
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
                  function _(G, S) {
                    var te = u.def(
                      '"',
                      G,
                      S,
                      '" in ',
                      f,
                      "?",
                      f,
                      ".",
                      G,
                      S,
                      ":",
                      f,
                      ".",
                      G
                    );
                    return n.optional(function() {
                      i.assert(
                        u,
                        te + " in " + b,
                        "invalid " + d + "." + G + S + ", must be one of " + Object.keys(or)
                      );
                    }), te;
                  }
                  var w = _("src", "RGB"), C = _("dst", "RGB");
                  n.optional(function() {
                    var G = i.constants.invalidBlendCombinations;
                    i.assert(
                      u,
                      G + ".indexOf(" + w + '+", "+' + C + ") === -1 ",
                      "unallowed blending combination for (srcRGB, dstRGB)"
                    );
                  });
                  var j = u.def(b, "[", w, "]"), ue = u.def(b, "[", _("src", "Alpha"), "]"), ne = u.def(b, "[", C, "]"), Z = u.def(b, "[", _("dst", "Alpha"), "]");
                  return [j, ne, ue, Z];
                }
              );
            case kn:
              return m(
                function(i) {
                  if (typeof i == "string")
                    return n.commandParameter(i, A, "invalid " + d, r.commandStr), [
                      A[i],
                      A[i]
                    ];
                  if (typeof i == "object")
                    return n.commandParameter(
                      i.rgb,
                      A,
                      d + ".rgb",
                      r.commandStr
                    ), n.commandParameter(
                      i.alpha,
                      A,
                      d + ".alpha",
                      r.commandStr
                    ), [
                      A[i.rgb],
                      A[i.alpha]
                    ];
                  n.commandRaise("invalid blend.equation", r.commandStr);
                },
                function(i, u, f) {
                  var b = i.constants.blendEquations, _ = u.def(), w = u.def(), C = i.cond("typeof ", f, '==="string"');
                  return n.optional(function() {
                    function j(ue, ne, Z) {
                      i.assert(
                        ue,
                        Z + " in " + b,
                        "invalid " + ne + ", must be one of " + Object.keys(A)
                      );
                    }
                    j(C.then, d, f), i.assert(
                      C.else,
                      f + "&&typeof " + f + '==="object"',
                      "invalid " + d
                    ), j(C.else, d + ".rgb", f + ".rgb"), j(C.else, d + ".alpha", f + ".alpha");
                  }), C.then(
                    _,
                    "=",
                    w,
                    "=",
                    b,
                    "[",
                    f,
                    "];"
                  ), C.else(
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
                  ), u(C), [_, w];
                }
              );
            case Ni:
              return m(
                function(i) {
                  return n.command(
                    Le(i) && i.length === 4,
                    "blend.color must be a 4d array",
                    r.commandStr
                  ), Ke(4, function(u) {
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
                  }), Ke(4, function(b) {
                    return u.def("+", f, "[", b, "]");
                  });
                }
              );
            case $i:
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
            case $n:
              return m(
                function(i) {
                  n.commandType(i, "object", l, r.commandStr);
                  var u = i.cmp || "keep", f = i.ref || 0, b = "mask" in i ? i.mask : -1;
                  return n.commandParameter(u, et, d + ".cmp", r.commandStr), n.commandType(f, "number", d + ".ref", r.commandStr), n.commandType(b, "number", d + ".mask", r.commandStr), [
                    et[u],
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
                    pr
                  ), w = u.def(f, ".ref|0"), C = u.def(
                    '"mask" in ',
                    f,
                    "?",
                    f,
                    ".mask|0:-1"
                  );
                  return [_, w, C];
                }
              );
            case zn:
            case ct:
              return m(
                function(i) {
                  n.commandType(i, "object", l, r.commandStr);
                  var u = i.fail || "keep", f = i.zfail || "keep", b = i.zpass || "keep";
                  return n.commandParameter(u, _r, d + ".fail", r.commandStr), n.commandParameter(f, _r, d + ".zfail", r.commandStr), n.commandParameter(b, _r, d + ".zpass", r.commandStr), [
                    d === ct ? Fr : Et,
                    _r[u],
                    _r[f],
                    _r[b]
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
                        "invalid " + d + "." + w + ", must be one of " + Object.keys(_r)
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
                      pr
                    );
                  }
                  return [
                    d === ct ? Fr : Et,
                    _("fail"),
                    _("zfail"),
                    _("zpass")
                  ];
                }
              );
            case Xn:
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
            case Ui:
              return m(
                function(i) {
                  var u = 0;
                  return i === "front" ? u = Et : i === "back" && (u = Fr), n.command(!!u, l, r.commandStr), u;
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      f + '==="front"||' + f + '==="back"',
                      "invalid cull.face"
                    );
                  }), u.def(f, '==="front"?', Et, ":", Fr);
                }
              );
            case jn:
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
            case Vn:
              return m(
                function(i) {
                  return n.commandParameter(i, ra, l, r.commandStr), ra[i];
                },
                function(i, u, f) {
                  return n.optional(function() {
                    i.assert(
                      u,
                      f + '==="cw"||' + f + '==="ccw"',
                      "invalid frontFace, must be one of cw,ccw"
                    );
                  }), u.def(f + '==="cw"?' + Ki + ":" + ea);
                }
              );
            case Un:
              return m(
                function(i) {
                  return n.command(
                    Le(i) && i.length === 4,
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
                  }), Ke(4, function(b) {
                    return "!!" + f + "[" + b + "]";
                  });
                }
              );
            case Hn:
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
            m = De(function() {
              return l;
            });
          else if (typeof l == "function") {
            var i = l._reglType;
            i === "texture2d" || i === "textureCube" ? m = De(function(u) {
              return u.link(l);
            }) : i === "framebuffer" || i === "framebufferCube" ? (n.command(
              l.color.length > 0,
              'missing color attachment for framebuffer sent to uniform "' + d + '"',
              r.commandStr
            ), m = De(function(u) {
              return u.link(l.color[0]);
            })) : n.commandRaise('invalid data for uniform "' + d + '"', r.commandStr);
          } else
            Le(l) ? m = De(function(u) {
              var f = u.global.def(
                "[",
                Ke(l.length, function(b) {
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
          p[d] = We(l, function(m, i) {
            return m.invoke(i, l);
          });
        }), p;
      }
      function Be(a, r) {
        var c = a.static, h = a.dynamic, p = {};
        return Object.keys(c).forEach(function(d) {
          var l = c[d], m = t.id(d), i = new v();
          if (Jt(l))
            i.state = qr, i.buffer = O.getBuffer(
              O.create(l, Jr, !1, !0)
            ), i.type = 0;
          else {
            var u = O.getBuffer(l);
            if (u)
              i.state = qr, i.buffer = u, i.type = 0;
            else if (n.command(
              typeof l == "object" && l,
              "invalid data for attribute " + d,
              r.commandStr
            ), "constant" in l) {
              var f = l.constant;
              i.buffer = "null", i.state = Dn, typeof f == "number" ? i.x = f : (n.command(
                Le(f) && f.length > 0 && f.length <= 4,
                "invalid constant for attribute " + d,
                r.commandStr
              ), Qr.forEach(function(ne, Z) {
                Z < f.length && (i[ne] = f[Z]);
              }));
            } else {
              Jt(l.buffer) ? u = O.getBuffer(
                O.create(l.buffer, Jr, !1, !0)
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
              var C = !!l.normalized, j = 0;
              "type" in l && (n.commandParameter(
                l.type,
                Ar,
                "invalid type for attribute " + d,
                r.commandStr
              ), j = Ar[l.type]);
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
                Object.keys(l).forEach(function(G) {
                  n.command(
                    Z.indexOf(G) >= 0,
                    'unknown parameter "' + G + '" for attribute pointer "' + d + '" (valid parameters are ' + Z + ")",
                    ne
                  );
                });
              }), i.buffer = u, i.state = qr, i.size = w, i.normalized = C, i.type = j || u.dtype, i.offset = b, i.stride = _, i.divisor = ue;
            }
          }
          p[d] = De(function(ne, Z) {
            var G = ne.attribCache;
            if (m in G)
              return G[m];
            var S = {
              isStream: !1
            };
            return Object.keys(i).forEach(function(te) {
              S[te] = i[te];
            }), i.buffer && (S.buffer = ne.link(i.buffer), S.type = S.type || S.buffer + ".dtype"), G[m] = S, S;
          });
        }), Object.keys(h).forEach(function(d) {
          var l = h[d];
          function m(i, u) {
            var f = i.invoke(u, l), b = i.shared, _ = i.constants, w = b.isBufferArgs, C = b.buffer;
            n.optional(function() {
              i.assert(
                u,
                f + "&&(typeof " + f + '==="object"||typeof ' + f + '==="function")&&(' + w + "(" + f + ")||" + C + ".getBuffer(" + f + ")||" + C + ".getBuffer(" + f + ".buffer)||" + w + "(" + f + '.buffer)||("constant" in ' + f + "&&(typeof " + f + '.constant==="number"||' + b.isArrayLike + "(" + f + ".constant))))",
                'invalid dynamic attribute "' + d + '"'
              );
            });
            var j = {
              isStream: u.def(!1)
            }, ue = new v();
            ue.state = qr, Object.keys(ue).forEach(function(S) {
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
              C,
              ".createStream(",
              Jr,
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
              C,
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
              Dn,
              ";",
              "if(typeof " + f + '.constant === "number"){',
              j[Qr[0]],
              "=",
              f,
              ".constant;",
              Qr.slice(1).map(function(S) {
                return j[S];
              }).join("="),
              "=0;",
              "}else{",
              Qr.map(function(S, te) {
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
              C,
              ".createStream(",
              Jr,
              ",",
              f,
              ".buffer);",
              "}else{",
              ne,
              "=",
              C,
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
            function G(S) {
              u(j[S], "=", f, ".", S, "|0;");
            }
            return G("size"), G("offset"), G("stride"), G("divisor"), u("}}"), u.exit(
              "if(",
              j.isStream,
              "){",
              C,
              ".destroyStream(",
              ne,
              ");",
              "}"
            ), j;
          }
          p[d] = We(l, m);
        }), p;
      }
      function Se(a) {
        var r = a.static, c = a.dynamic, h = {};
        return Object.keys(r).forEach(function(p) {
          var d = r[p];
          h[p] = De(function(l, m) {
            return typeof d == "number" || typeof d == "boolean" ? "" + d : l.link(d);
          });
        }), Object.keys(c).forEach(function(p) {
          var d = c[p];
          h[p] = We(d, function(l, m) {
            return l.invoke(m, d);
          });
        }), h;
      }
      function Ne(a, r, c, h, p) {
        var d = a.static, l = a.dynamic;
        n.optional(function() {
          var G = [
            Or,
            dt,
            mt,
            Rr,
            Cr,
            jt,
            Gr,
            Xt,
            lt,
            ht
          ].concat(ae);
          function S(te) {
            Object.keys(te).forEach(function(re) {
              n.command(
                G.indexOf(re) >= 0,
                'unknown parameter "' + re + '"',
                p.commandStr
              );
            });
          }
          S(d), S(l);
        });
        var m = le(a, r), i = q(a), u = fe(a, i, p), f = Oe(a, p), b = Re(a, p), _ = pe(a, p, m);
        function w(G) {
          var S = u[G];
          S && (b[G] = S);
        }
        w(lr), w(ee(Vt));
        var C = Object.keys(b).length > 0, j = {
          framebuffer: i,
          draw: f,
          shader: _,
          state: b,
          dirty: C,
          scopeVAO: null,
          drawVAO: null,
          useVAO: !1,
          attributes: {}
        };
        if (j.profile = Y(a), j.uniforms = be(c, p), j.drawVAO = j.scopeVAO = f.vao, !j.drawVAO && _.program && !m && s.angle_instanced_arrays && f.static.elements) {
          var ue = !0, ne = _.program.attributes.map(function(G) {
            var S = r.static[G];
            return ue = ue && !!S, S;
          });
          if (ue && ne.length > 0) {
            var Z = M.getVAO(M.createVAO({
              attributes: ne,
              elements: f.static.elements
            }));
            j.drawVAO = new ke(null, null, null, function(G, S) {
              return G.link(Z);
            }), j.useVAO = !0;
          }
        }
        return m ? j.useVAO = !0 : j.attributes = Be(r, p), j.context = Se(h), j;
      }
      function Ie(a, r, c) {
        var h = a.shared, p = h.context, d = a.scope();
        Object.keys(c).forEach(function(l) {
          r.save(p, "." + l);
          var m = c[l], i = m.append(a, r);
          Array.isArray(i) ? d(p, ".", l, "=[", i.join(), "];") : d(p, ".", l, "=", i, ";");
        }), r(d);
      }
      function Pe(a, r, c, h) {
        var p = a.shared, d = p.gl, l = p.framebuffer, m;
        K && (m = r.def(p.extensions, ".webgl_draw_buffers"));
        var i = a.constants, u = i.drawBuffer, f = i.backBuffer, b;
        c ? b = c.append(a, r) : b = r.def(l, ".next"), h || r("if(", b, "!==", l, ".cur){"), r(
          "if(",
          b,
          "){",
          d,
          ".bindFramebuffer(",
          rf,
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
          rf,
          ",null);"
        ), K && r(m, ".drawBuffersWEBGL(", f, ");"), r(
          "}",
          l,
          ".cur=",
          b,
          ";"
        ), h || r("}");
      }
      function Me(a, r, c) {
        var h = a.shared, p = h.gl, d = a.current, l = a.next, m = h.current, i = h.next, u = a.cond(m, ".dirty");
        ae.forEach(function(f) {
          var b = ee(f);
          if (!(b in c.state)) {
            var _, w;
            if (b in l) {
              _ = l[b], w = d[b];
              var C = Ke(Q[b].length, function(ue) {
                return u.def(_, "[", ue, "]");
              });
              u(a.cond(C.map(function(ue, ne) {
                return ue + "!==" + w + "[" + ne + "]";
              }).join("||")).then(
                p,
                ".",
                L[b],
                "(",
                C,
                ");",
                C.map(function(ue, ne) {
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
      function je(a, r, c, h) {
        var p = a.shared, d = a.current, l = p.current, m = p.gl;
        af(Object.keys(c)).forEach(function(i) {
          var u = c[i];
          if (!(h && !h(u))) {
            var f = u.append(a, r);
            if (R[i]) {
              var b = R[i];
              br(u) ? f ? r(m, ".enable(", b, ");") : r(m, ".disable(", b, ");") : r(a.cond(f).then(m, ".enable(", b, ");").else(m, ".disable(", b, ");")), r(l, ".", i, "=", f, ";");
            } else if (Le(f)) {
              var _ = d[i];
              r(
                m,
                ".",
                L[i],
                "(",
                f,
                ");",
                f.map(function(w, C) {
                  return _ + "[" + C + "]=" + w;
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
        function w(G) {
          b = r.def(), G(b, "=", f(), ";"), typeof p == "string" ? G(l, ".count+=", p, ";") : G(l, ".count++;"), B && (h ? (_ = r.def(), G(_, "=", i, ".getNumPendingQueries();")) : G(i, ".beginQuery(", l, ");"));
        }
        function C(G) {
          G(l, ".cpuTime+=", f(), "-", b, ";"), B && (h ? G(
            i,
            ".pushScopeStats(",
            _,
            ",",
            i,
            ".getNumPendingQueries(),",
            l,
            ");"
          ) : G(i, ".endQuery();"));
        }
        function j(G) {
          var S = r.def(m, ".profile");
          r(m, ".profile=", G, ";"), r.exit(m, ".profile=", S, ";");
        }
        var ue;
        if (u) {
          if (br(u)) {
            u.enable ? (w(r), C(r.exit), j("true")) : j("false");
            return;
          }
          ue = u.append(a, r), j(ue);
        } else
          ue = r.def(m, ".profile");
        var ne = a.block();
        w(ne), r("if(", ue, "){", ne, "}");
        var Z = a.block();
        C(Z), r.exit("if(", ue, "){", Z, "}");
      }
      function Xe(a, r, c, h, p) {
        var d = a.shared;
        function l(i) {
          switch (i) {
            case Ht:
            case Wt:
            case qt:
              return 2;
            case $t:
            case Yt:
            case Kt:
              return 3;
            case zt:
            case Qt:
            case Zt:
              return 4;
            default:
              return 1;
          }
        }
        function m(i, u, f) {
          var b = d.gl, _ = r.def(i, ".location"), w = r.def(d.attributes, "[", _, "]"), C = f.state, j = f.buffer, ue = [
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
              Jr,
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
          function G() {
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
              Qr.map(function(S, te) {
                return w + "." + S + "!==" + ue[te];
              }).join("||"),
              "){",
              b,
              ".vertexAttrib4f(",
              _,
              ",",
              ue,
              ");",
              Qr.map(function(S, te) {
                return w + "." + S + "=" + ue[te] + ";";
              }).join(""),
              "}"
            );
          }
          C === qr ? Z() : C === Dn ? G() : (r("if(", C, "===", qr, "){"), Z(), r("}else{"), G(), r("}"));
        }
        h.forEach(function(i) {
          var u = i.name, f = c.attributes[u], b;
          if (f) {
            if (!p(f))
              return;
            b = f.append(a, r);
          } else {
            if (!p(ff))
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
      function xe(a, r, c, h, p, d) {
        for (var l = a.shared, m = l.gl, i = {}, u, f = 0; f < h.length; ++f) {
          var b = h[f], _ = b.name, w = b.info.type, C = b.info.size, j = c.uniforms[_];
          if (C > 1) {
            if (!j)
              continue;
            var ue = _.replace("[0]", "");
            if (i[ue])
              continue;
            i[ue] = 1;
          }
          var ne = a.link(b), Z = ne + ".location", G;
          if (j) {
            if (!p(j))
              continue;
            if (br(j)) {
              var S = j.value;
              if (n.command(
                S !== null && typeof S < "u",
                'missing uniform "' + _ + '"',
                a.commandStr
              ), w === bt || w === yt) {
                n.command(
                  typeof S == "function" && (w === bt && (S._reglType === "texture2d" || S._reglType === "framebuffer") || w === yt && (S._reglType === "textureCube" || S._reglType === "framebufferCube")),
                  "invalid texture for uniform " + _,
                  a.commandStr
                );
                var te = a.link(S._texture || S.color[0]._texture);
                r(m, ".uniform1i(", Z, ",", te + ".bind());"), r.exit(te, ".unbind();");
              } else if (w === vt || w === pt || w === _t) {
                n.optional(function() {
                  n.command(
                    Le(S),
                    "invalid matrix for uniform " + _,
                    a.commandStr
                  ), n.command(
                    w === vt && S.length === 4 || w === pt && S.length === 9 || w === _t && S.length === 16,
                    "invalid length for matrix uniform " + _,
                    a.commandStr
                  );
                });
                var re = a.global.def("new Float32Array([" + Array.prototype.slice.call(S) + "])"), oe = 2;
                w === pt ? oe = 3 : w === _t && (oe = 4), r(
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
                  case qn:
                    C === 1 ? n.commandType(S, "number", "uniform " + _, a.commandStr) : n.command(
                      Le(S) && S.length === C,
                      "uniform " + _,
                      a.commandStr
                    ), u = "1f";
                    break;
                  case Ht:
                    n.command(
                      Le(S) && S.length && S.length % 2 === 0 && S.length <= C * 2,
                      "uniform " + _,
                      a.commandStr
                    ), u = "2f";
                    break;
                  case $t:
                    n.command(
                      Le(S) && S.length && S.length % 3 === 0 && S.length <= C * 3,
                      "uniform " + _,
                      a.commandStr
                    ), u = "3f";
                    break;
                  case zt:
                    n.command(
                      Le(S) && S.length && S.length % 4 === 0 && S.length <= C * 4,
                      "uniform " + _,
                      a.commandStr
                    ), u = "4f";
                    break;
                  case Zn:
                    C === 1 ? n.commandType(S, "boolean", "uniform " + _, a.commandStr) : n.command(
                      Le(S) && S.length === C,
                      "uniform " + _,
                      a.commandStr
                    ), u = "1i";
                    break;
                  case Kn:
                    C === 1 ? n.commandType(S, "number", "uniform " + _, a.commandStr) : n.command(
                      Le(S) && S.length === C,
                      "uniform " + _,
                      a.commandStr
                    ), u = "1i";
                    break;
                  case qt:
                    n.command(
                      Le(S) && S.length && S.length % 2 === 0 && S.length <= C * 2,
                      "uniform " + _,
                      a.commandStr
                    ), u = "2i";
                    break;
                  case Wt:
                    n.command(
                      Le(S) && S.length && S.length % 2 === 0 && S.length <= C * 2,
                      "uniform " + _,
                      a.commandStr
                    ), u = "2i";
                    break;
                  case Kt:
                    n.command(
                      Le(S) && S.length && S.length % 3 === 0 && S.length <= C * 3,
                      "uniform " + _,
                      a.commandStr
                    ), u = "3i";
                    break;
                  case Yt:
                    n.command(
                      Le(S) && S.length && S.length % 3 === 0 && S.length <= C * 3,
                      "uniform " + _,
                      a.commandStr
                    ), u = "3i";
                    break;
                  case Zt:
                    n.command(
                      Le(S) && S.length && S.length % 4 === 0 && S.length <= C * 4,
                      "uniform " + _,
                      a.commandStr
                    ), u = "4i";
                    break;
                  case Qt:
                    n.command(
                      Le(S) && S.length && S.length % 4 === 0 && S.length <= C * 4,
                      "uniform " + _,
                      a.commandStr
                    ), u = "4i";
                    break;
                }
                C > 1 ? (u += "v", S = a.global.def("[" + Array.prototype.slice.call(S) + "]")) : S = Le(S) ? Array.prototype.slice.call(S) : S, r(
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
              G = j.append(a, r);
          } else {
            if (!p(ff))
              continue;
            G = r.def(l.uniforms, "[", t.id(_), "]");
          }
          w === bt ? (n(!Array.isArray(G), "must specify a scalar prop for textures"), r(
            "if(",
            G,
            "&&",
            G,
            '._reglType==="framebuffer"){',
            G,
            "=",
            G,
            ".color[0];",
            "}"
          )) : w === yt && (n(!Array.isArray(G), "must specify a scalar prop for cube maps"), r(
            "if(",
            G,
            "&&",
            G,
            '._reglType==="framebufferCube"){',
            G,
            "=",
            G,
            ".color[0];",
            "}"
          )), n.optional(function() {
            function Je(Ye, en) {
              a.assert(
                r,
                Ye,
                'bad data or missing for uniform "' + _ + '".  ' + en
              );
            }
            function Ir(Ye, en) {
              en === 1 && n(!Array.isArray(G), "must not specify an array type for uniform"), Je(
                "Array.isArray(" + G + ") && typeof " + G + '[0]===" ' + Ye + '" || typeof ' + G + '==="' + Ye + '"',
                "invalid type, expected " + Ye
              );
            }
            function rr(Ye, en, rn) {
              Array.isArray(G) ? n(G.length && G.length % Ye === 0 && G.length <= Ye * rn, "must have length of " + (rn === 1 ? "" : "n * ") + Ye) : Je(
                l.isArrayLike + "(" + G + ")&&" + G + ".length && " + G + ".length % " + Ye + " === 0 && " + G + ".length<=" + Ye * rn,
                "invalid vector, should have length of " + (rn === 1 ? "" : "n * ") + Ye,
                a.commandStr
              );
            }
            function mf(Ye) {
              n(!Array.isArray(G), "must not specify a value type"), Je(
                "typeof " + G + '==="function"&&' + G + '._reglType==="texture' + (Ye === qi ? "2d" : "Cube") + '"',
                "invalid texture type",
                a.commandStr
              );
            }
            switch (w) {
              case Kn:
                Ir("number", C);
                break;
              case Wt:
                rr(2, "number", C);
                break;
              case Yt:
                rr(3, "number", C);
                break;
              case Qt:
                rr(4, "number", C);
                break;
              case qn:
                Ir("number", C);
                break;
              case Ht:
                rr(2, "number", C);
                break;
              case $t:
                rr(3, "number", C);
                break;
              case zt:
                rr(4, "number", C);
                break;
              case Zn:
                Ir("boolean", C);
                break;
              case qt:
                rr(2, "boolean", C);
                break;
              case Kt:
                rr(3, "boolean", C);
                break;
              case Zt:
                rr(4, "boolean", C);
                break;
              case vt:
                rr(4, "number", C);
                break;
              case pt:
                rr(9, "number", C);
                break;
              case _t:
                rr(16, "number", C);
                break;
              case bt:
                mf(qi);
                break;
              case yt:
                mf(ws);
                break;
            }
          });
          var Te = 1;
          switch (w) {
            case bt:
            case yt:
              var He = r.def(G, "._texture");
              r(m, ".uniform1i(", Z, ",", He, ".bind());"), r.exit(He, ".unbind();");
              continue;
            case Kn:
            case Zn:
              u = "1i";
              break;
            case Wt:
            case qt:
              u = "2i", Te = 2;
              break;
            case Yt:
            case Kt:
              u = "3i", Te = 3;
              break;
            case Qt:
            case Zt:
              u = "4i", Te = 4;
              break;
            case qn:
              u = "1f";
              break;
            case Ht:
              u = "2f", Te = 2;
              break;
            case $t:
              u = "3f", Te = 3;
              break;
            case zt:
              u = "4f", Te = 4;
              break;
            case vt:
              u = "Matrix2fv";
              break;
            case pt:
              u = "Matrix3fv";
              break;
            case _t:
              u = "Matrix4fv";
              break;
          }
          if (u.indexOf("Matrix") === -1 && C > 1 && (u += "v", Te = 1), u.charAt(0) === "M") {
            r(m, ".uniform", u, "(", Z, ",");
            var Nr = Math.pow(w - vt + 2, 2), dr = a.global.def("new Float32Array(", Nr, ")");
            Array.isArray(G) ? r(
              "false,(",
              Ke(Nr, function(Je) {
                return dr + "[" + Je + "]=" + G[Je];
              }),
              ",",
              dr,
              ")"
            ) : r(
              "false,(Array.isArray(",
              G,
              ")||",
              G,
              " instanceof Float32Array)?",
              G,
              ":(",
              Ke(Nr, function(Je) {
                return dr + "[" + Je + "]=" + G + "[" + Je + "]";
              }),
              ",",
              dr,
              ")"
            ), r(");");
          } else if (Te > 1) {
            for (var sr = [], yr = [], Br = 0; Br < Te; ++Br)
              Array.isArray(G) ? yr.push(G[Br]) : yr.push(r.def(G + "[" + Br + "]")), d && sr.push(r.def());
            d && r("if(!", a.batchId, "||", sr.map(function(Je, Ir) {
              return Je + "!==" + yr[Ir];
            }).join("||"), "){", sr.map(function(Je, Ir) {
              return Je + "=" + yr[Ir] + ";";
            }).join("")), r(m, ".uniform", u, "(", Z, ",", yr.join(","), ");"), d && r("}");
          } else {
            if (n(!Array.isArray(G), "uniform value must not be an array"), d) {
              var df = r.def();
              r(
                "if(!",
                a.batchId,
                "||",
                df,
                "!==",
                G,
                "){",
                df,
                "=",
                G,
                ";"
              );
            }
            r(m, ".uniform", u, "(", Z, ",", G, ");"), d && r("}");
          }
        }
      }
      function ie(a, r, c, h) {
        var p = a.shared, d = p.gl, l = p.draw, m = h.draw;
        function i() {
          var te = m.elements, re, oe = r;
          return te ? ((te.contextDep && h.contextDynamic || te.propDep) && (oe = c), re = te.append(a, oe), m.elementsActive && oe(
            "if(" + re + ")" + d + ".bindBuffer(" + Qn + "," + re + ".buffer.buffer);"
          )) : (re = oe.def(), oe(
            re,
            "=",
            l,
            ".",
            Rr,
            ";",
            "if(",
            re,
            "){",
            d,
            ".bindBuffer(",
            Qn,
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
            F ? "" : "if(" + re + ")" + d + ".bindBuffer(" + Qn + "," + re + ".buffer.buffer);",
            "}"
          )), re;
        }
        function u() {
          var te = m.count, re, oe = r;
          return te ? ((te.contextDep && h.contextDynamic || te.propDep) && (oe = c), re = te.append(a, oe), n.optional(function() {
            te.MISSING && a.assert(r, "false", "missing vertex count"), te.DYNAMIC && a.assert(oe, re + ">=0", "missing vertex count");
          })) : (re = oe.def(l, ".", Gr), n.optional(function() {
            a.assert(oe, re + ">=0", "missing vertex count");
          })), re;
        }
        var f = i();
        function b(te) {
          var re = m[te];
          return re ? re.contextDep && h.contextDynamic || re.propDep ? re.append(a, c) : re.append(a, r) : r.def(l, ".", te);
        }
        var _ = b(Cr), w = b(jt), C = u();
        if (typeof C == "number") {
          if (C === 0)
            return;
        } else
          c("if(", C, "){"), c.exit("}");
        var j, ue;
        P && (j = b(Xt), ue = a.instancing);
        var ne = f + ".type", Z = m.elements && br(m.elements) && !m.vaoActive;
        function G() {
          function te() {
            c(ue, ".drawElementsInstancedANGLE(", [
              _,
              C,
              ne,
              w + "<<((" + ne + "-" + Ri + ")>>1)",
              j
            ], ");");
          }
          function re() {
            c(
              ue,
              ".drawArraysInstancedANGLE(",
              [_, w, C, j],
              ");"
            );
          }
          f && f !== "null" ? Z ? te() : (c("if(", f, "){"), te(), c("}else{"), re(), c("}")) : re();
        }
        function S() {
          function te() {
            c(d + ".drawElements(" + [
              _,
              C,
              ne,
              w + "<<((" + ne + "-" + Ri + ")>>1)"
            ] + ");");
          }
          function re() {
            c(d + ".drawArrays(" + [_, w, C] + ");");
          }
          f && f !== "null" ? Z ? te() : (c("if(", f, "){"), te(), c("}else{"), re(), c("}")) : re();
        }
        P && (typeof j != "number" || j >= 0) ? typeof j == "string" ? (c("if(", j, ">0){"), G(), c("}else if(", j, "<0){"), S(), c("}")) : G() : S();
      }
      function _e(a, r, c, h, p) {
        var d = se(), l = d.proc("body", p);
        return n.optional(function() {
          d.commandStr = r.commandStr, d.command = d.link(r.commandStr);
        }), P && (d.instancing = l.def(
          d.shared.extensions,
          ".angle_instanced_arrays"
        )), a(d, l, c, h), d.compile().body;
      }
      function Ee(a, r, c, h) {
        Ce(a, r), c.useVAO ? c.drawVAO ? r(a.shared.vao, ".setVAO(", c.drawVAO.append(a, r), ");") : r(a.shared.vao, ".setVAO(", a.shared.vao, ".targetVAO);") : (r(a.shared.vao, ".setVAO(null);"), Xe(a, r, c, h.attributes, function() {
          return !0;
        })), xe(a, r, c, h.uniforms, function() {
          return !0;
        }, !1), ie(a, r, r, c);
      }
      function Ge(a, r) {
        var c = a.proc("draw", 1);
        Ce(a, c), Ie(a, c, r.context), Pe(a, c, r.framebuffer), Me(a, c, r), je(a, c, r.state), de(a, c, r, !1, !0);
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
                return _e(Ee, a, r, m, 1);
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
      function ur(a, r, c, h) {
        a.batchId = "a1", Ce(a, r);
        function p() {
          return !0;
        }
        Xe(a, r, c, h.attributes, p), xe(a, r, c, h.uniforms, p, !1), ie(a, r, r, c);
      }
      function Dr(a, r, c, h) {
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
        if (c.needsContext && Ie(a, f, c.context), c.needsFramebuffer && Pe(a, f, c.framebuffer), je(a, f, c.state, b), c.profile && b(c.profile) && de(a, f, c, !1, !0), h)
          c.useVAO ? c.drawVAO ? b(c.drawVAO) ? f(a.shared.vao, ".setVAO(", c.drawVAO.append(a, f), ");") : u(a.shared.vao, ".setVAO(", c.drawVAO.append(a, u), ");") : u(a.shared.vao, ".setVAO(", a.shared.vao, ".targetVAO);") : (u(a.shared.vao, ".setVAO(null);"), Xe(a, u, c, h.attributes, _), Xe(a, f, c, h.attributes, b)), xe(a, u, c, h.uniforms, _, !1), xe(a, f, c, h.uniforms, b, !0), ie(a, u, f, c);
        else {
          var w = a.global.def("{}"), C = c.shader.progVar.append(a, f), j = f.def(C, ".id"), ue = f.def(w, "[", j, "]");
          f(
            a.shared.gl,
            ".useProgram(",
            C,
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
              return _e(
                ur,
                a,
                c,
                ne,
                2
              );
            }),
            "(",
            C,
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
        }), h || (Ie(a, c, r.context), p = !1);
        var d = r.framebuffer, l = !1;
        d ? (d.propDep ? h = l = !0 : d.contextDep && h && (l = !0), l || Pe(a, c, d)) : Pe(a, c, null), r.state.viewport && r.state.viewport.propDep && (h = !0);
        function m(w) {
          return w.contextDep && h || w.propDep;
        }
        Me(a, c, r), je(a, c, r.state, function(w) {
          return !m(w);
        }), (!r.profile || !m(r.profile)) && de(a, c, r, !1, "a1"), r.contextDep = h, r.needsContext = p, r.needsFramebuffer = l;
        var i = r.shader.progVar;
        if (i.contextDep && h || i.propDep)
          Dr(
            a,
            c,
            r,
            null
          );
        else {
          var u = i.append(a, c);
          if (c(a.shared.gl, ".useProgram(", u, ".program);"), r.shader.program)
            Dr(
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
                  return _e(Dr, a, r, w, 2);
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
      function T(a, r) {
        var c = a.proc("scope", 3);
        a.batchId = "a2";
        var h = a.shared, p = h.current;
        Ie(a, c, r.context), r.framebuffer && r.framebuffer.append(a, c), af(Object.keys(r.state)).forEach(function(l) {
          var m = r.state[l], i = m.append(a, c);
          Le(i) ? i.forEach(function(u, f) {
            c.set(a.next[l], "[" + f + "]", u);
          }) : c.set(h.next, "." + l, i);
        }), de(a, c, r, !0, !0), [Rr, jt, Gr, Xt, Cr].forEach(
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
        d(dt), d(mt), Object.keys(r.state).length > 0 && (c(p, ".dirty=true;"), c.exit(p, ".dirty=true;")), c("a1(", a.shared.context, ",a0,", a.batchId, ");");
      }
      function y(a) {
        if (!(typeof a != "object" || Le(a))) {
          for (var r = Object.keys(a), c = 0; c < r.length; ++c)
            if (qe.isDynamic(a[r[c]]))
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
          if (qe.isDynamic(_)) {
            typeof _ == "function" && (_ = h[b] = qe.unbox(_));
            var w = We(_, null);
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
            var C = h[w];
            if (qe.isDynamic(C)) {
              var j = b.invoke(_, C);
              _(u, ".", w, "=", j, ";");
            }
          });
        }
        r.dynamic[c] = new qe.DynamicVariable(Ut, {
          thisDep: l,
          contextDep: m,
          propDep: i,
          ref: u,
          append: f
        }), delete r.static[c];
      }
      function ve(a, r, c, h, p) {
        var d = se();
        d.stats = d.link(p), Object.keys(r.static).forEach(function(m) {
          J(d, r, m);
        }), As.forEach(function(m) {
          J(d, a, m);
        });
        var l = Ne(a, r, c, h, d);
        return Ge(d, l), T(d, l), o(d, l), he(d.compile(), {
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
          h(m, ".dirty=false;"), Pe(a, r), Pe(a, c, null, !0);
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
              Jr,
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
            var w = R[_], C = h.def(l, ".", _), j = a.block();
            j(
              "if(",
              C,
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
              C,
              ";"
            ), c(j), r(
              "if(",
              C,
              "!==",
              m,
              ".",
              _,
              "){",
              j,
              "}"
            );
          }), Object.keys(L).forEach(function(_) {
            var w = L[_], C = Q[_], j, ue, ne = a.block();
            if (ne(d, ".", w, "("), Le(C)) {
              var Z = C.length;
              j = a.global.def(l, ".", _), ue = a.global.def(m, ".", _), ne(
                Ke(Z, function(G) {
                  return j + "[" + G + "]";
                }),
                ");",
                Ke(Z, function(G) {
                  return ue + "[" + G + "]=" + j + "[" + G + "];";
                }).join("")
              ), r(
                "if(",
                Ke(Z, function(G) {
                  return j + "[" + G + "]!==" + ue + "[" + G + "]";
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
        compile: ve
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
    var Xs = 34918, Hs = 34919, of = 35007, $s = function(e, t) {
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
        t.ext_disjoint_timer_query.beginQueryEXT(of, K), E.push(K), B(E.length - 1, E.length, P);
      }
      function N() {
        t.ext_disjoint_timer_query.endQueryEXT(of);
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
      function A() {
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
        update: A,
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
    }, zs = 16384, Ws = 256, Ys = 1024, Qs = 34962, uf = "webglcontextlost", sf = "webglcontextrestored", cf = 1, qs = 2, Ks = 3;
    function lf(e, t) {
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
      var g = Hf(), N = js(), D = E.extensions, M = $s(s, D), V = ba(), U = s.drawingBufferWidth, X = s.drawingBufferHeight, B = {
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
      }, A = ko(s, D), P = eu(
        s,
        N,
        t,
        Q
      ), K = du(s, D, P, N), F = ds(
        s,
        D,
        A,
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
        A,
        function() {
          ee.procs.poll();
        },
        B,
        N,
        t
      ), R = Hu(s, D, A, N, t), L = cs(
        s,
        D,
        A,
        ae,
        R,
        N
      ), ee = Vs(
        s,
        g,
        D,
        A,
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
        A
      ), I = ee.next, $ = s.canvas, z = [], ce = [], se = [], Y = [t.onDestroy], q = null;
      function fe() {
        if (z.length === 0) {
          M && M.update(), q = null;
          return;
        }
        q = an.next(fe), je();
        for (var ie = z.length - 1; ie >= 0; --ie) {
          var _e = z[ie];
          _e && _e(B, null, 0);
        }
        s.flush(), M && M.update();
      }
      function le() {
        !q && z.length > 0 && (q = an.next(fe));
      }
      function pe() {
        q && (an.cancel(fe), q = null);
      }
      function Oe(ie) {
        ie.preventDefault(), O = !0, pe(), ce.forEach(function(_e) {
          _e();
        });
      }
      function Re(ie) {
        s.getError(), O = !1, E.restore(), W.restore(), P.restore(), ae.restore(), R.restore(), L.restore(), F.restore(), M && M.restore(), ee.procs.refresh(), le(), se.forEach(function(_e) {
          _e();
        });
      }
      $ && ($.addEventListener(uf, Oe, !1), $.addEventListener(sf, Re, !1));
      function be() {
        z.length = 0, pe(), $ && ($.removeEventListener(uf, Oe), $.removeEventListener(sf, Re)), W.clear(), L.clear(), R.clear(), F.clear(), ae.clear(), K.clear(), P.clear(), M && M.clear(), Y.forEach(function(ie) {
          ie();
        });
      }
      function Be(ie) {
        n(!!ie, "invalid args to regl({...})"), n.type(ie, "object", "invalid args to regl({...})");
        function _e(p) {
          var d = he({}, p);
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
            if (qe.isDynamic(u)) {
              m[i] = qe.unbox(u, i);
              return;
            } else if (d && Array.isArray(u)) {
              for (var f = 0; f < u.length; ++f)
                if (qe.isDynamic(u[f])) {
                  m[i] = qe.unbox(u, i);
                  return;
                }
            }
            l[i] = u;
          }), {
            dynamic: m,
            static: l
          };
        }
        var Ge = Ee(ie.context || {}, !0), ur = Ee(ie.uniforms || {}, !0), Dr = Ee(ie.attributes || {}, !1), o = Ee(_e(ie), !1), T = {
          gpuTime: 0,
          cpuTime: 0,
          count: 0
        }, y = ee.compile(o, Dr, ur, Ge, T), J = y.draw, ve = y.batch, a = y.scope, r = [];
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
              return ve.call(this, c(p | 0), p | 0);
          } else if (Array.isArray(p)) {
            if (p.length)
              return ve.call(this, p, p.length);
          } else
            return J.call(this, p);
        }
        return he(h, {
          stats: T,
          destroy: function() {
            y.destroy();
          }
        });
      }
      var Se = L.setFBO = Be({
        framebuffer: qe.define.call(null, cf, "framebuffer")
      });
      function Ne(ie, _e) {
        var Ee = 0;
        ee.procs.poll();
        var Ge = _e.color;
        Ge && (s.clearColor(+Ge[0] || 0, +Ge[1] || 0, +Ge[2] || 0, +Ge[3] || 0), Ee |= zs), "depth" in _e && (s.clearDepth(+_e.depth), Ee |= Ws), "stencil" in _e && (s.clearStencil(_e.stencil | 0), Ee |= Ys), n(!!Ee, "called regl.clear with no buffer specified"), s.clear(Ee);
      }
      function Ie(ie) {
        if (n(
          typeof ie == "object" && ie,
          "regl.clear() takes an object as input"
        ), "framebuffer" in ie)
          if (ie.framebuffer && ie.framebuffer_reglType === "framebufferCube")
            for (var _e = 0; _e < 6; ++_e)
              Se(he({
                framebuffer: ie.framebuffer.faces[_e]
              }, ie), Ne);
          else
            Se(ie, Ne);
        else
          Ne(null, ie);
      }
      function Pe(ie) {
        n.type(ie, "function", "regl.frame() callback must be a function"), z.push(ie);
        function _e() {
          var Ee = lf(z, ie);
          n(Ee >= 0, "cannot cancel a frame twice");
          function Ge() {
            var ur = lf(z, Ge);
            z[ur] = z[z.length - 1], z.length -= 1, z.length <= 0 && pe();
          }
          z[Ee] = Ge;
        }
        return le(), {
          cancel: _e
        };
      }
      function Me() {
        var ie = I.viewport, _e = I.scissor_box;
        ie[0] = ie[1] = _e[0] = _e[1] = 0, B.viewportWidth = B.framebufferWidth = B.drawingBufferWidth = ie[2] = _e[2] = s.drawingBufferWidth, B.viewportHeight = B.framebufferHeight = B.drawingBufferHeight = ie[3] = _e[3] = s.drawingBufferHeight;
      }
      function je() {
        B.tick += 1, B.time = de(), Me(), ee.procs.poll();
      }
      function Ce() {
        ae.refresh(), Me(), ee.procs.refresh(), M && M.update();
      }
      function de() {
        return (ba() - V) / 1e3;
      }
      Ce();
      function Xe(ie, _e) {
        n.type(_e, "function", "listener callback must be a function");
        var Ee;
        switch (ie) {
          case "frame":
            return Pe(_e);
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
        return Ee.push(_e), {
          cancel: function() {
            for (var Ge = 0; Ge < Ee.length; ++Ge)
              if (Ee[Ge] === _e) {
                Ee[Ge] = Ee[Ee.length - 1], Ee.pop();
                return;
              }
          }
        };
      }
      var xe = he(Be, {
        // Clear current FBO
        clear: Ie,
        // Short cuts for dynamic variables
        prop: qe.define.bind(null, cf),
        context: qe.define.bind(null, qs),
        this: qe.define.bind(null, Ks),
        // executes an empty draw command
        draw: Be({}),
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
        frame: Pe,
        on: Xe,
        // System limits
        limits: A,
        hasExtension: function(ie) {
          return A.extensions.indexOf(ie.toLowerCase()) >= 0;
        },
        // Read pixels
        read: H,
        // Destroy regl and all associated resources
        destroy: be,
        // Direct GL state manipulation
        _gl: s,
        _refresh: Ce,
        poll: function() {
          je(), M && M.update();
        },
        // Current time
        now: de,
        // regl Statistics Information
        stats: N
      });
      return t.onDone(null, xe), xe;
    }
    return Zs;
  });
})(hf);
var nc = hf.exports;
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
uniform float source_texture_rows;
uniform float source_texture_cols;
uniform float seed;

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

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
  vec2 fuv = -1.0 + vUv * 2.0;
  vec2 uv = vUv;
  float aspect_ratio = resolution.x / resolution.y;
  uv.x *= aspect_ratio;
  float division = 1.0 / rows;

  float k = 2.0;
  uv = fisheye(uv - mouse, k, rows) + mouse; 

  float margin_v = 1.0 + marginOffset;
  vec2 pattern_uv = mod(uv, division);
  float circle_fade = 1.0 - max(min(distance(pattern_uv * (0.5 / division) + (division - 0.25), vec2(division)) * 4.0 * margin_v, 1.0), 0.0);
  
  vec2 texture_coord = vec2(pattern_uv / division) * margin_v - mod(margin_v + 1.0, 2.0) * 0.5;
  vec2 texture_index = floor(uv / division);
  
  float texture_index_rand = random(texture_index + vec2(seed)) * total_textures;
  vec2 final_texture_index = vec2(floor(mod(texture_index_rand, source_texture_rows)), floor(texture_index_rand / source_texture_rows));

  texture_coord.x *= (1.0 / (source_texture_rows));
  texture_coord.x += final_texture_index.x * (1.0 / source_texture_rows);

  texture_coord.y *= (1.0 / (source_texture_cols));
  texture_coord.y += final_texture_index.y * (1.0 / source_texture_cols);

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
  constructor(me, ye) {
    we(this, "regl");
    we(this, "target");
    we(this, "rows", 20);
    we(this, "entries");
    we(this, "resolution", [1, 1]);
    we(this, "mouse", [0, 0]);
    we(this, "mouseTarget", [0, 0]);
    we(this, "fisheye", 0);
    we(this, "fisheyeTarget", 0);
    we(this, "maxFPS", 120);
    we(this, "spriteSheet", null);
    we(this, "textSpriteSheet", null);
    we(this, "resizeObserver", null);
    we(this, "tethaYOffset", 0.2);
    we(this, "animateXOffset", 0);
    we(this, "lerpFactor", 0.2);
    we(this, "marginOffset", 0.4);
    we(this, "shouldUpdateMouse", !0);
    we(this, "isMobile", !1);
    we(this, "isFirstMovement", !0);
    we(this, "sourceTextureRows", 1);
    we(this, "sourceTextureCols", 1);
    we(this, "seed", Math.random() * 10);
    we(this, "onMouseMove", (me) => {
      this.isFirstMovement && (this.fisheyeTarget = 1, this.shouldUpdateMouse = !0, this.isFirstMovement = !1), this.shouldUpdateMouse && (this.mouseTarget = this.calculateMousePosition(me), me.type === "click" && this.isMobile && this.fisheye > 0.96 && this.isMousePositionRange(me, 2) && (this.fisheyeTarget = 0));
    });
    we(this, "onResize", (me) => {
      setTimeout(() => {
        const { width: ye, height: he } = me[0].contentRect;
        this.resolution = [ye, he], this.regl.poll();
      }, 10);
    });
    we(this, "init", async () => {
      const me = await Promise.all(this.entries.map((rt) => {
        const ir = new Image();
        return ir.src = rt.imageUrl, new Promise((kr) => ir.onload = () => kr(ir));
      })), ye = this.regl.limits.maxTextureSize;
      this.sourceTextureRows = Math.min(me.length, Math.floor(ye / me[0].width)), this.sourceTextureCols = Math.ceil(me.length / this.sourceTextureRows);
      const he = document.createElement("canvas"), $e = he.getContext("2d");
      he.width = this.sourceTextureRows * me[0].width, he.height = this.sourceTextureCols * me[0].height;
      const Ue = document.createElement("canvas"), ge = Ue.getContext("2d");
      Ue.width = he.width, Ue.height = he.height, ge.imageSmoothingEnabled = !0, ge.imageSmoothingQuality = "high", ge.globalCompositeOperation = "source-over", ge.fillStyle = "#222222", ge.fillRect(0, 0, Ue.width, Ue.height), ge.textAlign = "center", ge.textBaseline = "middle";
      const Ae = [me[0].width / 6.4, me[0].width / 12.8], ar = [-me[0].width / 64, me[0].width / 8], Pr = [me[0].width * 0.5, me[0].height * 0.5];
      me.forEach((rt, ir) => {
        const kr = this.entries[ir], tt = ir % this.sourceTextureRows * me[0].width, Er = Math.floor(ir / this.sourceTextureRows) * me[0].height;
        $e.drawImage(rt, tt, Er), ge.fillStyle = "#ffffff", ge.font = `${Ae[0]}px sans-serif`, ge.fillText(kr.title, tt + Pr[0], Er + Pr[1] + ar[0]), ge.fillStyle = "#bbbbbb", ge.font = `${Ae[1]}px sans-serif`, ge.fillText(kr.description, tt + Pr[0], Er + Pr[1] + ar[1]);
      }), this.spriteSheet = this.regl.texture(he), ge.filter = "blur(1px)", ge.drawImage(Ue, 0, 0, Ue.width, Ue.height), this.textSpriteSheet = this.regl.texture(Ue), this.setupEventListeners(), this.render(), this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.target);
    });
    we(this, "render", () => {
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
          fisheye_value: this.fisheye,
          source_texture_rows: this.sourceTextureRows,
          source_texture_cols: this.sourceTextureCols,
          seed: this.seed
        },
        count: 6
      })(), performance.mark("end"), performance.measure("render", "start", "end");
      const me = performance.getEntriesByName("render")[0].duration, ye = Math.max(0, 1e3 / this.maxFPS - me);
      setTimeout(() => {
        requestAnimationFrame(() => this.render());
      }, ye);
    });
    if (ye.length === 0)
      throw new Error("No entries provided");
    this.regl = ac(me), this.target = me, this.entries = ye, this.resolution = [me.clientWidth, me.clientHeight], this.init();
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
    const ye = this.resolution[0] / this.resolution[1], he = 1 / this.rows, $e = this.target.getBoundingClientRect(), Ue = me.clientX - $e.left, ge = me.clientY - $e.top;
    return [Ue / this.resolution[0] * ye, ge / this.resolution[1]].map((Ae) => Math.floor(Ae * this.rows) * he + he * 0.5);
  }
  isMousePositionRange(me, ye) {
    const he = this.calculateMousePosition(me), $e = 1 / this.rows, Ue = this.mouse.map((ge) => [ge - $e * ye, ge + $e * ye]);
    return Ue[0][0] <= he[0] && he[0] <= Ue[0][1] && Ue[1][0] <= he[1] && he[1] <= Ue[1][1];
  }
  lerp(me, ye, he) {
    return me * (1 - he) + ye * he;
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
