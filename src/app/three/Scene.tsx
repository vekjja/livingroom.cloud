"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { alpha, Box } from "@mui/material";

// Define Prop Types
interface ThreeSceneProps {
  color?: number;
  alpha?: boolean;
}

const ThreeScene = ({ color = 0x00ff00, alpha = false }: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
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

    const renderer = new THREE.WebGLRenderer({ alpha: alpha });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Add Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation Loop
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount || !cameraRef.current || !rendererRef.current) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [color, alpha]);

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
