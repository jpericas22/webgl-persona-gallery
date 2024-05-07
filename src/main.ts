import REGL from 'regl';
import fragment from './glsl/persona.frag.glsl'
import vertex from './glsl/persona.vert.glsl'

export interface Entry {
  title: string
  description: string
  imageUrl: string
}

export class WebGLGallery {
  private regl: REGL.Regl
  private target: HTMLElement
  private rows = 20
  private entries: Entry[]
  private resolution: [number, number] = [1, 1]
  private mouse: [number, number] = [0, 0]
  private mouseTarget: [number, number] = [0, 0]
  private fisheye = 0.0
  private fisheyeTarget = 0.0
  private maxFPS = 120
  private spriteSheet: REGL.Texture2D | null = null
  private textSpriteSheet: REGL.Texture2D | null = null
  private resizeObserver: ResizeObserver | null = null
  private tethaYOffset = 0.2
  private animateXOffset = 0.0
  private lerpFactor = 0.2
  private marginOffset = 0.4
  private shouldUpdateMouse = true
  private isMobile = false
  private isFirstMovement = true
  private sourceTextureRows = 1
  private sourceTextureCols = 1
  private seed = Math.random() * 10.0;

  constructor(target: HTMLElement, entries: Entry[]) {
    if (entries.length === 0) throw new Error('No entries provided')
    this.regl = REGL(target)
    this.target = target
    this.entries = entries
    this.resolution = [target.clientWidth, target.clientHeight]
    this.init()
  }

  private setupEventListeners() {
    this.target.style.touchAction = 'none'
    this.target.addEventListener('touchstart', () => {
      this.fisheyeTarget = 1.0
      this.isMobile = true
    }, { passive: true })
    this.target.addEventListener('touchmove', (event) => {
      this.fisheyeTarget = 1.0
      this.onMouseMove({ clientX: event.touches[0].clientX, clientY: event.touches[0].clientY })
    }, { passive: true })
    this.target.addEventListener('mousemove', this.onMouseMove)
    this.target.addEventListener('mouseleave', () => this.shouldUpdateMouse && (this.fisheyeTarget = 0.0))
    this.target.addEventListener('mouseenter', () => this.fisheyeTarget = 1.0)
    this.target.addEventListener('click', (event) => {
      this.shouldUpdateMouse = this.isMobile || !this.shouldUpdateMouse
      this.onMouseMove(event)
    })
  }

  private calculateMousePosition(event: { clientX: number; clientY: number; }) {
    const aspectRatio = this.resolution[0] / this.resolution[1]
    const division = 1.0 / this.rows
    const targetBounds = this.target.getBoundingClientRect()
    const x = event.clientX - targetBounds.left
    const y = event.clientY - targetBounds.top
    return [(x / this.resolution[0]) * aspectRatio, y / this.resolution[1]].map((value) => {
      return Math.floor(value * this.rows) * division + division * 0.5
    }) as [number, number]
  }

  private isMousePositionRange(event: { clientX: number; clientY: number; }, range: number) {
    const position = this.calculateMousePosition(event)
    const division = 1.0 / this.rows
    const rangeValues = this.mouse.map((value) => {
      return [value - division * range, value + division * range]
    })
    return rangeValues[0][0] <= position[0] && position[0] <= rangeValues[0][1] && rangeValues[1][0] <= position[1] && position[1] <= rangeValues[1][1]
  }


  private onMouseMove = (event: { clientX: number; clientY: number; type?: string }) => {
    if (this.isFirstMovement) {
      this.fisheyeTarget = 1.0
      this.shouldUpdateMouse = true
      this.isFirstMovement = false
    }
    if (!this.shouldUpdateMouse) return
    this.mouseTarget = this.calculateMousePosition(event)
    if (event.type === 'click' && this.isMobile) {
      if (this.fisheye > 0.96 && this.isMousePositionRange(event, 2.0)) this.fisheyeTarget = 0.0
    }
  }

  private onResize = (entries: ResizeObserverEntry[]) => {
    setTimeout(() => {
      const { width, height } = entries[0].contentRect
      this.resolution = [width, height]
      this.regl.poll()
    }, 10)
  }

  private lerp(start: number, end: number, factor: number): number {
    return start * (1 - factor) + end * factor;
  }

