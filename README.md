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

Most CSS properties implemented, more documentation coming soon.

## Installation

    $ npm install pyt

## Usage

PYT needs to be instantiated via class constructor.

```var PYT = new pyt();```

PYT has methods to create two types of scroll-controlled nodes:

```PYT.addNode()` and `PYT.addTriggerNode()```

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
>the dom node to monitor for scroll position
>\
>\
>**parallaxConfig:** // REQUIRED, either an ARRAY or single OBJECT
>\
>the pyt config object that describes the style transformations
>\
>\
>**parallaxTarget:** // OPTIONAL, defaults to the value for **el**
>\
>the dom node to target with style and class updates, if different than **el**
>\
>\
>**classTargets:** // OPTIONAL
>\
>An array of DOM nodes that will also receive the class updates from this node

#### .addNode() parallaxConfig

`.addNode()` requires a parallax configuration object to control the effect on DOM nodes. Each configuration object represents a CSS property that will be animated. By default, the animation begins when the top of the targeted element is at the bottom of the viewport and completes when the bottom of the targeted element is at the top of the viewport. If the CSS property is animating color, you must provide a `startValue` and `endValue` either as hex, rgb, or named CSS color. All other properties fall back to default values.

#### parallaxConfig properties

>**property:** // REQUIRED
>\
>the css property to animated, camelcase
>\
>\
>**startValue:** // OPTIONAL, REQUIRED ONLY FOR COLORS, default varies
>\
>the starting value for the animation
>\
>\
>**endValue:** // OPTIONAL, REQUIRED FOR COLORS, default varies
>\
>the ending value for the animation
>\
>\
>**units:** // OPTIONAL, IGNORED FOR COLORS, default varies
>\
>the desired unit (ex. 'px', '%')
>\
>\
>**startingPerc:** // OPTIONAL, default 1
>\
>the starting position of the animation in the viewport, as a percent from 0-1
>\
>\
>**endingPerc:** // OPTIONAL, default 0
>\
>the ending position of the animation in the viewport, as a percent from 0-1
>\
>\
>**startsWithBottom:** // OPTIONAL, EXPERIMENTAL, default FALSE
>\
>measure the starting point for the animation from the bottom of the target el rather than the top, TRUE / FALSE
>\
>\
>**endWithTop:** // OPTIONAL, EXPERIMENTAL, default FALSE
>\
>measure the ending point for the animation from the top of the target el rather than the bottom, TRUE / FALSE
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
>the dom node to monitor for scroll position
>\
>\
>**class:** // REQUIRED
>\
>the class to add when the el is in range
>\
>\
>**triggerPerc:** // OPTIONAL, defaults to .8
>\
>the viewport position where the class will be added, measured from the top of **el**, as a percent from 0-1
>\
>\
>**animateOnce:** // OPTIONAL, defaults to FALSE
>\
>whether the animation trigger should only occur once, permanently adding the class to the target
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

## Examples
```
var PYT = new pyt();

PYT.addNode({
  el: document.getElementById('myElement'),
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
```
