'use strict'

var pytUtils = require('./pytUtils');
var pytConfig = require('./pytConfig');
var pytTransformStyles = require('./pytTransformStyles');

var pyt = function pyt(opts) {
	pytUtils.requiredParameters('pyt', ['el', 'scrollcontroller', 'parallaxConfig'], opts);

	this.el = opts.el;
	this.scrollController = opts.scrollcontroller;
	this.parallaxOpts = [];
	this.pytState = [];

	if (Array.isArray(opts.parallaxConfig)) {
		opts.parallaxConfig.forEach(this.pushConfig.bind(this));
	} else {
		this.pushConfig(opts.parallaxConfig);
	}

	this.classTargets = this.parallaxOpts.related ? [this.el].concat(this.parallaxOpts.related) : [this.el];
	this.scrollController.pushNewListener(this.parallaxAllEls.bind(this));
	this.parallaxAllEls();
}

pyt.prototype.pushConfig = function(config) {
	this.hasProp(config);
	this.parallaxOpts.push(Object.assign({}, new pytConfig(config), config));
	if (!this.parallaxOpts[this.parallaxOpts.length-1].trackingEl) {
		this.parallaxOpts[this.parallaxOpts.length-1].trackingEl = this.el;
	}
}

pyt.prototype.hasProp = function(config) {
	if (!config.property) {
		throw('Error in pyt.hasProp: every config object must have a target css property set');
	}
}

pyt.prototype.calculateStyles = function (config, delta) {
	if (pytTransformStyles.indexOf(config.property) === -1) {
		this.el.style[config.property] = config.returnCurrentStyle(delta);
	} else {
		this.transformStrings.push(config.returnCurrentStyle(delta));
	}
}

pyt.prototype.getParallaxStart = function (i) {
	return window.innerHeight * this.parallaxOpts[i].viewportStart;
}

pyt.prototype.getParallaxEnd = function (i) {
	return window.innerHeight * this.parallaxOpts[i].viewportEnd;
}

pyt.prototype.getParallaxArea = function (i) {
	var offset = this.parallaxOpts.viewportEndWithTop || this.parallaxOpts.viewportStartWithBottom ? 0 : this.parallaxOpts[i].trackingEl.offsetHeight;
	return this.parallaxOpts.viewportEnd > this.parallaxOpts.viewportStart ? offset - (this.getParallaxEnd(i) - this.getParallaxStart(i)) : offset + this.getParallaxStart(i) - this.getParallaxEnd(i);
}

pyt.prototype.getParallaxTarget = function (elPosition, i) {
	return (1-((this.getTargetEnd(elPosition) - this.getParallaxEnd(i)) / this.getParallaxArea(i)));
}

pyt.prototype.getTargetStart = function (elPosition) {
	return this.parallaxOpts.startWithBottom ? elPosition.bottom : elPosition.top;
}

pyt.prototype.getTargetEnd = function (elPosition) {
	return this.parallaxOpts.endWithTop ? elPosition.top : elPosition.bottom;
}

pyt.prototype.checkScroll = function(config, i, arr) {
	var elPosition = config.trackingEl.getBoundingClientRect();
	if (this.getTargetStart(elPosition) < this.getParallaxStart(i) && this.getTargetEnd(elPosition) > this.getParallaxEnd(i)) {
		if (this.pytState[i] != 'pyt') {
			if (config.pytClass) {
				pytUtils.addClass(this.classTargets, 'pyt_' + config.pytClass);
				pytUtils.removeClass(this.classTargets, ['prepyt_' + config.pytClass, 'postpyt_' + config.pytClass]);
			}
			this.pytState[i] = 'pyt';
		}
		this.calculateStyles(config, this.getParallaxTarget(elPosition, i));
	} else if (this.getTargetStart(elPosition) >= this.getParallaxStart(i)) {
		if (this.pytState[i] != 'prepyt') {
			if (config.pytClass) {
				pytUtils.addClass(this.classTargets, 'prepyt_' + config.pytClass);
				pytUtils.removeClass(this.classTargets, ['pyt_' + config.pytClass, 'postpyt_' + config.pytClass]);
			}
			this.pytState[i] = 'prepyt';
			this.calculateStyles(config, 0);
		}
	} else if (this.getTargetEnd(elPosition) <= this.getParallaxEnd(i)) {
		if (this.pytState[i] != 'postpyt') {
			if (config.pytClass) {
				pytUtils.addClass(this.classTargets, 'postpyt_' + config.pytClass);
				pytUtils.removeClass(this.classTargets, ['prepyt_' + config.pytClass, 'pyt_' + config.pytClass]);
			}
			this.pytState[i] = 'postpyt';
			this.calculateStyles(config, 1);
		}
	}
}

pyt.prototype.parallaxAllEls = function() {
	this.transformStrings = [];

	this.parallaxOpts.forEach(this.checkScroll.bind(this));


	if (this.transformStrings.length >= 1) {
		this.el.style.transform = this.transformStrings.join(' ');
		this.el.style.webkitTransform = this.transformStrings.join(' ');
	}
}

module.exports = {
	pyt: pyt,
	throttledScrollController: pytUtils.throttledScrollController
}