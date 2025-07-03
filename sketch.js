
        let cubes = [];
        const numCubes = 70;
        const connectionDistance = 180;
        let rotationSpeed = 0.0008;
        let mouseInfluence = 0.0003;


        let clickActive = false; 

        function setup() {
   
            let container = select('#p5-container');
            let canvas = createCanvas(container.width, container.height, WEBGL);
            canvas.parent('p5-container'); 
            pixelDensity(1); 

       
            for (let i = 0; i < numCubes; i++) {
                cubes.push(new CubeParticle());
            }

      
            ambientLight(60); 
            directionalLight(255, 255, 255, 0.5, 1, 0); 
            pointLight(138, 43, 226, 0, 0, 200); 
        }

        function draw() {
            background(18, 18, 18); 

            rotateY(frameCount * rotationSpeed);
            rotateX(frameCount * rotationSpeed * 0.5);
            rotateZ(frameCount * rotationSpeed * 0.2);


            if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
                let mouseXNorm = map(mouseX, 0, width, -1, 1);
                let mouseYNorm = map(mouseY, 0, height, -1, 1);
                rotateY(mouseXNorm * mouseInfluence);
                rotateX(mouseYNorm * mouseInfluence);
            }


            for (let i = 0; i < cubes.length; i++) {
                cubes[i].update(); 

  
                if (clickActive) {
                    cubes[i].display(color(255, 192, 203)); 
                } else {
                    cubes[i].display(color(255)); 
                }
                
                cubes[i].checkEdges(); 

    
                for (let j = i; j < cubes.length; j++) {
                    let d = dist(cubes[i].pos.x, cubes[i].pos.y, cubes[i].pos.z,
                                 cubes[j].pos.x, cubes[j].pos.y, cubes[j].pos.z);
                    if (d < connectionDistance) {
                   
                        let alpha = map(d, 0, connectionDistance, 255, 0);
                        stroke(138, 43, 226, alpha); 
                        strokeWeight(2);
                        line(cubes[i].pos.x, cubes[i].pos.y, cubes[i].pos.z,
                             cubes[j].pos.x, cubes[j].pos.y, cubes[j].pos.z);
                    }
                }
            }
        }


        function windowResized() {
            let container = select('#p5-container');
            resizeCanvas(container.width, container.height);
        }


        function mousePressed() {
 
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                clickActive = true;
            }
        }


        function mouseReleased() {

            clickActive = false;
        }


        class CubeParticle {
            constructor() {

                this.pos = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-400, 400));
                this.vel = p5.Vector.random3D();
                this.vel.mult(random(0.5, 1.5));
                this.size = random(15, 30);


                this.rotationX = random(TWO_PI);
                this.rotationY = random(TWO_PI);
                this.rotationZ = random(TWO_PI);
                this.rotationSpeedX = random(-0.01, 0.01);
                this.rotationSpeedY = random(-0.01, 0.01);
                this.rotationSpeedZ = random(-0.01, 0.01);
            }

            update() {
                this.pos.add(this.vel); 
                this.rotationX += this.rotationSpeedX;
                this.rotationY += this.rotationSpeedY;
                this.rotationZ += this.rotationSpeedZ;
            }

            display(cubeColor) {
                push(); 
                translate(this.pos.x, this.pos.y, this.pos.z); 
                rotateX(this.rotationX); 
                rotateY(this.rotationY);
                rotateZ(this.rotationZ);

                fill(cubeColor); 
                stroke(0); 
                strokeWeight(0.8); 

                box(this.size); 
                pop(); 
            }

            checkEdges() {
        
                let margin = 150;
                let xLimit = width / 2;
                let yLimit = height / 2;
                let zLimit = 400;

         
                if (this.pos.x > xLimit + margin) this.pos.x = -xLimit - margin;
                if (this.pos.x < -xLimit - margin) this.pos.x = xLimit + margin;
                if (this.pos.y > yLimit + margin) this.pos.y = -yLimit - margin;
                if (this.pos.y < -yLimit - margin) this.pos.y = yLimit + margin;
                if (this.pos.z > zLimit + margin) this.pos.z = -zLimit - margin;
                if (this.pos.z < -zLimit - margin) this.pos.z = zLimit + margin;
            }
        }