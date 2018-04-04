import pytColorConverter from './pytColorConverter';

export default class pytProperty {
  constructor(config) {
    this.config = config;
    this.pytClass = config.pytClass || 'animate';
    this.viewportStart = config.viewportStart !== undefined ? config.viewportStart : 1;
    this.viewportEnd = config.viewportEnd !== undefined ? config.viewportEnd : 0;
    this.startWithBottom = config.startWithBottom || false;
    this.endWithTop = config.endWithTop || false;
    this.isTransform = false;
    if (!pytProperty.prototype.hasOwnProperty(this.config.property)) {
      throw(`${this.config.property} is not a valid pytProperty parameter`);
    } else {
      this[this.config.property]();
    }
  }
  requires(requiredArray) {
    for (var i = 0, x = requiredArray.length ; i < x ; i++) {
      if(!this.config.hasOwnProperty(requiredArray[i])) {
        throw(`error in pyt.pushConfig: ${requiredArray[i]} is a required parameter of ${this.config.property}`);
      }
    }
  }
  processDelta(a, b, delta) {
    return a < b ? a + (delta * Math.abs(a - b)) : a - (delta * Math.abs(a - b));
  }
  processGenericStyle(delta) {
    return `${this.processDelta(this.startValue, this.endValue, delta)}${this.units}`;
  }
  processTransformStyle(delta) {
    return `${this.property}(${this.processDelta(this.startValue, this.endValue, delta)}${this.units})`;
  }
  processColorStyle(delta) {
    return `rgb(${Math.floor(this.processDelta(this.startValue[0], this.endValue[0], delta))}, ${Math.floor(this.processDelta(this.startValue[1], this.endValue[1], delta))}, ${Math.floor(this.processDelta(this.startValue[2], this.endValue[2], delta))})`;
  }
  initDefaultValues(defaultStart, defaultEnd, defaultUnits) {
    this.startValue = this.config.startValue || defaultStart;
    this.endValue = this.config.endValue || defaultEnd;
    this.units = this.config.units || defaultUnits;
  }
  initTransformProperty(defaultStart, defaultEnd, defaultUnits) {
    this.initDefaultValues(defaultStart, defaultEnd, defaultUnits);
    this.isTransform = true;
    this.returnCurrentStyle = this.processTransformStyle;
  }
  initGenericProperty(defaultStart, defaultEnd, defaultUnits) {
    this.initDefaultValues(defaultStart, defaultEnd, defaultUnits);
    this.returnCurrentStyle = this.processGenericStyle;
  }
  initColorProperty() {
    this.requires(['startValue', 'endValue']);
    var startArray = pytColorConverter(this.config.startValue);
    var endArray = pytColorConverter(this.config.endValue);
    this.startValue = startArray;
    this.endValue = endArray;
    this.returnCurrentStyle = this.processColorStyle;
  }
  backgroundColor() {
    this.property = 'backgroundColor';
    this.initColorProperty();
  }
  borderColor() {
    this.property = 'borderColor';
    this.initColorProperty();
  }
  borderTopColor() {
    this.property = 'borderTopColor';
    this.initColorProperty();
  }
  borderRightColor() {
    this.property = 'borderRightColor';
    this.initColorProperty();
  }
  borderBottomColor() {
    this.property = 'borderBottomColor';
    this.initColorProperty();
  }
  borderLeftColor() {
    this.property = 'borderLeftColor';
    this.initColorProperty();
  }
  borderWidth() {
    this.property = 'borderWidth';
    this.initGenericProperty(0, 3, 'px');
  }
  borderTopWidth() {
    this.property = 'borderTopWidth';
    this.initGenericProperty(0, 3, 'px');
  }
  borderRightWidth() {
    this.property = 'borderRightWidth';
    this.initGenericProperty(0, 3, 'px');
  }
  borderBottomWidth() {
    this.property = 'borderBottomWidth';
    this.initGenericProperty(0, 3, 'px');
  }
  borderLeftWidth() {
    this.property = 'borderLeftWidth';
    this.initGenericProperty(0, 3, 'px');
  }
  borderRadius() {
    this.property = 'borderRadius';
    this.initGenericProperty(0, 10, 'px');
  }
  borderBottomLeftRadius() {
    this.property = 'borderBottomLeftRadius';
    this.initGenericProperty(0, 10, 'px');
  }
  borderBottomRightRadius() {
    this.property = 'borderBottomRightRadius';
    this.initGenericProperty(0, 10, 'px');
  }
  borderTopLeftRadius() {
    this.property = 'borderTopLeftRadius';
    this.initGenericProperty(0, 10, 'px');
  }
  borderTopRightRadius() {
    this.property = 'borderTopRightRadius';
    this.initGenericProperty(0, 10, 'px');
  }
  bottom() {
    this.property = 'bottom';
    this.initGenericProperty(-100, 0, 'px');
  }
  top() {
    this.property = 'top';
    this.initGenericProperty(-100, 0, 'px');
  }
  right() {
    this.property = 'right';
    this.initGenericProperty(-100, 0, 'px');
  }
  left() {
    this.property = 'left';
    this.initGenericProperty(-100, 0, 'px');
  }
  height() {
    this.property = 'height';
    this.initGenericProperty(0, 100, '%');
  }
  maxHeight() {
    this.property = 'maxHeight';
    this.initGenericProperty(0, 100, '%');
  }
  minHeight() {
    this.property = 'minHeight';
    this.initGenericProperty(0, 100, '%');
  }
  width() {
    this.property = 'width';
    this.initGenericProperty(0, 100, '%');
  }
  maxWidth() {
    this.property = 'maxWidth';
    this.initGenericProperty(0, 100, '%');
  }
  minWidth() {
    this.property = 'minWidth';
    this.initGenericProperty(0, 100, '%');
  }
  color() {
    this.property = 'color';
    this.initColorProperty();
  }
  fontSize() {
    this.property = 'fontSize';
    this.initGenericProperty(12, 16, 'px');
  }
  letterSpacing() {
    this.property = 'letterSpacing';
    this.initGenericProperty(0, 5, 'px');
  }
  lineHeight() {
    this.property = 'lineHeight';
    this.initGenericProperty(1, 1.2, 'px');
  }
  margin() {
    this.property = 'margin';
    this.initGenericProperty(0, 10, 'px');
  }
  marginTop() {
    this.property = 'marginTop';
    this.initGenericProperty(-100, 0, 'px');
  }
  marginRight() {
    this.property = 'marginRight';
    this.initGenericProperty(-100, 0, 'px');
  }
  marginBottom() {
    this.property = 'marginBottom';
    this.initGenericProperty(-100, 0, 'px');
  }
  marginLeft() {
    this.property = 'marginLeft';
    this.initGenericProperty(-100, 0, 'px');
  }
  padding() {
    this.property = 'padding';
    this.initGenericProperty(0, 20, 'px');
  }
  paddingTop() {
    this.property = 'paddingTop';
    this.initGenericProperty(0, 20, 'px');
  }
  paddingRight() {
    this.property = 'paddingRight';
    this.initGenericProperty(0, 20, 'px');
  }
  paddingBottom() {
    this.property = 'paddingBottom';
    this.initGenericProperty(0, 20, 'px');
  }
  paddingLeft() {
    this.property = 'paddingLeft';
    this.initGenericProperty(0, 20, 'px');
  }
  opacity() {
    this.property = 'opacity';
    this.initGenericProperty(0, 1, '');
  }
  outlineColor() {
    this.property = 'outlineColor';
    this.initColorProperty();
  }
  outlineOffset() {
    this.property = 'outlineOffset';
    this.initGenericProperty(0, 3, 'px');
  }
  outlineWidth() {
    this.property = 'outlineWidth';
    this.initGenericProperty(0, 2, 'px');
  }
  textDecorationColor() {
    this.property = 'textDecorationColor';
    this.initColorProperty();
  }
  translateX() {
    this.property = 'translateX';
    this.initTransformProperty(-100, 0, 'px');
  }
  translateY() {
    this.property = 'translateY';
    this.initTransformProperty(-100, 0, 'px');
  }
  translateZ() {
    this.property = 'translateZ';
    this.initTransformProperty(-100, 0, 'px');
  }
  scale() {
    this.property = 'scale';
    this.initTransformProperty(.8, 1, '');
  }
  scaleX() {
    this.property = 'scaleX';
    this.initTransformProperty(.8, 1, '');
  }
  scaleY() {
    this.property = 'scaleY';
    this.initTransformProperty(.8, 1, '');
  }
  scaleZ() {
    this.property = 'scaleZ';
    this.initTransformProperty(.8, 1, '');
  }
  rotate() {
    this.property = 'rotate';
    this.initTransformProperty(-30, 0, 'deg');
  }
  skewX() {
    this.property = 'skewX';
    this.initTransformProperty(-100, 0, 'px');
  }
  skewY() {
    this.property = 'skewY';
    this.initTransformProperty(-100, 0, 'px');
  }
}

/* TODO:
  pytProperty.prototype.transformOrigin = function() {
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
