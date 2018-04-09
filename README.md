                    __
                   /\ \__
     _____   __  __\ \ ,_\
    /\ '__`\/\ \/\ \\ \ \/
    \ \ \L\ \ \ \_\ \\ \ \_
     \ \ ,__/\/`____ \\ \__\
      \ \ \/  `/___/> \\/__/
       \ \_\     /\___/
        \/_/     \/__/

# PARALLAX YOUR THINGS

Fast, dependency-free, flexible parallax

Use scroll position to create smooth animations, trigger CSS classes, or trigger function calls.
\
Most CSS properties implemented for smooth parallax, more documentation coming soon.

## Installation

    $ npm install pyt

## Usage

Import PYT.

```import pyt from 'pyt';```

PYT needs to be instantiated via class constructor.

```var PYT = new pyt();```

Add responsive behavior to your PYT instance by passing it a breakpoint configuration.

```
var PYT = new pyt({
  breakpoints: {
    mobile: 768,
    tablet: 1024
  }  
});
```

PYT has methods to create three types of scroll-controlled nodes:

```PYT.addNode(), PYT.addTriggerNode(), and PYT.addCallbackNode()```

If the PYT instance has a breakpoint configuration, you can add a `breakpoints` property to the node configuration object. Set a breakpoint to `true` in the configuration object to enable the scroll effect at that breakpoint. For example, the following config will only add and remove `my-class` from the target element at the web breakpoint.

```
ex. PYT.addTriggerNode({
  el: document.getElementById('myElement'),
  class: 'my-class',
  breakpoints: {
    web: true
  }
})
```

## .addNode()

`.addNode()` creates a parallax node that responds in real-time to the user's scroll position. Nodes created with `.addNode()` will also have classes attached to represent the node's state. (by default `pre-pyt-animate`, `pyt-animate`, and `post-pyt-animate`).

```
PYT.addNode({
  el: document.getElementById('myElement'),
  parallaxConfig: {
    property: 'backgroundColor',
    startValue: 'rgb(255, 255, 255)',
    endValue: '#000'
  }
});
```

#### .addNode() config options

>**el:** // REQUIRED
>\
>The dom node to monitor for scroll position
>\
>\
>**parallaxConfig:** // REQUIRED, either an ARRAY or single OBJECT
>\
>The pyt config object that describes the style transformations
>\
>\
>**parallaxTarget:** // OPTIONAL, defaults to the value for **el**
>\
>The dom node to target with style and class updates, if different than **el**
>\
>\
>**classTargets:** // OPTIONAL
>\
>An array of DOM nodes that will also receive the class updates from this node
>\
>\
>**breakpoints:** // OPTIONAL, only can be used if the pyt instance is configured for breakpoints
>\
>An object describing at which breakpoints to apply the scroll-controlled effect

#### .addNode() parallaxConfig

`.addNode()` requires a parallax configuration object to control the effect on DOM nodes. Each configuration object represents a CSS property that will be animated. By default, the animation begins when the top of the targeted element is at the bottom of the viewport and completes when the bottom of the targeted element is at the top of the viewport. If the CSS property is animating color, you must provide a `startValue` and `endValue` either as hex, rgb, or named CSS color. All other properties fall back to default values.

#### parallaxConfig properties

>**property:** // REQUIRED
>\
>The css property to animate, camelcase
>\
>\
>**startValue:** // OPTIONAL, REQUIRED ONLY FOR COLORS, default varies
>\
>The starting value for the animation
>\
>\
>**endValue:** // OPTIONAL, REQUIRED FOR COLORS, default varies
>\
>The ending value for the animation
>\
>\
>**units:** // OPTIONAL, default varies
>\
>The desired unit (ex. 'px', '%'), ignored for colors
>\
>\
>**startingPerc:** // OPTIONAL, default 1
>\
>The starting position of the animation in the viewport, as a percent from 0-1 (smaller or larger values may work, representing space outside of the viewport)
>\
>\
>**endingPerc:** // OPTIONAL, default 0
>\
>The ending position of the animation in the viewport, as a percent from 0-1 (smaller or larger values may work, representing space outside of the viewport)
>\
>\
>**class:** // OPTIONAL, default animate
>\
>The class suffix to add to the target element and any classTargets (if class: 'foo', the classes will be 'pre-pyt-foo', 'pyt-foo', and 'post-pyt-foo')
>\
>\
>**startWithBottom:** // OPTIONAL, EXPERIMENTAL, default FALSE
>\
>Measure the starting point for the animation from the bottom of the target el rather than the top
>\
>\
>**endWithTop:** // OPTIONAL, EXPERIMENTAL, default FALSE
>\
>Measure the ending point for the animation from the top of the target el rather than the bottom
>\
>\
>**callback:** // OPTIONAL, EXPERIMENTAL
>\
>A function to execute when entering the transitioning state
>\
>\
>**preFn:** // OPTIONAL, EXPERIMENTAL
>\
>A function to execute when entering the pre-transition state
>\
>\
>**postFn:** // OPTIONAL, EXPERIMENTAL
>\
>A function to execute when entering the post-transition state


