'use client';

import './Fruits.scss';
import { useEffect, useRef, useState } from 'react';
import Matter, {
  Common,
  Mouse,
  MouseConstraint,
  Vertices, 
  Events,
  Body,
   Query, 
} from 'matter-js';

import 'pathseg';
import createEllipseVertices from './createEllipseVertices';

export default function Fruits() {
  const scene = useRef<HTMLDivElement>(null);
 
  Common.setDecomp(require('poly-decomp'));




  useEffect(() => {
    if (!scene.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite


    const engine = Engine.create();
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        wireframes: false,
        width: scene.current?.clientWidth, // Use the width of the fruit container
        height: scene.current?.clientHeight, // Use the height of the fruit container
        pixelRatio: window.devicePixelRatio || 1,
        background: 'transparent'
      }
    });

   // Import the necessary modules from Matter.js



    

    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    const handleResize = () => {
      if (!scene.current) return; // Add null check

      const width = scene.current?.clientWidth ?? 0; // Provide default value of 0 if undefined
      const height = scene.current?.clientHeight ?? 0; // Provide default value of 0 if undefined
      
      render.bounds.max.x = width;
      render.bounds.max.y = height;
      render.options.width = width;
      render.options.height = height;
      render.canvas.width = width;
      render.canvas.height = height;
      render.canvas.style.width = width + 'px';
      render.canvas.style.height = height + 'px';

      console.log('Width:', width, 'Height:', height);
      console.log( width / 2, height + barrierWidth / 2)
      Body.setPosition(ground, { x: width / 2, y: (height + barrierWidth) / 2});

      Body.setPosition(rightWall, { x: (width + barrierWidth) / 2, y: height / 2 });
      
      Engine.update(engine, 0);
    };

    


    
    let barrierWidth = 500;
    const width = scene.current?.clientWidth ?? 0; // Provide default value of 0 if undefined
    const height = scene.current?.clientHeight ?? 0; // Provide default value of 0 if undefined

    const ground = Bodies.rectangle(width/2, height + barrierWidth / 2 -10, 20000, barrierWidth, {
      isStatic: true,
      friction: 0.1, // Adjust this value, 0 means no friction
      restitution: 0.1,
      render: {
        fillStyle: 'transparent',
      }
    });
    const leftSlant = Bodies.rectangle(-5 - barrierWidth / 2, height/2, barrierWidth, height * 5, {
      isStatic: true,
      friction: 0.1, // Adjust this value, 0 means no friction
      restitution: 0.1,
      render: {
        fillStyle: 'transparent',
      }
    });
    const rightSlant = Bodies.rectangle(width + barrierWidth / 2 + 5 , height / 2, barrierWidth, height * 5, {
      isStatic: true,
      
      friction: 0.1, // Adjust this value, 0 means no friction
      restitution: 0.1,
      render: {
        fillStyle: 'transparent',
      }
    });
    const leftWall = Bodies.rectangle(0 - barrierWidth / 2, height/2, barrierWidth, height * 5, {
      isStatic: true,
      friction: 0.1, // Adjust this value, 0 means no friction
      restitution: 0.1,
      render: {
        fillStyle: 'transparent',
      }
    });
    const rightWall = Bodies.rectangle(width + barrierWidth / 2 , height / 2, barrierWidth, height * 5, {
      isStatic: true,
      
      friction: 0.1, // Adjust this value, 0 means no friction
      restitution: 0.1,
      render: {
        fillStyle: 'transparent',
      }
    });
    Body.rotate(leftSlant, -0.075 * Math.PI);
    Body.rotate(rightSlant, 0.075 * Math.PI);
    let spriteWidth = width / 815;
    let spriteHeight = height * .5 / 385;
    const basket = Bodies.rectangle(width / 2, height *.75, width, height * .5, {
      isStatic: true,
      friction: 0.1, // Adjust this value, 0 means no friction
      restitution: 0.1,
      render: {
        sprite: {
          texture: '/textures/basket.png',
          xScale: spriteWidth,
          yScale: spriteHeight,
        },
      },
    });
    basket.collisionFilter = {
      'group': -1,
      'category': 2,
      'mask': 0,
    };

    // Matter.Body.rotate(leftWall, -0.08 * Math.PI);
    // Matter.Body.rotate(rightWall, 0.08 * Math.PI);
    Composite.add(engine.world, [ground, leftWall, rightWall, leftSlant, rightSlant]);
    

    const words = [
      {
        // UP-GRADE
        textWidth: 200,
        textHeight: 40,
        boxScale: 1.8,
        spriteScale: 0.8,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // CO
        textWidth: 220,
        textHeight: 120,
        boxScale: 0.6,
        spriteScale: 0.8,
        svgPath: '/textures/wordTwo.svg'
      },
      {
        // 2024
        textWidth: 220,
        textHeight: 60,
        boxScale: 1,
        spriteScale: 0.8,
        svgPath: '/textures/wordThree.svg'
      },
      {
        // DESIGN
        textWidth: 220,
        textHeight: 60,
        boxScale: 1.5,
        spriteScale: 0.8,
        svgPath: '/textures/wordFour.svg',
      }
    ];

   
    // Create Words
 
    words.forEach((word, index) => {
      const { textWidth, textHeight, boxScale, spriteScale, svgPath } = word;
      const posX = (index) * 200 + 200;
      const posY = -200;
      let width = textWidth * boxScale;
      let height = textHeight * boxScale;

      // Create rectangle body
      const rectangle = Bodies.rectangle(posX, posY, width, height, {
        isStatic: false,
        // velocity: { x: 0, y: 0 },
        // friction: 0.1, // Adjust this value, 0 means no friction
        // restitution: 0.1,
        render: {
          strokeStyle: 'black',
          fillStyle: 'black',
          lineWidth: 1,
        
          sprite: {
            texture: svgPath,
            xScale: spriteScale,
            yScale: spriteScale ,
          }
        }
      });

      Composite.add(engine.world, rectangle);
    });

  

    //Create Cherry
    let cherryScale = 0.15;

    const cherryShape = createEllipseVertices({
      cx: 0,
      cy: 0,
      ry: scene.current?.clientWidth * cherryScale* 1,
      rx: scene.current?.clientWidth * cherryScale*.6,
      steps: 20
    });
    const textureWidth = 150;
    const textureHeight = 100;
    const cherry = Bodies.fromVertices(
      scene.current?.clientWidth*.3, scene.current?.clientHeight * -0.2, 
      [Vertices.hull(cherryShape)],
      {
      restitution: 0.6, //Bounciness
      render: {
        fillStyle: 'black',
        sprite: {
          texture: '/textures/cherry.png',
          xScale: (cherryScale * scene.current?.clientWidth * 1.5) / textureWidth,
          yScale: (cherryScale * scene.current?.clientWidth * 1.5 ) / textureWidth,
        },
      },
        });
        Composite.add(engine.world, cherry);

      const watermelonScale = 0.25;
      const watermelonShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * watermelonScale* 1.2,
        rx: scene.current?.clientWidth * watermelonScale*1,
        steps: 16
      });
      const watermelon = Bodies.fromVertices(
        scene.current?.clientWidth *.6, scene.current?.clientHeight * -0.2, 
        [Vertices.hull(watermelonShape)],
        {
        restitution: 0.6, //Bounciness
        render: {
          fillStyle: 'black',
          sprite: {
            texture: '/textures/watermelon.webp',
            xScale: (watermelonScale * scene.current?.clientWidth * 0.4) / textureWidth,
            yScale: (watermelonScale * scene.current?.clientWidth * 0.4 ) / textureWidth,
          },
        },
          });
          Composite.add(engine.world, watermelon);

          const apricotScale = 0.25;
          const apricotShape = createEllipseVertices({
            cx: 0,
            cy: 0,
            ry: scene.current?.clientHeight * apricotScale*.9,
            rx: scene.current?.clientWidth * apricotScale*.8,
            steps: 20
          });
          const apricot = Bodies.fromVertices(
            scene.current?.clientWidth*.2, scene.current?.clientHeight * -.8, 
            [Vertices.hull(apricotShape)],
            {
            restitution: 0.6, //Bounciness
            render: {
              fillStyle: 'black',
              sprite: {
                texture: '/textures/apricot.webp',
                xScale: (apricotScale * scene.current?.clientWidth * .45) / textureWidth,
                yScale: (apricotScale * scene.current?.clientWidth * .45 ) / textureWidth,
              },
            },
              });
              Composite.add(engine.world, apricot);

          // Get the canvas element
    const canvas = scene.current;

    if (canvas) {
      // Add a mouse click event listener to the canvas
      canvas.addEventListener('click', () => {
        console.log('Clicked');
        Composite.allBodies(engine.world).forEach((body) => {
          // For each fruit
          if (body.isStatic) return; // Skip static bodies

          // Generate a stronger random force
          const force = {
            x: Math.random() * 2 - 1, // Random value between -1 and 1
            y: Math.random() * 2 - 1
          };

          // Apply the force to the fruit
          Body.applyForce(body, body.position, force);
        });
      });
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

    Composite.add(engine.world, basket);

    Composite.add(engine.world, mouseConstraint);


    // ...


    interface Event {
      source: {
        world: {
          bodies: Body[];
        };
      };
    }

    const limitMaxSpeed = (event: Event) => {
      event.source.world.bodies.forEach((body: Body) => {
        let maxSpeed: number = 10;
        Matter.Body.setVelocity(body, {
          x: Math.min(maxSpeed, Math.max(-maxSpeed, body.velocity.x)),
          y: Math.min(maxSpeed, Math.max(-maxSpeed, body.velocity.y)),
        });
      });
    };
    Matter.Events.on(engine, 'beforeUpdate', limitMaxSpeed)

    let barriers = [ground, leftWall, rightWall];
    Events.on(mouseConstraint, 'startdrag', (event) => {
      const body = event.body;

      // Store the original inertia of the body
      body.originalInertia = body.inertia;

      // Check if the body being dragged is colliding with any of the barriers
      const collisions = Query.collides(body, barriers);
      if (collisions.length > 0) {
        // If it is, set its inertia to Infinity
        Body.set(body, {
          inertia: Infinity
        });
      }
    });

    Events.on(mouseConstraint, 'enddrag', (event) => {
      const body = event.body;

      // Reset the inertia back to its original value
      Body.set(body, {
        inertia: body.originalInertia
      });

      // Remove the original inertia from the body
      delete body.originalInertia;
    });




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
      <div ref={scene} className="fruit-container"></div>;
    </>
  );
}
