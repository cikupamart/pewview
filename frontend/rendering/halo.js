import {
  Mesh,
  SphereBufferGeometry,
  ShaderMaterial,
  Color,
  Vector3
} from "../include/three"

import HALO_FRAGMENT_SHADER from "./shaders/halo.frag";
import HALO_VERTEX_SHADER from "./shaders/halo.vert";

export default class Halo {
  constructor(radius) {
    this.elapsedTime = 0;
    this.animateHalo = true;
    this.uniforms = {
      c: {
        type: "f",
        value: 0.8
      },
      p: {
        type: "f",
        value: 10
      },
      noiseSeed: {
        type: "f",
        value: this.elapsedTime
      },
      noiseScale: {
        type: "f",
        value: 8
      },
      noiseIntensity: {
        type: "f",
        value: 0.08
      },
      glowColor: {
        type: "c",
        value: new Color(0x1c2462)
      },
      viewVector: {
        type: "v3",
        value: new Vector3(0, 0, 220)
      }
    };
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: HALO_VERTEX_SHADER,
      fragmentShader: HALO_FRAGMENT_SHADER,
      side: 1,
      blending: 2,
      transparent: true
    });

    // Declare shader constants
    this.material.defines = {
      ANIMATE_HALO: this.animateHalo
    };

    this.mesh = new Mesh(new SphereBufferGeometry(radius, 45, 45), this.material);
    this.mesh.scale.multiplyScalar(1.15);
    this.mesh.rotateX(.03 * Math.PI);
    this.mesh.rotateY(.03 * Math.PI);
    this.mesh.renderOrder = 3;
  }

  update(deltaTime) {
    if (this.animateHalo) {
      this.elapsedTime = (this.elapsedTime + deltaTime) % 1e3;
      this.uniforms.noiseSeed.value = this.elapsedTime / 2;
    }
  }
}
