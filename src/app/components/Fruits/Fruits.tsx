'use client';

import './Fruits.scss';
import { useEffect, useRef } from 'react';
import Matter, { Vertices, Body } from 'matter-js';

import 'pathseg';
import createEllipseVertices from './createEllipseVertices';
import Basket from '@/assets/images/basket.svg';
import WideBasket from '@/assets/images/wide-basket.svg';

export default function Fruits() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scene.current) return;

    const isDesktop = window.innerWidth > 979;

    /* ************ engine and renderer initialization + config ***************** */
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite;

    const engine = Engine.create();

    if (isDesktop) {
      engine.gravity.y = 2;
    } else {
      engine.gravity.y = 1.3;
    }

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

    // Default values are for Desktop
    let basketElement = document.querySelector(
      '.wide-fruits-basket'
    ) as HTMLDivElement;
    let navBarWidth = Math.min(
      470,
      Math.max(250, 200 + (11 / 100) * window.innerWidth)
    );
    let basketBottomRatio = 0.115;

    if (!isDesktop) {
      basketElement = document.querySelector(
        '.fruits-basket'
      ) as HTMLDivElement;
      navBarWidth = 0;
      basketBottomRatio = 0.2;
    }
    const basketRect = basketElement.getBoundingClientRect();
    const basketPadding = parseFloat(
      window.getComputedStyle(basketElement).paddingLeft
    );
    const basketBottomDistance = basketBottomRatio * basketRect.width + 5;

    const basketHeightTest = basketRect.height;
    const leftSlant = Bodies.rectangle(
      basketRect.left - navBarWidth,
      basketRect.top + basketHeightTest / 2,
      basketPadding * 1 + basketBottomDistance,
      basketHeightTest,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0.01, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );
    const rightSlant = Bodies.rectangle(
      basketRect.right - navBarWidth,
      basketRect.top + basketHeightTest / 2,
      basketPadding * 1 + basketBottomDistance,
      basketHeightTest,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0.01, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );

    Body.rotate(leftSlant, -0.0675 * Math.PI);
    Body.rotate(rightSlant, 0.0675 * Math.PI);
    Body.setPosition(leftSlant, {
      x: leftSlant.position.x,
      y: leftSlant.position.y + 15
    });
    Body.setPosition(rightSlant, {
      x: rightSlant.position.x,
      y: rightSlant.position.y + 15
    });

    const barrierWidth = 500;
    let width = scene.current?.clientWidth ?? 0; // Provide default value of 0 if undefined
    let height = scene.current?.clientHeight ?? 0; // Provide default value of 0 if undefined

    const ground = Bodies.rectangle(
      width / 2,
      scene.current.clientHeight,
      scene.current.clientWidth,
      25,
      {
        isStatic: true,
        friction: 0.1, // Adjust this value, 0 means no friction
        restitution: 0.1,
        render: {
          fillStyle: 'transparent'
        }
      }
    );

    const topWall = Bodies.rectangle(width / 2, -height * 2, width, 100, {
      isStatic: true,
      frictionStatic: 0,
      friction: 0,
      restitution: 0.1,
      render: {
        fillStyle: 'transparent'
      }
    });

    const leftWall = Bodies.rectangle(
      -barrierWidth / 2,
      height / 2,
      isDesktop ? barrierWidth : barrierWidth + (basketPadding * 2) / 2.5,
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
      isDesktop ? barrierWidth : barrierWidth + (basketPadding * 2) / 2.5,
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

    Composite.add(engine.world, [
      ground,
      topWall,
      leftWall,
      rightWall,
      leftSlant,
      rightSlant
    ]);

    /* ********************* define and add text ***************************** */

    let wordBoxScale = window.innerWidth / 1700;
    let wordSpriteScale = wordBoxScale * 0.98;
    if (!isDesktop) {
      // Make the box scale on mobile depend on width and height
      wordBoxScale =
        0.2 +
        (0.3 * window.innerWidth) / 1700 +
        (0.35 * window.innerHeight) / 1700;
      wordSpriteScale = wordBoxScale * 0.99;
    }
    const wordsList = [
      {
        // DESIGN
        textWidth: 256,
        textHeight: 55,
        svgPath: '/textures/wordFour.svg'
      },
      {
        // CO
        textWidth: 102,
        textHeight: 53,
        svgPath: '/textures/wordTwo.svg'
      },

      {
        // UP-GRADE
        // 360 55
        textWidth: 360,
        textHeight: 55,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // 2024
        textWidth: 181,
        textHeight: 55,
        svgPath: '/textures/wordThree.svg'
      }
    ];

    const responsivenessValue =
      scene.current?.clientWidth * 0.8 + scene.current?.clientHeight * 0.3;
    let initialXPercentage = 0.23;
    if (!isDesktop) {
      initialXPercentage = 0.18;
    }

    // Create Words
    wordsList.forEach((word, index) => {
      const { textWidth, textHeight, svgPath } = word;
      const posX =
        index * (scene.current?.clientWidth ?? 0) * initialXPercentage + 100;
      const posY = -200 - index * (scene.current?.clientHeight ?? 0) * 0.4;
      const rotationAngle = Math.random() * 2 * Math.PI;
      const rotationSpeed = Math.random() * 0.1 - 0.05;
      let width = textWidth * wordBoxScale;
      let height = textHeight * wordBoxScale;

      // Create rectangle body
      const rectangle = Bodies.rectangle(posX, posY, width, height, {
        isStatic: false,
        velocity: { x: 0, y: 0 },
        restitution: 0.1,
        mass: 3.5,
        render: {
          strokeStyle: 'black',
          fillStyle: 'black',
          lineWidth: 1,
          sprite: {
            texture: svgPath,
            xScale: wordSpriteScale,
            yScale: wordSpriteScale
          }
        }
      });
      Body.rotate(rectangle, rotationAngle); // Rotate the rectangle
      Body.setAngularSpeed(rectangle, rotationSpeed); // Set the angular speed of the rectangle
      Composite.add(engine.world, rectangle);
    });

    const spritePaddingMultiplier = 0.98;

    const watermelonTexture = { x: 709, y: 844 };
    const watermelonRatio = watermelonTexture.x / watermelonTexture.y;
    const watermelonScale = 0.25;
    const watermelonRy = responsivenessValue * watermelonScale;
    const watermelonRx = watermelonRy * watermelonRatio;
    const watermelonShape = createEllipseVertices({
      cx: 0,
      cy: 0,
      rx: watermelonRx,
      ry: watermelonRy,
      steps: 16
    });
    const watermelon = Bodies.fromVertices(
      scene.current?.clientWidth * 0.67,
      scene.current?.clientHeight * -0.2,
      [Vertices.hull(watermelonShape)],
      {
        restitution: 0.1, //Bounciness
        mass: 4,
        render: {
          fillStyle: 'black',
          sprite: {
            texture: '/textures/watermelon.webp',
            xScale:
              (watermelonRx / (watermelonTexture.x / 2)) *
              spritePaddingMultiplier,
            yScale:
              (watermelonRy / (watermelonTexture.y / 2)) *
              spritePaddingMultiplier
          }
        }
      }
    );

    Composite.add(engine.world, watermelon);

    const apricotTexture = { x: 295, y: 383 };
    const apricotRatio = apricotTexture.x / apricotTexture.y;
    const apricotScale = 0.135;
    const apricotRy = responsivenessValue * apricotScale;
    const apricotRx = apricotRy * apricotRatio;
    const apricotShape = createEllipseVertices({
      cx: 0,
      cy: 0,
      rx: apricotRx,
      ry: apricotRy,
      steps: 30
    });
    const apricot = Bodies.fromVertices(
      scene.current?.clientWidth * 0.17,
      scene.current?.clientHeight * -0.5,
      [Vertices.hull(apricotShape)],
      {
        restitution: 0.1, //Bounciness
        mass: 2,
        render: {
          fillStyle: 'black',
          sprite: {
            texture: '/textures/apricot.webp',
            xScale:
              (apricotRx / (apricotTexture.x / 2)) * spritePaddingMultiplier,
            yScale:
              (apricotRy / (apricotTexture.y / 2)) * spritePaddingMultiplier
          }
        }
      }
    );
    Composite.add(engine.world, apricot);

    //Create Cherry
    const cherryTexture = { x: 294, y: 1300 };
    const cherryRatio = cherryTexture.x / cherryTexture.y;
    const cherryBallRatio = 288 / 270;
    const cherryScale = 0.18;
    const cherryRy = responsivenessValue * cherryScale;
    const cherryRx = cherryRy * cherryRatio;

    const cherryShape = createEllipseVertices({
      cx: 0,
      cy: 0,
      rx: cherryRx * cherryBallRatio,
      ry: cherryRx,
      steps: 30
    });
    const cherry = Bodies.fromVertices(
      scene.current?.clientWidth * (Math.random() * 0.3 + 0.2),
      scene.current?.clientHeight * -1.2,
      [Vertices.hull(cherryShape)],
      {
        restitution: 0.1, //Bounciness
        mass: 1,
        render: {
          fillStyle: 'black',
          sprite: {
            texture: '/textures/centered-cherry.webp',
            xScale:
              (cherryRx / (cherryTexture.x / 2)) * spritePaddingMultiplier,
            yScale: (cherryRy / (cherryTexture.y / 2)) * spritePaddingMultiplier
          }
        }
        // isStatic: true
      }
    );
    Composite.add(engine.world, cherry);

    // Get the canvas element
    const canvas = scene.current;

    if (canvas) {
      // Add a mouse click event listener to the canvas
      canvas.addEventListener('click', () => {
        Composite.allBodies(engine.world).forEach(body => {
          // For each fruit
          if (body.isStatic) return; // Skip static bodies

          // Generate a stronger random force
          let force = {
            x: Math.round(Math.random()) * 10 - 5, // Random value between -50 and 50
            y: Math.round(Math.random()) * -100 - 100
          };

          if (!isDesktop) {
            force = {
              x: Math.round(Math.random()) * 10 - 5, // Random value between -50 and 50
              y: Math.round(Math.random()) * -30 - 5
            };
          }

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

    /* ************************** handle window resizing ********************** */
    const handleResize = () => {
      if (!scene.current) return; // Add null check

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
  }, []);

  return (
    <>
      <div ref={scene} className="fruit-container">
        <Basket className="fruits-basket" />
        <WideBasket className="wide-fruits-basket" />
      </div>
    </>
  );
}
