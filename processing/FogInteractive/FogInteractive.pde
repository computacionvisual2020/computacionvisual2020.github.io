PShape globe;
PShape can;
float angle;
PShader colorShader;

float value = 0;
float fogAmount = 0.0;
float atenuattionIntensity = 0.0;
float ambientStrength = 1.0;

void settings() {
  System.setProperty("jogl.disable.openglcore", "true");
  size(640, 360, P3D);
}

void setup() {
  
  noStroke();
  can = createCan(100, 200, 32);
  globe = createShape(SPHERE, 50);
  colorShader = loadShader("colorfrag.glsl", "colorvert.glsl");
}

void draw() {
  background(0);
  
  colorShader.set("mode", value);
  colorShader.set("fogAmount", fogAmount);
  colorShader.set("atenuattionIntensity", atenuattionIntensity);
  colorShader.set("ambientStrength", ambientStrength);
    
  shader(colorShader);
  
  pointLight(250, 250, 250, width/2, height/2, 150);
  
  translate(width/2, height/2);
  
  shape(can);
  
  rotateY(angle);
  rotateX(angle);
  
  translate(width/2, height/2, -100);
  shape(can);
  
  angle += 0.01;
}

void mousePressed() {
  if(value == 2) {
    value = 0;
  }else{
    value += 1;
  }
}

void keyPressed() {
  if(value == 0){
    ambientStrength = (float(key)- 48.0)/10;
  }
  if(value == 1){
    atenuattionIntensity = (float(key)- 48.0)/10;
  }
  if(value == 2){
    fogAmount = (float(key)- 48.0)/10;
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