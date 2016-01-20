# canvy
For training purposes: Angular module for interactive canvases

This is an AngularJS module for making interactive canvases like [this one](http://lexas.github.io/canvy/demo/test.html), where you can drag, create or delete "items" among lists on a mosaic layout.

## How To Use

It will need the following dependencies:
- jQuery
- AngularJS
- jQueryUI

Then include the build.js file (it's under the /build folder)

The Controller $scope should contain a 'data' property containing a specification. This spec can optionally have items saved from another session, but it should at least have the layout specification:

```
{
	"unit": [0.2, 0.3333], // the proportional dimensions of each cell of the grid, where 1,1 is the entire canvas
	"panels": [ // an array of objects, each object is a panel/list
		{
			"name": "Problem", // a title for this list
			"upperLeft": [0, 0], // the coordinates upper left corner on the grid
			"area": [1, 2], // the width and height of the panel, in cells of the grid
			"items": [ // an array of items
				{
					"name": "Not enough bunnies"
				},
				{
					"name": "Bunnies are expensive"
				}
			]
		}
	]
}

```
