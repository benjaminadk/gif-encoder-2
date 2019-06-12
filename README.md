👷🏿‍♂️ Full Documentation & Examples coming soon...

# gif-encoder-2

Create GIFs with Node.js

## Installation

```
npm install gif-encoder-2
```

## Overview

Builds on top of previous JavaScript GIF encoders including [`jsgif`](https://github.com/antimatter15/jsgif) and [`gifencoder`](https://github.com/eugeneware/gifencoder). This version adds the [Octree](https://en.wikipedia.org/wiki/Octree) quantization algorithm as an alternative to the original NeuQuant. Generally, using the Octree algorithm will take slightly longer to process a GIF than the NeuQuant algorithm. However, the file size of the resultant GIF will be considerably smaller using Octree. The Octree algorithm also tends to create a color banding effect. This lends itself more to illustrations than photographic images, but every set of images different and will produce different results. This version also adds a simple optimizer that can speed up overall processing time of both algorithms. There is also a progress event emitted that can be used when the total number of frames is known at instanciation.

## Usage

This library is designed to be used in a Node.js environment, which includes the Electron renderer process. [`node-canvas`](https://github.com/Automattic/node-canvas) can be a help peer library and of course, the conventional `HTML Canvas` can be used in the Electron environment.

## Constructor

`GIFEncoder(width, height, algorithm, useOptimizer, totalFrames)`

|   Parameter    |  Type   |          Description           | Required |  Default   |
| :------------: | :-----: | :----------------------------: | :------: | :--------: |
|    `width`     | number  | the width of images in pixels  |   yes    |    n/a     |
|    `height`    | number  | the height of images in pixels |   yes    |    n/a     |
|  `algorithm`   | string  |     `neuquant` or `octree`     |    no    | `neuquant` |
| `useOptimizer` | boolean |   enables/disables optimizer   |    no    |   false    |
| `totalFrames`  | number  |     total number of images     |    no    |     0      |

### Example

```javascript
const encoder = new GIFEncoder(720, 480, 'neuquant', true, 20)
```

## Methods

|        Method        |  Parameter   |               Description               |                           Notes                            |
| :------------------: | :----------: | :-------------------------------------: | :--------------------------------------------------------: |
|       `start`        |     n/a      |           Starts the encoder            |                            n/a                             |
|      `setDelay`      |    number    | Number of milliseconds to display frame |                Can be set once or per frame                |
| `setFramesPerSecond` |    number    | Number of frames per second to display  |                  Another way to set delay                  |
|     `setQuality`     | number 1-30  |            Neuquant quality             |                     1 is best/slowest                      |
|    `setThreshold`    | number 0-100 |     Optimizer threshold percentage      | Color table reused if current frame matches previous frame |
|     `setRepeat`      | number >= 0  |        Number of loops GIF does         |   0 is forever, anything else if literal number of loops   |

## Progress Event

Works great if `totalFrames` is expressed in constructor, otherwise this value will be 0.

### Example

```javascript
encoder.on('progress', percent => {
  // do something with percent value
})
```

## Full Example

### Beginner

Create a GIF from four canvas rectangles

```javascript
```

### Intermediate

Create a GIF from a directory of image files

### Advanced

Compare the algorithms NeuQuant to Octree
