Starter build system template for [HTML5Boilerplate][1] and [Bootstrap 3][2].  Build system built with [Grunt][3] and [Bower][4].

###Install

1.  clone repo
2.  `npm install`
3.  `bower install`
4.  customize site with the following source files:
    - `src/html/partials/*.html`
    - `src/styles/less/main.less` (start after the @import 'bootstrap.less' line near end)
    - `src/styles/less/theme.less` (optional, not currently used)
    - `src/scripts/plugins.js` (optional, not currently used)
    - `src/scripts/main.js`

5.  build unminified test version:
    `grunt test`
    `grunt connect:test`

6.  build minified production version:
    `grunt dist`
    `grunt connect:dist`

7.  build minified and gziped production version:
    `grunt gzip`
    `grunt connect:dist`

8.  update H5BP, Bootstrap, JQuery:
    1. `bower list` (show all bower components)
    2. `bower update X` (update a specific component)
    3. `bower update` (update all components)
    4. build system takes care of the rest, automatically copies bootstrap, h5bp, and jquery into build/test/dist targets

[1]:http://html5boilerplate.com/
[2]:http://getbootstrap.com/
[3]:http://gruntjs.com/
[4]:http://bower.io/
