#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

varying vec4 vertColor;
varying vec3 vertPos;

uniform vec4 lightPosition;
uniform float mode;
uniform float fogAmount;
uniform float atenuattionIntensity;
uniform float ambientStrength;

void main()
{
    vec3 ambient = ambientStrength * vec3(1.0, 0.0, 1.0); // color de la luz

    vec3 to_light = lightPosition.xyz - vertPos;
    float d = length(to_light);
    float attenuation = clamp(100.0/d, atenuattionIntensity, 1.0);

    vec3 result = ambient * vec3(1.0, 1.0, 1.0) * attenuation; // color del cilindro

    gl_FragColor = mix(vec4(result, 1.0), vec4(0.0, 0.0, 0.0, 0.0), fogAmount);

    // Ambient mode
    if(mode == 0) gl_FragColor = vec4(ambient * vec3(1.0, 1.0, 1.0) , 1.0);

    // Attenuation mode
    if(mode == 1) gl_FragColor = gl_FragColor = vec4(result, 1.0);

    //gl_FragColor = vec4(result, 1.0);
}
