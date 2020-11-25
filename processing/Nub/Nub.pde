import nub.primitives.*;
import nub.core.*;
import nub.processing.*;
PShape can;
float angle;

PShader pixlightShader;

int value = 1;

int DIMENSION = 600;
int MIDDLE = DIMENSION/2;

void settings() {
  System.setProperty("jogl.disable.openglcore", "true");
  size(DIMENSION, DIMENSION, P3D);
}

void setup() {
  pixlightShader = loadShader("pixlightfrag.glsl", "pixlightvert.glsl");
}

void draw() {    
  background(0);
  
  shader(pixlightShader);
  
  if (value>0){
    pointLight(255, 255, 255, MIDDLE*cos(0), MIDDLE*sin(0), MIDDLE);
  }
  if (value>1){
    pointLight(255, 125, 255, MIDDLE*cos(0.25*PI), MIDDLE*sin(0.25*PI), MIDDLE);
  }
  if (value>2){
    pointLight(255, 255, 125, MIDDLE*cos(0.5*PI), MIDDLE*sin(0.5*PI), MIDDLE);
  }
  if (value>3){
    pointLight(125, 255, 255, MIDDLE*cos(0.75*PI), MIDDLE*sin(0.75*PI), MIDDLE);
  }
  if (value>4){
    pointLight(125, 125, 255, MIDDLE*cos(1.0*PI), MIDDLE*sin(1.0*PI), MIDDLE);
  }
  if (value>5){
    pointLight(125, 255, 125, MIDDLE*cos(1.25*PI), MIDDLE*sin(1.25*PI), MIDDLE);
  }
  if (value>6){
    pointLight(125, 125, 125, MIDDLE*cos(1.5*PI), MIDDLE*sin(1.5*PI), MIDDLE);
  }
  if (value>7){
    pointLight(0, 255, 255, MIDDLE*cos(1.75*PI), MIDDLE*sin(1.75*PI), MIDDLE);
  }

  translate(width/2, height/2);
  rotateY(angle); 
  rotateX(angle);
  box(200);
  angle += 0.01;
}

void mouseClicked() {
  if (value >= 8) {
    value = 0;
  } else {
    value++;
  }
}
