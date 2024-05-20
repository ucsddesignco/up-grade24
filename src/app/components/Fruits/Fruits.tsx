'use client';

import './Fruits.scss';
import { useEffect, useRef } from 'react';
import Matter, { Constraint, Common, Mouse, MouseConstraint } from 'matter-js';

import 'pathseg';

export default function Fruits() {
  const scene = useRef<HTMLDivElement>(null);
  const watermelonSVG = useRef<SVGPathElement>(null);
  Common.setDecomp(require('poly-decomp'));

  useEffect(() => {
    if (!scene.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Svg = Matter.Svg;

    const engine = Engine.create();
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        wireframes: false,
        width: scene.current.clientWidth,
        height: scene.current.clientHeight
      }
    });

    // console.log(watermelonBody);
    // const watermelonPath = document.querySelector('matter-path') as SVGPathElement;
    // const water = watermelonSVG.current ? Svg.pathToVertices(watermelonSVG.current, 30) : null;
    // if (watermelonSVG.current) {
    // let vertices = Svg.pathToVertices(watermelonSVG.current, 30);
    //   const svgBody = Bodies.fromVertices(100, 0, [vertices], {
    //     isStatic: false,
    //     render: {
    //       sprite: {
    //     texture: '/textures/watermelon.png',
    //     xScale: 0.5, // Adjust the scale as needed
    //     yScale: 0.5
    //       }
    //     }
    //   });
    //   Composite.add(engine.world, svgBody);
    // }

    if (watermelonSVG.current) {
      let vertices = Svg.pathToVertices(watermelonSVG.current, 30);

      let body = Bodies.fromVertices(
        100,
        0,
        [vertices],
        {
          render: {
            fillStyle: 'none',
            strokeStyle: 'none',
            lineWidth: 1
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
              xScale: 195 / textureWidth,
              yScale: 240 / textureHeight
            }
          }
        }
      );
      let constraint = Constraint.create({
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: 0, y: 8 },
        bodyB: spriteHolder,
        pointB: { x: 0, y: 0 },
        length: 0
      });
      let constraint2 = Constraint.create({
        stiffness: 1.1,
        bodyA: body,
        pointA: { x: 0, y: -18 },
        bodyB: spriteHolder,
        pointB: { x: 0, y: -10 },
        length: 0
      });

      Composite.add(engine.world, [
        body,
        spriteHolder,
        constraint,
        constraint2
      ]);
    }

    // const watermelonShape = createEllipseVertices({
    //   cx: 0,
    //   cy: 0,
    //   rx: 130,
    //   ry: 150,
    //   steps: 20
    // });
    // const textureWidth = 709;
    // const textureHeight = 844;
    // const watermelon = Bodies.fromVertices(
    //   400,
    //   300,
    //   [Vertices.hull(watermelonShape)],
    //   {
    //     restitution: 0.6, //Bounciness
    //     render: {
    //       sprite: {
    //         texture: '/textures/watermelon.png',
    //         xScale: 260 / textureWidth,
    //         yScale: 300 / textureHeight
    //       }
    //     }
    //   },
    //   true
    // );
    // Composite.add(engine.world, [watermelon]);

    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true });
    Composite.add(engine.world, [boxA, boxB, ground]);

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
      <div ref={scene} className="fruit-container"></div>;
    </>
  );
}
