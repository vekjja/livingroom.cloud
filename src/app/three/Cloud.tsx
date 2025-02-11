"use client";

import * as React from "react";
import { Box } from "@mui/material";
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

      // Iterate over all children and apply properties to Mesh objects only
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      model.position.set(0, 1, 0);
      scene.add(model);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 10, 10);
      scene.add(light);

      const bLight = new THREE.DirectionalLight(0xafffb, 0.8);
      bLight.position.set(3, -10, 10);
      scene.add(bLight);

      // Animation loop
      const animate = () => {
        model.rotation.y += 0.001;
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50vh",
      }}
    >
      <ThreeScene color={color} alpha={alpha} renderFunction={renderCloud} />
    </Box>
  );
}
