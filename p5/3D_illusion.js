const PenroseTriangle = () => {
    return (sketch) => {
        let flag = false;
        let cam;

        sketch.setup = () => {
            sketch.createCanvas(500, 400, sketch.WEBGL);
            cam = sketch.createCamera();
            cam.setPosition(180, 180, 180);
            cam.lookAt(0, 0, 0);
            cam.ortho();
        }

        sketch.draw = () => {
            sketch.background(0);
            sketch.setCamera(cam);

            if (flag) {
                sketch.rotateY(- sketch.frameCount * 0.1)
            } else {
                sketch.orbitControl(1, 0, 0);
            }

            sketch.translate(0, -sketch.height / 3, 0);
            sketch.push();
            sketch.fill(250, 0, 0);
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 40, 0);
            sketch.push();
            sketch.fill(250, 250, 0)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 40, 0);
            sketch.push();
            sketch.fill(0, 250, 250)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 40, 0);
            sketch.push();
            sketch.fill(180, 0, 180)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 40, 0);
            sketch.push();
            sketch.fill(250, 0, 0)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 0, 40);
            sketch.push();
            sketch.fill(250, 250, 0)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 0, 40);
            sketch.push();
            sketch.fill(0, 250, 250)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 0, 40);
            sketch.push();
            sketch.fill(180, 0, 180)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(0, 0, 40);
            sketch.push();
            sketch.fill(250, 0, 0)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(-40, 0, 0);
            sketch.push();
            sketch.fill(250, 250, 0)
            sketch.box(40, 40, 40);
            sketch.pop();

            sketch.translate(-40, 0, 20);
            sketch.push();
            sketch.fill(0, 250, 250)
            sketch.plane(40);
            sketch.pop();

            sketch.translate(0, -20, -20);
            sketch.push();
            sketch.fill(0, 250, 250)
            sketch.rotateX(sketch.PI / 2);
            sketch.plane(40);
            sketch.pop();

            sketch.translate(0, 40, 0);
            sketch.push();
            sketch.fill(0, 250, 250)
            sketch.rotateX(sketch.PI / 2);
            sketch.plane(40);
            sketch.pop();

            sketch.translate(0, -20, -20);
            sketch.push();
            sketch.fill(180, 0, 180)
            sketch.plane(40);
            sketch.pop();

            sketch.translate(-40, 0, 40);
            sketch.push();
            sketch.fill(180, 0, 180)
            sketch.plane(40);
            sketch.pop();
        }

        sketch.doubleClicked = () => {
            flag = !flag;
        }
    }
}