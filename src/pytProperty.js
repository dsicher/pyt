import pytColorConverter from './pytColorConverter';

export default class pytProperty {
  constructor(config) {
    this.startValue = config.startValue !== undefined ? config.startValue : false;
    this.endValue = config.endValue !== undefined ? config.endValue : false;
    this.units = config.units !== undefined ? config.units : false;
    this.pytClass = config.class !== undefined ? config.class : 'animate';
    this.startingPerc = config.startingPerc !== undefined ? config.startingPerc : 1;
    this.endingPerc = config.endingPerc !== undefined ? config.endingPerc : 0;
    this.startWithBottom = !!config.startWithBottom;
    this.endWithTop = !!config.endWithTop;
    this.callback = typeof config.callback === 'function' ? config.callback : false;
    this.preFn = typeof config.preFn === 'function' ? config.preFn : false;
    this.postFn = typeof config.postFn === 'function' ? config.postFn : false;

    this.isTransform = false;
    this.updateParallaxPoints();


    if (!pytProperty.prototype.hasOwnProperty(config.property)) {
      throw(`${config.property} is not a valid pytProperty parameter`);
    } else {
      this.property = config.property;
      this[this.property]();
    }
  }
  updateParallaxPoints() {
    this.parallaxStart = window.innerHeight * this.startingPerc;
    this.parallaxEnd = window.innerHeight * this.endingPerc;
  }
  requires(requiredArray) {
    for (var i = 0, x = requiredArray.length ; i < x ; i++) {
      if(this[requiredArray[i]] === false) {
        throw(`error in pyt.pushConfig: ${requiredArray[i]} is a required parameter of ${this.property}`);
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
    this.startValue = this.startValue !== false ? this.startValue : defaultStart;
    this.endValue = this.endValue !== false ? this.endValue : defaultEnd;
    this.units = this.units !== false ? this.units : defaultUnits;
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
    var startArray = pytColorConverter(this.startValue);
    var endArray = pytColorConverter(this.endValue);
    this.startValue = startArray;
    this.endValue = endArray;
    this.returnCurrentStyle = this.processColorStyle;
  }
  backgroundColor() {
    this.initColorProperty();
  }
  borderColor() {
    this.initColorProperty();
  }
  borderTopColor() {
    this.initColorProperty();
  }
  borderRightColor() {
    this.initColorProperty();
  }
  borderBottomColor() {
    this.initColorProperty();
  }
  borderLeftColor() {
    this.initColorProperty();
  }
  borderWidth() {
    this.initGenericProperty(0, 3, 'px');
  }
  borderTopWidth() {
    this.initGenericProperty(0, 3, 'px');
  }
  borderRightWidth() {
    this.initGenericProperty(0, 3, 'px');
  }
  borderBottomWidth() {
    this.initGenericProperty(0, 3, 'px');
  }
  borderLeftWidth() {
    this.initGenericProperty(0, 3, 'px');
  }
  borderRadius() {
    this.initGenericProperty(0, 10, 'px');
  }
  borderBottomLeftRadius() {
    this.initGenericProperty(0, 10, 'px');
  }
  borderBottomRightRadius() {
    this.initGenericProperty(0, 10, 'px');
  }
  borderTopLeftRadius() {
    this.initGenericProperty(0, 10, 'px');
  }
  borderTopRightRadius() {
    this.initGenericProperty(0, 10, 'px');
  }
  bottom() {
    this.initGenericProperty(-100, 0, 'px');
  }
  top() {
    this.initGenericProperty(-100, 0, 'px');
  }
  right() {
    this.initGenericProperty(-100, 0, 'px');
  }
  left() {
    this.initGenericProperty(-100, 0, 'px');
  }
  height() {
    this.initGenericProperty(0, 100, '%');
  }
  maxHeight() {
    this.initGenericProperty(0, 100, '%');
  }
  minHeight() {
    this.initGenericProperty(0, 100, '%');
  }
  width() {
    this.initGenericProperty(0, 100, '%');
  }
  maxWidth() {
    this.initGenericProperty(0, 100, '%');
  }
  minWidth() {
    this.initGenericProperty(0, 100, '%');
  }
  color() {
    this.initColorProperty();
  }
  fontSize() {
    this.initGenericProperty(12, 16, 'px');
  }
  letterSpacing() {
    this.initGenericProperty(0, 5, 'px');
  }
  lineHeight() {
    this.initGenericProperty(1, 1.2, 'px');
  }
  margin() {
    this.initGenericProperty(0, 10, 'px');
  }
  marginTop() {
    this.initGenericProperty(-100, 0, 'px');
  }
  marginRight() {
    this.initGenericProperty(-100, 0, 'px');
  }
  marginBottom() {
    this.initGenericProperty(-100, 0, 'px');
  }
  marginLeft() {
    this.initGenericProperty(-100, 0, 'px');
  }
  padding() {
    this.initGenericProperty(0, 20, 'px');
  }
  paddingTop() {
    this.initGenericProperty(0, 20, 'px');
  }
  paddingRight() {
    this.initGenericProperty(0, 20, 'px');
  }
  paddingBottom() {
    this.initGenericProperty(0, 20, 'px');
  }
  paddingLeft() {
    this.initGenericProperty(0, 20, 'px');
  }
  opacity() {
    this.initGenericProperty(0, 1, '');
  }
  outlineColor() {
    this.initColorProperty();
  }
  outlineOffset() {
    this.initGenericProperty(0, 3, 'px');
  }
  outlineWidth() {
    this.initGenericProperty(0, 2, 'px');
  }
  textDecorationColor() {
    this.initColorProperty();
  }
  translateX() {
    this.initTransformProperty(-100, 0, 'px');
  }
  translateY() {
    this.initTransformProperty(-100, 0, 'px');
  }
  translateZ() {
    this.initTransformProperty(-100, 0, 'px');
  }
  scale() {
    this.initTransformProperty(.8, 1, '');
  }
  scaleX() {
    this.initTransformProperty(.8, 1, '');
  }
  scaleY() {
    this.initTransformProperty(.8, 1, '');
  }
  scaleZ() {
    this.initTransformProperty(.8, 1, '');
  }
  rotate() {
    this.initTransformProperty(-30, 0, 'deg');
  }
  skewX() {
    this.initTransformProperty(-100, 0, 'px');
  }
  skewY() {
    this.initTransformProperty(-100, 0, 'px');
  }
}

/* TODO:
  pytProperty.prototype.transformOrigin = function() {
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