  private updateMousePosition(): void {
    this.mouse[0] = this.lerp(this.mouse[0], this.mouseTarget[0], this.lerpFactor);
    this.mouse[1] = this.lerp(this.mouse[1], this.mouseTarget[1], this.lerpFactor);
  }

  private updateFisheye(): void {
    this.fisheye = this.lerp(this.fisheye, this.fisheyeTarget, this.lerpFactor);
  }

  private init = async () => {
    const images = await Promise.all(this.entries.map((entry) => {
      const image = new Image()
      image.src = entry.imageUrl
      return new Promise<HTMLImageElement>((resolve) => image.onload = () => resolve(image))
    }))

    // get max texture size
    const maxTextureSize = this.regl.limits.maxTextureSize
    this.sourceTextureRows = Math.min(images.length, Math.floor(maxTextureSize / images[0].width))
    this.sourceTextureCols = Math.ceil(images.length / this.sourceTextureRows)
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = this.sourceTextureRows * images[0].width
    canvas.height = this.sourceTextureCols * images[0].height

    const textCanvas = document.createElement('canvas')
    const textCtx = textCanvas.getContext('2d')!
    textCanvas.width = canvas.width
    textCanvas.height = canvas.height

    textCtx.imageSmoothingEnabled = true
    textCtx.imageSmoothingQuality = 'high'
    textCtx.globalCompositeOperation = 'source-over'
    textCtx.fillStyle = '#222222'
    textCtx.fillRect(0, 0, textCanvas.width, textCanvas.height)
    textCtx.textAlign = 'center'
    textCtx.textBaseline = 'middle'
    const textSize = [images[0].width / 6.4, images[0].width / 12.8]
    const textYOffset = [-images[0].width / 64.0, images[0].width / 8.0]
    const textOffset = [images[0].width * 0.5, images[0].height * 0.5]

    images.forEach((image, i) => {
      const entry = this.entries[i]

      const x = (i % this.sourceTextureRows) * images[0].width
      const y = Math.floor(i / this.sourceTextureRows) * images[0].height

      ctx.drawImage(image, x, y)

      textCtx.fillStyle = '#ffffff'
      textCtx.font = `${textSize[0]}px sans-serif`
      textCtx.fillText(entry.title, x + textOffset[0], y + textOffset[1] + textYOffset[0])

      textCtx.fillStyle = '#bbbbbb'
      textCtx.font = `${textSize[1]}px sans-serif`
      textCtx.fillText(entry.description, x + textOffset[0], y + textOffset[1] + textYOffset[1])
    })
    this.spriteSheet = this.regl.texture(canvas)
    textCtx.filter = 'blur(1px)'
    textCtx.drawImage(textCanvas, 0, 0, textCanvas.width, textCanvas.height)
    this.textSpriteSheet = this.regl.texture(textCanvas)

    this.setupEventListeners()
    this.render()
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.resizeObserver.observe(this.target)
  }

  private render = () => {
    performance.mark('start')
    this.updateMousePosition();
    this.updateFisheye();
    this.regl.clear({
      color: [0, 0, 0, 1],
      depth: 1,
    })
    this.regl({
      frag: fragment,
      vert: vertex,
      attributes: {
        position: [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ],
      },
      uniforms: {
        color: [1, 0, 0, 1],
        rows: this.rows,
        tex: this.spriteSheet,
        text_tex: this.textSpriteSheet,
        resolution: this.resolution,
        mouse: this.mouse,
        total_textures: this.entries.length,
        time: 0.0,
        vignete: [0.0, 0.2],
        tethaYOffset: this.tethaYOffset,
        animateXOffset: this.animateXOffset,
        marginOffset: this.marginOffset,
        fisheye_value: this.fisheye,
        source_texture_rows: this.sourceTextureRows,
        source_texture_cols: this.sourceTextureCols,
        seed: this.seed,
      },
      count: 6,
    })()
    performance.mark('end')
    performance.measure('render', 'start', 'end')
    const duration = performance.getEntriesByName('render')[0].duration
    const delay = Math.max(0, 1000 / this.maxFPS - duration)
    setTimeout(() => {
      requestAnimationFrame(() => this.render())
    }, delay)
  }
}

