                    __
                   /\ \__
     _____   __  __\ \ ,_\
    /\ '__`\/\ \/\ \\ \ \/
    \ \ \L\ \ \ \_\ \\ \ \_
     \ \ ,__/\/`____ \\ \__\
      \ \ \/  `/___/> \\/__/
       \ \_\     /\___/
        \/_/     \/__/

## PARALLAX YOUR THINGS

Fast, dependency-free, flexible parallax

Most CSS properties implemented, support for callback functions and CSS manipulation in progress.
Documentation coming soon.

## Installation

    $ npm install pyt

## Usage

    var scrllr = pyt.scrollController();

    new pyt({
        el: document.getElementById('myElement'),
        scrollcontroller: scrllr,
        parallaxConfig: {
            property: 'backgroundColor',
            startValue: 'rgb(255, 255, 255)',
            endValue: '#000'
        }
    })

    new pyt({
        el: document.getElementById('myElement2'),
        scrollcontroller: scrllr,
        parallaxConfig: [
            {
                property: 'translateY',
                startValue: 0,
                endValue: 200,
                viewportStart: .6,
                viewportEnd: .5,
                units: 'px'
            },
            {
                property: 'opacity',
                startValue: 0,
                endValue: 1,
                viewportStart: .6,
                viewportEnd: .5,
                units: ''
            }
        ]
    });

    new pyt({
        el: document.getElementById('myElement3'),
        scrollcontroller: scrllr,
        parallaxConfig: [
            {
                property: 'translateZ',
                startValue: 0,
                endValue: -200,
                viewportStart: .5,
                viewportEnd: 0,
                units: 'px'
            },
            {
                property: 'height',
                startValue: 600,
                endValue: 15,
                viewportStart: .5,
                viewportEnd: 0,
                units: 'px'
            }
        ]
    })