import GIFEncoder = require("gif-encoder-2")
import * as Canvas from "canvas"

const canvas = Canvas.createCanvas(1, 1)
const context = canvas.getContext("2d")
const gif = new GIFEncoder(1, 1, "neuquant")
gif.start()
gif.setDelay(1)
gif.setFrameRate(30)
gif.setQuality(1)
gif.setRepeat(0)
gif.setThreshold(0)
gif.addFrame(context)
gif.finish()
const image = gif.out.getData()

const gif2 = new GIFEncoder(1, 1, "octree", true, 1)
const gif3 = new GIFEncoder(1, 1)
