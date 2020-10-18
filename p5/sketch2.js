const Scintillating = () => {
    return (sketch) => {
        sketch.setup = () => {
            sketch.createCanvas(500, 500);
        }

        sketch.draw = () => {
            sketch.background(0);

            for (let i = 50; i < sketch.height; i += 50) {
                for (let j = 50; j < sketch.width; j += 50) {
                    sketch.stroke(150);
                    sketch.strokeWeight(10);
                    sketch.line(0, i, sketch.width, i);
                    sketch.line(j, 0, j, sketch.height);
                }
            }

            for (let i = 50; i < sketch.width; i += 50) {
                for (let j = 50; j < sketch.height; j += 50) {
                    sketch.noStroke()
                    sketch.fill(255)
                    sketch.ellipse(i, j, 18, 18)

                }
            }

        }
    }
}
const Ebbinghaus = () => {
    return (sketch) => {
        sketch.setup = () => {
            sketch.createCanvas(600, 400);
        }

        sketch.draw = () => {
            sketch.background(220);

            let k = sketch.map(sketch.mouseX, 0, sketch.width, 200, 0);

            sketch.noStroke();
            sketch.fill('yellow');
            sketch.ellipse(160, 200, 50, 50);

            sketch.fill(155, 0, 215, k);

            sketch.ellipse(110, 120, 90, 90);
            sketch.ellipse(210, 120, 90, 90);

            sketch.ellipse(110, 280, 90, 90);
            sketch.ellipse(210, 280, 90, 90);

            sketch.ellipse(60, 200, 90, 90);
            sketch.ellipse(260, 200, 90, 90);

            sketch.fill('yellow');
            sketch.ellipse(450, 200, 50, 50);

            sketch.fill(155, 0, 215, k);

            sketch.ellipse(450, 154, 25, 25);
            sketch.ellipse(450, 246, 25, 25);

            sketch.ellipse(400, 200, 25, 25);
            sketch.ellipse(500, 200, 25, 25);

            sketch.ellipse(415, 235, 25, 25);
            sketch.ellipse(485, 235, 25, 25);

            sketch.ellipse(415, 164, 25, 25);
            sketch.ellipse(485, 164, 25, 25);

        }
    }
}

const Dots = () => {
    let angle = 0

    return (sketch) => {
        sketch.setup = () => {
            sketch.createCanvas(520, 500);
        }

        sketch.draw = () => {
            sketch.background('blue');

            for (let i = 50; i < sketch.width - 50; i += 50) {
                for (let j = 50; j < sketch.height - 50; j += 50) {
                    sketch.push()
                    sketch.translate(i, j)
                    sketch.rotate(sketch.HALF_PI + i + angle)
                    sketch.fill('green')
                    sketch.stroke('blue')
                    sketch.strokeWeight(3)
                    sketch.arc(0, 0, 30, 30, 0, sketch.PI + j)
                    sketch.pop()

                    sketch.push()
                    sketch.translate(i, j)
                    sketch.rotate(sketch.QUARTER_PI + j + angle)
                    sketch.fill('green')
                    sketch.strokeWeight(3)
                    sketch.stroke('cyan')
                    sketch.arc(0, 0, 30, 30, sketch.PI + i, 0)
                    sketch.pop()

                    angle += 0.0003;
                }
            }
        }
    }
}

const cafeWall = () => {
    let xwidth;
    let yheight;
    let offset;
    let colsx;
    let rowsy;
    let squaresize;
    let off1 = 0.01;
    let off2 = 0.01;
    let multiplier = 0.005;
    let sketchswitch = false;



    return (sketch) => {
        sketch.setup = () => {
            sketch.createCanvas(600, 600);
            //frameRate(180);
            sketch.background('#013b56');
            //smooth(0);
            sketch.noStroke();
            squaresize = 40;
            colsx = sketch.width / squaresize;
            rowsy = sketch.height / squaresize;
            xwidth = sketch.width / colsx;
            yheight = (sketch.height / rowsy);
        }

        sketch.draw = () => {
            if (sketchswitch) {
                off1 = sketch.map(sketch.mouseX, 0, sketch.width, 0, 1);
                off2 = off1 * 2;
                render(off1, off2);
            } else {
                off1 = off1 + multiplier;
                off2 = off1 * 2;
                render(off1, off2);
                if ((off1 > 0.4) || (off1 < 0)) {
                    multiplier = multiplier * -1;
                }
            }
        }

        const render = (offsetscale1, offsetscale2) => {
            for (let y = 0; y < rowsy + 1; y++) {
                for (let x = -2; x < colsx + 1; x++) {
                    if ((y + 4) % 4 == 0) {
                        offset = 0;
                    }
                    if (((y + 4) % 4 == 1) || ((y + 4) % 4 == 3)) {
                        offset = xwidth * offsetscale1;
                    }
                    if ((y + 4) % 4 == 2) {
                        offset = xwidth * offsetscale2;
                    }
                    if (x % 2 == 0) {
                        sketch.fill('#c0deed');
                        sketch.rect(x * xwidth + offset, y * yheight, xwidth, yheight);
                    } else {
                        sketch.fill('#013b56');
                        sketch.rect(x * xwidth + offset, y * yheight, xwidth, yheight);
                    }
                }
            }
            for (let y = 0; y < rowsy + 1; y++) {
                sketch.fill('#87672c');
                sketch.rect(0, y * yheight, sketch.width, squaresize / 10);
            }
        }

        sketch.mouseClicked = () => {
            off1 = 0;
            sketchswitch = !sketchswitch;
        }
    }
}