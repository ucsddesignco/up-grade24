'use client';

import './Fruits.scss';
import { useEffect, useRef, useState } from 'react';
import Matter, { Vertices, Body } from 'matter-js';

import 'pathseg';
import createEllipseVertices from './createEllipseVertices';

export default function Fruits() {
  const scene = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (!scene.current) return;

    console.log(window.innerWidth);

    if (window.innerWidth > 979) {
      setIsDesktop(true);
      console.log(isDesktop);
    }

    /* ************ engine and renderer initialization + config ***************** */
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite;

    const engine = Engine.create();
    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        wireframes: false,
        // debugging properties
        // showBounds: true,
        // showDebug: true,
        // showInternalEdges: true,
        // showPositions: true,
        width: scene.current?.clientWidth, // Use the width of the fruit container
        height: scene.current?.clientHeight, // Use the height of the fruit container
        pixelRatio: window.devicePixelRatio || 1,
        background: 'transparent'
      }
    });

    engine.positionIterations = 10;
    engine.velocityIterations = 10;

    /* ************** define and add container boundaries/walls ***************** */
    const barrierWidth = 500;
    let width = scene.current?.clientWidth ?? 0; // Provide default value of 0 if undefined
    let height = scene.current?.clientHeight ?? 0; // Provide default value of 0 if undefined

    const ground = Bodies.rectangle(
      width / 2,
      height + barrierWidth / 2 - 10,
      20000,
      barrierWidth,
      {
        isStatic: true,
        friction: 0.1, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );
    const leftWall = Bodies.rectangle(
      -barrierWidth / 2,
      height / 2,
      barrierWidth,
      height * 5,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );
    const rightWall = Bodies.rectangle(
      width + barrierWidth / 2,
      height / 2,
      barrierWidth,
      height * 5,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );
    const leftSlant = Bodies.rectangle(
      -5 - barrierWidth / 2,
      height / 2,
      barrierWidth,
      height * 5,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );
    const rightSlant = Bodies.rectangle(
      width + barrierWidth / 2 + 5,
      height / 2,
      barrierWidth,
      height * 5,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );

    Body.rotate(leftSlant, -0.075 * Math.PI);
    Body.rotate(rightSlant, 0.075 * Math.PI);

    Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      leftSlant,
      rightSlant
    ]);

    /* ********************* define and add basket ***************************** */
    let basketX;
    let basketY;
    let basketWidth;
    let basketHeight;
    let spriteWidth;
    let spriteHeight;

    basketX = width / 2;
    basketY = height * 0.75;
    basketWidth = width;
    basketHeight = height * 0.5;
    spriteHeight = (height * 0.5) / 385;
    spriteWidth = width / 815;

    const basket = Bodies.rectangle(
      basketX,
      basketY,
      basketWidth,
      basketHeight,
      {
        isStatic: true,
        restitution: 0.1,
        render: {
          sprite: {
            texture: '/textures/basket.png',
            xScale: spriteWidth,
            yScale: spriteHeight
          }
        }
      }
    );
    basket.collisionFilter = {
      group: -1,
      category: 2,
      mask: 0
    };

    Composite.add(engine.world, basket);

    /* ********************* define and add text ***************************** */
    const wordsDesktop = [
      {
        // DESIGN
        textWidth: 220,
        textHeight: 60,
        boxScale: 1.5,
        spriteScale: 0.8,
        svgPath: '/textures/wordFour.svg'
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
        // UP-GRADE
        textWidth: 200,
        textHeight: 40,
        boxScale: 1.8,
        spriteScale: 0.8,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // 2024
        textWidth: 220,
        textHeight: 60,
        boxScale: 1,
        spriteScale: 0.8,
        svgPath: '/textures/wordThree.svg'
      }
    ];
    const wordsMobile = [
      {
        // DESIGN
        textWidth: 220,
        textHeight: 80,
        boxScale: 0.5,
        spriteScale: 0.4,
        svgPath: '/textures/wordFour.svg'
      },
      {
        // CO
        textWidth: 220,
        textHeight: 120,
        boxScale: 0.3,
        spriteScale: 0.4,
        svgPath: '/textures/wordTwo.svg'
      },

      {
        // UP-GRADE
        textWidth: 200,
        textHeight: 40,
        boxScale: 0.9,
        spriteScale: 0.4,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // 2024
        textWidth: 220,
        textHeight: 60,
        boxScale: 0.5,
        spriteScale: 0.4,
        svgPath: '/textures/wordThree.svg'
      }
    ];

    // Create Words
    if (isDesktop) {
      wordsDesktop.forEach((word, index) => {
        const { textWidth, textHeight, boxScale, spriteScale, svgPath } = word;
        const posX = index * (scene.current?.clientWidth ?? 0) * 0.25 + 100;
        const posY = -300 - index * (scene.current?.clientHeight ?? 0) * 0.4;
        const rotationAngle = Math.random() * 2 * Math.PI;
        const rotationSpeed = Math.random() * 0.1 - 0.05;
        let width = textWidth * boxScale;
        let height = textHeight * boxScale;

        // Create rectangle body
        const rectangle = Bodies.rectangle(posX, posY, width, height, {
          isStatic: false,
          velocity: { x: 0, y: 0 },
          restitution: 0.1,
          mass: 0.0005,
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
        Body.rotate(rectangle, rotationAngle); // Rotate the rectangle
        Body.setAngularSpeed(rectangle, rotationSpeed); // Set the angular speed of the rectangle
        Composite.add(engine.world, rectangle);
      });
    } else {
      wordsMobile.forEach((word, index) => {
        const { textWidth, textHeight, boxScale, spriteScale, svgPath } = word;
        const posX = index * (scene.current?.clientWidth ?? 0) * 0.2 + 100;
        const posY = -10 - index * (scene.current?.clientHeight ?? 0) * 0.6;
        const rotationAngle = Math.random() * 2 * Math.PI;
        const rotationSpeed = Math.random() * 0.1 - 0.05;
        let width = textWidth * boxScale;
        let height = textHeight * boxScale;

        // Create rectangle body
        const rectangle = Bodies.rectangle(posX, posY, width, height, {
          isStatic: false,
          velocity: { x: 0, y: 0 },
          restitution: 0.1,
          mass: 0.0005,
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
        Body.rotate(rectangle, rotationAngle); // Rotate the rectangle
        Body.setAngularSpeed(rectangle, rotationSpeed); // Set the angular speed of the rectangle
        Composite.add(engine.world, rectangle);
      });
    }

    if (isDesktop) {
      //Create Cherry
      let cherryScale = 0.15;

      const cherryShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * cherryScale * 1,
        rx: scene.current?.clientWidth * cherryScale * 0.6,
        steps: 20
      });
      const textureWidth = 150;
      const cherry = Bodies.fromVertices(
        scene.current?.clientWidth * 0.3,
        scene.current?.clientHeight * -0.2,
        [Vertices.hull(cherryShape)],
        {
          restitution: 0.2, //Bounciness
          mass: 0.0005,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/cherry.png',
              xScale:
                (cherryScale * scene.current?.clientWidth * 1.5) / textureWidth,
              yScale:
                (cherryScale * scene.current?.clientWidth * 1.5) / textureWidth
            }
          }
        }
      );
      Composite.add(engine.world, cherry);

      const watermelonScale = 0.2;
      const watermelonShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * watermelonScale * 1.2,
        rx: scene.current?.clientWidth * watermelonScale * 1,
        steps: 16
      });
      const watermelon = Bodies.fromVertices(
        scene.current?.clientWidth * 0.6,
        scene.current?.clientHeight * -0.2,
        [Vertices.hull(watermelonShape)],
        {
          restitution: 0.2, //Bounciness
          mass: 0.01,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/watermelon.webp',
              xScale:
                (watermelonScale * scene.current?.clientWidth * 0.4) /
                textureWidth,
              yScale:
                (watermelonScale * scene.current?.clientWidth * 0.4) /
                textureWidth
            }
          }
        }
      );

      Composite.add(engine.world, watermelon);

      const apricotScale = 0.25;
      const apricotShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientHeight * apricotScale * 0.9,
        rx: scene.current?.clientWidth * apricotScale * 0.8,
        steps: 20
      });
      const apricot = Bodies.fromVertices(
        scene.current?.clientWidth * 0.2,
        scene.current?.clientHeight * -0.8,
        [Vertices.hull(apricotShape)],
        {
          restitution: 0.2, //Bounciness
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/apricot.webp',
              xScale:
                (apricotScale * scene.current?.clientWidth * 0.45) /
                textureWidth,
              yScale:
                (apricotScale * scene.current?.clientWidth * 0.45) /
                textureWidth
            }
          }
        }
      );
      Composite.add(engine.world, apricot);
    } else {
      //Create Cherry
      let cherryScale = 0.15;

      const cherryShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * cherryScale * 0.8,
        rx: scene.current?.clientWidth * cherryScale * 0.5,
        steps: 20
      });
      const textureWidth = 150;
      const cherry = Bodies.fromVertices(
        scene.current?.clientWidth * 0.3,
        scene.current?.clientHeight * -0.2,
        [Vertices.hull(cherryShape)],
        {
          restitution: 0.2, //Bounciness
          mass: 0.0005,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/cherry.png',
              xScale:
                (cherryScale * scene.current?.clientWidth * 1.5) / textureWidth,
              yScale:
                (cherryScale * scene.current?.clientWidth * 1.5) / textureWidth
            }
          }
        }
      );
      Composite.add(engine.world, cherry);

      const watermelonScale = 0.25;
      const watermelonShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * watermelonScale * 1.2,
        rx: scene.current?.clientWidth * watermelonScale * 1,
        steps: 16
      });
      const watermelon = Bodies.fromVertices(
        scene.current?.clientWidth * 0.6,
        scene.current?.clientHeight * -0.4,
        [Vertices.hull(watermelonShape)],
        {
          restitution: 0.2, //Bounciness
          mass: 0.0005,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/watermelon.webp',
              xScale:
                (watermelonScale * scene.current?.clientWidth * 0.4) /
                textureWidth,
              yScale:
                (watermelonScale * scene.current?.clientWidth * 0.4) /
                textureWidth
            }
          }
        }
      );
      Composite.add(engine.world, watermelon);

      const apricotScale = 0.15;
      const apricotShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientHeight * apricotScale * 0.9,
        rx: scene.current?.clientWidth * apricotScale * 0.8,
        steps: 20
      });
      const apricot = Bodies.fromVertices(
        scene.current?.clientWidth * 0.2,
        scene.current?.clientHeight * -1.5,
        [Vertices.hull(apricotShape)],
        {
          restitution: 0.2, //Bounciness
          mass: 0.0005,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/apricot.webp',
              xScale:
                (apricotScale * scene.current?.clientWidth * 0.8) /
                textureWidth,
              yScale:
                (apricotScale * scene.current?.clientWidth * 0.8) / textureWidth
            }
          }
        }
      );
      Composite.add(engine.world, apricot);
    }

    // Get the canvas element
    const canvas = scene.current;

    if (canvas) {
      // Add a mouse click event listener to the canvas
      canvas.addEventListener('click', () => {
        console.log('Clicked');
        Composite.allBodies(engine.world).forEach(body => {
          // For each fruit
          if (body.isStatic) return; // Skip static bodies

          // Generate a stronger random force
          const force = {
            x: Math.round(Math.random()) * 10 - 5, // Random value between -50 and 50
            y: Math.round(Math.random()) * -100 - 100
          };

          // Apply the force to the fruit
          Body.setVelocity(body, force);
        });
      });
    }

    interface Event {
      source: {
        world: {
          bodies: Body[];
        };
      };
    }

    const limitMaxSpeed = (event: Event) => {
      event.source.world.bodies.forEach((body: Body) => {
        let maxSpeed: number = 15;
        Matter.Body.setVelocity(body, {
          x: Math.min(maxSpeed, Math.max(-maxSpeed, body.velocity.x)),
          y: Math.min(maxSpeed, Math.max(-maxSpeed, body.velocity.y))
        });
      });
    };

    Matter.Events.on(engine, 'beforeUpdate', limitMaxSpeed);

    /* ************************* define mouse drag events ************************** */

    // let barriers = [ground, leftWall, rightWall];

    // const mouse = Mouse.create(render.canvas);
    // const mouseConstraint = MouseConstraint.create(engine, {
    //   mouse: mouse,
    //   constraint: {
    //     stiffness: 0.2,
    //     render: {
    //       visible: false
    //     }
    //   }
    // });

    // Composite.add(engine.world, mouseConstraint);

    // Events.on(mouseConstraint, 'startdrag', (event: any) => {
    //   const body = event.body;

    //   // Store the original inertia of the body
    //   body.originalInertia = body.inertia;

    //   // Check if the body being dragged is colliding with any of the barriers
    //   const collisions = Query.collides(body, barriers);
    //   if (collisions.length > 0) {
    //     // If it is, set its inertia to Infinity
    //     Body.set(body, {
    //       inertia: Infinity
    //     });
    //   }
    // });

    // Events.on(mouseConstraint, 'enddrag', (event: any) => {
    //   const body = event.body;

    //   // Reset the inertia back to its original value
    //   Body.set(body, {
    //     inertia: body.originalInertia
    //   });

    //   // Remove the original inertia from the body
    //   delete body.originalInertia;
    // });

    /* ************************** handle window resizing ********************** */
    const handleResize = () => {
      if (!scene.current) return; // Add null check

      console.log('resizing!');

      let newWidth = scene.current?.clientWidth ?? 0; // Provide default value of 0 if undefined
      let newHeight = scene.current?.clientHeight ?? 0; // Provide default value of 0 if undefined

      render.bounds.max.x = newWidth;
      render.bounds.max.y = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.canvas.style.width = newWidth + 'px';
      render.canvas.style.height = newHeight + 'px';

      console.log('Width:', newWidth, 'Height:', newHeight);
      console.log(newWidth / 2, newHeight + barrierWidth / 2);
      Body.setPosition(ground, {
        x: newWidth / 2,
        y: newHeight + barrierWidth / 2 - 10
      });
      Body.setPosition(leftWall, {
        x: -barrierWidth / 2,
        y: newHeight / 2
      });
      Body.setPosition(rightWall, {
        x: newWidth + barrierWidth / 2,
        y: newHeight / 2
      });
      Body.setPosition(leftSlant, {
        x: -5 - barrierWidth / 2,
        y: newHeight / 2
      });
      Body.setPosition(rightSlant, {
        x: newWidth + barrierWidth / 2 + 5,
        y: newHeight / 2
      });

      Body.setPosition(basket, {
        x: newWidth / 2,
        y: newHeight * 0.75
      });

      console.log(
        ((newWidth - width) / width) * 10,
        (newHeight - height) / height
      );

      Body.scale(basket, newWidth / width, newHeight / height);
      if (basket.render.sprite) {
        basket.render.sprite.xScale =
          (basket.render.sprite.xScale * newWidth) / width;
        basket.render.sprite.yScale =
          (basket.render.sprite.yScale * newHeight) / height;
      }

      width = newWidth;
      height = newHeight;

      Engine.update(engine, 0);
    };

    window.addEventListener('resize', handleResize);

    /* ************************ run renderer  ******************************** */
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    /* ********************** clean up before unmouting *********************** */

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesktop]);

  return <div ref={scene} className="fruit-container" />;
}
