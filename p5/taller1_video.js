const fpsVideo = (videoPath, videoWidth, videoHeight) => {
    return (sketch) => {
        let vid;

        sketch.setup = () => {
            sketch.createCanvas(videoWidth, videoHeight);
            vid = sketch.createVideo(videoPath);
            vid.size(videoWidth, videoHeight);
            vid.loop();
            vid.hide();
            sketch.noStroke();
        }
        sketch.draw = () => {
            sketch.background(0);
            vid.loadPixels();
            for (let y = 0; y < sketch.height; y += 8) {
                for (let x = 0; x < sketch.width; x += 8) {
                    let offset = ((y*sketch.width)+x)*4;
                    sketch.fill(vid.pixels[offset],
                        vid.pixels[offset+1],
                        vid.pixels[offset+2]);
                    sketch.rect(x, y, 8, 8);
                }
            }
            sketch.text("Frame Rate: " + Math.round(sketch.frameRate()),
                videoWidth / 2, videoHeight);
        }

    }
}

const normalVideo = (videoPath, videoWidth, videoHeight) => {
    return (sketch) => {
        let vid;

        sketch.setup = () => {
            sketch.createCanvas(videoWidth, 100);
            vid = sketch.createVideo(videoPath);
            vid.size(videoWidth, videoHeight);
            vid.loop();
        }
        sketch.draw = () => {
            sketch.clear();
            sketch.text("Frame Rate: " + Math.round(sketch.frameRate()),
                videoWidth / 2, 100);
        }

    }
}