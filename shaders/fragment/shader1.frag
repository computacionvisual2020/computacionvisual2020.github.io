// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535897932384626433832795;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = u_time*_speed;
    if( fract(time)>0.004 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(time)*2.0;
        } else {
            _st.x -= fract(time)*2.0;
        }
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        }
    }
    //return fract(_st);
	return _st;
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.000,0.02);
    vec2 uv = smoothstep(_size,_size+vec2(1e-5),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(10.0)-_st);
    return uv.x*uv.y;
}

/*vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}*/

vec3 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    //_st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);
	vec3 color;
    // Rotate each cell according to the index
    if(index == 1.0 ){
        //  Rotate cell 1 by 90 degrees
        //_st = rotate2D(_st,PI*1.0);
        color = vec3(box(_st,vec2(1.0)));
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        //_st = rotate2D(_st,PI*-0.0);
        color = vec3(box(_st,vec2(1.0)));
    } else{
        //  Rotate cell 3 by 180 degrees
        //_st = rotate2D(_st,PI);
        color = vec3(box(_st,vec2(0.0)),0.0,0.0);
    }
    	

    return color;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	//vec3 color = vec3(.8,.2,.2);
    
    st = movingTiles(st,5.0,0.15);

    //st = fract(st);
    
    vec3 color = rotateTilePattern(st*1.0);

    //vec3 color = vec3(st,0.0); 
    

    gl_FragColor = vec4(color,1.0);
}
