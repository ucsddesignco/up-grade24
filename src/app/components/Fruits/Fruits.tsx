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
    engine.gravity.y = 1.5;
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

    // Default values are for Desktop
    let basketElement = document.querySelector(
      '.wide-fruits-basket'
    ) as HTMLDivElement;
    let navBarWidth = Math.min(
      470,
      Math.max(250, 200 + (11 / 100) * window.innerWidth)
    );
    let basketBottomRatio = 0.115;
    let slantHeightFactor = 3;

    if (window.innerWidth < 979) {
      basketElement = document.querySelector(
        '.fruits-basket'
      ) as HTMLDivElement;
      navBarWidth = 0;
      basketBottomRatio = 0.2;
      slantHeightFactor = 7;
    }
    const basketRect = basketElement.getBoundingClientRect();
    const padding = parseFloat(
      window.getComputedStyle(basketElement).paddingLeft
    );
    const basketBottomDistance = basketBottomRatio * basketRect.width + 5;

    const basketHeightTest = basketRect.height;
    const leftSlant = Bodies.rectangle(
      basketRect.left - navBarWidth,
      basketRect.top + basketHeightTest / 2,
      padding * 1 + basketBottomDistance,
      basketHeightTest * slantHeightFactor,
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
      padding * 1 + basketBottomDistance,
      basketHeightTest * slantHeightFactor,
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

    Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      leftSlant,
      rightSlant
    ]);

    /* ********************* define and add text ***************************** */
    const wordBoxScale = window.innerWidth / 1700;
    const wordSpriteScale = wordBoxScale * 0.98;
    const wordBoxScaleMobile =
      0.2 +
      (0.3 * window.innerWidth) / 1700 +
      (0.35 * window.innerHeight) / 1700;
    const wordSpriteScaleMobile = wordBoxScaleMobile * 0.98;
    const wordsDesktop = [
      {
        // DESIGN
        textWidth: 256,
        textHeight: 55,
        boxScale: wordBoxScale,
        spriteScale: wordSpriteScale,
        svgPath: '/textures/wordFour.svg'
      },
      {
        // CO
        textWidth: 102,
        textHeight: 53,
        boxScale: wordBoxScale,
        spriteScale: wordSpriteScale,
        svgPath: '/textures/wordTwo.svg'
      },

      {
        // UP-GRADE
        // 360 55
        textWidth: 360,
        textHeight: 55,
        boxScale: wordBoxScale,
        spriteScale: wordSpriteScale,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // 2024
        textWidth: 181,
        textHeight: 55,
        boxScale: wordBoxScale,
        spriteScale: wordSpriteScale,
        svgPath: '/textures/wordThree.svg'
      }
    ];
    const wordsMobile = [
      {
        // DESIGN
        textWidth: 200,
        textHeight: 55,
        boxScale: wordBoxScaleMobile,
        spriteScale: wordSpriteScaleMobile,
        svgPath: '/textures/wordFour.svg'
      },
      {
        // CO
        textWidth: 100,
        textHeight: 55,
        boxScale: wordBoxScaleMobile,
        spriteScale: wordSpriteScaleMobile,
        svgPath: '/textures/wordTwo.svg'
      },

      {
        // UP-GRADE
        textWidth: 360,
        textHeight: 55,
        boxScale: wordBoxScaleMobile,
        spriteScale: wordSpriteScaleMobile,
        svgPath: '/textures/wordOne.svg'
      },
      {
        // 2024
        textWidth: 180,
        textHeight: 55,
        boxScale: wordBoxScaleMobile,
        spriteScale: wordSpriteScaleMobile,
        svgPath: '/textures/wordThree.svg'
      }
    ];

    const responsivenessValue =
      scene.current?.clientWidth * 0.8 + scene.current?.clientHeight * 0.3;

    // Create Words
    if (isDesktop) {
      wordsDesktop.forEach((word, index) => {
        const { textWidth, textHeight, boxScale, spriteScale, svgPath } = word;
        const posX = index * (scene.current?.clientWidth ?? 0) * 0.25 + 100;
        const posY = -200 - index * (scene.current?.clientHeight ?? 0) * 0.4;
        const rotationAngle = Math.random() * 2 * Math.PI;
        const rotationSpeed = Math.random() * 0.1 - 0.05;
        let width = textWidth * boxScale;
        let height = textHeight * boxScale;

        // Create rectangle body
        const rectangle = Bodies.rectangle(posX, posY, width, height, {
          isStatic: false,
          velocity: { x: 0, y: 0 },
          restitution: 0.1,
          mass: 1,
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
        // const rotationAngle = Math.random() * 0 * Math.PI;
        const rotationAngle = 0.1 * Math.PI;
        const rotationSpeed = Math.random() * 0.1 - 0.05;
        let width = textWidth * boxScale;
        let height = textHeight * boxScale;

        // Create rectangle body
        const rectangle = Bodies.rectangle(posX, posY, width, height, {
          isStatic: false,
          velocity: { x: 0, y: 0 },
          restitution: 0.1,
          mass: 1,
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
        mass: 3,
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
      steps: 20
    });
    const apricot = Bodies.fromVertices(
      scene.current?.clientWidth * 0.17,
      scene.current?.clientHeight * -0.5,
      [Vertices.hull(apricotShape)],
      {
        restitution: 0.1, //Bounciness
        mass: 1.5,
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
      steps: 20
    });
    const cherry = Bodies.fromVertices(
      scene.current?.clientWidth * (Math.random() * 0.3 + 0.3),
      scene.current?.clientHeight * -1.2,
      [Vertices.hull(cherryShape)],
      {
        restitution: 0.1, //Bounciness
        mass: 0.75,
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
