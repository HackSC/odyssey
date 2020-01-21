import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import jsQR from "jsqr";

type Coordinates = {
  x: number;
  y: number;
};

const Scanner = (props: any) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const animationFrame = useRef(null);

  const drawLine = (begin: Coordinates, end: Coordinates, color: string) => {
    const canvasElement = canvasRef.current;
    const canvas = canvasElement.getContext("2d");

    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  };

  var animate = () => {
    const video = videoRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA && canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvas = canvasElement.getContext("2d");

      canvasElement.hidden = false;
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      const imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
      });

      if (code) {
        props.handleScannedCode(code.data);

        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#3DDE1F"
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#3DDE1F"
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#3DDE1F"
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#3DDE1F"
        );
      }
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current !== null) {
      videoRef.current = document.createElement("video");
      const video = videoRef.current;

      function errorCallback(error) {
        alert(error);
      }

      // Use facingMode: environment to attemt to get the front camera on phones
      window.navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
          video.srcObject = stream;
          video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
          video.play();
          animationFrame.current = requestAnimationFrame(animate);
        })
        .catch(errorCallback);

      return () => cancelAnimationFrame(animationFrame.current);
    }
  }, []);

  return <ScannerCanvas ref={canvasRef} />;
};

const ScannerCanvas = styled.canvas`
  width: 100%;
  border-radius: 4px;
`;

export default Scanner;
