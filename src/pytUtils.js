var simpleBezier = (p1, p2, percent) =>
  Math.pow(percent, 3) + p2 * 3 * Math.pow(percent, 2) * (1-percent) + p1 * 3 * percent * Math.pow(1-percent, 2);

var requiredParameters = (fnName, requiredArray, optsObj) => {
  var keys = Object.keys(optsObj);
  for (var i = 0 ; i < requiredArray.length ; i++) {
    if (keys.indexOf(requiredArray[i]) === -1) {
      throw(`error: ${requiredArray[i]} is a required parameter of ${fnName}`);
    }
  }
}

var hasClass = (el, className) =>
  el.classList ? el.classList.contains(className) : !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));

var addClass = (el, className) => {
  if (Array.isArray(className)) {
    className.forEach(item => addClass(el, item));
    return;
  }
  if (Array.isArray(el)) {
    el.forEach(item => addClass(item, className));
    return;
  }
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`;
  }
};

var removeClass = (el, className) => {
  if (Array.isArray(className)) {
    className.forEach(item => removeClass(el, item));
    return;
  }
  if (Array.isArray(el)) {
    el.forEach(item => removeClass(item, className));
    return;
  }
  if (el.classList) {
    el.classList.remove(className)
  } else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
};

var dispatchCustomEvent = (name, obj) => {
  var evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  if (obj.dispatchEvent) { obj.dispatchEvent(evt); }
    else if (obj.fireEvent) { obj.fireEvent(evt); }
    else { throw('this browser does not support custom events'); }
};

var throttleEvent = (eventToThrottle, newEvent, obj = window) => {
  var running = false;

  var dispatchThrottledEvent = () => {
    dispatchCustomEvent(newEvent, obj);
    running = false;
  }

  var throttledEventListener = () => {
    if (running) { return; }
    running = true;
    requestAnimationFrame(dispatchThrottledEvent);
  };

  obj.addEventListener(eventToThrottle, throttledEventListener);
};

var throttledScrollController = () => {
  var scrollListeners = [];

  var pushNewListener = fn => {
    if (typeof fn === 'function') {
      scrollListeners.push(fn);
      return (scrollListeners.length-1);
    } else {
      throw('pushNewListener must take a function as an argument');
    }
  }

  var removeListener = index => {
    scrollListeners[index] = null;
    scrollListeners.splice(index, 1);
  }

  var getScrollPosition = () => {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    return (supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop) + window.innerHeight;
  }

  var handleScroll = () => scrollListeners.forEach(el => el());

  throttleEvent('scroll', 'pyt-throttled-scroll-event');
  window.addEventListener('pyt-throttled-scroll-event', handleScroll);

  return {
    pushNewListener: pushNewListener,
    removeListener: removeListener,
    getScrollPosition: getScrollPosition
  }
}

export default {
  simpleBezier,
  requiredParameters,
  hasClass,
  addClass,
  removeClass,
	throttledScrollController
}
