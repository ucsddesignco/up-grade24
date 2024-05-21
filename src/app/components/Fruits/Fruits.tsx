'use client';

import './Fruits.scss';
import { useEffect, useRef } from 'react';
import Matter, {
  Constraint,
  Common,
  Mouse,
  MouseConstraint,
  Vertices
} from 'matter-js';

import 'pathseg';

export default function Fruits() {
  const scene = useRef<HTMLDivElement>(null);
  const watermelonSVG = useRef<SVGPathElement>(null);
  const apricotSVG = useRef<SVGPathElement>(null);
  const cherrySVG = useRef<SVGPathElement>(null);
  Common.setDecomp(require('poly-decomp'));

  useEffect(() => {
    if (!scene.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      Svg = Matter.Svg;

    const engine = Engine.create();
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        wireframes: false,
        width: scene.current.clientWidth,
        height: scene.current.clientHeight,
        pixelRatio: window.devicePixelRatio || 1,
        background: 'transparent'
      }
    });

    const handleResize = () => {
      if (!scene.current) return; // Add null check

      const width = scene.current.clientWidth;
      const height = scene.current.clientHeight;

      Render.setPixelRatio(render, window.devicePixelRatio || 1);
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
      });
      Body.setPosition(ground, { x: width / 2, y: height });
      Body.setPosition(leftWall, { x: 0, y: height / 2 });
      Body.setPosition(rightWall, { x: width, y: height / 2 });
      Engine.update(engine, 0);
    };

    window.addEventListener('resize', () => {
      handleResize();
      console.log('Window resized');
    });

    let width = scene.current.clientWidth;
    let height = scene.current.clientHeight;

    const ground = Bodies.rectangle(width / 2, height, width, 10, {
      isStatic: true
    });
    const leftWall = Bodies.rectangle(0, height - 200, 10, 600, {
      isStatic: true
    });
    const rightWall = Bodies.rectangle(width, height - 200, 10, 600, {
      isStatic: true
    });
    Matter.Body.rotate(leftWall, -0.08 * Math.PI);
    Matter.Body.rotate(rightWall, 0.08 * Math.PI);
    Composite.add(engine.world, [ground, leftWall, rightWall]);

    const words = [
      {
        // UP-GRADE
        textWidth: 200,
        textHeight: 30.1,
        boxScale: 1.44,
        spriteScale: 0.8,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // CO
        textWidth: 200,
        textHeight: 104.18,
        boxScale: 0.41,
        spriteScale: 0.8,
        svgPath: '/textures/wordTwo.svg'
      },
      {
        // 2024
        textWidth: 200,
        textHeight: 60.1,
        boxScale: 0.7,
        spriteScale: 0.8,
        svgPath: '/textures/wordThree.svg'
      }
    ];

    // Create Words

    words.forEach((word, index) => {
      const { textWidth, textHeight, boxScale, spriteScale, svgPath } = word;
      const posX = index * 100 + 100;
      const posY = 100;
      let width = textWidth * boxScale;
      let height = textHeight * boxScale;

      // Create rectangle body
      const rectangle = Bodies.rectangle(posX, posY, width, height, {
        isStatic: false,
        render: {
          strokeStyle: 'black',
          fillStyle: 'black',
          lineWidth: 1,
          sprite: {
            texture: svgPath,
            xScale: spriteScale,
            yScale: spriteScale
          }
        }
      });

      // Create sprite on top of the rectangle body

      // Add the rectangle and sprite to the engine world
      Composite.add(engine.world, rectangle);
    });

    //Watermelon Scaling
    let watermelonScaling = 1.8;

    if (watermelonSVG.current) {
      let vertices = Svg.pathToVertices(watermelonSVG.current, 30);
      // Scale the vertices to a new size
      const scaledVertices = Vertices.scale(
        vertices,
        watermelonScaling,
        watermelonScaling,
        { x: 0, y: 0 }
      );

      // Create a body from the scaled vertices
      const body = Bodies.fromVertices(
        100,
        0,
        [scaledVertices],
        {
          render: {
            fillStyle: 'black',
            strokeStyle: 'black'
          }
        },
        true
      );
      const textureWidth = 709;
      const textureHeight = 844;

      let spriteHolder = Bodies.rectangle(
        body.bounds.min.x,
        body.bounds.min.y, // Translate spriteHolder up by 20px
        body.bounds.max.x - body.bounds.min.x,
        body.bounds.max.y - body.bounds.min.y,
        {
          collisionFilter: {
            mask: 0
          },
          render: {
            fillStyle: 'none',
            strokeStyle: '#ffffff',
            sprite: {
              texture: '/textures/watermelon.webp',
              xScale: (195 / textureWidth) * watermelonScaling * 1,
              yScale: (240 / textureHeight) * watermelonScaling * 0.98
            }
          }
        }
      );
      let scaleTranslate = watermelonScaling * 0.25 + 1;
      let constraint = Constraint.create({
        render: {
          visible: false
        },
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: 0, y: 20 * scaleTranslate },
        bodyB: spriteHolder,
        pointB: { x: 0, y: 20 },
        length: 0
      });
      let constraint2 = Constraint.create({
        render: {
          visible: false
        },
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: 0, y: -30 * scaleTranslate },
        bodyB: spriteHolder,
        pointB: { x: 0, y: -30 },
        length: 0
      });

      Composite.add(engine.world, [
        body,
        spriteHolder,
        constraint,
        constraint2
      ]);
    }

    // Create Apricot
    let apricotScaling = 0.8;
    if (apricotSVG.current) {
      let vertices = Svg.pathToVertices(apricotSVG.current, 30);
      // Scale the vertices to a new size
      const scaledVertices = Vertices.scale(
        vertices,
        apricotScaling,
        apricotScaling,
        { x: 0, y: 0 }
      );

      // Create a body from the scaled vertices
      const body = Bodies.fromVertices(
        300,
        0,
        [scaledVertices],
        {
          render: {
            fillStyle: 'transparent',
            strokeStyle: 'transparent'
          }
        },
        true
      );
      const textureWidth = 356;
      const textureHeight = 406;

      let spriteHolder = Bodies.rectangle(
        body.bounds.min.x,
        body.bounds.min.y, // Translate spriteHolder up by 20px
        body.bounds.max.x - body.bounds.min.x,
        body.bounds.max.y - body.bounds.min.y,
        {
          collisionFilter: {
            mask: 0
          },
          render: {
            fillStyle: 'none',
            strokeStyle: '#ffffff',
            sprite: {
              texture: '/textures/apricot.webp',
              xScale: (195 / textureWidth) * apricotScaling * 1,
              yScale: (240 / textureHeight) * apricotScaling * 1
            }
          }
        }
      );
      let scaleTranslateX = apricotScaling * 0.4;
      let scaleTranslateY = apricotScaling * 0.4 + 1;
      let constraint = Constraint.create({
        render: {
          visible: false
        },
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: -5 + 1 * scaleTranslateX, y: 20 * scaleTranslateY },
        bodyB: spriteHolder,
        pointB: { x: 0, y: 20 },
        length: 0
      });
      let constraint2 = Constraint.create({
        render: {
          visible: false
        },
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: -5 * 1 + scaleTranslateX, y: -30 * scaleTranslateY },
        bodyB: spriteHolder,
        pointB: { x: 0, y: -30 },
        length: 0
      });

      Composite.add(engine.world, [
        body,
        spriteHolder,
        constraint,
        constraint2
      ]);
    }

    // Create Cherry
    let cherryScaling = 0.8;
    if (cherrySVG.current) {
      const vertices = Svg.pathToVertices(cherrySVG.current, 30);
      const scaledVertices = Vertices.scale(
        vertices,
        cherryScaling,
        cherryScaling,
        { x: 0, y: 0 }
      );
      const body = Bodies.fromVertices(
        500,
        200,
        [scaledVertices],
        {
          isStatic: false,
          render: {
            fillStyle: 'black',
            strokeStyle: 'black'
          }
        },
        true
      );
      const textureWidth = 201;
      const textureHeight = 215;
      const spriteHolder = Bodies.rectangle(
        body.bounds.min.x,
        body.bounds.min.y,
        body.bounds.max.x - body.bounds.min.x,
        body.bounds.max.y - body.bounds.min.y,
        {
          isStatic: false,
          collisionFilter: {
            mask: 0
          },
          render: {
            fillStyle: 'none',
            strokeStyle: '#ffffff',
            sprite: {
              texture: '/textures/cherry.webp',
              xScale: (195 / textureWidth) * cherryScaling * 1,
              yScale: (240 / textureHeight) * cherryScaling * 1
            }
          }
        }
      );
      // const scaleTranslateX = cherryScaling * .4;
      // const scaleTranslateY = cherryScaling * .4 + 1;
      const constraint = Constraint.create({
        render: {
          visible: true
        },
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: 10, y: -10 },
        bodyB: spriteHolder,
        pointB: { x: -7, y: 15 },
        length: 0
      });
      const constraint2 = Constraint.create({
        render: {
          visible: true
        },
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: -10, y: 10 },
        bodyB: spriteHolder,
        pointB: { x: -32, y: 42 },
        length: 0
      });

      Composite.add(engine.world, [
        body,
        spriteHolder,
        constraint,
        constraint2
      ]);
    }

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 405.36"
      >
        <path
          ref={watermelonSVG}
          className="cls-1"
          d="M196.62,90.62c.72-.61-.12-1.56.76-2.17.38,1.82,1.01,3.42,3.07,3.72-.2.52-.46.49-.71.52-2.09.3-2.57,1.01-2.23,3.13.39,2.49.83,4.93,1.71,7.33,1.53,4.2,1.98,4.71,6.45,3.63,3.44-.83,6.89-1.18,10.41-1.42,8.56-.59,16.69.93,24.49,4.4,9.62,4.28,18.13,10.19,25.6,17.6,8.85,8.79,15.82,18.89,20.58,30.43,4.32,10.48,6.93,21.44,8.82,32.59.89,5.22,1.69,10.45,2.15,15.73.74,8.4.25,16.73-.78,25.06-1.72,13.99-5.61,27.38-11.14,40.32-5.94,13.89-14.63,25.63-26.81,34.68-8.05,5.98-16.67,10.68-26.66,12.64-9.34,1.83-18.71,1.93-28.16,1.35-7.32-.45-14.66-.61-21.98-1.02-12.35-.7-24.23-3.33-34.84-9.96-6.8-4.26-12.92-9.39-17.88-15.86-3.08-4.01-6.15-8.01-8.81-12.31-3.75-6.06-6.28-12.69-8.74-19.33-3.32-8.92-5.58-18.13-7.1-27.53-1.31-8.16-2.27-16.37-2.23-24.64.05-11.71,1.8-23.2,4.86-34.5,2.16-8,5.05-15.71,8.76-23.12,3.77-7.52,8.31-14.57,13.74-20.98,7.23-8.55,15.89-15.11,26.55-19.12,10.03-3.77,20.2-5.37,30.84-4.22,1.15.12,2.34.06,3.5-.06,1.69-.18,1.83-1.58,2.05-2.87.67-3.9.48-7.83.55-11.75.01-.61.14-1.24.36-1.8.28-.73.03-1.78,1.26-2.01,1.32-.24.77,1.21,1.56,1.53Z"
        />
      </svg>
      <svg
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 228.09"
      >
        <path
          ref={apricotSVG}
          className="cls-1"
          d="M117.63,227.57c-7.87.1-15.23.19-22.41-2.02-1.98-.61-4.13-.47-6.12-.01-9.16,2.13-16.99-.42-23.76-6.62-8.17-7.48-17.21-14.07-23.87-23.11-4.22-5.74-7.18-12.15-10.03-18.66-4.85-11.06-6.48-22.59-6.93-34.58-.5-13.49.4-26.83,2.12-40.15,1.66-12.87,6.77-24.57,12.6-36.01,4.92-9.66,10.59-18.83,17.84-26.92,3.41-3.81,7.22-7.21,11.29-10.38,6.94-5.41,14.54-9.52,22.68-12.72,1.57-.61,3.18-.98,4.9-.91,1.2.05,2.78.41,3.56-.19,4.36-3.36,8.66-1.07,12.89-.03,4.31,1.06,8.72,1.72,12.89,3.46,4.72,1.97,8.85,4.77,12.61,8.11,7.5,6.66,13.71,14.42,19.01,22.93,3.7,5.94,7,12.09,10,18.4,5.8,12.2,12.18,24.14,16.54,37,8.89,26.28,8.2,52.09-3.58,77.34-2.94,6.31-5.76,12.76-10.45,18.11-9.23,10.54-20.14,18.86-32.94,24.55-6.11,2.72-12.88,1.69-18.85,2.42Z"
        />
      </svg>
      <svg
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 213.85"
      >
        <path
          ref={cherrySVG}
          className="cls-1"
          d="M51.72,213.84c-25.55-.11-39.86-14.36-48.86-37.07-1.82-4.59-1.68-9.75-.54-14.4,4.65-18.95,14.95-33.74,32.62-43.01,15.36-8.06,43.58-1.37,48.24,17.6,1.09,4.45,3.46,6.06,8.53,4.12,18.29-7,36.82-13.55,51.95-26.54,20.97-18,37.76-39.04,44.84-66.41,1.86-7.18,1.46-14.41-.96-21.86-1.77-5.45-5.59-10.65-4.29-17.02.57-2.81,1.22-5.88,3.94-6.77,2.71-.88,4.81,1.54,6.27,3.69,4.08,6.05,7.96,12.06,4.34,20.03-1.2,2.64-.77,6.04-1.04,9.09-1.81,20.76-11.61,38.15-23.2,54.73-16.92,24.19-39.68,40.85-66.93,51.73-4.34,1.73-8.45,4.07-12.72,6.01-2.97,1.35-3.64,3.16-1.23,5.51,17.7,17.21,8.06,43.66-13.6,54.34-8.22,4.05-16.91,6.44-27.37,6.23Z"
        />
      </svg>
      <div ref={scene} className="fruit-container"></div>;
    </>
  );
}
