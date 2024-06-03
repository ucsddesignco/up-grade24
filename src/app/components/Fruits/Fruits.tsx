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

    const desktopBasket = document.querySelector('.fruits-basket');
    console.log(desktopBasket);
    const leftSlant = Bodies.rectangle(
      -5 - barrierWidth / 2.1,
      height / 2,
      barrierWidth,
      height * 6,
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
      width + barrierWidth / 2.1 + 5,
      height / 2,
      barrierWidth,
      height * 6,
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

    Body.rotate(leftSlant, -0.042 * Math.PI);
    Body.rotate(rightSlant, 0.042 * Math.PI);

    if (window.innerWidth > 550) {
      Body.rotate(leftSlant, -0.03 * Math.PI);
      Body.rotate(rightSlant, 0.03 * Math.PI);
    }

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
    let basketRealWidth = 815;
    let basketRealHeight = 385;
    if (!isDesktop) {
      basketRealWidth = 296;
      basketRealHeight = 130;
    }
    basketX = width / 2;
    basketY = height * 0.75;
    basketWidth = width;
    basketHeight = height * 0.5;

    let scaleX = basketWidth / basketRealWidth;
    let scaleY = basketHeight / basketRealHeight;
    let scale = Math.min(scaleX, scaleY);

    // spriteHeight = (height * 0.5) / 385;
    // spriteWidth = width / 815;
    spriteHeight = basketRealHeight * scale;
    spriteWidth = basketRealWidth * scale;

    let basketSprite = {
      texture: '/textures/basket.png',
      xScale: spriteWidth,
      yScale: spriteHeight
    };

    if (!isDesktop) {
      basketY = height * 0.85;
      spriteHeight = (height * 0.5) / 130 / 2.8;
      spriteWidth = width / 296 / 2.8;

      basketSprite = {
        texture: '/textures/basket-mobile.png',
        xScale: spriteWidth * 2.5,
        yScale: spriteHeight * 4
      };
    }

    const basket = Bodies.rectangle(
      basketX,
      basketY,
      basketWidth,
      basketHeight,
      {
        isStatic: true,
        restitution: 0.1,
        render: {
          sprite: basketSprite
        }
      }
    );

    basket.collisionFilter = {
      group: -1,
      category: 2,
      mask: 0
    };

    /* ********************* define and add text ***************************** */
    const wordBoxScale = 1;
    const wordSpriteScale = 0.8;
    const wordBoxScaleMobile = 0.6;
    const wordSpriteScaleMobile = 0.5;
    const wordsDesktop = [
      {
        // DESIGN
        textWidth: 200,
        textHeight: 55,
        boxScale: wordBoxScale,
        spriteScale: wordSpriteScale,
        svgPath: '/textures/wordFour.svg'
      },
      {
        // CO
        textWidth: 100,
        textHeight: 55,
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
        textWidth: 180,
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
          mass: 3,
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

    if (isDesktop) {
      //Create Cherry
      let cherryScale = 0.15;

      const cherryShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * cherryScale * 1,
        rx: scene.current?.clientWidth * cherryScale * 0.47,
        steps: 20
      });
      const textureWidth = 150;
      const cherry = Bodies.fromVertices(
        scene.current?.clientWidth * (Math.random() * 0.5 + 0.3),
        scene.current?.clientHeight * -0.5,
        [Vertices.hull(cherryShape)],
        {
          restitution: 0.1, //Bounciness
          mass: 2,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/cherry.webp',
              xScale:
                (cherryScale * scene.current?.clientWidth * 0.36) /
                textureWidth,
              yScale:
                (cherryScale * scene.current?.clientWidth * 0.36) / textureWidth
            }
          },
          isStatic: true
        }
      );
      Composite.add(engine.world, cherry);
      const cherryDelay = 1;
      // Delay the falling of the cherry
      setTimeout(() => {
        Body.setStatic(cherry, false);
      }, cherryDelay * 1000);

      // const watermelonRatio = 799/844;
      const watermelonScale = 0.2;
      const watermelonShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * watermelonScale * 1.2,
        rx: scene.current?.clientWidth * watermelonScale * 1,
        steps: 16
      });
      const watermelon = Bodies.fromVertices(
        scene.current?.clientWidth * 1,
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
                (watermelonScale * scene.current?.clientWidth * 0.423) /
                textureWidth,
              yScale:
                (watermelonScale * scene.current?.clientWidth * 0.423) /
                textureWidth
            }
          }
        }
      );

      Composite.add(engine.world, watermelon);

      const apricotScale = 0.15;
      const apricotRatio = 295 / 383;
      const apricotShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * apricotScale * 1,
        rx: scene.current?.clientWidth * apricotScale * apricotRatio,
        steps: 20
      });
      const apricot = Bodies.fromVertices(
        scene.current?.clientWidth * 0.1,
        scene.current?.clientHeight * -0.4,
        [Vertices.hull(apricotShape)],
        {
          restitution: 0.1, //Bounciness
          mass: 5,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/apricot.webp',
              xScale:
                (apricotScale * scene.current?.clientWidth * 0.75) /
                textureWidth,
              yScale:
                (apricotScale * scene.current?.clientWidth * 0.75) /
                textureWidth
            }
          }
        }
      );
      Composite.add(engine.world, apricot);
    } else {
      // MOBILE ---------------------------------------------

      //Create Cherry
      let cherryScale = 0.15;
      let cherryRatio = 68 / 179;

      const cherryShape = createEllipseVertices({
        cx: 0,
        cy: 0,
        ry: scene.current?.clientWidth * cherryScale,
        rx: scene.current?.clientWidth * cherryScale * cherryRatio,
        steps: 20
      });
      const textureWidth = 150;
      const cherry = Bodies.fromVertices(
        scene.current?.clientWidth * 0.3,
        scene.current?.clientHeight * -0.2,
        [Vertices.hull(cherryShape)],
        {
          restitution: 0.1, //Bounciness
          mass: 2,
          render: {
            fillStyle: 'black',
            sprite: {
              texture: '/textures/cherry.webp',
              xScale:
                (cherryScale * scene.current?.clientWidth * 0.4) / textureWidth,
              yScale:
                (cherryScale * scene.current?.clientWidth * 0.4) / textureWidth
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
          restitution: 0.1, //Bounciness
          mass: 3,
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
        scene.current?.clientHeight * -1,
        [Vertices.hull(apricotShape)],
        {
          restitution: 0.1, //Bounciness
          mass: 2,
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

    // Temporarily don't render basket
    // Composite.add(engine.world, basket);

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
  }, []);

  return (
    <>
      <div ref={scene} className="fruit-container">
        {/* <Image src={} /> */}
        <Basket className="fruits-basket" />
        <WideBasket className="wide-fruits-basket" />
      </div>
    </>
  );
}
