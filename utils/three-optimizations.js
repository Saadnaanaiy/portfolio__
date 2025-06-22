import * as THREE from 'three';

/**
 * Utility functions for optimizing Three.js performance
 */

// Detect device capabilities for adaptive rendering
export const detectDeviceCapabilities = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof navigator !== 'undefined' ? navigator.userAgent : '',
    );

  const hasWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  };

  return {
    isMobile,
    hasWebGLSupport: typeof window !== 'undefined' ? hasWebGLSupport() : true,
    lowPerformance: isMobile,
    highPerformance:
      !isMobile && typeof window !== 'undefined' ? hasWebGLSupport() : false,
  };
};

// Get optimized renderer settings based on device capabilities
export const getOptimizedRendererSettings = () => {
  const capabilities = detectDeviceCapabilities();

  return {
    powerPreference: 'high-performance',
    antialias: !capabilities.lowPerformance,
    alpha: true,
    precision: capabilities.lowPerformance ? 'mediump' : 'highp',
    depth: true,
    stencil: false,
    premultipliedAlpha: false,
  };
};

// Set optimized pixel ratio for renderer
export const getOptimizedPixelRatio = () => {
  const capabilities = detectDeviceCapabilities();
  const maxPixelRatio = capabilities.lowPerformance ? 1 : 2;

  return Math.min(window.devicePixelRatio, maxPixelRatio);
};

// Dispose Three.js objects properly to prevent memory leaks
export const disposeThreeObjects = (obj) => {
  if (!obj) return;

  // Handle geometries
  if (obj.geometry) {
    obj.geometry.dispose();
  }

  // Handle materials
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach((material) => disposeMaterial(material));
    } else {
      disposeMaterial(obj.material);
    }
  }

  // Handle children recursively
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach((child) => disposeThreeObjects(child));
  }
};

// Helper function to dispose material and its textures
const disposeMaterial = (material) => {
  if (!material) return;

  // Dispose textures
  Object.keys(material).forEach((prop) => {
    if (!material[prop]) return;
    if (material[prop].isTexture) {
      material[prop].dispose();
    }
  });

  // Dispose material itself
  material.dispose();
};

// Optimize texture loading
export const loadOptimizedTexture = (url, onLoad) => {
  const capabilities = detectDeviceCapabilities();
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load(url, (texture) => {
    // Optimize texture based on device capabilities
    texture.minFilter = capabilities.lowPerformance
      ? THREE.LinearFilter
      : THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = capabilities.lowPerformance ? 1 : 4;
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;

    if (onLoad) onLoad(texture);
  });
};

// Create optimized geometry (reduces vertices for low-performance devices)
export const createOptimizedGeometry = (geometryType, params) => {
  const capabilities = detectDeviceCapabilities();

  // Adjust geometry details based on device performance
  if (capabilities.lowPerformance) {
    switch (geometryType) {
      case 'sphere':
        return new THREE.SphereGeometry(
          params.radius,
          Math.max(8, params.widthSegments / 2),
          Math.max(6, params.heightSegments / 2),
        );
      case 'box':
        return new THREE.BoxGeometry(
          params.width,
          params.height,
          params.depth,
          1,
          1,
          1,
        );
      default:
        return null;
    }
  } else {
    // Full quality for high-performance devices
    switch (geometryType) {
      case 'sphere':
        return new THREE.SphereGeometry(
          params.radius,
          params.widthSegments,
          params.heightSegments,
        );
      case 'box':
        return new THREE.BoxGeometry(
          params.width,
          params.height,
          params.depth,
          params.widthSegments,
          params.heightSegments,
          params.depthSegments,
        );
      default:
        return null;
    }
  }
};

// Optimize scene by removing unnecessary objects based on distance
export const optimizeSceneByDistance = (camera, objects, maxDistance) => {
  if (!camera || !objects) return;

  objects.forEach((obj) => {
    if (!obj.position) return;

    const distance = camera.position.distanceTo(obj.position);

    // Hide objects too far away
    if (distance > maxDistance) {
      obj.visible = false;
    } else {
      obj.visible = true;

      // Reduce detail for distant objects
      if (
        distance > maxDistance * 0.6 &&
        obj.userData &&
        obj.userData.originalSegments
      ) {
        const ratio = 1 - distance / maxDistance;
        updateGeometryDetail(obj, ratio);
      }
    }
  });
};

// Helper to dynamically reduce geometry detail
const updateGeometryDetail = (obj, detailRatio) => {
  if (!obj.geometry || !obj.userData.originalSegments) return;

  const { type, params, originalSegments } = obj.userData;

  // Only update if we need to reduce detail significantly
  if (Math.abs(detailRatio - obj.userData.currentDetailRatio) < 0.2) return;

  // Create new geometry with adjusted detail
  const adjustedSegments = Math.max(
    4,
    Math.floor(originalSegments * detailRatio),
  );

  // Replace geometry
  const oldGeometry = obj.geometry;
  obj.geometry = createOptimizedGeometry(type, {
    ...params,
    segments: adjustedSegments,
  });
  oldGeometry.dispose();

  // Store current detail ratio
  obj.userData.currentDetailRatio = detailRatio;
};

// Optimize render loop with frame throttling for low-end devices
export class ThrottledRenderLoop {
  constructor(renderer, scene, camera, throttleFPS = 30) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.throttleFPS = throttleFPS;
    this.lastRenderTime = 0;
    this.frameInterval = 1000 / throttleFPS;
    this.isRunning = false;
    this.capabilities = detectDeviceCapabilities();
    this.callbacks = [];
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  addCallback(callback) {
    this.callbacks.push(callback);
  }

  animate = (timestamp) => {
    if (!this.isRunning) return;

    requestAnimationFrame(this.animate);

    // Throttle render for low-end devices
    const throttle = this.capabilities.lowPerformance;
    const elapsed = timestamp - this.lastRenderTime;

    if (!throttle || elapsed > this.frameInterval) {
      this.lastRenderTime = timestamp - (elapsed % this.frameInterval);

      // Run all callbacks
      this.callbacks.forEach((callback) => callback(timestamp));

      // Render scene
      this.renderer.render(this.scene, this.camera);
    }
  };
}

export default {
  detectDeviceCapabilities,
  getOptimizedRendererSettings,
  getOptimizedPixelRatio,
  disposeThreeObjects,
  loadOptimizedTexture,
  createOptimizedGeometry,
  optimizeSceneByDistance,
  ThrottledRenderLoop,
};
