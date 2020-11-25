uniform mat4 transform;
uniform mat4 modelview;
uniform mat3 normalMatrix;

attribute vec4 position;
attribute vec4 color;

varying vec4 vertColor;
varying vec3 vertPos;

attribute vec3 normal;

void main() {
  vec4 vertPos4 = modelview * position;
  vertPos = vec3(vertPos4) / vertPos4.w;
  gl_Position = transform * position;  
}
