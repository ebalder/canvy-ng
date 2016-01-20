# canvy
For training purposes: Angular module for interactive canvases

This is an AngularJS module for making interactive canvases like [this one](http://lexas.github.io/canvy/demo/test.html), where you can drag, create or delete "items" among lists on a mosaic layout.

## How To Use

It will need the following dependencies:
- jQuery
- AngularJS
- jQueryUI

Then include the build.js file (it's under the /build folder)

The Controller $scope should contain a 'data' property containing a specification. This spec can optionally have items saved from another session, but it should at least have the layout specification. Please refer to the [commented example](https://github.com/Lexas/canvy/blob/master/demo/data.json).
