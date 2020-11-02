const shader1 = (imgPath, imgWidth, imgHeight) => {
    return (sketch) => {
        let theShader;

        sketch.preload = () => {
            theShader = sketch.loadShader('shaders/vertex/shader1.vert', 'shaders/fragment/shader1.frag');
        }

        sketch.setup = () => {

            sketch.createCanvas(500,500,sketch.WEBGL);
            sketch.noStroke();
        }

        sketch.draw = () => {

            sketch.shader(theShader);
            theShader.setUniform('u_resolution', [sketch.width, sketch.height]);
            theShader.setUniform('u_time', sketch.frameCount * 0.03);

            sketch.rect(0 ,0 ,sketch.width ,sketch.height);
        }

        sketch.windowResized = () => {

            sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
          
        }
    }
}