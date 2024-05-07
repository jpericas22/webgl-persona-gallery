export declare interface Entry {
    title: string;
    description: string;
    imageUrl: string;
}

export declare class WebGLGallery {
    private regl;
    private target;
    private rows;
    private entries;
    private resolution;
    private mouse;
    private mouseTarget;
    private fisheye;
    private fisheyeTarget;
    private maxFPS;
    private spriteSheet;
    private textSpriteSheet;
    private resizeObserver;
    private tethaYOffset;
    private animateXOffset;
    private lerpFactor;
    private marginOffset;
    private shouldUpdateMouse;
    private isMobile;
    private isFirstMovement;
    private sourceTextureRows;
    private sourceTextureCols;
    private seed;
    constructor(target: HTMLElement, entries: Entry[]);
    private setupEventListeners;
    private calculateMousePosition;
    private isMousePositionRange;
    private onMouseMove;
    private onResize;
    private lerp;
    private updateMousePosition;
    private updateFisheye;
    private init;
    private render;
}

export { }
