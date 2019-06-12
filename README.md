# gif-encoder-2

Create GIFs with Node.js

## Installation

```
npm install gif-encoder-2
```

## Overview

👷🏿‍♂️ Documentation & Examples coming soon...

Builds on top of previous JavaScript GIF encoders including [`jsgif`](https://github.com/antimatter15/jsgif) and [`gifencoder`](https://github.com/eugeneware/gifencoder). This version adds the [Octree](https://en.wikipedia.org/wiki/Octree) quantization algorithm as an alternative to the original NeuQuant. Generally, using the Octree algorithm will take slightly longer to process a GIF than the NeuQuant algorithm. However, the file size of the resultant GIF will be considerably smaller using Octree. The Octree algorithm also tends to create a color banding effect. This lends itself more to illustrations than photographic images, but every set of images different and will produce different results. This version also adds a simple optimizer that can speed up overall processing time of both algorithms.

## Usage

This library is designed to be used in a Node.js environment, which includes the Electron renderer process. [`node-canvas`](https://github.com/Automattic/node-canvas) can be a help peer library and of course, the conventional `HTML Canvas` can be used in the Electron environment.
