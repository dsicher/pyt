'use strict'

import pytUtils from './pytUtils';
import pytConfig from './pytConfig';
import pytTransformStyles from './pytTransformStyles';

var pyt = function pyt(opts) {
	pytUtils.requiredParameters('pyt', ['el', 'index', 'scrollcontroller', 'parallaxConfig'], opts);

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
}

pyt.prototype.pushConfig = function(config) {
	this.hasProp(config);
	this.parallaxOpts.push(Object.assign({}, new pytConfig(config), config));
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

pyt.prototype.getParallaxStart = function () {
	return window.innerHeight * this.parallaxOpts.viewportStart;
}

pyt.prototype.getParallaxEnd = function () {
	return window.innerHeight * this.parallaxOpts.viewportEnd;
}

pyt.prototype.getParallaxArea = function () {
	var offset = this.parallaxOpts.viewportEndWithTop || this.parallaxOpts.viewportStartWithBottom ? 0 : this.parallaxOpts.trackingEl.offsetHeight;
	return this.parallaxOpts.viewportEnd > this.parallaxOpts.viewportStart ? offset - (this.getParallaxEnd() - this.getParallaxStart()) : offset + this.getParallaxStart() - this.getParallaxEnd();
}

pyt.prototype.getParallaxTarget = function (elPosition) {
	return (1-((this.getTargetEnd(elPosition) - this.getParallaxEnd()) / this.getParallaxArea())) * this.parallaxOpts.parallax;
}

pyt.prototype.getTargetStart = function (elPosition) {
	return this.parallaxOpts.startWithBottom ? elPosition.bottom : elPosition.top;
}

pyt.prototype.getTargetEnd = function (elPosition) {
	return this.parallaxOpts.endWithTop ? elPosition.top : elPosition.bottom;
}

pyt.prototype.checkScroll = function(config, i, arr) {
	var elPosition = config.trackingEl.getBoundingClientRect();
	if (this.getTargetStart(elPosition) < this.getParallaxStart() && this.getTargetEnd(elPosition) > this.getParallaxEnd()) {
		if (this.pytState[i] != 'pyt' && config.pytClass) {
			this.pytState[i] = 'pyt';
			pytUtils.addClass([this.el, this.parallaxOpts.parent], 'pyt_' + config.pytClass);
			pytUtils.removeClass([this.el, this.parallaxOpts.parent], ['prepyt_' + config.pytClass, 'postpyt_' + config.pytClass]);
		}
		this.calculateStyles(config, this.getParallaxTarget(elPosition));
	} else if (this.getTargetStart(elPosition) >= this.getParallaxStart()) {
		if (this.pytState[i] != 'prepyt' && config.pytClass) {
			this.pytState[i] = 'prepyt';
			pytUtils.addClass([this.el, this.parallaxOpts.parent], 'prepyt_' + config.pytClass);
			pytUtils.removeClass([this.el, this.parallaxOpts.parent], ['pyt_' + config.pytClass, 'postpyt_' + config.pytClass]);
			this.calculateStyles(config, 0);
		}
	} else if (this.getTargetEnd(elPosition) <= this.getParallaxEnd()) {
		if (this.pytState[i] != 'postpyt' && config.pytClass) {
			this.pytState[i] = 'postpyt';
			pytUtils.addClass([this.el, this.parallaxOpts.parent], 'postpyt_' + config.pytClass);
			pytUtils.removeClass([this.el, this.parallaxOpts.parent], ['prepyt_' + config.pytClass, 'pyt_' + config.pytClass]);
			this.calculateStyles(config, 1);
		}
	}
}

pyt.prototype.parallaxAllEls = function() {
	this.transformStrings = [];

	var elPosition = this.parallaxOpts.trackingEl.getBoundingClientRect();
	var isLastNode = this.idx === this.els.length-1;
	this.parallaxOpts.forEach(this.checkScroll.bind(this));

	if (this.transformStrings.length >= 1) {
		this.el.style.transform = transformString.join(', ');
		this.el.style.webkitTransform = transformString.join(', ');
	}
}

module.exports = {
	pyt: pyt,
	throttledScrollController: pytUtils.throttledScrollController
}