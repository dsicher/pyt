import pytUtils from './pytUtils';

export default class pytCallbackNode {
  constructor(config) {
    pytUtils.requiredParameters('pytCallbackNode', ['el'], config);

    this.el = config.el;
    this.callback = typeof config.callback === 'function' ? config.callback : false;
    this.reset = typeof config.reset === 'function' ? config.reset : false;
    this.startingPerc = config.startingPerc !== undefined ? config.startingPerc : 1;
    this.endingPerc = config.endingPerc !== undefined ? config.endingPerc : 0;

    this.pytState = '';

    window.addEventListener('pyt-throttled-scroll', this.handleScroll);
    window.addEventListener('pyt-throttled-resize', this.handleResize);

    this.updateCallbackPoints();
    this.handleScroll();
  }

  handleResize = () => {
    this.updateCallbackPoints();
    this.handleScroll();
  }

  updateCallbackPoints = () => {
    this.cbStart = window.innerHeight * this.startingPerc;
    this.cbEnd = window.innerHeight * this.endingPerc;
  };

  handleScroll = () => {
    var elPosition = this.el.getBoundingClientRect();
    var targetStart = this.startWithBottom ? elPosition.bottom : elPosition.top;
    var targetEnd = this.endWithTop ? elPosition.top : elPosition.bottom;

    if (targetStart < this.cbStart && targetEnd > this.cbEnd) {
      if (this.callback && this.pytState !== 'pyt') {
        this.callback();
        this.pytState = 'pyt';
      }
    } else if (this.reset && this.pytState !== 'prepyt') {
      this.reset();
      this.pytState = 'prepyt';
    }
  }
}
