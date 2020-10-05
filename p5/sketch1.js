
const kernels = {
    blur: [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16]
    ],
    emboss: [
        [-2, -1, 0],
        [-1, 1, 1],
        [0, 1, 2]
    ],
    identity: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    leftSobel: [
        [1, 0, -1],
        [2, 0, -2],
        [1, 0, -1]
    ],
    rightSobel: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ],
    topSobel: [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]
    ],
    bottomSobel: [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ],
    outline1: [
        [1, 0, -1],
        [0, 0, 0],
        [-1, 0, 1]
    ],
    outline2: [
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0]
    ],
    outline3: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
    ],
    sharpen: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ],
    avgRGB: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    luma240: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    luma601: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    luma709: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
}

let effect = kernels.blur;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sketch #1
const s1 = (imgPath, imgWidth, imgHeight) => {
    return (sketch) => {
        let img;

        sketch.preload = () => {
            img = sketch.loadImage(imgPath);
        }

        sketch.setup = () => {
            sketch.createCanvas(imgWidth, imgHeight);
            sketch.image(img, 0, 0, imgWidth, imgHeight);
        }
    }
}

// Sketch #2
const s2 = (imgPath, imgWidth, imgHeight) => {
    return (sketch) => {
        let img;
        let imgRed = [];
        let imgGreen = [];
        let imgBlue = [];

        let init, end;
        let histofilter = false;

        let maxRange = 256;
        let hist = new Array(maxRange);

        for (let i = 0; i < maxRange; i++) {
            hist[i] = 0
        }

        let click = 0;
        let fclick = [0, 255];

        sketch.preload = () => {
            img = sketch.loadImage(imgPath);
        }

        sketch.setup = () => {
            sketch.createCanvas(imgWidth, imgHeight);
            sketch.pixelDensity(1);
            sketch.image(img, 0, 0, imgWidth, imgHeight);

            sketch.loadPixels();

            for (let a = 0, x = 0; x < sketch.width; a++, x++) {
                imgRed.push([]);
                imgGreen.push([]);
                imgBlue.push([]);

                for (let y = 0; y < sketch.height; y++) {
                    let i = (x + y * sketch.width) * 4;

                    imgRed[a].push(sketch.pixels[i]);
                    imgGreen[a].push(sketch.pixels[i + 1]);
                    imgBlue[a].push(sketch.pixels[i + 2]);
                }
            }

            for (let x = 0; x < sketch.width; x++) {
                for (let y = 0; y < sketch.height; y++) {
                    let k = (x + y * sketch.width) * 4;

                    if (!(x == 0 || x == sketch.width - 1 || y == 0 || y == sketch.height - 1)) {
                        let convRed = 0;
                        let convGreen = 0;
                        let convBlue = 0;

                        for (let a = 0, i = x - 1; a < 3; a++, i++) {
                            for (let b = 0, j = y - 1; b < 3; b++, j++) {
                                convRed += imgRed[i][j] * effect[b][a];
                                convGreen += imgGreen[i][j] * effect[b][a];
                                convBlue += imgBlue[i][j] * effect[b][a];
                            }
                        }

                        if (effect == kernels.avgRGB) {
                            let avgPixel = (convRed + convGreen + convBlue) / 3;

                            sketch.pixels[k] = avgPixel;
                            sketch.pixels[k + 1] = avgPixel;
                            sketch.pixels[k + 2] = avgPixel;
                        }

                        else if (effect == kernels.luma240) {
                            let avgPixel = parseInt((0.212 * convRed + 0.701 * convGreen + 0.087 * convBlue) / 3);

                            sketch.pixels[k] = avgPixel;
                            sketch.pixels[k + 1] = avgPixel;
                            sketch.pixels[k + 2] = avgPixel;
                        }

                        else if (effect == kernels.luma601) {
                            let avgPixel = parseInt((0.2989 * convRed + 0.5870 * convGreen + 0.1140 * convBlue) / 3);

                            sketch.pixels[k] = avgPixel;
                            sketch.pixels[k + 1] = avgPixel;
                            sketch.pixels[k + 2] = avgPixel;
                        }

                        else if (effect == kernels.luma709) {
                            let avgPixel = parseInt((0.2126 * convRed + 0.7152 * convGreen + 0.0722 * convBlue) / 3);

                            sketch.pixels[k] = avgPixel;
                            sketch.pixels[k + 1] = avgPixel;
                            sketch.pixels[k + 2] = avgPixel;
                        }

                        else {
                            sketch.pixels[k] = convRed;
                            sketch.pixels[k + 1] = convGreen;
                            sketch.pixels[k + 2] = convBlue;
                        }

                        if (histofilter) {
                            sketch.colorMode(sketch.HSB, 255);
                            let c = sketch.color(convRed, convGreen, convBlue);
                            let value = sketch.brightness(c)

                            if (!(value >= init && value <= end)) {
                                sketch.pixels[k] = 255;
                                sketch.pixels[k + 1] = 255;
                                sketch.pixels[k + 2] = 255;
                            }

                            sketch.colorMode(sketch.RGB, 255);
                        }
                    }
                }
            }

            sketch.updatePixels();
            sketch.colorMode(sketch.HSB, 255);

            if (!histofilter) {
                for (let x = 0; x < imgWidth; x++) {
                    for (let y = 0; y < imgHeight; y++) {
                        let bright = sketch.int(sketch.brightness(sketch.get(x, y)));
                        hist[bright]++;
                    }
                }
            }

            // Find the largest value in the histogram
            let histMax = sketch.max(hist);

            sketch.stroke('red');
            // Draw half of the histogram (skip every second value)
            for (let i = 0; i < img.width; i += 2) {
                // Map i (from 0..img.width) to a location in the histogram (0..255)
                let which = sketch.int(sketch.map(i, 0, img.width, 0, 255));
                // Convert the histogram value to a location between 
                // the bottom and the top of the picture
                let y = sketch.int(sketch.map(hist[which], 0, histMax, imgHeight, 0));
                sketch.line(i, imgHeight, i, y);
            }

            sketch.reset();
        }

        sketch.draw = () => {
            //console.log(mouseY, mouseX)
            sketch.update();
        }

        sketch.mousePressed = () => {
            if (sketch.mouseY >= 0 && sketch.mouseY <= imgHeight) {
                if (sketch.mouseX >= 0 && sketch.mouseX <= imgWidth) {
                    if (click == 0) {
                        sketch.stroke(255, 204, 0);
                        sketch.line(sketch.mouseX, 0, sketch.mouseX, imgHeight);
                        click = 1;
                        fclick[0] = sketch.mouseX;
                        init = sketch.int(sketch.map(sketch.mouseX, 0, imgWidth, 0, 255));
                    }

                    else if (click == 1) {
                        if (fclick[0] < sketch.mouseX) {
                            sketch.stroke(255, 204, 0);
                            sketch.line(sketch.mouseX, 0, sketch.mouseX, imgHeight);
                            sketch.noStroke();
                            sketch.fill(232, 157, 15, 63);
                            sketch.rect(fclick[0], 0, sketch.mouseX - fclick[0], imgHeight);
                            end = sketch.int(sketch.map(sketch.mouseX, 0, imgWidth, 0, 255));
                            fclick[1] = sketch.mouseX;
                        } else {
                            sketch.rect(sketch.mouseX, 0, fclick[0] - sketch.mouseX, imgHeight);
                            fclick[1] = fclick[0];
                            fclick[0] = sketch.mouseX;
                        }

                        sketch.line(sketch.mouseX, 0, sketch.mouseX, imgHeight);
                        click = 2;
                        histofilter = true;
                        sketch.setup();
                        console.log(init, end)
                    }
                }
            }
        }

        sketch.reset = () => {
            histofilter = false;
            click = 0;
            fclick[0] = 0;
            fclick[1] = 255;
        }

        sketch.update = () => {
            if (sketch.mouseY >= 0 && sketch.mouseY <= imgHeight) {
                if (sketch.mouseX >= 0 && sketch.mouseX <= imgWidth) {
                    sketch.cursor(sketch.HAND);

                }
                else {
                    sketch.cursor(sketch.ARROW);
                }
            } else {
                sketch.cursor(sketch.ARROW);
            }
        }
    }
}