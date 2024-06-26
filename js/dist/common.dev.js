"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * SmartMenus.org "common.js"
 * Depends on: jQuery
 * Copyright 2013, Vasil Dinkov, http://www.smartmenus.org
 */
$(function () {
  // SmartMenus init
  // =================================
  // Main menu
  $('#main-menu').smartmenus({
    markOngoingItem: true,
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8
  }) // do not highlight the home (SmartMenus) item
  .find('> li:first > a').removeClass('Ongoing');
  $('#main-menu').smartmenus('keyboardSetHotkey', '123', 'shiftKey'); // make sure Blog item is highlighted for all blog entries

  if (/\/blog\//.test(window.location.href)) $('#main-menu > li > a[href*="/blog/"]').addClass('Ongoing'); // add menu show hide toggle button on mobile

  var $mainMenuState = $('#main-menu-state');

  if ($mainMenuState.length) {
    // animate mobile menu
    $mainMenuState.change(function (e) {
      var $menu = $('#main-menu');

      if (this.checked) {
        $menu.hide().slideDown(250, function () {
          $menu.css('display', '');
        });
      } else {
        $menu.show().slideUp(250, function () {
          $menu.css('display', '');
        });
      }
    }); // hide mobile menu beforeunload

    $(window).bind('beforeunload unload', function () {
      if ($mainMenuState[0].checked) {
        $mainMenuState[0].click();
      }
    });
  }

  ; // Docs menu

  $('#docs-menu').smartmenus({
    hideOnClick: false
  }).find('a').smoothScroll(); // bbPress formatting toolbar
  // =================================
  // Insert a clickable icon list before the textbox

  (function () {
    function InsertText(msgfield, open, close) {
      // IE support
      if (document.selection && document.selection.createRange) {
        msgfield.focus();
        sel = document.selection.createRange();
        sel.text = open + sel.text + close;
        msgfield.focus();
      } // Moz support
      else if (msgfield.selectionStart || msgfield.selectionStart == '0') {
          var startPos = msgfield.selectionStart;
          var endPos = msgfield.selectionEnd;
          msgfield.value = msgfield.value.substring(0, startPos) + open + msgfield.value.substring(startPos, endPos) + close + msgfield.value.substring(endPos, msgfield.value.length);
          msgfield.selectionStart = msgfield.selectionEnd = endPos + open.length + close.length;
          msgfield.focus();
        } // Fallback support for other browsers
        else {
            msgfield.value += open + close;
            msgfield.focus();
          }

      return;
    }

    var $textarea = $('textarea.bbp-the-content'),
        $formatButtons = $('<div id="format-buttons">\
				<div id="format-buttons-inner">\
					<span class="add-smilies" onclick="$(this).siblings(\'.smilies\').slideToggle(250);return false;"><img src="/wp-content/plugins/tango-smilies/tango/face-smile.png"><span class="arrow"></span></span>\
					<span data-startstr="<strong>" data-endstr="</strong>" style="font-weight:bold;">B</span>\
					<span data-startstr="<em>" data-endstr="</em>" style="font-style:italic;">I</span>\
					<span data-startstr="" data-endstr=" http://">http://</span>\
					<span data-startstr="<img src=\'" data-endstr="\' /&gt;">Img</span>\
					<span data-startstr="<pre>" data-endstr="</pre>">Code</span>\
					<span data-startstr="<blockquote>" data-endstr="</blockquote>">Quote</span>\
					<span id="protected-data-button" title="Insert sensitive data that only you and forum admins can see." data-startstr="[protected]" data-endstr="[/protected]">Protected data</span>\
					<div class="smilies">\
						<span data-startstr=":)" title=":)" data-endstr=""><span></span></span>\
						<span data-startstr=";)" title=";)" data-endstr=""><span></span></span>\
						<span data-startstr=":D" title=":D" data-endstr=""><span></span></span>\
						<span data-startstr=":lol:" title=":lol:" data-endstr=""><span></span></span>\
						<span data-startstr=":(" title=":(" data-endstr=""><span></span></span>\
						<span data-startstr=":cry:" title=":cry:" data-endstr=""><span></span></span>\
						<span data-startstr="8)" title="8)" data-endstr=""><span></span></span>\
						<span data-startstr=":o" title=":o" data-endstr=""><span></span></span>\
						<span data-startstr=":P" title=":P" data-endstr=""><span></span></span>\
						<span data-startstr=":?" title=":?" data-endstr=""><span></span></span>\
						<span data-startstr=":\\" title=":\\" data-endstr=""><span></span></span>\
						<span data-startstr=":|" title=":|" data-endstr=""><span></span></span>\
						<span data-startstr=":oops:" title=":oops:" data-endstr=""><span></span></span>\
						<span data-startstr=":x" title=":x" data-endstr=""><span></span></span>\
						<span data-startstr=":evil:" title=":evil:" data-endstr=""><span></span></span>\
						<span data-startstr=":!:" title=":!:" data-endstr=""><span></span></span>\
						<span data-startstr=":?:" title=":?:" data-endstr=""><span></span></span>\
						<span data-startstr=":idea:" title=":idea:" data-endstr=""><span></span></span>\
						<span data-startstr=":love:" title=":love:" data-endstr=""><span></span></span>\
					</div>\
				</div>\
			</div>');
    $formatButtons.find('span').click(function () {
      InsertText($textarea[0], $(this).attr('data-startstr').replace(/'/g, '"'), $(this).attr('data-endstr').replace(/'/g, '"'));
    });
    $textarea.before($formatButtons);
  })();
});
/*!
 * Smooth Scroll - v1.4.10 - 2013-02-20
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (/blob/master/LICENSE-MIT)
 */

(function (l) {
  function t(l) {
    return l.replace(/(:|\.)/g, "\\$1");
  }

  var e = "1.4.10",
      o = {
    exclude: [],
    excludeWithin: [],
    offset: 0,
    direction: "top",
    scrollElement: null,
    scrollTarget: null,
    beforeScroll: function beforeScroll() {},
    afterScroll: function afterScroll() {},
    easing: "swing",
    speed: 400,
    autoCoefficent: 2
  },
      r = function r(t) {
    var e = [],
        o = !1,
        r = t.dir && "left" == t.dir ? "scrollLeft" : "scrollTop";
    return this.each(function () {
      if (this != document && this != window) {
        var t = l(this);
        t[r]() > 0 ? e.push(this) : (t[r](1), o = t[r]() > 0, o && e.push(this), t[r](0));
      }
    }), e.length || this.each(function () {
      "BODY" === this.nodeName && (e = [this]);
    }), "first" === t.el && e.length > 1 && (e = [e[0]]), e;
  };

  l.fn.extend({
    scrollable: function scrollable(l) {
      var t = r.call(this, {
        dir: l
      });
      return this.pushStack(t);
    },
    firstScrollable: function firstScrollable(l) {
      var t = r.call(this, {
        el: "first",
        dir: l
      });
      return this.pushStack(t);
    },
    smoothScroll: function smoothScroll(e) {
      e = e || {};
      var o = l.extend({}, l.fn.smoothScroll.defaults, e),
          r = l.smoothScroll.filterPath(location.pathname);
      return this.unbind("click.smoothscroll").bind("click.smoothscroll", function (e) {
        var n = this,
            s = l(this),
            c = o.exclude,
            i = o.excludeWithin,
            a = 0,
            f = 0,
            h = !0,
            u = {},
            d = location.hostname === n.hostname || !n.hostname,
            m = o.scrollTarget || (l.smoothScroll.filterPath(n.pathname) || r) === r,
            p = t(n.hash);

        if (o.scrollTarget || d && m && p) {
          for (; h && c.length > a;) {
            s.is(t(c[a++])) && (h = !1);
          }

          for (; h && i.length > f;) {
            s.closest(i[f++]).length && (h = !1);
          }
        } else h = !1;

        h && (e.preventDefault(), l.extend(u, o, {
          scrollTarget: o.scrollTarget || p,
          link: n
        }), l.smoothScroll(u));
      }), this;
    }
  }), l.smoothScroll = function (t, e) {
    var o,
        r,
        n,
        s,
        c = 0,
        i = "offset",
        a = "scrollTop",
        f = {},
        h = {};
    "number" == typeof t ? (o = l.fn.smoothScroll.defaults, n = t) : (o = l.extend({}, l.fn.smoothScroll.defaults, t || {}), o.scrollElement && (i = "position", "static" == o.scrollElement.css("position") && o.scrollElement.css("position", "relative"))), o = l.extend({
      link: null
    }, o), a = "left" == o.direction ? "scrollLeft" : a, o.scrollElement ? (r = o.scrollElement, c = r[a]()) : r = l("html, body").firstScrollable(), o.beforeScroll.call(r, o), n = "number" == typeof t ? t : e || l(o.scrollTarget)[i]() && l(o.scrollTarget)[i]()[o.direction] || 0, f[a] = n + c + o.offset, s = o.speed, "auto" === s && (s = f[a] || r.scrollTop(), s /= o.autoCoefficent), h = {
      duration: s,
      easing: o.easing,
      complete: function complete() {
        o.afterScroll.call(o.link, o);
      }
    }, o.step && (h.step = o.step), r.length ? r.stop().animate(f, h) : o.afterScroll.call(o.link, o);
  }, l.smoothScroll.version = e, l.smoothScroll.filterPath = function (l) {
    return l.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "");
  }, l.fn.smoothScroll.defaults = o;
})(jQuery);
/* Copyright (C) 2007, 2008 gnombat@users.sourceforge.net */

/* License: http://shjs.sourceforge.net/doc/gplv3.html */


if (!(void 0).sh_languages) {
  (void 0).sh_languages = {};
}

var sh_requests = {};

function sh_isEmailAddress(a) {
  if (/^mailto:/.test(a)) {
    return false;
  }

  return a.indexOf("@") !== -1;
}

function sh_setHref(b, c, d) {
  var a = d.substring(b[c - 2].pos, b[c - 1].pos);

  if (a.length >= 2 && a.charAt(0) === "<" && a.charAt(a.length - 1) === ">") {
    a = a.substr(1, a.length - 2);
  }

  if (sh_isEmailAddress(a)) {
    a = "mailto:" + a;
  }

  b[c - 2].node.href = a;
}

function sh_konquerorExec(b) {
  var a = [""];
  a.index = b.length;
  a.input = b;
  return a;
}

function sh_highlightString(B, o) {
  if (/Konqueror/.test(navigator.userAgent)) {
    if (!o.konquered) {
      for (var F = 0; F < o.length; F++) {
        for (var H = 0; H < o[F].length; H++) {
          var G = o[F][H][0];

          if (G.source === "$") {
            G.exec = sh_konquerorExec;
          }
        }
      }

      o.konquered = true;
    }
  }

  var N = document.createElement("a");
  var q = document.createElement("span");
  var A = [];
  var j = 0;
  var n = [];
  var C = 0;
  var k = null;

  var x = function x(i, a) {
    var p = i.length;

    if (p === 0) {
      return;
    }

    if (!a) {
      var Q = n.length;

      if (Q !== 0) {
        var r = n[Q - 1];

        if (!r[3]) {
          a = r[1];
        }
      }
    }

    if (k !== a) {
      if (k) {
        A[j++] = {
          pos: C
        };

        if (k === "sh_url") {
          sh_setHref(A, j, B);
        }
      }

      if (a) {
        var P;

        if (a === "sh_url") {
          P = N.cloneNode(false);
        } else {
          P = q.cloneNode(false);
        }

        P.className = a;
        A[j++] = {
          node: P,
          pos: C
        };
      }
    }

    C += p;
    k = a;
  };

  var t = /\r\n|\r|\n/g;
  t.lastIndex = 0;
  var d = B.length;

  while (C < d) {
    var v = C;
    var l;
    var w;
    var h = t.exec(B);

    if (h === null) {
      l = d;
      w = d;
    } else {
      l = h.index;
      w = t.lastIndex;
    }

    var g = B.substring(v, l);
    var M = [];

    for (;;) {
      var I = C - v;
      var D;
      var y = n.length;

      if (y === 0) {
        D = 0;
      } else {
        D = n[y - 1][2];
      }

      var O = o[D];
      var z = O.length;
      var m = M[D];

      if (!m) {
        m = M[D] = [];
      }

      var E = null;
      var u = -1;

      for (var K = 0; K < z; K++) {
        var f;

        if (K < m.length && (m[K] === null || I <= m[K].index)) {
          f = m[K];
        } else {
          var c = O[K][0];
          c.lastIndex = I;
          f = c.exec(g);
          m[K] = f;
        }

        if (f !== null && (E === null || f.index < E.index)) {
          E = f;
          u = K;

          if (f.index === I) {
            break;
          }
        }
      }

      if (E === null) {
        x(g.substring(I), null);
        break;
      } else {
        if (E.index > I) {
          x(g.substring(I, E.index), null);
        }

        var e = O[u];
        var J = e[1];
        var b;

        if (J instanceof Array) {
          for (var L = 0; L < J.length; L++) {
            b = E[L + 1];
            x(b, J[L]);
          }
        } else {
          b = E[0];
          x(b, J);
        }

        switch (e[2]) {
          case -1:
            break;

          case -2:
            n.pop();
            break;

          case -3:
            n.length = 0;
            break;

          default:
            n.push(e);
            break;
        }
      }
    }

    if (k) {
      A[j++] = {
        pos: C
      };

      if (k === "sh_url") {
        sh_setHref(A, j, B);
      }

      k = null;
    }

    C = w;
  }

  return A;
}

function sh_getClasses(d) {
  var a = [];
  var b = d.className;

  if (b && b.length > 0) {
    var e = b.split(" ");

    for (var c = 0; c < e.length; c++) {
      if (e[c].length > 0) {
        a.push(e[c]);
      }
    }
  }

  return a;
}

function sh_addClass(c, a) {
  var d = sh_getClasses(c);

  for (var b = 0; b < d.length; b++) {
    if (a.toLowerCase() === d[b].toLowerCase()) {
      return;
    }
  }

  d.push(a);
  c.className = d.join(" ");
}

function sh_extractTagsFromNodeList(c, a) {
  var f = c.length;

  for (var d = 0; d < f; d++) {
    var e = c.item(d);

    switch (e.nodeType) {
      case 1:
        if (e.nodeName.toLowerCase() === "br") {
          var b;

          if (/MSIE/.test(navigator.userAgent)) {
            b = "\r";
          } else {
            b = "\n";
          }

          a.text.push(b);
          a.pos++;
        } else {
          a.tags.push({
            node: e.cloneNode(false),
            pos: a.pos
          });
          sh_extractTagsFromNodeList(e.childNodes, a);
          a.tags.push({
            pos: a.pos
          });
        }

        break;

      case 3:
      case 4:
        a.text.push(e.data);
        a.pos += e.length;
        break;
    }
  }
}

function sh_extractTags(c, b) {
  var a = {};
  a.text = [];
  a.tags = b;
  a.pos = 0;
  sh_extractTagsFromNodeList(c.childNodes, a);
  return a.text.join("");
}

function sh_mergeTags(d, f) {
  var a = d.length;

  if (a === 0) {
    return f;
  }

  var c = f.length;

  if (c === 0) {
    return d;
  }

  var i = [];
  var e = 0;
  var b = 0;

  while (e < a && b < c) {
    var h = d[e];
    var g = f[b];

    if (h.pos <= g.pos) {
      i.push(h);
      e++;
    } else {
      i.push(g);

      if (f[b + 1].pos <= h.pos) {
        b++;
        i.push(f[b]);
        b++;
      } else {
        i.push({
          pos: h.pos
        });
        f[b] = {
          node: g.node.cloneNode(false),
          pos: h.pos
        };
      }
    }
  }

  while (e < a) {
    i.push(d[e]);
    e++;
  }

  while (b < c) {
    i.push(f[b]);
    b++;
  }

  return i;
}

function sh_insertTags(k, h) {
  var g = document;
  var l = document.createDocumentFragment();
  var e = 0;
  var d = k.length;
  var b = 0;
  var j = h.length;
  var c = l;

  while (b < j || e < d) {
    var i;
    var a;

    if (e < d) {
      i = k[e];
      a = i.pos;
    } else {
      a = j;
    }

    if (a <= b) {
      if (i.node) {
        var f = i.node;
        c.appendChild(f);
        c = f;
      } else {
        c = c.parentNode;
      }

      e++;
    } else {
      c.appendChild(g.createTextNode(h.substring(b, a)));
      b = a;
    }
  }

  return l;
}

function sh_highlightElement(d, g) {
  sh_addClass(d, "sh_sourceCode");
  var c = [];
  var e = sh_extractTags(d, c);
  var f = sh_highlightString(e, g);
  var b = sh_mergeTags(c, f);
  var a = sh_insertTags(b, e);

  while (d.hasChildNodes()) {
    d.removeChild(d.firstChild);
  }

  d.appendChild(a);
}

function sh_getXMLHttpRequest() {
  if (window.ActiveXObject) {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } else {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }

  throw "No XMLHttpRequest implementation available";
}

function sh_load(language, element, prefix, suffix) {
  if (language in sh_requests) {
    sh_requests[language].push(element);
    return;
  }

  sh_requests[language] = [element];
  var request = sh_getXMLHttpRequest();
  var url = prefix + "sh_" + language + suffix;
  request.open("GET", url, true);

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      try {
        if (!request.status || request.status === 200) {
          eval(request.responseText);
          var elements = sh_requests[language];

          for (var i = 0; i < elements.length; i++) {
            sh_highlightElement(elements[i], sh_languages[language]);
          }
        } else {
          throw "HTTP error: status " + request.status;
        }
      } finally {
        request = null;
      }
    }
  };

  request.send(null);
}

