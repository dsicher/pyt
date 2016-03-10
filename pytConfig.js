/* TODO:
	pytConfig.prototype.transformOrigin = function() {
		this.property = 'transformOrigin';
		this.requires(['startX', 'endX', 'startY', 'endY'], config);
	}

	boxShadow,

	clip,

	columnGap,
	columnRuleColor,
	columnRuleWidth,
	columnWidth,

	filter,

	perspective,
	perspectiveOrigin,

	textShadow,

	transform,
	transformOrigin
*/

'use strict'

import pytColorConverter from './pytColorConverter';

var pytConfig = function pytConfig(config) {
	this.config = config;
	if (!pytConfig.prototype.hasOwnProperty(config.property)) {
		throw(config.property + ' is not a valid pytConfig parameter');
	} else {
		this[config.property](config);
	}
}

pytConfig.prototype.viewportEnd = 0;
pytConfig.prototype.viewportStart = 1;
pytConfig.prototype.trackingEl = null;
pytConfig.prototype.endWithTop = false;
pytConfig.prototype.startWithBottom = false;

pytConfig.prototype.backgroundColor = function() {
	this.property = 'backgroundColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.borderColor = function(config) {
	this.property = 'borderColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.borderTopColor = function(config) {
	this.property = 'borderTopColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.borderRightColor = function(config) {
	this.property = 'borderRightColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.borderBottomColor = function(config) {
	this.property = 'borderBottomColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.borderLeftColor = function(config) {
	this.property = 'borderLeftColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.borderWidth = function() {
	this.property = 'borderWidth';
	this.startValue = 0;
	this.endValue = 3;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderTopWidth = function() {
	this.property = 'borderTopWidth';
	this.startValue = 0;
	this.endValue = 3;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderRightWidth = function() {
	this.property = 'borderRightWidth';
	this.startValue = 0;
	this.endValue = 3;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderBottomWidth = function() {
	this.property = 'borderBottomWidth';
	this.startValue = 0;
	this.endValue = 3;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderLeftWidth = function() {
	this.property = 'borderLeftWidth';
	this.startValue = 0;
	this.endValue = 3;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderRadius = function() {
	this.property = 'borderRadius';
	this.startValue = 0;
	this.endValue = 5;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderBottomLeftRadius = function() {
	this.property = 'borderBottomLeftRadius';
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderBottomRightRadius = function() {
	this.property = 'borderBottomRightRadius';
	this.startValue = 0;
	this.endValue = 5;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderTopLeftRadius = function() {
	this.property = 'borderTopLeftRadius';
	this.startValue = 0;
	this.endValue = 5;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.borderTopRightRadius = function() {
	this.property = 'borderTopRightRadius';
	this.startValue = 0;
	this.endValue = 5;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.bottom = function() {
	this.property = 'bottom';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.top = function() {
	this.property = 'top';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.right = function() {
	this.property = 'right';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.left = function() {
	this.property = 'left';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.height = function(config) {
	this.property = 'height';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.maxHeight = function(config) {
	this.property = 'maxHeight';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.minHeight = function(config) {
	this.property = 'minHeight';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.width = function(config) {
	this.property = 'width';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.maxWidth = function(config) {
	this.property = 'maxWidth';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.minWidth = function(config) {
	this.property = 'minWidth';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.color = function(config) {
	this.property = 'color';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.fontSize = function(config) {
	this.property = 'fontSize';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.letterSpacing = function(config) {
	this.property = 'letterSpacing';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.lineHeight = function(config) {
	this.property = 'lineHeight';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.margin = function(config) {
	this.property = 'margin';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.marginTop = function() {
	this.property = 'marginTop';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.marginRight = function() {
	this.property = 'marginRight';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.marginBottom = function() {
	this.property = 'marginBottom';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.marginLeft = function() {
	this.property = 'marginLeft';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.padding = function(config) {
	this.property = 'padding';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.paddingTop = function(config) {
	this.property = 'paddingTop';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.paddingRight = function(config) {
	this.property = 'paddingRight';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.paddingBottom = function(config) {
	this.property = 'paddingBottom';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.paddingLeft = function(config) {
	this.property = 'paddingLeft';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.opacity = function() {
	this.property = 'opacity';
	this.startValue = 0;
	this.endValue = 1;
	this.units = '';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.outlineColor = function(config) {
	this.property = 'outlineColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.outlineOffset = function(config) {
	this.property = 'outlineOffset';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.outlineWidth = function(config) {
	this.property = 'outlineWidth';
	this.requires(['startValue', 'endValue'], config);
	this.units = 'px';
	this.returnCurrentStyle = this.processGenericStyle;
}

pytConfig.prototype.textDecorationColor = function(config) {
	this.property = 'textDecorationColor';
	this.initColorProperty(config);
	this.returnCurrentStyle = this.processColorStyle;
}

pytConfig.prototype.translateX = function() {
	this.property = 'translateX';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.translateY = function() {
	this.property = 'translateY';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.translateZ = function() {
	this.property = 'translateZ';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.scale = function() {
	this.property = 'scale';
	this.startValue = .8;
	this.endValue = 1;
	this.units = '';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.scaleX = function() {
	this.property = 'scaleX';
	this.startValue = .8;
	this.endValue = 1;
	this.units = '';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.scaleY = function() {
	this.property = 'scaleY';
	this.startValue = .8;
	this.endValue = 1;
	this.units = '';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.scaleZ = function() {
	this.property = 'scaleZ';
	this.startValue = .8;
	this.endValue = 1;
	this.units = '';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.rotate = function() {
	this.property = 'rotate';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'deg'
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.skewX = function() {
	this.property = 'skewX';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.skewY = function() {
	this.property = 'skewY';
	this.startValue = -100;
	this.endValue = 0;
	this.units = 'px';
	this.returnCurrentStyle = this.processTransformStyle;
}

pytConfig.prototype.requires = function (requiredArray, config) {
	for (var i = 0, x = requiredArray.length ; i < x ; i++) {
		if(!config.hasOwnProperty(requiredArray[i])) {
			throw('error in pyt.pushConfig: ' + requiredArray[i] + ' is a required parameter of ' + config.property);
		}
	}
}

pytConfig.prototype.initColorProperty = function(config) {
	this.requires(['startValue', 'endValue'], config);
	var tempStart = pytColorConverter(config.startValue);
	var tempEnd = pytColorConverter(config.endValue);
	this.rStart = tempStart[0];
	this.gStart = tempStart[1];
	this.bStart = tempStart[2];
	this.rEnd = tempEnd[0];
	this.gEnd = tempEnd[1];
	this.bEnd = tempEnd[2];
}

pytConfig.prototype.processDelta = function(a, b, delta) {
	if (a < b) {
		return a + (delta * Math.abs(a - b));
	} else {
		return a - (delta * Math.abs(a - b));
	}
}

pytConfig.prototype.processGenericStyle = function (delta) {
	var valueString = '' +
					  this.processDelta(this.startValue, this.endValue, delta)) +
					  this.units;

	return valueString;
}

pytConfig.prototype.processTransformStyle = function (delta) {
	var valueString = this.property + '(' +
					  this.processDelta(this.startValue, this.endValue, delta) +
					  this.units +
					  ')';

	return valueString;
}

pytConfig.prototype.processColorStyle = function (delta) {
	var valueString = 'rgb(' +
					  this.processDelta(this.rStart, this.rEnd, delta) +
					  ', ' +
					  this.processDelta(this.gStart, this.gEnd, delta) +
					  ', ' +
					  this.processDelta(this.bStart, this.bEnd, delta) +
					  ')';

	return valueString;
}

modules.exports = pytConfig;