// "use client";
// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const Roadmap: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     // Get window dimensions

//     const width = window.innerWidth;
//     const height = 1000;

//     const roadPath =
//       "M13.2,528.1l-30.4-30.4L60,420.4c19.6-19.6,45.6-30.4,73.3-30.4c0.2,0,0.5,0,0.7,0c28,0.2,54.1,11.3,73.6,31.4c8,8.3,18.8,12.9,30.4,12.9c0.1,0,0.2,0,0.3,0c11.4,0,22.1-4.4,30.2-12.5c16.3-16.3,16.6-43.2,0.6-59.9l-24-25c-31.6-31.8-31.6-83.5,0.2-115.2c15.6-15.6,36.2-24.1,58.2-23.9c22,0.1,42.6,8.9,57.9,24.7c27,27.7,62.2,63.9,91.2,93.6c21.6,22.2,57.4,22.8,79.8,1.3l1.5-1.4c11.7-11.2,18.2-26.3,18.4-42.3c0.2-15.9-6-30.9-17.3-42.2L507.6,204c-15.6-15.6-24.2-36.3-24.2-58.3c0-22,8.6-42.7,24.1-58.3L510,85c15.7-15.7,36.4-24.3,58.3-24.4c0.1,0,0.2,0,0.3,0c21.8,0,42.4,8.5,57.8,24l1.5,1.5c11.9,11.9,27.7,18.4,44.4,18.4c0,0,0,0,0,0c16.8,0,32.6-6.5,44.4-18.4L811-8l30.4,30.4l-94.1,94.1c-20,20-46.6,31-74.8,31c0,0,0,0,0,0c-28.3,0-54.9-11-74.9-31l-1.5-1.5c-7.3-7.3-17-11.4-27.4-11.4c0,0-0.1,0-0.1,0c-10.5,0-20.5,4.2-28.1,11.8l-2.5,2.5c-7.4,7.4-11.5,17.3-11.5,27.9c0,10.5,4.1,20.4,11.6,27.9l27.5,27.4c19.6,19.5,30.2,45.5,29.9,73.1c-0.3,27.7-11.5,53.6-31.6,73l-1.5,1.4c-19.1,18.3-44.2,28.1-70.6,27.7c-26.5-0.4-51.2-11.1-69.7-30.1c-29-29.8-64.2-65.9-91.2-93.6c-7.3-7.5-17-11.6-27.4-11.7c-10.4,0-20.2,3.9-27.6,11.3c-7.3,7.3-11.3,17-11.3,27.3c0,10.3,4,20,11.3,27.3l0.3,0.3l24.2,25.2c15.6,16.3,24.1,37.7,23.9,60.3c-0.2,22.6-9.2,43.8-25.1,59.8c-16.2,16.2-37.7,25.1-60.6,25.1c-0.2,0-0.4,0-0.6,0c-23.1-0.2-44.8-9.4-60.9-26c-11.4-11.7-26.7-18.3-43.1-18.4c-0.1,0-0.3,0-0.4,0c-16.2,0-31.5,6.3-42.9,17.8L13.2,528.1z";

//     // Append road background (make it wider)
//     svg
//       .append("path")
//       .attr("d", roadPath)
//       .attr("fill", "black")
//       .attr("stroke", "black") // Keep stroke color for visibility
//       .attr("stroke-width", "15")
//       .attr("stroke-linecap", "round");

//     // Define gradient
//     svg
//       .append("defs")
//       .append("linearGradient")
//       .attr("id", "gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "100%")
//       .attr("y2", "0%")
//       .selectAll("stop")
//       .data([
//         { offset: "0%", color: "#8E7AFF" },
//         { offset: "100%", color: "#9E94FF" },
//       ])
//       .enter()
//       .append("stop")
//       .attr("offset", (d) => d.offset)
//       .attr("stop-color", (d) => d.color);

//     // Append middle white dashed line
//     svg
//       .append("path")
//       .attr("d", roadPath)
//       .attr("stroke", "white")
//       .attr("stroke-width", "10")
//       .attr("fill", "none")
//       .attr("stroke-dasharray", "15,20"); // Dashed effect
//   }, []);

//   return (
//     <div className="flex justify-center items-center overflow-auto h-screen w-full">
//       <svg
//         ref={svgRef}
//         width="100%"
//         height={1000}
//         className="relative top-20"
//       ></svg>
//     </div>
//   );
// };

// export default Roadmap;

"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const Roadmap2D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -100,
      window.innerWidth / 100,
      window.innerHeight / 100,
      window.innerHeight / -100,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Define a 2D path using CatmullRomCurve3
    const points = [
      new THREE.Vector3(-4, 0, 0),
      new THREE.Vector3(-2, 2, 0),
      new THREE.Vector3(2, -2, 0),
      new THREE.Vector3(4, 1, 0),
      new THREE.Vector3(6, -1, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(points);

    // Draw the road path
    const roadGeometry = new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(100)
    );
    const roadMaterial = new THREE.LineBasicMaterial({
      color: 0x333333,
      linewidth: 5,
    });
    const roadLine = new THREE.Line(roadGeometry, roadMaterial);
    scene.add(roadLine);

    // Create a marker (a small sphere that moves along the path)
    const markerGeometry = new THREE.CircleGeometry(0.2, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    scene.add(marker);

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(roadLine);

      if (intersects.length > 0) {
        // Get the closest point on the path
        const clickedPoint = intersects[0].point;
        let closestPoint = points[0];
        let minDist = Infinity;

        points.forEach((point) => {
          const dist = point.distanceTo(clickedPoint);
          if (dist < minDist) {
            minDist = dist;
            closestPoint = point;
          }
        });

        // Animate the marker to move along the path
        gsap.to(marker.position, {
          duration: 1.5,
          x: closestPoint.x,
          y: closestPoint.y,
          ease: "power2.out",
        });

        setProgress((prev) => Math.min(prev + 0.2, 1));
      }
    };

    window.addEventListener("click", onMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("click", onMouseClick);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen" />;
};

export default Roadmap2D;
