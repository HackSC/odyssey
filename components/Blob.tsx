import React, { useEffect } from "react";

import styled from "styled-components";
import { ReactThreeFiber } from "react-three-fiber/types/three";
import { Canvas, useFrame } from "react-three-fiber";

import * as THREE from "three";
import SimplexNoise from "simplex-noise";

// * RETIRED COMPONENT

const Blob = () => {
  useEffect(() => {
    let $canvas = document.querySelector("#blob canvas"),
      canvas: any = $canvas,
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        context: canvas.getContext("webgl2"),
        antialias: true,
        alpha: true
      }),
      simplex = new SimplexNoise();

    renderer.setSize(500, 400);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    let scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(30, 5 / 4, 0.1, 500);

    camera.position.z = 5;

    let geometry = new THREE.SphereGeometry(0.8, 128, 128);

    let material = new THREE.MeshPhongMaterial({
      color: 0xff8379,
      shininess: 40
    });

    let lightTop = new THREE.DirectionalLight(0xffffff, 0.55);
    lightTop.position.set(0, 500, 200);
    lightTop.castShadow = true;
    scene.add(lightTop);

    let lightBottom = new THREE.DirectionalLight(0xfeda22, 0.8);
    lightBottom.position.set(0, -500, 400);
    lightBottom.castShadow = true;
    scene.add(lightBottom);

    let ambientLight = new THREE.AmbientLight(0x86dcea);
    scene.add(ambientLight);

    let sphere: ReactThreeFiber.Object3DNode<THREE.Mesh> = new THREE.Mesh(
      geometry,
      material
    );

    scene.add(sphere);

    let update = () => {
      let time = performance.now() * 0.00001 * 13 * Math.pow(1, 3),
        spikes = 0.6 * 1;

      for (let i = 0; i < sphere.geometry.vertices.length; i++) {
        let p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(
          1 +
            0.3 *
              simplex.noise3D(p.x * spikes, p.y * spikes, p.z * spikes + time)
        );
      }

      sphere.geometry.computeVertexNormals();
      sphere.geometry.normalsNeedUpdate = true;
      sphere.geometry.verticesNeedUpdate = true;
    };

    function animate() {
      update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <BlobContainer id="blob">
      <canvas />
    </BlobContainer>
  );
};

const BlobContainer = styled.div`
  position: relative;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

export default Blob;
