
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
}

let effect = kernels.blur;

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
                                convRed += imgRed[i][j] * effect[a][b];
                                convGreen += imgGreen[i][j] * effect[a][b];
                                convBlue += imgBlue[i][j] * effect[a][b];
                            }
                        }

                        sketch.pixels[k] = convRed;
                        sketch.pixels[k + 1] = convGreen;
                        sketch.pixels[k + 2] = convBlue;
                    }
                }
            }

            sketch.updatePixels();
        }
    }
}