function sh_highlightDocument(g, k) {
  var b = document.getElementsByTagName("pre");

  for (var e = 0; e < b.length; e++) {
    var f = b.item(e);
    var a = sh_getClasses(f);

    for (var c = 0; c < a.length; c++) {
      var h = a[c].toLowerCase();

      if (h === "sh_sourcecode") {
        continue;
      }

      if (h.substr(0, 3) === "sh_") {
        var d = h.substring(3);

        if (d in sh_languages) {
          sh_highlightElement(f, sh_languages[d]);
        } else {
          if (typeof g === "string" && typeof k === "string") {
            sh_load(d, f, g, k);
          } else {
            throw 'Found <pre> element with class="' + h + '", but no such language exists';
          }
        }

        break;
      }
    }
  }
}

; // JavaScript syntax module

if (!(void 0).sh_languages) {
  (void 0).sh_languages = {};
}

sh_languages.javascript = [[[/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "sh_keyword", -1], [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["sh_symbol", "sh_normal", "sh_symbol"], -1], [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["sh_number", "sh_normal", "sh_symbol"], -1], [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["sh_normal", "sh_symbol"], -1], [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "sh_regexp", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 10], [/'/g, "sh_string", 11], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "sh_predef_var", -1], [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "sh_predef_func", -1], [/\b(?:applicationCache|closed|Components|content|controllers|crypto|defaultStatus|dialogArguments|directories|document|frameElement|frames|fullScreen|globalStorage|history|innerHeight|innerWidth|length|location|locationbar|menubar|name|navigator|opener|outerHeight|outerWidth|pageXOffset|pageYOffset|parent|personalbar|pkcs11|returnValue|screen|availTop|availLeft|availHeight|availWidth|colorDepth|height|left|pixelDepth|top|width|screenX|screenY|scrollbars|scrollMaxX|scrollMaxY|scrollX|scrollY|self|sessionStorage|sidebar|status|statusbar|toolbar|top|window)\b/g, "sh_predef_var", -1], [/\b(?:alert|addEventListener|atob|back|blur|btoa|captureEvents|clearInterval|clearTimeout|close|confirm|dump|escape|find|focus|forward|getAttention|getComputedStyle|getSelection|home|moveBy|moveTo|open|openDialog|postMessage|print|prompt|releaseEvents|removeEventListener|resizeBy|resizeTo|scroll|scrollBy|scrollByLines|scrollByPages|scrollTo|setInterval|setTimeout|showModalDialog|sizeToContent|stop|unescape|updateCommands|onabort|onbeforeunload|onblur|onchange|onclick|onclose|oncontextmenu|ondragdrop|onerror|onfocus|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onpaint|onreset|onresize|onscroll|onselect|onsubmit|onunload)\b/g, "sh_predef_func", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/"/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]], [[/'/g, "sh_string", -2], [/\\./g, "sh_specialchar", -1]]]; // CSS syntax module

