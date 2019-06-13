👷🏿‍♂️ Full Documentation & Examples coming soon...

# gif-encoder-2

Create GIFs with Node.js

## Contents

- [Installation](#installation)
- [Overview](#overview)

## Installation

```
npm install gif-encoder-2
```

## Overview

Builds on top of previous JavaScript GIF encoders including [`jsgif`](https://github.com/antimatter15/jsgif) and [`gifencoder`](https://github.com/eugeneware/gifencoder). This version adds the [Octree](https://en.wikipedia.org/wiki/Octree) quantization algorithm as an alternative to the original NeuQuant. Generally, using the Octree algorithm will take slightly longer to process a GIF than the NeuQuant algorithm. The Octree algorithm also tends to create a color banding effect. This lends itself more to illustrations than photographic images, but every set of images different and will produce different results. This version also adds a simple optimizer that can speed up overall processing time of both algorithms. There is also a progress event emitted that can be used when the total number of frames is known at instanciation.

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

## Usage Examples

### Beginner

Create a GIF from four canvas rectangles

```javascript
const { createCanvas } = require('canvas')
const { writeFile } = require('fs')
const path = require('path')
const GIFEncoder = require('..')

const size = 400
const half = 200

const canvas = createCanvas(size, size)
const ctx = canvas.getContext('2d')

function drawBackground() {
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
}

const encoder = new GIFEncoder(size, size)
encoder.setDelay(500)
encoder.start()

drawBackground()
ctx.fillStyle = '#ff0000'
ctx.fillRect(0, 0, half, half)
encoder.addFrame(ctx)

drawBackground()
ctx.fillStyle = '#00ff00'
ctx.fillRect(half, 0, half, half)
encoder.addFrame(ctx)

drawBackground()
ctx.fillStyle = '#0000ff'
ctx.fillRect(half, half, half, half)
encoder.addFrame(ctx)

drawBackground()
ctx.fillStyle = '#ffff00'
ctx.fillRect(0, half, half, half)
encoder.addFrame(ctx)

encoder.finish()

const buffer = encoder.out.getData()

writeFile(path.join(__dirname, 'output', 'beginner.gif'), buffer, error => {
  // gif drawn or error
})
```

<p align="center">
<img src="https://benjaminadk.s3-us-west-1.amazonaws.com/beginner.gif" />
</p>

### Intermediate

Create two GIFs from a directory of image files. One GIF for each algorithm. The PNG files have been compressed to keep package size reasonable so the quality is not that great.

```javascript
const { createCanvas, Image } = require('canvas')
const { createWriteStream, readdir } = require('fs')
const { promisify } = require('util')
const path = require('path')
const GIFEncoder = require('..')

const readdirAsync = promisify(readdir)
const imagesFolder = path.join(__dirname, 'input')

async function createGif(algorithm) {
  return new Promise(async resolve1 => {
    // read image directory
    const files = await readdirAsync(imagesFolder)

    // find the width and height of the image
    const [width, height] = await new Promise(resolve2 => {
      const image = new Image()
      image.onload = () => resolve2([image.width, image.height])
      image.src = path.join(imagesFolder, files[0])
    })

    // base GIF filepath on which algorithm is being used
    const dstPath = path.join(__dirname, 'output', `intermediate-${algorithm}.gif`)
    // create a write stream for GIF data
    const writeStream = createWriteStream(dstPath)
    // when stream closes GIF is created so resolve promise
    writeStream.on('close', () => {
      resolve1()
    })

    const encoder = new GIFEncoder(width, height, algorithm)
    // pipe encoder's read stream to our write stream
    encoder.createReadStream().pipe(writeStream)
    encoder.start()
    encoder.setDelay(200)

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // draw an image for each file and add frame to encoder
    for (const file of files) {
      await new Promise(resolve3 => {
        const image = new Image()
        image.onload = () => {
          ctx.drawImage(image, 0, 0)
          encoder.addFrame(ctx)
          resolve3()
        }
        image.src = path.join(imagesFolder, file)
      })
    }
  })
}

createGif('neuquant')
createGif('octree')
```

### Advanced

Compare the processing time and file size of the NeuQuant and Octree algorithms.

## Progress Event

Works great if `totalFrames` is expressed in constructor, otherwise this value will be 0.

```javascript
encoder.on('progress', percent => {
  // do something with percent value
})
```