## .addTriggerNode()

`.addTriggerNode()` creates a simple node that receives a CSS class when it is within the threshold range.

```
PYT.addTriggerNode({
  el: document.getElementById('myElement'),
  class: 'my-class'
});
```

#### .addTriggerNode() config options

>**el:** // REQUIRED
>\
>The dom node to monitor for scroll position
>\
>\
>**class:** // OPTIONAL, defaults to animate
>\
>The class to add when the el is in range
>\
>\
>**triggerPerc:** // OPTIONAL, defaults to .8
>\
>The viewport position where the class will be added, measured from the top of **el**, as a percent from 0-1 (smaller or larger values may work, representing space outside of the viewport)
>\
>\
>**animateOnce:** // OPTIONAL, defaults to FALSE
>\
>Whether the animation trigger should only occur once, permanently adding the class to the target
>\
>\
>**classTargets:** // OPTIONAL
>\
>An array of DOM nodes that will also receive the class updates from this node
>\
>\
>**callback:** // OPTIONAL, EXPERIMENTAL
>\
>A function to execute when adding the class to the dom node
>\
>\
>**reset:** // OPTIONAL, EXPERIMENTAL
>\
>A function to execute when removing the class to the dom node
>\
>\
>**breakpoints:** // OPTIONAL, only can be used if the pyt instance is configured for breakpoints
>\
>An object describing at which breakpoints to apply the scroll-controlled effect

## .addCallbackNode()

`.addCallbackNode()` creates a node that will trigger JS functions based on scroll position.

```
PYT.addCallbackNode({
  el: document.getElementById('myElement'),
  callback: () => console.log('I\'m on screen!'),
  reset: () => console.log('I\'m off screen!')
});
```

#### .addCallbackNode() config options

>**el:** // REQUIRED
>\
>The dom node to monitor for scroll position
>\
>\
>**startingPerc:** // OPTIONAL, default 1
>\
>The trigger position in the viewport, as a percent from 0-1 (smaller or larger values may work, representing space outside of the viewport)
>\
>\
>**endingPerc:** // OPTIONAL, default 0
>\
>The trigger position in the viewport, as a percent from 0-1 (smaller or larger values may work, representing space outside of the viewport)
>\
>\
>**startWithBottom:** // OPTIONAL, EXPERIMENTAL, default FALSE
>\
>Measure the starting point from the bottom of the target el rather than the top
>\
>\
>**endWithTop:** // OPTIONAL, EXPERIMENTAL, default FALSE
>\
>Measure the ending point from the top of the target el rather than the bottom
>\
>\
>**callback:** // OPTIONAL
>\
>A function to execute when the node enters the threshold
>\
>\
>**reset:** // OPTIONAL
>\
>A function to execute when the node leaves the threshold
>\
>\
>**breakpoints:** // OPTIONAL, only can be used if the pyt instance is configured for breakpoints
>\
>An object describing at which breakpoints to apply the scroll-controlled effect

## Examples
```
var PYT = new pyt({
  breakpoints: {
    mobile: 768, // mobile breakpoint is up to 767px
    tablet: 1024 // tablet breakpoint is up to 1023px, web is everything above
  }
});

PYT.addNode({
  el: document.getElementById('myElement'),
  breakpoints: { // only add the parallax styles at the web breakpoint
    web: true
  },
  parallaxConfig: [
    {
      property: 'translateY',
      startValue: 0,
      endValue: 200,
      startingPerc: 1,
      endingPerc: 0,
      units: 'px'
    },
    {
      property: 'opacity',
      startValue: 0,
      endValue: 1,
      startingPerc: .8,
      endingPerc: .5,
      units: ''
    }
  ]
});

PYT.addNode({
  el: document.getElementById('myOtherElement'),
  parallaxConfig: [
    {
      property: 'translateZ',
      startValue: 0,
      endValue: -200,
      startingPerc: .5,
      endingPerc: 0,
      units: 'px'
    },
    {
      property: 'height',
      startValue: 600,
      endValue: 15,
      startingPerc: .5,
      endingPerc: 0,
      units: 'px'
    }
  ]
})

PYT.addTriggerNode({
  el: document.getElementById('myTriggerElement'),
  class: 'my-class',
  triggerPerc: .6,
  animateOnce: true
});

PYT.addCallbackNode({
  el: document.getElementById('myCallbackElement'),
  breakpoints: { // only trigger the callbackFn and resetFn calls at mobile and tablet breakpoints
    mobile: true,
    tablet: true
  },
  startingPerc: .8,
  endingPerc: .2,
  callback: callbackFn,
  reset: resetFn,
});
```
