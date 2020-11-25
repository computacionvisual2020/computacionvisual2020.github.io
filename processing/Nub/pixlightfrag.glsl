varying vec4 vertColor;
varying vec3 cameraDirection;
varying vec3 lightDirectionReflected;

varying vec3 normalInterp;
varying vec3 vertPos;

uniform int lightCount;
uniform vec4 lightPosition[8];

void main() {
    for (int i = 0; i < lightCount; i++){
        vec3 N = normalize(normalInterp);
        vec3 L = normalize(lightPosition[i].xyz - vertPos);

        // Lambert cosine law
        float lambertian = max(dot(N,L), 0.0);
        float specular = 0.0;
        if(lambertian > 0.0) {
            vec3 R = reflect(-L, N);
            vec3 V = normalize(-vertPos);

            float specAngle = max(dot(R,V), 0.0);
            specular = pow(specAngle, 80.0);
        }

        gl_FragColor += vec4(1.0 * vec3(0.5, 0.15, 0.0) + 1.0 * lambertian * vec3(1.0, 0.0, 1.0) + 1.0 * specular * vec3(0.0, 1.0, 0.0), 1.0);
    }
}