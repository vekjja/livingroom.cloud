"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Box } from "@mui/material";

// Define Prop Types
interface ThreeSceneProps {
  color?: number;
  alpha?: boolean;
  renderFunction?: (
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    requestRef: { current: number | null }
  ) => void;
}

const ThreeScene = ({
  color = 0x00ff00,
  alpha = false,
  renderFunction = undefined,
}: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const initialRequestId = requestRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Call Custom Render Function if provided
    if (typeof renderFunction === "function") {
      renderFunction(scene, camera, renderer, requestRef);
    }

    // Resize Handler
    const handleResize = () => {
      if (!mount || !cameraRef.current || !rendererRef.current) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Ensure the scene fits initially

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      if (initialRequestId) cancelAnimationFrame(initialRequestId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, alpha, renderFunction]);

  return (
    <Box
      ref={mountRef}
      sx={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ThreeScene;
