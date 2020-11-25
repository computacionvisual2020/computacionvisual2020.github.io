uniform mat4 modelview;
uniform mat4 transform;
uniform mat3 normalMatrix;

varying vec3 vertPos;
varying vec3 normalInterp;

attribute vec4 position;
attribute vec3 normal;


void main() {

    vec4 vertPos4 = modelview * position;
    vertPos = vec3(vertPos4) / vertPos4.w;
    normalInterp = vec3(normalMatrix * normal);
    gl_Position = transform * position;    
    
}