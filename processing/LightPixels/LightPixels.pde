PShape can;
float angle;

PShader pixlightShader;

int mode = 0;
float ambientIntensity = 1.0;
float diffuseIntesity = 1.0;
float specularIntensity = 1.0;

void settings() {
  System.setProperty("jogl.disable.openglcore", "true");
  size(640, 360, P3D);
}

void setup() {
  can = createCan(100, 200, 32);
  pixlightShader = loadShader("pixlightfrag.glsl", "pixlightvert.glsl");
}

void draw() {    
  background(0);
  
  pixlightShader.set("mode", mode);
  pixlightShader.set("ambientIntensity", ambientIntensity);
  pixlightShader.set("diffuseIntesity", diffuseIntesity);
  pixlightShader.set("specularIntensity", specularIntensity);
  
  shader(pixlightShader);
  
  pointLight(255, 255, 255, width/2, height, 200);

  translate(width/2, height/2);
  rotateY(angle);
  rotateX(angle);
  shape(can);  
  angle += 0.01;
}

void mouseClicked(){
  if(mode == 2) {
    mode = 0;
  }else{
    mode +=1;
  }
}

void keyPressed() {
  float k = (float(key) - 48) /10;
  
  if(mode == 0) {
    if(k == 0.0){
      ambientIntensity = 1.0;
    } else {
      ambientIntensity = k;
    }
  }
  if(mode == 1) {
    if(k == 0.0){
      diffuseIntesity = 1.0;
    } else {
      diffuseIntesity = k;
    }
  }
  if(mode == 2) {
    if(k == 0.0){
      specularIntensity = 1.0;
    } else {
      specularIntensity = k;
    }
  }

}

PShape createCan(float r, float h, int detail) {
  textureMode(NORMAL);
  PShape sh = createShape();
  sh.beginShape(QUAD_STRIP);
  sh.noStroke();
  for (int i = 0; i <= detail; i++) {
    float angle = TWO_PI / detail;
    float x = sin(i * angle);
    float z = cos(i * angle);
    float u = float(i) / detail;
    sh.normal(x, 0, z);
    sh.vertex(x * r, -h/2, z * r, u, 0);
    sh.vertex(x * r, +h/2, z * r, u, 1);    
  }
  sh.endShape(); 
  return sh;
}