if (!(void 0).sh_languages) {
  (void 0).sh_languages = {};
}

sh_languages.css = [[[/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/(?:\.|#)[A-Za-z0-9_]+/g, "sh_selector", -1], [/\{/g, "sh_cbracket", 10, 1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 5]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 2, 1], [/<!DOCTYPE/g, "sh_preproc", 4, 1], [/<!--/g, "sh_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\}/g, "sh_cbracket", -2], [/\/\/\//g, "sh_comment", 1], [/\/\//g, "sh_comment", 7], [/\/\*\*/g, "sh_comment", 8], [/\/\*/g, "sh_comment", 9], [/[A-Za-z0-9_-]+[ \t]*:/g, "sh_property", -1], [/[.%A-Za-z0-9_-]+/g, "sh_value", -1], [/#(?:[A-Za-z0-9_]+)/g, "sh_string", -1]]]; // PHP syntax module

if (!(void 0).sh_languages) {
  (void 0).sh_languages = {};
}

sh_languages.html = [[[/\b(?:include|include_once|require|require_once)\b/g, "sh_preproc", -1], [/\/\//g, "sh_comment", 1], [/#/g, "sh_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1], [/"/g, "sh_string", 2], [/'/g, "sh_string", 3], [/\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g, "sh_keyword", -1], [/\/\/\//g, "sh_comment", 4], [/\/\//g, "sh_comment", 1], [/\/\*\*/g, "sh_comment", 9], [/\/\*/g, "sh_comment", 10], [/(?:\$[#]?|@|%)[A-Za-z0-9_]+/g, "sh_variable", -1], [/<\?php|~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1], [/\{|\}/g, "sh_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]], [[/$/g, null, -2]], [[/\\(?:\\|")/g, null, -1], [/"/g, "sh_string", -2]], [[/\\(?:\\|')/g, null, -1], [/'/g, "sh_string", -2]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 5, 1], [/<!DOCTYPE/g, "sh_preproc", 6, 1], [/<!--/g, "sh_comment", 7], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 8, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 8, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 7]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/<\?xml/g, "sh_preproc", 5, 1], [/<!DOCTYPE/g, "sh_preproc", 6, 1], [/<!--/g, "sh_comment", 7], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 8, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 8, 1], [/@[A-Za-z]+/g, "sh_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]], [[/\*\//g, "sh_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]]]; // HTML syntax module

if (!(void 0).sh_languages) {
  (void 0).sh_languages = {};
}

sh_languages.html = [[[/<\?xml/g, "sh_preproc", 1, 1], [/<!DOCTYPE/g, "sh_preproc", 3, 1], [/<!--/g, "sh_comment", 4], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 5, 1], [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 5, 1]], [[/\?>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/\\(?:\\|")/g, null, -1], [/"/g, "sh_string", -2]], [[/>/g, "sh_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]], [[/-->/g, "sh_comment", -2], [/<!--/g, "sh_comment", 4]], [[/(?:\/)?>/g, "sh_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1], [/"/g, "sh_string", 2]]];
/*! SmartMenus jQuery Plugin - v1.0.0 - January 26, 2016
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */

(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = t(require("jquery")) : t(jQuery);
})(function (t) {
  function i(i) {
    var a = ".smartmenus_mouse";
    if (h || i) h && i && (t(document).unbind(a), h = !1);else {
      var u = !0,
          l = null;
      t(document).bind(s([["mousemove", function (i) {
        var e = {
          x: i.pageX,
          y: i.pageY,
          timeStamp: new Date().getTime()
        };

        if (l) {
          var s = Math.abs(l.x - e.x),
              a = Math.abs(l.y - e.y);

          if ((s > 0 || a > 0) && 2 >= s && 2 >= a && 300 >= e.timeStamp - l.timeStamp && (r = !0, u)) {
            var n = t(i.target).closest("a");
            n.is("a") && t.each(o, function () {
              return t.contains(this.$root[0], n[0]) ? (this.itemEnter({
                OngoingTarget: n[0]
              }), !1) : void 0;
            }), u = !1;
          }
        }

        l = e;
      }], [n ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut", function (t) {
        e(t.originalEvent) && (r = !1);
      }]], a)), h = !0;
    }
  }

  function e(t) {
    return !/^(4|mouse)$/.test(t.pointerType);
  }

  function s(i, e) {
    e || (e = "");
    var s = {};
    return t.each(i, function (t, i) {
      s[i[0].split(" ").join(e + " ") + e] = i[1];
    }), s;
  }

  var o = [],
      a = !!window.createPopup,
      r = !1,
      n = "ontouchstart" in window,
      h = !1,
      u = window.requestAnimationFrame || function (t) {
    return setTimeout(t, 1e3 / 60);
  },
      l = window.cancelAnimationFrame || function (t) {
    clearTimeout(t);
  };

  return t.SmartMenus = function (i, e) {
    this.$root = t(i), this.opts = e, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in i.style || "webkitPerspective" in i.style, this.wasCollapsible = !1, this.init();
  }, t.extend(t.SmartMenus, {
    hideAll: function hideAll() {
      t.each(o, function () {
        this.menuHideAll();
      });
    },
    destroy: function destroy() {
      for (; o.length;) {
        o[0].destroy();
      }

      i(!0);
    },
    prototype: {
      init: function init(e) {
        var a = this;

        if (!e) {
          o.push(this), this.rootId = (new Date().getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
          var r = ".smartmenus";
          this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).bind(s([["mouseover focusin", t.proxy(this.rootOver, this)], ["mouseout focusout", t.proxy(this.rootOut, this)], ["keydown", t.proxy(this.rootKeyDown, this)]], r)).delegate("a", s([["mouseenter", t.proxy(this.itemEnter, this)], ["mouseleave", t.proxy(this.itemLeave, this)], ["mousedown", t.proxy(this.itemDown, this)], ["focus", t.proxy(this.itemFocus, this)], ["blur", t.proxy(this.itemBlur, this)], ["click", t.proxy(this.itemClick, this)]], r)), r += this.rootId, this.opts.hideOnClick && t(document).bind(s([["touchstart", t.proxy(this.docTouchStart, this)], ["touchmove", t.proxy(this.docTouchMove, this)], ["touchend", t.proxy(this.docTouchEnd, this)], ["click", t.proxy(this.docClick, this)]], r)), t(window).bind(s([["resize orientationchange", t.proxy(this.winResize, this)]], r)), this.opts.subIndicators && (this.$subArrow = t("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), i();
        }

        if (this.$firstSub = this.$root.find("ul").each(function () {
          a.menuInit(t(this));
        }).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markOngoingItem) {
          var n = /(index|default)\.[^#\?\/]*/i,
              h = /#.*/,
              u = window.location.href.replace(n, ""),
              l = u.replace(h, "");
          this.$root.find("a").each(function () {
            var i = this.href.replace(n, ""),
                e = t(this);
            (i == u || i == l) && (e.addClass("Ongoing"), a.opts.markOngoingTree && e.parentsUntil("[data-smartmenus-id]", "ul").each(function () {
              t(this).dataSM("parent-a").addClass("Ongoing");
            }));
          });
        }

        this.wasCollapsible = this.isCollapsible();
      },
      destroy: function destroy(i) {
        if (!i) {
          var e = ".smartmenus";
          this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").unbind(e).undelegate(e), e += this.rootId, t(document).unbind(e), t(window).unbind(e), this.opts.subIndicators && (this.$subArrow = null);
        }

        this.menuHideAll();
        var s = this;
        this.$root.find("ul").each(function () {
          var i = t(this);
          i.dataSM("scroll-arrows") && i.dataSM("scroll-arrows").remove(), i.dataSM("shown-before") && ((s.opts.subMenusMinWidth || s.opts.subMenusMaxWidth) && i.css({
            width: "",
            minWidth: "",
            maxWidth: ""
          }).removeClass("sm-nowrap"), i.dataSM("scroll-arrows") && i.dataSM("scroll-arrows").remove(), i.css({
            zIndex: "",
            top: "",
            left: "",
            marginLeft: "",
            marginTop: "",
            display: ""
          })), 0 == (i.attr("id") || "").indexOf(s.accessIdPrefix) && i.removeAttr("id");
        }).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("ie-shim").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each(function () {
          var i = t(this);
          0 == i.attr("id").indexOf(s.accessIdPrefix) && i.removeAttr("id");
        }).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markOngoingItem && this.$root.find("a.Ongoing").removeClass("Ongoing"), i || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), o.splice(t.inArray(this, o), 1));
      },
      disable: function disable(i) {
        if (!this.disabled) {
          if (this.menuHideAll(), !i && !this.opts.isPopup && this.$root.is(":visible")) {
            var e = this.$root.offset();
            this.$disableOverlay = t('<div class="sm-jquery-disable-overlay"/>').css({
              position: "absolute",
              top: e.top,
              left: e.left,
              width: this.$root.outerWidth(),
              height: this.$root.outerHeight(),
              zIndex: this.getStartZIndex(!0),
              opacity: 0
            }).appendTo(document.body);
          }

          this.disabled = !0;
        }
      },
      docClick: function docClick(i) {
        return this.$touchScrollingSub ? (this.$touchScrollingSub = null, void 0) : ((this.visibleSubMenus.length && !t.contains(this.$root[0], i.target) || t(i.target).is("a")) && this.menuHideAll(), void 0);
      },
      docTouchEnd: function docTouchEnd() {
        if (this.lastTouch) {
          if (!(!this.visibleSubMenus.length || void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2 || void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2 || this.lastTouch.target && t.contains(this.$root[0], this.lastTouch.target))) {
            this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
            var i = this;
            this.hideTimeout = setTimeout(function () {
              i.menuHideAll();
            }, 350);
          }

          this.lastTouch = null;
        }
      },
      docTouchMove: function docTouchMove(t) {
        if (this.lastTouch) {
          var i = t.originalEvent.touches[0];
          this.lastTouch.x2 = i.pageX, this.lastTouch.y2 = i.pageY;
        }
      },
      docTouchStart: function docTouchStart(t) {
        var i = t.originalEvent.touches[0];
        this.lastTouch = {
          x1: i.pageX,
          y1: i.pageY,
          target: i.target
        };
      },
      enable: function enable() {
        this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1);
      },
      getClosestMenu: function getClosestMenu(i) {
        for (var e = t(i).closest("ul"); e.dataSM("in-mega");) {
          e = e.parent().closest("ul");
        }

        return e[0] || null;
      },
      getHeight: function getHeight(t) {
        return this.getOffset(t, !0);
      },
      getOffset: function getOffset(t, i) {
        var e;
        "none" == t.css("display") && (e = {
          position: t[0].style.position,
          visibility: t[0].style.visibility
        }, t.css({
          position: "absolute",
          visibility: "hidden"
        }).show());
        var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
            o = s && (i ? s.height || s.bottom - s.top : s.width || s.right - s.left);
        return o || 0 === o || (o = i ? t[0].offsetHeight : t[0].offsetWidth), e && t.hide().css(e), o;
      },
      getStartZIndex: function getStartZIndex(t) {
        var i = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
        return !t && isNaN(i) && (i = parseInt(this.$root.css("z-index"))), isNaN(i) ? 1 : i;
      },
      getTouchPoint: function getTouchPoint(t) {
        return t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0] || t;
      },
      getViewport: function getViewport(t) {
        var i = t ? "Height" : "Width",
            e = document.documentElement["client" + i],
            s = window["inner" + i];
        return s && (e = Math.min(e, s)), e;
      },
      getViewportHeight: function getViewportHeight() {
        return this.getViewport(!0);
      },
      getViewportWidth: function getViewportWidth() {
        return this.getViewport();
      },
      getWidth: function getWidth(t) {
        return this.getOffset(t);
      },
      handleEvents: function handleEvents() {
        return !this.disabled && this.isCSSOn();
      },
      handleItemEvents: function handleItemEvents(t) {
        return this.handleEvents() && !this.isLinkInMegaMenu(t);
      },
      isCollapsible: function isCollapsible() {
        return "static" == this.$firstSub.css("position");
      },
      isCSSOn: function isCSSOn() {
        return "block" == this.$firstLink.css("display");
      },
      isFixed: function isFixed() {
        var i = "fixed" == this.$root.css("position");
        return i || this.$root.parentsUntil("body").each(function () {
          return "fixed" == t(this).css("position") ? (i = !0, !1) : void 0;
        }), i;
      },
      isLinkInMegaMenu: function isLinkInMegaMenu(i) {
        return t(this.getClosestMenu(i[0])).hasClass("mega-menu");
      },
      isTouchMode: function isTouchMode() {
        return !r || this.opts.noMouseOver || this.isCollapsible();
      },
      itemActivate: function itemActivate(i, e) {
        var s = i.closest("ul"),
            o = s.dataSM("level");

        if (o > 1 && (!this.activatedItems[o - 2] || this.activatedItems[o - 2][0] != s.dataSM("parent-a")[0])) {
          var a = this;
          t(s.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(s).each(function () {
            a.itemActivate(t(this).dataSM("parent-a"));
          });
        }

        if ((!this.isCollapsible() || e) && this.menuHideSubMenus(this.activatedItems[o - 1] && this.activatedItems[o - 1][0] == i[0] ? o : o - 1), this.activatedItems[o - 1] = i, this.$root.triggerHandler("activate.smapi", i[0]) !== !1) {
          var r = i.dataSM("sub");
          r && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(r);
        }
      },
      itemBlur: function itemBlur(i) {
        var e = t(i.OngoingTarget);
        this.handleItemEvents(e) && this.$root.triggerHandler("blur.smapi", e[0]);
      },
      itemClick: function itemClick(i) {
        var e = t(i.OngoingTarget);

        if (this.handleItemEvents(e)) {
          if (this.$touchScrollingSub && this.$touchScrollingSub[0] == e.closest("ul")[0]) return this.$touchScrollingSub = null, i.stopPropagation(), !1;
          if (this.$root.triggerHandler("click.smapi", e[0]) === !1) return !1;
          var s = t(i.target).is("span.sub-arrow"),
              o = e.dataSM("sub"),
              a = o ? 2 == o.dataSM("level") : !1;

          if (o && !o.is(":visible")) {
            if (this.opts.showOnClick && a && (this.clickActivated = !0), this.itemActivate(e), o.is(":visible")) return this.focusActivated = !0, !1;
          } else if (this.isCollapsible() && s) return this.itemActivate(e), this.menuHide(o), !1;

          return this.opts.showOnClick && a || e.hasClass("disabled") || this.$root.triggerHandler("select.smapi", e[0]) === !1 ? !1 : void 0;
        }
      },
      itemDown: function itemDown(i) {
        var e = t(i.OngoingTarget);
        this.handleItemEvents(e) && e.dataSM("mousedown", !0);
      },
      itemEnter: function itemEnter(i) {
        var e = t(i.OngoingTarget);

        if (this.handleItemEvents(e)) {
          if (!this.isTouchMode()) {
            this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
            var s = this;
            this.showTimeout = setTimeout(function () {
              s.itemActivate(e);
            }, this.opts.showOnClick && 1 == e.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout);
          }

          this.$root.triggerHandler("mouseenter.smapi", e[0]);
        }
      },
      itemFocus: function itemFocus(i) {
        var e = t(i.OngoingTarget);
        this.handleItemEvents(e) && (!this.focusActivated || this.isTouchMode() && e.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == e[0] || this.itemActivate(e, !0), this.$root.triggerHandler("focus.smapi", e[0]));
      },
      itemLeave: function itemLeave(i) {
        var e = t(i.OngoingTarget);
        this.handleItemEvents(e) && (this.isTouchMode() || (e[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0)), e.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", e[0]));
      },
      menuHide: function menuHide(i) {
        if (this.$root.triggerHandler("beforehide.smapi", i[0]) !== !1 && (i.stop(!0, !0), "none" != i.css("display"))) {
          var e = function e() {
            i.css("z-index", "");
          };

          this.isCollapsible() ? this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, i, e) : i.hide(this.opts.collapsibleHideDuration, e) : this.opts.hideFunction ? this.opts.hideFunction.call(this, i, e) : i.hide(this.opts.hideDuration, e), i.dataSM("ie-shim") && i.dataSM("ie-shim").remove().css({
            "-webkit-transform": "",
            transform: ""
          }), i.dataSM("scroll") && (this.menuScrollStop(i), i.css({
            "touch-action": "",
            "-ms-touch-action": "",
            "-webkit-transform": "",
            transform: ""
          }).unbind(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), i.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), i.attr({
            "aria-expanded": "false",
            "aria-hidden": "true"
          });
          var s = i.dataSM("level");
          this.activatedItems.splice(s - 1, 1), this.visibleSubMenus.splice(t.inArray(i, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", i[0]);
        }
      },
      menuHideAll: function menuHideAll() {
        this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);

        for (var t = this.opts.isPopup ? 1 : 0, i = this.visibleSubMenus.length - 1; i >= t; i--) {
          this.menuHide(this.visibleSubMenus[i]);
        }

        this.opts.isPopup && (this.$root.stop(!0, !0), this.$root.is(":visible") && (this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration), this.$root.dataSM("ie-shim") && this.$root.dataSM("ie-shim").remove())), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi");
      },
      menuHideSubMenus: function menuHideSubMenus(t) {
        for (var i = this.activatedItems.length - 1; i >= t; i--) {
          var e = this.activatedItems[i].dataSM("sub");
          e && this.menuHide(e);
        }
      },
      menuIframeShim: function menuIframeShim(i) {
        a && this.opts.overlapControlsInIE && !i.dataSM("ie-shim") && i.dataSM("ie-shim", t("<iframe/>").attr({
          src: "javascript:0",
          tabindex: -9
        }).css({
          position: "absolute",
          top: "auto",
          left: "0",
          opacity: 0,
          border: "0"
        }));
      },
      menuInit: function menuInit(t) {
        if (!t.dataSM("in-mega")) {
          t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);

          for (var i = 2, e = t[0]; (e = e.parentNode.parentNode) != this.$root[0];) {
            i++;
          }

          var s = t.prevAll("a").eq(-1);
          s.length || (s = t.prevAll().find("a").eq(-1)), s.addClass("has-submenu").dataSM("sub", t), t.dataSM("parent-a", s).dataSM("level", i).parent().dataSM("sub", t);
          var o = s.attr("id") || this.accessIdPrefix + ++this.idInc,
              a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
          s.attr({
            id: o,
            "aria-haspopup": "true",
            "aria-controls": a,
            "aria-expanded": "false"
          }), t.attr({
            id: a,
            role: "group",
            "aria-hidden": "true",
            "aria-labelledby": o,
            "aria-expanded": "false"
          }), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone());
        }
      },
      menuPosition: function menuPosition(i) {
        var e,
            o,
            a = i.dataSM("parent-a"),
            r = a.closest("li"),
            h = r.parent(),
            u = i.dataSM("level"),
            l = this.getWidth(i),
            c = this.getHeight(i),
            d = a.offset(),
            m = d.left,
            p = d.top,
            f = this.getWidth(a),
            v = this.getHeight(a),
            b = t(window),
            S = b.scrollLeft(),
            g = b.scrollTop(),
            M = this.getViewportWidth(),
            w = this.getViewportHeight(),
            T = h.parent().is("[data-sm-horizontal-sub]") || 2 == u && !h.hasClass("sm-vertical"),
            $ = this.opts.rightToLeftSubMenus && !r.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && r.is("[data-sm-reverse]"),
            y = 2 == u ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
            I = 2 == u ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;

        if (T ? (e = $ ? f - l - y : y, o = this.opts.bottomToTopSubMenus ? -c - I : v + I) : (e = $ ? y - l : f - y, o = this.opts.bottomToTopSubMenus ? v - I - c : I), this.opts.keepInViewport) {
          var x = m + e,
              C = p + o;

          if ($ && S > x ? e = T ? S - x + e : f - y : !$ && x + l > S + M && (e = T ? S + M - l - x + e : y - l), T || (w > c && C + c > g + w ? o += g + w - c - C : (c >= w || g > C) && (o += g - C)), T && (C + c > g + w + .49 || g > C) || !T && c > w + .49) {
            var H = this;
            i.dataSM("scroll-arrows") || i.dataSM("scroll-arrows", t([t('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], t('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).bind({
              mouseenter: function mouseenter() {
                i.dataSM("scroll").up = t(this).hasClass("scroll-up"), H.menuScroll(i);
              },
              mouseleave: function mouseleave(t) {
                H.menuScrollStop(i), H.menuScrollOut(i, t);
              },
              "mousewheel DOMMouseScroll": function mousewheelDOMMouseScroll(t) {
                t.preventDefault();
              }
            }).insertAfter(i));
            var A = ".smartmenus_scroll";
            i.dataSM("scroll", {
              y: this.cssTransforms3d ? 0 : o - v,
              step: 1,
              itemH: v,
              subH: c,
              arrowDownH: this.getHeight(i.dataSM("scroll-arrows").eq(1))
            }).bind(s([["mouseover", function (t) {
              H.menuScrollOver(i, t);
            }], ["mouseout", function (t) {
              H.menuScrollOut(i, t);
            }], ["mousewheel DOMMouseScroll", function (t) {
              H.menuScrollMousewheel(i, t);
            }]], A)).dataSM("scroll-arrows").css({
              top: "auto",
              left: "0",
              marginLeft: e + (parseInt(i.css("border-left-width")) || 0),
              width: l - (parseInt(i.css("border-left-width")) || 0) - (parseInt(i.css("border-right-width")) || 0),
              zIndex: i.css("z-index")
            }).eq(T && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed() && i.css({
              "touch-action": "none",
              "-ms-touch-action": "none"
            }).bind(s([[n ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp", function (t) {
              H.menuScrollTouch(i, t);
            }]], A));
          }
        }

        i.css({
          top: "auto",
          left: "0",
          marginLeft: e,
          marginTop: o - v
        }), this.menuIframeShim(i), i.dataSM("ie-shim") && i.dataSM("ie-shim").css({
          zIndex: i.css("z-index"),
          width: l,
          height: c,
          marginLeft: e,
          marginTop: o - v
        });
      },
      menuScroll: function menuScroll(t, i, e) {
        var s,
            o = t.dataSM("scroll"),
            a = t.dataSM("scroll-arrows"),
            n = o.up ? o.upEnd : o.downEnd;

        if (!i && o.momentum) {
          if (o.momentum *= .92, s = o.momentum, .5 > s) return this.menuScrollStop(t), void 0;
        } else s = e || (i || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(o.step));

        var h = t.dataSM("level");
        if (this.activatedItems[h - 1] && this.activatedItems[h - 1].dataSM("sub") && this.activatedItems[h - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(h - 1), o.y = o.up && o.y >= n || !o.up && n >= o.y ? o.y : Math.abs(n - o.y) > s ? o.y + (o.up ? s : -s) : n, t.add(t.dataSM("ie-shim")).css(this.cssTransforms3d ? {
          "-webkit-transform": "translate3d(0, " + o.y + "px, 0)",
          transform: "translate3d(0, " + o.y + "px, 0)"
        } : {
          marginTop: o.y
        }), r && (o.up && o.y > o.downEnd || !o.up && o.y < o.upEnd) && a.eq(o.up ? 1 : 0).show(), o.y == n) r && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t);else if (!i) {
          this.opts.scrollAccelerate && o.step < this.opts.scrollStep && (o.step += .2);
          var l = this;
          this.scrollTimeout = u(function () {
            l.menuScroll(t);
          });
        }
      },
      menuScrollMousewheel: function menuScrollMousewheel(t, i) {
        if (this.getClosestMenu(i.target) == t[0]) {
          i = i.originalEvent;
          var e = (i.wheelDelta || -i.detail) > 0;
          t.dataSM("scroll-arrows").eq(e ? 0 : 1).is(":visible") && (t.dataSM("scroll").up = e, this.menuScroll(t, !0));
        }

        i.preventDefault();
      },
      menuScrollOut: function menuScrollOut(i, e) {
        r && (/^scroll-(up|down)/.test((e.relatedTarget || "").className) || (i[0] == e.relatedTarget || t.contains(i[0], e.relatedTarget)) && this.getClosestMenu(e.relatedTarget) == i[0] || i.dataSM("scroll-arrows").css("visibility", "hidden"));
      },
      menuScrollOver: function menuScrollOver(i, e) {
        if (r && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == i[0]) {
          this.menuScrollRefreshData(i);
          var s = i.dataSM("scroll"),
              o = t(window).scrollTop() - i.dataSM("parent-a").offset().top - s.itemH;
          i.dataSM("scroll-arrows").eq(0).css("margin-top", o).end().eq(1).css("margin-top", o + this.getViewportHeight() - s.arrowDownH).end().css("visibility", "visible");
        }
      },
      menuScrollRefreshData: function menuScrollRefreshData(i) {
        var e = i.dataSM("scroll"),
            s = t(window).scrollTop() - i.dataSM("parent-a").offset().top - e.itemH;
        this.cssTransforms3d && (s = -(parseFloat(i.css("margin-top")) - s)), t.extend(e, {
          upEnd: s,
          downEnd: s + this.getViewportHeight() - e.subH
        });
      },
      menuScrollStop: function menuScrollStop(t) {
        return this.scrollTimeout ? (l(this.scrollTimeout), this.scrollTimeout = 0, t.dataSM("scroll").step = 1, !0) : void 0;
      },
      menuScrollTouch: function menuScrollTouch(i, s) {
        if (s = s.originalEvent, e(s)) {
          var o = this.getTouchPoint(s);

          if (this.getClosestMenu(o.target) == i[0]) {
            var a = i.dataSM("scroll");
            if (/(start|down)$/i.test(s.type)) this.menuScrollStop(i) ? (s.preventDefault(), this.$touchScrollingSub = i) : this.$touchScrollingSub = null, this.menuScrollRefreshData(i), t.extend(a, {
              touchStartY: o.pageY,
              touchStartTime: s.timeStamp
            });else if (/move$/i.test(s.type)) {
              var r = void 0 !== a.touchY ? a.touchY : a.touchStartY;

              if (void 0 !== r && r != o.pageY) {
                this.$touchScrollingSub = i;
                var n = o.pageY > r;
                void 0 !== a.up && a.up != n && t.extend(a, {
                  touchStartY: o.pageY,
                  touchStartTime: s.timeStamp
                }), t.extend(a, {
                  up: n,
                  touchY: o.pageY
                }), this.menuScroll(i, !0, Math.abs(o.pageY - r));
              }

              s.preventDefault();
            } else void 0 !== a.touchY && ((a.momentum = 15 * Math.pow(Math.abs(o.pageY - a.touchStartY) / (s.timeStamp - a.touchStartTime), 2)) && (this.menuScrollStop(i), this.menuScroll(i), s.preventDefault()), delete a.touchY);
          }
        }
      },
      menuShow: function menuShow(t) {
        if ((t.dataSM("beforefirstshowfired") || (t.dataSM("beforefirstshowfired", !0), this.$root.triggerHandler("beforefirstshow.smapi", t[0]) !== !1)) && this.$root.triggerHandler("beforeshow.smapi", t[0]) !== !1 && (t.dataSM("shown-before", !0).stop(!0, !0), !t.is(":visible"))) {
          var i = t.dataSM("parent-a");
          if ((this.opts.keepHighlighted || this.isCollapsible()) && i.addClass("highlighted"), this.isCollapsible()) t.removeClass("sm-nowrap").css({
            zIndex: "",
            width: "auto",
            minWidth: "",
            maxWidth: "",
            top: "",
            left: "",
            marginLeft: "",
            marginTop: ""
          });else {
            if (t.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({
              width: "auto",
              minWidth: "",
              maxWidth: ""
            }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth)) {
              var e = this.getWidth(t);
              t.css("max-width", this.opts.subMenusMaxWidth), e > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth);
            }

            this.menuPosition(t), t.dataSM("ie-shim") && t.dataSM("ie-shim").insertBefore(t);
          }

          var s = function s() {
            t.css("overflow", "");
          };

          this.isCollapsible() ? this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, s) : t.show(this.opts.collapsibleShowDuration, s) : this.opts.showFunction ? this.opts.showFunction.call(this, t, s) : t.show(this.opts.showDuration, s), i.attr("aria-expanded", "true"), t.attr({
            "aria-expanded": "true",
            "aria-hidden": "false"
          }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0]);
        }
      },
      popupHide: function popupHide(t) {
        this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
        var i = this;
        this.hideTimeout = setTimeout(function () {
          i.menuHideAll();
        }, t ? 1 : this.opts.hideTimeout);
      },
      popupShow: function popupShow(t, i) {
        if (!this.opts.isPopup) return alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'), void 0;

        if (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0).stop(!0, !0), !this.$root.is(":visible")) {
          this.$root.css({
            left: t,
            top: i
          }), this.menuIframeShim(this.$root), this.$root.dataSM("ie-shim") && this.$root.dataSM("ie-shim").css({
            zIndex: this.$root.css("z-index"),
            width: this.getWidth(this.$root),
            height: this.getHeight(this.$root),
            left: t,
            top: i
          }).insertBefore(this.$root);

          var e = this,
              s = function s() {
            e.$root.css("overflow", "");
          };

          this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, s) : this.$root.show(this.opts.showDuration, s), this.visibleSubMenus[0] = this.$root;
        }
      },
      refresh: function refresh() {
        this.destroy(!0), this.init(!0);
      },
      rootKeyDown: function rootKeyDown(i) {
        if (this.handleEvents()) switch (i.keyCode) {
          case 27:
            var e = this.activatedItems[0];

            if (e) {
              this.menuHideAll(), e[0].focus();
              var s = e.dataSM("sub");
              s && this.menuHide(s);
            }

            break;

          case 32:
            var o = t(i.target);

            if (o.is("a") && this.handleItemEvents(o)) {
              var s = o.dataSM("sub");
              s && !s.is(":visible") && (this.itemClick({
                OngoingTarget: i.target
              }), i.preventDefault());
            }

        }
      },
      rootOut: function rootOut(t) {
        if (this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
          var i = this;
          this.hideTimeout = setTimeout(function () {
            i.menuHideAll();
          }, this.opts.hideTimeout);
        }
      },
      rootOver: function rootOver(t) {
        this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
      },
      winResize: function winResize(t) {
        if (this.handleEvents()) {
          if (!("onorientationchange" in window) || "orientationchange" == t.type) {
            var i = this.isCollapsible();
            this.wasCollapsible && i || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = i;
          }
        } else if (this.$disableOverlay) {
          var e = this.$root.offset();
          this.$disableOverlay.css({
            top: e.top,
            left: e.left,
            width: this.$root.outerWidth(),
            height: this.$root.outerHeight()
          });
        }
      }
    }
  }), t.fn.dataSM = function (t, i) {
    return i ? this.data(t + "_smartmenus", i) : this.data(t + "_smartmenus");
  }, t.fn.removeDataSM = function (t) {
    return this.removeData(t + "_smartmenus");
  }, t.fn.smartmenus = function (i) {
    if ("string" == typeof i) {
      var e = arguments,
          s = i;
      return Array.prototype.shift.call(e), this.each(function () {
        var i = t(this).data("smartmenus");
        i && i[s] && i[s].apply(i, e);
      });
    }

    var o = t.extend({}, t.fn.smartmenus.defaults, i);
    return this.each(function () {
      new t.SmartMenus(this, o);
    });
  }, t.fn.smartmenus.defaults = {
    isPopup: !1,
    mainMenuSubOffsetX: 0,
    mainMenuSubOffsetY: 0,
    subMenusSubOffsetX: 0,
    subMenusSubOffsetY: 0,
    subMenusMaxWidth: "22em",
    subIndicators: !0,
    subIndicatorsPos: "prepend",
    subIndicatorsText: "+",
    scrollStep: 30,
    scrollAccelerate: !0,
    showTimeout: 250,
    hideTimeout: 500,
    showDuration: 0,
    showFunction: null,
    hideDuration: 0,
    hideFunction: function hideFunction(t, i) {
      t.fadeOut(200, i);
    },
    collapsibleShowDuration: 0,
    collapsibleShowFunction: function collapsibleShowFunction(t, i) {
      t.slideDown(200, i);
    },
    collapsibleHideDuration: 0,
    collapsibleHideFunction: function collapsibleHideFunction(t, i) {
      t.slideUp(200, i);
    },
    showOnClick: !1,
    hideOnClick: !0,
    noMouseOver: !1,
    keepInViewport: !0,
    keepHighlighted: !0,
    markOngoingItem: !1,
    markOngoingTree: !0,
    rightToLeftSubMenus: !1,
    bottomToTopSubMenus: !1,
    overlapControlsInIE: !0
  }, t;
});
/*! SmartMenus jQuery Plugin Keyboard Addon - v0.3.0 - January 26, 2016
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */


(function (t) {
  "function" == typeof define && define.amd ? define(["jquery", "jquery.smartmenus"], t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = t(require("jquery")) : t(jQuery);
})(function (t) {
  function e(t) {
    return t.find("> li > a:not(.disabled), > li > :not(ul) a:not(.disabled)").eq(0);
  }

  function s(t) {
    return t.find("> li > a:not(.disabled), > li > :not(ul) a:not(.disabled)").eq(-1);
  }

  function i(t, s) {
    var i = t.nextAll("li").find("> a:not(.disabled), > :not(ul) a:not(.disabled)").eq(0);
    return s || i.length ? i : e(t.parent());
  }

  function o(e, i) {
    var o = e.prevAll("li").find("> a:not(.disabled), > :not(ul) a:not(.disabled)").eq(/^1\.8\./.test(t.fn.jquery) ? 0 : -1);
    return i || o.length ? o : s(e.parent());
  }

  return t.fn.focusSM = function () {
    return this.length && this[0].focus && this[0].focus(), this;
  }, t.extend(t.SmartMenus.Keyboard = {}, {
    docKeydown: function docKeydown(a) {
      var n = a.keyCode;

      if (/^(37|38|39|40)$/.test(n)) {
        var r = t(this),
            h = r.data("smartmenus"),
            u = t(a.target);

        if (h && u.is("a") && h.handleItemEvents(u)) {
          var l = u.closest("li"),
              d = l.parent(),
              c = d.dataSM("level");

          switch (r.hasClass("sm-rtl") && (37 == n ? n = 39 : 39 == n && (n = 37)), n) {
            case 37:
              if (h.isCollapsible()) break;
              c > 2 || 2 == c && r.hasClass("sm-vertical") ? h.activatedItems[c - 2].focusSM() : r.hasClass("sm-vertical") || o((h.activatedItems[0] || u).closest("li")).focusSM();
              break;

            case 38:
              if (h.isCollapsible()) {
                var m;
                c > 1 && (m = e(d)).length && u[0] == m[0] ? h.activatedItems[c - 2].focusSM() : o(l).focusSM();
              } else 1 == c && !r.hasClass("sm-vertical") && h.opts.bottomToTopSubMenus ? (!h.activatedItems[0] && u.dataSM("sub") && (h.opts.showOnClick && (h.clickActivated = !0), h.itemActivate(u), u.dataSM("sub").is(":visible") && (h.focusActivated = !0)), h.activatedItems[0] && h.activatedItems[0].dataSM("sub") && h.activatedItems[0].dataSM("sub").is(":visible") && !h.activatedItems[0].dataSM("sub").hasClass("mega-menu") && s(h.activatedItems[0].dataSM("sub")).focusSM()) : (c > 1 || r.hasClass("sm-vertical")) && o(l).focusSM();

              break;

            case 39:
              if (h.isCollapsible()) break;
              1 == c && r.hasClass("sm-vertical") ? (!h.activatedItems[0] && u.dataSM("sub") && (h.opts.showOnClick && (h.clickActivated = !0), h.itemActivate(u), u.dataSM("sub").is(":visible") && (h.focusActivated = !0)), h.activatedItems[0] && h.activatedItems[0].dataSM("sub") && h.activatedItems[0].dataSM("sub").is(":visible") && !h.activatedItems[0].dataSM("sub").hasClass("mega-menu") && e(h.activatedItems[0].dataSM("sub")).focusSM()) : 1 != c && (!h.activatedItems[c - 1] || h.activatedItems[c - 1].dataSM("sub") && h.activatedItems[c - 1].dataSM("sub").is(":visible") && !h.activatedItems[c - 1].dataSM("sub").hasClass("mega-menu")) || r.hasClass("sm-vertical") ? h.activatedItems[c - 1] && h.activatedItems[c - 1].dataSM("sub") && h.activatedItems[c - 1].dataSM("sub").is(":visible") && !h.activatedItems[c - 1].dataSM("sub").hasClass("mega-menu") && e(h.activatedItems[c - 1].dataSM("sub")).focusSM() : i((h.activatedItems[0] || u).closest("li")).focusSM();
              break;

            case 40:
              if (h.isCollapsible()) {
                var p, f;
                if (h.activatedItems[c - 1] && h.activatedItems[c - 1].dataSM("sub") && h.activatedItems[c - 1].dataSM("sub").is(":visible") && !h.activatedItems[c - 1].dataSM("sub").hasClass("mega-menu") && (p = e(h.activatedItems[c - 1].dataSM("sub"))).length) p.focusSM();else if (c > 1 && (f = s(d)).length && u[0] == f[0]) {
                  for (var v = h.activatedItems[c - 2].closest("li"), b = null; v.is("li") && !(b = i(v, !0)).length;) {
                    v = v.parent().parent();
                  }

                  b.length ? b.focusSM() : e(r).focusSM();
                } else i(l).focusSM();
              } else 1 != c || r.hasClass("sm-vertical") || h.opts.bottomToTopSubMenus ? (c > 1 || r.hasClass("sm-vertical")) && i(l).focusSM() : (!h.activatedItems[0] && u.dataSM("sub") && (h.opts.showOnClick && (h.clickActivated = !0), h.itemActivate(u), u.dataSM("sub").is(":visible") && (h.focusActivated = !0)), h.activatedItems[0] && h.activatedItems[0].dataSM("sub") && h.activatedItems[0].dataSM("sub").is(":visible") && !h.activatedItems[0].dataSM("sub").hasClass("mega-menu") && e(h.activatedItems[0].dataSM("sub")).focusSM());

          }

          a.stopPropagation(), a.preventDefault();
        }
      }
    }
  }), t(document).delegate("ul.sm, ul.navbar-nav:not([data-sm-skip])", "keydown.smartmenus", t.SmartMenus.Keyboard.docKeydown), t.extend(t.SmartMenus.prototype, {
    keyboardSetHotkey: function keyboardSetHotkey(s, i) {
      var o = this;
      t(document).bind("keydown.smartmenus" + this.rootId, function (a) {
        if (s == a.keyCode) {
          var n = !0;
          i && ("string" == typeof i && (i = [i]), t.each(["ctrlKey", "shiftKey", "altKey", "metaKey"], function (e, s) {
            return t.inArray(s, i) >= 0 && !a[s] || 0 > t.inArray(s, i) && a[s] ? (n = !1, !1) : void 0;
          })), n && (e(o.$root).focusSM(), a.stopPropagation(), a.preventDefault());
        }
      });
    }
  }), t;
});