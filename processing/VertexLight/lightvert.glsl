uniform mat4 modelview;
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec4 lightPosition;

// Testing

varying vec3 normalInterp;
varying vec3 vertPos;

// fin Testing

attribute vec4 position;
attribute vec4 color;
attribute vec3 normal;

varying vec4 vertColor;

void main() {

    vec4 vertPos4 = modelview * position;
    vertPos = vec3(vertPos4) / vertPos4.w;
    normalInterp = vec3(normalMatrix * normal);
    gl_Position = transform * position; 

    vec3 N = normalize(normalInterp);
    vec3 L = normalize(lightPosition.xyz - vertPos);

    float lambertian = max(dot(N,L), 0.0);
    float specular = 0.0;

    if(lambertian > 0.0) {
        vec3 R = reflect(-L, N);
        vec3 V = normalize(-vertPos);

        float specAngle = max(dot(R,V), 0.0);
        specular = pow(specAngle, 80.0);
    }

    vertColor = vec4(1.0 * vec3(0.5, 0.15, 0.0) + 1.0 * lambertian + 1.0 * specular, 1.0);             
}