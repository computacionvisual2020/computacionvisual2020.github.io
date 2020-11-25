import nub.primitives.*;
import nub.core.*;
import nub.processing.*;
PShape can;
float angle;

PShader pixlightShader;

int value = 1;

int DIMENSION = 1000;
int MIDDLE = DIMENSION/2;
Scene scene;
Node n1,n2,n3,n4,n5;

void settings() {
  size(DIMENSION, DIMENSION, P3D);
}

void setup() {
  pixlightShader = loadShader("pixlightfrag.glsl", "pixlightvert.glsl");
  scene = new Scene(this);
  n1 = new Node();
  n2 = new Node(n1){
    // immediate mode rendering procedure
    // defines n2 visual representation
    @Override
    public void graphics(PGraphics pg) {
      pg.shader(pixlightShader);
      pg.pointLight(255, 0, 0, 0, 0, 0);
      //pg.pointLight(255, 255, 255, MIDDLE*cos(0.25), MIDDLE*sin(0.25), MIDDLE);
      //pg.pointLight(255, 255, 255, MIDDLE*cos(0.5), MIDDLE*sin(0.5), MIDDLE);
    }
  };
  n2.enableHint(Node.TORUS | Node.BULLSEYE | Node.AXES);
  n2.translate(75, 75, 75);
  n3 = new Node(n2){
    // immediate mode rendering procedure
    // defines n2 visual representation
    @Override
    public void graphics(PGraphics pg) {
      pg.pointLight(0, 255, 0, 0, 0, 0);
    }
  };
  n3.enableHint(Node.TORUS | Node.BULLSEYE | Node.AXES);
  scene.randomize(n3);
  n3.translate(50, 50, 50);
  n4 = new Node(n3){
    // immediate mode rendering procedure
    // defines n2 visual representation
    @Override
    public void graphics(PGraphics pg) {
      pg.pointLight(0, 0, 255, 0, 0, 0);
    }
  };
  n4.enableHint(Node.TORUS | Node.BULLSEYE | Node.AXES);
  scene.randomize(n4);
  n4.translate(50, 50, 50);
  n5 = new Node(n4){
    // immediate mode rendering procedure
    // defines n2 visual representation
    @Override
    public void graphics(PGraphics pg) {
      pg.sphere(25);
    }
  };
  n5.enableHint(Node.TORUS | Node.BULLSEYE | Node.AXES);
  scene.randomize(n5);
  n5.translate(50, 50, 50);
}

void draw() {   
  background(0);
  scene.render();
}

void mouseMoved() {
  if (!scene.isTagValid("key"))
    scene.mouseTag();
}

void mouseDragged() {
  if (mouseButton == LEFT) {
    if (!scene.mouseSpinTag("key"))
      scene.mouseSpin();
  } else if (mouseButton == RIGHT) {
    if (!scene.mouseTranslateTag("key"))
      scene.mouseTranslate();
  } else
    scene.scale(mouseX - pmouseX);
}

void mouseWheel(MouseEvent event) {
  if (scene.is3D())
    scene.moveForward(event.getCount() * 20);
  else
    scene.scaleEye(event.getCount() * 20);
}
