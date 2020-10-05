const fpsVideo = (videoPath, videoWidth, videoHeight) => {
    return (sketch) => {
        let vid;
        let imgRed = [];
        let imgGreen = [];
        let imgBlue = [];
        let time = 0;
        let frames = 0;
        let avg = 0;

        sketch.preload = () => {
            vid = sketch.createVideo(videoPath);
        }

        sketch.setup = () => {
            sketch.createCanvas(videoWidth, videoHeight);
            sketch.pixelDensity(1);
            vid.size(videoWidth, videoHeight);
            vid.loop();
            vid.hide();
            sketch.noStroke();
            sketch.frameRate(10000);
        }
        sketch.draw = () => {
            imgRed = [];
            imgGreen = [];
            imgBlue = [];
            sketch.background(0);
            vid.loadPixels();
            sketch.loadPixels();

            for (let a = 0, x = 0; x < sketch.width; a++, x++) {
                imgRed.push([]);
                imgGreen.push([]);
                imgBlue.push([]);

                for (let y = 0; y < sketch.height; y++) {
                    let i = ((y*sketch.width)+x)*4;
                    imgRed[a].push(vid.pixels[i]);
                    imgGreen[a].push(vid.pixels[i + 1]);
                    imgBlue[a].push(vid.pixels[i + 2]);
                }
            }

            for (let x = 0; x < sketch.width; x++) {
                for (let y = 0; y < sketch.height; y++) {
                    let k = ((y*sketch.width)+x)*4;

                    if (!(x === 0 || x === sketch.width - 1 || y === 0 || y === sketch.height - 1)) {
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

                        sketch.pixels[k] = convRed;
                        sketch.pixels[k + 1] = convGreen;
                        sketch.pixels[k + 2] = convBlue;

                    }
                }
            }
            sketch.updatePixels();
            sketch.textSize(20);
            sketch.fill(255,255,255);
            sketch.text("Average Frame Rate: " + avg,
                videoWidth / 3, videoHeight - 20);
            if (time === Math.round(vid.time() - 1)) {
                if (frames<1000000) {
                    time++;
                    frames += sketch.frameRate();
                    avg = frames / time;
                }
            }else if(Math.round(vid.time())===0){
                time=0;
                frames=0;
            }
        }

    }
}

const normalVideo = (videoPath, videoWidth, videoHeight) => {
    return (sketch) => {
        let vid;
        let time = 0;
        let frames = 0;
        let avg = 0;

        sketch.setup = () => {
            sketch.createCanvas(videoWidth, 25);
            vid = sketch.createVideo(videoPath);
            vid.size(videoWidth, videoHeight);
            vid.loop();
            sketch.frameRate(1000);
        }
        sketch.draw = () => {
            sketch.clear();
            sketch.textSize(20);
            sketch.fill(0,0,0);
            sketch.text("Average Frame Rate: " + avg,
                videoWidth / 3, 25);
            if (time === Math.round(vid.time() - 1)) {
                if (frames<1000000) {
                    time++;
                    frames += sketch.frameRate();
                    avg = frames / time;
                }
            }else if(Math.round(vid.time())===0){
                time=0;
                frames=0;
            }

        }

    }
}