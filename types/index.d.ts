/// <reference types="node" />

interface ByteArray {
  /**
   * Get the data as a Node.js `Buffer`.
   */
  getData(): Buffer
}

interface ImageDataLike {
  readonly data: Uint8ClampedArray
}

interface CanvasLike {
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageDataLike
}

declare class GIFEncoder {
  /**
   * Create a new GIFEncoder
   * @param width the width of the images in pixels.
   * @param height the height of images in pixels.
   * @param algorithm `neuquant` or `octree`. `neuquant` if undefined.
   * @param useOptimizer enables/disables optimizer. `false` if undefined.
   * @param totalFrames total number of images. `0` if undefined.
   */
  constructor(width: number, 
    height: number, 
    algorithm?: "neuquant" | "octree", 
    useOptimizer?: boolean, 
    totalFrames?: number)
  
  /**
   * Starts the encoder.
   */
  start(): void

  /**
   * Adds a frame to the GIF.
   * @param context Node-canvas or DOM canvas context.
   */
  addFrame(context: CanvasLike): void

  /**
   * Sets delay between frames. Can be set once per frame.
   * @param delay Number of milliseconds to display frame
   */
  setDelay(delay: number): void

  /**
   * Sets gif framerate. Alternative to `setDelay`.
   * @param fps Number of frames per second to display.
   */
  setFrameRate(fps: number): void

  /**
   * Neuquant quality.
   * @param quality Neuquant quality. `1` to `30`. `1` is best/slowest.
   */
  setQuality(quality: number): void

  /**
   * Optimizer threshold percentage
   * @param threshold Optimizer threshold percentage, `0` to `100`.
   */
  setThreshold(threshold: number): void

  /**
   * Number of loops GIF does
   * @param repeat 0 is forever, anything else is literal number of loops
   */
  setRepeat(repeat: number): void

  /**
   * Stops the encoder. Call after all frames are added.
   */
  finish(): void

  /**
   * The raw bytes representing the resulting GIF.
   */
  out: ByteArray
}
export = GIFEncoder
