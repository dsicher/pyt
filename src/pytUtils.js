var requiredParameters = (fnName, requiredArray, optsObj) => {
  if (!optsObj) { throw(`error: ${fnName} requires a parameter`) }
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

var dispatchCustomEvent = customEventName => {
  var evt = new Event(customEventName);
  if (window.dispatchEvent) { window.dispatchEvent(evt); }
    else if (window.fireEvent) { window.fireEvent(evt); }
    else { throw('this browser does not support custom events'); }
};

var throttleEvent = (eventToThrottle, newEvent, emitFn) => {
  var blockEvents = false;

  var dispatchThrottledEvent = emitFn
    ? () => {
      emitFn();
      dispatchCustomEvent(newEvent);
      blockEvents = false;
    } : () => {
      dispatchCustomEvent(newEvent);
      blockEvents = false;
    }

  var throttledEventListener = () => {
    if (blockEvents) { return; }
    blockEvents = true;
    requestAnimationFrame(dispatchThrottledEvent);
  };

  window.addEventListener(eventToThrottle, throttledEventListener);
};

var emitThrottledScroll = () => {
  if (!window.emittingThrottledScroll) {
    throttleEvent('scroll', 'pyt-throttled-scroll');
    window.emittingThrottledScroll = true;
  }
}

var emitThrottledResize = setCurrentBreakpoint => {
  if (!window.emittingThrottledResize) {
    throttleEvent('resize', 'pyt-throttled-resize', setCurrentBreakpoint);
    window.emittingThrottledResize = true;
  }
}

export default {
  requiredParameters,
  hasClass,
  addClass,
  removeClass,
  emitThrottledScroll,
  emitThrottledResize,
}
