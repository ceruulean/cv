---
title: "Zdog Scope"
date: 2021-04-17T19:33:00-05:00
draft: true
---

Create [Zdog](https://zzz.dog/) graphics with a 3D editor.

![WIP 2: organizing the property panel and displaying axes](/portfolio/zdog-scope/wip2.jpg)
_Figure 1: A sphere that shows the major axis._

## [Demo of Editor](https://ceruulean.github.io/zdog-scope/)

1. Press the "Demo" button on the top to load a sample model.

[GitHub Page](https://github.com/ceruulean/zdog-scope)

## Features
- Import/Export JSON
- Tree view w/ draggable sort
- Assign name and edit properties (double click)

### Controls
- Zoom: Mousewheel
- Panning: Shift + drag or MMB + drag
- Rotate: Click + drag
- Undo: Ctrl + Z
- Redo: Ctrl + Y or Ctrl + Shift + Z

### Generate code embed

1. In the left panel, click on "Embed Dream" under the tree view
2. Copy HTML output and paste into a document.
3. Have `<script src="https://unpkg.com/zdog@1/dist/zdog.dist.min.js"></script>`
within the `<head>` tag.

---------

## Rationale

To create complex animations with keyframes and timelines, a visual editor is needed first.

### Goals and Features

- Modeling and editing properties
- Generate keyframes and transformations
- Animation behavior tree
- Animation Previewer

Sorry, the UI is pretty ugly. I'm not a good designer.

## Application Structure

Because of the animation requirement, the JSON structure for importing and exporting is flat instead of nested. Thus, `Ztree` was made as an import/export abstraction. Hopefully it will become part of a larger "Zdog Rigger" system.

The Ztree object stores the nodes and relations as Map objects for lookup, while the relationMap stores a `<parentid, Set>`


## Editor UI

I picked [Vue 3](https://v3.vuejs.org/) for the data binding and modularization that makes it easy to manage complex components.

### WIP

![WIP 1: Displaying object properties and Tree View](/portfolio/zdog-scope/wip1.png)
_Figure 1: The first UI iteration displays the object data while organizing the tree view._

## Performance

Using [Desandro's Spooky House](https://codepen.io/desandro/pen/OJLYxEB) as a worst-case test scenario, the performance could be improved. It becomes sluggish, so graphics calculations should be performed in a compiled language such as Rust/WebAssembly.

## Credits

- [Split Grid](https://github.com/nathancahill/split/tree/master/packages/split-grid) Panels

### References

- [TouchSketch][1] Article proposing a UI widget for 3D graphics editing on touchscreens. I really like the idea but I never found the time to implement it.
- [Phoria.js](https://github.com/kevinroast/phoria.js/blob/master/scripts/phoria-view.js) - Canvas 3D renderer
- [Canvas Matrix Transforms](https://riptutorial.com/html5-canvas/example/19666/a-transformation-matrix-to-track-translated--rotated---scaled-shape-s-)
- [JavaScript 3D Rendering](https://www.sitepoint.com/building-3d-engine-javascript/)
- [Zdog SVG importer](https://github.com/sakamies/zdog-svg-importer)

[1]: <https://hal.archives-ouvertes.fr/hal-01222203/document> (widget proposal for touchscreen)


