let rc, vc, canv;
let drawingMode = false;

function setup() {
  canv = createCanvas(1000, 750);
  canv.parent("canvas-container");

  vc = new VectorCreator();
  rc = new RayCaster();
}

function draw() {
  if (drawingMode) {
    vc.draw();
  }
  else {
    rc.draw();
  }
}

function mousePressed(fxn) {
  if(drawingMode){
    vc.mousePressed();
  }
}

function keyPressed() {
  if (!drawingMode && keyCode == ENTER) {
    drawingMode = true;
  }
  else {
    vc.keyPressed();

    if (key == " ") {
      drawingMode = false;
      rc.setObstacles(vc.getVectors());
      vc = new VectorCreator();
    }
  }
}