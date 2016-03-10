'use strict'

var simpleBezier = function(p1, p2, percent) {
    return Math.pow(percent, 3) + p2 * 3 * Math.pow(percent, 2) * (1-percent) + p1 * 3 * percent * Math.pow(1-percent, 2);
}

var requiredParameters = function(fnName, requiredArray, optsObj) {
    var keys = Object.keys(optsObj);
    for (var i = 0 ; i < requiredArray.length ; i++) {
        if (keys.indexOf(requiredArray[i]) === -1) {
            throw('error: ' + requiredArray[i] + ' is a required parameter of ' + fnName);
        }
    }
}

var hasClass = function(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
};

var addClass = function(el, className) {
    if (Array.isArray(className)) {
        className.forEach(function(item){addClass(el, item);});
    } else {
        if (Array.isArray(el)) {
            el.forEach(function(item){addClass(item, className);});
        } else {
            if (el.classList) {
                el.classList.add(className);
            } else if (!hasClass(el, className)) {
                el.className += " " + className
            }
        }
    }
};

var removeClass = function(el, className) {
    if (Array.isArray(className)) {
        className.forEach(function(item){removeClass(el, item);});
    } else {
        if (Array.isArray(el)) {
            el.forEach(function(item){removeClass(item, className);});
        } else {
            if (el.classList) {
                el.classList.remove(className)
            } else if (hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
                el.className=el.className.replace(reg, ' ')
            }
        }
    }
};

var dispatchCustomEvent = function(name, obj) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    if (obj.dispatchEvent) {
        obj.dispatchEvent(evt);
    } else if (obj.fireEvent) {
        obj.fireEvent(evt);
    } else {
        throw('this browser does not support custom events');
    }
};

var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
        if (running) { return; }
        running = true;
        requestAnimationFrame(function() {
            dispatchCustomEvent(name, obj);
            running = false;
        });
    };
    obj.addEventListener(type, func);
};


var throttledScrollController = function(customEvtName) {
    var scrollListeners = [];

    var pushNewListener = function(fn) {
      scrollListeners.push(fn);
      return (scrollListeners.length-1);
    }

    var removeListener = function(index) {
      scrollListeners[index] = null;
    }

    var getScrollPosition = function() {
      var supportPageOffset = window.pageXOffset !== undefined;
      var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
      return (supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop) + window.innerHeight;
    }

    var handleScroll = function() {
      scrollListeners.forEach(function(el, i, arr) {
        if (typeof el === 'function') {
          el();
        }
      });
    }

    throttle('scroll', customEvtName);
    window.addEventListener(customEvtName, handleScroll);
    return {
        pushNewListener: pushNewListener,
        removeListener: removeListener,
        getScrollPosition: getScrollPosition
    }
}

module.exports = {
    simpleBezier: simpleBezier,
    requiredParameters: requiredParameters,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
	throttledScrollController: throttledScrollController
}
