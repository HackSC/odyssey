import React, { useEffect } from "react";

import styled from "styled-components";

import * as THREE from "three";
import SimplexNoise from "simplex-noise";

import { Flex, Column, Button } from "../styles";

const Hero = () => {
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

    renderer.setSize($canvas.clientWidth, $canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    let scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(
        30,
        $canvas.clientWidth / $canvas.clientHeight,
        0.1,
        500
      );

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

    let sphere: any = new THREE.Mesh(geometry, material);

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
    <Wrapper>
      <Flex align="center">
        <Column flexBasis={60}>
          <Blob id="blob">
            <canvas></canvas>
          </Blob>
        </Column>

        <Column flexBasis={38}>
          <h1>Apply to HackSC</h1>

          <p>
            HackSC is the University of Southern California’s largest hackathon.
            This year, we’re focused on bringing real solutions to those in need
            by pushing the boundaries of technology, innovation, and
            collaboration.
          </p>

          <GetStartedLink href="/auth/login">Get Started</GetStartedLink>
        </Column>
      </Flex>
    </Wrapper>
  );
};

// TODO: Flesh this out and make it pretty
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 600px;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }

  p {
    line-height: 28px;
  }
`;

const Blob = styled.div`
  position: relative;
  canvas {
    width: 500px;
    height: 500px;
  }
`;

const GetStartedLink = styled.a`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.peach};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  margin-top: 16px;
  display: inline-block;
`;

export default Hero;
