"use client";

import * as React from "react";
import ThreeScene from "./Scene";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

interface CloudProps {
  color?: number;
  alpha?: boolean;
}

function renderCloud(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  requestRef: { current: number | null }
) {
  const loader = new GLTFLoader();
  loader.load(
    "/gltf/cloud/scene.gltf", // Ensure the correct path
    (gltf) => {
      const model = gltf.scene;

      // Ensure model receives and casts shadows
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      model.position.set(0, 0, -1);
      scene.add(model);

      // Adjust Camera Positioning
      camera.position.set(0, 0, 3); // Move camera back to fit model
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Add Lighting
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 10, 10);
      scene.add(light);

      const bLight = new THREE.DirectionalLight(0xafffb, 0.8);
      bLight.position.set(3, -10, 10);
      scene.add(bLight);

      // Animation loop
      const animate = () => {
        model.rotation.y += 0.005; // Smooth rotation
        renderer.render(scene, camera);
        requestRef.current = requestAnimationFrame(animate);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error("An error happened", error);
    }
  );
}

export default function Cloud({ color = 0xffff, alpha = false }: CloudProps) {
  return (
    <ThreeScene color={color} alpha={alpha} renderFunction={renderCloud} />
  );
}
