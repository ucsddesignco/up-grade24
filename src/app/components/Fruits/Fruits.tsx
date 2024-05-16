'use client';

import './Fruits.scss';
import { useEffect, useRef } from 'react';
import Matter, { Mouse, MouseConstraint, Vertices } from 'matter-js';
import createEllipseVertices from './util/createEllipseVertices';

export default function Fruits() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scene.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

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

    const watermelonShape = createEllipseVertices({
      cx: 0,
      cy: 0,
      rx: 130,
      ry: 150,
      steps: 20
    });
    const textureWidth = 709;
    const textureHeight = 844;
    const watermelon = Bodies.fromVertices(
      400,
      300,
      [Vertices.hull(watermelonShape)],
      {
        restitution: 0.6, //Bounciness
        render: {
          sprite: {
            texture: '/textures/watermelon.webp',
            xScale: 260 / textureWidth,
            yScale: 300 / textureHeight
          }
        }
      },
      true
    );

    const boxA = Bodies.rectangle(400, 200, 80, 80);
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    Composite.add(engine.world, [boxA, boxB, watermelon, ground]);

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

  return <div ref={scene} className="fruit-container"></div>;
}
